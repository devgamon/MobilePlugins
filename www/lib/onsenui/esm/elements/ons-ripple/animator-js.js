'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Copyright 2013-2016 ASIAL CORPORATION
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
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

var _internal = require('../../ons/internal');

var _internal2 = _interopRequireDefault(_internal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) {
  setTimeout(function () {
    cb(new Date().getTime());
  }, 1000 / 60);
};

raf = raf.bind(window);

/**
 * @class AnimatorJS - implementation of Animator class using javascript
 */

var AnimatorJS = function () {
  _createClass(AnimatorJS, [{
    key: 'animate',


    /**
     * @method animate
     * @desc main animation function
     * @param {Element} element
     * @param {Object} finalCSS
     * @param {number} [duration=200] - duration in milliseconds
     * @return {Object} result
     * @return {Function} result.then(callback) - sets a callback to be executed after the animation has stopped
     * @return {Function} result.stop(options) - stops the animation; if options.stopNext is true then it doesn't call the callback
     * @return {Function} result.finish(ms) - finishes the animation in the specified time in milliseconds
     * @return {Function} result.speed(ms) - sets the animation speed so that it finishes as if the original duration was the one specified here
     * @example
     * ````
     *  var result = animator.animate(el, {opacity: 0.5}, 1000);
     *
     *  el.addEventListener('click', function(e){
     *    result.speed(200).then(function(){
     *      console.log('done');
     *    });
     *  }, 300);
     * ````
     */
    value: function animate(el, final) {
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

      var start,
          initial = {},
          stopped = false,
          next,
          elapsed,
          properties = Object.keys(final);

      var result = {
        stop: function stop() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (options.stopNext) {
            next = false;
          }
          if (!stopped) {
            stopped = true;
            next && next();
          }
          return result;
        },
        then: function then(cb) {
          next = cb;
          if (stopped) {
            next && next();
          }
          return result;
        },
        finish: function finish() {
          var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

          var k = milliseconds / (duration - elapsed);
          if (_internal2.default.config.animationsDisabled) {
            k = 0;
          }
          if (k < 1) {
            start += elapsed - elapsed * k;
            duration *= k;
          }
          return result;
        },
        speed: function speed(newDuration) {
          return result.finish(newDuration * (1 - elapsed / duration));
        }
      };

      if (el.hasAttribute('disabled') || _internal2.default.config.animationsDisabled) {
        return result;
      }

      var cs = window.getComputedStyle(el);
      properties.forEach(function (i) {
        initial[i] = parseFloat(el.style[i] || cs.getPropertyValue(i));
      });
      this._onStopAnimations(el, result.stop);

      var step = function step(timestamp) {
        start = start || timestamp;
        elapsed = timestamp - start;
        if (!stopped) {
          properties.forEach(function (i) {
            el.style[i] = initial[i] + (final[i] - initial[i]) * Math.min(1, elapsed / duration) + (i == 'opacity' ? 0 : 'px');
          });
          stopped = stopped || elapsed >= duration;
          if (!stopped) {
            return raf(step);
          }
        }
        return next && next();
      };
      step(0);

      return result;
    }
  }]);

  function AnimatorJS() {
    _classCallCheck(this, AnimatorJS);

    this._queue = [];
    this._index = 0;
  }

  _createClass(AnimatorJS, [{
    key: '_onStopAnimations',
    value: function _onStopAnimations(el, listener) {
      var queue = this._queue;
      var i = this._index++;
      queue[el] = queue[el] || [];
      queue[el][i] = function (options) {
        delete queue[el][i];
        if (queue[el] && queue[el].length == 0) {
          delete queue[el];
        }
        return listener(options);
      };
    }

    /**
    * @method stopAnimations
    * @desc stops active animations on a specified element
    * @param {Element|Array} element - element or array of elements
    * @param {Object} [options={}]
    * @param {Boolean} [options.stopNext] - the callbacks after the animations won't be called if this option is true
    */

  }, {
    key: 'stopAnimations',
    value: function stopAnimations(el) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Array.isArray(el)) {
        return el.forEach(function (el) {
          _this.stopAnimations(el, options);
        });
      }

      (this._queue[el] || []).forEach(function (e) {
        e(options || {});
      });
    }

    /**
    * @method stopAll
    * @desc stops all active animations
    * @param {Object} [options={}]
    * @param {Boolean} [options.stopNext] - the callbacks after the animations won't be called if this option is true
    */

  }, {
    key: 'stopAll',
    value: function stopAll() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.stopAnimations(Object.keys(this._queue), options);
    }

    /**
    * @method fade
    * @desc fades the element (short version for animate(el, {opacity: 0}))
    * @param {Element} element
    * @param {number} [duration=200]
    */

  }, {
    key: 'fade',
    value: function fade(el) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      return this.animate(el, { opacity: 0 }, duration);
    }
  }]);

  return AnimatorJS;
}();

exports.default = AnimatorJS;