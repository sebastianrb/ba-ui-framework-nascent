 (function() {

    console.log("running IIFE");

    var accordions;

    function init() {
      accordions = document.querySelectorAll('.c-na-accordion');
      _setUpOnLoad();
      _addListeners();
      console.log("initialized");
    }

  function _setUpOnLoad() {
    /* page loads with all accordion bodies open in case JS is disabled;
        that way content will still be visible;
        so, we'll need to close them; */
    for (var i=0; i<accordions.length; i++) {
      var currentAccordion = accordions[i];
      var currentAccordionBodys = accordions[i].querySelectorAll('.c-na-accordion__body');
      for (var j=0; j<currentAccordionBodys.length; j++) {
        console.log('Attempting to close:', currentAccordionBodys[j]);
        currentAccordionBodys[j].classList.add('c-na-accordion__body--closed');
      }
    }
  }

  function _swapClass(elem, classToRemove, classToAdd) {
    /*
    * Swaps an existing node's class with another
    */
    elem.classList.remove(classToRemove);
    elem.classList.add(classToAdd);
  } // end swapClass

  function _addListeners() {
    console.log("accordions:", accordions);
    for (var i=0; i<accordions.length; i++) {
      /* add a listener on each c-na-accordion */
      accordions[i].addEventListener('click', _checkAccordion);
    }
  } // end _addListeners

  function _checkAccordion(event) {
    /* can have data-accordion-type attribute values of "accordion",
        or "expandable" */
    var eventTarget = event.target;
    var clickedAccordionHeader = eventTarget; // maybe not, we'll discover
    var parentAccordion;
    var accordionHeaders;
    var accordionBodys;
    var nextSiblingAccordionBody;
    console.log("eventTarget:", eventTarget);
    /* only want to act if .c-na-accordion__header or a direct
        child was clicked */
    if (eventTarget.classList.contains('c-na-accordion__header')
       || eventTarget.parentElement.classList.contains('c-na-accordion__header')) {
      /* we want to identify the .c-na-accordion__header that was
          clicked (or is the parent of the contained element that
          was clicked) */
      while (!clickedAccordionHeader.classList.contains('c-na-accordion__header')) {
        clickedAccordionHeader = clickedAccordionHeader.parentElement;
      }
      /* at this point, we should have found the .c-na-accordion__header
          that the user intended to click */
      console.log('clickedAccordionHeader:', clickedAccordionHeader);
      /* at this point, parentAccordion is likely not the actual
          .c-na-accordion we seek;
          we will seek it by it's class name rather than strictly
          using only successive  parentAccordion.parentElement queries */
      parentAccordion = eventTarget.parentElement;

      /* find the actual parentAccordion - we may have clicked on any
          number of child elements */
      while (!parentAccordion.classList.contains('c-na-accordion')) {
        parentAccordion = parentAccordion.parentElement;
      }
      console.log("parentAccordion:", parentAccordion);
      /* should have found the actual .c-na-accordion here */
      /* now get all child .c-na-accordion__header, and c-na-accordion__body
          elements */
      accordionHeaders = parentAccordion.querySelectorAll('.c-na-accordion__header');
      console.log('accordionHeaders:', accordionHeaders);
      accordionBodys = parentAccordion.querySelectorAll('.c-na-accordion__body');
      console.log('accordionBodys:', accordionBodys);
      if (parentAccordion.dataset.accordionType == 'accordion') {
        console.log("BINGO ... accordion!");
        /* for the 'accordion' data-accordion-type, only one
            .c-na-accordion__body can be open, and the clicked
            .c-na-accordion__body can be toggled open/closed */
        for (var i=0; i<accordionHeaders.length; i++) {
          nextSiblingAccordionBody = accordionHeaders[i].nextElementSibling;
          console.log('nextSiblingAccordionBody:', nextSiblingAccordionBody);
          if (accordionHeaders[i] == clickedAccordionHeader) {
            console.log('accordionHeaders[i] == clickedAccordionHeader');
            if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--closed')) {
              _swapClass(nextSiblingAccordionBody, 'c-na-accordion__body--closed', 'c-na-accordion__body--open');
              accordionHeaders[i].classList.add('c-na-accordion__header--active');
            } else if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--open')) {
              _swapClass(nextSiblingAccordionBody, 'c-na-accordion__body--open', 'c-na-accordion__body--closed');
              accordionHeaders[i].classList.remove('c-na-accordion__header--active');
            }
          } else {
            /* close everything other than the selected one */
            if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--open')) {
              _swapClass(nextSiblingAccordionBody, 'c-na-accordion__body--open', 'c-na-accordion__body--closed');
              accordionHeaders[i].classList.remove('c-na-accordion__header--active');
            }
          }
        }

      } else if (parentAccordion.dataset.accordionType == 'expandable') {
        console.log("BINGO ... expandable!");
        /* for the 'expandable' data-accordion-type, all
            .c-na-accordion__body can be opened regardless of others'
            state, and the clicked .c-na-accordion__body can be toggled
            open/closed */
        for (var i=0; i<accordionHeaders.length; i++) {
          nextSiblingAccordionBody = accordionHeaders[i].nextElementSibling;
          console.log('nextSiblingAccordionBody:', nextSiblingAccordionBody);
          if (accordionHeaders[i] == clickedAccordionHeader) {
            console.log('accordionHeaders[i] == clickedAccordionHeader');
            if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--closed')) {
              _swapClass(nextSiblingAccordionBody, 'c-na-accordion__body--closed', 'c-na-accordion__body--open');
              accordionHeaders[i].classList.add('c-na-accordion__header--active');
            } else if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--open')) {
              _swapClass(nextSiblingAccordionBody, 'c-na-accordion__body--open', 'c-na-accordion__body--closed');
              accordionHeaders[i].classList.remove('c-na-accordion__header--active');
            }
          }
        }
      }

    } else {
      /* neither .c-na-accordion__header, nor direct child was clicked */
      return;
    }

  } // end _checkAccordion

  init();

})();