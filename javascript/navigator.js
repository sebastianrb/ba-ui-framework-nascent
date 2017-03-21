function scrollDownPartial(){
    console.log("hi");
    window.scrollBy(0, 200);
}
var partial_down = document.getElementById("partial-down").addEventListener("click", scrollDownPartial);

function scrollUpPartial(){
    window.scrollBy(0, -200);
}
var partial_up = document.getElementById("partial-up").addEventListener("click, scrollUpPartial");