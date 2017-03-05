(function dropdowns() {
  var select = document.getElementById('select');
  var ul;
  var li;
  document.addEventListener('click', function(e) {
    if(e.target.nodeName === 'BUTTON') {
      ul = e.target.nextElementSibling;
      ul.classList.toggle('dropdown__menu-show');
    }

    if (e.target.classList.contains('dropdown__item')) {
        e.target.parentNode.childNodes.forEach(function (node)  {
            if (node.classList && node.classList.contains('dropdown__item--selected')) {
                node.classList.remove('dropdown__item--selected');
            }
        });
        e.target.classList.add('dropdown__item--selected');
    }

    if(e.target.parentNode.id === 'select' &&  e.target.nodeName === 'LI') {
        var li = e.target;
        var selection = e.target.innerText;
        var button = e.target.parentNode.previousElementSibling;
        button.firstChild.textContent = selection;
    }
    e.preventDefault();
    e.stopPropagation();
  });
})();
