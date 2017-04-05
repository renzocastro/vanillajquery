!(function(){
  var VanillaJQuery = function(selector, context) {
    if (!(this instanceof VanillaJQuery)) {
      if (context) {
        return VanillaJQuery(context).find(selector);
      } else {
        return new VanillaJQuery(selector);
      }
    }

    var _instance = [];

    // If first argument is a selector
    if (typeof selector === 'string') {
      VanillaJQuery.forEach(document.querySelectorAll(selector), function(element) {
        _instance.push(element);
      });
    }
    // else first argument are element(s)
    else {
      if (selector instanceof NodeList || VanillaJQuery.isVanillaJQuery(selector) || Array.isArray(selector)) {
        VanillaJQuery.forEach(selector, function(element) {
          _instance.push(element);
        });
      } else if (selector instanceof Node) {
        _instance.push(selector);
      }
    }

    this._instance = _instance;
    this.length = this._instance.length;
  };

  VanillaJQuery.prototype.toString = function() {
    return '[object VanillaJQuery]';
  };

  VanillaJQuery.prototype.valueOf = function() {
    return this._instance;
  };

  VanillaJQuery.prototype.find = function(selector) {
    var elements = [];

    this._instance.forEach(function(element) {
      VanillaJQuery.forEach(element.querySelectorAll(selector), function(element) {
        elements.push(element);
      });
    });

    return VanillaJQuery(elements);
  };

  VanillaJQuery.prototype.on = function() {
    var eventName, selectorDelegate, handler;

    eventName = arguments[0];
    if (typeof arguments[1] === 'string') {
      selectorDelegate = arguments[1];
    }
    handler = arguments[arguments.length - 1];

    this._instance.forEach(function(element) {
      if (selectorDelegate) {
        element.addEventListener(eventName, function(event) {
          var delegate;

          //var $delegates = $(event.target.parentElement).find(selectorDelegate);
          var v$delegates = VanillaJQuery(event.target.parentElement).find(selectorDelegate);
          if (v$delegates.length) {
            var i, total = v$delegates.length;
            for (i = total - 1; i >= 0; --i) {
              if (event.target == v$delegates[i]) {
                delegate = event.target;
                break;
              }
            }
          }

          if (!delegate) {
            delegate = event.target.closest(selectorDelegate);
          }

          if (delegate) {
            event.target = delegate;
            handler(event);
          }
        });
      } else {
        element.addEventListener(eventName, handler);
      }
    });

    return this;
  };

  VanillaJQuery.prototype.off = function(eventName, handler) {
    VanillaJQuery.forEach(this._instance, function(index, element) {
      element.removeEventListener(eventName, handler);
    });

    return this;
  };

  VanillaJQuery.__version = '0.1';
  VanillaJQuery.__vanillajquery = 'VanillaJQuery v' + VanillaJQuery.__version;

  VanillaJQuery.isVanillaJQuery = function(instance) {
    return instance.hasOwnProperty('__vanillajquery');
  };

  VanillaJQuery.forEach = function(list, callback) {
    Array.prototype.forEach.call(list, callback);
  };

  // Polyfill
  VanillaJQuery.matchesSelector = (function() {
    var matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      (function() {
        var scopeSupported;
        try {
          document.querySelector(':scope');
          scopeSupported = true;
        } catch(err) {
          scopeSupported = false;
        }

        if (scopeSupported) {
          matchesSelector
        }

        return function(s) {
            var i, matches;
            if (scopeSupported) {
              matches = (this.document || this.ownerDocument).querySelectorAll(s);
            }

            i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
      })();
  })();

  window.v$ = window.VanillaJQuery = VanillaJQuery;
})();
