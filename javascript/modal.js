(function naModal() {
  'use strict';
  var modals = [];
  // find all modals
  var modalEls = Array.prototype.slice.call(document.querySelectorAll('[data-na-modal]'));
  // find all triggers so event listeners can be added
  var modalTriggers = document.querySelectorAll('[data-na-triggers-modal]');
  // will store reference to whatever element was in focus when modal opened
  var savedFocus = null;
  var currentModal = null; // save reference to active modal to close easily

  /*
    HELPER FUNCTIONS
  */

  /** Sets an id on an element node. If the node already has an id, nothing will be done.
   * @param {node} el - An element node on which to set the id
   * @param {string} id - The value the id will be set to
  **/
  function setNodeID(el, id) {
    el.id = el.id || id;
  }

  /** Finds the modal with a matching id in list of modals
   * @param {string} id - Value of the id to look for
   * @param {array} list - Array of modals to search
     @returns a number which is the items index in the array
  **/
  function getIndx(id, list) {
    var i = 0;
    var l = list.length;

    while (i < l) {
      if (list[i].id === id) {
        return i;
      }
      i++;
    }
  }

  /*
    MODAL FUNCTONS
  */

  /** For each modal on the page, creates an object to store data about the modal
     Stores the:
     - id (not the id attribute; set with data-na-modal on the element) of the modal
     - a reference the the modal's node
     - a reference to the modal's title and description nodes if used (for ARIA purposes)
     - a reference to the node that should be initially focused when the modal
        opens (if it has been set in the markup by the developer)
     Each modal's object is stored in an array
   * @param {node} modal - The element node for the modal
  **/

  function getModalData(modal) {
    var modalObj = {};
    modalObj.id = modal.getAttribute('data-na-modal');
    modalObj.modal = modal;
    modalObj.title = modalObj.modal.querySelector('[data-na-modal-title]');
    modalObj.desc = modalObj.modal.querySelector('[data-na-modal-desc]');
    modalObj.focus = modalObj.modal.querySelector('[data-na-initial-focus]');
    modals.push(modalObj);
  }

  /** Makes the modal more accessible to screenreaders by adding a role of "dialog"
      to the modal. If a title element and / or description element has been set
      (in the markup via data-na-modal-title and data-na-modal-desc), sets the
      aria-labelledby attr to the title element and aria-describedby attr to
      the description element, both of which will be read by the screenreader when
      the modal opens.
   * @param {node} modal - The element node for the modal
  **/
  function setARIA(modal) {
    modal.modal.setAttribute('role', 'dialog');

    if (modal.title) {
      modal.modal.setAttribute('aria-labelledby', modal.title.id);
    }

    if (modal.desc) {
      modal.modal.setAttribute('aria-describedby', modal.desc.id);
    }
  }


  /** Makes the modal more accessible for keyboard users; get first and last focusable
      element within modal so they can later be used to trap focus
   * @param {node} modal - The element node for the modal
     @returns {object} an object with the first and last focusable elements
  **/
  function getTrapEls(modal) {
    // collect all elements from inside modal which can receive focus
    var canFocusStr = '[contenteditable]:not([tabindex="-1"]), [tabindex="0"], a[href]:not([tabindex="-1"]), area[href]:not([tabindex="-1"]), button:not([tabindex="-1"]):not([disabled]), embed:not([tabindex="-1"]), iframe:not([tabindex="-1"]), input:not([tabindex="-1"]):not([disabled]), object:not([tabindex="-1"]), select:not([tabindex="-1"]):not([disabled]), textarea:not([tabindex="-1"]):not([disabled])';
    var allFocusableEls = modal.querySelectorAll(canFocusStr);
    var firstFocusable = allFocusableEls[0];
    var lastFocusable = allFocusableEls[allFocusableEls.length - 1];

    return {
      first: firstFocusable,
      last: lastFocusable
    };
  }

  /** Makes the modal more accessible by trapping keyboard focus in the modal while open
      and closing the modal when the overlay (outside of the modal content) is clicked
   * @param {node} modal - The element node for the modal
     @param {object} trapEls - an object with the first and last focusable elements
  **/
  function setKeyEvents(modal, trapEls) {
    modal.addEventListener('keydown', function(e) {

      // if esc key is pressed, close modal
      if (e.which === 27) {
        closeModal();
      }

      // if the tab key is pressed, make sure focus is trapped inside modal
      if (e.which === 9) {

          // if shift+tab is pressed while on the first focusable el, focus the last
          // focusable el since the intention is to focus prev. element
          if (e.shiftKey && e.target === trapEls.first) {

            // stop focus from going out of modal; focus on the last focusable element
            e.preventDefault();
            trapEls.last.focus();

            // otherwise if on last focusable el, focus on first focusable el to trap focus
          } else if (!e.shiftKey && e.target === trapEls.last) {
            e.preventDefault();
            trapEls.first.focus();
          }
      }
    });
  }

  // open modal
  function openModal(modalObj) {
    var modalEl = modalObj.modal;
    // get all focusable elements so we can trap focus in the modal
    var trapEls = getTrapEls(modalEl);
    // save focus for when we remove the modal
    savedFocus = document.activeElement;
    // save reference to current modal so we can easily close it
    currentModal = modalEl;

    // set up focus trap for the modal & esc key event (to dismiss modal)
    setKeyEvents(modalEl, trapEls);

    // add click event to dismiss modal when overlay is clicked
    modalEl.addEventListener('click', function(e) {
      if (e.target === modalEl || e.target.hasAttribute('data-na-modal-dismiss')) {
        closeModal();
      }
    });

    // remove class hiding the modal
    modalEl.classList.remove('is-closed');

    // add class to animate the modal in;
    // must use a timeout since removing the display value of none from is-closed will not allow el to animate
    window.setTimeout(function() {
      modalEl.classList.add('mod-fade-in');
      document.body.classList.add('modal-open');
      // set initial focus
      if (modalObj.focus) {
        // if the user has specified an element to receive inital focus
        modalObj.focus.focus();
      } else {
        // focus the first focusable element
        trapEls.first.focus();
      }
    }, 100);

  }

  function closeModal() {
    // remove mod-fade-in class to fade modal out
    currentModal.classList.remove('mod-fade-in');
    document.body.classList.remove('modal-open');

    window.setTimeout(function() {
      currentModal.classList.add('is-closed');
      // reset currentModal
      currentModal = null;
      // restore focus to el that had focus before modal was open
      savedFocus.focus();
    }, 500);
  }

  // add all of the modals to the modal data array
  modalEls.forEach(function(modal) {
    getModalData(modal);
  });


  // set ARIA attr & roles for modal; set id attr for title & description if provided
  modals.forEach(function(modal) {
    if (modal.title) {
      setNodeID(modal.title, 'na-modal-title_' + modal.id);
    }

    if (modal.desc) {
      setNodeID(modal.desc, 'na-modal-desc_' + modal.id);
    }

    setARIA(modal);
  });

  // add event to all elements which trigger a modal opening
  modalTriggers.forEach(function(trigger) {

    trigger.addEventListener('click', function(e) {
      // get value of what modal is opened by this trigger
      var triggers = e.target.getAttribute('data-na-triggers-modal');
      // get index of target modal from array of modal objects
      var indx = getIndx(triggers, modals);
      openModal(modals[indx]);
    });
  });
})();
