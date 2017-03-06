(function() {

  var tabAnchors;
  var tabAnchorTargets;

  function init() {
    tabAnchors = document.querySelectorAll('.c-na-tabnav__tab a');
    tabAnchorTargets = document.querySelectorAll('.c-na-tab-content__tab-pane');
    console.log('tabAnchorTargets:', tabAnchorTargets);
    _addListeners();
    console.log('tabAnchors:', tabAnchors);
  }

  function _tabAnchorClicked(event) {
    event.preventDefault();
    var theAnchorId = event.target.getAttribute('href');
    //theAnchorId = theAnchorId.slice(theAnchorId.indexOf('#')+1);
    console.log('theAnchorId:', theAnchorId);
    /* now find the target div to show it, and hide all others */
    var anchorTarget = document.querySelector('.c-na-tab-content__tab-pane' + theAnchorId);
    console.log('anchorTarget:', anchorTarget);
    for (var i=0; i<tabAnchorTargets.length; i++) {
      tabAnchorTargets[i].classList.remove('show');
      tabAnchorTargets[i].classList.remove('hide');
      tabAnchorTargets[i].classList.add('hide');
      console.log('tabAnchorTargets[i]:', tabAnchorTargets[i]);
    }
    anchorTarget.classList.remove('hide');
    anchorTarget.classList.add('show');

    for (i=0; i<tabAnchors.length; i++) {
      tabAnchors[i].classList.remove('active');
    }
    event.target.classList.add('active');
  } // end _tabAnchorClicked

  function _addListeners() {
    for (var i=0; i<tabAnchors.length; i++) {
      tabAnchors[i].addEventListener('click', _tabAnchorClicked);
    }
  }

  init();

})();