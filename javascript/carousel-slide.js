(function() {
    //caceh DOM elements
    // var carouselView = document.querySelector(".carousel--slide");
    var carouselSlides = Array.from(document.querySelectorAll(".carousel--slide__image-container"));
    var prevButton = document.querySelector(".carousel--slide__arrow-prev");
    var nextButton = document.querySelector(".carousel--slide__arrow-next");
    var navButtons = Array.from(document.querySelectorAll(".carousel--slide__nav-button"));
    var bullets = Array.from(document.querySelectorAll(".carousel--slide__bullet"));
    // var selectedSlide;
    var selectedIndex;

    //find selected index based on which slide has the "selected" class
    for(var i = 0; i < carouselSlides.length; i++) {
        if(carouselSlides[i].classList.contains("carousel--slide__image-container-selected")) {
            selectedIndex = i;
        }
    }

    //set styles on previous slide and next slide
    var currentSlide = carouselSlides[selectedIndex];
    var nextSlide = carouselSlides[selectedIndex + 1];
    var prevSlide = carouselSlides[carouselSlides.length - 1];

    setBullet(selectedIndex);

    //set event handlers
    for(var k = 0; k < navButtons.length; k++) {
        navButtons[k].addEventListener("click", _slideNavigation);
    }

    for(var j = 0; j < bullets.length; j++) {
        bullets[j].addEventListener("click", _bulletNavigation);
    }

    function _slideNavigation(event) {

        var clickedElement = event.currentTarget;
        // console.log(clickedElement);

        //handle nav button clicks
        if(clickedElement === nextButton) {
            // if(prevSlide) {
            //     prevSlide.classList.remove("slide-to-left");
            // }

            //remove current "slide" classes
            currentSlide.classList.remove("slide-to-right", "slide-from-left");
            nextSlide.classList.remove("slide-to-right", "slide-from-left");
            prevSlide.classList.remove("slide-to-right", "slide-from-left");

            //slide animation
            currentSlide.classList.add("slide-to-left");
            nextSlide.classList.add("slide-from-right");
            currentSlide.classList.remove("carousel--slide__image-container-selected");
            nextSlide.classList.add("carousel--slide__image-container-selected");


            //change selectedIndex
            //if there is another slide next
            if(carouselSlides[selectedIndex + 1]) {
                selectedIndex++;
            } else {
                selectedIndex = 0;
            }

            //set current, next, and previous slides
            currentSlide = carouselSlides[selectedIndex];

            //you're not at the last slide
            if(carouselSlides[selectedIndex + 1]) {
                //you're at the first slide
                if(selectedIndex === 0) {
                    nextSlide = carouselSlides[selectedIndex + 1];
                    prevSlide = carouselSlides[carouselSlides.length - 1];
                //you're not at the first slide
                } else {
                    nextSlide = carouselSlides[selectedIndex + 1];
                    prevSlide = carouselSlides[selectedIndex - 1];
                }

            //you're at the last slide
            } else {
                nextSlide = carouselSlides[0];
                prevSlide = carouselSlides[selectedIndex - 1];
                // currentSlide.classList.remove("slide-from-right");
            }

            console.log("Current Slide: ", currentSlide);
            console.log("Next Slide: ", nextSlide);
            console.log("Previous Slide: ", prevSlide);



            prevSlide.classList.remove("slide-from-right");
            currentSlide.classList.remove("slide-to-left");

            //set bullets
            setBullet(selectedIndex);

        } else if(clickedElement === prevButton) {

            //remove current "slide" classes
            currentSlide.classList.remove("slide-to-left", "slide-from-right");
            nextSlide.classList.remove("slide-to-left", "slide-from-right");
            prevSlide.classList.remove("slide-to-left", "slide-from-right");

            //slide animation
            currentSlide.classList.add("slide-to-right");
            prevSlide.classList.add("slide-from-left");
            currentSlide.classList.remove("carousel--slide__image-container-selected");
            prevSlide.classList.add("carousel--slide__image-container-selected");

            // //remove selected class from current slide
            // carouselSlides[selectedIndex].classList.remove("carousel--slide__image-container-selected");

            //change selectedIndex
            //if there is another slide prev
            if(carouselSlides[selectedIndex - 1]) {
                selectedIndex--;
            } else {
                selectedIndex = carouselSlides.length - 1;
            }

            //set current, next, and previous slides
            currentSlide = carouselSlides[selectedIndex];

            //you're not at the last slide
            if(carouselSlides[selectedIndex + 1]) {
                //you're at the first slide
                if(selectedIndex === 0) {
                    nextSlide = carouselSlides[selectedIndex + 1];
                    prevSlide = carouselSlides[carouselSlides.length - 1];
                //you're not at the first slide
                } else {
                    nextSlide = carouselSlides[selectedIndex + 1];
                    prevSlide = carouselSlides[selectedIndex - 1];
                }

            //you're at the last slide
            } else {
                nextSlide = carouselSlides[0];
                prevSlide = carouselSlides[selectedIndex - 1];
            }

            // //add selected class to new slide
            // carouselSlides[selectedIndex].classList.add("carousel--slide__image-container-selected");

            console.log("Current Slide: ", currentSlide);
            console.log("Next Slide: ", nextSlide);
            console.log("Previous Slide: ", prevSlide);

            // nextSlide.classList.remove("slide-to-right");
            // currentSlide.classList.remove("slide-from-left");
            nextSlide.classList.remove("slide-from-left");
            currentSlide.classList.remove("slide-to-right");

            //set bullets
            setBullet(selectedIndex);
        }
    }

    function _bulletNavigation(event) {
        var clickedBullet = event.target;

        //remove current "slide" classes
        currentSlide.classList.remove("slide-to-right", "slide-from-left");
        nextSlide.classList.remove("slide-to-right", "slide-from-left");
        prevSlide.classList.remove("slide-to-right", "slide-from-left");

        //remove selected class from current slide
        carouselSlides[selectedIndex].classList.remove("carousel--slide__image-container-selected");

        //set selected index
        for(var i = 0; i < bullets.length; i++) {
            if(bullets[i] === clickedBullet) {
                selectedIndex = i;
            }
        }

        //set current, next, and previous slides
        currentSlide = carouselSlides[selectedIndex];

        //you're not at the last slide
        if(carouselSlides[selectedIndex + 1]) {
            //you're at the first slide
            if(selectedIndex === 0) {
                nextSlide = carouselSlides[selectedIndex + 1];
                prevSlide = carouselSlides[carouselSlides.length - 1];
            //you're not at the first slide
            } else {
                nextSlide = carouselSlides[selectedIndex + 1];
                prevSlide = carouselSlides[selectedIndex - 1];
            }

        //you're at the last slide
        } else {
            nextSlide = carouselSlides[0];
            prevSlide = carouselSlides[selectedIndex - 1];
        }

        //remove current "slide" classes
        currentSlide.classList.remove("slide-to-right", "slide-from-left");
        nextSlide.classList.remove("slide-to-right", "slide-from-left");
        prevSlide.classList.remove("slide-to-right", "slide-from-left");

        //add selected class to new slide
        carouselSlides[selectedIndex].classList.add("carousel--slide__image-container-selected");


        setBullet(selectedIndex);
    }

    function setBullet(index) {
        bullets.forEach(function(item, index) {
            item.classList.remove("carousel--slide__bullet--bullet-selected");
            if(index === selectedIndex) {
                item.classList.add("carousel--slide__bullet--bullet-selected");
            }
        });
    }
})();
