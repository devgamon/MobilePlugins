'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require('../ons/elements');

var _elements2 = _interopRequireDefault(_elements);

var _util = require('../ons/util');

var _util2 = _interopRequireDefault(_util);

var _styler = require('../ons/styler');

var _styler2 = _interopRequireDefault(_styler);

var _platform = require('../ons/platform');

var _platform2 = _interopRequireDefault(_platform);

var _baseElement = require('./base/base-element');

var _baseElement2 = _interopRequireDefault(_baseElement);

var _gestureDetector = require('../ons/gesture-detector');

var _gestureDetector2 = _interopRequireDefault(_gestureDetector);

var _animit = require('../ons/animit');

var _animit2 = _interopRequireDefault(_animit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright 2013-2015 ASIAL CORPORATION
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var STATE_INITIAL = 'initial';
var STATE_PREACTION = 'preaction';
var STATE_ACTION = 'action';

var throwType = function throwType(el, type) {
  return _util2.default.throw('"' + el + '" must be ' + type);
};

/**
 * @element ons-pull-hook
 * @category control
 * @description
 *   [en]
 *     Component that adds **Pull to refresh** functionality to an `<ons-page>` element.
 *
 *     It can be used to perform a task when the user pulls down at the top of the page. A common usage is to refresh the data displayed in a page.
 *   [/en]
 *   [ja][/ja]
 * @codepen WbJogM
 * @tutorial vanilla/Reference/pull-hook
 * @example
 * <ons-page>
 *   <ons-pull-hook>
 *     Release to refresh
 *   </ons-pull-hook>
 * </ons-page>
 *
 * <script>
 *   document.querySelector('ons-pull-hook').onAction = function(done) {
 *     setTimeout(done, 1000);
 *   };
 * </script>
 */

var PullHookElement = function (_BaseElement) {
  _inherits(PullHookElement, _BaseElement);

  /**
   * @event changestate
   * @description
   *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
   *   [ja]????????????????????????????????????????????????????????????????????????????????????"initial", "preaction", "action"????????????????????????[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]?????????????????????????????????[/ja]
   * @param {Object} event.pullHook
   *   [en]Component object.[/en]
   *   [ja]?????????????????????????????????????????????[/ja]
   * @param {String} event.state
   *   [en]Current state.[/en]
   *   [ja]??????????????????????????????????????????[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
   *   [ja]???????????????????????????disabled???????????????????????????????????????????????????????????????[/ja]
   */

  /**
   * @attribute height
   * @type {String}
   * @description
   *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
   *   [ja]????????????????????????????????????????????????????????????????????????pull down?????????"preaction"???????????????????????????????????????????????????"64px"?????????[/ja]
   */

  /**
   * @attribute threshold-height
   * @type {String}
   * @description
   *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value will disable this property. If this value is lower than the height, it will skip "preaction" state.[/en]
   *   [ja]?????????????????????????????????????????????????????????????????????????????????pull down??????????????????????????????????????????????????????"action"???????????????????????????[/ja]
   */

  /**
   * @attribute fixed-content
   * @description
   *   [en]If this attribute is set the content of the page will not move when pulling.[/en]
   *   [ja]??????????????????????????????????????????????????????????????????????????????????????????????????????????????????[/ja]
   */

  function PullHookElement() {
    _classCallCheck(this, PullHookElement);

    var _this = _possibleConstructorReturn(this, (PullHookElement.__proto__ || Object.getPrototypeOf(PullHookElement)).call(this));

    _this._onDrag = _this._onDrag.bind(_this);
    _this._onDragStart = _this._onDragStart.bind(_this);
    _this._onDragEnd = _this._onDragEnd.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);

    _this._setState(STATE_INITIAL, true);
    _this._hide(); // Fix for transparent toolbar transitions
    return _this;
  }

  _createClass(PullHookElement, [{
    key: '_setStyle',
    value: function _setStyle() {
      var height = this.height + 'px';
      (0, _styler2.default)(this, { height: height, lineHeight: height });
      this.style.display === '' && this._show();
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      var element = this._pageElement;

      if (element.scrollTop < 0) {
        element.scrollTop = 0;
      }
    }
  }, {
    key: '_canConsumeGesture',
    value: function _canConsumeGesture(gesture) {
      return gesture.direction === 'up' || gesture.direction === 'down';
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      var _this2 = this;

      if (!event.gesture || this.disabled) {
        return;
      }

      var tapY = event.gesture.center.clientY + this._pageElement.scrollTop;
      var maxY = window.innerHeight;
      // Only use drags that start near the pullHook to reduce flickerings
      var draggableAreaRatio = 1;

      this._ignoreDrag = event.consumed || tapY > maxY * draggableAreaRatio;

      if (!this._ignoreDrag) {
        var consume = event.consume;
        event.consume = function () {
          consume && consume();
          _this2._ignoreDrag = true;
          // This elements resizes .page__content so it is safer
          // to hide it when other components are dragged.
          _this2._hide();
        };

        if (this._canConsumeGesture(event.gesture)) {
          consume && consume();
          event.consumed = true;
          this._show(); // Not enough due to 'dragLockAxis'
        }
      }

      this._startScroll = this._pageElement.scrollTop;
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      var _this3 = this;

      if (!event.gesture || this.disabled || this._ignoreDrag || !this._canConsumeGesture(event.gesture)) {
        return;
      }

      // Necessary due to 'dragLockAxis' (25px)
      if (this.style.display === 'none') {
        this._show();
      }

      event.stopPropagation();

      var tapY = event.gesture.center.clientY + this._pageElement.scrollTop;
      var maxY = window.innerHeight;

      var scroll = Math.max(event.gesture.deltaY - this._startScroll, 0);
      if (scroll !== this._currentTranslation) {

        var th = this.thresholdHeight;
        if (th > 0 && scroll >= th) {
          event.gesture.stopDetect();
          setImmediate(function () {
            return _this3._finish();
          });
        } else if (scroll >= this.height) {
          this._setState(STATE_PREACTION);
        } else {
          this._setState(STATE_INITIAL);
        }

        this._translateTo(scroll);
      }
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      if (!event.gesture || this.disabled || this._ignoreDrag) {
        return;
      }

      event.stopPropagation();

      if (this._currentTranslation > 0) {
        var scroll = this._currentTranslation;

        if (scroll > this.height) {
          this._finish();
        } else {
          this._translateTo(0, { animate: true });
        }
      }
    }

    /**
     * @property onAction
     * @type {Function}
     * @description
     *   [en]This will be called in the `action` state if it exists. The function will be given a `done` callback as it's first argument.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_finish',
    value: function _finish() {
      var _this4 = this;

      this._setState(STATE_ACTION);
      this._translateTo(this.height, { animate: true });
      var action = this.onAction || function (done) {
        return done();
      };
      action(function () {
        _this4._translateTo(0, { animate: true });
        _this4._setState(STATE_INITIAL);
      });
    }

    /**
     * @property height
     * @type {Number}
     * @description
     *   [en]The height of the pull hook in pixels. The default value is `64px`.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_setState',
    value: function _setState(state, noEvent) {
      var lastState = this.state;

      this.setAttribute('state', state);

      if (!noEvent && lastState !== this.state) {
        _util2.default.triggerElementEvent(this, 'changestate', {
          pullHook: this,
          state: state,
          lastState: lastState
        });
      }
    }

    /**
     * @property state
     * @readonly
     * @type {String}
     * @description
     *   [en]Current state of the element.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_show',
    value: function _show() {
      var _this5 = this;

      // Run asyncrhonously to avoid conflicts with Animit's style clean
      setImmediate(function () {
        _this5.style.display = '';
        if (_this5._pageElement) {
          _this5._pageElement.style.marginTop = '-' + _this5.height + 'px';
        }
      });
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.style.display = 'none';
      if (this._pageElement) {
        this._pageElement.style.marginTop = '';
      }
    }

    /**
     * @param {Number} scroll
     * @param {Object} options
     * @param {Function} [options.callback]
     */

  }, {
    key: '_translateTo',
    value: function _translateTo(scroll) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this._currentTranslation == 0 && scroll == 0) {
        return;
      }

      this._currentTranslation = scroll;
      var opt = options.animate ? { duration: .3, timing: 'cubic-bezier(.1, .7, .1, 1)' } : {};
      this._onPull && this._onPull((scroll / this.height).toFixed(2), opt);
      var scrollElement = this.hasAttribute('fixed-content') ? this : this._pageElement;

      (0, _animit2.default)(scrollElement).queue({ transform: 'translate3d(0px, ' + scroll + 'px, 0px)' }, opt).play(function () {
        scroll === 0 && _styler2.default.clear(scrollElement, 'transition transform');
        options.callback instanceof Function && options.callback();
      });
    }
  }, {
    key: '_disableDragLock',
    value: function _disableDragLock() {
      // e2e tests need it
      this._dragLockDisabled = true;
      this._setupListeners(true);
    }
  }, {
    key: '_setupListeners',
    value: function _setupListeners(add) {
      var _this6 = this;

      var scrollToggle = function scrollToggle(action) {
        return _this6._pageElement[action + 'EventListener']('scroll', _this6._onScroll, false);
      };
      var gdToggle = function gdToggle(action) {
        var passive = { passive: true };
        _this6._gestureDetector[action]('drag', _this6._onDrag, passive);
        _this6._gestureDetector[action]('dragstart', _this6._onDragStart, passive);
        _this6._gestureDetector[action]('dragend', _this6._onDragEnd, passive);
      };

      if (this._gestureDetector) {
        gdToggle('off');
        this._gestureDetector.dispose();
        this._gestureDetector = null;
      }
      scrollToggle('remove');

      if (add) {
        this._gestureDetector = new _gestureDetector2.default(this._pageElement, {
          dragMinDistance: 1,
          dragDistanceCorrection: false,
          dragLockToAxis: !this._dragLockDisabled,
          passive: true
        });

        gdToggle('on');
        scrollToggle('add');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._currentTranslation = 0;
      this._pageElement = this.parentNode;

      this._setupListeners(true);
      this._setStyle();
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._hide();
      this._setupListeners(false);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'height' && this._pageElement) {
        this._setStyle();
      }
    }
  }, {
    key: 'onAction',
    get: function get() {
      return this._onAction;
    },
    set: function set(value) {
      if (value && !(value instanceof Function)) {
        throwType('onAction', 'function or null');
      }
      this._onAction = value;
    }

    /**
     * @property onPull
     * @type {Function}
     * @description
     *   [en]Hook called whenever the user pulls the element. It gets the pulled distance ratio (scroll / height) and an animationOptions object as arguments.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'onPull',
    get: function get() {
      return this._onPull;
    },
    set: function set(value) {
      if (value && !(value instanceof Function)) {
        throwType('onPull', 'function or null');
      }
      this._onPull = value;
    }
  }, {
    key: 'height',
    set: function set(value) {
      if (!_util2.default.isInteger(value)) {
        throwType('height', 'integer');
      }

      this.setAttribute('height', value + 'px');
    },
    get: function get() {
      return parseInt(this.getAttribute('height') || '64', 10);
    }

    /**
     * @property thresholdHeight
     * @type {Number}
     * @description
     *   [en]The thresholdHeight of the pull hook in pixels. The default value is `96px`.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'thresholdHeight',
    set: function set(value) {
      if (!_util2.default.isInteger(value)) {
        throwType('thresholdHeight', 'integer');
      }

      this.setAttribute('threshold-height', value + 'px');
    },
    get: function get() {
      return parseInt(this.getAttribute('threshold-height') || '96', 10);
    }
  }, {
    key: 'state',
    get: function get() {
      return this.getAttribute('state');
    }

    /**
     * @property pullDistance
     * @readonly
     * @type {Number}
     * @description
     *   [en]The current number of pixels the pull hook has moved.[/en]
     *   [ja]????????????????????????????????????????????????????????????????????????[/ja]
     */

  }, {
    key: 'pullDistance',
    get: function get() {
      return this._currentTranslation;
    }

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the element is disabled or not.[/en]
     *   [ja]?????????????????????????????????`true`???[/ja]
     */

  }, {
    key: 'disabled',
    set: function set(value) {
      return _util2.default.toggleAttribute(this, 'disabled', value);
    },
    get: function get() {
      return this.hasAttribute('disabled');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['height'];
    }
  }, {
    key: 'events',
    get: function get() {
      return ['changestate'];
    }
  }]);

  return PullHookElement;
}(_baseElement2.default);

exports.default = PullHookElement;


_elements2.default.PullHook = PullHookElement;
customElements.define('ons-pull-hook', PullHookElement);