/**
 * Created by hherb on 3/5/2017.
 */
var span_display = document.querySelectorAll("P");

for (var i = 0; i < span_display.length; ++i)
    span_display[i].addEventListener("mouseover", function(e){
        e.target.nextSibling.style.display = "inline-block";
        e.preventDefault;
    });

var span_hidden = document.querySelectorAll("P");

for (var i = 0; i < span_hidden.length; ++i)
    span_hidden[i].addEventListener("mouseout", function(e){
        e.target.nextSibling.style.display = "none";
        e.preventDefault;
    });

