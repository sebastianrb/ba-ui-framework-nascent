 (function() {

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

  function _addListeners() {
    console.log("accordions:", accordions);
    for (var i=0; i<accordions.length; i++) {
      /* add a listener on each .c-na-accordion */
      accordions[i].addEventListener('click', _checkAccordion);
    }
  } // end _addListeners

  function _checkAccordion(event) {
    /* can have data-accordion-type attribute values of "accordion",
        or "expandable" */
    var clickedAccordionHeader = event.target; // ? maybe not, we'll discover
    var parentAccordion;
    var accordionHeaders;
    var accordionBodys;
    var nextSiblingAccordionBody;
    console.log("clickedAccordionHeader:", clickedAccordionHeader);
    /* only want to act if .c-na-accordion__header was clicked */
    /* note: pointer-events: none; css was placed on .c-na-accordion
        so, it's child elements should not respond to pointer events; */
    if (clickedAccordionHeader.classList.contains('c-na-accordion__header')) {
      /* at this point, we should have found the .c-na-accordion__header
          that the user clicked */
      console.log('clickedAccordionHeader:', clickedAccordionHeader);
      /* at this point, parentAccordion is likely not the actual
          .c-na-accordion we seek;
          we will seek it by it's class name rather than strictly
          using only successive parentAccordion.parentElement queries */
      parentAccordion = clickedAccordionHeader.parentElement;

      /* find the actual parentAccordion - we may have clicked on any
          number of child elements within a .c-na-accordion__body */
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
      // if (parentAccordion.dataset.accordionType == 'accordion') {
      //   console.log("BINGO ... accordion!");
        /* for the 'accordion' data-accordion-type, only one
            .c-na-accordion__body can be open, and the clicked
            .c-na-accordion__body can be toggled open/closed */
        for (var i=0; i<accordionHeaders.length; i++) {
          /* determine the next element sibling of the current accordionHeaders[i] */
          nextSiblingAccordionBody = accordionHeaders[i].nextElementSibling;
          if (accordionHeaders[i] == clickedAccordionHeader) {
            /* for all 'accordion' types, .c-na-accordion__body associated with
                the clickedAccordionHeader can be toggled open/closed; */
            console.log('accordionHeaders[i] == clickedAccordionHeader');
            nextSiblingAccordionBody.classList.toggle('c-na-accordion__body--closed');
            if (nextSiblingAccordionBody.classList.contains('c-na-accordion__body--closed')) {
              accordionHeaders[i].classList.remove('c-na-accordion__header--active');
            } else {
              accordionHeaders[i].classList.add('c-na-accordion__header--active');
            }
          } else switch (parentAccordion.dataset.accordionType) {
                    case 'accordion':
                    console.log("BINGO ... accordion!");
                      /* for the 'accordion' data-accordion-type, only one
                          .c-na-accordion__body can be open;
                          all other .c-na-accordion__body elements should close */
                      if (!nextSiblingAccordionBody.classList.contains('c-na-accordion__body--closed')) {
                        nextSiblingAccordionBody.classList.add('c-na-accordion__body--closed');
                        accordionHeaders[i].classList.remove('c-na-accordion__header--active');
                      }
                      break;
                    case 'expandable':
                    console.log("BINGO ... expandable!");
                    /* for the 'expandable' data-accordion-type, all
                      .c-na-accordion__body can be opened regardless of others'
                      state; */
                    /* we've already taken care of toggling the .c-na-accordion__body
                        open/close state;
                        for this type of accordion, that is all we need to do */
                      break;
                    default:
                      console.error('Improperly defined data-accordion-type attribute.');
          } // end else switch
          console.log('accordionHeaders[', i, ']:', accordionHeaders[i]);
          console.log('nextSiblingAccordionBody:', nextSiblingAccordionBody);
        } // end for

    } else {
      /* a .c-na-accordion__header was not clicked, so do not respond */
      return;

    } // end if (clickedAccordionHeader.classList.contains('c-na-accordion__header') ...

  } // end _checkAccordion

  init();

})();