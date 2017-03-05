(function naAlerts() {
  'use strict';
  /*
  FOR DEMO PURPOSES ONLY
  The event listener and target of the listener will have to be changed for each project
*/

// reference to the container for all alert demos
  var alertCont = document.getElementById('alerts');

  function dismissAlert(alert) {
    alert.classList.add('dismissing-alert');
    alert.addEventListener('animationend', function() {
      this.parentNode.removeChild(this);
    });
  }

  // listen on the alert container to avoid adding listeners to each button
  alertCont.addEventListener('click', function(e) {
    if (e.target.nodeName === 'BUTTON') {
      // pass the alert element to the dismiss function so we don't have to do e.target in the function
      dismissAlert(e.target.parentNode);
    }
  });
})();
