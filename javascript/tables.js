/**
 * Created by hherb on 3/5/2017.
 */

//The following code takes rows that are checked off and makes them bold.

var rowElements = document.getElementsByClassName('tr-selected');
for (var i = 0; i < rowElements.length; i++ ) {
    rowElements[i].addEventListener('click',  function(e){
        var clickedElement = e.target;
        var clickedElementName = clickedElement.tagName.toLowerCase();
        if ( clickedElementName === 'input' && clickedElement.checked === true ) {
            this.style.fontWeight = "bold";
        }
        else{
            this.style.fontWeight = "normal";
        }
    })
}

/*********************/

//The following code will take rows that are checked off and make them disappear.

var rowElements = document.querySelectorAll('.tr-deselected input[type="checkbox"]');
for (var i = 0; i < rowElements.length; i++) {
    rowElements[i].addEventListener('change', function(e) {
        var nextElement = this.parentElement.nextElementSibling;
        while(nextElement) {
            nextElement.style.display = this.checked ? "none" : "table-cell";
            nextElement = nextElement.nextElementSibling;
        }
    });
}

/**********************/

//The following code highlights columns as they are moused over, any as long as they have the same class name.

var cellElements = document.getElementsByTagName('td');
function colorSimilar(event) {
    var className = event.target.className;
    for (var i = 0; i < cellElements.length; i++) {
        if (cellElements[i].className == className && cellElements[i].className !== "td-input" && cellElements[i].className !== "no-lite") {
            cellElements[i].style.backgroundColor = '#c2c6e2';
        } else {
            cellElements[i].style.backgroundColor = null;
        }
    }
}

for (var i = 0; i < cellElements.length; i++) {
    cellElements[i].addEventListener('mouseover', colorSimilar)
}

/*********************/

//The following functions enable the user to add or hide comments in the table cells.

var textAreaDiv1 = document.getElementById('ta-one').style.display='none';
var textAreaDiv1 = document.getElementById('ta-two').style.display='none';
var textAreaDiv1 = document.getElementById('ta-three').style.display='none';

function hideComment(){
    this.parentNode.style.display="none";
    this.parentNode.parentNode.firstChild.style.display="block";
}

var exitButton = document.querySelectorAll(".exit-button");
for (var i = 0; i < exitButton.length; i++){
    exitButton[i].addEventListener ('click', hideComment, false);
}

function addComment(){
    this.style.display = 'none';
    this.nextSibling.style.display = "block";
}

var displayComment = document.querySelectorAll(".fa-comment-o");
for (var i = 0; i < displayComment.length; i++){
    displayComment[i].addEventListener('click', addComment, false);
}


