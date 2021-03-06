'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require('../../ons/elements');

var _elements2 = _interopRequireDefault(_elements);

var _util = require('../../ons/util');

var _util2 = _interopRequireDefault(_util);

var _autostyle = require('../../ons/autostyle');

var _autostyle2 = _interopRequireDefault(_autostyle);

var _modifierUtil = require('../../ons/internal/modifier-util');

var _modifierUtil2 = _interopRequireDefault(_modifierUtil);

var _animatorFactory = require('../../ons/internal/animator-factory');

var _animatorFactory2 = _interopRequireDefault(_animatorFactory);

var _animator = require('./animator');

var _platform = require('../../ons/platform');

var _platform2 = _interopRequireDefault(_platform);

var _baseDialog = require('../base/base-dialog');

var _baseDialog2 = _interopRequireDefault(_baseDialog);

var _contentReady = require('../../ons/content-ready');

var _contentReady2 = _interopRequireDefault(_contentReady);

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

var scheme = {
  '.dialog': 'dialog--*',
  '.dialog-container': 'dialog-container--*',
  '.dialog-mask': 'dialog-mask--*'
};

var _animatorDict = {
  'default': function _default() {
    return _platform2.default.isAndroid() ? _animator.AndroidDialogAnimator : _animator.IOSDialogAnimator;
  },
  'slide': _animator.SlideDialogAnimator,
  'none': _animator.DialogAnimator
};

/**
 * @element ons-dialog
 * @category dialog
 * @description
 *   [en]
 *     Dialog that is displayed on top of current screen. As opposed to the `<ons-alert-dialog>` element, this component can contain any kind of content.
 *
 *     To use the element it can either be attached directly to the `<body>` element or dynamically created from a template using the `ons.createDialog(template)` utility function and the `<template>` tag.
 *
 *     The dialog is useful for displaying menus, additional information or to ask the user to make a decision.
 *
 *     It will automatically be displayed as Material Design when running on an Android device.
 *   [/en]
 *   [ja][/ja]
 * @modifier material
 *   [en]Display a Material Design dialog.[/en]
 *   [ja]??????????????????????????????????????????????????????????????????[/ja]
 * @codepen zxxaGa
 * @tutorial vanilla/Reference/dialog
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier??????????????????[/ja]
 * @seealso ons-alert-dialog
 *   [en]`<ons-alert-dialog>` component[/en]
 *   [ja]ons-alert-dialog?????????????????????[/ja]
 * @seealso ons-popover
 *   [en]`<ons-popover>` component[/en]
 *   [ja]ons-popover?????????????????????[/ja]
 * @seealso ons-modal
 *   [en]`<ons-modal>` component[/en]
 *   [ja]ons-modal?????????????????????[/ja]
 * @example
 * <ons-dialog id="dialog">
 *   <p>This is a dialog!</p>
 * </ons-dialog>
 *
 * <script>
 *   document.getElementById('dialog').show();
 * </script>
 */

var DialogElement = function (_BaseDialogElement) {
  _inherits(DialogElement, _BaseDialogElement);

  /**
   * @event preshow
   * @description
   * [en]Fired just before the dialog is displayed.[/en]
   * [ja]????????????????????????????????????????????????????????????[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]?????????????????????????????????????????????[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the dialog from being shown.[/en]
   *   [ja]??????????????????????????????????????????????????????????????????????????????????????????[/ja]
   */

  /**
   * @event postshow
   * @description
   * [en]Fired just after the dialog is displayed.[/en]
   * [ja]????????????????????????????????????????????????????????????[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]?????????????????????????????????????????????[/ja]
   */

  /**
   * @event prehide
   * @description
   * [en]Fired just before the dialog is hidden.[/en]
   * [ja]??????????????????????????????????????????????????????[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]?????????????????????????????????????????????[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the dialog from being hidden.[/en]
   *   [ja]?????????????????????????????????????????????????????????????????????????????????????????????[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the dialog is hidden.[/en]
   * [ja]???????????????????????????????????????????????????[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.dialog
   *   [en]Component object.[/en]
   *   [ja]?????????????????????????????????????????????[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja]?????????????????????????????????????????????[/ja]
   */

  /**
   * @attribute cancelable
   * @description
   *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button on Android devices.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *  [en]If this attribute is set the dialog is disabled.[/en]
   *  [ja]?????????????????????????????????????????????disabled????????????????????????[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.[/en]
   *  [ja]?????????????????????????????????????????????????????????????????????????????????"none"????????????"default"????????????????????????[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]???????????????????????????duration, timing, delay??????????????????????????????????????????????????????e.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`[/ja]
   */

  /**
   * @attribute mask-color
   * @type {String}
   * @default rgba(0, 0, 0, 0.2)
   * @description
   *  [en]Color of the background mask. Default is `"rgba(0, 0, 0, 0.2)"`.[/en]
   *  [ja]?????????????????????????????????????????????"rgba(0, 0, 0, 0.2)"??????????????????????????????[/ja]
   */

  function DialogElement() {
    _classCallCheck(this, DialogElement);

    var _this = _possibleConstructorReturn(this, (DialogElement.__proto__ || Object.getPrototypeOf(DialogElement)).call(this));

    (0, _contentReady2.default)(_this, function () {
      return _this._compile();
    });
    return _this;
  }

  _createClass(DialogElement, [{
    key: '_updateAnimatorFactory',
    value: function _updateAnimatorFactory() {
      return new _animatorFactory2.default({
        animators: _animatorDict,
        baseClass: _animator.DialogAnimator,
        baseClassName: 'DialogAnimator',
        defaultAnimation: this.getAttribute('animation')
      });
    }
  }, {
    key: '_compile',
    value: function _compile() {
      _autostyle2.default.prepare(this);

      this.style.display = 'none';
      this.style.zIndex = 10001;

      /* Expected result:
       *   <ons-dialog>
       *     <div class="dialog-mask"></div>
       *     <div class="dialog">
       *       <div class="dialog-container">...</div>
       *     </div>
       *   </ons-dialog>
       */

      if (!this._dialog) {
        var dialog = document.createElement('div');
        dialog.classList.add('dialog');

        var container = document.createElement('div');
        container.classList.add('dialog-container');
        while (this.firstChild) {
          container.appendChild(this.firstChild);
        }
        dialog.appendChild(container);

        this.appendChild(dialog);
      }

      if (!this._mask) {
        var mask = document.createElement('div');
        mask.classList.add('dialog-mask');
        this.insertBefore(mask, this.firstChild);
      }

      this._dialog.style.zIndex = 20001;
      this._mask.style.zIndex = 20000;

      this.setAttribute('status-bar-fill', '');

      _modifierUtil2.default.initModifier(this, this._scheme);
    }

    /**
     * @property onDeviceBackButton
     * @type {Object}
     * @description
     *   [en]Back-button handler.[/en]
     *   [ja]?????????????????????????????????[/ja]
     */

    /**
     * @method show
     * @signature show([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]???????????????????????????????????????????????????[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name. Available animations are `"none"` and `"slide"`.[/en]
     *   [ja]?????????????????????????????????????????????"none", "slide"????????????????????????????????????[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]???????????????????????????duration, delay, timing?????????????????????e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
     * @param {Function} [options.callback]
     *   [en]This function is called after the dialog has been revealed.[/en]
     *   [ja]???????????????????????????????????????????????????????????????????????????????????????????????????????????????[/ja]
     * @description
     *  [en]Show the dialog.[/en]
     *  [ja]?????????????????????????????????[/ja]
     * @return {Promise} Resolves to the displayed element.
     */

    /**
     * @method hide
     * @signature hide([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]???????????????????????????????????????????????????[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name. Available animations are `"none"` and `"slide"`.[/en]
     *   [ja]?????????????????????????????????????????????"none", "slide"???????????????????????????????????????[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]???????????????????????????duration, delay, timing?????????????????????e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`[/ja]
     * @param {Function} [options.callback]
     *   [en]This functions is called after the dialog has been hidden.[/en]
     *   [ja]????????????????????????????????????????????????????????????????????????????????????????????????[/ja]
     * @description
     *   [en]Hide the dialog.[/en]
     *   [ja]?????????????????????????????????[/ja]
     * @return {Promise}
     *   [en]Resolves to the hidden element[/en]
     *   [ja][/ja]
     */

    /**
     * @property visible
     * @readonly
     * @type {Boolean}
     * @description
     *   [en]Whether the dialog is visible or not.[/en]
     *   [ja]???????????????????????????`true`???[/ja]
     */

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the dialog is disabled or not.[/en]
     *   [ja]?????????????????????????????????`true`???[/ja]
     */

    /**
     * @property cancelable
     * @type {Boolean}
     * @description
     *   [en]Whether the dialog is cancelable or not. A cancelable dialog can be closed by tapping the background or by pressing the back button on Android devices.[/en]
     *   [ja][/ja]
     */

    /**
     * @param {String} name
     * @param {DialogAnimator} Animator
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_mask',
    get: function get() {
      return _util2.default.findChild(this, '.dialog-mask');
    }
  }, {
    key: '_dialog',
    get: function get() {
      return _util2.default.findChild(this, '.dialog');
    }
  }], [{
    key: 'registerAnimator',
    value: function registerAnimator(name, Animator) {
      if (!(Animator.prototype instanceof _animator.DialogAnimator)) {
        _util2.default.throwAnimator('Dialog');
      }
      _animatorDict[name] = Animator;
    }
  }, {
    key: 'animators',
    get: function get() {
      return _animatorDict;
    }
  }, {
    key: 'DialogAnimator',
    get: function get() {
      return _animator.DialogAnimator;
    }
  }]);

  return DialogElement;
}(_baseDialog2.default);

exports.default = DialogElement;


_elements2.default.Dialog = DialogElement;
customElements.define('ons-dialog', DialogElement);