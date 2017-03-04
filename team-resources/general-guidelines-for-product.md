When reviewing you components, I will check for:

- any plagiarized code (don't just copy and paste some other team or framework's components). It's totally fine to copy Paul Irish's box-sizing reset, for example, but do not go to Bootstrap's site and copy their tab component's code.

- valid HTML and CSS without errors, and I will be running your JavaScript (if any) through JSHint

- you're meeting at least basic accessibility standards (not taking *away* built-in accessibility; you don't need to go out of your way to *add* accessibility at the moment, unless you want to and have time)

I also encourage you to follow the JavaScript best practices ([link](https://github.com/moderndeveloper-students/Modern-Developer-JavaScript-Style-Guide)) and CSS best practices (from the chapter we were assigned) as much as possible.

The ones which I especially encourage you to follow are:

## JavaScript

- Variable declarations should be made on a new line each, and at the top of their scope. ([link](https://github.com/moderndeveloper-students/Modern-Developer-JavaScript-Style-Guide#variable-declarations)). It's much easier to see at a glance what your variables are if they aren't all declared on one line.

- Use strict mode, especially being this will ideally end up in projects other people are working on ([link](https://github.com/moderndeveloper-students/Modern-Developer-JavaScript-Style-Guide#strict-mode))

- Comparisons - using strict equality ([link](https://github.com/moderndeveloper-students/Modern-Developer-JavaScript-Style-Guide#comparisons))

- Naming your function expressions for debugging purposes ([link](https://github.com/moderndeveloper-students/Modern-Developer-JavaScript-Style-Guide#functions))

Since we're all working on different components and can't be sure what anyone is naming their variables and functions, please wrap your code in an IIFEE:

  ```JavaScript
  (function () {
    // the JavaScript for your component
  })();
  ```

## CSS

- use relative units as much as possible. Try not setting things like width, padding, and margins in `px`. Use `em`, `rem`, and `%` as much as possible.

- whenever we decide on a naming convention, stick with it. If you're unsure of something, ask a teammate. I think most of us are just learning when it comes to this, so just try your best to be consistent.

- organize your CSS declarations in alphabetical order. This makes it easier to know where to look to change or add a new declaration. When they are randomly ordered, it's harder to work with. For example:

  **GOOD**

  ```CSS
  .some-selector {
    color: red;
    line-height: 1.4;
    padding: 1em;
  }
  ```

  **BAD**  

  ```CSS
  .some-selector {
    padding: 1em;
    line-height: 1.4;
    color: red;
  }
  ```
- never use IDs for styling. Even if you just want to style that one element, give it a class and style that class. Using IDs for styling is a clear path to specificity hell if you ever need to override it.

  **GOOD**

  ```CSS
  .my-el {
    color: blue;
  }
  ```

  **BAD**

  ```css
  #my-el {
    color: blue;
  }
  ```

- try to apply as little specificity as possible. It's not always possible to just use one selector when styling, but it should the the goal, and in general, you should be able to get away with it, only adding a bit of specificity where needed. Being overly specific should not be the default. For example, with the following markup:

  ```html
  <nav class="main-nav">
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </nav>
  ```

  if you want to style the `li` elements, try adding a class to them (something like `nav__item`) and styling that:

  **GOOD**  
  ```CSS
  .main-nav__item {
    padding: 1em;
  }
  ```

  instead of doing something like this, which adds specificity that we do not need:

  **BAD**

  ```CSS
  .main-nav li {
    padding: 1em;
  }
  ```

## Accessibility

### Behavior

Anything that should be able to be clicked should also be able to receive keyboard focus. For example, natively a `button` element can be clicked, and also focused. The same with a link and inputs.

When we do things like use `div` or other non-focusable elements for things that will receive `click` events, these also should:

- be put in the tabbing order with `tabindex="0"`
- be given `keyDown` events that are the same as the `click` event, triggered by the <kbd>ENTER</kbd>. (**[CSS Tricks][key-events] has a helpful page with how to detect which key has been pressed and how to check for certain keys.**)This mimics native behavior of focusable elements.

When making custom inputs (such as nicely designed checkboxes or radio inputs) **do not hide the input with `display: none`**! This will hide it from the screenreader and also make it impossible for anyone to navigate to list of inputs using a keyboard.

Instead, hide it visually and so it takes up no space with the following CSS (it will be added to our framework):

```css
.sr-only {
  clip: rect(1px 1px 1px 1px);
  overflow: hidden;
  height: 1px;
  position: absolute;
  width: 1px;
}
```

### Focus

By default, elements which can receive focus either natively (*buttons, inputs, anchors with an `href` value, etc.*) or when adding a `tabindex` value of `0` or higher have some sort of focus style. This is usually an outline which is styled a bit differently in each browser. It's not the most attractive styling, so many developers set `outline: 0;` to some or all elements.

**If you remove the default outline to `:focus` states, you must add your own `:focus` styles.** Without doing so, anyone navigating with a keyboard (*tabbing through*) will not be able to tell which element is in focus. Just as we use `:hover` states, `:focus` states are needed.

Ideally, your `:focus` styling should differ from your `:hover` state somehow since an element can be both in focus and hovered at the same time.  Styling both the same is fine, but adding even a small difference goes the extra step.


[key-events]: https://css-tricks.com/snippets/javascript/javascript-keycodes/
