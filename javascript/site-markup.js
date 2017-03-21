function siteMarkupHandler() {
  'use strict';

  var markupD = {
    show: {
      text: 'Show Markup',
      icon: '+'
    },
    hide: {
      text: 'Hide Markup',
      icon: '—'
    }
  };

  function toggleMarkup(e, state) {
    var icon = e.target.firstElementChild;
    var txt = e.target.lastElementChild;
    console.log(markupD[state].icon)
    icon.textContent = markupD[state].icon;
    txt.textContent = markupD[state].text;
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
