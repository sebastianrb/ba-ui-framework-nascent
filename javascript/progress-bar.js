/**
 * Created by hherb on 3/5/2017.
 */

function showProgress(){
    document.getElementById("bar-one").animate([
        // keyframes
        { transform: 'translateX(0px)' },
        { transform: 'translateX(70px)' }
    ], {
        // timing options
        duration: 2000,
        iterations: 6,
    });
    document.getElementById("bar-two").animate([
        // keyframes
        { transform: 'translateX(0px)' },
        { transform: 'translateX(70px)' }
    ], {
        // timing options
        delay: 2000,
        duration: 2000,
        iterations: 5,
    });
    document.getElementById("bar-three").animate([
        // keyframes
        { transform: 'translateX(0px)' },
        { transform: 'translateX(70px)' }
    ], {
        // timing options
        delay: 4000,
        duration: 2000,
        iterations: 4,
    });
    document.getElementById("bar-four").animate([
        // keyframes
        { transform: 'translateX(0px)' },
        { transform: 'translateX(70px)' }
    ], {
        // timing options
        delay: 6000,
        duration: 2000,
        iterations: 3,
    });
}

function showProgressByPercent() {
    var bar = document.getElementById("progress-bar");
    // I am guessing that the parent has the fulll width
    var progressTotal = bar.parentNode.getBoundingClientRect().width;
    var flag = document.getElementById("progress-flag");
    var currentPosition = parseInt(flag.style.left);
    var width = 5;
    var handle = setInterval(frame,50);
    requestAnimationFrame(display);

    function display(){
        bar.style.width = width + '%';
        flag.innerHTML = width * 1  + '%';
        flag.style.left = (progressTotal.left + ((width / 100) * progressTotal.width)) + 'px';
        if(width < 100){
            requestAnimationFrame(display);
        }
    }
    function frame() {
        if (width >= 100) {
            width = 100;
            clearInterval(handle);
        } else {
            width++;
        }
    }
}