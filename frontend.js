!(function(){
  var FrontendJS = function(selector, context) {
    if (!(this instanceof FrontendJS)) {
      if (context) {
        return FrontendJS(context).find(selector);
      } else {
        return new FrontendJS(selector);
      }
    }

    var _instance = [];

    // If first argument is a selector
    if (typeof selector === 'string') {
      FrontendJS.forEach(document.querySelectorAll(selector), function(element) {
        _instance.push(element);
      });
    }
    // else first argument are element(s)
    else {
      if (selector instanceof NodeList || FrontendJS.isFrontend(selector) || Array.isArray(selector)) {
        FrontendJS.forEach(selector, function(element) {
          _instance.push(element);
        });
      } else if (selector instanceof Node) {
        _instance.push(selector);
      }
    }

    this._instance = _instance;
    this.length = this._instance.length;
  };

  FrontendJS.prototype.toString = function() {
    return '[object FrontendJS]';
  };

  FrontendJS.prototype.valueOf = function() {
    return this._instance;
  };

  FrontendJS.prototype.find = function(selector) {
    var elements = [];

    this._instance.forEach(function(element) {
      FrontendJS.forEach(element.querySelectorAll(selector), function(element) {
        elements.push(element);
      });
    });

    return FrontendJS(elements);
  };

  FrontendJS.prototype.on = function() {
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
          var fe_delegates = FrontendJS(event.target.parentElement).find(selectorDelegate);
          if (fe_delegates.length) {
            var i, total = fe_delegates.length;
            for (i = total - 1; i >= 0; --i) {
              if (event.target == fe_delegates[i]) {
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

  FrontendJS.prototype.off = function(eventName, handler) {
    FrontendJS.forEach(this._instance, function(index, element) {
      element.removeEventListener(eventName, handler);
    });

    return this;
  };

  FrontendJS.__version = '0.1';
  FrontendJS.__frontend = 'FrontendJS v' + FrontendJS.__version;

  FrontendJS.isFrontend = function(instance) {
    return instance.hasOwnProperty('__frontend');
  };

  FrontendJS.forEach = function(list, callback) {
    Array.prototype.forEach.call(list, callback);
  };

  // Polyfill
  FrontendJS.matchesSelector = (function() {
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

  window.fe = window.FrontendJS = FrontendJS;
})();
