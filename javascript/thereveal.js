(function theReveal() {
  'use strict';

  var lay = document.querySelector('.c-na-reveal__btn');

  lay.addEventListener('click', function() {
    this.parentNode.parentNode.classList.toggle('pull-away');
  }, false);

})();
