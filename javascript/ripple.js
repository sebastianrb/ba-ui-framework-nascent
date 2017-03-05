/* for version ripple-child */
(function() {
  // using this IIFE will keep variables in here out of window's scope
  // without IIFE, i.e., just code below, all variables would be in window's scope

  /*
      http://www.w3schools.com/colors/colors_picker.asp

      red: hsla(0, 100%, 50%, 0.5) , rgba(255, 0, 0, 0.5)
      green: hsla(120, 100%, 50%, 0.5) , rgba(0, 255, 0, 0.5)
      blue: hsla(240, 100%, 50%, 0.5) , rgba(0, 0, 255, 0.5)
      yellow: hsla(60, 100%, 50%, 0.5) , rgba(255, 255, 0, 0.5)
      deep pink: hsla(350, 100%, 70%, 0.5) , rgba(255, 102, 128, 0.5)
      fuchsia: hsla(300, 100%, 50%, 0.5) , rgba(255, 0, 255, 0.5)
      orange: hsla(39, 100%, 50%, 0.5) , rgba(255, 165, 0, 0.5)
      purple: hsla(300, 100%, 30%, 0.5) , rgba(153, 0, 153, 0.5)
      narragansett blue-green: hsla(168, 100%, 50%, 0.5) , rgba(0, 255, 204, 0.5)
      carribean blue: hsla(195, 100%, 60%, 0.5) , rgba(51, 204, 255, 0.5)
      green-yellow: hsla(66, 100%, 55%, 0.5) , rgb(232, 255, 26, 0.5)

      black: hsla(0, 0%, 0%, 0.5) , rgba(0, 0, 0, 0.5)
      gray: hsla(0, 0%, 50%, 0.5) , rgba(128, 128, 128, 0.5)
  */

  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY
  /* https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
       can be used to get equivalent of jQuery $(el).offset(); as suggested
      in http://youmightnotneedjquery.com/
  */
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight

  var docBody = document.body;
  docBody.addEventListener('click', _findRippleElement);

  function _findRippleElement(event) {
    console.log('event.target for docBody "click" event:', event.target);
    if (event.target.classList.contains('ripple-element')) {
        _rippleParentClick(event);
        /* this removes span.ripple, and span.ripple-container when the animation ends */
        /* This code just below specifically targets the span.ripple that gets
            added with each click, which is also what we want to remove (along
            with rippleContainer) with each click so we don't "pile up" the
            span.ripple, and span.ripple-container elements;
            The other reason we NEED to remove a previously placed ripple
            element is that with each click, the event position will most likely
            change, i.e., event.pageX, and event.pageY would be almost impossible
            to duplicate exactly with each click. And those values are used to
            create the style.top, and style.left values for the ripple element.
        */
        event.target.querySelector('span.ripple-container span.ripple').addEventListener('animationend', _cleanUp);
    } // end if

  } // end _findRippleElement

  /* once the ripplePropagation animation is done, we want to remove the
      'span.ripple' element, the 'animationend' listener on it, and the
      'ripple-clip' class from rippleParentElement if it had been added so
      as not to affect the author's styling, or the ripple effect that may
      be applied to a child element; */
  function _cleanUp(event) {
      /* NOTE that event.target in here is 'span.ripple' */
      var eventTarget = event.target;
      /* NOTE: the line below did not work in IE 11;
          it was necessary to use node.removeChild;
          https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
          https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      */
      // eventTarget.parentElement.remove();
      /* below removes span.ripple-container, and therefore also its child,
          span.ripple, from the DOM */
      eventTarget.parentElement.parentElement.removeChild(eventTarget.parentElement);

      /* we also want to get rid of the event listener rather than "pile" them up */
      eventTarget.removeEventListener('animationend', _cleanUp);
  }

  function _rippleParentClick(event) {
    console.log('Using the passed-in event to rippleClick, event.target is:', event.target);
    var rippleParentElement = event.target;
    var rippleColor = rippleParentElement.dataset.rippleColor;
    var rippleClip = rippleParentElement.dataset.rippleClip;
    /* geometry of rippleParentElement */
    var rect = rippleParentElement.getBoundingClientRect();
    var posX = rect.left;
    var posY = rect.top;
    /* get values to be used for rippleElement */
    var rippleElementWidth = rippleParentElement.offsetWidth; // = rect.width
    var rippleElementHeight = rippleParentElement.offsetHeight; // = rect.height
    var rippleElement = document.createElement('span');
    /* coordinates for the absolute position left value (x), and the absolute
        position top value (y) for the rippleElement so that its center will
        correspond to the point on the page where the click event occurred on
        the rippleParentElement */
    var x;
    var y;

    /* this is the absolutely-positioned container element for the rippleElement;
        I chose to do this because when specifying ripple clip (overflow: hidden
        on parent element), this caused a jump in the parent element when
        overflow: hidden was applied/removed;
        That jump no longer occurs with the absolutely-positioned parent element */
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add('ripple-container');
    rippleContainer.style.width = rect.width + 'px';
    rippleContainer.style.height = rect.height + 'px';
    /* add rippleParentElement to DOM */
    rippleParentElement.appendChild(rippleContainer);

    /* add rippleElement to rippleParentElement and set properties and attributes */
    // rippleParentElement.insertBefore(ripple, rippleParentElement.firstChild);
    rippleContainer.appendChild(rippleElement);

    /* add the effect-defining class */
    rippleElement.classList.add('ripple');

    /* if a custom effect color was specified with the data-ripple-color
        attribute, then apply the style to the rippleElement */
    if (rippleColor) {
        console.log('rippleParentElement.dataset.rippleColor', rippleColor);
        if (_isRGBA(rippleColor) || _isHSLA(rippleColor)) {
            rippleElement.style.backgroundColor = rippleColor;
        }
    }

    /* if ripple 'clipping' was specified with the data-ripple-clip
        attribute, then add the appropriate class to its classList */
    if (rippleClip == 'true') {
        // rippleParentElement.classList.add('ripple-clip');
        rippleContainer.classList.add('ripple-clip');
    }

    /* the following effectively creates equal dimensions for width and height
        which will be the greater of rippleParentElement width and height;
        when assigned to .ripple with a border radius of 50%, this creates
        a circle with a diameter equal to the greater of the width or height
        of the rippleParentElement;
        to make a smaller effect, change the >= to <=;
    */
    if(rippleElementWidth >= rippleElementHeight) {
      rippleElementHeight = rippleElementWidth;
    } else {
      rippleElementWidth = rippleElementHeight;
    }

    /* the aim of these statements are ultimately to center the .ripple
        element, with width equal to height and equal to the greater of
        rippleParentElement width and height, to where the x-coord, y-coord
        position of where the click event took place;
    */
    /* pageXOffset, and pageYOffset account for having scrolled;
        without that, if you scroll, you likely won't see the effect since
        it may then occur out of view;
    */
    x = event.pageX - posX - (rippleElementWidth / 2) - pageXOffset;
    y = event.pageY - posY - (rippleElementHeight / 2) - pageYOffset;

    rippleElement.style.width = rippleElementWidth + 'px';
    rippleElement.style.height = rippleElementHeight + 'px';
    rippleElement.style.top = y + 'px';
    rippleElement.style.left = x + 'px';

    /* now that rippleElement has all of the proper/necessary properties and
        attributes, run the animation */
    rippleElement.classList.add('ripple-effect');

    /* log information - great for examination and troubleshooting */
    console.log('rect:', rect);
    console.log('rippleElementWidth:', rippleElementWidth);
    console.log('rippleElementHeight:', rippleElementHeight);
    console.log('event.pageX:', event.pageX, '; posX:', posX, '; rippleElementWidth:', rippleElementWidth, '; pageXOffset:', pageXOffset);
    console.log('event.pageY:', event.pageY, '; posY:', posY, '; rippleElementHeight:', rippleElementHeight, '; pageYOffset:', pageYOffset);
    console.log('x:', x, '; y:', y);
    console.log('rippleElement.style.top = ' + y + 'px');
    console.log('rippleElement.style.left = ' + x + 'px');
    console.log('exiting _rippleParentClick ***********************************');

  } // end _rippleParentClick

  function _isRGBA(input) {
    /*
      Checks if the input string is an RGBA color,
      such as rgba(200, 26, 131, 0.5).
      An RGBA color consists of:
      - Three numbers (red, green, blue) between 0 and 255, and an
        alpha-transparency value between 0 and 1.
      - A comma between each number
      - The four numbers should be contained within “rgba(” and “)“.
    */
    var rgbaArr;
    if (!( input.slice(0,5) == 'rgba(' && input.charAt(input.length-1) == ')' ) ) return false;
    rgbaArr = input.slice(5, input.length - 1).split(',');
    if (rgbaArr.length != 4) return false;
    for (var i=0; i<3; i++) {
      if ( !(0 <= parseInt(rgbaArr[i]) && parseInt(rgbaArr[i]) <= 255) ) return false;
    }
    if ( !(0 <= parseFloat(rgbaArr[3]) && parseFloat(rgbaArr[3]) <= 1) ) return false;
    return true;
  } // end _isRGBA

  function _isHSLA(input) {
    /*
      Checks if the input string is an HSL color, such as hsl(122, 10%, 30%).
      An HSL color consists of:

      - Three numbers:
        * the first value, Hue, is between 0 and 360
        * the second and third values, Saturation and Lightness, are between 0% and 100%
      - A comma between each value
      - The three values should be contained within “hsl(” and “)“.
    */
    var hslaArr;
    if (!( input.slice(0,5) == 'hsla(' && input.charAt(input.length-1) == ')' ) ) return false;
    hslaArr = input.slice(5, input.length - 1).split(',');
    if (hslaArr.length != 4) return false;
    if ( !(0 <= parseInt(hslaArr[0]) && parseInt(hslaArr[0]) <= 360) ) return false;
    for (var i=1; i<3; i++) {
      /* must have '%' in these 2 values */
      if (hslaArr[i].indexOf('%') == -1) return false;
      /* NOTE: this test lets '.0.7' through;
        parseFloat('.0.7') evaluates to 0 */
        /* use just the portion before '%' to evaluate numerically */
        hslaArr[i] = hslaArr[i].slice(0, hslaArr[i].indexOf('%')).trim();
      if ( !(0 <= parseInt(hslaArr[i]) && parseInt(hslaArr[i]) <= 100) ) return false;
    }
    if ( !(0 <= parseFloat(hslaArr[3]) && parseFloat(hslaArr[3]) <= 1) ) return false;
    return true;
  } // end _isHSLA

})();