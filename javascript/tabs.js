(function() {

  var tabAnchors;

  function init() {
    tabAnchors = document.querySelectorAll('.c-na-tabnav__tab a');
    _addListeners();
    console.log('tabAnchors:', tabAnchors);
  }

  function _tabAnchorClicked(event) {
    event.preventDefault();
    var theAnchorId = event.target.getAttribute('href');
    theAnchorId = theAnchorId.slice(theAnchorId.indexOf('#')+1);
    console.log('theAnchorId:', theAnchorId);
    var anchorTarget;
  }

  function _addListeners() {
    for (var i=0; i<tabAnchors.length; i++) {
      tabAnchors[i].addEventListener('click', _tabAnchorClicked);
    }
  }

  init();

})();