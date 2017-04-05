# Prólogo

Intentando mostrar por código como se puede hacer lo mismo en VanillaJS sin depender de jQuery (~30kb gz), termine haciendo una versión LITE de jQuery.
Soporta QSA (+ context), .find, .on (+ delegate), .off, .forEach (.each).

### jQuery vs. VanillaJS vs. VanillaJQuery

```html
<form id="frmContact">
  <button id="frmContact__btnSend">Enviar</button>
</form>
```

```javascript
var $btnSend; // jQuery ($)
var btnSend; // VanillaJS
var v$btnSend; // VanillaJQuery (v$)

function btnSend_clickHandler(event) {
  event.preventDefault();
  console.log('btnSend_clickHandler!');
  unbind();
}

function cache() {
  // jQuery
  //$btnSend = jQuery('#frmContact__btnSend');
  $btnSend = $('#frmContact__btnSend');

  // VanillaJS
  //btnSend = document.getElementById('frmContact__btnSend');
  btnSend = document.querySelector('#frmContact__btnSend');

  // VanillaJQuery
  v$btnSend = v$('#frmContact__btnSend');
}

function bind() {
  // jQuery: on
  $btnSend.on('click', btnSend_clickHandler);

  // VanillaJS: addEventListener
  btnSend.addEventListener('click', btnSend_clickHandler);

  // VanillaJQuery: on
  v$btnSend.on('click', btnSend_clickHandler);
  
  // VanillaJQuery: on delegate
  //v$('#frmContact').on('click', '#frmContact__btnSend', btnSend_clickHandler);
}

function unbind() {
  // jQuery: off
  $btnSend.off('click', btnSend_clickHandler);

  // VanillaJS: removeEventListener
  btnSend.removeEventListener('click', btnSend_clickHandler);

  // VanillaJQuery: off
  v$btnSend.off('click', btnSend_clickHandler);
}

function init() {
  cache();
  bind();
}

init();
```
