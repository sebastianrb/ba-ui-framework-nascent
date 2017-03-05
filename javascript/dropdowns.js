(function dropdowns() {
  var select = document.getElementById('select');
  var ul;
  var li;
  var button;
  document.addEventListener('click', function(e) {
    // check if button is clicked and toggle showing dropdown menu
    if(e.target.nodeName === 'BUTTON') {
      ul = e.target.nextElementSibling;
      ul.classList.toggle('dropdown__menu--show');
    }

    // check if dropdown item is a selected add class to seleted item
    if (e.target.classList.contains('dropdown__item')) {
      ul = e.target.parentNode;
      li = e.target.parentNode.childNodes;
        li.forEach(function (node)  {
            if (node.classList && node.classList.contains('dropdown__item--selected')) {
                node.classList.remove('dropdown__item--selected');
            }
        });
        e.target.classList.add('dropdown__item--selected');
        ul.classList.toggle('dropdown__menu--show');
    }

    // check if dropdown is a select dropdown and append selection name to button.
    if(e.target.parentNode.id === 'select' &&  e.target.nodeName === 'LI') {
        var li;
        var selection;
        var button;
        ul.classList.toggle('dropdown__menu--show');
        li = e.target;
        selection = e.target.innerText;
        button = e.target.parentNode.previousElementSibling;
        button.firstChild.textContent = selection;
        button.setAttribute('class', 'dropdown__button--selected');
        ul.classList.toggle('dropdown__menu--show');
    }

    // check if clicked anywhere on the body close the dropdown.
    if(e.target.classList.length === 0) {
      ul.classList.toggle('dropdown__menu--show');
    };

    e.preventDefault();
    e.stopPropagation();
  });
})();
