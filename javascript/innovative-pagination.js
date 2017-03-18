(function () {
   var slider = document.getElementById('sliderRange');
   var myInput = document.getElementById('inputNumber');
   var inputWidth = myInput.offsetWidth;
   var width = slider.offsetWidth;
   var max = slider.getAttribute('max');
   var value;

  slider.addEventListener('input', outputUpdate, false);
  myInput.addEventListener('input', sliderUpdate, false);

  // Handles entering the value in the input tooltip and moving the position of the tooltip.
  function outputUpdate(e) {
    value = e.target.value;
  	myInput.value = value;
    myInput.style.left = (parseFloat((width / max) * value * (1-((inputWidth - 10)/width)))) + 'px' ;
    e.preventDefault();
  }

  // Handles checking the value of the number entered in the input tootip and handles and move the position of the thumb and the tooltip.
  function sliderUpdate(e, oldvalue) {
    var min = e.target.min;
    var max = e.target.max;
    value = e.target.value;

    if (parseInt(value) < parseInt(min) ) {
      value = 1;
    }

    if (parseInt(value) > parseInt(max)) {
      value = 100;
    }

    if(value === "") {
      value = 1;
    }
    
  	slider.value = value;
    myInput.style.left = (parseFloat((width / max) * value * (1-((inputWidth - 10)/width)))) + 'px';
    e.preventDefault();
  }
})();
