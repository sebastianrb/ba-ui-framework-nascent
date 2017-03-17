(function () {
 var slider = document.getElementById('sliderRange');
 var myInput = document.getElementById('inputNumber');
 var width = slider.offsetWidth;
 var max = slider.getAttribute('max');
 var value;

slider.addEventListener('input', outputUpdate, false);
myInput.addEventListener('input', sliderUpdate, false);

function outputUpdate(e) {
  value = e.target.value;
	myInput.value = value;
  myInput.style.left = ((width / max) * value) + 'px';
  e.preventDefault();
}


function sliderUpdate(e) {
  value = e.target.value;
  if(value === "") {
    value = 0;
  }
	slider.value = value;
  myInput.style.left = ((width / max) * value) + 'px';
  e.preventDefault();
}

//http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
})();
