(function() {
    //caceh DOM elements
    var carouselSlides = Array.from(document.querySelectorAll(".carousel--fade-tn__image-container"));
    var prevButton = document.querySelector(".carousel--fade-tn__arrow-prev");
    var nextButton = document.querySelector(".carousel--fade-tn__arrow-next");
    var navButtons = Array.from(document.querySelectorAll(".carousel--fade-tn__nav-button"));
    var thumbnails = Array.from(document.querySelectorAll(".carousel--fade-tn__thumbnail"));
    var selectedIndex;

    //find selected index based on which slide has the "selected" class
    for(var i = 0; i < carouselSlides.length; i++) {
        if(carouselSlides[i].classList.contains("carousel--fade-tn__image-container-selected")) {
            selectedIndex = i;
        }
    }

    setThumbnail(selectedIndex);

    //set event handlers
    for(var j = 0; j < navButtons.length; j++) {
        navButtons[j].addEventListener("click", _slideNavigation);
    }

    for(var k = 0; k < thumbnails.length; k++) {
        thumbnails[k].addEventListener("click", _thumbnailNavigation);
    }

    function _slideNavigation(event) {
        // if(event.target.classList.contains("carousel--fade-tn__nav-button")) {
        //     var clickedElement = event.target;
        // }
        var clickedElement = event.currentTarget;

        //handle nav button clicks
        if(clickedElement === nextButton) {
            //remove selected class from current slide
            carouselSlides[selectedIndex].classList.remove("carousel--fade-tn__image-container-selected");

            //change selectedIndex
            //if there is another slide next
            if(carouselSlides[selectedIndex + 1]) {
                selectedIndex++;
            } else {
                selectedIndex = 0;
            }

            //add selected class to new slide
            carouselSlides[selectedIndex].classList.add("carousel--fade-tn__image-container-selected");

            //set thumbnails
            setThumbnail(selectedIndex);

        } else if(clickedElement === prevButton) {
            //remove selected class from current slide
            carouselSlides[selectedIndex].classList.remove("carousel--fade-tn__image-container-selected");

            //change selectedIndex
            //if there is another slide prev
            if(carouselSlides[selectedIndex - 1]) {
                selectedIndex--;
            } else {
                selectedIndex = carouselSlides.length - 1;
            }

            //add selected class to new slide
            carouselSlides[selectedIndex].classList.add("carousel--fade-tn__image-container-selected");

            //set thumbnails
            setThumbnail(selectedIndex);
        }
    }

    function _thumbnailNavigation(event) {
        var clickedThumbnail = event.currentTarget;

        console.log(clickedThumbnail);

        //remove selected class from current slide
        carouselSlides[selectedIndex].classList.remove("carousel--fade-tn__image-container-selected");

        //set selected index
        for(var i = 0; i < thumbnails.length; i++) {
            if(thumbnails[i] === clickedThumbnail) {
                selectedIndex = i;
            }
        }

        //add selected class to new slide
        carouselSlides[selectedIndex].classList.add("carousel--fade-tn__image-container-selected");

        setThumbnail(selectedIndex);
    }

    function setThumbnail(index) {
        thumbnails.forEach(function(item, index) {
            item.classList.remove("carousel--fade-tn__thumbnail--selected");
            if(index === selectedIndex) {
                item.classList.add("carousel--fade-tn__thumbnail--selected");
            }
        });
    }
})();
