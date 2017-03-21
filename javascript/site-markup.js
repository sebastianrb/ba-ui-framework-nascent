function siteMarkupHandler() {
  'use strict';

  var markupD = {
    show: {
      text: 'Show Markup',
      icon: '&plus;'
    },
    hide: {
      text: 'Hide Markup',
      icon: '&mdash;'
    }
  };

  /**
   * Changes the text to Show / Hide Markup and the icon ( + / — ) depending on the state
   * @param  {[node]} el  -  The trigger that was clicked
   * @param  {[string]} state - 'show' or 'hide', which state we're changing FROM, not to
   */
  function toggleMarkup(el, state) {
    var icon = el.firstElementChild;
    var txt = el.lastElementChild;
    icon.innerHTML = markupD[state].icon;
    txt.innerHTML = markupD[state].text;
  }

  document.body.addEventListener('click', function(e) {
    var code;

    if (e.target.classList.contains('na-markup__toggle')) {
      code = e.target.nextElementSibling;

      if (code.classList.contains('show')) {
        toggleMarkup(e.target, 'show');
      } else {
        toggleMarkup(e.target, 'hide');
      }

      code.classList.toggle('show');
    }
  }, false);

};

siteMarkupHandler()
