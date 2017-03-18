(function() {
    //caceh DOM elements
    var socialBar = document.querySelector(".social-bar");
    var iconButtons = Array.from(document.querySelectorAll(".social-bar__social-icon-container"));
    var shareP = document.querySelector(".social-bar__share-number");
    var shareCaption = document.querySelector(".social-bar__share-caption");
    var shareCount = 0;
    var facebookCount = 0;
    var twitterCount = 0;
    var googleCount = 0;

    //add event listeners
    for(var i = 0; i < iconButtons.length; i++) {
        iconButtons[i].addEventListener("click", _incrementIcon);
    }

    //increment "shared" numbers throughout component
    function _incrementTotalShares() {
        shareCount ++;
        if(shareCount === 1) {
            shareCaption.textContent = "share";
        } else {
            shareCaption.textContent = "shares";
        }
        var newShareP = document.createElement("p");
        // newShareP.classList.add();
        newShareP.classList.add("social-bar__share-number", "social-bar__share-number--moved-left");
        shareP.classList.add("slide-right");
        socialBar.firstElementChild.append(newShareP);
        setTimeout(function() {
            newShareP.textContent = shareCount;
            newShareP.classList.remove("slide-from-left", "social-bar__share-number--moved-left");
            shareP.remove();
            shareP = document.querySelector(".social-bar__share-number");
        }, 200);
    }

    function _incrementIcon(event) {
        //increment icon share count
        var buttonClicked = event.currentTarget;
        var iconCounter = buttonClicked.querySelector(".social-bar__icon-count");
        iconCounter.textContent = parseInt(iconCounter.textContent) + 1;

        //increment total shares
        _incrementTotalShares();
    }

})();
