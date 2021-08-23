/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("formatters", [], factory);
	else if(typeof exports === 'object')
		exports["formatters"] = factory();
	else
		root["formatters"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)*m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack://formatters/./node_modules/ansi-html/index.js?");

/***/ }),

/***/ "./src/DateTimeFormat/index.js":
/*!*************************************!*\
  !*** ./src/DateTimeFormat/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ListFormat {\n  #locales;\n  #options;\n  #instance;\n  #DEFAULTS = {\n    locales: 'en'\n  };\n\n  constructor(locales, options) {\n    try {\n      this.#locales = locales ?? this.#DEFAULTS.locales;\n      this.#options = { ...this.#DEFAULTS.options,\n        ...options\n      };\n      this.#instance = new Intl.ListFormat(this.#locales, this.#options);\n    } catch (error) {\n      console.error('ListFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#sec-intl-listformat-constructor.');\n    }\n  }\n\n  format(list) {\n    return this.#instance.format(list);\n  }\n\n  formatToParts(list) {\n    return this.#instance.formatToParts(list);\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListFormat);\n\n//# sourceURL=webpack://formatters/./src/DateTimeFormat/index.js?");

/***/ }),

/***/ "./src/ListFormat/index.js":
/*!*********************************!*\
  !*** ./src/ListFormat/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ListFormat {\n  #locales;\n  #options;\n  #instance;\n  #DEFAULTS = {\n    locales: 'en'\n  };\n\n  constructor(locales, options) {\n    try {\n      this.#locales = locales ?? this.#DEFAULTS.locales;\n      this.#options = { ...this.#DEFAULTS.options,\n        ...options\n      };\n      this.#instance = new Intl.ListFormat(this.#locales, this.#options);\n    } catch (error) {\n      console.error('ListFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#sec-intl-listformat-constructor.');\n    }\n  }\n\n  format(list) {\n    return this.#instance.format(list);\n  }\n\n  formatToParts(list) {\n    return this.#instance.formatToParts(list);\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListFormat);\n\n//# sourceURL=webpack://formatters/./src/ListFormat/index.js?");

/***/ }),

/***/ "./src/NumberFormat/index.js":
/*!***********************************!*\
  !*** ./src/NumberFormat/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass NumberFormat {\n  #locales;\n  #options;\n  #instance;\n  #DEFAULTS = {\n    locales: 'en-US',\n    options: {\n      style: 'decimal'\n    }\n  };\n\n  constructor(locales, options) {\n    try {\n      this.#locales = locales ?? this.#DEFAULTS.locales;\n      this.#options = { ...this.#DEFAULTS.options,\n        ...options\n      };\n      this.#instance = new Intl.NumberFormat(this.#locales, this.#options);\n    } catch (error) {\n      console.error('NumberFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#numberformat-objects.');\n    }\n  }\n\n  format(number) {\n    return this.#instance.format(number);\n  }\n\n  formatToParts(number) {\n    return this.#instance.formatToParts(number);\n  }\n\n  resolvedOptions(number) {\n    return this.#instance.resolvedOptions(number);\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberFormat);\n\n//# sourceURL=webpack://formatters/./src/NumberFormat/index.js?");

/***/ }),

/***/ "./src/Polyfills/index.js":
/*!********************************!*\
  !*** ./src/Polyfills/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Polyfill {\n  static init() {// @todo implement polyfill\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Polyfill);\n\n//# sourceURL=webpack://formatters/./src/Polyfills/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NumberFormat\": () => (/* binding */ NumberFormat),\n/* harmony export */   \"ListFormat\": () => (/* binding */ ListFormat),\n/* harmony export */   \"DateTimeFormat\": () => (/* binding */ DateTimeFormat)\n/* harmony export */ });\n/* harmony import */ var _NumberFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberFormat */ \"./src/NumberFormat/index.js\");\n/* harmony import */ var _ListFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListFormat */ \"./src/ListFormat/index.js\");\n/* harmony import */ var _DateTimeFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DateTimeFormat */ \"./src/DateTimeFormat/index.js\");\n/* harmony import */ var _Polyfills__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Polyfills */ \"./src/Polyfills/index.js\");\n// import * as polyfill from './polyfill';\n\n\n\n\n_Polyfills__WEBPACK_IMPORTED_MODULE_3__.default.init();\nfunction NumberFormat(number) {\n  return new _NumberFormat__WEBPACK_IMPORTED_MODULE_0__.default(number);\n}\nfunction ListFormat(number) {\n  return new _ListFormat__WEBPACK_IMPORTED_MODULE_1__.default(number);\n}\nfunction DateTimeFormat(number) {\n  return new _DateTimeFormat__WEBPACK_IMPORTED_MODULE_2__.default(number);\n}\n\n//# sourceURL=webpack://formatters/./src/index.js?");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://formatters/./node_modules/events/events.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar named_references_1 = __webpack_require__(/*! ./named-references */ \"./node_modules/html-entities/lib/named-references.js\");\nvar numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ \"./node_modules/html-entities/lib/numeric-unicode-map.js\");\nvar surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ \"./node_modules/html-entities/lib/surrogate-pairs.js\");\nvar allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });\nvar encodeRegExps = {\n    specialChars: /[<>'\"&]/g,\n    nonAscii: /(?:[<>'\"&\\u0080-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    nonAsciiPrintable: /(?:[<>'\"&\\x01-\\x08\\x11-\\x15\\x17-\\x1F\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    extensive: /(?:[\\x01-\\x0c\\x0e-\\x1f\\x21-\\x2c\\x2e-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7d\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g\n};\nvar defaultEncodeOptions = {\n    mode: 'specialChars',\n    level: 'all',\n    numeric: 'decimal'\n};\n/** Encodes all the necessary (specified by `level`) characters in the text */\nfunction encode(text, _a) {\n    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;\n    if (!text) {\n        return '';\n    }\n    var encodeRegExp = encodeRegExps[mode];\n    var references = allNamedReferences[level].characters;\n    var isHex = numeric === 'hexadecimal';\n    encodeRegExp.lastIndex = 0;\n    var _b = encodeRegExp.exec(text);\n    var _c;\n    if (_b) {\n        _c = '';\n        var _d = 0;\n        do {\n            if (_d !== _b.index) {\n                _c += text.substring(_d, _b.index);\n            }\n            var _e = _b[0];\n            var result_1 = references[_e];\n            if (!result_1) {\n                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);\n                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';\n            }\n            _c += result_1;\n            _d = _b.index + _e.length;\n        } while ((_b = encodeRegExp.exec(text)));\n        if (_d !== text.length) {\n            _c += text.substring(_d);\n        }\n    }\n    else {\n        _c =\n            text;\n    }\n    return _c;\n}\nexports.encode = encode;\nvar defaultDecodeOptions = {\n    scope: 'body',\n    level: 'all'\n};\nvar strict = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);/g;\nvar attribute = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;\nvar baseDecodeRegExps = {\n    xml: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.xml\n    },\n    html4: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html4\n    },\n    html5: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html5\n    }\n};\nvar decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });\nvar fromCharCode = String.fromCharCode;\nvar outOfBoundsChar = fromCharCode(65533);\nvar defaultDecodeEntityOptions = {\n    level: 'all'\n};\n/** Decodes a single entity */\nfunction decodeEntity(entity, _a) {\n    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;\n    if (!entity) {\n        return '';\n    }\n    var _b = entity;\n    var decodeEntityLastChar_1 = entity[entity.length - 1];\n    if (false) {}\n    else if (false) {}\n    else {\n        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];\n        if (decodeResultByReference_1) {\n            _b = decodeResultByReference_1;\n        }\n        else if (entity[0] === '&' && entity[1] === '#') {\n            var decodeSecondChar_1 = entity[2];\n            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'\n                ? parseInt(entity.substr(3), 16)\n                : parseInt(entity.substr(2));\n            _b =\n                decodeCode_1 >= 0x10ffff\n                    ? outOfBoundsChar\n                    : decodeCode_1 > 65535\n                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)\n                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);\n        }\n    }\n    return _b;\n}\nexports.decodeEntity = decodeEntity;\n/** Decodes all entities in the text */\nfunction decode(text, _a) {\n    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;\n    if (!text) {\n        return '';\n    }\n    var decodeRegExp = decodeRegExps[level][scope];\n    var references = allNamedReferences[level].entities;\n    var isAttribute = scope === 'attribute';\n    var isStrict = scope === 'strict';\n    decodeRegExp.lastIndex = 0;\n    var replaceMatch_1 = decodeRegExp.exec(text);\n    var replaceResult_1;\n    if (replaceMatch_1) {\n        replaceResult_1 = '';\n        var replaceLastIndex_1 = 0;\n        do {\n            if (replaceLastIndex_1 !== replaceMatch_1.index) {\n                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);\n            }\n            var replaceInput_1 = replaceMatch_1[0];\n            var decodeResult_1 = replaceInput_1;\n            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];\n            if (isAttribute\n                && decodeEntityLastChar_2 === '=') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else if (isStrict\n                && decodeEntityLastChar_2 !== ';') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else {\n                var decodeResultByReference_2 = references[replaceInput_1];\n                if (decodeResultByReference_2) {\n                    decodeResult_1 = decodeResultByReference_2;\n                }\n                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {\n                    var decodeSecondChar_2 = replaceInput_1[2];\n                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'\n                        ? parseInt(replaceInput_1.substr(3), 16)\n                        : parseInt(replaceInput_1.substr(2));\n                    decodeResult_1 =\n                        decodeCode_2 >= 0x10ffff\n                            ? outOfBoundsChar\n                            : decodeCode_2 > 65535\n                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)\n                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);\n                }\n            }\n            replaceResult_1 += decodeResult_1;\n            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;\n        } while ((replaceMatch_1 = decodeRegExp.exec(text)));\n        if (replaceLastIndex_1 !== text.length) {\n            replaceResult_1 += text.substring(replaceLastIndex_1);\n        }\n    }\n    else {\n        replaceResult_1 =\n            text;\n    }\n    return replaceResult_1;\n}\nexports.decode = decode;\n\n\n//# sourceURL=webpack://formatters/./node_modules/html-entities/lib/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.bodyRegExps={xml:/&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{\"&lt;\":\"<\",\"&gt;\":\">\",\"&quot;\":'\"',\"&apos;\":\"'\",\"&amp;\":\"&\"},characters:{\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&apos;\",\"&\":\"&amp;\"}},html4:{entities:{\"&apos;\":\"'\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&times\":\"×\",\"&times;\":\"×\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&quot\":'\"',\"&quot;\":'\"',\"&amp\":\"&\",\"&amp;\":\"&\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&gt\":\">\",\"&gt;\":\">\",\"&OElig;\":\"Œ\",\"&oelig;\":\"œ\",\"&Scaron;\":\"Š\",\"&scaron;\":\"š\",\"&Yuml;\":\"Ÿ\",\"&circ;\":\"ˆ\",\"&tilde;\":\"˜\",\"&ensp;\":\" \",\"&emsp;\":\" \",\"&thinsp;\":\" \",\"&zwnj;\":\"‌\",\"&zwj;\":\"‍\",\"&lrm;\":\"‎\",\"&rlm;\":\"‏\",\"&ndash;\":\"–\",\"&mdash;\":\"—\",\"&lsquo;\":\"‘\",\"&rsquo;\":\"’\",\"&sbquo;\":\"‚\",\"&ldquo;\":\"“\",\"&rdquo;\":\"”\",\"&bdquo;\":\"„\",\"&dagger;\":\"†\",\"&Dagger;\":\"‡\",\"&permil;\":\"‰\",\"&lsaquo;\":\"‹\",\"&rsaquo;\":\"›\",\"&euro;\":\"€\",\"&fnof;\":\"ƒ\",\"&Alpha;\":\"Α\",\"&Beta;\":\"Β\",\"&Gamma;\":\"Γ\",\"&Delta;\":\"Δ\",\"&Epsilon;\":\"Ε\",\"&Zeta;\":\"Ζ\",\"&Eta;\":\"Η\",\"&Theta;\":\"Θ\",\"&Iota;\":\"Ι\",\"&Kappa;\":\"Κ\",\"&Lambda;\":\"Λ\",\"&Mu;\":\"Μ\",\"&Nu;\":\"Ν\",\"&Xi;\":\"Ξ\",\"&Omicron;\":\"Ο\",\"&Pi;\":\"Π\",\"&Rho;\":\"Ρ\",\"&Sigma;\":\"Σ\",\"&Tau;\":\"Τ\",\"&Upsilon;\":\"Υ\",\"&Phi;\":\"Φ\",\"&Chi;\":\"Χ\",\"&Psi;\":\"Ψ\",\"&Omega;\":\"Ω\",\"&alpha;\":\"α\",\"&beta;\":\"β\",\"&gamma;\":\"γ\",\"&delta;\":\"δ\",\"&epsilon;\":\"ε\",\"&zeta;\":\"ζ\",\"&eta;\":\"η\",\"&theta;\":\"θ\",\"&iota;\":\"ι\",\"&kappa;\":\"κ\",\"&lambda;\":\"λ\",\"&mu;\":\"μ\",\"&nu;\":\"ν\",\"&xi;\":\"ξ\",\"&omicron;\":\"ο\",\"&pi;\":\"π\",\"&rho;\":\"ρ\",\"&sigmaf;\":\"ς\",\"&sigma;\":\"σ\",\"&tau;\":\"τ\",\"&upsilon;\":\"υ\",\"&phi;\":\"φ\",\"&chi;\":\"χ\",\"&psi;\":\"ψ\",\"&omega;\":\"ω\",\"&thetasym;\":\"ϑ\",\"&upsih;\":\"ϒ\",\"&piv;\":\"ϖ\",\"&bull;\":\"•\",\"&hellip;\":\"…\",\"&prime;\":\"′\",\"&Prime;\":\"″\",\"&oline;\":\"‾\",\"&frasl;\":\"⁄\",\"&weierp;\":\"℘\",\"&image;\":\"ℑ\",\"&real;\":\"ℜ\",\"&trade;\":\"™\",\"&alefsym;\":\"ℵ\",\"&larr;\":\"←\",\"&uarr;\":\"↑\",\"&rarr;\":\"→\",\"&darr;\":\"↓\",\"&harr;\":\"↔\",\"&crarr;\":\"↵\",\"&lArr;\":\"⇐\",\"&uArr;\":\"⇑\",\"&rArr;\":\"⇒\",\"&dArr;\":\"⇓\",\"&hArr;\":\"⇔\",\"&forall;\":\"∀\",\"&part;\":\"∂\",\"&exist;\":\"∃\",\"&empty;\":\"∅\",\"&nabla;\":\"∇\",\"&isin;\":\"∈\",\"&notin;\":\"∉\",\"&ni;\":\"∋\",\"&prod;\":\"∏\",\"&sum;\":\"∑\",\"&minus;\":\"−\",\"&lowast;\":\"∗\",\"&radic;\":\"√\",\"&prop;\":\"∝\",\"&infin;\":\"∞\",\"&ang;\":\"∠\",\"&and;\":\"∧\",\"&or;\":\"∨\",\"&cap;\":\"∩\",\"&cup;\":\"∪\",\"&int;\":\"∫\",\"&there4;\":\"∴\",\"&sim;\":\"∼\",\"&cong;\":\"≅\",\"&asymp;\":\"≈\",\"&ne;\":\"≠\",\"&equiv;\":\"≡\",\"&le;\":\"≤\",\"&ge;\":\"≥\",\"&sub;\":\"⊂\",\"&sup;\":\"⊃\",\"&nsub;\":\"⊄\",\"&sube;\":\"⊆\",\"&supe;\":\"⊇\",\"&oplus;\":\"⊕\",\"&otimes;\":\"⊗\",\"&perp;\":\"⊥\",\"&sdot;\":\"⋅\",\"&lceil;\":\"⌈\",\"&rceil;\":\"⌉\",\"&lfloor;\":\"⌊\",\"&rfloor;\":\"⌋\",\"&lang;\":\"〈\",\"&rang;\":\"〉\",\"&loz;\":\"◊\",\"&spades;\":\"♠\",\"&clubs;\":\"♣\",\"&hearts;\":\"♥\",\"&diams;\":\"♦\"},characters:{\"'\":\"&apos;\",\" \":\"&nbsp;\",\"¡\":\"&iexcl;\",\"¢\":\"&cent;\",\"£\":\"&pound;\",\"¤\":\"&curren;\",\"¥\":\"&yen;\",\"¦\":\"&brvbar;\",\"§\":\"&sect;\",\"¨\":\"&uml;\",\"©\":\"&copy;\",\"ª\":\"&ordf;\",\"«\":\"&laquo;\",\"¬\":\"&not;\",\"­\":\"&shy;\",\"®\":\"&reg;\",\"¯\":\"&macr;\",\"°\":\"&deg;\",\"±\":\"&plusmn;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"´\":\"&acute;\",\"µ\":\"&micro;\",\"¶\":\"&para;\",\"·\":\"&middot;\",\"¸\":\"&cedil;\",\"¹\":\"&sup1;\",\"º\":\"&ordm;\",\"»\":\"&raquo;\",\"¼\":\"&frac14;\",\"½\":\"&frac12;\",\"¾\":\"&frac34;\",\"¿\":\"&iquest;\",\"À\":\"&Agrave;\",\"Á\":\"&Aacute;\",\"Â\":\"&Acirc;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"Å\":\"&Aring;\",\"Æ\":\"&AElig;\",\"Ç\":\"&Ccedil;\",\"È\":\"&Egrave;\",\"É\":\"&Eacute;\",\"Ê\":\"&Ecirc;\",\"Ë\":\"&Euml;\",\"Ì\":\"&Igrave;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"Ï\":\"&Iuml;\",\"Ð\":\"&ETH;\",\"Ñ\":\"&Ntilde;\",\"Ò\":\"&Ograve;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"Õ\":\"&Otilde;\",\"Ö\":\"&Ouml;\",\"×\":\"&times;\",\"Ø\":\"&Oslash;\",\"Ù\":\"&Ugrave;\",\"Ú\":\"&Uacute;\",\"Û\":\"&Ucirc;\",\"Ü\":\"&Uuml;\",\"Ý\":\"&Yacute;\",\"Þ\":\"&THORN;\",\"ß\":\"&szlig;\",\"à\":\"&agrave;\",\"á\":\"&aacute;\",\"â\":\"&acirc;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"å\":\"&aring;\",\"æ\":\"&aelig;\",\"ç\":\"&ccedil;\",\"è\":\"&egrave;\",\"é\":\"&eacute;\",\"ê\":\"&ecirc;\",\"ë\":\"&euml;\",\"ì\":\"&igrave;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"ï\":\"&iuml;\",\"ð\":\"&eth;\",\"ñ\":\"&ntilde;\",\"ò\":\"&ograve;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"õ\":\"&otilde;\",\"ö\":\"&ouml;\",\"÷\":\"&divide;\",\"ø\":\"&oslash;\",\"ù\":\"&ugrave;\",\"ú\":\"&uacute;\",\"û\":\"&ucirc;\",\"ü\":\"&uuml;\",\"ý\":\"&yacute;\",\"þ\":\"&thorn;\",\"ÿ\":\"&yuml;\",'\"':\"&quot;\",\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"Œ\":\"&OElig;\",\"œ\":\"&oelig;\",\"Š\":\"&Scaron;\",\"š\":\"&scaron;\",\"Ÿ\":\"&Yuml;\",\"ˆ\":\"&circ;\",\"˜\":\"&tilde;\",\" \":\"&ensp;\",\" \":\"&emsp;\",\" \":\"&thinsp;\",\"‌\":\"&zwnj;\",\"‍\":\"&zwj;\",\"‎\":\"&lrm;\",\"‏\":\"&rlm;\",\"–\":\"&ndash;\",\"—\":\"&mdash;\",\"‘\":\"&lsquo;\",\"’\":\"&rsquo;\",\"‚\":\"&sbquo;\",\"“\":\"&ldquo;\",\"”\":\"&rdquo;\",\"„\":\"&bdquo;\",\"†\":\"&dagger;\",\"‡\":\"&Dagger;\",\"‰\":\"&permil;\",\"‹\":\"&lsaquo;\",\"›\":\"&rsaquo;\",\"€\":\"&euro;\",\"ƒ\":\"&fnof;\",\"Α\":\"&Alpha;\",\"Β\":\"&Beta;\",\"Γ\":\"&Gamma;\",\"Δ\":\"&Delta;\",\"Ε\":\"&Epsilon;\",\"Ζ\":\"&Zeta;\",\"Η\":\"&Eta;\",\"Θ\":\"&Theta;\",\"Ι\":\"&Iota;\",\"Κ\":\"&Kappa;\",\"Λ\":\"&Lambda;\",\"Μ\":\"&Mu;\",\"Ν\":\"&Nu;\",\"Ξ\":\"&Xi;\",\"Ο\":\"&Omicron;\",\"Π\":\"&Pi;\",\"Ρ\":\"&Rho;\",\"Σ\":\"&Sigma;\",\"Τ\":\"&Tau;\",\"Υ\":\"&Upsilon;\",\"Φ\":\"&Phi;\",\"Χ\":\"&Chi;\",\"Ψ\":\"&Psi;\",\"Ω\":\"&Omega;\",\"α\":\"&alpha;\",\"β\":\"&beta;\",\"γ\":\"&gamma;\",\"δ\":\"&delta;\",\"ε\":\"&epsilon;\",\"ζ\":\"&zeta;\",\"η\":\"&eta;\",\"θ\":\"&theta;\",\"ι\":\"&iota;\",\"κ\":\"&kappa;\",\"λ\":\"&lambda;\",\"μ\":\"&mu;\",\"ν\":\"&nu;\",\"ξ\":\"&xi;\",\"ο\":\"&omicron;\",\"π\":\"&pi;\",\"ρ\":\"&rho;\",\"ς\":\"&sigmaf;\",\"σ\":\"&sigma;\",\"τ\":\"&tau;\",\"υ\":\"&upsilon;\",\"φ\":\"&phi;\",\"χ\":\"&chi;\",\"ψ\":\"&psi;\",\"ω\":\"&omega;\",\"ϑ\":\"&thetasym;\",\"ϒ\":\"&upsih;\",\"ϖ\":\"&piv;\",\"•\":\"&bull;\",\"…\":\"&hellip;\",\"′\":\"&prime;\",\"″\":\"&Prime;\",\"‾\":\"&oline;\",\"⁄\":\"&frasl;\",\"℘\":\"&weierp;\",\"ℑ\":\"&image;\",\"ℜ\":\"&real;\",\"™\":\"&trade;\",\"ℵ\":\"&alefsym;\",\"←\":\"&larr;\",\"↑\":\"&uarr;\",\"→\":\"&rarr;\",\"↓\":\"&darr;\",\"↔\":\"&harr;\",\"↵\":\"&crarr;\",\"⇐\":\"&lArr;\",\"⇑\":\"&uArr;\",\"⇒\":\"&rArr;\",\"⇓\":\"&dArr;\",\"⇔\":\"&hArr;\",\"∀\":\"&forall;\",\"∂\":\"&part;\",\"∃\":\"&exist;\",\"∅\":\"&empty;\",\"∇\":\"&nabla;\",\"∈\":\"&isin;\",\"∉\":\"&notin;\",\"∋\":\"&ni;\",\"∏\":\"&prod;\",\"∑\":\"&sum;\",\"−\":\"&minus;\",\"∗\":\"&lowast;\",\"√\":\"&radic;\",\"∝\":\"&prop;\",\"∞\":\"&infin;\",\"∠\":\"&ang;\",\"∧\":\"&and;\",\"∨\":\"&or;\",\"∩\":\"&cap;\",\"∪\":\"&cup;\",\"∫\":\"&int;\",\"∴\":\"&there4;\",\"∼\":\"&sim;\",\"≅\":\"&cong;\",\"≈\":\"&asymp;\",\"≠\":\"&ne;\",\"≡\":\"&equiv;\",\"≤\":\"&le;\",\"≥\":\"&ge;\",\"⊂\":\"&sub;\",\"⊃\":\"&sup;\",\"⊄\":\"&nsub;\",\"⊆\":\"&sube;\",\"⊇\":\"&supe;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"⊥\":\"&perp;\",\"⋅\":\"&sdot;\",\"⌈\":\"&lceil;\",\"⌉\":\"&rceil;\",\"⌊\":\"&lfloor;\",\"⌋\":\"&rfloor;\",\"〈\":\"&lang;\",\"〉\":\"&rang;\",\"◊\":\"&loz;\",\"♠\":\"&spades;\",\"♣\":\"&clubs;\",\"♥\":\"&hearts;\",\"♦\":\"&diams;\"}},html5:{entities:{\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&AMP\":\"&\",\"&AMP;\":\"&\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Abreve;\":\"Ă\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Acy;\":\"А\",\"&Afr;\":\"𝔄\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Alpha;\":\"Α\",\"&Amacr;\":\"Ā\",\"&And;\":\"⩓\",\"&Aogon;\":\"Ą\",\"&Aopf;\":\"𝔸\",\"&ApplyFunction;\":\"⁡\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&Ascr;\":\"𝒜\",\"&Assign;\":\"≔\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Backslash;\":\"∖\",\"&Barv;\":\"⫧\",\"&Barwed;\":\"⌆\",\"&Bcy;\":\"Б\",\"&Because;\":\"∵\",\"&Bernoullis;\":\"ℬ\",\"&Beta;\":\"Β\",\"&Bfr;\":\"𝔅\",\"&Bopf;\":\"𝔹\",\"&Breve;\":\"˘\",\"&Bscr;\":\"ℬ\",\"&Bumpeq;\":\"≎\",\"&CHcy;\":\"Ч\",\"&COPY\":\"©\",\"&COPY;\":\"©\",\"&Cacute;\":\"Ć\",\"&Cap;\":\"⋒\",\"&CapitalDifferentialD;\":\"ⅅ\",\"&Cayleys;\":\"ℭ\",\"&Ccaron;\":\"Č\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Ccirc;\":\"Ĉ\",\"&Cconint;\":\"∰\",\"&Cdot;\":\"Ċ\",\"&Cedilla;\":\"¸\",\"&CenterDot;\":\"·\",\"&Cfr;\":\"ℭ\",\"&Chi;\":\"Χ\",\"&CircleDot;\":\"⊙\",\"&CircleMinus;\":\"⊖\",\"&CirclePlus;\":\"⊕\",\"&CircleTimes;\":\"⊗\",\"&ClockwiseContourIntegral;\":\"∲\",\"&CloseCurlyDoubleQuote;\":\"”\",\"&CloseCurlyQuote;\":\"’\",\"&Colon;\":\"∷\",\"&Colone;\":\"⩴\",\"&Congruent;\":\"≡\",\"&Conint;\":\"∯\",\"&ContourIntegral;\":\"∮\",\"&Copf;\":\"ℂ\",\"&Coproduct;\":\"∐\",\"&CounterClockwiseContourIntegral;\":\"∳\",\"&Cross;\":\"⨯\",\"&Cscr;\":\"𝒞\",\"&Cup;\":\"⋓\",\"&CupCap;\":\"≍\",\"&DD;\":\"ⅅ\",\"&DDotrahd;\":\"⤑\",\"&DJcy;\":\"Ђ\",\"&DScy;\":\"Ѕ\",\"&DZcy;\":\"Џ\",\"&Dagger;\":\"‡\",\"&Darr;\":\"↡\",\"&Dashv;\":\"⫤\",\"&Dcaron;\":\"Ď\",\"&Dcy;\":\"Д\",\"&Del;\":\"∇\",\"&Delta;\":\"Δ\",\"&Dfr;\":\"𝔇\",\"&DiacriticalAcute;\":\"´\",\"&DiacriticalDot;\":\"˙\",\"&DiacriticalDoubleAcute;\":\"˝\",\"&DiacriticalGrave;\":\"`\",\"&DiacriticalTilde;\":\"˜\",\"&Diamond;\":\"⋄\",\"&DifferentialD;\":\"ⅆ\",\"&Dopf;\":\"𝔻\",\"&Dot;\":\"¨\",\"&DotDot;\":\"⃜\",\"&DotEqual;\":\"≐\",\"&DoubleContourIntegral;\":\"∯\",\"&DoubleDot;\":\"¨\",\"&DoubleDownArrow;\":\"⇓\",\"&DoubleLeftArrow;\":\"⇐\",\"&DoubleLeftRightArrow;\":\"⇔\",\"&DoubleLeftTee;\":\"⫤\",\"&DoubleLongLeftArrow;\":\"⟸\",\"&DoubleLongLeftRightArrow;\":\"⟺\",\"&DoubleLongRightArrow;\":\"⟹\",\"&DoubleRightArrow;\":\"⇒\",\"&DoubleRightTee;\":\"⊨\",\"&DoubleUpArrow;\":\"⇑\",\"&DoubleUpDownArrow;\":\"⇕\",\"&DoubleVerticalBar;\":\"∥\",\"&DownArrow;\":\"↓\",\"&DownArrowBar;\":\"⤓\",\"&DownArrowUpArrow;\":\"⇵\",\"&DownBreve;\":\"̑\",\"&DownLeftRightVector;\":\"⥐\",\"&DownLeftTeeVector;\":\"⥞\",\"&DownLeftVector;\":\"↽\",\"&DownLeftVectorBar;\":\"⥖\",\"&DownRightTeeVector;\":\"⥟\",\"&DownRightVector;\":\"⇁\",\"&DownRightVectorBar;\":\"⥗\",\"&DownTee;\":\"⊤\",\"&DownTeeArrow;\":\"↧\",\"&Downarrow;\":\"⇓\",\"&Dscr;\":\"𝒟\",\"&Dstrok;\":\"Đ\",\"&ENG;\":\"Ŋ\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecaron;\":\"Ě\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Ecy;\":\"Э\",\"&Edot;\":\"Ė\",\"&Efr;\":\"𝔈\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Element;\":\"∈\",\"&Emacr;\":\"Ē\",\"&EmptySmallSquare;\":\"◻\",\"&EmptyVerySmallSquare;\":\"▫\",\"&Eogon;\":\"Ę\",\"&Eopf;\":\"𝔼\",\"&Epsilon;\":\"Ε\",\"&Equal;\":\"⩵\",\"&EqualTilde;\":\"≂\",\"&Equilibrium;\":\"⇌\",\"&Escr;\":\"ℰ\",\"&Esim;\":\"⩳\",\"&Eta;\":\"Η\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Exists;\":\"∃\",\"&ExponentialE;\":\"ⅇ\",\"&Fcy;\":\"Ф\",\"&Ffr;\":\"𝔉\",\"&FilledSmallSquare;\":\"◼\",\"&FilledVerySmallSquare;\":\"▪\",\"&Fopf;\":\"𝔽\",\"&ForAll;\":\"∀\",\"&Fouriertrf;\":\"ℱ\",\"&Fscr;\":\"ℱ\",\"&GJcy;\":\"Ѓ\",\"&GT\":\">\",\"&GT;\":\">\",\"&Gamma;\":\"Γ\",\"&Gammad;\":\"Ϝ\",\"&Gbreve;\":\"Ğ\",\"&Gcedil;\":\"Ģ\",\"&Gcirc;\":\"Ĝ\",\"&Gcy;\":\"Г\",\"&Gdot;\":\"Ġ\",\"&Gfr;\":\"𝔊\",\"&Gg;\":\"⋙\",\"&Gopf;\":\"𝔾\",\"&GreaterEqual;\":\"≥\",\"&GreaterEqualLess;\":\"⋛\",\"&GreaterFullEqual;\":\"≧\",\"&GreaterGreater;\":\"⪢\",\"&GreaterLess;\":\"≷\",\"&GreaterSlantEqual;\":\"⩾\",\"&GreaterTilde;\":\"≳\",\"&Gscr;\":\"𝒢\",\"&Gt;\":\"≫\",\"&HARDcy;\":\"Ъ\",\"&Hacek;\":\"ˇ\",\"&Hat;\":\"^\",\"&Hcirc;\":\"Ĥ\",\"&Hfr;\":\"ℌ\",\"&HilbertSpace;\":\"ℋ\",\"&Hopf;\":\"ℍ\",\"&HorizontalLine;\":\"─\",\"&Hscr;\":\"ℋ\",\"&Hstrok;\":\"Ħ\",\"&HumpDownHump;\":\"≎\",\"&HumpEqual;\":\"≏\",\"&IEcy;\":\"Е\",\"&IJlig;\":\"Ĳ\",\"&IOcy;\":\"Ё\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Icy;\":\"И\",\"&Idot;\":\"İ\",\"&Ifr;\":\"ℑ\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Im;\":\"ℑ\",\"&Imacr;\":\"Ī\",\"&ImaginaryI;\":\"ⅈ\",\"&Implies;\":\"⇒\",\"&Int;\":\"∬\",\"&Integral;\":\"∫\",\"&Intersection;\":\"⋂\",\"&InvisibleComma;\":\"⁣\",\"&InvisibleTimes;\":\"⁢\",\"&Iogon;\":\"Į\",\"&Iopf;\":\"𝕀\",\"&Iota;\":\"Ι\",\"&Iscr;\":\"ℐ\",\"&Itilde;\":\"Ĩ\",\"&Iukcy;\":\"І\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&Jcirc;\":\"Ĵ\",\"&Jcy;\":\"Й\",\"&Jfr;\":\"𝔍\",\"&Jopf;\":\"𝕁\",\"&Jscr;\":\"𝒥\",\"&Jsercy;\":\"Ј\",\"&Jukcy;\":\"Є\",\"&KHcy;\":\"Х\",\"&KJcy;\":\"Ќ\",\"&Kappa;\":\"Κ\",\"&Kcedil;\":\"Ķ\",\"&Kcy;\":\"К\",\"&Kfr;\":\"𝔎\",\"&Kopf;\":\"𝕂\",\"&Kscr;\":\"𝒦\",\"&LJcy;\":\"Љ\",\"&LT\":\"<\",\"&LT;\":\"<\",\"&Lacute;\":\"Ĺ\",\"&Lambda;\":\"Λ\",\"&Lang;\":\"⟪\",\"&Laplacetrf;\":\"ℒ\",\"&Larr;\":\"↞\",\"&Lcaron;\":\"Ľ\",\"&Lcedil;\":\"Ļ\",\"&Lcy;\":\"Л\",\"&LeftAngleBracket;\":\"⟨\",\"&LeftArrow;\":\"←\",\"&LeftArrowBar;\":\"⇤\",\"&LeftArrowRightArrow;\":\"⇆\",\"&LeftCeiling;\":\"⌈\",\"&LeftDoubleBracket;\":\"⟦\",\"&LeftDownTeeVector;\":\"⥡\",\"&LeftDownVector;\":\"⇃\",\"&LeftDownVectorBar;\":\"⥙\",\"&LeftFloor;\":\"⌊\",\"&LeftRightArrow;\":\"↔\",\"&LeftRightVector;\":\"⥎\",\"&LeftTee;\":\"⊣\",\"&LeftTeeArrow;\":\"↤\",\"&LeftTeeVector;\":\"⥚\",\"&LeftTriangle;\":\"⊲\",\"&LeftTriangleBar;\":\"⧏\",\"&LeftTriangleEqual;\":\"⊴\",\"&LeftUpDownVector;\":\"⥑\",\"&LeftUpTeeVector;\":\"⥠\",\"&LeftUpVector;\":\"↿\",\"&LeftUpVectorBar;\":\"⥘\",\"&LeftVector;\":\"↼\",\"&LeftVectorBar;\":\"⥒\",\"&Leftarrow;\":\"⇐\",\"&Leftrightarrow;\":\"⇔\",\"&LessEqualGreater;\":\"⋚\",\"&LessFullEqual;\":\"≦\",\"&LessGreater;\":\"≶\",\"&LessLess;\":\"⪡\",\"&LessSlantEqual;\":\"⩽\",\"&LessTilde;\":\"≲\",\"&Lfr;\":\"𝔏\",\"&Ll;\":\"⋘\",\"&Lleftarrow;\":\"⇚\",\"&Lmidot;\":\"Ŀ\",\"&LongLeftArrow;\":\"⟵\",\"&LongLeftRightArrow;\":\"⟷\",\"&LongRightArrow;\":\"⟶\",\"&Longleftarrow;\":\"⟸\",\"&Longleftrightarrow;\":\"⟺\",\"&Longrightarrow;\":\"⟹\",\"&Lopf;\":\"𝕃\",\"&LowerLeftArrow;\":\"↙\",\"&LowerRightArrow;\":\"↘\",\"&Lscr;\":\"ℒ\",\"&Lsh;\":\"↰\",\"&Lstrok;\":\"Ł\",\"&Lt;\":\"≪\",\"&Map;\":\"⤅\",\"&Mcy;\":\"М\",\"&MediumSpace;\":\" \",\"&Mellintrf;\":\"ℳ\",\"&Mfr;\":\"𝔐\",\"&MinusPlus;\":\"∓\",\"&Mopf;\":\"𝕄\",\"&Mscr;\":\"ℳ\",\"&Mu;\":\"Μ\",\"&NJcy;\":\"Њ\",\"&Nacute;\":\"Ń\",\"&Ncaron;\":\"Ň\",\"&Ncedil;\":\"Ņ\",\"&Ncy;\":\"Н\",\"&NegativeMediumSpace;\":\"​\",\"&NegativeThickSpace;\":\"​\",\"&NegativeThinSpace;\":\"​\",\"&NegativeVeryThinSpace;\":\"​\",\"&NestedGreaterGreater;\":\"≫\",\"&NestedLessLess;\":\"≪\",\"&NewLine;\":\"\\n\",\"&Nfr;\":\"𝔑\",\"&NoBreak;\":\"⁠\",\"&NonBreakingSpace;\":\" \",\"&Nopf;\":\"ℕ\",\"&Not;\":\"⫬\",\"&NotCongruent;\":\"≢\",\"&NotCupCap;\":\"≭\",\"&NotDoubleVerticalBar;\":\"∦\",\"&NotElement;\":\"∉\",\"&NotEqual;\":\"≠\",\"&NotEqualTilde;\":\"≂̸\",\"&NotExists;\":\"∄\",\"&NotGreater;\":\"≯\",\"&NotGreaterEqual;\":\"≱\",\"&NotGreaterFullEqual;\":\"≧̸\",\"&NotGreaterGreater;\":\"≫̸\",\"&NotGreaterLess;\":\"≹\",\"&NotGreaterSlantEqual;\":\"⩾̸\",\"&NotGreaterTilde;\":\"≵\",\"&NotHumpDownHump;\":\"≎̸\",\"&NotHumpEqual;\":\"≏̸\",\"&NotLeftTriangle;\":\"⋪\",\"&NotLeftTriangleBar;\":\"⧏̸\",\"&NotLeftTriangleEqual;\":\"⋬\",\"&NotLess;\":\"≮\",\"&NotLessEqual;\":\"≰\",\"&NotLessGreater;\":\"≸\",\"&NotLessLess;\":\"≪̸\",\"&NotLessSlantEqual;\":\"⩽̸\",\"&NotLessTilde;\":\"≴\",\"&NotNestedGreaterGreater;\":\"⪢̸\",\"&NotNestedLessLess;\":\"⪡̸\",\"&NotPrecedes;\":\"⊀\",\"&NotPrecedesEqual;\":\"⪯̸\",\"&NotPrecedesSlantEqual;\":\"⋠\",\"&NotReverseElement;\":\"∌\",\"&NotRightTriangle;\":\"⋫\",\"&NotRightTriangleBar;\":\"⧐̸\",\"&NotRightTriangleEqual;\":\"⋭\",\"&NotSquareSubset;\":\"⊏̸\",\"&NotSquareSubsetEqual;\":\"⋢\",\"&NotSquareSuperset;\":\"⊐̸\",\"&NotSquareSupersetEqual;\":\"⋣\",\"&NotSubset;\":\"⊂⃒\",\"&NotSubsetEqual;\":\"⊈\",\"&NotSucceeds;\":\"⊁\",\"&NotSucceedsEqual;\":\"⪰̸\",\"&NotSucceedsSlantEqual;\":\"⋡\",\"&NotSucceedsTilde;\":\"≿̸\",\"&NotSuperset;\":\"⊃⃒\",\"&NotSupersetEqual;\":\"⊉\",\"&NotTilde;\":\"≁\",\"&NotTildeEqual;\":\"≄\",\"&NotTildeFullEqual;\":\"≇\",\"&NotTildeTilde;\":\"≉\",\"&NotVerticalBar;\":\"∤\",\"&Nscr;\":\"𝒩\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Nu;\":\"Ν\",\"&OElig;\":\"Œ\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Ocy;\":\"О\",\"&Odblac;\":\"Ő\",\"&Ofr;\":\"𝔒\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Omacr;\":\"Ō\",\"&Omega;\":\"Ω\",\"&Omicron;\":\"Ο\",\"&Oopf;\":\"𝕆\",\"&OpenCurlyDoubleQuote;\":\"“\",\"&OpenCurlyQuote;\":\"‘\",\"&Or;\":\"⩔\",\"&Oscr;\":\"𝒪\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Otimes;\":\"⨷\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&OverBar;\":\"‾\",\"&OverBrace;\":\"⏞\",\"&OverBracket;\":\"⎴\",\"&OverParenthesis;\":\"⏜\",\"&PartialD;\":\"∂\",\"&Pcy;\":\"П\",\"&Pfr;\":\"𝔓\",\"&Phi;\":\"Φ\",\"&Pi;\":\"Π\",\"&PlusMinus;\":\"±\",\"&Poincareplane;\":\"ℌ\",\"&Popf;\":\"ℙ\",\"&Pr;\":\"⪻\",\"&Precedes;\":\"≺\",\"&PrecedesEqual;\":\"⪯\",\"&PrecedesSlantEqual;\":\"≼\",\"&PrecedesTilde;\":\"≾\",\"&Prime;\":\"″\",\"&Product;\":\"∏\",\"&Proportion;\":\"∷\",\"&Proportional;\":\"∝\",\"&Pscr;\":\"𝒫\",\"&Psi;\":\"Ψ\",\"&QUOT\":'\"',\"&QUOT;\":'\"',\"&Qfr;\":\"𝔔\",\"&Qopf;\":\"ℚ\",\"&Qscr;\":\"𝒬\",\"&RBarr;\":\"⤐\",\"&REG\":\"®\",\"&REG;\":\"®\",\"&Racute;\":\"Ŕ\",\"&Rang;\":\"⟫\",\"&Rarr;\":\"↠\",\"&Rarrtl;\":\"⤖\",\"&Rcaron;\":\"Ř\",\"&Rcedil;\":\"Ŗ\",\"&Rcy;\":\"Р\",\"&Re;\":\"ℜ\",\"&ReverseElement;\":\"∋\",\"&ReverseEquilibrium;\":\"⇋\",\"&ReverseUpEquilibrium;\":\"⥯\",\"&Rfr;\":\"ℜ\",\"&Rho;\":\"Ρ\",\"&RightAngleBracket;\":\"⟩\",\"&RightArrow;\":\"→\",\"&RightArrowBar;\":\"⇥\",\"&RightArrowLeftArrow;\":\"⇄\",\"&RightCeiling;\":\"⌉\",\"&RightDoubleBracket;\":\"⟧\",\"&RightDownTeeVector;\":\"⥝\",\"&RightDownVector;\":\"⇂\",\"&RightDownVectorBar;\":\"⥕\",\"&RightFloor;\":\"⌋\",\"&RightTee;\":\"⊢\",\"&RightTeeArrow;\":\"↦\",\"&RightTeeVector;\":\"⥛\",\"&RightTriangle;\":\"⊳\",\"&RightTriangleBar;\":\"⧐\",\"&RightTriangleEqual;\":\"⊵\",\"&RightUpDownVector;\":\"⥏\",\"&RightUpTeeVector;\":\"⥜\",\"&RightUpVector;\":\"↾\",\"&RightUpVectorBar;\":\"⥔\",\"&RightVector;\":\"⇀\",\"&RightVectorBar;\":\"⥓\",\"&Rightarrow;\":\"⇒\",\"&Ropf;\":\"ℝ\",\"&RoundImplies;\":\"⥰\",\"&Rrightarrow;\":\"⇛\",\"&Rscr;\":\"ℛ\",\"&Rsh;\":\"↱\",\"&RuleDelayed;\":\"⧴\",\"&SHCHcy;\":\"Щ\",\"&SHcy;\":\"Ш\",\"&SOFTcy;\":\"Ь\",\"&Sacute;\":\"Ś\",\"&Sc;\":\"⪼\",\"&Scaron;\":\"Š\",\"&Scedil;\":\"Ş\",\"&Scirc;\":\"Ŝ\",\"&Scy;\":\"С\",\"&Sfr;\":\"𝔖\",\"&ShortDownArrow;\":\"↓\",\"&ShortLeftArrow;\":\"←\",\"&ShortRightArrow;\":\"→\",\"&ShortUpArrow;\":\"↑\",\"&Sigma;\":\"Σ\",\"&SmallCircle;\":\"∘\",\"&Sopf;\":\"𝕊\",\"&Sqrt;\":\"√\",\"&Square;\":\"□\",\"&SquareIntersection;\":\"⊓\",\"&SquareSubset;\":\"⊏\",\"&SquareSubsetEqual;\":\"⊑\",\"&SquareSuperset;\":\"⊐\",\"&SquareSupersetEqual;\":\"⊒\",\"&SquareUnion;\":\"⊔\",\"&Sscr;\":\"𝒮\",\"&Star;\":\"⋆\",\"&Sub;\":\"⋐\",\"&Subset;\":\"⋐\",\"&SubsetEqual;\":\"⊆\",\"&Succeeds;\":\"≻\",\"&SucceedsEqual;\":\"⪰\",\"&SucceedsSlantEqual;\":\"≽\",\"&SucceedsTilde;\":\"≿\",\"&SuchThat;\":\"∋\",\"&Sum;\":\"∑\",\"&Sup;\":\"⋑\",\"&Superset;\":\"⊃\",\"&SupersetEqual;\":\"⊇\",\"&Supset;\":\"⋑\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&TRADE;\":\"™\",\"&TSHcy;\":\"Ћ\",\"&TScy;\":\"Ц\",\"&Tab;\":\"\\t\",\"&Tau;\":\"Τ\",\"&Tcaron;\":\"Ť\",\"&Tcedil;\":\"Ţ\",\"&Tcy;\":\"Т\",\"&Tfr;\":\"𝔗\",\"&Therefore;\":\"∴\",\"&Theta;\":\"Θ\",\"&ThickSpace;\":\"  \",\"&ThinSpace;\":\" \",\"&Tilde;\":\"∼\",\"&TildeEqual;\":\"≃\",\"&TildeFullEqual;\":\"≅\",\"&TildeTilde;\":\"≈\",\"&Topf;\":\"𝕋\",\"&TripleDot;\":\"⃛\",\"&Tscr;\":\"𝒯\",\"&Tstrok;\":\"Ŧ\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Uarr;\":\"↟\",\"&Uarrocir;\":\"⥉\",\"&Ubrcy;\":\"Ў\",\"&Ubreve;\":\"Ŭ\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Ucy;\":\"У\",\"&Udblac;\":\"Ű\",\"&Ufr;\":\"𝔘\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Umacr;\":\"Ū\",\"&UnderBar;\":\"_\",\"&UnderBrace;\":\"⏟\",\"&UnderBracket;\":\"⎵\",\"&UnderParenthesis;\":\"⏝\",\"&Union;\":\"⋃\",\"&UnionPlus;\":\"⊎\",\"&Uogon;\":\"Ų\",\"&Uopf;\":\"𝕌\",\"&UpArrow;\":\"↑\",\"&UpArrowBar;\":\"⤒\",\"&UpArrowDownArrow;\":\"⇅\",\"&UpDownArrow;\":\"↕\",\"&UpEquilibrium;\":\"⥮\",\"&UpTee;\":\"⊥\",\"&UpTeeArrow;\":\"↥\",\"&Uparrow;\":\"⇑\",\"&Updownarrow;\":\"⇕\",\"&UpperLeftArrow;\":\"↖\",\"&UpperRightArrow;\":\"↗\",\"&Upsi;\":\"ϒ\",\"&Upsilon;\":\"Υ\",\"&Uring;\":\"Ů\",\"&Uscr;\":\"𝒰\",\"&Utilde;\":\"Ũ\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&VDash;\":\"⊫\",\"&Vbar;\":\"⫫\",\"&Vcy;\":\"В\",\"&Vdash;\":\"⊩\",\"&Vdashl;\":\"⫦\",\"&Vee;\":\"⋁\",\"&Verbar;\":\"‖\",\"&Vert;\":\"‖\",\"&VerticalBar;\":\"∣\",\"&VerticalLine;\":\"|\",\"&VerticalSeparator;\":\"❘\",\"&VerticalTilde;\":\"≀\",\"&VeryThinSpace;\":\" \",\"&Vfr;\":\"𝔙\",\"&Vopf;\":\"𝕍\",\"&Vscr;\":\"𝒱\",\"&Vvdash;\":\"⊪\",\"&Wcirc;\":\"Ŵ\",\"&Wedge;\":\"⋀\",\"&Wfr;\":\"𝔚\",\"&Wopf;\":\"𝕎\",\"&Wscr;\":\"𝒲\",\"&Xfr;\":\"𝔛\",\"&Xi;\":\"Ξ\",\"&Xopf;\":\"𝕏\",\"&Xscr;\":\"𝒳\",\"&YAcy;\":\"Я\",\"&YIcy;\":\"Ї\",\"&YUcy;\":\"Ю\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&Ycirc;\":\"Ŷ\",\"&Ycy;\":\"Ы\",\"&Yfr;\":\"𝔜\",\"&Yopf;\":\"𝕐\",\"&Yscr;\":\"𝒴\",\"&Yuml;\":\"Ÿ\",\"&ZHcy;\":\"Ж\",\"&Zacute;\":\"Ź\",\"&Zcaron;\":\"Ž\",\"&Zcy;\":\"З\",\"&Zdot;\":\"Ż\",\"&ZeroWidthSpace;\":\"​\",\"&Zeta;\":\"Ζ\",\"&Zfr;\":\"ℨ\",\"&Zopf;\":\"ℤ\",\"&Zscr;\":\"𝒵\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&abreve;\":\"ă\",\"&ac;\":\"∾\",\"&acE;\":\"∾̳\",\"&acd;\":\"∿\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&acy;\":\"а\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&af;\":\"⁡\",\"&afr;\":\"𝔞\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&alefsym;\":\"ℵ\",\"&aleph;\":\"ℵ\",\"&alpha;\":\"α\",\"&amacr;\":\"ā\",\"&amalg;\":\"⨿\",\"&amp\":\"&\",\"&amp;\":\"&\",\"&and;\":\"∧\",\"&andand;\":\"⩕\",\"&andd;\":\"⩜\",\"&andslope;\":\"⩘\",\"&andv;\":\"⩚\",\"&ang;\":\"∠\",\"&ange;\":\"⦤\",\"&angle;\":\"∠\",\"&angmsd;\":\"∡\",\"&angmsdaa;\":\"⦨\",\"&angmsdab;\":\"⦩\",\"&angmsdac;\":\"⦪\",\"&angmsdad;\":\"⦫\",\"&angmsdae;\":\"⦬\",\"&angmsdaf;\":\"⦭\",\"&angmsdag;\":\"⦮\",\"&angmsdah;\":\"⦯\",\"&angrt;\":\"∟\",\"&angrtvb;\":\"⊾\",\"&angrtvbd;\":\"⦝\",\"&angsph;\":\"∢\",\"&angst;\":\"Å\",\"&angzarr;\":\"⍼\",\"&aogon;\":\"ą\",\"&aopf;\":\"𝕒\",\"&ap;\":\"≈\",\"&apE;\":\"⩰\",\"&apacir;\":\"⩯\",\"&ape;\":\"≊\",\"&apid;\":\"≋\",\"&apos;\":\"'\",\"&approx;\":\"≈\",\"&approxeq;\":\"≊\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&ascr;\":\"𝒶\",\"&ast;\":\"*\",\"&asymp;\":\"≈\",\"&asympeq;\":\"≍\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&awconint;\":\"∳\",\"&awint;\":\"⨑\",\"&bNot;\":\"⫭\",\"&backcong;\":\"≌\",\"&backepsilon;\":\"϶\",\"&backprime;\":\"‵\",\"&backsim;\":\"∽\",\"&backsimeq;\":\"⋍\",\"&barvee;\":\"⊽\",\"&barwed;\":\"⌅\",\"&barwedge;\":\"⌅\",\"&bbrk;\":\"⎵\",\"&bbrktbrk;\":\"⎶\",\"&bcong;\":\"≌\",\"&bcy;\":\"б\",\"&bdquo;\":\"„\",\"&becaus;\":\"∵\",\"&because;\":\"∵\",\"&bemptyv;\":\"⦰\",\"&bepsi;\":\"϶\",\"&bernou;\":\"ℬ\",\"&beta;\":\"β\",\"&beth;\":\"ℶ\",\"&between;\":\"≬\",\"&bfr;\":\"𝔟\",\"&bigcap;\":\"⋂\",\"&bigcirc;\":\"◯\",\"&bigcup;\":\"⋃\",\"&bigodot;\":\"⨀\",\"&bigoplus;\":\"⨁\",\"&bigotimes;\":\"⨂\",\"&bigsqcup;\":\"⨆\",\"&bigstar;\":\"★\",\"&bigtriangledown;\":\"▽\",\"&bigtriangleup;\":\"△\",\"&biguplus;\":\"⨄\",\"&bigvee;\":\"⋁\",\"&bigwedge;\":\"⋀\",\"&bkarow;\":\"⤍\",\"&blacklozenge;\":\"⧫\",\"&blacksquare;\":\"▪\",\"&blacktriangle;\":\"▴\",\"&blacktriangledown;\":\"▾\",\"&blacktriangleleft;\":\"◂\",\"&blacktriangleright;\":\"▸\",\"&blank;\":\"␣\",\"&blk12;\":\"▒\",\"&blk14;\":\"░\",\"&blk34;\":\"▓\",\"&block;\":\"█\",\"&bne;\":\"=⃥\",\"&bnequiv;\":\"≡⃥\",\"&bnot;\":\"⌐\",\"&bopf;\":\"𝕓\",\"&bot;\":\"⊥\",\"&bottom;\":\"⊥\",\"&bowtie;\":\"⋈\",\"&boxDL;\":\"╗\",\"&boxDR;\":\"╔\",\"&boxDl;\":\"╖\",\"&boxDr;\":\"╓\",\"&boxH;\":\"═\",\"&boxHD;\":\"╦\",\"&boxHU;\":\"╩\",\"&boxHd;\":\"╤\",\"&boxHu;\":\"╧\",\"&boxUL;\":\"╝\",\"&boxUR;\":\"╚\",\"&boxUl;\":\"╜\",\"&boxUr;\":\"╙\",\"&boxV;\":\"║\",\"&boxVH;\":\"╬\",\"&boxVL;\":\"╣\",\"&boxVR;\":\"╠\",\"&boxVh;\":\"╫\",\"&boxVl;\":\"╢\",\"&boxVr;\":\"╟\",\"&boxbox;\":\"⧉\",\"&boxdL;\":\"╕\",\"&boxdR;\":\"╒\",\"&boxdl;\":\"┐\",\"&boxdr;\":\"┌\",\"&boxh;\":\"─\",\"&boxhD;\":\"╥\",\"&boxhU;\":\"╨\",\"&boxhd;\":\"┬\",\"&boxhu;\":\"┴\",\"&boxminus;\":\"⊟\",\"&boxplus;\":\"⊞\",\"&boxtimes;\":\"⊠\",\"&boxuL;\":\"╛\",\"&boxuR;\":\"╘\",\"&boxul;\":\"┘\",\"&boxur;\":\"└\",\"&boxv;\":\"│\",\"&boxvH;\":\"╪\",\"&boxvL;\":\"╡\",\"&boxvR;\":\"╞\",\"&boxvh;\":\"┼\",\"&boxvl;\":\"┤\",\"&boxvr;\":\"├\",\"&bprime;\":\"‵\",\"&breve;\":\"˘\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&bscr;\":\"𝒷\",\"&bsemi;\":\"⁏\",\"&bsim;\":\"∽\",\"&bsime;\":\"⋍\",\"&bsol;\":\"\\\\\",\"&bsolb;\":\"⧅\",\"&bsolhsub;\":\"⟈\",\"&bull;\":\"•\",\"&bullet;\":\"•\",\"&bump;\":\"≎\",\"&bumpE;\":\"⪮\",\"&bumpe;\":\"≏\",\"&bumpeq;\":\"≏\",\"&cacute;\":\"ć\",\"&cap;\":\"∩\",\"&capand;\":\"⩄\",\"&capbrcup;\":\"⩉\",\"&capcap;\":\"⩋\",\"&capcup;\":\"⩇\",\"&capdot;\":\"⩀\",\"&caps;\":\"∩︀\",\"&caret;\":\"⁁\",\"&caron;\":\"ˇ\",\"&ccaps;\":\"⩍\",\"&ccaron;\":\"č\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&ccirc;\":\"ĉ\",\"&ccups;\":\"⩌\",\"&ccupssm;\":\"⩐\",\"&cdot;\":\"ċ\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&cemptyv;\":\"⦲\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&centerdot;\":\"·\",\"&cfr;\":\"𝔠\",\"&chcy;\":\"ч\",\"&check;\":\"✓\",\"&checkmark;\":\"✓\",\"&chi;\":\"χ\",\"&cir;\":\"○\",\"&cirE;\":\"⧃\",\"&circ;\":\"ˆ\",\"&circeq;\":\"≗\",\"&circlearrowleft;\":\"↺\",\"&circlearrowright;\":\"↻\",\"&circledR;\":\"®\",\"&circledS;\":\"Ⓢ\",\"&circledast;\":\"⊛\",\"&circledcirc;\":\"⊚\",\"&circleddash;\":\"⊝\",\"&cire;\":\"≗\",\"&cirfnint;\":\"⨐\",\"&cirmid;\":\"⫯\",\"&cirscir;\":\"⧂\",\"&clubs;\":\"♣\",\"&clubsuit;\":\"♣\",\"&colon;\":\":\",\"&colone;\":\"≔\",\"&coloneq;\":\"≔\",\"&comma;\":\",\",\"&commat;\":\"@\",\"&comp;\":\"∁\",\"&compfn;\":\"∘\",\"&complement;\":\"∁\",\"&complexes;\":\"ℂ\",\"&cong;\":\"≅\",\"&congdot;\":\"⩭\",\"&conint;\":\"∮\",\"&copf;\":\"𝕔\",\"&coprod;\":\"∐\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&copysr;\":\"℗\",\"&crarr;\":\"↵\",\"&cross;\":\"✗\",\"&cscr;\":\"𝒸\",\"&csub;\":\"⫏\",\"&csube;\":\"⫑\",\"&csup;\":\"⫐\",\"&csupe;\":\"⫒\",\"&ctdot;\":\"⋯\",\"&cudarrl;\":\"⤸\",\"&cudarrr;\":\"⤵\",\"&cuepr;\":\"⋞\",\"&cuesc;\":\"⋟\",\"&cularr;\":\"↶\",\"&cularrp;\":\"⤽\",\"&cup;\":\"∪\",\"&cupbrcap;\":\"⩈\",\"&cupcap;\":\"⩆\",\"&cupcup;\":\"⩊\",\"&cupdot;\":\"⊍\",\"&cupor;\":\"⩅\",\"&cups;\":\"∪︀\",\"&curarr;\":\"↷\",\"&curarrm;\":\"⤼\",\"&curlyeqprec;\":\"⋞\",\"&curlyeqsucc;\":\"⋟\",\"&curlyvee;\":\"⋎\",\"&curlywedge;\":\"⋏\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&curvearrowleft;\":\"↶\",\"&curvearrowright;\":\"↷\",\"&cuvee;\":\"⋎\",\"&cuwed;\":\"⋏\",\"&cwconint;\":\"∲\",\"&cwint;\":\"∱\",\"&cylcty;\":\"⌭\",\"&dArr;\":\"⇓\",\"&dHar;\":\"⥥\",\"&dagger;\":\"†\",\"&daleth;\":\"ℸ\",\"&darr;\":\"↓\",\"&dash;\":\"‐\",\"&dashv;\":\"⊣\",\"&dbkarow;\":\"⤏\",\"&dblac;\":\"˝\",\"&dcaron;\":\"ď\",\"&dcy;\":\"д\",\"&dd;\":\"ⅆ\",\"&ddagger;\":\"‡\",\"&ddarr;\":\"⇊\",\"&ddotseq;\":\"⩷\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&delta;\":\"δ\",\"&demptyv;\":\"⦱\",\"&dfisht;\":\"⥿\",\"&dfr;\":\"𝔡\",\"&dharl;\":\"⇃\",\"&dharr;\":\"⇂\",\"&diam;\":\"⋄\",\"&diamond;\":\"⋄\",\"&diamondsuit;\":\"♦\",\"&diams;\":\"♦\",\"&die;\":\"¨\",\"&digamma;\":\"ϝ\",\"&disin;\":\"⋲\",\"&div;\":\"÷\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&divideontimes;\":\"⋇\",\"&divonx;\":\"⋇\",\"&djcy;\":\"ђ\",\"&dlcorn;\":\"⌞\",\"&dlcrop;\":\"⌍\",\"&dollar;\":\"$\",\"&dopf;\":\"𝕕\",\"&dot;\":\"˙\",\"&doteq;\":\"≐\",\"&doteqdot;\":\"≑\",\"&dotminus;\":\"∸\",\"&dotplus;\":\"∔\",\"&dotsquare;\":\"⊡\",\"&doublebarwedge;\":\"⌆\",\"&downarrow;\":\"↓\",\"&downdownarrows;\":\"⇊\",\"&downharpoonleft;\":\"⇃\",\"&downharpoonright;\":\"⇂\",\"&drbkarow;\":\"⤐\",\"&drcorn;\":\"⌟\",\"&drcrop;\":\"⌌\",\"&dscr;\":\"𝒹\",\"&dscy;\":\"ѕ\",\"&dsol;\":\"⧶\",\"&dstrok;\":\"đ\",\"&dtdot;\":\"⋱\",\"&dtri;\":\"▿\",\"&dtrif;\":\"▾\",\"&duarr;\":\"⇵\",\"&duhar;\":\"⥯\",\"&dwangle;\":\"⦦\",\"&dzcy;\":\"џ\",\"&dzigrarr;\":\"⟿\",\"&eDDot;\":\"⩷\",\"&eDot;\":\"≑\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&easter;\":\"⩮\",\"&ecaron;\":\"ě\",\"&ecir;\":\"≖\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&ecolon;\":\"≕\",\"&ecy;\":\"э\",\"&edot;\":\"ė\",\"&ee;\":\"ⅇ\",\"&efDot;\":\"≒\",\"&efr;\":\"𝔢\",\"&eg;\":\"⪚\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&egs;\":\"⪖\",\"&egsdot;\":\"⪘\",\"&el;\":\"⪙\",\"&elinters;\":\"⏧\",\"&ell;\":\"ℓ\",\"&els;\":\"⪕\",\"&elsdot;\":\"⪗\",\"&emacr;\":\"ē\",\"&empty;\":\"∅\",\"&emptyset;\":\"∅\",\"&emptyv;\":\"∅\",\"&emsp13;\":\" \",\"&emsp14;\":\" \",\"&emsp;\":\" \",\"&eng;\":\"ŋ\",\"&ensp;\":\" \",\"&eogon;\":\"ę\",\"&eopf;\":\"𝕖\",\"&epar;\":\"⋕\",\"&eparsl;\":\"⧣\",\"&eplus;\":\"⩱\",\"&epsi;\":\"ε\",\"&epsilon;\":\"ε\",\"&epsiv;\":\"ϵ\",\"&eqcirc;\":\"≖\",\"&eqcolon;\":\"≕\",\"&eqsim;\":\"≂\",\"&eqslantgtr;\":\"⪖\",\"&eqslantless;\":\"⪕\",\"&equals;\":\"=\",\"&equest;\":\"≟\",\"&equiv;\":\"≡\",\"&equivDD;\":\"⩸\",\"&eqvparsl;\":\"⧥\",\"&erDot;\":\"≓\",\"&erarr;\":\"⥱\",\"&escr;\":\"ℯ\",\"&esdot;\":\"≐\",\"&esim;\":\"≂\",\"&eta;\":\"η\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&euro;\":\"€\",\"&excl;\":\"!\",\"&exist;\":\"∃\",\"&expectation;\":\"ℰ\",\"&exponentiale;\":\"ⅇ\",\"&fallingdotseq;\":\"≒\",\"&fcy;\":\"ф\",\"&female;\":\"♀\",\"&ffilig;\":\"ﬃ\",\"&fflig;\":\"ﬀ\",\"&ffllig;\":\"ﬄ\",\"&ffr;\":\"𝔣\",\"&filig;\":\"ﬁ\",\"&fjlig;\":\"fj\",\"&flat;\":\"♭\",\"&fllig;\":\"ﬂ\",\"&fltns;\":\"▱\",\"&fnof;\":\"ƒ\",\"&fopf;\":\"𝕗\",\"&forall;\":\"∀\",\"&fork;\":\"⋔\",\"&forkv;\":\"⫙\",\"&fpartint;\":\"⨍\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac13;\":\"⅓\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac15;\":\"⅕\",\"&frac16;\":\"⅙\",\"&frac18;\":\"⅛\",\"&frac23;\":\"⅔\",\"&frac25;\":\"⅖\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&frac35;\":\"⅗\",\"&frac38;\":\"⅜\",\"&frac45;\":\"⅘\",\"&frac56;\":\"⅚\",\"&frac58;\":\"⅝\",\"&frac78;\":\"⅞\",\"&frasl;\":\"⁄\",\"&frown;\":\"⌢\",\"&fscr;\":\"𝒻\",\"&gE;\":\"≧\",\"&gEl;\":\"⪌\",\"&gacute;\":\"ǵ\",\"&gamma;\":\"γ\",\"&gammad;\":\"ϝ\",\"&gap;\":\"⪆\",\"&gbreve;\":\"ğ\",\"&gcirc;\":\"ĝ\",\"&gcy;\":\"г\",\"&gdot;\":\"ġ\",\"&ge;\":\"≥\",\"&gel;\":\"⋛\",\"&geq;\":\"≥\",\"&geqq;\":\"≧\",\"&geqslant;\":\"⩾\",\"&ges;\":\"⩾\",\"&gescc;\":\"⪩\",\"&gesdot;\":\"⪀\",\"&gesdoto;\":\"⪂\",\"&gesdotol;\":\"⪄\",\"&gesl;\":\"⋛︀\",\"&gesles;\":\"⪔\",\"&gfr;\":\"𝔤\",\"&gg;\":\"≫\",\"&ggg;\":\"⋙\",\"&gimel;\":\"ℷ\",\"&gjcy;\":\"ѓ\",\"&gl;\":\"≷\",\"&glE;\":\"⪒\",\"&gla;\":\"⪥\",\"&glj;\":\"⪤\",\"&gnE;\":\"≩\",\"&gnap;\":\"⪊\",\"&gnapprox;\":\"⪊\",\"&gne;\":\"⪈\",\"&gneq;\":\"⪈\",\"&gneqq;\":\"≩\",\"&gnsim;\":\"⋧\",\"&gopf;\":\"𝕘\",\"&grave;\":\"`\",\"&gscr;\":\"ℊ\",\"&gsim;\":\"≳\",\"&gsime;\":\"⪎\",\"&gsiml;\":\"⪐\",\"&gt\":\">\",\"&gt;\":\">\",\"&gtcc;\":\"⪧\",\"&gtcir;\":\"⩺\",\"&gtdot;\":\"⋗\",\"&gtlPar;\":\"⦕\",\"&gtquest;\":\"⩼\",\"&gtrapprox;\":\"⪆\",\"&gtrarr;\":\"⥸\",\"&gtrdot;\":\"⋗\",\"&gtreqless;\":\"⋛\",\"&gtreqqless;\":\"⪌\",\"&gtrless;\":\"≷\",\"&gtrsim;\":\"≳\",\"&gvertneqq;\":\"≩︀\",\"&gvnE;\":\"≩︀\",\"&hArr;\":\"⇔\",\"&hairsp;\":\" \",\"&half;\":\"½\",\"&hamilt;\":\"ℋ\",\"&hardcy;\":\"ъ\",\"&harr;\":\"↔\",\"&harrcir;\":\"⥈\",\"&harrw;\":\"↭\",\"&hbar;\":\"ℏ\",\"&hcirc;\":\"ĥ\",\"&hearts;\":\"♥\",\"&heartsuit;\":\"♥\",\"&hellip;\":\"…\",\"&hercon;\":\"⊹\",\"&hfr;\":\"𝔥\",\"&hksearow;\":\"⤥\",\"&hkswarow;\":\"⤦\",\"&hoarr;\":\"⇿\",\"&homtht;\":\"∻\",\"&hookleftarrow;\":\"↩\",\"&hookrightarrow;\":\"↪\",\"&hopf;\":\"𝕙\",\"&horbar;\":\"―\",\"&hscr;\":\"𝒽\",\"&hslash;\":\"ℏ\",\"&hstrok;\":\"ħ\",\"&hybull;\":\"⁃\",\"&hyphen;\":\"‐\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&ic;\":\"⁣\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&icy;\":\"и\",\"&iecy;\":\"е\",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&iff;\":\"⇔\",\"&ifr;\":\"𝔦\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&ii;\":\"ⅈ\",\"&iiiint;\":\"⨌\",\"&iiint;\":\"∭\",\"&iinfin;\":\"⧜\",\"&iiota;\":\"℩\",\"&ijlig;\":\"ĳ\",\"&imacr;\":\"ī\",\"&image;\":\"ℑ\",\"&imagline;\":\"ℐ\",\"&imagpart;\":\"ℑ\",\"&imath;\":\"ı\",\"&imof;\":\"⊷\",\"&imped;\":\"Ƶ\",\"&in;\":\"∈\",\"&incare;\":\"℅\",\"&infin;\":\"∞\",\"&infintie;\":\"⧝\",\"&inodot;\":\"ı\",\"&int;\":\"∫\",\"&intcal;\":\"⊺\",\"&integers;\":\"ℤ\",\"&intercal;\":\"⊺\",\"&intlarhk;\":\"⨗\",\"&intprod;\":\"⨼\",\"&iocy;\":\"ё\",\"&iogon;\":\"į\",\"&iopf;\":\"𝕚\",\"&iota;\":\"ι\",\"&iprod;\":\"⨼\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&iscr;\":\"𝒾\",\"&isin;\":\"∈\",\"&isinE;\":\"⋹\",\"&isindot;\":\"⋵\",\"&isins;\":\"⋴\",\"&isinsv;\":\"⋳\",\"&isinv;\":\"∈\",\"&it;\":\"⁢\",\"&itilde;\":\"ĩ\",\"&iukcy;\":\"і\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&jcirc;\":\"ĵ\",\"&jcy;\":\"й\",\"&jfr;\":\"𝔧\",\"&jmath;\":\"ȷ\",\"&jopf;\":\"𝕛\",\"&jscr;\":\"𝒿\",\"&jsercy;\":\"ј\",\"&jukcy;\":\"є\",\"&kappa;\":\"κ\",\"&kappav;\":\"ϰ\",\"&kcedil;\":\"ķ\",\"&kcy;\":\"к\",\"&kfr;\":\"𝔨\",\"&kgreen;\":\"ĸ\",\"&khcy;\":\"х\",\"&kjcy;\":\"ќ\",\"&kopf;\":\"𝕜\",\"&kscr;\":\"𝓀\",\"&lAarr;\":\"⇚\",\"&lArr;\":\"⇐\",\"&lAtail;\":\"⤛\",\"&lBarr;\":\"⤎\",\"&lE;\":\"≦\",\"&lEg;\":\"⪋\",\"&lHar;\":\"⥢\",\"&lacute;\":\"ĺ\",\"&laemptyv;\":\"⦴\",\"&lagran;\":\"ℒ\",\"&lambda;\":\"λ\",\"&lang;\":\"⟨\",\"&langd;\":\"⦑\",\"&langle;\":\"⟨\",\"&lap;\":\"⪅\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&larr;\":\"←\",\"&larrb;\":\"⇤\",\"&larrbfs;\":\"⤟\",\"&larrfs;\":\"⤝\",\"&larrhk;\":\"↩\",\"&larrlp;\":\"↫\",\"&larrpl;\":\"⤹\",\"&larrsim;\":\"⥳\",\"&larrtl;\":\"↢\",\"&lat;\":\"⪫\",\"&latail;\":\"⤙\",\"&late;\":\"⪭\",\"&lates;\":\"⪭︀\",\"&lbarr;\":\"⤌\",\"&lbbrk;\":\"❲\",\"&lbrace;\":\"{\",\"&lbrack;\":\"[\",\"&lbrke;\":\"⦋\",\"&lbrksld;\":\"⦏\",\"&lbrkslu;\":\"⦍\",\"&lcaron;\":\"ľ\",\"&lcedil;\":\"ļ\",\"&lceil;\":\"⌈\",\"&lcub;\":\"{\",\"&lcy;\":\"л\",\"&ldca;\":\"⤶\",\"&ldquo;\":\"“\",\"&ldquor;\":\"„\",\"&ldrdhar;\":\"⥧\",\"&ldrushar;\":\"⥋\",\"&ldsh;\":\"↲\",\"&le;\":\"≤\",\"&leftarrow;\":\"←\",\"&leftarrowtail;\":\"↢\",\"&leftharpoondown;\":\"↽\",\"&leftharpoonup;\":\"↼\",\"&leftleftarrows;\":\"⇇\",\"&leftrightarrow;\":\"↔\",\"&leftrightarrows;\":\"⇆\",\"&leftrightharpoons;\":\"⇋\",\"&leftrightsquigarrow;\":\"↭\",\"&leftthreetimes;\":\"⋋\",\"&leg;\":\"⋚\",\"&leq;\":\"≤\",\"&leqq;\":\"≦\",\"&leqslant;\":\"⩽\",\"&les;\":\"⩽\",\"&lescc;\":\"⪨\",\"&lesdot;\":\"⩿\",\"&lesdoto;\":\"⪁\",\"&lesdotor;\":\"⪃\",\"&lesg;\":\"⋚︀\",\"&lesges;\":\"⪓\",\"&lessapprox;\":\"⪅\",\"&lessdot;\":\"⋖\",\"&lesseqgtr;\":\"⋚\",\"&lesseqqgtr;\":\"⪋\",\"&lessgtr;\":\"≶\",\"&lesssim;\":\"≲\",\"&lfisht;\":\"⥼\",\"&lfloor;\":\"⌊\",\"&lfr;\":\"𝔩\",\"&lg;\":\"≶\",\"&lgE;\":\"⪑\",\"&lhard;\":\"↽\",\"&lharu;\":\"↼\",\"&lharul;\":\"⥪\",\"&lhblk;\":\"▄\",\"&ljcy;\":\"љ\",\"&ll;\":\"≪\",\"&llarr;\":\"⇇\",\"&llcorner;\":\"⌞\",\"&llhard;\":\"⥫\",\"&lltri;\":\"◺\",\"&lmidot;\":\"ŀ\",\"&lmoust;\":\"⎰\",\"&lmoustache;\":\"⎰\",\"&lnE;\":\"≨\",\"&lnap;\":\"⪉\",\"&lnapprox;\":\"⪉\",\"&lne;\":\"⪇\",\"&lneq;\":\"⪇\",\"&lneqq;\":\"≨\",\"&lnsim;\":\"⋦\",\"&loang;\":\"⟬\",\"&loarr;\":\"⇽\",\"&lobrk;\":\"⟦\",\"&longleftarrow;\":\"⟵\",\"&longleftrightarrow;\":\"⟷\",\"&longmapsto;\":\"⟼\",\"&longrightarrow;\":\"⟶\",\"&looparrowleft;\":\"↫\",\"&looparrowright;\":\"↬\",\"&lopar;\":\"⦅\",\"&lopf;\":\"𝕝\",\"&loplus;\":\"⨭\",\"&lotimes;\":\"⨴\",\"&lowast;\":\"∗\",\"&lowbar;\":\"_\",\"&loz;\":\"◊\",\"&lozenge;\":\"◊\",\"&lozf;\":\"⧫\",\"&lpar;\":\"(\",\"&lparlt;\":\"⦓\",\"&lrarr;\":\"⇆\",\"&lrcorner;\":\"⌟\",\"&lrhar;\":\"⇋\",\"&lrhard;\":\"⥭\",\"&lrm;\":\"‎\",\"&lrtri;\":\"⊿\",\"&lsaquo;\":\"‹\",\"&lscr;\":\"𝓁\",\"&lsh;\":\"↰\",\"&lsim;\":\"≲\",\"&lsime;\":\"⪍\",\"&lsimg;\":\"⪏\",\"&lsqb;\":\"[\",\"&lsquo;\":\"‘\",\"&lsquor;\":\"‚\",\"&lstrok;\":\"ł\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&ltcc;\":\"⪦\",\"&ltcir;\":\"⩹\",\"&ltdot;\":\"⋖\",\"&lthree;\":\"⋋\",\"&ltimes;\":\"⋉\",\"&ltlarr;\":\"⥶\",\"&ltquest;\":\"⩻\",\"&ltrPar;\":\"⦖\",\"&ltri;\":\"◃\",\"&ltrie;\":\"⊴\",\"&ltrif;\":\"◂\",\"&lurdshar;\":\"⥊\",\"&luruhar;\":\"⥦\",\"&lvertneqq;\":\"≨︀\",\"&lvnE;\":\"≨︀\",\"&mDDot;\":\"∺\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&male;\":\"♂\",\"&malt;\":\"✠\",\"&maltese;\":\"✠\",\"&map;\":\"↦\",\"&mapsto;\":\"↦\",\"&mapstodown;\":\"↧\",\"&mapstoleft;\":\"↤\",\"&mapstoup;\":\"↥\",\"&marker;\":\"▮\",\"&mcomma;\":\"⨩\",\"&mcy;\":\"м\",\"&mdash;\":\"—\",\"&measuredangle;\":\"∡\",\"&mfr;\":\"𝔪\",\"&mho;\":\"℧\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&mid;\":\"∣\",\"&midast;\":\"*\",\"&midcir;\":\"⫰\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&minus;\":\"−\",\"&minusb;\":\"⊟\",\"&minusd;\":\"∸\",\"&minusdu;\":\"⨪\",\"&mlcp;\":\"⫛\",\"&mldr;\":\"…\",\"&mnplus;\":\"∓\",\"&models;\":\"⊧\",\"&mopf;\":\"𝕞\",\"&mp;\":\"∓\",\"&mscr;\":\"𝓂\",\"&mstpos;\":\"∾\",\"&mu;\":\"μ\",\"&multimap;\":\"⊸\",\"&mumap;\":\"⊸\",\"&nGg;\":\"⋙̸\",\"&nGt;\":\"≫⃒\",\"&nGtv;\":\"≫̸\",\"&nLeftarrow;\":\"⇍\",\"&nLeftrightarrow;\":\"⇎\",\"&nLl;\":\"⋘̸\",\"&nLt;\":\"≪⃒\",\"&nLtv;\":\"≪̸\",\"&nRightarrow;\":\"⇏\",\"&nVDash;\":\"⊯\",\"&nVdash;\":\"⊮\",\"&nabla;\":\"∇\",\"&nacute;\":\"ń\",\"&nang;\":\"∠⃒\",\"&nap;\":\"≉\",\"&napE;\":\"⩰̸\",\"&napid;\":\"≋̸\",\"&napos;\":\"ŉ\",\"&napprox;\":\"≉\",\"&natur;\":\"♮\",\"&natural;\":\"♮\",\"&naturals;\":\"ℕ\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&nbump;\":\"≎̸\",\"&nbumpe;\":\"≏̸\",\"&ncap;\":\"⩃\",\"&ncaron;\":\"ň\",\"&ncedil;\":\"ņ\",\"&ncong;\":\"≇\",\"&ncongdot;\":\"⩭̸\",\"&ncup;\":\"⩂\",\"&ncy;\":\"н\",\"&ndash;\":\"–\",\"&ne;\":\"≠\",\"&neArr;\":\"⇗\",\"&nearhk;\":\"⤤\",\"&nearr;\":\"↗\",\"&nearrow;\":\"↗\",\"&nedot;\":\"≐̸\",\"&nequiv;\":\"≢\",\"&nesear;\":\"⤨\",\"&nesim;\":\"≂̸\",\"&nexist;\":\"∄\",\"&nexists;\":\"∄\",\"&nfr;\":\"𝔫\",\"&ngE;\":\"≧̸\",\"&nge;\":\"≱\",\"&ngeq;\":\"≱\",\"&ngeqq;\":\"≧̸\",\"&ngeqslant;\":\"⩾̸\",\"&nges;\":\"⩾̸\",\"&ngsim;\":\"≵\",\"&ngt;\":\"≯\",\"&ngtr;\":\"≯\",\"&nhArr;\":\"⇎\",\"&nharr;\":\"↮\",\"&nhpar;\":\"⫲\",\"&ni;\":\"∋\",\"&nis;\":\"⋼\",\"&nisd;\":\"⋺\",\"&niv;\":\"∋\",\"&njcy;\":\"њ\",\"&nlArr;\":\"⇍\",\"&nlE;\":\"≦̸\",\"&nlarr;\":\"↚\",\"&nldr;\":\"‥\",\"&nle;\":\"≰\",\"&nleftarrow;\":\"↚\",\"&nleftrightarrow;\":\"↮\",\"&nleq;\":\"≰\",\"&nleqq;\":\"≦̸\",\"&nleqslant;\":\"⩽̸\",\"&nles;\":\"⩽̸\",\"&nless;\":\"≮\",\"&nlsim;\":\"≴\",\"&nlt;\":\"≮\",\"&nltri;\":\"⋪\",\"&nltrie;\":\"⋬\",\"&nmid;\":\"∤\",\"&nopf;\":\"𝕟\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&notin;\":\"∉\",\"&notinE;\":\"⋹̸\",\"&notindot;\":\"⋵̸\",\"&notinva;\":\"∉\",\"&notinvb;\":\"⋷\",\"&notinvc;\":\"⋶\",\"&notni;\":\"∌\",\"&notniva;\":\"∌\",\"&notnivb;\":\"⋾\",\"&notnivc;\":\"⋽\",\"&npar;\":\"∦\",\"&nparallel;\":\"∦\",\"&nparsl;\":\"⫽⃥\",\"&npart;\":\"∂̸\",\"&npolint;\":\"⨔\",\"&npr;\":\"⊀\",\"&nprcue;\":\"⋠\",\"&npre;\":\"⪯̸\",\"&nprec;\":\"⊀\",\"&npreceq;\":\"⪯̸\",\"&nrArr;\":\"⇏\",\"&nrarr;\":\"↛\",\"&nrarrc;\":\"⤳̸\",\"&nrarrw;\":\"↝̸\",\"&nrightarrow;\":\"↛\",\"&nrtri;\":\"⋫\",\"&nrtrie;\":\"⋭\",\"&nsc;\":\"⊁\",\"&nsccue;\":\"⋡\",\"&nsce;\":\"⪰̸\",\"&nscr;\":\"𝓃\",\"&nshortmid;\":\"∤\",\"&nshortparallel;\":\"∦\",\"&nsim;\":\"≁\",\"&nsime;\":\"≄\",\"&nsimeq;\":\"≄\",\"&nsmid;\":\"∤\",\"&nspar;\":\"∦\",\"&nsqsube;\":\"⋢\",\"&nsqsupe;\":\"⋣\",\"&nsub;\":\"⊄\",\"&nsubE;\":\"⫅̸\",\"&nsube;\":\"⊈\",\"&nsubset;\":\"⊂⃒\",\"&nsubseteq;\":\"⊈\",\"&nsubseteqq;\":\"⫅̸\",\"&nsucc;\":\"⊁\",\"&nsucceq;\":\"⪰̸\",\"&nsup;\":\"⊅\",\"&nsupE;\":\"⫆̸\",\"&nsupe;\":\"⊉\",\"&nsupset;\":\"⊃⃒\",\"&nsupseteq;\":\"⊉\",\"&nsupseteqq;\":\"⫆̸\",\"&ntgl;\":\"≹\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ntlg;\":\"≸\",\"&ntriangleleft;\":\"⋪\",\"&ntrianglelefteq;\":\"⋬\",\"&ntriangleright;\":\"⋫\",\"&ntrianglerighteq;\":\"⋭\",\"&nu;\":\"ν\",\"&num;\":\"#\",\"&numero;\":\"№\",\"&numsp;\":\" \",\"&nvDash;\":\"⊭\",\"&nvHarr;\":\"⤄\",\"&nvap;\":\"≍⃒\",\"&nvdash;\":\"⊬\",\"&nvge;\":\"≥⃒\",\"&nvgt;\":\">⃒\",\"&nvinfin;\":\"⧞\",\"&nvlArr;\":\"⤂\",\"&nvle;\":\"≤⃒\",\"&nvlt;\":\"<⃒\",\"&nvltrie;\":\"⊴⃒\",\"&nvrArr;\":\"⤃\",\"&nvrtrie;\":\"⊵⃒\",\"&nvsim;\":\"∼⃒\",\"&nwArr;\":\"⇖\",\"&nwarhk;\":\"⤣\",\"&nwarr;\":\"↖\",\"&nwarrow;\":\"↖\",\"&nwnear;\":\"⤧\",\"&oS;\":\"Ⓢ\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&oast;\":\"⊛\",\"&ocir;\":\"⊚\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&ocy;\":\"о\",\"&odash;\":\"⊝\",\"&odblac;\":\"ő\",\"&odiv;\":\"⨸\",\"&odot;\":\"⊙\",\"&odsold;\":\"⦼\",\"&oelig;\":\"œ\",\"&ofcir;\":\"⦿\",\"&ofr;\":\"𝔬\",\"&ogon;\":\"˛\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&ogt;\":\"⧁\",\"&ohbar;\":\"⦵\",\"&ohm;\":\"Ω\",\"&oint;\":\"∮\",\"&olarr;\":\"↺\",\"&olcir;\":\"⦾\",\"&olcross;\":\"⦻\",\"&oline;\":\"‾\",\"&olt;\":\"⧀\",\"&omacr;\":\"ō\",\"&omega;\":\"ω\",\"&omicron;\":\"ο\",\"&omid;\":\"⦶\",\"&ominus;\":\"⊖\",\"&oopf;\":\"𝕠\",\"&opar;\":\"⦷\",\"&operp;\":\"⦹\",\"&oplus;\":\"⊕\",\"&or;\":\"∨\",\"&orarr;\":\"↻\",\"&ord;\":\"⩝\",\"&order;\":\"ℴ\",\"&orderof;\":\"ℴ\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&origof;\":\"⊶\",\"&oror;\":\"⩖\",\"&orslope;\":\"⩗\",\"&orv;\":\"⩛\",\"&oscr;\":\"ℴ\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&osol;\":\"⊘\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&otimes;\":\"⊗\",\"&otimesas;\":\"⨶\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&ovbar;\":\"⌽\",\"&par;\":\"∥\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&parallel;\":\"∥\",\"&parsim;\":\"⫳\",\"&parsl;\":\"⫽\",\"&part;\":\"∂\",\"&pcy;\":\"п\",\"&percnt;\":\"%\",\"&period;\":\".\",\"&permil;\":\"‰\",\"&perp;\":\"⊥\",\"&pertenk;\":\"‱\",\"&pfr;\":\"𝔭\",\"&phi;\":\"φ\",\"&phiv;\":\"ϕ\",\"&phmmat;\":\"ℳ\",\"&phone;\":\"☎\",\"&pi;\":\"π\",\"&pitchfork;\":\"⋔\",\"&piv;\":\"ϖ\",\"&planck;\":\"ℏ\",\"&planckh;\":\"ℎ\",\"&plankv;\":\"ℏ\",\"&plus;\":\"+\",\"&plusacir;\":\"⨣\",\"&plusb;\":\"⊞\",\"&pluscir;\":\"⨢\",\"&plusdo;\":\"∔\",\"&plusdu;\":\"⨥\",\"&pluse;\":\"⩲\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&plussim;\":\"⨦\",\"&plustwo;\":\"⨧\",\"&pm;\":\"±\",\"&pointint;\":\"⨕\",\"&popf;\":\"𝕡\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&pr;\":\"≺\",\"&prE;\":\"⪳\",\"&prap;\":\"⪷\",\"&prcue;\":\"≼\",\"&pre;\":\"⪯\",\"&prec;\":\"≺\",\"&precapprox;\":\"⪷\",\"&preccurlyeq;\":\"≼\",\"&preceq;\":\"⪯\",\"&precnapprox;\":\"⪹\",\"&precneqq;\":\"⪵\",\"&precnsim;\":\"⋨\",\"&precsim;\":\"≾\",\"&prime;\":\"′\",\"&primes;\":\"ℙ\",\"&prnE;\":\"⪵\",\"&prnap;\":\"⪹\",\"&prnsim;\":\"⋨\",\"&prod;\":\"∏\",\"&profalar;\":\"⌮\",\"&profline;\":\"⌒\",\"&profsurf;\":\"⌓\",\"&prop;\":\"∝\",\"&propto;\":\"∝\",\"&prsim;\":\"≾\",\"&prurel;\":\"⊰\",\"&pscr;\":\"𝓅\",\"&psi;\":\"ψ\",\"&puncsp;\":\" \",\"&qfr;\":\"𝔮\",\"&qint;\":\"⨌\",\"&qopf;\":\"𝕢\",\"&qprime;\":\"⁗\",\"&qscr;\":\"𝓆\",\"&quaternions;\":\"ℍ\",\"&quatint;\":\"⨖\",\"&quest;\":\"?\",\"&questeq;\":\"≟\",\"&quot\":'\"',\"&quot;\":'\"',\"&rAarr;\":\"⇛\",\"&rArr;\":\"⇒\",\"&rAtail;\":\"⤜\",\"&rBarr;\":\"⤏\",\"&rHar;\":\"⥤\",\"&race;\":\"∽̱\",\"&racute;\":\"ŕ\",\"&radic;\":\"√\",\"&raemptyv;\":\"⦳\",\"&rang;\":\"⟩\",\"&rangd;\":\"⦒\",\"&range;\":\"⦥\",\"&rangle;\":\"⟩\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&rarr;\":\"→\",\"&rarrap;\":\"⥵\",\"&rarrb;\":\"⇥\",\"&rarrbfs;\":\"⤠\",\"&rarrc;\":\"⤳\",\"&rarrfs;\":\"⤞\",\"&rarrhk;\":\"↪\",\"&rarrlp;\":\"↬\",\"&rarrpl;\":\"⥅\",\"&rarrsim;\":\"⥴\",\"&rarrtl;\":\"↣\",\"&rarrw;\":\"↝\",\"&ratail;\":\"⤚\",\"&ratio;\":\"∶\",\"&rationals;\":\"ℚ\",\"&rbarr;\":\"⤍\",\"&rbbrk;\":\"❳\",\"&rbrace;\":\"}\",\"&rbrack;\":\"]\",\"&rbrke;\":\"⦌\",\"&rbrksld;\":\"⦎\",\"&rbrkslu;\":\"⦐\",\"&rcaron;\":\"ř\",\"&rcedil;\":\"ŗ\",\"&rceil;\":\"⌉\",\"&rcub;\":\"}\",\"&rcy;\":\"р\",\"&rdca;\":\"⤷\",\"&rdldhar;\":\"⥩\",\"&rdquo;\":\"”\",\"&rdquor;\":\"”\",\"&rdsh;\":\"↳\",\"&real;\":\"ℜ\",\"&realine;\":\"ℛ\",\"&realpart;\":\"ℜ\",\"&reals;\":\"ℝ\",\"&rect;\":\"▭\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&rfisht;\":\"⥽\",\"&rfloor;\":\"⌋\",\"&rfr;\":\"𝔯\",\"&rhard;\":\"⇁\",\"&rharu;\":\"⇀\",\"&rharul;\":\"⥬\",\"&rho;\":\"ρ\",\"&rhov;\":\"ϱ\",\"&rightarrow;\":\"→\",\"&rightarrowtail;\":\"↣\",\"&rightharpoondown;\":\"⇁\",\"&rightharpoonup;\":\"⇀\",\"&rightleftarrows;\":\"⇄\",\"&rightleftharpoons;\":\"⇌\",\"&rightrightarrows;\":\"⇉\",\"&rightsquigarrow;\":\"↝\",\"&rightthreetimes;\":\"⋌\",\"&ring;\":\"˚\",\"&risingdotseq;\":\"≓\",\"&rlarr;\":\"⇄\",\"&rlhar;\":\"⇌\",\"&rlm;\":\"‏\",\"&rmoust;\":\"⎱\",\"&rmoustache;\":\"⎱\",\"&rnmid;\":\"⫮\",\"&roang;\":\"⟭\",\"&roarr;\":\"⇾\",\"&robrk;\":\"⟧\",\"&ropar;\":\"⦆\",\"&ropf;\":\"𝕣\",\"&roplus;\":\"⨮\",\"&rotimes;\":\"⨵\",\"&rpar;\":\")\",\"&rpargt;\":\"⦔\",\"&rppolint;\":\"⨒\",\"&rrarr;\":\"⇉\",\"&rsaquo;\":\"›\",\"&rscr;\":\"𝓇\",\"&rsh;\":\"↱\",\"&rsqb;\":\"]\",\"&rsquo;\":\"’\",\"&rsquor;\":\"’\",\"&rthree;\":\"⋌\",\"&rtimes;\":\"⋊\",\"&rtri;\":\"▹\",\"&rtrie;\":\"⊵\",\"&rtrif;\":\"▸\",\"&rtriltri;\":\"⧎\",\"&ruluhar;\":\"⥨\",\"&rx;\":\"℞\",\"&sacute;\":\"ś\",\"&sbquo;\":\"‚\",\"&sc;\":\"≻\",\"&scE;\":\"⪴\",\"&scap;\":\"⪸\",\"&scaron;\":\"š\",\"&sccue;\":\"≽\",\"&sce;\":\"⪰\",\"&scedil;\":\"ş\",\"&scirc;\":\"ŝ\",\"&scnE;\":\"⪶\",\"&scnap;\":\"⪺\",\"&scnsim;\":\"⋩\",\"&scpolint;\":\"⨓\",\"&scsim;\":\"≿\",\"&scy;\":\"с\",\"&sdot;\":\"⋅\",\"&sdotb;\":\"⊡\",\"&sdote;\":\"⩦\",\"&seArr;\":\"⇘\",\"&searhk;\":\"⤥\",\"&searr;\":\"↘\",\"&searrow;\":\"↘\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&semi;\":\";\",\"&seswar;\":\"⤩\",\"&setminus;\":\"∖\",\"&setmn;\":\"∖\",\"&sext;\":\"✶\",\"&sfr;\":\"𝔰\",\"&sfrown;\":\"⌢\",\"&sharp;\":\"♯\",\"&shchcy;\":\"щ\",\"&shcy;\":\"ш\",\"&shortmid;\":\"∣\",\"&shortparallel;\":\"∥\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&sigma;\":\"σ\",\"&sigmaf;\":\"ς\",\"&sigmav;\":\"ς\",\"&sim;\":\"∼\",\"&simdot;\":\"⩪\",\"&sime;\":\"≃\",\"&simeq;\":\"≃\",\"&simg;\":\"⪞\",\"&simgE;\":\"⪠\",\"&siml;\":\"⪝\",\"&simlE;\":\"⪟\",\"&simne;\":\"≆\",\"&simplus;\":\"⨤\",\"&simrarr;\":\"⥲\",\"&slarr;\":\"←\",\"&smallsetminus;\":\"∖\",\"&smashp;\":\"⨳\",\"&smeparsl;\":\"⧤\",\"&smid;\":\"∣\",\"&smile;\":\"⌣\",\"&smt;\":\"⪪\",\"&smte;\":\"⪬\",\"&smtes;\":\"⪬︀\",\"&softcy;\":\"ь\",\"&sol;\":\"/\",\"&solb;\":\"⧄\",\"&solbar;\":\"⌿\",\"&sopf;\":\"𝕤\",\"&spades;\":\"♠\",\"&spadesuit;\":\"♠\",\"&spar;\":\"∥\",\"&sqcap;\":\"⊓\",\"&sqcaps;\":\"⊓︀\",\"&sqcup;\":\"⊔\",\"&sqcups;\":\"⊔︀\",\"&sqsub;\":\"⊏\",\"&sqsube;\":\"⊑\",\"&sqsubset;\":\"⊏\",\"&sqsubseteq;\":\"⊑\",\"&sqsup;\":\"⊐\",\"&sqsupe;\":\"⊒\",\"&sqsupset;\":\"⊐\",\"&sqsupseteq;\":\"⊒\",\"&squ;\":\"□\",\"&square;\":\"□\",\"&squarf;\":\"▪\",\"&squf;\":\"▪\",\"&srarr;\":\"→\",\"&sscr;\":\"𝓈\",\"&ssetmn;\":\"∖\",\"&ssmile;\":\"⌣\",\"&sstarf;\":\"⋆\",\"&star;\":\"☆\",\"&starf;\":\"★\",\"&straightepsilon;\":\"ϵ\",\"&straightphi;\":\"ϕ\",\"&strns;\":\"¯\",\"&sub;\":\"⊂\",\"&subE;\":\"⫅\",\"&subdot;\":\"⪽\",\"&sube;\":\"⊆\",\"&subedot;\":\"⫃\",\"&submult;\":\"⫁\",\"&subnE;\":\"⫋\",\"&subne;\":\"⊊\",\"&subplus;\":\"⪿\",\"&subrarr;\":\"⥹\",\"&subset;\":\"⊂\",\"&subseteq;\":\"⊆\",\"&subseteqq;\":\"⫅\",\"&subsetneq;\":\"⊊\",\"&subsetneqq;\":\"⫋\",\"&subsim;\":\"⫇\",\"&subsub;\":\"⫕\",\"&subsup;\":\"⫓\",\"&succ;\":\"≻\",\"&succapprox;\":\"⪸\",\"&succcurlyeq;\":\"≽\",\"&succeq;\":\"⪰\",\"&succnapprox;\":\"⪺\",\"&succneqq;\":\"⪶\",\"&succnsim;\":\"⋩\",\"&succsim;\":\"≿\",\"&sum;\":\"∑\",\"&sung;\":\"♪\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&sup;\":\"⊃\",\"&supE;\":\"⫆\",\"&supdot;\":\"⪾\",\"&supdsub;\":\"⫘\",\"&supe;\":\"⊇\",\"&supedot;\":\"⫄\",\"&suphsol;\":\"⟉\",\"&suphsub;\":\"⫗\",\"&suplarr;\":\"⥻\",\"&supmult;\":\"⫂\",\"&supnE;\":\"⫌\",\"&supne;\":\"⊋\",\"&supplus;\":\"⫀\",\"&supset;\":\"⊃\",\"&supseteq;\":\"⊇\",\"&supseteqq;\":\"⫆\",\"&supsetneq;\":\"⊋\",\"&supsetneqq;\":\"⫌\",\"&supsim;\":\"⫈\",\"&supsub;\":\"⫔\",\"&supsup;\":\"⫖\",\"&swArr;\":\"⇙\",\"&swarhk;\":\"⤦\",\"&swarr;\":\"↙\",\"&swarrow;\":\"↙\",\"&swnwar;\":\"⤪\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&target;\":\"⌖\",\"&tau;\":\"τ\",\"&tbrk;\":\"⎴\",\"&tcaron;\":\"ť\",\"&tcedil;\":\"ţ\",\"&tcy;\":\"т\",\"&tdot;\":\"⃛\",\"&telrec;\":\"⌕\",\"&tfr;\":\"𝔱\",\"&there4;\":\"∴\",\"&therefore;\":\"∴\",\"&theta;\":\"θ\",\"&thetasym;\":\"ϑ\",\"&thetav;\":\"ϑ\",\"&thickapprox;\":\"≈\",\"&thicksim;\":\"∼\",\"&thinsp;\":\" \",\"&thkap;\":\"≈\",\"&thksim;\":\"∼\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&tilde;\":\"˜\",\"&times\":\"×\",\"&times;\":\"×\",\"&timesb;\":\"⊠\",\"&timesbar;\":\"⨱\",\"&timesd;\":\"⨰\",\"&tint;\":\"∭\",\"&toea;\":\"⤨\",\"&top;\":\"⊤\",\"&topbot;\":\"⌶\",\"&topcir;\":\"⫱\",\"&topf;\":\"𝕥\",\"&topfork;\":\"⫚\",\"&tosa;\":\"⤩\",\"&tprime;\":\"‴\",\"&trade;\":\"™\",\"&triangle;\":\"▵\",\"&triangledown;\":\"▿\",\"&triangleleft;\":\"◃\",\"&trianglelefteq;\":\"⊴\",\"&triangleq;\":\"≜\",\"&triangleright;\":\"▹\",\"&trianglerighteq;\":\"⊵\",\"&tridot;\":\"◬\",\"&trie;\":\"≜\",\"&triminus;\":\"⨺\",\"&triplus;\":\"⨹\",\"&trisb;\":\"⧍\",\"&tritime;\":\"⨻\",\"&trpezium;\":\"⏢\",\"&tscr;\":\"𝓉\",\"&tscy;\":\"ц\",\"&tshcy;\":\"ћ\",\"&tstrok;\":\"ŧ\",\"&twixt;\":\"≬\",\"&twoheadleftarrow;\":\"↞\",\"&twoheadrightarrow;\":\"↠\",\"&uArr;\":\"⇑\",\"&uHar;\":\"⥣\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&uarr;\":\"↑\",\"&ubrcy;\":\"ў\",\"&ubreve;\":\"ŭ\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&ucy;\":\"у\",\"&udarr;\":\"⇅\",\"&udblac;\":\"ű\",\"&udhar;\":\"⥮\",\"&ufisht;\":\"⥾\",\"&ufr;\":\"𝔲\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uharl;\":\"↿\",\"&uharr;\":\"↾\",\"&uhblk;\":\"▀\",\"&ulcorn;\":\"⌜\",\"&ulcorner;\":\"⌜\",\"&ulcrop;\":\"⌏\",\"&ultri;\":\"◸\",\"&umacr;\":\"ū\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&uogon;\":\"ų\",\"&uopf;\":\"𝕦\",\"&uparrow;\":\"↑\",\"&updownarrow;\":\"↕\",\"&upharpoonleft;\":\"↿\",\"&upharpoonright;\":\"↾\",\"&uplus;\":\"⊎\",\"&upsi;\":\"υ\",\"&upsih;\":\"ϒ\",\"&upsilon;\":\"υ\",\"&upuparrows;\":\"⇈\",\"&urcorn;\":\"⌝\",\"&urcorner;\":\"⌝\",\"&urcrop;\":\"⌎\",\"&uring;\":\"ů\",\"&urtri;\":\"◹\",\"&uscr;\":\"𝓊\",\"&utdot;\":\"⋰\",\"&utilde;\":\"ũ\",\"&utri;\":\"▵\",\"&utrif;\":\"▴\",\"&uuarr;\":\"⇈\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&uwangle;\":\"⦧\",\"&vArr;\":\"⇕\",\"&vBar;\":\"⫨\",\"&vBarv;\":\"⫩\",\"&vDash;\":\"⊨\",\"&vangrt;\":\"⦜\",\"&varepsilon;\":\"ϵ\",\"&varkappa;\":\"ϰ\",\"&varnothing;\":\"∅\",\"&varphi;\":\"ϕ\",\"&varpi;\":\"ϖ\",\"&varpropto;\":\"∝\",\"&varr;\":\"↕\",\"&varrho;\":\"ϱ\",\"&varsigma;\":\"ς\",\"&varsubsetneq;\":\"⊊︀\",\"&varsubsetneqq;\":\"⫋︀\",\"&varsupsetneq;\":\"⊋︀\",\"&varsupsetneqq;\":\"⫌︀\",\"&vartheta;\":\"ϑ\",\"&vartriangleleft;\":\"⊲\",\"&vartriangleright;\":\"⊳\",\"&vcy;\":\"в\",\"&vdash;\":\"⊢\",\"&vee;\":\"∨\",\"&veebar;\":\"⊻\",\"&veeeq;\":\"≚\",\"&vellip;\":\"⋮\",\"&verbar;\":\"|\",\"&vert;\":\"|\",\"&vfr;\":\"𝔳\",\"&vltri;\":\"⊲\",\"&vnsub;\":\"⊂⃒\",\"&vnsup;\":\"⊃⃒\",\"&vopf;\":\"𝕧\",\"&vprop;\":\"∝\",\"&vrtri;\":\"⊳\",\"&vscr;\":\"𝓋\",\"&vsubnE;\":\"⫋︀\",\"&vsubne;\":\"⊊︀\",\"&vsupnE;\":\"⫌︀\",\"&vsupne;\":\"⊋︀\",\"&vzigzag;\":\"⦚\",\"&wcirc;\":\"ŵ\",\"&wedbar;\":\"⩟\",\"&wedge;\":\"∧\",\"&wedgeq;\":\"≙\",\"&weierp;\":\"℘\",\"&wfr;\":\"𝔴\",\"&wopf;\":\"𝕨\",\"&wp;\":\"℘\",\"&wr;\":\"≀\",\"&wreath;\":\"≀\",\"&wscr;\":\"𝓌\",\"&xcap;\":\"⋂\",\"&xcirc;\":\"◯\",\"&xcup;\":\"⋃\",\"&xdtri;\":\"▽\",\"&xfr;\":\"𝔵\",\"&xhArr;\":\"⟺\",\"&xharr;\":\"⟷\",\"&xi;\":\"ξ\",\"&xlArr;\":\"⟸\",\"&xlarr;\":\"⟵\",\"&xmap;\":\"⟼\",\"&xnis;\":\"⋻\",\"&xodot;\":\"⨀\",\"&xopf;\":\"𝕩\",\"&xoplus;\":\"⨁\",\"&xotime;\":\"⨂\",\"&xrArr;\":\"⟹\",\"&xrarr;\":\"⟶\",\"&xscr;\":\"𝓍\",\"&xsqcup;\":\"⨆\",\"&xuplus;\":\"⨄\",\"&xutri;\":\"△\",\"&xvee;\":\"⋁\",\"&xwedge;\":\"⋀\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&yacy;\":\"я\",\"&ycirc;\":\"ŷ\",\"&ycy;\":\"ы\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&yfr;\":\"𝔶\",\"&yicy;\":\"ї\",\"&yopf;\":\"𝕪\",\"&yscr;\":\"𝓎\",\"&yucy;\":\"ю\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&zacute;\":\"ź\",\"&zcaron;\":\"ž\",\"&zcy;\":\"з\",\"&zdot;\":\"ż\",\"&zeetrf;\":\"ℨ\",\"&zeta;\":\"ζ\",\"&zfr;\":\"𝔷\",\"&zhcy;\":\"ж\",\"&zigrarr;\":\"⇝\",\"&zopf;\":\"𝕫\",\"&zscr;\":\"𝓏\",\"&zwj;\":\"‍\",\"&zwnj;\":\"‌\"},characters:{\"Æ\":\"&AElig;\",\"&\":\"&amp;\",\"Á\":\"&Aacute;\",\"Ă\":\"&Abreve;\",\"Â\":\"&Acirc;\",\"А\":\"&Acy;\",\"𝔄\":\"&Afr;\",\"À\":\"&Agrave;\",\"Α\":\"&Alpha;\",\"Ā\":\"&Amacr;\",\"⩓\":\"&And;\",\"Ą\":\"&Aogon;\",\"𝔸\":\"&Aopf;\",\"⁡\":\"&af;\",\"Å\":\"&angst;\",\"𝒜\":\"&Ascr;\",\"≔\":\"&coloneq;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"∖\":\"&ssetmn;\",\"⫧\":\"&Barv;\",\"⌆\":\"&doublebarwedge;\",\"Б\":\"&Bcy;\",\"∵\":\"&because;\",\"ℬ\":\"&bernou;\",\"Β\":\"&Beta;\",\"𝔅\":\"&Bfr;\",\"𝔹\":\"&Bopf;\",\"˘\":\"&breve;\",\"≎\":\"&bump;\",\"Ч\":\"&CHcy;\",\"©\":\"&copy;\",\"Ć\":\"&Cacute;\",\"⋒\":\"&Cap;\",\"ⅅ\":\"&DD;\",\"ℭ\":\"&Cfr;\",\"Č\":\"&Ccaron;\",\"Ç\":\"&Ccedil;\",\"Ĉ\":\"&Ccirc;\",\"∰\":\"&Cconint;\",\"Ċ\":\"&Cdot;\",\"¸\":\"&cedil;\",\"·\":\"&middot;\",\"Χ\":\"&Chi;\",\"⊙\":\"&odot;\",\"⊖\":\"&ominus;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"∲\":\"&cwconint;\",\"”\":\"&rdquor;\",\"’\":\"&rsquor;\",\"∷\":\"&Proportion;\",\"⩴\":\"&Colone;\",\"≡\":\"&equiv;\",\"∯\":\"&DoubleContourIntegral;\",\"∮\":\"&oint;\",\"ℂ\":\"&complexes;\",\"∐\":\"&coprod;\",\"∳\":\"&awconint;\",\"⨯\":\"&Cross;\",\"𝒞\":\"&Cscr;\",\"⋓\":\"&Cup;\",\"≍\":\"&asympeq;\",\"⤑\":\"&DDotrahd;\",\"Ђ\":\"&DJcy;\",\"Ѕ\":\"&DScy;\",\"Џ\":\"&DZcy;\",\"‡\":\"&ddagger;\",\"↡\":\"&Darr;\",\"⫤\":\"&DoubleLeftTee;\",\"Ď\":\"&Dcaron;\",\"Д\":\"&Dcy;\",\"∇\":\"&nabla;\",\"Δ\":\"&Delta;\",\"𝔇\":\"&Dfr;\",\"´\":\"&acute;\",\"˙\":\"&dot;\",\"˝\":\"&dblac;\",\"`\":\"&grave;\",\"˜\":\"&tilde;\",\"⋄\":\"&diamond;\",\"ⅆ\":\"&dd;\",\"𝔻\":\"&Dopf;\",\"¨\":\"&uml;\",\"⃜\":\"&DotDot;\",\"≐\":\"&esdot;\",\"⇓\":\"&dArr;\",\"⇐\":\"&lArr;\",\"⇔\":\"&iff;\",\"⟸\":\"&xlArr;\",\"⟺\":\"&xhArr;\",\"⟹\":\"&xrArr;\",\"⇒\":\"&rArr;\",\"⊨\":\"&vDash;\",\"⇑\":\"&uArr;\",\"⇕\":\"&vArr;\",\"∥\":\"&spar;\",\"↓\":\"&downarrow;\",\"⤓\":\"&DownArrowBar;\",\"⇵\":\"&duarr;\",\"̑\":\"&DownBreve;\",\"⥐\":\"&DownLeftRightVector;\",\"⥞\":\"&DownLeftTeeVector;\",\"↽\":\"&lhard;\",\"⥖\":\"&DownLeftVectorBar;\",\"⥟\":\"&DownRightTeeVector;\",\"⇁\":\"&rightharpoondown;\",\"⥗\":\"&DownRightVectorBar;\",\"⊤\":\"&top;\",\"↧\":\"&mapstodown;\",\"𝒟\":\"&Dscr;\",\"Đ\":\"&Dstrok;\",\"Ŋ\":\"&ENG;\",\"Ð\":\"&ETH;\",\"É\":\"&Eacute;\",\"Ě\":\"&Ecaron;\",\"Ê\":\"&Ecirc;\",\"Э\":\"&Ecy;\",\"Ė\":\"&Edot;\",\"𝔈\":\"&Efr;\",\"È\":\"&Egrave;\",\"∈\":\"&isinv;\",\"Ē\":\"&Emacr;\",\"◻\":\"&EmptySmallSquare;\",\"▫\":\"&EmptyVerySmallSquare;\",\"Ę\":\"&Eogon;\",\"𝔼\":\"&Eopf;\",\"Ε\":\"&Epsilon;\",\"⩵\":\"&Equal;\",\"≂\":\"&esim;\",\"⇌\":\"&rlhar;\",\"ℰ\":\"&expectation;\",\"⩳\":\"&Esim;\",\"Η\":\"&Eta;\",\"Ë\":\"&Euml;\",\"∃\":\"&exist;\",\"ⅇ\":\"&exponentiale;\",\"Ф\":\"&Fcy;\",\"𝔉\":\"&Ffr;\",\"◼\":\"&FilledSmallSquare;\",\"▪\":\"&squf;\",\"𝔽\":\"&Fopf;\",\"∀\":\"&forall;\",\"ℱ\":\"&Fscr;\",\"Ѓ\":\"&GJcy;\",\">\":\"&gt;\",\"Γ\":\"&Gamma;\",\"Ϝ\":\"&Gammad;\",\"Ğ\":\"&Gbreve;\",\"Ģ\":\"&Gcedil;\",\"Ĝ\":\"&Gcirc;\",\"Г\":\"&Gcy;\",\"Ġ\":\"&Gdot;\",\"𝔊\":\"&Gfr;\",\"⋙\":\"&ggg;\",\"𝔾\":\"&Gopf;\",\"≥\":\"&geq;\",\"⋛\":\"&gtreqless;\",\"≧\":\"&geqq;\",\"⪢\":\"&GreaterGreater;\",\"≷\":\"&gtrless;\",\"⩾\":\"&ges;\",\"≳\":\"&gtrsim;\",\"𝒢\":\"&Gscr;\",\"≫\":\"&gg;\",\"Ъ\":\"&HARDcy;\",\"ˇ\":\"&caron;\",\"^\":\"&Hat;\",\"Ĥ\":\"&Hcirc;\",\"ℌ\":\"&Poincareplane;\",\"ℋ\":\"&hamilt;\",\"ℍ\":\"&quaternions;\",\"─\":\"&boxh;\",\"Ħ\":\"&Hstrok;\",\"≏\":\"&bumpeq;\",\"Е\":\"&IEcy;\",\"Ĳ\":\"&IJlig;\",\"Ё\":\"&IOcy;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"И\":\"&Icy;\",\"İ\":\"&Idot;\",\"ℑ\":\"&imagpart;\",\"Ì\":\"&Igrave;\",\"Ī\":\"&Imacr;\",\"ⅈ\":\"&ii;\",\"∬\":\"&Int;\",\"∫\":\"&int;\",\"⋂\":\"&xcap;\",\"⁣\":\"&ic;\",\"⁢\":\"&it;\",\"Į\":\"&Iogon;\",\"𝕀\":\"&Iopf;\",\"Ι\":\"&Iota;\",\"ℐ\":\"&imagline;\",\"Ĩ\":\"&Itilde;\",\"І\":\"&Iukcy;\",\"Ï\":\"&Iuml;\",\"Ĵ\":\"&Jcirc;\",\"Й\":\"&Jcy;\",\"𝔍\":\"&Jfr;\",\"𝕁\":\"&Jopf;\",\"𝒥\":\"&Jscr;\",\"Ј\":\"&Jsercy;\",\"Є\":\"&Jukcy;\",\"Х\":\"&KHcy;\",\"Ќ\":\"&KJcy;\",\"Κ\":\"&Kappa;\",\"Ķ\":\"&Kcedil;\",\"К\":\"&Kcy;\",\"𝔎\":\"&Kfr;\",\"𝕂\":\"&Kopf;\",\"𝒦\":\"&Kscr;\",\"Љ\":\"&LJcy;\",\"<\":\"&lt;\",\"Ĺ\":\"&Lacute;\",\"Λ\":\"&Lambda;\",\"⟪\":\"&Lang;\",\"ℒ\":\"&lagran;\",\"↞\":\"&twoheadleftarrow;\",\"Ľ\":\"&Lcaron;\",\"Ļ\":\"&Lcedil;\",\"Л\":\"&Lcy;\",\"⟨\":\"&langle;\",\"←\":\"&slarr;\",\"⇤\":\"&larrb;\",\"⇆\":\"&lrarr;\",\"⌈\":\"&lceil;\",\"⟦\":\"&lobrk;\",\"⥡\":\"&LeftDownTeeVector;\",\"⇃\":\"&downharpoonleft;\",\"⥙\":\"&LeftDownVectorBar;\",\"⌊\":\"&lfloor;\",\"↔\":\"&leftrightarrow;\",\"⥎\":\"&LeftRightVector;\",\"⊣\":\"&dashv;\",\"↤\":\"&mapstoleft;\",\"⥚\":\"&LeftTeeVector;\",\"⊲\":\"&vltri;\",\"⧏\":\"&LeftTriangleBar;\",\"⊴\":\"&trianglelefteq;\",\"⥑\":\"&LeftUpDownVector;\",\"⥠\":\"&LeftUpTeeVector;\",\"↿\":\"&upharpoonleft;\",\"⥘\":\"&LeftUpVectorBar;\",\"↼\":\"&lharu;\",\"⥒\":\"&LeftVectorBar;\",\"⋚\":\"&lesseqgtr;\",\"≦\":\"&leqq;\",\"≶\":\"&lg;\",\"⪡\":\"&LessLess;\",\"⩽\":\"&les;\",\"≲\":\"&lsim;\",\"𝔏\":\"&Lfr;\",\"⋘\":\"&Ll;\",\"⇚\":\"&lAarr;\",\"Ŀ\":\"&Lmidot;\",\"⟵\":\"&xlarr;\",\"⟷\":\"&xharr;\",\"⟶\":\"&xrarr;\",\"𝕃\":\"&Lopf;\",\"↙\":\"&swarrow;\",\"↘\":\"&searrow;\",\"↰\":\"&lsh;\",\"Ł\":\"&Lstrok;\",\"≪\":\"&ll;\",\"⤅\":\"&Map;\",\"М\":\"&Mcy;\",\" \":\"&MediumSpace;\",\"ℳ\":\"&phmmat;\",\"𝔐\":\"&Mfr;\",\"∓\":\"&mp;\",\"𝕄\":\"&Mopf;\",\"Μ\":\"&Mu;\",\"Њ\":\"&NJcy;\",\"Ń\":\"&Nacute;\",\"Ň\":\"&Ncaron;\",\"Ņ\":\"&Ncedil;\",\"Н\":\"&Ncy;\",\"​\":\"&ZeroWidthSpace;\",\"\\n\":\"&NewLine;\",\"𝔑\":\"&Nfr;\",\"⁠\":\"&NoBreak;\",\" \":\"&nbsp;\",\"ℕ\":\"&naturals;\",\"⫬\":\"&Not;\",\"≢\":\"&nequiv;\",\"≭\":\"&NotCupCap;\",\"∦\":\"&nspar;\",\"∉\":\"&notinva;\",\"≠\":\"&ne;\",\"≂̸\":\"&nesim;\",\"∄\":\"&nexists;\",\"≯\":\"&ngtr;\",\"≱\":\"&ngeq;\",\"≧̸\":\"&ngeqq;\",\"≫̸\":\"&nGtv;\",\"≹\":\"&ntgl;\",\"⩾̸\":\"&nges;\",\"≵\":\"&ngsim;\",\"≎̸\":\"&nbump;\",\"≏̸\":\"&nbumpe;\",\"⋪\":\"&ntriangleleft;\",\"⧏̸\":\"&NotLeftTriangleBar;\",\"⋬\":\"&ntrianglelefteq;\",\"≮\":\"&nlt;\",\"≰\":\"&nleq;\",\"≸\":\"&ntlg;\",\"≪̸\":\"&nLtv;\",\"⩽̸\":\"&nles;\",\"≴\":\"&nlsim;\",\"⪢̸\":\"&NotNestedGreaterGreater;\",\"⪡̸\":\"&NotNestedLessLess;\",\"⊀\":\"&nprec;\",\"⪯̸\":\"&npreceq;\",\"⋠\":\"&nprcue;\",\"∌\":\"&notniva;\",\"⋫\":\"&ntriangleright;\",\"⧐̸\":\"&NotRightTriangleBar;\",\"⋭\":\"&ntrianglerighteq;\",\"⊏̸\":\"&NotSquareSubset;\",\"⋢\":\"&nsqsube;\",\"⊐̸\":\"&NotSquareSuperset;\",\"⋣\":\"&nsqsupe;\",\"⊂⃒\":\"&vnsub;\",\"⊈\":\"&nsubseteq;\",\"⊁\":\"&nsucc;\",\"⪰̸\":\"&nsucceq;\",\"⋡\":\"&nsccue;\",\"≿̸\":\"&NotSucceedsTilde;\",\"⊃⃒\":\"&vnsup;\",\"⊉\":\"&nsupseteq;\",\"≁\":\"&nsim;\",\"≄\":\"&nsimeq;\",\"≇\":\"&ncong;\",\"≉\":\"&napprox;\",\"∤\":\"&nsmid;\",\"𝒩\":\"&Nscr;\",\"Ñ\":\"&Ntilde;\",\"Ν\":\"&Nu;\",\"Œ\":\"&OElig;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"О\":\"&Ocy;\",\"Ő\":\"&Odblac;\",\"𝔒\":\"&Ofr;\",\"Ò\":\"&Ograve;\",\"Ō\":\"&Omacr;\",\"Ω\":\"&ohm;\",\"Ο\":\"&Omicron;\",\"𝕆\":\"&Oopf;\",\"“\":\"&ldquo;\",\"‘\":\"&lsquo;\",\"⩔\":\"&Or;\",\"𝒪\":\"&Oscr;\",\"Ø\":\"&Oslash;\",\"Õ\":\"&Otilde;\",\"⨷\":\"&Otimes;\",\"Ö\":\"&Ouml;\",\"‾\":\"&oline;\",\"⏞\":\"&OverBrace;\",\"⎴\":\"&tbrk;\",\"⏜\":\"&OverParenthesis;\",\"∂\":\"&part;\",\"П\":\"&Pcy;\",\"𝔓\":\"&Pfr;\",\"Φ\":\"&Phi;\",\"Π\":\"&Pi;\",\"±\":\"&pm;\",\"ℙ\":\"&primes;\",\"⪻\":\"&Pr;\",\"≺\":\"&prec;\",\"⪯\":\"&preceq;\",\"≼\":\"&preccurlyeq;\",\"≾\":\"&prsim;\",\"″\":\"&Prime;\",\"∏\":\"&prod;\",\"∝\":\"&vprop;\",\"𝒫\":\"&Pscr;\",\"Ψ\":\"&Psi;\",'\"':\"&quot;\",\"𝔔\":\"&Qfr;\",\"ℚ\":\"&rationals;\",\"𝒬\":\"&Qscr;\",\"⤐\":\"&drbkarow;\",\"®\":\"&reg;\",\"Ŕ\":\"&Racute;\",\"⟫\":\"&Rang;\",\"↠\":\"&twoheadrightarrow;\",\"⤖\":\"&Rarrtl;\",\"Ř\":\"&Rcaron;\",\"Ŗ\":\"&Rcedil;\",\"Р\":\"&Rcy;\",\"ℜ\":\"&realpart;\",\"∋\":\"&niv;\",\"⇋\":\"&lrhar;\",\"⥯\":\"&duhar;\",\"Ρ\":\"&Rho;\",\"⟩\":\"&rangle;\",\"→\":\"&srarr;\",\"⇥\":\"&rarrb;\",\"⇄\":\"&rlarr;\",\"⌉\":\"&rceil;\",\"⟧\":\"&robrk;\",\"⥝\":\"&RightDownTeeVector;\",\"⇂\":\"&downharpoonright;\",\"⥕\":\"&RightDownVectorBar;\",\"⌋\":\"&rfloor;\",\"⊢\":\"&vdash;\",\"↦\":\"&mapsto;\",\"⥛\":\"&RightTeeVector;\",\"⊳\":\"&vrtri;\",\"⧐\":\"&RightTriangleBar;\",\"⊵\":\"&trianglerighteq;\",\"⥏\":\"&RightUpDownVector;\",\"⥜\":\"&RightUpTeeVector;\",\"↾\":\"&upharpoonright;\",\"⥔\":\"&RightUpVectorBar;\",\"⇀\":\"&rightharpoonup;\",\"⥓\":\"&RightVectorBar;\",\"ℝ\":\"&reals;\",\"⥰\":\"&RoundImplies;\",\"⇛\":\"&rAarr;\",\"ℛ\":\"&realine;\",\"↱\":\"&rsh;\",\"⧴\":\"&RuleDelayed;\",\"Щ\":\"&SHCHcy;\",\"Ш\":\"&SHcy;\",\"Ь\":\"&SOFTcy;\",\"Ś\":\"&Sacute;\",\"⪼\":\"&Sc;\",\"Š\":\"&Scaron;\",\"Ş\":\"&Scedil;\",\"Ŝ\":\"&Scirc;\",\"С\":\"&Scy;\",\"𝔖\":\"&Sfr;\",\"↑\":\"&uparrow;\",\"Σ\":\"&Sigma;\",\"∘\":\"&compfn;\",\"𝕊\":\"&Sopf;\",\"√\":\"&radic;\",\"□\":\"&square;\",\"⊓\":\"&sqcap;\",\"⊏\":\"&sqsubset;\",\"⊑\":\"&sqsubseteq;\",\"⊐\":\"&sqsupset;\",\"⊒\":\"&sqsupseteq;\",\"⊔\":\"&sqcup;\",\"𝒮\":\"&Sscr;\",\"⋆\":\"&sstarf;\",\"⋐\":\"&Subset;\",\"⊆\":\"&subseteq;\",\"≻\":\"&succ;\",\"⪰\":\"&succeq;\",\"≽\":\"&succcurlyeq;\",\"≿\":\"&succsim;\",\"∑\":\"&sum;\",\"⋑\":\"&Supset;\",\"⊃\":\"&supset;\",\"⊇\":\"&supseteq;\",\"Þ\":\"&THORN;\",\"™\":\"&trade;\",\"Ћ\":\"&TSHcy;\",\"Ц\":\"&TScy;\",\"\\t\":\"&Tab;\",\"Τ\":\"&Tau;\",\"Ť\":\"&Tcaron;\",\"Ţ\":\"&Tcedil;\",\"Т\":\"&Tcy;\",\"𝔗\":\"&Tfr;\",\"∴\":\"&therefore;\",\"Θ\":\"&Theta;\",\"  \":\"&ThickSpace;\",\" \":\"&thinsp;\",\"∼\":\"&thksim;\",\"≃\":\"&simeq;\",\"≅\":\"&cong;\",\"≈\":\"&thkap;\",\"𝕋\":\"&Topf;\",\"⃛\":\"&tdot;\",\"𝒯\":\"&Tscr;\",\"Ŧ\":\"&Tstrok;\",\"Ú\":\"&Uacute;\",\"↟\":\"&Uarr;\",\"⥉\":\"&Uarrocir;\",\"Ў\":\"&Ubrcy;\",\"Ŭ\":\"&Ubreve;\",\"Û\":\"&Ucirc;\",\"У\":\"&Ucy;\",\"Ű\":\"&Udblac;\",\"𝔘\":\"&Ufr;\",\"Ù\":\"&Ugrave;\",\"Ū\":\"&Umacr;\",_:\"&lowbar;\",\"⏟\":\"&UnderBrace;\",\"⎵\":\"&bbrk;\",\"⏝\":\"&UnderParenthesis;\",\"⋃\":\"&xcup;\",\"⊎\":\"&uplus;\",\"Ų\":\"&Uogon;\",\"𝕌\":\"&Uopf;\",\"⤒\":\"&UpArrowBar;\",\"⇅\":\"&udarr;\",\"↕\":\"&varr;\",\"⥮\":\"&udhar;\",\"⊥\":\"&perp;\",\"↥\":\"&mapstoup;\",\"↖\":\"&nwarrow;\",\"↗\":\"&nearrow;\",\"ϒ\":\"&upsih;\",\"Υ\":\"&Upsilon;\",\"Ů\":\"&Uring;\",\"𝒰\":\"&Uscr;\",\"Ũ\":\"&Utilde;\",\"Ü\":\"&Uuml;\",\"⊫\":\"&VDash;\",\"⫫\":\"&Vbar;\",\"В\":\"&Vcy;\",\"⊩\":\"&Vdash;\",\"⫦\":\"&Vdashl;\",\"⋁\":\"&xvee;\",\"‖\":\"&Vert;\",\"∣\":\"&smid;\",\"|\":\"&vert;\",\"❘\":\"&VerticalSeparator;\",\"≀\":\"&wreath;\",\" \":\"&hairsp;\",\"𝔙\":\"&Vfr;\",\"𝕍\":\"&Vopf;\",\"𝒱\":\"&Vscr;\",\"⊪\":\"&Vvdash;\",\"Ŵ\":\"&Wcirc;\",\"⋀\":\"&xwedge;\",\"𝔚\":\"&Wfr;\",\"𝕎\":\"&Wopf;\",\"𝒲\":\"&Wscr;\",\"𝔛\":\"&Xfr;\",\"Ξ\":\"&Xi;\",\"𝕏\":\"&Xopf;\",\"𝒳\":\"&Xscr;\",\"Я\":\"&YAcy;\",\"Ї\":\"&YIcy;\",\"Ю\":\"&YUcy;\",\"Ý\":\"&Yacute;\",\"Ŷ\":\"&Ycirc;\",\"Ы\":\"&Ycy;\",\"𝔜\":\"&Yfr;\",\"𝕐\":\"&Yopf;\",\"𝒴\":\"&Yscr;\",\"Ÿ\":\"&Yuml;\",\"Ж\":\"&ZHcy;\",\"Ź\":\"&Zacute;\",\"Ž\":\"&Zcaron;\",\"З\":\"&Zcy;\",\"Ż\":\"&Zdot;\",\"Ζ\":\"&Zeta;\",\"ℨ\":\"&zeetrf;\",\"ℤ\":\"&integers;\",\"𝒵\":\"&Zscr;\",\"á\":\"&aacute;\",\"ă\":\"&abreve;\",\"∾\":\"&mstpos;\",\"∾̳\":\"&acE;\",\"∿\":\"&acd;\",\"â\":\"&acirc;\",\"а\":\"&acy;\",\"æ\":\"&aelig;\",\"𝔞\":\"&afr;\",\"à\":\"&agrave;\",\"ℵ\":\"&aleph;\",\"α\":\"&alpha;\",\"ā\":\"&amacr;\",\"⨿\":\"&amalg;\",\"∧\":\"&wedge;\",\"⩕\":\"&andand;\",\"⩜\":\"&andd;\",\"⩘\":\"&andslope;\",\"⩚\":\"&andv;\",\"∠\":\"&angle;\",\"⦤\":\"&ange;\",\"∡\":\"&measuredangle;\",\"⦨\":\"&angmsdaa;\",\"⦩\":\"&angmsdab;\",\"⦪\":\"&angmsdac;\",\"⦫\":\"&angmsdad;\",\"⦬\":\"&angmsdae;\",\"⦭\":\"&angmsdaf;\",\"⦮\":\"&angmsdag;\",\"⦯\":\"&angmsdah;\",\"∟\":\"&angrt;\",\"⊾\":\"&angrtvb;\",\"⦝\":\"&angrtvbd;\",\"∢\":\"&angsph;\",\"⍼\":\"&angzarr;\",\"ą\":\"&aogon;\",\"𝕒\":\"&aopf;\",\"⩰\":\"&apE;\",\"⩯\":\"&apacir;\",\"≊\":\"&approxeq;\",\"≋\":\"&apid;\",\"'\":\"&apos;\",\"å\":\"&aring;\",\"𝒶\":\"&ascr;\",\"*\":\"&midast;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"⨑\":\"&awint;\",\"⫭\":\"&bNot;\",\"≌\":\"&bcong;\",\"϶\":\"&bepsi;\",\"‵\":\"&bprime;\",\"∽\":\"&bsim;\",\"⋍\":\"&bsime;\",\"⊽\":\"&barvee;\",\"⌅\":\"&barwedge;\",\"⎶\":\"&bbrktbrk;\",\"б\":\"&bcy;\",\"„\":\"&ldquor;\",\"⦰\":\"&bemptyv;\",\"β\":\"&beta;\",\"ℶ\":\"&beth;\",\"≬\":\"&twixt;\",\"𝔟\":\"&bfr;\",\"◯\":\"&xcirc;\",\"⨀\":\"&xodot;\",\"⨁\":\"&xoplus;\",\"⨂\":\"&xotime;\",\"⨆\":\"&xsqcup;\",\"★\":\"&starf;\",\"▽\":\"&xdtri;\",\"△\":\"&xutri;\",\"⨄\":\"&xuplus;\",\"⤍\":\"&rbarr;\",\"⧫\":\"&lozf;\",\"▴\":\"&utrif;\",\"▾\":\"&dtrif;\",\"◂\":\"&ltrif;\",\"▸\":\"&rtrif;\",\"␣\":\"&blank;\",\"▒\":\"&blk12;\",\"░\":\"&blk14;\",\"▓\":\"&blk34;\",\"█\":\"&block;\",\"=⃥\":\"&bne;\",\"≡⃥\":\"&bnequiv;\",\"⌐\":\"&bnot;\",\"𝕓\":\"&bopf;\",\"⋈\":\"&bowtie;\",\"╗\":\"&boxDL;\",\"╔\":\"&boxDR;\",\"╖\":\"&boxDl;\",\"╓\":\"&boxDr;\",\"═\":\"&boxH;\",\"╦\":\"&boxHD;\",\"╩\":\"&boxHU;\",\"╤\":\"&boxHd;\",\"╧\":\"&boxHu;\",\"╝\":\"&boxUL;\",\"╚\":\"&boxUR;\",\"╜\":\"&boxUl;\",\"╙\":\"&boxUr;\",\"║\":\"&boxV;\",\"╬\":\"&boxVH;\",\"╣\":\"&boxVL;\",\"╠\":\"&boxVR;\",\"╫\":\"&boxVh;\",\"╢\":\"&boxVl;\",\"╟\":\"&boxVr;\",\"⧉\":\"&boxbox;\",\"╕\":\"&boxdL;\",\"╒\":\"&boxdR;\",\"┐\":\"&boxdl;\",\"┌\":\"&boxdr;\",\"╥\":\"&boxhD;\",\"╨\":\"&boxhU;\",\"┬\":\"&boxhd;\",\"┴\":\"&boxhu;\",\"⊟\":\"&minusb;\",\"⊞\":\"&plusb;\",\"⊠\":\"&timesb;\",\"╛\":\"&boxuL;\",\"╘\":\"&boxuR;\",\"┘\":\"&boxul;\",\"└\":\"&boxur;\",\"│\":\"&boxv;\",\"╪\":\"&boxvH;\",\"╡\":\"&boxvL;\",\"╞\":\"&boxvR;\",\"┼\":\"&boxvh;\",\"┤\":\"&boxvl;\",\"├\":\"&boxvr;\",\"¦\":\"&brvbar;\",\"𝒷\":\"&bscr;\",\"⁏\":\"&bsemi;\",\"\\\\\":\"&bsol;\",\"⧅\":\"&bsolb;\",\"⟈\":\"&bsolhsub;\",\"•\":\"&bullet;\",\"⪮\":\"&bumpE;\",\"ć\":\"&cacute;\",\"∩\":\"&cap;\",\"⩄\":\"&capand;\",\"⩉\":\"&capbrcup;\",\"⩋\":\"&capcap;\",\"⩇\":\"&capcup;\",\"⩀\":\"&capdot;\",\"∩︀\":\"&caps;\",\"⁁\":\"&caret;\",\"⩍\":\"&ccaps;\",\"č\":\"&ccaron;\",\"ç\":\"&ccedil;\",\"ĉ\":\"&ccirc;\",\"⩌\":\"&ccups;\",\"⩐\":\"&ccupssm;\",\"ċ\":\"&cdot;\",\"⦲\":\"&cemptyv;\",\"¢\":\"&cent;\",\"𝔠\":\"&cfr;\",\"ч\":\"&chcy;\",\"✓\":\"&checkmark;\",\"χ\":\"&chi;\",\"○\":\"&cir;\",\"⧃\":\"&cirE;\",\"ˆ\":\"&circ;\",\"≗\":\"&cire;\",\"↺\":\"&olarr;\",\"↻\":\"&orarr;\",\"Ⓢ\":\"&oS;\",\"⊛\":\"&oast;\",\"⊚\":\"&ocir;\",\"⊝\":\"&odash;\",\"⨐\":\"&cirfnint;\",\"⫯\":\"&cirmid;\",\"⧂\":\"&cirscir;\",\"♣\":\"&clubsuit;\",\":\":\"&colon;\",\",\":\"&comma;\",\"@\":\"&commat;\",\"∁\":\"&complement;\",\"⩭\":\"&congdot;\",\"𝕔\":\"&copf;\",\"℗\":\"&copysr;\",\"↵\":\"&crarr;\",\"✗\":\"&cross;\",\"𝒸\":\"&cscr;\",\"⫏\":\"&csub;\",\"⫑\":\"&csube;\",\"⫐\":\"&csup;\",\"⫒\":\"&csupe;\",\"⋯\":\"&ctdot;\",\"⤸\":\"&cudarrl;\",\"⤵\":\"&cudarrr;\",\"⋞\":\"&curlyeqprec;\",\"⋟\":\"&curlyeqsucc;\",\"↶\":\"&curvearrowleft;\",\"⤽\":\"&cularrp;\",\"∪\":\"&cup;\",\"⩈\":\"&cupbrcap;\",\"⩆\":\"&cupcap;\",\"⩊\":\"&cupcup;\",\"⊍\":\"&cupdot;\",\"⩅\":\"&cupor;\",\"∪︀\":\"&cups;\",\"↷\":\"&curvearrowright;\",\"⤼\":\"&curarrm;\",\"⋎\":\"&cuvee;\",\"⋏\":\"&cuwed;\",\"¤\":\"&curren;\",\"∱\":\"&cwint;\",\"⌭\":\"&cylcty;\",\"⥥\":\"&dHar;\",\"†\":\"&dagger;\",\"ℸ\":\"&daleth;\",\"‐\":\"&hyphen;\",\"⤏\":\"&rBarr;\",\"ď\":\"&dcaron;\",\"д\":\"&dcy;\",\"⇊\":\"&downdownarrows;\",\"⩷\":\"&eDDot;\",\"°\":\"&deg;\",\"δ\":\"&delta;\",\"⦱\":\"&demptyv;\",\"⥿\":\"&dfisht;\",\"𝔡\":\"&dfr;\",\"♦\":\"&diams;\",\"ϝ\":\"&gammad;\",\"⋲\":\"&disin;\",\"÷\":\"&divide;\",\"⋇\":\"&divonx;\",\"ђ\":\"&djcy;\",\"⌞\":\"&llcorner;\",\"⌍\":\"&dlcrop;\",$:\"&dollar;\",\"𝕕\":\"&dopf;\",\"≑\":\"&eDot;\",\"∸\":\"&minusd;\",\"∔\":\"&plusdo;\",\"⊡\":\"&sdotb;\",\"⌟\":\"&lrcorner;\",\"⌌\":\"&drcrop;\",\"𝒹\":\"&dscr;\",\"ѕ\":\"&dscy;\",\"⧶\":\"&dsol;\",\"đ\":\"&dstrok;\",\"⋱\":\"&dtdot;\",\"▿\":\"&triangledown;\",\"⦦\":\"&dwangle;\",\"џ\":\"&dzcy;\",\"⟿\":\"&dzigrarr;\",\"é\":\"&eacute;\",\"⩮\":\"&easter;\",\"ě\":\"&ecaron;\",\"≖\":\"&eqcirc;\",\"ê\":\"&ecirc;\",\"≕\":\"&eqcolon;\",\"э\":\"&ecy;\",\"ė\":\"&edot;\",\"≒\":\"&fallingdotseq;\",\"𝔢\":\"&efr;\",\"⪚\":\"&eg;\",\"è\":\"&egrave;\",\"⪖\":\"&eqslantgtr;\",\"⪘\":\"&egsdot;\",\"⪙\":\"&el;\",\"⏧\":\"&elinters;\",\"ℓ\":\"&ell;\",\"⪕\":\"&eqslantless;\",\"⪗\":\"&elsdot;\",\"ē\":\"&emacr;\",\"∅\":\"&varnothing;\",\" \":\"&emsp13;\",\" \":\"&emsp14;\",\" \":\"&emsp;\",\"ŋ\":\"&eng;\",\" \":\"&ensp;\",\"ę\":\"&eogon;\",\"𝕖\":\"&eopf;\",\"⋕\":\"&epar;\",\"⧣\":\"&eparsl;\",\"⩱\":\"&eplus;\",\"ε\":\"&epsilon;\",\"ϵ\":\"&varepsilon;\",\"=\":\"&equals;\",\"≟\":\"&questeq;\",\"⩸\":\"&equivDD;\",\"⧥\":\"&eqvparsl;\",\"≓\":\"&risingdotseq;\",\"⥱\":\"&erarr;\",\"ℯ\":\"&escr;\",\"η\":\"&eta;\",\"ð\":\"&eth;\",\"ë\":\"&euml;\",\"€\":\"&euro;\",\"!\":\"&excl;\",\"ф\":\"&fcy;\",\"♀\":\"&female;\",\"ﬃ\":\"&ffilig;\",\"ﬀ\":\"&fflig;\",\"ﬄ\":\"&ffllig;\",\"𝔣\":\"&ffr;\",\"ﬁ\":\"&filig;\",fj:\"&fjlig;\",\"♭\":\"&flat;\",\"ﬂ\":\"&fllig;\",\"▱\":\"&fltns;\",\"ƒ\":\"&fnof;\",\"𝕗\":\"&fopf;\",\"⋔\":\"&pitchfork;\",\"⫙\":\"&forkv;\",\"⨍\":\"&fpartint;\",\"½\":\"&half;\",\"⅓\":\"&frac13;\",\"¼\":\"&frac14;\",\"⅕\":\"&frac15;\",\"⅙\":\"&frac16;\",\"⅛\":\"&frac18;\",\"⅔\":\"&frac23;\",\"⅖\":\"&frac25;\",\"¾\":\"&frac34;\",\"⅗\":\"&frac35;\",\"⅜\":\"&frac38;\",\"⅘\":\"&frac45;\",\"⅚\":\"&frac56;\",\"⅝\":\"&frac58;\",\"⅞\":\"&frac78;\",\"⁄\":\"&frasl;\",\"⌢\":\"&sfrown;\",\"𝒻\":\"&fscr;\",\"⪌\":\"&gtreqqless;\",\"ǵ\":\"&gacute;\",\"γ\":\"&gamma;\",\"⪆\":\"&gtrapprox;\",\"ğ\":\"&gbreve;\",\"ĝ\":\"&gcirc;\",\"г\":\"&gcy;\",\"ġ\":\"&gdot;\",\"⪩\":\"&gescc;\",\"⪀\":\"&gesdot;\",\"⪂\":\"&gesdoto;\",\"⪄\":\"&gesdotol;\",\"⋛︀\":\"&gesl;\",\"⪔\":\"&gesles;\",\"𝔤\":\"&gfr;\",\"ℷ\":\"&gimel;\",\"ѓ\":\"&gjcy;\",\"⪒\":\"&glE;\",\"⪥\":\"&gla;\",\"⪤\":\"&glj;\",\"≩\":\"&gneqq;\",\"⪊\":\"&gnapprox;\",\"⪈\":\"&gneq;\",\"⋧\":\"&gnsim;\",\"𝕘\":\"&gopf;\",\"ℊ\":\"&gscr;\",\"⪎\":\"&gsime;\",\"⪐\":\"&gsiml;\",\"⪧\":\"&gtcc;\",\"⩺\":\"&gtcir;\",\"⋗\":\"&gtrdot;\",\"⦕\":\"&gtlPar;\",\"⩼\":\"&gtquest;\",\"⥸\":\"&gtrarr;\",\"≩︀\":\"&gvnE;\",\"ъ\":\"&hardcy;\",\"⥈\":\"&harrcir;\",\"↭\":\"&leftrightsquigarrow;\",\"ℏ\":\"&plankv;\",\"ĥ\":\"&hcirc;\",\"♥\":\"&heartsuit;\",\"…\":\"&mldr;\",\"⊹\":\"&hercon;\",\"𝔥\":\"&hfr;\",\"⤥\":\"&searhk;\",\"⤦\":\"&swarhk;\",\"⇿\":\"&hoarr;\",\"∻\":\"&homtht;\",\"↩\":\"&larrhk;\",\"↪\":\"&rarrhk;\",\"𝕙\":\"&hopf;\",\"―\":\"&horbar;\",\"𝒽\":\"&hscr;\",\"ħ\":\"&hstrok;\",\"⁃\":\"&hybull;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"и\":\"&icy;\",\"е\":\"&iecy;\",\"¡\":\"&iexcl;\",\"𝔦\":\"&ifr;\",\"ì\":\"&igrave;\",\"⨌\":\"&qint;\",\"∭\":\"&tint;\",\"⧜\":\"&iinfin;\",\"℩\":\"&iiota;\",\"ĳ\":\"&ijlig;\",\"ī\":\"&imacr;\",\"ı\":\"&inodot;\",\"⊷\":\"&imof;\",\"Ƶ\":\"&imped;\",\"℅\":\"&incare;\",\"∞\":\"&infin;\",\"⧝\":\"&infintie;\",\"⊺\":\"&intercal;\",\"⨗\":\"&intlarhk;\",\"⨼\":\"&iprod;\",\"ё\":\"&iocy;\",\"į\":\"&iogon;\",\"𝕚\":\"&iopf;\",\"ι\":\"&iota;\",\"¿\":\"&iquest;\",\"𝒾\":\"&iscr;\",\"⋹\":\"&isinE;\",\"⋵\":\"&isindot;\",\"⋴\":\"&isins;\",\"⋳\":\"&isinsv;\",\"ĩ\":\"&itilde;\",\"і\":\"&iukcy;\",\"ï\":\"&iuml;\",\"ĵ\":\"&jcirc;\",\"й\":\"&jcy;\",\"𝔧\":\"&jfr;\",\"ȷ\":\"&jmath;\",\"𝕛\":\"&jopf;\",\"𝒿\":\"&jscr;\",\"ј\":\"&jsercy;\",\"є\":\"&jukcy;\",\"κ\":\"&kappa;\",\"ϰ\":\"&varkappa;\",\"ķ\":\"&kcedil;\",\"к\":\"&kcy;\",\"𝔨\":\"&kfr;\",\"ĸ\":\"&kgreen;\",\"х\":\"&khcy;\",\"ќ\":\"&kjcy;\",\"𝕜\":\"&kopf;\",\"𝓀\":\"&kscr;\",\"⤛\":\"&lAtail;\",\"⤎\":\"&lBarr;\",\"⪋\":\"&lesseqqgtr;\",\"⥢\":\"&lHar;\",\"ĺ\":\"&lacute;\",\"⦴\":\"&laemptyv;\",\"λ\":\"&lambda;\",\"⦑\":\"&langd;\",\"⪅\":\"&lessapprox;\",\"«\":\"&laquo;\",\"⤟\":\"&larrbfs;\",\"⤝\":\"&larrfs;\",\"↫\":\"&looparrowleft;\",\"⤹\":\"&larrpl;\",\"⥳\":\"&larrsim;\",\"↢\":\"&leftarrowtail;\",\"⪫\":\"&lat;\",\"⤙\":\"&latail;\",\"⪭\":\"&late;\",\"⪭︀\":\"&lates;\",\"⤌\":\"&lbarr;\",\"❲\":\"&lbbrk;\",\"{\":\"&lcub;\",\"[\":\"&lsqb;\",\"⦋\":\"&lbrke;\",\"⦏\":\"&lbrksld;\",\"⦍\":\"&lbrkslu;\",\"ľ\":\"&lcaron;\",\"ļ\":\"&lcedil;\",\"л\":\"&lcy;\",\"⤶\":\"&ldca;\",\"⥧\":\"&ldrdhar;\",\"⥋\":\"&ldrushar;\",\"↲\":\"&ldsh;\",\"≤\":\"&leq;\",\"⇇\":\"&llarr;\",\"⋋\":\"&lthree;\",\"⪨\":\"&lescc;\",\"⩿\":\"&lesdot;\",\"⪁\":\"&lesdoto;\",\"⪃\":\"&lesdotor;\",\"⋚︀\":\"&lesg;\",\"⪓\":\"&lesges;\",\"⋖\":\"&ltdot;\",\"⥼\":\"&lfisht;\",\"𝔩\":\"&lfr;\",\"⪑\":\"&lgE;\",\"⥪\":\"&lharul;\",\"▄\":\"&lhblk;\",\"љ\":\"&ljcy;\",\"⥫\":\"&llhard;\",\"◺\":\"&lltri;\",\"ŀ\":\"&lmidot;\",\"⎰\":\"&lmoustache;\",\"≨\":\"&lneqq;\",\"⪉\":\"&lnapprox;\",\"⪇\":\"&lneq;\",\"⋦\":\"&lnsim;\",\"⟬\":\"&loang;\",\"⇽\":\"&loarr;\",\"⟼\":\"&xmap;\",\"↬\":\"&rarrlp;\",\"⦅\":\"&lopar;\",\"𝕝\":\"&lopf;\",\"⨭\":\"&loplus;\",\"⨴\":\"&lotimes;\",\"∗\":\"&lowast;\",\"◊\":\"&lozenge;\",\"(\":\"&lpar;\",\"⦓\":\"&lparlt;\",\"⥭\":\"&lrhard;\",\"‎\":\"&lrm;\",\"⊿\":\"&lrtri;\",\"‹\":\"&lsaquo;\",\"𝓁\":\"&lscr;\",\"⪍\":\"&lsime;\",\"⪏\":\"&lsimg;\",\"‚\":\"&sbquo;\",\"ł\":\"&lstrok;\",\"⪦\":\"&ltcc;\",\"⩹\":\"&ltcir;\",\"⋉\":\"&ltimes;\",\"⥶\":\"&ltlarr;\",\"⩻\":\"&ltquest;\",\"⦖\":\"&ltrPar;\",\"◃\":\"&triangleleft;\",\"⥊\":\"&lurdshar;\",\"⥦\":\"&luruhar;\",\"≨︀\":\"&lvnE;\",\"∺\":\"&mDDot;\",\"¯\":\"&strns;\",\"♂\":\"&male;\",\"✠\":\"&maltese;\",\"▮\":\"&marker;\",\"⨩\":\"&mcomma;\",\"м\":\"&mcy;\",\"—\":\"&mdash;\",\"𝔪\":\"&mfr;\",\"℧\":\"&mho;\",\"µ\":\"&micro;\",\"⫰\":\"&midcir;\",\"−\":\"&minus;\",\"⨪\":\"&minusdu;\",\"⫛\":\"&mlcp;\",\"⊧\":\"&models;\",\"𝕞\":\"&mopf;\",\"𝓂\":\"&mscr;\",\"μ\":\"&mu;\",\"⊸\":\"&mumap;\",\"⋙̸\":\"&nGg;\",\"≫⃒\":\"&nGt;\",\"⇍\":\"&nlArr;\",\"⇎\":\"&nhArr;\",\"⋘̸\":\"&nLl;\",\"≪⃒\":\"&nLt;\",\"⇏\":\"&nrArr;\",\"⊯\":\"&nVDash;\",\"⊮\":\"&nVdash;\",\"ń\":\"&nacute;\",\"∠⃒\":\"&nang;\",\"⩰̸\":\"&napE;\",\"≋̸\":\"&napid;\",\"ŉ\":\"&napos;\",\"♮\":\"&natural;\",\"⩃\":\"&ncap;\",\"ň\":\"&ncaron;\",\"ņ\":\"&ncedil;\",\"⩭̸\":\"&ncongdot;\",\"⩂\":\"&ncup;\",\"н\":\"&ncy;\",\"–\":\"&ndash;\",\"⇗\":\"&neArr;\",\"⤤\":\"&nearhk;\",\"≐̸\":\"&nedot;\",\"⤨\":\"&toea;\",\"𝔫\":\"&nfr;\",\"↮\":\"&nleftrightarrow;\",\"⫲\":\"&nhpar;\",\"⋼\":\"&nis;\",\"⋺\":\"&nisd;\",\"њ\":\"&njcy;\",\"≦̸\":\"&nleqq;\",\"↚\":\"&nleftarrow;\",\"‥\":\"&nldr;\",\"𝕟\":\"&nopf;\",\"¬\":\"&not;\",\"⋹̸\":\"&notinE;\",\"⋵̸\":\"&notindot;\",\"⋷\":\"&notinvb;\",\"⋶\":\"&notinvc;\",\"⋾\":\"&notnivb;\",\"⋽\":\"&notnivc;\",\"⫽⃥\":\"&nparsl;\",\"∂̸\":\"&npart;\",\"⨔\":\"&npolint;\",\"↛\":\"&nrightarrow;\",\"⤳̸\":\"&nrarrc;\",\"↝̸\":\"&nrarrw;\",\"𝓃\":\"&nscr;\",\"⊄\":\"&nsub;\",\"⫅̸\":\"&nsubseteqq;\",\"⊅\":\"&nsup;\",\"⫆̸\":\"&nsupseteqq;\",\"ñ\":\"&ntilde;\",\"ν\":\"&nu;\",\"#\":\"&num;\",\"№\":\"&numero;\",\" \":\"&numsp;\",\"⊭\":\"&nvDash;\",\"⤄\":\"&nvHarr;\",\"≍⃒\":\"&nvap;\",\"⊬\":\"&nvdash;\",\"≥⃒\":\"&nvge;\",\">⃒\":\"&nvgt;\",\"⧞\":\"&nvinfin;\",\"⤂\":\"&nvlArr;\",\"≤⃒\":\"&nvle;\",\"<⃒\":\"&nvlt;\",\"⊴⃒\":\"&nvltrie;\",\"⤃\":\"&nvrArr;\",\"⊵⃒\":\"&nvrtrie;\",\"∼⃒\":\"&nvsim;\",\"⇖\":\"&nwArr;\",\"⤣\":\"&nwarhk;\",\"⤧\":\"&nwnear;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"о\":\"&ocy;\",\"ő\":\"&odblac;\",\"⨸\":\"&odiv;\",\"⦼\":\"&odsold;\",\"œ\":\"&oelig;\",\"⦿\":\"&ofcir;\",\"𝔬\":\"&ofr;\",\"˛\":\"&ogon;\",\"ò\":\"&ograve;\",\"⧁\":\"&ogt;\",\"⦵\":\"&ohbar;\",\"⦾\":\"&olcir;\",\"⦻\":\"&olcross;\",\"⧀\":\"&olt;\",\"ō\":\"&omacr;\",\"ω\":\"&omega;\",\"ο\":\"&omicron;\",\"⦶\":\"&omid;\",\"𝕠\":\"&oopf;\",\"⦷\":\"&opar;\",\"⦹\":\"&operp;\",\"∨\":\"&vee;\",\"⩝\":\"&ord;\",\"ℴ\":\"&oscr;\",\"ª\":\"&ordf;\",\"º\":\"&ordm;\",\"⊶\":\"&origof;\",\"⩖\":\"&oror;\",\"⩗\":\"&orslope;\",\"⩛\":\"&orv;\",\"ø\":\"&oslash;\",\"⊘\":\"&osol;\",\"õ\":\"&otilde;\",\"⨶\":\"&otimesas;\",\"ö\":\"&ouml;\",\"⌽\":\"&ovbar;\",\"¶\":\"&para;\",\"⫳\":\"&parsim;\",\"⫽\":\"&parsl;\",\"п\":\"&pcy;\",\"%\":\"&percnt;\",\".\":\"&period;\",\"‰\":\"&permil;\",\"‱\":\"&pertenk;\",\"𝔭\":\"&pfr;\",\"φ\":\"&phi;\",\"ϕ\":\"&varphi;\",\"☎\":\"&phone;\",\"π\":\"&pi;\",\"ϖ\":\"&varpi;\",\"ℎ\":\"&planckh;\",\"+\":\"&plus;\",\"⨣\":\"&plusacir;\",\"⨢\":\"&pluscir;\",\"⨥\":\"&plusdu;\",\"⩲\":\"&pluse;\",\"⨦\":\"&plussim;\",\"⨧\":\"&plustwo;\",\"⨕\":\"&pointint;\",\"𝕡\":\"&popf;\",\"£\":\"&pound;\",\"⪳\":\"&prE;\",\"⪷\":\"&precapprox;\",\"⪹\":\"&prnap;\",\"⪵\":\"&prnE;\",\"⋨\":\"&prnsim;\",\"′\":\"&prime;\",\"⌮\":\"&profalar;\",\"⌒\":\"&profline;\",\"⌓\":\"&profsurf;\",\"⊰\":\"&prurel;\",\"𝓅\":\"&pscr;\",\"ψ\":\"&psi;\",\" \":\"&puncsp;\",\"𝔮\":\"&qfr;\",\"𝕢\":\"&qopf;\",\"⁗\":\"&qprime;\",\"𝓆\":\"&qscr;\",\"⨖\":\"&quatint;\",\"?\":\"&quest;\",\"⤜\":\"&rAtail;\",\"⥤\":\"&rHar;\",\"∽̱\":\"&race;\",\"ŕ\":\"&racute;\",\"⦳\":\"&raemptyv;\",\"⦒\":\"&rangd;\",\"⦥\":\"&range;\",\"»\":\"&raquo;\",\"⥵\":\"&rarrap;\",\"⤠\":\"&rarrbfs;\",\"⤳\":\"&rarrc;\",\"⤞\":\"&rarrfs;\",\"⥅\":\"&rarrpl;\",\"⥴\":\"&rarrsim;\",\"↣\":\"&rightarrowtail;\",\"↝\":\"&rightsquigarrow;\",\"⤚\":\"&ratail;\",\"∶\":\"&ratio;\",\"❳\":\"&rbbrk;\",\"}\":\"&rcub;\",\"]\":\"&rsqb;\",\"⦌\":\"&rbrke;\",\"⦎\":\"&rbrksld;\",\"⦐\":\"&rbrkslu;\",\"ř\":\"&rcaron;\",\"ŗ\":\"&rcedil;\",\"р\":\"&rcy;\",\"⤷\":\"&rdca;\",\"⥩\":\"&rdldhar;\",\"↳\":\"&rdsh;\",\"▭\":\"&rect;\",\"⥽\":\"&rfisht;\",\"𝔯\":\"&rfr;\",\"⥬\":\"&rharul;\",\"ρ\":\"&rho;\",\"ϱ\":\"&varrho;\",\"⇉\":\"&rrarr;\",\"⋌\":\"&rthree;\",\"˚\":\"&ring;\",\"‏\":\"&rlm;\",\"⎱\":\"&rmoustache;\",\"⫮\":\"&rnmid;\",\"⟭\":\"&roang;\",\"⇾\":\"&roarr;\",\"⦆\":\"&ropar;\",\"𝕣\":\"&ropf;\",\"⨮\":\"&roplus;\",\"⨵\":\"&rotimes;\",\")\":\"&rpar;\",\"⦔\":\"&rpargt;\",\"⨒\":\"&rppolint;\",\"›\":\"&rsaquo;\",\"𝓇\":\"&rscr;\",\"⋊\":\"&rtimes;\",\"▹\":\"&triangleright;\",\"⧎\":\"&rtriltri;\",\"⥨\":\"&ruluhar;\",\"℞\":\"&rx;\",\"ś\":\"&sacute;\",\"⪴\":\"&scE;\",\"⪸\":\"&succapprox;\",\"š\":\"&scaron;\",\"ş\":\"&scedil;\",\"ŝ\":\"&scirc;\",\"⪶\":\"&succneqq;\",\"⪺\":\"&succnapprox;\",\"⋩\":\"&succnsim;\",\"⨓\":\"&scpolint;\",\"с\":\"&scy;\",\"⋅\":\"&sdot;\",\"⩦\":\"&sdote;\",\"⇘\":\"&seArr;\",\"§\":\"&sect;\",\";\":\"&semi;\",\"⤩\":\"&tosa;\",\"✶\":\"&sext;\",\"𝔰\":\"&sfr;\",\"♯\":\"&sharp;\",\"щ\":\"&shchcy;\",\"ш\":\"&shcy;\",\"­\":\"&shy;\",\"σ\":\"&sigma;\",\"ς\":\"&varsigma;\",\"⩪\":\"&simdot;\",\"⪞\":\"&simg;\",\"⪠\":\"&simgE;\",\"⪝\":\"&siml;\",\"⪟\":\"&simlE;\",\"≆\":\"&simne;\",\"⨤\":\"&simplus;\",\"⥲\":\"&simrarr;\",\"⨳\":\"&smashp;\",\"⧤\":\"&smeparsl;\",\"⌣\":\"&ssmile;\",\"⪪\":\"&smt;\",\"⪬\":\"&smte;\",\"⪬︀\":\"&smtes;\",\"ь\":\"&softcy;\",\"/\":\"&sol;\",\"⧄\":\"&solb;\",\"⌿\":\"&solbar;\",\"𝕤\":\"&sopf;\",\"♠\":\"&spadesuit;\",\"⊓︀\":\"&sqcaps;\",\"⊔︀\":\"&sqcups;\",\"𝓈\":\"&sscr;\",\"☆\":\"&star;\",\"⊂\":\"&subset;\",\"⫅\":\"&subseteqq;\",\"⪽\":\"&subdot;\",\"⫃\":\"&subedot;\",\"⫁\":\"&submult;\",\"⫋\":\"&subsetneqq;\",\"⊊\":\"&subsetneq;\",\"⪿\":\"&subplus;\",\"⥹\":\"&subrarr;\",\"⫇\":\"&subsim;\",\"⫕\":\"&subsub;\",\"⫓\":\"&subsup;\",\"♪\":\"&sung;\",\"¹\":\"&sup1;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"⫆\":\"&supseteqq;\",\"⪾\":\"&supdot;\",\"⫘\":\"&supdsub;\",\"⫄\":\"&supedot;\",\"⟉\":\"&suphsol;\",\"⫗\":\"&suphsub;\",\"⥻\":\"&suplarr;\",\"⫂\":\"&supmult;\",\"⫌\":\"&supsetneqq;\",\"⊋\":\"&supsetneq;\",\"⫀\":\"&supplus;\",\"⫈\":\"&supsim;\",\"⫔\":\"&supsub;\",\"⫖\":\"&supsup;\",\"⇙\":\"&swArr;\",\"⤪\":\"&swnwar;\",\"ß\":\"&szlig;\",\"⌖\":\"&target;\",\"τ\":\"&tau;\",\"ť\":\"&tcaron;\",\"ţ\":\"&tcedil;\",\"т\":\"&tcy;\",\"⌕\":\"&telrec;\",\"𝔱\":\"&tfr;\",\"θ\":\"&theta;\",\"ϑ\":\"&vartheta;\",\"þ\":\"&thorn;\",\"×\":\"&times;\",\"⨱\":\"&timesbar;\",\"⨰\":\"&timesd;\",\"⌶\":\"&topbot;\",\"⫱\":\"&topcir;\",\"𝕥\":\"&topf;\",\"⫚\":\"&topfork;\",\"‴\":\"&tprime;\",\"▵\":\"&utri;\",\"≜\":\"&trie;\",\"◬\":\"&tridot;\",\"⨺\":\"&triminus;\",\"⨹\":\"&triplus;\",\"⧍\":\"&trisb;\",\"⨻\":\"&tritime;\",\"⏢\":\"&trpezium;\",\"𝓉\":\"&tscr;\",\"ц\":\"&tscy;\",\"ћ\":\"&tshcy;\",\"ŧ\":\"&tstrok;\",\"⥣\":\"&uHar;\",\"ú\":\"&uacute;\",\"ў\":\"&ubrcy;\",\"ŭ\":\"&ubreve;\",\"û\":\"&ucirc;\",\"у\":\"&ucy;\",\"ű\":\"&udblac;\",\"⥾\":\"&ufisht;\",\"𝔲\":\"&ufr;\",\"ù\":\"&ugrave;\",\"▀\":\"&uhblk;\",\"⌜\":\"&ulcorner;\",\"⌏\":\"&ulcrop;\",\"◸\":\"&ultri;\",\"ū\":\"&umacr;\",\"ų\":\"&uogon;\",\"𝕦\":\"&uopf;\",\"υ\":\"&upsilon;\",\"⇈\":\"&uuarr;\",\"⌝\":\"&urcorner;\",\"⌎\":\"&urcrop;\",\"ů\":\"&uring;\",\"◹\":\"&urtri;\",\"𝓊\":\"&uscr;\",\"⋰\":\"&utdot;\",\"ũ\":\"&utilde;\",\"ü\":\"&uuml;\",\"⦧\":\"&uwangle;\",\"⫨\":\"&vBar;\",\"⫩\":\"&vBarv;\",\"⦜\":\"&vangrt;\",\"⊊︀\":\"&vsubne;\",\"⫋︀\":\"&vsubnE;\",\"⊋︀\":\"&vsupne;\",\"⫌︀\":\"&vsupnE;\",\"в\":\"&vcy;\",\"⊻\":\"&veebar;\",\"≚\":\"&veeeq;\",\"⋮\":\"&vellip;\",\"𝔳\":\"&vfr;\",\"𝕧\":\"&vopf;\",\"𝓋\":\"&vscr;\",\"⦚\":\"&vzigzag;\",\"ŵ\":\"&wcirc;\",\"⩟\":\"&wedbar;\",\"≙\":\"&wedgeq;\",\"℘\":\"&wp;\",\"𝔴\":\"&wfr;\",\"𝕨\":\"&wopf;\",\"𝓌\":\"&wscr;\",\"𝔵\":\"&xfr;\",\"ξ\":\"&xi;\",\"⋻\":\"&xnis;\",\"𝕩\":\"&xopf;\",\"𝓍\":\"&xscr;\",\"ý\":\"&yacute;\",\"я\":\"&yacy;\",\"ŷ\":\"&ycirc;\",\"ы\":\"&ycy;\",\"¥\":\"&yen;\",\"𝔶\":\"&yfr;\",\"ї\":\"&yicy;\",\"𝕪\":\"&yopf;\",\"𝓎\":\"&yscr;\",\"ю\":\"&yucy;\",\"ÿ\":\"&yuml;\",\"ź\":\"&zacute;\",\"ž\":\"&zcaron;\",\"з\":\"&zcy;\",\"ż\":\"&zdot;\",\"ζ\":\"&zeta;\",\"𝔷\":\"&zfr;\",\"ж\":\"&zhcy;\",\"⇝\":\"&zigrarr;\",\"𝕫\":\"&zopf;\",\"𝓏\":\"&zscr;\",\"‍\":\"&zwj;\",\"‌\":\"&zwnj;\"}}};\n\n//# sourceURL=webpack://formatters/./node_modules/html-entities/lib/named-references.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};\n\n//# sourceURL=webpack://formatters/./node_modules/html-entities/lib/numeric-unicode-map.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;\n\n//# sourceURL=webpack://formatters/./node_modules/html-entities/lib/surrogate-pairs.js?");

/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (Array.isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/querystring/decode.js?");

/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return Object.keys(obj).map(function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (Array.isArray(obj[k])) {\n        return obj[k].map(function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/querystring/encode.js?");

/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/querystring/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/querystring/encode.js\");\n\n\n//# sourceURL=webpack://formatters/./node_modules/querystring/index.js?");

/***/ }),

/***/ "./node_modules/url/node_modules/punycode/punycode.js":
/*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */\n;(function(root) {\n\n\t/** Detect free variables */\n\tvar freeExports =  true && exports &&\n\t\t!exports.nodeType && exports;\n\tvar freeModule =  true && module &&\n\t\t!module.nodeType && module;\n\tvar freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;\n\tif (\n\t\tfreeGlobal.global === freeGlobal ||\n\t\tfreeGlobal.window === freeGlobal ||\n\t\tfreeGlobal.self === freeGlobal\n\t) {\n\t\troot = freeGlobal;\n\t}\n\n\t/**\n\t * The `punycode` object.\n\t * @name punycode\n\t * @type Object\n\t */\n\tvar punycode,\n\n\t/** Highest positive signed 32-bit float value */\n\tmaxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1\n\n\t/** Bootstring parameters */\n\tbase = 36,\n\ttMin = 1,\n\ttMax = 26,\n\tskew = 38,\n\tdamp = 700,\n\tinitialBias = 72,\n\tinitialN = 128, // 0x80\n\tdelimiter = '-', // '\\x2D'\n\n\t/** Regular expressions */\n\tregexPunycode = /^xn--/,\n\tregexNonASCII = /[^\\x20-\\x7E]/, // unprintable ASCII chars + non-ASCII chars\n\tregexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g, // RFC 3490 separators\n\n\t/** Error messages */\n\terrors = {\n\t\t'overflow': 'Overflow: input needs wider integers to process',\n\t\t'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n\t\t'invalid-input': 'Invalid input'\n\t},\n\n\t/** Convenience shortcuts */\n\tbaseMinusTMin = base - tMin,\n\tfloor = Math.floor,\n\tstringFromCharCode = String.fromCharCode,\n\n\t/** Temporary variable */\n\tkey;\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/**\n\t * A generic error utility function.\n\t * @private\n\t * @param {String} type The error type.\n\t * @returns {Error} Throws a `RangeError` with the applicable error message.\n\t */\n\tfunction error(type) {\n\t\tthrow RangeError(errors[type]);\n\t}\n\n\t/**\n\t * A generic `Array#map` utility function.\n\t * @private\n\t * @param {Array} array The array to iterate over.\n\t * @param {Function} callback The function that gets called for every array\n\t * item.\n\t * @returns {Array} A new array of values returned by the callback function.\n\t */\n\tfunction map(array, fn) {\n\t\tvar length = array.length;\n\t\tvar result = [];\n\t\twhile (length--) {\n\t\t\tresult[length] = fn(array[length]);\n\t\t}\n\t\treturn result;\n\t}\n\n\t/**\n\t * A simple `Array#map`-like wrapper to work with domain name strings or email\n\t * addresses.\n\t * @private\n\t * @param {String} domain The domain name or email address.\n\t * @param {Function} callback The function that gets called for every\n\t * character.\n\t * @returns {Array} A new string of characters returned by the callback\n\t * function.\n\t */\n\tfunction mapDomain(string, fn) {\n\t\tvar parts = string.split('@');\n\t\tvar result = '';\n\t\tif (parts.length > 1) {\n\t\t\t// In email addresses, only the domain name should be punycoded. Leave\n\t\t\t// the local part (i.e. everything up to `@`) intact.\n\t\t\tresult = parts[0] + '@';\n\t\t\tstring = parts[1];\n\t\t}\n\t\t// Avoid `split(regex)` for IE8 compatibility. See #17.\n\t\tstring = string.replace(regexSeparators, '\\x2E');\n\t\tvar labels = string.split('.');\n\t\tvar encoded = map(labels, fn).join('.');\n\t\treturn result + encoded;\n\t}\n\n\t/**\n\t * Creates an array containing the numeric code points of each Unicode\n\t * character in the string. While JavaScript uses UCS-2 internally,\n\t * this function will convert a pair of surrogate halves (each of which\n\t * UCS-2 exposes as separate characters) into a single code point,\n\t * matching UTF-16.\n\t * @see `punycode.ucs2.encode`\n\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t * @memberOf punycode.ucs2\n\t * @name decode\n\t * @param {String} string The Unicode input string (UCS-2).\n\t * @returns {Array} The new array of code points.\n\t */\n\tfunction ucs2decode(string) {\n\t\tvar output = [],\n\t\t    counter = 0,\n\t\t    length = string.length,\n\t\t    value,\n\t\t    extra;\n\t\twhile (counter < length) {\n\t\t\tvalue = string.charCodeAt(counter++);\n\t\t\tif (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n\t\t\t\t// high surrogate, and there is a next character\n\t\t\t\textra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) { // low surrogate\n\t\t\t\t\toutput.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n\t\t\t\t} else {\n\t\t\t\t\t// unmatched surrogate; only append this code unit, in case the next\n\t\t\t\t\t// code unit is the high surrogate of a surrogate pair\n\t\t\t\t\toutput.push(value);\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\toutput.push(value);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t}\n\n\t/**\n\t * Creates a string based on an array of numeric code points.\n\t * @see `punycode.ucs2.decode`\n\t * @memberOf punycode.ucs2\n\t * @name encode\n\t * @param {Array} codePoints The array of numeric code points.\n\t * @returns {String} The new Unicode string (UCS-2).\n\t */\n\tfunction ucs2encode(array) {\n\t\treturn map(array, function(value) {\n\t\t\tvar output = '';\n\t\t\tif (value > 0xFFFF) {\n\t\t\t\tvalue -= 0x10000;\n\t\t\t\toutput += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n\t\t\t\tvalue = 0xDC00 | value & 0x3FF;\n\t\t\t}\n\t\t\toutput += stringFromCharCode(value);\n\t\t\treturn output;\n\t\t}).join('');\n\t}\n\n\t/**\n\t * Converts a basic code point into a digit/integer.\n\t * @see `digitToBasic()`\n\t * @private\n\t * @param {Number} codePoint The basic numeric code point value.\n\t * @returns {Number} The numeric value of a basic code point (for use in\n\t * representing integers) in the range `0` to `base - 1`, or `base` if\n\t * the code point does not represent a value.\n\t */\n\tfunction basicToDigit(codePoint) {\n\t\tif (codePoint - 48 < 10) {\n\t\t\treturn codePoint - 22;\n\t\t}\n\t\tif (codePoint - 65 < 26) {\n\t\t\treturn codePoint - 65;\n\t\t}\n\t\tif (codePoint - 97 < 26) {\n\t\t\treturn codePoint - 97;\n\t\t}\n\t\treturn base;\n\t}\n\n\t/**\n\t * Converts a digit/integer into a basic code point.\n\t * @see `basicToDigit()`\n\t * @private\n\t * @param {Number} digit The numeric value of a basic code point.\n\t * @returns {Number} The basic code point whose value (when used for\n\t * representing integers) is `digit`, which needs to be in the range\n\t * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n\t * used; else, the lowercase form is used. The behavior is undefined\n\t * if `flag` is non-zero and `digit` has no uppercase form.\n\t */\n\tfunction digitToBasic(digit, flag) {\n\t\t//  0..25 map to ASCII a..z or A..Z\n\t\t// 26..35 map to ASCII 0..9\n\t\treturn digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n\t}\n\n\t/**\n\t * Bias adaptation function as per section 3.4 of RFC 3492.\n\t * http://tools.ietf.org/html/rfc3492#section-3.4\n\t * @private\n\t */\n\tfunction adapt(delta, numPoints, firstTime) {\n\t\tvar k = 0;\n\t\tdelta = firstTime ? floor(delta / damp) : delta >> 1;\n\t\tdelta += floor(delta / numPoints);\n\t\tfor (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {\n\t\t\tdelta = floor(delta / baseMinusTMin);\n\t\t}\n\t\treturn floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n\t}\n\n\t/**\n\t * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n\t * symbols.\n\t * @memberOf punycode\n\t * @param {String} input The Punycode string of ASCII-only symbols.\n\t * @returns {String} The resulting string of Unicode symbols.\n\t */\n\tfunction decode(input) {\n\t\t// Don't use UCS-2\n\t\tvar output = [],\n\t\t    inputLength = input.length,\n\t\t    out,\n\t\t    i = 0,\n\t\t    n = initialN,\n\t\t    bias = initialBias,\n\t\t    basic,\n\t\t    j,\n\t\t    index,\n\t\t    oldi,\n\t\t    w,\n\t\t    k,\n\t\t    digit,\n\t\t    t,\n\t\t    /** Cached calculation results */\n\t\t    baseMinusT;\n\n\t\t// Handle the basic code points: let `basic` be the number of input code\n\t\t// points before the last delimiter, or `0` if there is none, then copy\n\t\t// the first basic code points to the output.\n\n\t\tbasic = input.lastIndexOf(delimiter);\n\t\tif (basic < 0) {\n\t\t\tbasic = 0;\n\t\t}\n\n\t\tfor (j = 0; j < basic; ++j) {\n\t\t\t// if it's not a basic code point\n\t\t\tif (input.charCodeAt(j) >= 0x80) {\n\t\t\t\terror('not-basic');\n\t\t\t}\n\t\t\toutput.push(input.charCodeAt(j));\n\t\t}\n\n\t\t// Main decoding loop: start just after the last delimiter if any basic code\n\t\t// points were copied; start at the beginning otherwise.\n\n\t\tfor (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {\n\n\t\t\t// `index` is the index of the next character to be consumed.\n\t\t\t// Decode a generalized variable-length integer into `delta`,\n\t\t\t// which gets added to `i`. The overflow checking is easier\n\t\t\t// if we increase `i` as we go, then subtract off its starting\n\t\t\t// value at the end to obtain `delta`.\n\t\t\tfor (oldi = i, w = 1, k = base; /* no condition */; k += base) {\n\n\t\t\t\tif (index >= inputLength) {\n\t\t\t\t\terror('invalid-input');\n\t\t\t\t}\n\n\t\t\t\tdigit = basicToDigit(input.charCodeAt(index++));\n\n\t\t\t\tif (digit >= base || digit > floor((maxInt - i) / w)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\ti += digit * w;\n\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\n\t\t\t\tif (digit < t) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tbaseMinusT = base - t;\n\t\t\t\tif (w > floor(maxInt / baseMinusT)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tw *= baseMinusT;\n\n\t\t\t}\n\n\t\t\tout = output.length + 1;\n\t\t\tbias = adapt(i - oldi, out, oldi == 0);\n\n\t\t\t// `i` was supposed to wrap around from `out` to `0`,\n\t\t\t// incrementing `n` each time, so we'll fix that now:\n\t\t\tif (floor(i / out) > maxInt - n) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tn += floor(i / out);\n\t\t\ti %= out;\n\n\t\t\t// Insert `n` at position `i` of the output\n\t\t\toutput.splice(i++, 0, n);\n\n\t\t}\n\n\t\treturn ucs2encode(output);\n\t}\n\n\t/**\n\t * Converts a string of Unicode symbols (e.g. a domain name label) to a\n\t * Punycode string of ASCII-only symbols.\n\t * @memberOf punycode\n\t * @param {String} input The string of Unicode symbols.\n\t * @returns {String} The resulting Punycode string of ASCII-only symbols.\n\t */\n\tfunction encode(input) {\n\t\tvar n,\n\t\t    delta,\n\t\t    handledCPCount,\n\t\t    basicLength,\n\t\t    bias,\n\t\t    j,\n\t\t    m,\n\t\t    q,\n\t\t    k,\n\t\t    t,\n\t\t    currentValue,\n\t\t    output = [],\n\t\t    /** `inputLength` will hold the number of code points in `input`. */\n\t\t    inputLength,\n\t\t    /** Cached calculation results */\n\t\t    handledCPCountPlusOne,\n\t\t    baseMinusT,\n\t\t    qMinusT;\n\n\t\t// Convert the input in UCS-2 to Unicode\n\t\tinput = ucs2decode(input);\n\n\t\t// Cache the length\n\t\tinputLength = input.length;\n\n\t\t// Initialize the state\n\t\tn = initialN;\n\t\tdelta = 0;\n\t\tbias = initialBias;\n\n\t\t// Handle the basic code points\n\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\tcurrentValue = input[j];\n\t\t\tif (currentValue < 0x80) {\n\t\t\t\toutput.push(stringFromCharCode(currentValue));\n\t\t\t}\n\t\t}\n\n\t\thandledCPCount = basicLength = output.length;\n\n\t\t// `handledCPCount` is the number of code points that have been handled;\n\t\t// `basicLength` is the number of basic code points.\n\n\t\t// Finish the basic string - if it is not empty - with a delimiter\n\t\tif (basicLength) {\n\t\t\toutput.push(delimiter);\n\t\t}\n\n\t\t// Main encoding loop:\n\t\twhile (handledCPCount < inputLength) {\n\n\t\t\t// All non-basic code points < n have been handled already. Find the next\n\t\t\t// larger one:\n\t\t\tfor (m = maxInt, j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\t\t\t\tif (currentValue >= n && currentValue < m) {\n\t\t\t\t\tm = currentValue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n\t\t\t// but guard against overflow\n\t\t\thandledCPCountPlusOne = handledCPCount + 1;\n\t\t\tif (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tdelta += (m - n) * handledCPCountPlusOne;\n\t\t\tn = m;\n\n\t\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\n\t\t\t\tif (currentValue < n && ++delta > maxInt) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tif (currentValue == n) {\n\t\t\t\t\t// Represent delta as a generalized variable-length integer\n\t\t\t\t\tfor (q = delta, k = base; /* no condition */; k += base) {\n\t\t\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\t\t\t\t\t\tif (q < t) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tqMinusT = q - t;\n\t\t\t\t\t\tbaseMinusT = base - t;\n\t\t\t\t\t\toutput.push(\n\t\t\t\t\t\t\tstringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))\n\t\t\t\t\t\t);\n\t\t\t\t\t\tq = floor(qMinusT / baseMinusT);\n\t\t\t\t\t}\n\n\t\t\t\t\toutput.push(stringFromCharCode(digitToBasic(q, 0)));\n\t\t\t\t\tbias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n\t\t\t\t\tdelta = 0;\n\t\t\t\t\t++handledCPCount;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t++delta;\n\t\t\t++n;\n\n\t\t}\n\t\treturn output.join('');\n\t}\n\n\t/**\n\t * Converts a Punycode string representing a domain name or an email address\n\t * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n\t * it doesn't matter if you call it on a string that has already been\n\t * converted to Unicode.\n\t * @memberOf punycode\n\t * @param {String} input The Punycoded domain name or email address to\n\t * convert to Unicode.\n\t * @returns {String} The Unicode representation of the given Punycode\n\t * string.\n\t */\n\tfunction toUnicode(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexPunycode.test(string)\n\t\t\t\t? decode(string.slice(4).toLowerCase())\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/**\n\t * Converts a Unicode string representing a domain name or an email address to\n\t * Punycode. Only the non-ASCII parts of the domain name will be converted,\n\t * i.e. it doesn't matter if you call it with a domain that's already in\n\t * ASCII.\n\t * @memberOf punycode\n\t * @param {String} input The domain name or email address to convert, as a\n\t * Unicode string.\n\t * @returns {String} The Punycode representation of the given domain name or\n\t * email address.\n\t */\n\tfunction toASCII(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexNonASCII.test(string)\n\t\t\t\t? 'xn--' + encode(string)\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/** Define the public API */\n\tpunycode = {\n\t\t/**\n\t\t * A string representing the current Punycode.js version number.\n\t\t * @memberOf punycode\n\t\t * @type String\n\t\t */\n\t\t'version': '1.3.2',\n\t\t/**\n\t\t * An object of methods to convert from JavaScript's internal character\n\t\t * representation (UCS-2) to Unicode code points, and back.\n\t\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t\t * @memberOf punycode\n\t\t * @type Object\n\t\t */\n\t\t'ucs2': {\n\t\t\t'decode': ucs2decode,\n\t\t\t'encode': ucs2encode\n\t\t},\n\t\t'decode': decode,\n\t\t'encode': encode,\n\t\t'toASCII': toASCII,\n\t\t'toUnicode': toUnicode\n\t};\n\n\t/** Expose `punycode` */\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn punycode;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n\n}(this));\n\n\n//# sourceURL=webpack://formatters/./node_modules/url/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar punycode = __webpack_require__(/*! punycode */ \"./node_modules/url/node_modules/punycode/punycode.js\");\nvar util = __webpack_require__(/*! ./util */ \"./node_modules/url/util.js\");\n\nexports.parse = urlParse;\nexports.resolve = urlResolve;\nexports.resolveObject = urlResolveObject;\nexports.format = urlFormat;\n\nexports.Url = Url;\n\nfunction Url() {\n  this.protocol = null;\n  this.slashes = null;\n  this.auth = null;\n  this.host = null;\n  this.port = null;\n  this.hostname = null;\n  this.hash = null;\n  this.search = null;\n  this.query = null;\n  this.pathname = null;\n  this.path = null;\n  this.href = null;\n}\n\n// Reference: RFC 3986, RFC 1808, RFC 2396\n\n// define these here so at least they only have to be\n// compiled once on the first module load.\nvar protocolPattern = /^([a-z0-9.+-]+:)/i,\n    portPattern = /:[0-9]*$/,\n\n    // Special case for a simple path URL\n    simplePathPattern = /^(\\/\\/?(?!\\/)[^\\?\\s]*)(\\?[^\\s]*)?$/,\n\n    // RFC 2396: characters reserved for delimiting URLs.\n    // We actually just auto-escape these.\n    delims = ['<', '>', '\"', '`', ' ', '\\r', '\\n', '\\t'],\n\n    // RFC 2396: characters not allowed for various reasons.\n    unwise = ['{', '}', '|', '\\\\', '^', '`'].concat(delims),\n\n    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.\n    autoEscape = ['\\''].concat(unwise),\n    // Characters that are never ever allowed in a hostname.\n    // Note that any invalid chars are also handled, but these\n    // are the ones that are *expected* to be seen, so we fast-path\n    // them.\n    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),\n    hostEndingChars = ['/', '?', '#'],\n    hostnameMaxLen = 255,\n    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,\n    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,\n    // protocols that can allow \"unsafe\" and \"unwise\" chars.\n    unsafeProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that never have a hostname.\n    hostlessProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that always contain a // bit.\n    slashedProtocol = {\n      'http': true,\n      'https': true,\n      'ftp': true,\n      'gopher': true,\n      'file': true,\n      'http:': true,\n      'https:': true,\n      'ftp:': true,\n      'gopher:': true,\n      'file:': true\n    },\n    querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring/index.js\");\n\nfunction urlParse(url, parseQueryString, slashesDenoteHost) {\n  if (url && util.isObject(url) && url instanceof Url) return url;\n\n  var u = new Url;\n  u.parse(url, parseQueryString, slashesDenoteHost);\n  return u;\n}\n\nUrl.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {\n  if (!util.isString(url)) {\n    throw new TypeError(\"Parameter 'url' must be a string, not \" + typeof url);\n  }\n\n  // Copy chrome, IE, opera backslash-handling behavior.\n  // Back slashes before the query string get converted to forward slashes\n  // See: https://code.google.com/p/chromium/issues/detail?id=25916\n  var queryIndex = url.indexOf('?'),\n      splitter =\n          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',\n      uSplit = url.split(splitter),\n      slashRegex = /\\\\/g;\n  uSplit[0] = uSplit[0].replace(slashRegex, '/');\n  url = uSplit.join(splitter);\n\n  var rest = url;\n\n  // trim before proceeding.\n  // This is to support parse stuff like \"  http://foo.com  \\n\"\n  rest = rest.trim();\n\n  if (!slashesDenoteHost && url.split('#').length === 1) {\n    // Try fast path regexp\n    var simplePath = simplePathPattern.exec(rest);\n    if (simplePath) {\n      this.path = rest;\n      this.href = rest;\n      this.pathname = simplePath[1];\n      if (simplePath[2]) {\n        this.search = simplePath[2];\n        if (parseQueryString) {\n          this.query = querystring.parse(this.search.substr(1));\n        } else {\n          this.query = this.search.substr(1);\n        }\n      } else if (parseQueryString) {\n        this.search = '';\n        this.query = {};\n      }\n      return this;\n    }\n  }\n\n  var proto = protocolPattern.exec(rest);\n  if (proto) {\n    proto = proto[0];\n    var lowerProto = proto.toLowerCase();\n    this.protocol = lowerProto;\n    rest = rest.substr(proto.length);\n  }\n\n  // figure out if it's got a host\n  // user@server is *always* interpreted as a hostname, and url\n  // resolution will treat //foo/bar as host=foo,path=bar because that's\n  // how the browser resolves relative URLs.\n  if (slashesDenoteHost || proto || rest.match(/^\\/\\/[^@\\/]+@[^@\\/]+/)) {\n    var slashes = rest.substr(0, 2) === '//';\n    if (slashes && !(proto && hostlessProtocol[proto])) {\n      rest = rest.substr(2);\n      this.slashes = true;\n    }\n  }\n\n  if (!hostlessProtocol[proto] &&\n      (slashes || (proto && !slashedProtocol[proto]))) {\n\n    // there's a hostname.\n    // the first instance of /, ?, ;, or # ends the host.\n    //\n    // If there is an @ in the hostname, then non-host chars *are* allowed\n    // to the left of the last @ sign, unless some host-ending character\n    // comes *before* the @-sign.\n    // URLs are obnoxious.\n    //\n    // ex:\n    // http://a@b@c/ => user:a@b host:c\n    // http://a@b?@c => user:a host:c path:/?@c\n\n    // v0.12 TODO(isaacs): This is not quite how Chrome does things.\n    // Review our test case against browsers more comprehensively.\n\n    // find the first instance of any hostEndingChars\n    var hostEnd = -1;\n    for (var i = 0; i < hostEndingChars.length; i++) {\n      var hec = rest.indexOf(hostEndingChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n\n    // at this point, either we have an explicit point where the\n    // auth portion cannot go past, or the last @ char is the decider.\n    var auth, atSign;\n    if (hostEnd === -1) {\n      // atSign can be anywhere.\n      atSign = rest.lastIndexOf('@');\n    } else {\n      // atSign must be in auth portion.\n      // http://a@b/c@d => host:b auth:a path:/c@d\n      atSign = rest.lastIndexOf('@', hostEnd);\n    }\n\n    // Now we have a portion which is definitely the auth.\n    // Pull that off.\n    if (atSign !== -1) {\n      auth = rest.slice(0, atSign);\n      rest = rest.slice(atSign + 1);\n      this.auth = decodeURIComponent(auth);\n    }\n\n    // the host is the remaining to the left of the first non-host char\n    hostEnd = -1;\n    for (var i = 0; i < nonHostChars.length; i++) {\n      var hec = rest.indexOf(nonHostChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n    // if we still have not hit it, then the entire thing is a host.\n    if (hostEnd === -1)\n      hostEnd = rest.length;\n\n    this.host = rest.slice(0, hostEnd);\n    rest = rest.slice(hostEnd);\n\n    // pull out port.\n    this.parseHost();\n\n    // we've indicated that there is a hostname,\n    // so even if it's empty, it has to be present.\n    this.hostname = this.hostname || '';\n\n    // if hostname begins with [ and ends with ]\n    // assume that it's an IPv6 address.\n    var ipv6Hostname = this.hostname[0] === '[' &&\n        this.hostname[this.hostname.length - 1] === ']';\n\n    // validate a little.\n    if (!ipv6Hostname) {\n      var hostparts = this.hostname.split(/\\./);\n      for (var i = 0, l = hostparts.length; i < l; i++) {\n        var part = hostparts[i];\n        if (!part) continue;\n        if (!part.match(hostnamePartPattern)) {\n          var newpart = '';\n          for (var j = 0, k = part.length; j < k; j++) {\n            if (part.charCodeAt(j) > 127) {\n              // we replace non-ASCII char with a temporary placeholder\n              // we need this to make sure size of hostname is not\n              // broken by replacing non-ASCII by nothing\n              newpart += 'x';\n            } else {\n              newpart += part[j];\n            }\n          }\n          // we test again with ASCII char only\n          if (!newpart.match(hostnamePartPattern)) {\n            var validParts = hostparts.slice(0, i);\n            var notHost = hostparts.slice(i + 1);\n            var bit = part.match(hostnamePartStart);\n            if (bit) {\n              validParts.push(bit[1]);\n              notHost.unshift(bit[2]);\n            }\n            if (notHost.length) {\n              rest = '/' + notHost.join('.') + rest;\n            }\n            this.hostname = validParts.join('.');\n            break;\n          }\n        }\n      }\n    }\n\n    if (this.hostname.length > hostnameMaxLen) {\n      this.hostname = '';\n    } else {\n      // hostnames are always lower case.\n      this.hostname = this.hostname.toLowerCase();\n    }\n\n    if (!ipv6Hostname) {\n      // IDNA Support: Returns a punycoded representation of \"domain\".\n      // It only converts parts of the domain name that\n      // have non-ASCII characters, i.e. it doesn't matter if\n      // you call it with a domain that already is ASCII-only.\n      this.hostname = punycode.toASCII(this.hostname);\n    }\n\n    var p = this.port ? ':' + this.port : '';\n    var h = this.hostname || '';\n    this.host = h + p;\n    this.href += this.host;\n\n    // strip [ and ] from the hostname\n    // the host field still retains them, though\n    if (ipv6Hostname) {\n      this.hostname = this.hostname.substr(1, this.hostname.length - 2);\n      if (rest[0] !== '/') {\n        rest = '/' + rest;\n      }\n    }\n  }\n\n  // now rest is set to the post-host stuff.\n  // chop off any delim chars.\n  if (!unsafeProtocol[lowerProto]) {\n\n    // First, make 100% sure that any \"autoEscape\" chars get\n    // escaped, even if encodeURIComponent doesn't think they\n    // need to be.\n    for (var i = 0, l = autoEscape.length; i < l; i++) {\n      var ae = autoEscape[i];\n      if (rest.indexOf(ae) === -1)\n        continue;\n      var esc = encodeURIComponent(ae);\n      if (esc === ae) {\n        esc = escape(ae);\n      }\n      rest = rest.split(ae).join(esc);\n    }\n  }\n\n\n  // chop off from the tail first.\n  var hash = rest.indexOf('#');\n  if (hash !== -1) {\n    // got a fragment string.\n    this.hash = rest.substr(hash);\n    rest = rest.slice(0, hash);\n  }\n  var qm = rest.indexOf('?');\n  if (qm !== -1) {\n    this.search = rest.substr(qm);\n    this.query = rest.substr(qm + 1);\n    if (parseQueryString) {\n      this.query = querystring.parse(this.query);\n    }\n    rest = rest.slice(0, qm);\n  } else if (parseQueryString) {\n    // no query string, but parseQueryString still requested\n    this.search = '';\n    this.query = {};\n  }\n  if (rest) this.pathname = rest;\n  if (slashedProtocol[lowerProto] &&\n      this.hostname && !this.pathname) {\n    this.pathname = '/';\n  }\n\n  //to support http.request\n  if (this.pathname || this.search) {\n    var p = this.pathname || '';\n    var s = this.search || '';\n    this.path = p + s;\n  }\n\n  // finally, reconstruct the href based on what has been validated.\n  this.href = this.format();\n  return this;\n};\n\n// format a parsed object into a url string\nfunction urlFormat(obj) {\n  // ensure it's an object, and not a string url.\n  // If it's an obj, this is a no-op.\n  // this way, you can call url_format() on strings\n  // to clean up potentially wonky urls.\n  if (util.isString(obj)) obj = urlParse(obj);\n  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);\n  return obj.format();\n}\n\nUrl.prototype.format = function() {\n  var auth = this.auth || '';\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, ':');\n    auth += '@';\n  }\n\n  var protocol = this.protocol || '',\n      pathname = this.pathname || '',\n      hash = this.hash || '',\n      host = false,\n      query = '';\n\n  if (this.host) {\n    host = auth + this.host;\n  } else if (this.hostname) {\n    host = auth + (this.hostname.indexOf(':') === -1 ?\n        this.hostname :\n        '[' + this.hostname + ']');\n    if (this.port) {\n      host += ':' + this.port;\n    }\n  }\n\n  if (this.query &&\n      util.isObject(this.query) &&\n      Object.keys(this.query).length) {\n    query = querystring.stringify(this.query);\n  }\n\n  var search = this.search || (query && ('?' + query)) || '';\n\n  if (protocol && protocol.substr(-1) !== ':') protocol += ':';\n\n  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.\n  // unless they had them to begin with.\n  if (this.slashes ||\n      (!protocol || slashedProtocol[protocol]) && host !== false) {\n    host = '//' + (host || '');\n    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;\n  } else if (!host) {\n    host = '';\n  }\n\n  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;\n  if (search && search.charAt(0) !== '?') search = '?' + search;\n\n  pathname = pathname.replace(/[?#]/g, function(match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace('#', '%23');\n\n  return protocol + host + pathname + search + hash;\n};\n\nfunction urlResolve(source, relative) {\n  return urlParse(source, false, true).resolve(relative);\n}\n\nUrl.prototype.resolve = function(relative) {\n  return this.resolveObject(urlParse(relative, false, true)).format();\n};\n\nfunction urlResolveObject(source, relative) {\n  if (!source) return relative;\n  return urlParse(source, false, true).resolveObject(relative);\n}\n\nUrl.prototype.resolveObject = function(relative) {\n  if (util.isString(relative)) {\n    var rel = new Url();\n    rel.parse(relative, false, true);\n    relative = rel;\n  }\n\n  var result = new Url();\n  var tkeys = Object.keys(this);\n  for (var tk = 0; tk < tkeys.length; tk++) {\n    var tkey = tkeys[tk];\n    result[tkey] = this[tkey];\n  }\n\n  // hash is always overridden, no matter what.\n  // even href=\"\" will remove it.\n  result.hash = relative.hash;\n\n  // if the relative url is empty, then there's nothing left to do here.\n  if (relative.href === '') {\n    result.href = result.format();\n    return result;\n  }\n\n  // hrefs like //foo/bar always cut to the protocol.\n  if (relative.slashes && !relative.protocol) {\n    // take everything except the protocol from relative\n    var rkeys = Object.keys(relative);\n    for (var rk = 0; rk < rkeys.length; rk++) {\n      var rkey = rkeys[rk];\n      if (rkey !== 'protocol')\n        result[rkey] = relative[rkey];\n    }\n\n    //urlParse appends trailing / to urls like http://www.example.com\n    if (slashedProtocol[result.protocol] &&\n        result.hostname && !result.pathname) {\n      result.path = result.pathname = '/';\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (relative.protocol && relative.protocol !== result.protocol) {\n    // if it's a known url protocol, then changing\n    // the protocol does weird things\n    // first, if it's not file:, then we MUST have a host,\n    // and if there was a path\n    // to begin with, then we MUST have a path.\n    // if it is file:, then the host is dropped,\n    // because that's known to be hostless.\n    // anything else is assumed to be absolute.\n    if (!slashedProtocol[relative.protocol]) {\n      var keys = Object.keys(relative);\n      for (var v = 0; v < keys.length; v++) {\n        var k = keys[v];\n        result[k] = relative[k];\n      }\n      result.href = result.format();\n      return result;\n    }\n\n    result.protocol = relative.protocol;\n    if (!relative.host && !hostlessProtocol[relative.protocol]) {\n      var relPath = (relative.pathname || '').split('/');\n      while (relPath.length && !(relative.host = relPath.shift()));\n      if (!relative.host) relative.host = '';\n      if (!relative.hostname) relative.hostname = '';\n      if (relPath[0] !== '') relPath.unshift('');\n      if (relPath.length < 2) relPath.unshift('');\n      result.pathname = relPath.join('/');\n    } else {\n      result.pathname = relative.pathname;\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    result.host = relative.host || '';\n    result.auth = relative.auth;\n    result.hostname = relative.hostname || relative.host;\n    result.port = relative.port;\n    // to support http.request\n    if (result.pathname || result.search) {\n      var p = result.pathname || '';\n      var s = result.search || '';\n      result.path = p + s;\n    }\n    result.slashes = result.slashes || relative.slashes;\n    result.href = result.format();\n    return result;\n  }\n\n  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),\n      isRelAbs = (\n          relative.host ||\n          relative.pathname && relative.pathname.charAt(0) === '/'\n      ),\n      mustEndAbs = (isRelAbs || isSourceAbs ||\n                    (result.host && relative.pathname)),\n      removeAllDots = mustEndAbs,\n      srcPath = result.pathname && result.pathname.split('/') || [],\n      relPath = relative.pathname && relative.pathname.split('/') || [],\n      psychotic = result.protocol && !slashedProtocol[result.protocol];\n\n  // if the url is a non-slashed url, then relative\n  // links like ../.. should be able\n  // to crawl up to the hostname, as well.  This is strange.\n  // result.protocol has already been set by now.\n  // Later on, put the first path part into the host field.\n  if (psychotic) {\n    result.hostname = '';\n    result.port = null;\n    if (result.host) {\n      if (srcPath[0] === '') srcPath[0] = result.host;\n      else srcPath.unshift(result.host);\n    }\n    result.host = '';\n    if (relative.protocol) {\n      relative.hostname = null;\n      relative.port = null;\n      if (relative.host) {\n        if (relPath[0] === '') relPath[0] = relative.host;\n        else relPath.unshift(relative.host);\n      }\n      relative.host = null;\n    }\n    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');\n  }\n\n  if (isRelAbs) {\n    // it's absolute.\n    result.host = (relative.host || relative.host === '') ?\n                  relative.host : result.host;\n    result.hostname = (relative.hostname || relative.hostname === '') ?\n                      relative.hostname : result.hostname;\n    result.search = relative.search;\n    result.query = relative.query;\n    srcPath = relPath;\n    // fall through to the dot-handling below.\n  } else if (relPath.length) {\n    // it's relative\n    // throw away the existing file, and take the new path instead.\n    if (!srcPath) srcPath = [];\n    srcPath.pop();\n    srcPath = srcPath.concat(relPath);\n    result.search = relative.search;\n    result.query = relative.query;\n  } else if (!util.isNullOrUndefined(relative.search)) {\n    // just pull out the search.\n    // like href='?foo'.\n    // Put this after the other two cases because it simplifies the booleans\n    if (psychotic) {\n      result.hostname = result.host = srcPath.shift();\n      //occationaly the auth can get stuck only in host\n      //this especially happens in cases like\n      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n      var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                       result.host.split('@') : false;\n      if (authInHost) {\n        result.auth = authInHost.shift();\n        result.host = result.hostname = authInHost.shift();\n      }\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    //to support http.request\n    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n      result.path = (result.pathname ? result.pathname : '') +\n                    (result.search ? result.search : '');\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  if (!srcPath.length) {\n    // no path at all.  easy.\n    // we've already handled the other stuff above.\n    result.pathname = null;\n    //to support http.request\n    if (result.search) {\n      result.path = '/' + result.search;\n    } else {\n      result.path = null;\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  // if a url ENDs in . or .., then it must get a trailing slash.\n  // however, if it ends in anything else non-slashy,\n  // then it must NOT get a trailing slash.\n  var last = srcPath.slice(-1)[0];\n  var hasTrailingSlash = (\n      (result.host || relative.host || srcPath.length > 1) &&\n      (last === '.' || last === '..') || last === '');\n\n  // strip single dots, resolve double dots to parent dir\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = srcPath.length; i >= 0; i--) {\n    last = srcPath[i];\n    if (last === '.') {\n      srcPath.splice(i, 1);\n    } else if (last === '..') {\n      srcPath.splice(i, 1);\n      up++;\n    } else if (up) {\n      srcPath.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (!mustEndAbs && !removeAllDots) {\n    for (; up--; up) {\n      srcPath.unshift('..');\n    }\n  }\n\n  if (mustEndAbs && srcPath[0] !== '' &&\n      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {\n    srcPath.unshift('');\n  }\n\n  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {\n    srcPath.push('');\n  }\n\n  var isAbsolute = srcPath[0] === '' ||\n      (srcPath[0] && srcPath[0].charAt(0) === '/');\n\n  // put the host back\n  if (psychotic) {\n    result.hostname = result.host = isAbsolute ? '' :\n                                    srcPath.length ? srcPath.shift() : '';\n    //occationaly the auth can get stuck only in host\n    //this especially happens in cases like\n    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n    var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                     result.host.split('@') : false;\n    if (authInHost) {\n      result.auth = authInHost.shift();\n      result.host = result.hostname = authInHost.shift();\n    }\n  }\n\n  mustEndAbs = mustEndAbs || (result.host && srcPath.length);\n\n  if (mustEndAbs && !isAbsolute) {\n    srcPath.unshift('');\n  }\n\n  if (!srcPath.length) {\n    result.pathname = null;\n    result.path = null;\n  } else {\n    result.pathname = srcPath.join('/');\n  }\n\n  //to support request.http\n  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n    result.path = (result.pathname ? result.pathname : '') +\n                  (result.search ? result.search : '');\n  }\n  result.auth = relative.auth || result.auth;\n  result.slashes = result.slashes || relative.slashes;\n  result.href = result.format();\n  return result;\n};\n\nUrl.prototype.parseHost = function() {\n  var host = this.host;\n  var port = portPattern.exec(host);\n  if (port) {\n    port = port[0];\n    if (port !== ':') {\n      this.port = port.substr(1);\n    }\n    host = host.substr(0, host.length - port.length);\n  }\n  if (host) this.hostname = host;\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/url/url.js?");

/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = {\n  isString: function(arg) {\n    return typeof(arg) === 'string';\n  },\n  isObject: function(arg) {\n    return typeof(arg) === 'object' && arg !== null;\n  },\n  isNull: function(arg) {\n    return arg === null;\n  },\n  isNullOrUndefined: function(arg) {\n    return arg == null;\n  }\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/url/util.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebSocketClient)\n/* harmony export */ });\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar WebSocketClient = /*#__PURE__*/function () {\n  function WebSocketClient(url) {\n    _classCallCheck(this, WebSocketClient);\n\n    this.client = new WebSocket(url);\n\n    this.client.onerror = function (error) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);\n    };\n  }\n\n  _createClass(WebSocketClient, [{\n    key: \"onOpen\",\n    value: function onOpen(f) {\n      this.client.onopen = f;\n    }\n  }, {\n    key: \"onClose\",\n    value: function onClose(f) {\n      this.client.onclose = f;\n    } // call f with the message string as the first argument\n\n  }, {\n    key: \"onMessage\",\n    value: function onMessage(f) {\n      this.client.onmessage = function (e) {\n        f(e.data);\n      };\n    }\n  }]);\n\n  return WebSocketClient;\n}();\n\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/clients/WebSocketClient.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __resourceQuery = \"?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ \"./node_modules/webpack/hot/log.js\");\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ \"./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js\");\n/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ \"./node_modules/webpack-dev-server/client/utils/parseURL.js\");\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ \"./node_modules/webpack-dev-server/client/socket.js\");\n/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ \"./node_modules/webpack-dev-server/client/overlay.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ \"./node_modules/webpack-dev-server/client/utils/sendMessage.js\");\n/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ \"./node_modules/webpack-dev-server/client/utils/reloadApp.js\");\n/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ \"./node_modules/webpack-dev-server/client/utils/createSocketURL.js\");\n/* global __resourceQuery, __webpack_hash__ */\n\n\n\n\n\n\n\n\n\nvar status = {\n  isUnloading: false,\n  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement\n  // eslint-disable-next-line camelcase\n  currentHash:  true ? __webpack_require__.h() : 0\n}; // console.log(__webpack_hash__);\n\nvar options = {\n  hot: false,\n  liveReload: false,\n  progress: false,\n  overlay: false\n};\nvar parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__.default)(__resourceQuery);\n\nif (parsedResourceQuery.logging) {\n  options.logging = parsedResourceQuery.logging;\n}\n\nfunction setAllLogLevel(level) {\n  // This is needed because the HMR logger operate separately from dev server logger\n  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === \"verbose\" || level === \"log\" ? \"info\" : level);\n  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);\n}\n\nif (options.logging) {\n  setAllLogLevel(options.logging);\n}\n\nself.addEventListener(\"beforeunload\", function () {\n  status.isUnloading = true;\n});\nvar onSocketMessage = {\n  hot: function hot() {\n    if (parsedResourceQuery.hot === \"false\") {\n      return;\n    }\n\n    options.hot = true;\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Hot Module Replacement enabled.\");\n  },\n  liveReload: function liveReload() {\n    if (parsedResourceQuery[\"live-reload\"] === \"false\") {\n      return;\n    }\n\n    options.liveReload = true;\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Live Reloading enabled.\");\n  },\n  invalid: function invalid() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"App updated. Recompiling...\"); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.\n\n    if (options.overlay) {\n      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();\n    }\n\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Invalid\");\n  },\n  hash: function hash(_hash) {\n    status.currentHash = _hash;\n  },\n  logging: setAllLogLevel,\n  overlay: function overlay(value) {\n    if (typeof document === \"undefined\") {\n      return;\n    }\n\n    options.overlay = value;\n  },\n  progress: function progress(_progress) {\n    options.progress = _progress;\n  },\n  \"progress-update\": function progressUpdate(data) {\n    if (options.progress) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(data.pluginName ? \"[\".concat(data.pluginName, \"] \") : \"\").concat(data.percent, \"% - \").concat(data.msg, \".\"));\n    }\n\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Progress\", data);\n  },\n  \"still-ok\": function stillOk() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Nothing changed.\");\n\n    if (options.overlay) {\n      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();\n    }\n\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"StillOk\");\n  },\n  ok: function ok() {\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Ok\");\n\n    if (options.overlay) {\n      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();\n    }\n\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__.default)(options, status);\n  },\n  // TODO: remove in v5 in favor of 'static-changed'\n  \"content-changed\": function contentChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  \"static-changed\": function staticChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  warnings: function warnings(_warnings) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(\"Warnings while compiling.\");\n\n    var strippedWarnings = _warnings.map(function (warning) {\n      return _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(warning.message ? warning.message : warning);\n    });\n\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Warnings\", strippedWarnings);\n\n    for (var i = 0; i < strippedWarnings.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(strippedWarnings[i]);\n    }\n\n    var needShowOverlay = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.warnings;\n\n    if (needShowOverlay) {\n      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)(_warnings, \"warnings\");\n    }\n\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__.default)(options, status);\n  },\n  errors: function errors(_errors) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Errors while compiling. Reload prevented.\");\n\n    var strippedErrors = _errors.map(function (error) {\n      return _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(error.message ? error.message : error);\n    });\n\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Errors\", strippedErrors);\n\n    for (var i = 0; i < strippedErrors.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(strippedErrors[i]);\n    }\n\n    var needShowOverlay = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.errors;\n\n    if (needShowOverlay) {\n      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)(_errors, \"errors\");\n    }\n  },\n  error: function error(_error) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);\n  },\n  close: function close() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Disconnected!\");\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__.default)(\"Close\");\n  }\n};\nvar socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__.default)(parsedResourceQuery);\n(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__.default)(socketURL, onSocketMessage);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/index.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/******/ (function() { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./client-src/modules/logger/SyncBailHookFake.js\":\n/*!*******************************************************!*\\\n  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!\n  \\*******************************************************/\n/***/ (function(module) {\n\n\n/**\n * Client stub for tapable SyncBailHook\n */\n\nmodule.exports = function clientTapableSyncBailHook() {\n  return {\n    call: function call() {}\n  };\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/Logger.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/Logger.js ***!\n  \\****************************************************/\n/***/ (function(__unused_webpack_module, exports) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\n\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\n\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\n\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\n\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n\n  for (var i = 0, arr2 = new Array(len); i < len; i++) {\n    arr2[i] = arr[i];\n  }\n\n  return arr2;\n}\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nvar LogType = Object.freeze({\n  error: \"error\",\n  // message, c style arguments\n  warn: \"warn\",\n  // message, c style arguments\n  info: \"info\",\n  // message, c style arguments\n  log: \"log\",\n  // message, c style arguments\n  debug: \"debug\",\n  // message, c style arguments\n  trace: \"trace\",\n  // no arguments\n  group: \"group\",\n  // [label]\n  groupCollapsed: \"groupCollapsed\",\n  // [label]\n  groupEnd: \"groupEnd\",\n  // [label]\n  profile: \"profile\",\n  // [profileName]\n  profileEnd: \"profileEnd\",\n  // [profileName]\n  time: \"time\",\n  // name, time as [seconds, nanoseconds]\n  clear: \"clear\",\n  // no arguments\n  status: \"status\" // message, arguments\n\n});\nexports.LogType = LogType;\n/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */\n\nvar LOG_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger raw log method\");\nvar TIMERS_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger times\");\nvar TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger aggregated times\");\n\nvar WebpackLogger = /*#__PURE__*/function () {\n  /**\n   * @param {function(LogTypeEnum, any[]=): void} log log function\n   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger\n   */\n  function WebpackLogger(log, getChildLogger) {\n    _classCallCheck(this, WebpackLogger);\n\n    this[LOG_SYMBOL] = log;\n    this.getChildLogger = getChildLogger;\n  }\n\n  _createClass(WebpackLogger, [{\n    key: \"error\",\n    value: function error() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      this[LOG_SYMBOL](LogType.error, args);\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      this[LOG_SYMBOL](LogType.warn, args);\n    }\n  }, {\n    key: \"info\",\n    value: function info() {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      this[LOG_SYMBOL](LogType.info, args);\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n\n      this[LOG_SYMBOL](LogType.log, args);\n    }\n  }, {\n    key: \"debug\",\n    value: function debug() {\n      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {\n        args[_key5] = arguments[_key5];\n      }\n\n      this[LOG_SYMBOL](LogType.debug, args);\n    }\n  }, {\n    key: \"assert\",\n    value: function assert(assertion) {\n      if (!assertion) {\n        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n          args[_key6 - 1] = arguments[_key6];\n        }\n\n        this[LOG_SYMBOL](LogType.error, args);\n      }\n    }\n  }, {\n    key: \"trace\",\n    value: function trace() {\n      this[LOG_SYMBOL](LogType.trace, [\"Trace\"]);\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this[LOG_SYMBOL](LogType.clear);\n    }\n  }, {\n    key: \"status\",\n    value: function status() {\n      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {\n        args[_key7] = arguments[_key7];\n      }\n\n      this[LOG_SYMBOL](LogType.status, args);\n    }\n  }, {\n    key: \"group\",\n    value: function group() {\n      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {\n        args[_key8] = arguments[_key8];\n      }\n\n      this[LOG_SYMBOL](LogType.group, args);\n    }\n  }, {\n    key: \"groupCollapsed\",\n    value: function groupCollapsed() {\n      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {\n        args[_key9] = arguments[_key9];\n      }\n\n      this[LOG_SYMBOL](LogType.groupCollapsed, args);\n    }\n  }, {\n    key: \"groupEnd\",\n    value: function groupEnd() {\n      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {\n        args[_key10] = arguments[_key10];\n      }\n\n      this[LOG_SYMBOL](LogType.groupEnd, args);\n    }\n  }, {\n    key: \"profile\",\n    value: function profile(label) {\n      this[LOG_SYMBOL](LogType.profile, [label]);\n    }\n  }, {\n    key: \"profileEnd\",\n    value: function profileEnd(label) {\n      this[LOG_SYMBOL](LogType.profileEnd, [label]);\n    }\n  }, {\n    key: \"time\",\n    value: function time(label) {\n      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();\n      this[TIMERS_SYMBOL].set(label, process.hrtime());\n    }\n  }, {\n    key: \"timeLog\",\n    value: function timeLog(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeLog()\"));\n      }\n\n      var time = process.hrtime(prev);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeEnd\",\n    value: function timeEnd(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeEnd()\"));\n      }\n\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeAggregate\",\n    value: function timeAggregate(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeAggregate()\"));\n      }\n\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();\n      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n\n      if (current !== undefined) {\n        if (time[1] + current[1] > 1e9) {\n          time[0] += current[0] + 1;\n          time[1] = time[1] - 1e9 + current[1];\n        } else {\n          time[0] += current[0];\n          time[1] += current[1];\n        }\n      }\n\n      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);\n    }\n  }, {\n    key: \"timeAggregateEnd\",\n    value: function timeAggregateEnd(label) {\n      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;\n      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (time === undefined) return;\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }]);\n\n  return WebpackLogger;\n}();\n\nexports.Logger = WebpackLogger;\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\":\n/*!*****************************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!\n  \\*****************************************************************/\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10262__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\n\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\n\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\n\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\n\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n\n  for (var i = 0, arr2 = new Array(len); i < len; i++) {\n    arr2[i] = arr[i];\n  }\n\n  return arr2;\n}\n\nvar _require = __nested_webpack_require_10262__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n    LogType = _require.LogType;\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterItemTypes} FilterItemTypes */\n\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterTypes} FilterTypes */\n\n/** @typedef {import(\"./Logger\").LogTypeEnum} LogTypeEnum */\n\n/** @typedef {function(string): boolean} FilterFunction */\n\n/**\n * @typedef {Object} LoggerConsole\n * @property {function(): void} clear\n * @property {function(): void} trace\n * @property {(...args: any[]) => void} info\n * @property {(...args: any[]) => void} log\n * @property {(...args: any[]) => void} warn\n * @property {(...args: any[]) => void} error\n * @property {(...args: any[]) => void=} debug\n * @property {(...args: any[]) => void=} group\n * @property {(...args: any[]) => void=} groupCollapsed\n * @property {(...args: any[]) => void=} groupEnd\n * @property {(...args: any[]) => void=} status\n * @property {(...args: any[]) => void=} profile\n * @property {(...args: any[]) => void=} profileEnd\n * @property {(...args: any[]) => void=} logTime\n */\n\n/**\n * @typedef {Object} LoggerOptions\n * @property {false|true|\"none\"|\"error\"|\"warn\"|\"info\"|\"log\"|\"verbose\"} level loglevel\n * @property {FilterTypes|boolean} debug filter for debug logging\n * @property {LoggerConsole} console the console to log to\n */\n\n/**\n * @param {FilterItemTypes} item an input item\n * @returns {FilterFunction} filter function\n */\n\n\nvar filterToFunction = function filterToFunction(item) {\n  if (typeof item === \"string\") {\n    var regExp = new RegExp(\"[\\\\\\\\/]\".concat(item.replace( // eslint-disable-next-line no-useless-escape\n    /[-[\\]{}()*+?.\\\\^$|]/g, \"\\\\$&\"), \"([\\\\\\\\/]|$|!|\\\\?)\"));\n    return function (ident) {\n      return regExp.test(ident);\n    };\n  }\n\n  if (item && typeof item === \"object\" && typeof item.test === \"function\") {\n    return function (ident) {\n      return item.test(ident);\n    };\n  }\n\n  if (typeof item === \"function\") {\n    return item;\n  }\n\n  if (typeof item === \"boolean\") {\n    return function () {\n      return item;\n    };\n  }\n};\n/**\n * @enum {number}\n */\n\n\nvar LogLevel = {\n  none: 6,\n  false: 6,\n  error: 5,\n  warn: 4,\n  info: 3,\n  log: 2,\n  true: 2,\n  verbose: 1\n};\n/**\n * @param {LoggerOptions} options options object\n * @returns {function(string, LogTypeEnum, any[]): void} logging function\n */\n\nmodule.exports = function (_ref) {\n  var _ref$level = _ref.level,\n      level = _ref$level === void 0 ? \"info\" : _ref$level,\n      _ref$debug = _ref.debug,\n      debug = _ref$debug === void 0 ? false : _ref$debug,\n      console = _ref.console;\n  var debugFilters = typeof debug === \"boolean\" ? [function () {\n    return debug;\n  }] :\n  /** @type {FilterItemTypes[]} */\n  [].concat(debug).map(filterToFunction);\n  /** @type {number} */\n\n  var loglevel = LogLevel[\"\".concat(level)] || 0;\n  /**\n   * @param {string} name name of the logger\n   * @param {LogTypeEnum} type type of the log entry\n   * @param {any[]} args arguments of the log entry\n   * @returns {void}\n   */\n\n  var logger = function logger(name, type, args) {\n    var labeledArgs = function labeledArgs() {\n      if (Array.isArray(args)) {\n        if (args.length > 0 && typeof args[0] === \"string\") {\n          return [\"[\".concat(name, \"] \").concat(args[0])].concat(_toConsumableArray(args.slice(1)));\n        } else {\n          return [\"[\".concat(name, \"]\")].concat(_toConsumableArray(args));\n        }\n      } else {\n        return [];\n      }\n    };\n\n    var debug = debugFilters.some(function (f) {\n      return f(name);\n    });\n\n    switch (type) {\n      case LogType.debug:\n        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins\n\n        if (typeof console.debug === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.debug.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n\n        break;\n\n      case LogType.log:\n        if (!debug && loglevel > LogLevel.log) return;\n        console.log.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n\n      case LogType.info:\n        if (!debug && loglevel > LogLevel.info) return;\n        console.info.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n\n      case LogType.warn:\n        if (!debug && loglevel > LogLevel.warn) return;\n        console.warn.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n\n      case LogType.error:\n        if (!debug && loglevel > LogLevel.error) return;\n        console.error.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n\n      case LogType.trace:\n        if (!debug) return;\n        console.trace();\n        break;\n\n      case LogType.groupCollapsed:\n        if (!debug && loglevel > LogLevel.log) return;\n\n        if (!debug && loglevel > LogLevel.verbose) {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          if (typeof console.groupCollapsed === \"function\") {\n            // eslint-disable-next-line node/no-unsupported-features/node-builtins\n            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));\n          } else {\n            console.log.apply(console, _toConsumableArray(labeledArgs()));\n          }\n\n          break;\n        }\n\n      // falls through\n\n      case LogType.group:\n        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins\n\n        if (typeof console.group === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.group.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n\n        break;\n\n      case LogType.groupEnd:\n        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins\n\n        if (typeof console.groupEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.groupEnd();\n        }\n\n        break;\n\n      case LogType.time:\n        {\n          if (!debug && loglevel > LogLevel.log) return;\n          var ms = args[1] * 1000 + args[2] / 1000000;\n          var msg = \"[\".concat(name, \"] \").concat(args[0], \": \").concat(ms, \" ms\");\n\n          if (typeof console.logTime === \"function\") {\n            console.logTime(msg);\n          } else {\n            console.log(msg);\n          }\n\n          break;\n        }\n\n      case LogType.profile:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profile === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profile.apply(console, _toConsumableArray(labeledArgs()));\n        }\n\n        break;\n\n      case LogType.profileEnd:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profileEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));\n        }\n\n        break;\n\n      case LogType.clear:\n        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins\n\n        if (typeof console.clear === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.clear();\n        }\n\n        break;\n\n      case LogType.status:\n        if (!debug && loglevel > LogLevel.info) return;\n\n        if (typeof console.status === \"function\") {\n          if (args.length === 0) {\n            console.status();\n          } else {\n            console.status.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        } else {\n          if (args.length !== 0) {\n            console.info.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        }\n\n        break;\n\n      default:\n        throw new Error(\"Unexpected LogType \".concat(type));\n    }\n  };\n\n  return logger;\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/runtime.js\":\n/*!*****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/runtime.js ***!\n  \\*****************************************************/\n/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20349__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\nfunction _extends() {\n  _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nvar SyncBailHook = __nested_webpack_require_20349__(/*! tapable/lib/SyncBailHook */ \"./client-src/modules/logger/SyncBailHookFake.js\");\n\nvar _require = __nested_webpack_require_20349__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n    Logger = _require.Logger;\n\nvar createConsoleLogger = __nested_webpack_require_20349__(/*! ./createConsoleLogger */ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\");\n/** @type {createConsoleLogger.LoggerOptions} */\n\n\nvar currentDefaultLoggerOptions = {\n  level: \"info\",\n  debug: false,\n  console: console\n};\nvar currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n/**\n * @param {string} name name of the logger\n * @returns {Logger} a logger\n */\n\nexports.getLogger = function (name) {\n  return new Logger(function (type, args) {\n    if (exports.hooks.log.call(name, type, args) === undefined) {\n      currentDefaultLogger(name, type, args);\n    }\n  }, function (childName) {\n    return exports.getLogger(\"\".concat(name, \"/\").concat(childName));\n  });\n};\n/**\n * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options\n * @returns {void}\n */\n\n\nexports.configureDefaultLogger = function (options) {\n  _extends(currentDefaultLoggerOptions, options);\n\n  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n};\n\nexports.hooks = {\n  log: new SyncBailHook([\"origin\", \"type\", \"args\"])\n};\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_22465__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22465__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_22465__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_22465__.o(definition, key) && !__nested_webpack_require_22465__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_22465__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t!function() {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_22465__.r = function(exports) {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n!function() {\n/*!********************************************!*\\\n  !*** ./client-src/modules/logger/index.js ***!\n  \\********************************************/\n__nested_webpack_require_22465__.r(__webpack_exports__);\n/* harmony export */ __nested_webpack_require_22465__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22465__(/*! webpack/lib/logging/runtime.js */ \"./node_modules/webpack/lib/logging/runtime.js\");\n\n}();\nvar __webpack_export_target__ = exports;\nfor(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];\nif(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/modules/logger/index.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/******/ (function() { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./node_modules/strip-ansi/index.js\":\n/*!******************************************!*\\\n  !*** ./node_modules/strip-ansi/index.js ***!\n  \\******************************************/\n/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {\n\n__nested_webpack_require_368__.r(__webpack_exports__);\n/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ stripAnsi; }\n/* harmony export */ });\n/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ \"./node_modules/strip-ansi/node_modules/ansi-regex/index.js\");\n\nfunction stripAnsi(string) {\n  if (typeof string !== 'string') {\n    throw new TypeError(\"Expected a `string`, got `\".concat(typeof string, \"`\"));\n  }\n\n  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__.default)(), '');\n}\n\n/***/ }),\n\n/***/ \"./node_modules/strip-ansi/node_modules/ansi-regex/index.js\":\n/*!******************************************************************!*\\\n  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!\n  \\******************************************************************/\n/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1384__) {\n\n__nested_webpack_require_1384__.r(__webpack_exports__);\n/* harmony export */ __nested_webpack_require_1384__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ansiRegex; }\n/* harmony export */ });\nfunction ansiRegex() {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      _ref$onlyFirst = _ref.onlyFirst,\n      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;\n\n  var pattern = [\"[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:[a-zA-Z\\\\d]*(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)\", '(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'].join('|');\n  return new RegExp(pattern, onlyFirst ? undefined : 'g');\n}\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_2316__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2316__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_2316__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_2316__.o(definition, key) && !__nested_webpack_require_2316__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_2316__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t!function() {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_2316__.r = function(exports) {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n!function() {\n/*!************************************************!*\\\n  !*** ./client-src/modules/strip-ansi/index.js ***!\n  \\************************************************/\n__nested_webpack_require_2316__.r(__webpack_exports__);\n/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2316__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__.default);\n}();\nvar __webpack_export_target__ = exports;\nfor(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];\nif(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"show\": () => (/* binding */ show),\n/* harmony export */   \"hide\": () => (/* binding */ hide)\n/* harmony export */ });\n/* harmony import */ var ansi_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html */ \"./node_modules/ansi-html/index.js\");\n/* harmony import */ var ansi_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/lib/index.js\");\n/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);\n// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)\n// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).\n\n\nvar colors = {\n  reset: [\"transparent\", \"transparent\"],\n  black: \"181818\",\n  red: \"E36049\",\n  green: \"B3CB74\",\n  yellow: \"FFD080\",\n  blue: \"7CAFC2\",\n  magenta: \"7FACCA\",\n  cyan: \"C3C2EF\",\n  lightgrey: \"EBE7E3\",\n  darkgrey: \"6D7891\"\n};\nvar iframeContainerElement;\nvar containerElement;\nvar onLoadQueue = [];\nansi_html__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);\n\nfunction createContainer() {\n  iframeContainerElement = document.createElement(\"iframe\");\n  iframeContainerElement.id = \"webpack-dev-server-client-overlay\";\n  iframeContainerElement.src = \"about:blank\";\n  iframeContainerElement.style.position = \"fixed\";\n  iframeContainerElement.style.left = 0;\n  iframeContainerElement.style.top = 0;\n  iframeContainerElement.style.right = 0;\n  iframeContainerElement.style.bottom = 0;\n  iframeContainerElement.style.width = \"100vw\";\n  iframeContainerElement.style.height = \"100vh\";\n  iframeContainerElement.style.border = \"none\";\n  iframeContainerElement.style.zIndex = 9999999999;\n\n  iframeContainerElement.onload = function () {\n    containerElement = iframeContainerElement.contentDocument.createElement(\"div\");\n    containerElement.id = \"webpack-dev-server-client-overlay-div\";\n    containerElement.style.position = \"fixed\";\n    containerElement.style.boxSizing = \"border-box\";\n    containerElement.style.left = 0;\n    containerElement.style.top = 0;\n    containerElement.style.right = 0;\n    containerElement.style.bottom = 0;\n    containerElement.style.width = \"100vw\";\n    containerElement.style.height = \"100vh\";\n    containerElement.style.backgroundColor = \"rgba(0, 0, 0, 0.85)\";\n    containerElement.style.color = \"#E8E8E8\";\n    containerElement.style.fontFamily = \"Menlo, Consolas, monospace\";\n    containerElement.style.fontSize = \"large\";\n    containerElement.style.padding = \"2rem\";\n    containerElement.style.lineHeight = \"1.2\";\n    containerElement.style.whiteSpace = \"pre-wrap\";\n    containerElement.style.overflow = \"auto\";\n    var headerElement = document.createElement(\"span\");\n    headerElement.innerText = \"Compiled with problems:\";\n    var closeButtonElement = document.createElement(\"button\");\n    closeButtonElement.innerText = \"X\";\n    closeButtonElement.style.background = \"transparent\";\n    closeButtonElement.style.border = \"none\";\n    closeButtonElement.style.fontSize = \"20px\";\n    closeButtonElement.style.fontWeight = \"bold\";\n    closeButtonElement.style.color = \"white\";\n    closeButtonElement.style.cursor = \"pointer\";\n    closeButtonElement.style.cssFloat = \"right\";\n    closeButtonElement.style.styleFloat = \"right\";\n    closeButtonElement.addEventListener(\"click\", function () {\n      hide();\n    });\n    containerElement.appendChild(headerElement);\n    containerElement.appendChild(closeButtonElement);\n    containerElement.appendChild(document.createElement(\"br\"));\n    containerElement.appendChild(document.createElement(\"br\"));\n    iframeContainerElement.contentDocument.body.appendChild(containerElement);\n    onLoadQueue.forEach(function (onLoad) {\n      onLoad(containerElement);\n    });\n    onLoadQueue = [];\n    iframeContainerElement.onload = null;\n  };\n\n  document.body.appendChild(iframeContainerElement);\n}\n\nfunction ensureOverlayExists(callback) {\n  if (containerElement) {\n    // Everything is ready, call the callback right away.\n    callback(containerElement);\n    return;\n  }\n\n  onLoadQueue.push(callback);\n\n  if (iframeContainerElement) {\n    return;\n  }\n\n  createContainer();\n} // Successful compilation.\n\n\nfunction hide() {\n  if (!iframeContainerElement) {\n    return;\n  } // Clean up and reset internal state.\n\n\n  document.body.removeChild(iframeContainerElement);\n  iframeContainerElement = null;\n  containerElement = null;\n} // Compilation with errors (e.g. syntax error or missing modules).\n\n\nfunction show(messages, type) {\n  ensureOverlayExists(function () {\n    messages.forEach(function (message) {\n      var entryElement = document.createElement(\"div\");\n      var typeElement = document.createElement(\"span\");\n      typeElement.innerText = type === \"warnings\" ? \"Warning:\" : \"Error:\";\n      typeElement.style.color = \"#\".concat(colors.red); // Make it look similar to our terminal.\n\n      var errorMessage = message.message || messages[0];\n      var text = ansi_html__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(errorMessage));\n      var messageTextNode = document.createElement(\"div\");\n      messageTextNode.innerHTML = text;\n      entryElement.appendChild(typeElement);\n      entryElement.appendChild(document.createElement(\"br\"));\n      entryElement.appendChild(document.createElement(\"br\"));\n      entryElement.appendChild(messageTextNode);\n      entryElement.appendChild(document.createElement(\"br\"));\n      entryElement.appendChild(document.createElement(\"br\"));\n      containerElement.appendChild(entryElement);\n    });\n  });\n}\n\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/overlay.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* global __webpack_dev_server_client__ */\n // this WebsocketClient is here as a default fallback, in case the client is not injected\n\n/* eslint-disable camelcase */\n\nvar Client = // eslint-disable-next-line camelcase, no-nested-ternary\ntypeof __webpack_dev_server_client__ !== \"undefined\" ? // eslint-disable-next-line camelcase\ntypeof __webpack_dev_server_client__.default !== \"undefined\" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__.default;\n/* eslint-enable camelcase */\n\nvar retries = 0;\nvar client = null;\n\nvar socket = function initSocket(url, handlers) {\n  client = new Client(url);\n  client.onOpen(function () {\n    retries = 0;\n  });\n  client.onClose(function () {\n    if (retries === 0) {\n      handlers.close();\n    } // Try to reconnect.\n\n\n    client = null; // After 10 retries stop trying, to prevent logspam.\n\n    if (retries <= 10) {\n      // Exponentially increase timeout to reconnect.\n      // Respectfully copied from the package `got`.\n      // eslint-disable-next-line no-mixed-operators, no-restricted-properties\n      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;\n      retries += 1;\n      setTimeout(function () {\n        socket(url, handlers);\n      }, retryInMs);\n    }\n  });\n  client.onMessage(function (data) {\n    var message = JSON.parse(data);\n\n    if (handlers[message.type]) {\n      handlers[message.type](message.data);\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/socket.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ \"./node_modules/url/url.js\");\n // We handle legacy API that is Node.js specific, and a newer API that implements the same WHATWG URL Standard used by web browsers\n// Please look at https://nodejs.org/api/url.html#url_url_strings_and_url_objects\n\nfunction createSocketURL(parsedURL) {\n  var hostname = parsedURL.hostname; // Node.js module parses it as `::`\n  // `new URL(urlString, [baseURLstring])` parses it as '[::]'\n\n  var isInAddrAny = hostname === \"0.0.0.0\" || hostname === \"::\" || hostname === \"[::]\"; // why do we need this check?\n  // hostname n/a for file protocol (example, when using electron, ionic)\n  // see: https://github.com/webpack/webpack-dev-server/pull/384\n\n  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf(\"http\") === 0) {\n    hostname = self.location.hostname;\n  }\n\n  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.\n\n  if (socketURLProtocol === \"auto:\" || hostname && isInAddrAny && self.location.protocol === \"https:\") {\n    socketURLProtocol = self.location.protocol;\n  }\n\n  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, \"ws\");\n  var socketURLAuth = \"\"; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property\n  // Parse authentication credentials in case we need them\n\n  if (parsedURL.username) {\n    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,\n    // we only include password if the username is not empty.\n\n    if (parsedURL.password) {\n      // Result: <username>:<password>\n      socketURLAuth = socketURLAuth.concat(\":\", parsedURL.password);\n    }\n  } // In case the host is a raw IPv6 address, it can be enclosed in\n  // the brackets as the brackets are needed in the final URL string.\n  // Need to remove those as url.format blindly adds its own set of brackets\n  // if the host string contains colons. That would lead to non-working\n  // double brackets (e.g. [[::]]) host\n  //\n  // All of these web socket url params are optionally passed in through resourceQuery,\n  // so we need to fall back to the default if they are not provided\n\n\n  var socketURLHostname = (hostname || self.location.hostname || \"localhost\").replace(/^\\[(.*)\\]$/, \"$1\");\n  var socketURLPort = parsedURL.port;\n\n  if (!socketURLPort || socketURLPort === \"0\") {\n    socketURLPort = self.location.port;\n  } // If path is provided it'll be passed in via the resourceQuery as a\n  // query param so it has to be parsed out of the querystring in order for the\n  // client to open the socket to the correct location.\n\n\n  var socketURLPathname = \"/ws\";\n\n  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {\n    socketURLPathname = parsedURL.pathname;\n  }\n\n  return url__WEBPACK_IMPORTED_MODULE_0__.format({\n    protocol: socketURLProtocol,\n    auth: socketURLAuth,\n    hostname: socketURLHostname,\n    port: socketURLPort,\n    pathname: socketURLPathname,\n    slashes: true\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/createSocketURL.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction getCurrentScriptSource() {\n  // `document.currentScript` is the most accurate way to find the current script,\n  // but is not supported in all browsers.\n  if (document.currentScript) {\n    return document.currentScript.getAttribute(\"src\");\n  } // Fallback to getting all scripts running in the document.\n\n\n  var scriptElements = document.scripts || [];\n  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {\n    return element.getAttribute(\"src\");\n  });\n\n  if (scriptElementsWithSrc.length > 0) {\n    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];\n    return currentScript.getAttribute(\"src\");\n  } // Fail as there was no script to use.\n\n\n  throw new Error(\"[webpack-dev-server] Failed to get current script source.\");\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"log\": () => (/* binding */ log),\n/* harmony export */   \"setLogLevel\": () => (/* binding */ setLogLevel)\n/* harmony export */ });\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ \"./node_modules/webpack-dev-server/client/modules/logger/index.js\");\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar name = \"webpack-dev-server\"; // default level is set on the client side, so it does not need\n// to be set by the CLI or API\n\nvar defaultLevel = \"info\";\n\nfunction setLogLevel(level) {\n  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({\n    level: level\n  });\n}\n\nsetLogLevel(defaultLevel);\nvar log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/log.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ \"./node_modules/url/url.js\");\n/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ \"./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js\");\n\n\n\nfunction parseURL(resourceQuery) {\n  var options = {};\n\n  if (typeof resourceQuery === \"string\" && resourceQuery !== \"\") {\n    var searchParams = resourceQuery.substr(1).split(\"&\");\n\n    for (var i = 0; i < searchParams.length; i++) {\n      var pair = searchParams[i].split(\"=\");\n      options[pair[0]] = decodeURIComponent(pair[1]);\n    }\n  } else {\n    // Else, get the url from the <script> this file was called with.\n    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n    if (scriptSource) {\n      var scriptSourceURL;\n\n      try {\n        // The placeholder `baseURL` with `window.location.href`,\n        // is to allow parsing of path-relative or protocol-relative URLs,\n        // and will have no effect if `scriptSource` is a fully valid URL.\n        scriptSourceURL = new URL(scriptSource, self.location.href);\n      } catch (error) {// URL parsing failed, do nothing.\n        // We will still proceed to see if we can recover using `resourceQuery`\n      }\n\n      if (scriptSourceURL) {\n        options = scriptSourceURL;\n        options.fromCurrentScript = true;\n      }\n    } else {\n      options = url__WEBPACK_IMPORTED_MODULE_0__.parse(self.location.href, true, true);\n      options.fromCurrentScript = true;\n    }\n  }\n\n  return options;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/parseURL.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ \"./node_modules/webpack/hot/emitter.js\");\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* global __webpack_hash__ */\n\n\n\nfunction reloadApp(_ref, status) {\n  var hot = _ref.hot,\n      liveReload = _ref.liveReload;\n\n  if (status.isUnloading) {\n    return;\n  } // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement plugin\n\n\n  var webpackHash = // eslint-disable-next-line camelcase\n   true ? // eslint-disable-next-line camelcase\n  __webpack_require__.h() : 0;\n  var isInitial = status.currentHash.indexOf(webpackHash) === 0;\n\n  if (isInitial) {\n    var isLegacyInitial = webpackHash === \"\" && hot === false && liveReload === true;\n\n    if (isLegacyInitial) {\n      status.previousHash = status.currentHash;\n    }\n\n    return;\n  }\n\n  function applyReload(rootWindow, intervalId) {\n    clearInterval(intervalId);\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App updated. Reloading...\");\n    rootWindow.location.reload();\n  }\n\n  var search = self.location.search.toLowerCase();\n  var allowToHot = search.indexOf(\"webpack-dev-server-hot=false\") === -1;\n  var allowToLiveReload = search.indexOf(\"webpack-dev-server-live-reload=false\") === -1;\n\n  if (hot && allowToHot) {\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App hot update...\");\n    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit(\"webpackHotUpdate\", status.currentHash);\n\n    if (typeof self !== \"undefined\" && self.window) {\n      // broadcast update to window\n      self.postMessage(\"webpackHotUpdate\".concat(status.currentHash), \"*\");\n    }\n  } // allow refreshing the page only if liveReload isn't disabled\n  else if (liveReload && allowToLiveReload) {\n    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)\n\n    var intervalId = self.setInterval(function () {\n      if (rootWindow.location.protocol !== \"about:\") {\n        // reload immediately if protocol is valid\n        applyReload(rootWindow, intervalId);\n      } else {\n        rootWindow = rootWindow.parent;\n\n        if (rootWindow.parent === rootWindow) {\n          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways\n          applyReload(rootWindow, intervalId);\n        }\n      }\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/reloadApp.js?");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* global __resourceQuery WorkerGlobalScope */\n// Send messages to the outside, so plugins can consume it.\nfunction sendMsg(type, data) {\n  if (typeof self !== \"undefined\" && (typeof WorkerGlobalScope === \"undefined\" || !(self instanceof WorkerGlobalScope))) {\n    self.postMessage({\n      type: \"webpack\".concat(type),\n      data: data\n    }, \"*\");\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);\n\n//# sourceURL=webpack://formatters/./node_modules/webpack-dev-server/client/utils/sendMessage.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/* globals __webpack_hash__ */\nif (true) {\n\tvar lastHash;\n\tvar upToDate = function upToDate() {\n\t\treturn lastHash.indexOf(__webpack_require__.h()) >= 0;\n\t};\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\tvar check = function check() {\n\t\tmodule.hot\n\t\t\t.check(true)\n\t\t\t.then(function (updatedModules) {\n\t\t\t\tif (!updatedModules) {\n\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot find update. Need to do a full reload!\");\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] (Probably because of restarting the webpack-dev-server)\"\n\t\t\t\t\t);\n\t\t\t\t\twindow.location.reload();\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (!upToDate()) {\n\t\t\t\t\tcheck();\n\t\t\t\t}\n\n\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n\t\t\t\tif (upToDate()) {\n\t\t\t\t\tlog(\"info\", \"[HMR] App is up to date.\");\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(function (err) {\n\t\t\t\tvar status = module.hot.status();\n\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot apply update. Need to do a full reload!\"\n\t\t\t\t\t);\n\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\twindow.location.reload();\n\t\t\t\t} else {\n\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t}\n\t\t\t});\n\t};\n\tvar hotEmitter = __webpack_require__(/*! ./emitter */ \"./node_modules/webpack/hot/emitter.js\");\n\thotEmitter.on(\"webpackHotUpdate\", function (currentHash) {\n\t\tlastHash = currentHash;\n\t\tif (!upToDate() && module.hot.status() === \"idle\") {\n\t\t\tlog(\"info\", \"[HMR] Checking for updates on the server...\");\n\t\t\tcheck();\n\t\t}\n\t});\n\tlog(\"info\", \"[HMR] Waiting for update signal from WDS...\");\n} else {}\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack/hot/dev-server.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\nmodule.exports = new EventEmitter();\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack/hot/emitter.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function (moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function (moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function (moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function (moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t'[HMR] Consider using the optimization.moduleIds: \"named\" for module names.'\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function (level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function (level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function (err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack://formatters/./node_modules/webpack/hot/log.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("27d3776e51fe24497621")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "formatters:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdateformatters"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});