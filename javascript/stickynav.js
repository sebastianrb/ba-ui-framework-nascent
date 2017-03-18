(function _stickyNav() {

  var stickyItem = document.querySelector('[data-is-sticky="true"]');
  var stickAtTopOfEl = document.querySelector('[data-sticky-fix-at-top]');
  var stickyBottomBoundaryEl = document.querySelector('[data-sticky-bottom-boundary]');

  function _init() {
    _addListeners();
  }

  function _checkSticky(event) {
  
    if (stickAtTopOfEl.getBoundingClientRect().top <= 0) {
      stickyItem.classList.add('affix');
      if (stickyBottomBoundaryEl.getBoundingClientRect().top > window.innerHeight) {
        stickyItem.style.bottom = '0';
        stickyItem.style.height = window.innerHeight + 'px';
      } else {
        stickyItem.style.bottom = '0';
        stickyItem.classList.remove('affix');
        stickyItem.style.height = stickyBottomBoundaryEl.getBoundingClientRect().top + 'px';
      }
    } else {
      stickyItem.classList.remove('affix');
      stickyItem.style.bottom = 'auto';
      stickyItem.style.height = (window.innerHeight - stickAtTopOfEl.getBoundingClientRect().top) + 'px';
    }
  }

  function _checkAfterResize(event) {
    _checkSticky();
  }

  function _addListeners() {
    window.addEventListener('scroll', _checkSticky);
    window.addEventListener('resize', _checkAfterResize);
  }

  _init();

})();