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

  function toggleMarkup(e, state) {
    var icon = e.target.firstElementChild;
    var txt = e.target.lastElementChild;
    console.log(markupD[state].icon)
    icon.innerHTML = markupD[state].icon;
    txt.innerHTML = markupD[state].text;
  }

  document.body.addEventListener('click', function(e) {
    var code;

    if (e.target.classList.contains('na-markup__toggle')) {
      code = e.target.nextElementSibling;

      if (code.classList.contains('show')) {
        code.classList.remove('show');
        toggleMarkup(e, 'show');
      } else {
        code.classList.add('show');
        toggleMarkup(e, 'hide');
      }
    }
  }, false);

};

siteMarkupHandler()
