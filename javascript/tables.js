/**
 * Created by hherb on 3/5/2017.
 */

var rowElements = document.querySelectorAll('tr'),
    i, len = rowElements.length;

for ( i = 0; i < len; i++ ) {
    rowElements[i].addEventListener('click',  function(e){
        var clickedElement = e.target;
        var clickedElementName = clickedElement.tagName.toLowerCase();
        if ( clickedElementName === 'input' && clickedElement.checked === true ) {
            // if the clicked element is an input element, and is checked, meaning it's a checkbox, do the following:
            this.style.color = "blue";
        }
        else{
            this.style.color = "black";
        }
    })
}