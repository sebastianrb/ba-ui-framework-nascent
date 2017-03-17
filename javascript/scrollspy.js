(function _vNavScrollspy() {

  var spyNav;
  var spyNavList;
  var spyNavListItems;
  var activeSpyNavAnchor;
  var spyNavListItemHeight;
  var spyTargets;
  var spyTargetsObj;
  var spyRefContainerRect;
  var spyContentContainerRect;

  function _init() {
    spyNav = document.querySelector('.spy-nav');
    spyNavList = document.querySelector('.spy-nav__list');
    spyNavListItems = document.querySelectorAll('.spy-nav__list li');
    spyNavListItemHeight = document.querySelector('.spy-nav__list li').getBoundingClientRect().height;
    spyTargets = document.querySelectorAll('.spy-section');
    spyTargetsObj = {};
    spyRefContainerRect = document.querySelector('.spy-reference-container').getBoundingClientRect();
    spyContentContainerRect = document.querySelector('.spy-content-container').getBoundingClientRect();
    _getSpyTargetsSizesAndPositions();
    _initSpyNavAnchorState();
    _addListeners();

    console.log('Initialized.');
  }

  /* When you need to know how far an element is from the top of the DOM,
      not the top of its parent, use this helper function.
      Loops through all parent nodes of an element to get it's distance
      from the top of the document */
  function _getDistanceFromTop(element) {
      var yPos = 0;
      while(element) {
          yPos += (element.offsetTop);
          element = element.offsetParent;
      }
      return yPos;
  } // end _getDistanceFromTop

  /* this function should be called whenever something occurs that would
      change positioning properties of any elements associated with spy
      functionality; */
  function _getSpyTargetsSizesAndPositions(event) {
    for (var i=0; i<spyTargets.length; i++) {
      spyTargetsObj[spyTargets[i].id] = spyTargets[i].getBoundingClientRect();
    }
    /* update reference container */
    spyRefContainerRect = document.querySelector('.spy-reference-container').getBoundingClientRect();
    /* update spy-content-container */
    spyContentContainerRect = document.querySelector('.spy-content-container').getBoundingClientRect();
    //console.log('spyTargetsObj:', spyTargetsObj);
    _checkSpyTargets(event);
  }

  function _initSpyNavAnchorState() {
    //console.log('spyRefContainerRect:', spyRefContainerRect);
    for (var key in spyTargetsObj) {
      /* below gives initial inactive styling */
      spyNavList.querySelector('li a[href="#' + key + '"]').classList.add('spy-nav__a--inactive');
    }
  }

  function _checkSpyTargets(event) {
    var currentSpyNavListItem;
    var currentSpyNavAnchor;
    for (var key in spyTargetsObj) {
      currentSpyNavAnchor = spyNavList.querySelector('li a[href="#' + key + '"]');
      currentSpyNavListItem = currentSpyNavAnchor.parentElement;
      if (spyTargetsObj[key].bottom >= 1
        && ( spyTargetsObj[key].top <= 1 || Math.abs(spyTargetsObj[key].top - spyRefContainerRect.top) <= 1) ) {
        if (activeSpyNavAnchor) {
          activeSpyNavAnchor.classList.remove('spy-nav__a--active');
        }
        currentSpyNavAnchor.classList.add('spy-nav__a--active');
        activeSpyNavAnchor = currentSpyNavAnchor;
        /* check visibility of active li a */
        if ( event && event.type == 'scroll' && event.currentTarget == window) {
          //console.log('event:', event);
          if (currentSpyNavListItem.getBoundingClientRect().top < 0) {
            /* top of spy nav list item is above viewport */
            spyNavList.scrollTop += currentSpyNavListItem.getBoundingClientRect().top;
          } else if (currentSpyNavListItem.getBoundingClientRect().bottom > window.innerHeight) {
            spyNavList.scrollTop += currentSpyNavListItem.getBoundingClientRect().bottom - window.innerHeight;
          }
        } // end if ( event && event.type ...

      }

    } // end for (var key in spyTargetsObj)

    /* if last spy section is active, make sure spy nav is fully visible to
        its bottom, where that active link is; */
    if (activeSpyNavAnchor.getAttribute('href') == '#' + spyTargets[spyTargets.length - 1].id) {
      //console.warn("got the last section as active; spyNavList.scrollTop =", spyNavList.scrollTop);
      spyNavList.scrollTop += spyNavList.getBoundingClientRect().height;
    }

  } // end _checkSpyTargets

  function _checkNavListScroll(event) {
    // console.log('spyNavList.scrollTop:', spyNavList.scrollTop);
  }

  function _addListeners() {

    // spyNavList.addEventListener('scroll', _checkNavListScroll);

    window.addEventListener('scroll', _getSpyTargetsSizesAndPositions);

    /* on resize, element heights likely change and so this affects
        where spyTargets upper and lower boundaries are; */
    window.addEventListener('resize', _getSpyTargetsSizesAndPositions);

  }

  _init();

})();