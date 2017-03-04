/*
This will be the scrollspy UI for the menu, click on a menu item and go to that section
*/
//create enclosed function so to not leak variables to the global scope.

(function() {
  //have been advised to use 'strct js'
  'use strict';

//set up variables. Capture section elements, make empty object to contain sections
  var section = document.querySelectorAll("section");
  var sections = {};
  var goTo = 0;

//here we're going through each item in the prototype array to identify each section
//which we then call the function() on. Note el = element (shorter & makes it sound more spanish \o/)
  Array.prototype.forEach.call(section, function(el) {
    sections[el.id] = el.offsetTop;
  });

//citing the window object, we can use the onScroll method to position our function
  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

//for loop the goTo index in the sections to gain position
    for (goTo in sections) {
//check if the scroll position is less than the top of the page
      if (sections[goTo] <= scrollPosition) {
//remove active class (could also do with a .remove)
        document.querySelector('.active').setAttribute('class', ' ');
//add next active class
        document.querySelector('a[href*=' + goTo + ']').setAttribute('class', 'active');
      }
    }
  };
window.addEventListener('scroll');
})();
