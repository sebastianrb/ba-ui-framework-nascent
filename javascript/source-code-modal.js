/**
 * Created by hherb on 3/20/2017.
 */

var source_code_modal = document.getElementsByClassName("source-code-modal");
var scm_html_content = document.querySelectorAll("div.scm-html-content");

var inputElements = document.getElementsByTagName('input');

function display_HTML_Content(){
    var scm_css_content = document.getElementById("scm-css-content-b").style.display='none';
    var scm_js_content = document.getElementById("scm-js-content-b").style.display='none';
}

window.addEventListener('load', display_HTML_Content);

function display_SCM_Content(event){
    var SCM_class = event.target.className;
    var SCM_content = document.getElementsByTagName("div");
    for (var i = 0; i < SCM_content.length; i++){
        if (SCM_content[i].className !== SCM_class &&
            SCM_content[i].className !== "source-code-modal" &&
            SCM_content[i].className !== "scm-content-display"){
            SCM_content[i].style.display = 'none';
        }
        else{
            SCM_content[i].style.display = "block";
        }
    }
}

for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('click', display_SCM_Content);
}