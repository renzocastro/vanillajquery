# Prólogo

Intentando mostrar por código como se puede hacer lo mismo en VanillaJS sin depender de jQuery (~30kb gz), termine haciendo una versión LITE de jQuery.
Soporta QSA (+ context), .find, .on (+ delegate), .off, .forEach (.each).

El alias que use para esta función fue `fe`. Así que en adelante les mostraré como se puede trabajar con `fe`!

### jQuery vs. VanillaJS vs. FrontendJS

```html
<form id="frmContact">
  <button class="frmContact__btnSend">Enviar</button>
</form>
```

```javascript
var $btnSend; // jQuery
var btnSend; // VanillaJS
var fe_btnSend; // FrontendJS

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

  // FrontendJS
  fe_btnSend = fe('#frmContact__btnSend');
}

function bind() {
  // jQuery: on
  $btnSend.on('click', btnSend_clickHandler);

  // VanillaJS: addEventListener
  btnSend.addEventListener('click', btnSend_clickHandler);

  // FrontendJS: on
  fe_btnSend.on('click', btnSend_clickHandler);
  
  // FrontendJS: on delegate
  //fe('#frmContact').on('click', '#frmContact__btnSend', btnSend_clickHandler);
}

function unbind() {
  // jQuery: off
  $btnSend.off('click', btnSend_clickHandler);

  // VanillaJS: removeEventListener
  btnSend.removeEventListener('click', btnSend_clickHandler);

  // FrontendJS: off
  fe_btnSend.off('click', btnSend_clickHandler);
}

function init() {
  cache();
  bind();
}

init();
```