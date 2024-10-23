import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __require,
  __toCommonJS,
  __toESM
} from "./chunk-SEVZ5PBP.js";

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R2 = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R2 && typeof R2.ownKeys === "function") {
      ReflectOwnKeys = R2.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n5) {
      if (typeof n5 !== "number" || n5 < 0 || NumberIsNaN(n5)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n5 + ".");
      }
      this._maxListeners = n5;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i4 = 1; i4 < arguments.length; i4++)
        args.push(arguments[i4]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er3;
        if (args.length > 0)
          er3 = args[0];
        if (er3 instanceof Error) {
          throw er3;
        }
        var err = new Error("Unhandled error." + (er3 ? " (" + er3.message + ")" : ""));
        err.context = er3;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i4 = 0; i4 < len; ++i4)
          ReflectApply(listeners[i4], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m2;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m2 = _getMaxListeners(target);
        if (m2 > 0 && existing.length > m2 && !existing.warned) {
          existing.warned = true;
          var w4 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w4.name = "MaxListenersExceededWarning";
          w4.emitter = target;
          w4.type = type;
          w4.count = existing.length;
          ProcessEmitWarning(w4);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i4, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i4 = list.length - 1; i4 >= 0; i4--) {
          if (list[i4] === listener || list[i4].listener === listener) {
            originalListener = list[i4].listener;
            position = i4;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i4;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys2 = Object.keys(events);
        var key;
        for (i4 = 0; i4 < keys2.length; ++i4) {
          key = keys2[i4];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i4 = listeners.length - 1; i4 >= 0; i4--) {
          this.removeListener(type, listeners[i4]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n5) {
      var copy = new Array(n5);
      for (var i4 = 0; i4 < n5; ++i4)
        copy[i4] = arr[i4];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i4 = 0; i4 < ret.length; ++i4) {
        ret[i4] = arr[i4].listener || arr[i4];
      }
      return ret;
    }
    function once(emitter, name2) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d3, b4) {
  extendStatics(d3, b4);
  function __() {
    this.constructor = d3;
  }
  d3.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
}
function __rest(s3, e2) {
  var t = {};
  for (var p3 in s3)
    if (Object.prototype.hasOwnProperty.call(s3, p3) && e2.indexOf(p3) < 0)
      t[p3] = s3[p3];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p3 = Object.getOwnPropertySymbols(s3); i4 < p3.length; i4++) {
      if (e2.indexOf(p3[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p3[i4]))
        t[p3[i4]] = s3[p3[i4]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c5 = arguments.length, r3 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r3 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i4 = decorators.length - 1; i4 >= 0; i4--)
      if (d3 = decorators[i4])
        r3 = (c5 < 3 ? d3(r3) : c5 > 3 ? d3(target, key, r3) : d3(target, key)) || r3;
  return c5 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f4, y6, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n5) {
    return function(v4) {
      return step([n5, v4]);
    };
  }
  function step(op) {
    if (f4)
      throw new TypeError("Generator is already executing.");
    while (_3)
      try {
        if (f4 = 1, y6 && (t = op[0] & 2 ? y6["return"] : op[0] ? y6["throw"] || ((t = y6["return"]) && t.call(y6), 0) : y6.next) && !(t = t.call(y6, op[1])).done)
          return t;
        if (y6 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _3.label++;
            return { value: op[1], done: false };
          case 5:
            _3.label++;
            y6 = op[1];
            op = [0];
            continue;
          case 7:
            op = _3.ops.pop();
            _3.trys.pop();
            continue;
          default:
            if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _3 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _3.label = op[1];
              break;
            }
            if (op[0] === 6 && _3.label < t[1]) {
              _3.label = t[1];
              t = op;
              break;
            }
            if (t && _3.label < t[2]) {
              _3.label = t[2];
              _3.ops.push(op);
              break;
            }
            if (t[2])
              _3.ops.pop();
            _3.trys.pop();
            continue;
        }
        op = body.call(thisArg, _3);
      } catch (e2) {
        op = [6, e2];
        y6 = 0;
      } finally {
        f4 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o4, m2, k3, k22) {
  if (k22 === void 0)
    k22 = k3;
  o4[k22] = m2[k3];
}
function __exportStar(m2, exports) {
  for (var p3 in m2)
    if (p3 !== "default" && !exports.hasOwnProperty(p3))
      exports[p3] = m2[p3];
}
function __values(o4) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m2 = s3 && o4[s3], i4 = 0;
  if (m2)
    return m2.call(o4);
  if (o4 && typeof o4.length === "number")
    return {
      next: function() {
        if (o4 && i4 >= o4.length)
          o4 = void 0;
        return { value: o4 && o4[i4++], done: !o4 };
      }
    };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o4, n5) {
  var m2 = typeof Symbol === "function" && o4[Symbol.iterator];
  if (!m2)
    return o4;
  var i4 = m2.call(o4), r3, ar3 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done)
      ar3.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m2 = i4["return"]))
        m2.call(i4);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar3;
}
function __spread() {
  for (var ar3 = [], i4 = 0; i4 < arguments.length; i4++)
    ar3 = ar3.concat(__read(arguments[i4]));
  return ar3;
}
function __spreadArrays() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++)
    s3 += arguments[i4].length;
  for (var r3 = Array(s3), k3 = 0, i4 = 0; i4 < il; i4++)
    for (var a4 = arguments[i4], j4 = 0, jl = a4.length; j4 < jl; j4++, k3++)
      r3[k3] = a4[j4];
  return r3;
}
function __await(v4) {
  return this instanceof __await ? (this.v = v4, this) : new __await(v4);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i4, q2 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g3[n5])
      i4[n5] = function(v4) {
        return new Promise(function(a4, b4) {
          q2.push([n5, v4, a4, b4]) > 1 || resume(n5, v4);
        });
      };
  }
  function resume(n5, v4) {
    try {
      step(g3[n5](v4));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f4, v4) {
    if (f4(v4), q2.shift(), q2.length)
      resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o4) {
  var i4, p3;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f4) {
    i4[n5] = o4[n5] ? function(v4) {
      return (p3 = !p3) ? { value: __await(o4[n5](v4)), done: n5 === "return" } : f4 ? f4(v4) : v4;
    } : f4;
  }
}
function __asyncValues(o4) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o4[Symbol.asyncIterator], i4;
  return m2 ? m2.call(o4) : (o4 = typeof __values === "function" ? __values(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o4[n5] && function(v4) {
      return new Promise(function(resolve, reject) {
        v4 = o4[n5](v4), settle(resolve, reject, v4.done, v4.value);
      });
    };
  }
  function settle(resolve, reject, d3, v4) {
    Promise.resolve(v4).then(function(v5) {
      resolve({ value: v5, done: d3 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k3 in mod)
      if (Object.hasOwnProperty.call(mod, k3))
        result[k3] = mod[k3];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d3, b4) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p3 in b5)
          if (b5.hasOwnProperty(p3))
            d4[p3] = b5[p3];
      };
      return extendStatics(d3, b4);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p3 in s3)
            if (Object.prototype.hasOwnProperty.call(s3, p3))
              t[p3] = s3[p3];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds2(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds2;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs2();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e2) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i4 = 0; i4 < links.length; i4++) {
          const link = links[i4];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i4 = 0; i4 < metaTags.length; i4++) {
          const tag = metaTags[i4];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/strict-uri-encode/index.js
var require_strict_uri_encode = __commonJS({
  "node_modules/strict-uri-encode/index.js"(exports, module) {
    "use strict";
    module.exports = (str) => encodeURIComponent(str).replace(/[!'()*]/g, (x5) => `%${x5.charCodeAt(0).toString(16).toUpperCase()}`);
  }
});

// node_modules/decode-uri-component/index.js
var require_decode_uri_component = __commonJS({
  "node_modules/decode-uri-component/index.js"(exports, module) {
    "use strict";
    var token = "%[a-f0-9]{2}";
    var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
    var multiMatcher = new RegExp("(" + token + ")+", "gi");
    function decodeComponents(components, split) {
      try {
        return [decodeURIComponent(components.join(""))];
      } catch (err) {
      }
      if (components.length === 1) {
        return components;
      }
      split = split || 1;
      var left = components.slice(0, split);
      var right = components.slice(split);
      return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }
    function decode6(input) {
      try {
        return decodeURIComponent(input);
      } catch (err) {
        var tokens = input.match(singleMatcher) || [];
        for (var i4 = 1; i4 < tokens.length; i4++) {
          input = decodeComponents(tokens, i4).join("");
          tokens = input.match(singleMatcher) || [];
        }
        return input;
      }
    }
    function customDecodeURIComponent(input) {
      var replaceMap = {
        "%FE%FF": "��",
        "%FF%FE": "��"
      };
      var match = multiMatcher.exec(input);
      while (match) {
        try {
          replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
          var result = decode6(match[0]);
          if (result !== match[0]) {
            replaceMap[match[0]] = result;
          }
        }
        match = multiMatcher.exec(input);
      }
      replaceMap["%C2"] = "�";
      var entries = Object.keys(replaceMap);
      for (var i4 = 0; i4 < entries.length; i4++) {
        var key = entries[i4];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
      }
      return input;
    }
    module.exports = function(encodedURI) {
      if (typeof encodedURI !== "string") {
        throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
      }
      try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        return decodeURIComponent(encodedURI);
      } catch (err) {
        return customDecodeURIComponent(encodedURI);
      }
    };
  }
});

// node_modules/split-on-first/index.js
var require_split_on_first = __commonJS({
  "node_modules/split-on-first/index.js"(exports, module) {
    "use strict";
    module.exports = (string3, separator) => {
      if (!(typeof string3 === "string" && typeof separator === "string")) {
        throw new TypeError("Expected the arguments to be of type `string`");
      }
      if (separator === "") {
        return [string3];
      }
      const separatorIndex = string3.indexOf(separator);
      if (separatorIndex === -1) {
        return [string3];
      }
      return [
        string3.slice(0, separatorIndex),
        string3.slice(separatorIndex + separator.length)
      ];
    };
  }
});

// node_modules/filter-obj/index.js
var require_filter_obj = __commonJS({
  "node_modules/filter-obj/index.js"(exports, module) {
    "use strict";
    module.exports = function(obj, predicate) {
      var ret = {};
      var keys2 = Object.keys(obj);
      var isArr = Array.isArray(predicate);
      for (var i4 = 0; i4 < keys2.length; i4++) {
        var key = keys2[i4];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
          ret[key] = val;
        }
      }
      return ret;
    };
  }
});

// node_modules/query-string/index.js
var require_query_string = __commonJS({
  "node_modules/query-string/index.js"(exports) {
    "use strict";
    var strictUriEncode = require_strict_uri_encode();
    var decodeComponent = require_decode_uri_component();
    var splitOnFirst = require_split_on_first();
    var filterObject = require_filter_obj();
    var isNullOrUndefined = (value) => value === null || value === void 0;
    var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
    function encoderForArrayFormat(options) {
      switch (options.arrayFormat) {
        case "index":
          return (key) => (result, value) => {
            const index = result.length;
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[", index, "]"].join("")];
            }
            return [
              ...result,
              [encode5(key, options), "[", encode5(index, options), "]=", encode5(value, options)].join("")
            ];
          };
        case "bracket":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[]"].join("")];
            }
            return [...result, [encode5(key, options), "[]=", encode5(value, options)].join("")];
          };
        case "colon-list-separator":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), ":list="].join("")];
            }
            return [...result, [encode5(key, options), ":list=", encode5(value, options)].join("")];
          };
        case "comma":
        case "separator":
        case "bracket-separator": {
          const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            value = value === null ? "" : value;
            if (result.length === 0) {
              return [[encode5(key, options), keyValueSep, encode5(value, options)].join("")];
            }
            return [[result, encode5(value, options)].join(options.arrayFormatSeparator)];
          };
        }
        default:
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, encode5(key, options)];
            }
            return [...result, [encode5(key, options), "=", encode5(value, options)].join("")];
          };
      }
    }
    function parserForArrayFormat(options) {
      let result;
      switch (options.arrayFormat) {
        case "index":
          return (key, value, accumulator) => {
            result = /\[(\d*)\]$/.exec(key);
            key = key.replace(/\[\d*\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = {};
            }
            accumulator[key][result[1]] = value;
          };
        case "bracket":
          return (key, value, accumulator) => {
            result = /(\[\])$/.exec(key);
            key = key.replace(/\[\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "colon-list-separator":
          return (key, value, accumulator) => {
            result = /(:list)$/.exec(key);
            key = key.replace(/:list$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "comma":
        case "separator":
          return (key, value, accumulator) => {
            const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
            const isEncodedArray = typeof value === "string" && !isArray && decode6(value, options).includes(options.arrayFormatSeparator);
            value = isEncodedArray ? decode6(value, options) : value;
            const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode6(item, options)) : value === null ? value : decode6(value, options);
            accumulator[key] = newValue;
          };
        case "bracket-separator":
          return (key, value, accumulator) => {
            const isArray = /(\[\])$/.test(key);
            key = key.replace(/\[\]$/, "");
            if (!isArray) {
              accumulator[key] = value ? decode6(value, options) : value;
              return;
            }
            const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode6(item, options));
            if (accumulator[key] === void 0) {
              accumulator[key] = arrayValue;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], arrayValue);
          };
        default:
          return (key, value, accumulator) => {
            if (accumulator[key] === void 0) {
              accumulator[key] = value;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
      }
    }
    function validateArrayFormatSeparator(value) {
      if (typeof value !== "string" || value.length !== 1) {
        throw new TypeError("arrayFormatSeparator must be single character string");
      }
    }
    function encode5(value, options) {
      if (options.encode) {
        return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
      }
      return value;
    }
    function decode6(value, options) {
      if (options.decode) {
        return decodeComponent(value);
      }
      return value;
    }
    function keysSorter(input) {
      if (Array.isArray(input)) {
        return input.sort();
      }
      if (typeof input === "object") {
        return keysSorter(Object.keys(input)).sort((a4, b4) => Number(a4) - Number(b4)).map((key) => input[key]);
      }
      return input;
    }
    function removeHash(input) {
      const hashStart = input.indexOf("#");
      if (hashStart !== -1) {
        input = input.slice(0, hashStart);
      }
      return input;
    }
    function getHash(url) {
      let hash = "";
      const hashStart = url.indexOf("#");
      if (hashStart !== -1) {
        hash = url.slice(hashStart);
      }
      return hash;
    }
    function extract(input) {
      input = removeHash(input);
      const queryStart = input.indexOf("?");
      if (queryStart === -1) {
        return "";
      }
      return input.slice(queryStart + 1);
    }
    function parseValue(value, options) {
      if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
        value = Number(value);
      } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
        value = value.toLowerCase() === "true";
      }
      return value;
    }
    function parse2(query, options) {
      options = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: false,
        parseBooleans: false
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const formatter = parserForArrayFormat(options);
      const ret = /* @__PURE__ */ Object.create(null);
      if (typeof query !== "string") {
        return ret;
      }
      query = query.trim().replace(/^[?#&]/, "");
      if (!query) {
        return ret;
      }
      for (const param of query.split("&")) {
        if (param === "") {
          continue;
        }
        let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
        value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode6(value, options);
        formatter(decode6(key, options), value, ret);
      }
      for (const key of Object.keys(ret)) {
        const value = ret[key];
        if (typeof value === "object" && value !== null) {
          for (const k3 of Object.keys(value)) {
            value[k3] = parseValue(value[k3], options);
          }
        } else {
          ret[key] = parseValue(value, options);
        }
      }
      if (options.sort === false) {
        return ret;
      }
      return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
          result[key] = keysSorter(value);
        } else {
          result[key] = value;
        }
        return result;
      }, /* @__PURE__ */ Object.create(null));
    }
    exports.extract = extract;
    exports.parse = parse2;
    exports.stringify = (object, options) => {
      if (!object) {
        return "";
      }
      options = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none",
        arrayFormatSeparator: ","
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
      const formatter = encoderForArrayFormat(options);
      const objectCopy = {};
      for (const key of Object.keys(object)) {
        if (!shouldFilter(key)) {
          objectCopy[key] = object[key];
        }
      }
      const keys2 = Object.keys(objectCopy);
      if (options.sort !== false) {
        keys2.sort(options.sort);
      }
      return keys2.map((key) => {
        const value = object[key];
        if (value === void 0) {
          return "";
        }
        if (value === null) {
          return encode5(key, options);
        }
        if (Array.isArray(value)) {
          if (value.length === 0 && options.arrayFormat === "bracket-separator") {
            return encode5(key, options) + "[]";
          }
          return value.reduce(formatter(key), []).join("&");
        }
        return encode5(key, options) + "=" + encode5(value, options);
      }).filter((x5) => x5.length > 0).join("&");
    };
    exports.parseUrl = (url, options) => {
      options = Object.assign({
        decode: true
      }, options);
      const [url_, hash] = splitOnFirst(url, "#");
      return Object.assign(
        {
          url: url_.split("?")[0] || "",
          query: parse2(extract(url), options)
        },
        options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode6(hash, options) } : {}
      );
    };
    exports.stringifyUrl = (object, options) => {
      options = Object.assign({
        encode: true,
        strict: true,
        [encodeFragmentIdentifier]: true
      }, options);
      const url = removeHash(object.url).split("?")[0] || "";
      const queryFromUrl = exports.extract(object.url);
      const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
      const query = Object.assign(parsedQueryFromUrl, object.query);
      let queryString = exports.stringify(query, options);
      if (queryString) {
        queryString = `?${queryString}`;
      }
      let hash = getHash(object.url);
      if (object.fragmentIdentifier) {
        hash = `#${options[encodeFragmentIdentifier] ? encode5(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
      }
      return `${url}${queryString}${hash}`;
    };
    exports.pick = (input, filter, options) => {
      options = Object.assign({
        parseFragmentIdentifier: true,
        [encodeFragmentIdentifier]: false
      }, options);
      const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
      return exports.stringifyUrl({
        url,
        query: filterObject(query, filter),
        fragmentIdentifier
      }, options);
    };
    exports.exclude = (input, filter, options) => {
      const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
      return exports.pick(input, exclusionFilter, options);
    };
  }
});

// node_modules/@stablelib/int/lib/int.js
var require_int = __commonJS({
  "node_modules/@stablelib/int/lib/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function imulShim(a4, b4) {
      var ah2 = a4 >>> 16 & 65535, al = a4 & 65535;
      var bh2 = b4 >>> 16 & 65535, bl = b4 & 65535;
      return al * bl + (ah2 * bl + al * bh2 << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a4, b4) {
      return a4 + b4 | 0;
    }
    exports.add = add;
    function sub(a4, b4) {
      return a4 - b4 | 0;
    }
    exports.sub = sub;
    function rotl(x5, n5) {
      return x5 << n5 | x5 >>> 32 - n5;
    }
    exports.rotl = rotl;
    function rotr(x5, n5) {
      return x5 << 32 - n5 | x5 >>> n5;
    }
    exports.rotr = rotr;
    function isIntegerShim(n5) {
      return typeof n5 === "number" && isFinite(n5) && Math.floor(n5) === n5;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function(n5) {
      return exports.isInteger(n5) && (n5 >= -exports.MAX_SAFE_INTEGER && n5 <= exports.MAX_SAFE_INTEGER);
    };
  }
});

// node_modules/@stablelib/binary/lib/binary.js
var require_binary = __commonJS({
  "node_modules/@stablelib/binary/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int_1 = require_int();
    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }
    exports.readInt16BE = readInt16BE;
    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }
    exports.readUint16BE = readUint16BE;
    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }
    exports.readInt16LE = readInt16LE;
    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint16LE = readUint16LE;
    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }
    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }
    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }
    exports.readInt32BE = readInt32BE;
    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }
    exports.readUint32BE = readUint32BE;
    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }
    exports.readInt32LE = readInt32LE;
    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint32LE = readUint32LE;
    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }
    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }
    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi2 = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      return hi2 * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64BE = readInt64BE;
    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi2 = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi2 * 4294967296 + lo;
    }
    exports.readUint64BE = readUint64BE;
    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readInt32LE(array, offset);
      var hi2 = readInt32LE(array, offset + 4);
      return hi2 * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64LE = readInt64LE;
    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readUint32LE(array, offset);
      var hi2 = readUint32LE(array, offset + 4);
      return hi2 * 4294967296 + lo;
    }
    exports.readUint64LE = readUint64LE;
    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32BE(value / 4294967296 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i4 = bitLength / 8 + offset - 1; i4 >= offset; i4--) {
        result += array[i4] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintBE = readUintBE;
    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i4 = offset; i4 < offset + bitLength / 8; i4++) {
        result += array[i4] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintLE = readUintLE;
    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }
      var div = 1;
      for (var i4 = bitLength / 8 + offset - 1; i4 >= offset; i4--) {
        out[i4] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintBE = writeUintBE;
    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }
      var div = 1;
      for (var i4 = offset; i4 < offset + bitLength / 8; i4++) {
        out[i4] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintLE = writeUintLE;
    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }
    exports.readFloat32BE = readFloat32BE;
    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }
    exports.readFloat32LE = readFloat32LE;
    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }
    exports.readFloat64BE = readFloat64BE;
    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }
    exports.readFloat64LE = readFloat64LE;
    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }
    exports.writeFloat32BE = writeFloat32BE;
    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }
    exports.writeFloat32LE = writeFloat32LE;
    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }
    exports.writeFloat64BE = writeFloat64BE;
    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }
    exports.writeFloat64LE = writeFloat64LE;
  }
});

// node_modules/@stablelib/wipe/lib/wipe.js
var require_wipe = __commonJS({
  "node_modules/@stablelib/wipe/lib/wipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wipe(array) {
      for (var i4 = 0; i4 < array.length; i4++) {
        array[i4] = 0;
      }
      return array;
    }
    exports.wipe = wipe;
  }
});

// node_modules/@stablelib/chacha/lib/chacha.js
var require_chacha = __commonJS({
  "node_modules/@stablelib/chacha/lib/chacha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    var ROUNDS = 20;
    function core(out, input, key) {
      var j02 = 1634760805;
      var j1 = 857760878;
      var j22 = 2036477234;
      var j32 = 1797285236;
      var j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
      var j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
      var j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
      var j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
      var j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
      var j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
      var j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
      var j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
      var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
      var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
      var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
      var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
      var x02 = j02;
      var x1 = j1;
      var x22 = j22;
      var x32 = j32;
      var x42 = j4;
      var x5 = j5;
      var x6 = j6;
      var x7 = j7;
      var x8 = j8;
      var x9 = j9;
      var x10 = j10;
      var x11 = j11;
      var x12 = j12;
      var x13 = j13;
      var x14 = j14;
      var x15 = j15;
      for (var i4 = 0; i4 < ROUNDS; i4 += 2) {
        x02 = x02 + x42 | 0;
        x12 ^= x02;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x8 = x8 + x12 | 0;
        x42 ^= x8;
        x42 = x42 >>> 32 - 12 | x42 << 12;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x22 = x22 + x6 | 0;
        x14 ^= x22;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x32 = x32 + x7 | 0;
        x15 ^= x32;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x22 = x22 + x6 | 0;
        x14 ^= x22;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x32 = x32 + x7 | 0;
        x15 ^= x32;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 7 | x5 << 7;
        x02 = x02 + x42 | 0;
        x12 ^= x02;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x8 = x8 + x12 | 0;
        x42 ^= x8;
        x42 = x42 >>> 32 - 7 | x42 << 7;
        x02 = x02 + x5 | 0;
        x15 ^= x02;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x22 = x22 + x7 | 0;
        x13 ^= x22;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x32 = x32 + x42 | 0;
        x14 ^= x32;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x9 = x9 + x14 | 0;
        x42 ^= x9;
        x42 = x42 >>> 32 - 12 | x42 << 12;
        x22 = x22 + x7 | 0;
        x13 ^= x22;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x32 = x32 + x42 | 0;
        x14 ^= x32;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x9 = x9 + x14 | 0;
        x42 ^= x9;
        x42 = x42 >>> 32 - 7 | x42 << 7;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x02 = x02 + x5 | 0;
        x15 ^= x02;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 7 | x5 << 7;
      }
      binary_1.writeUint32LE(x02 + j02 | 0, out, 0);
      binary_1.writeUint32LE(x1 + j1 | 0, out, 4);
      binary_1.writeUint32LE(x22 + j22 | 0, out, 8);
      binary_1.writeUint32LE(x32 + j32 | 0, out, 12);
      binary_1.writeUint32LE(x42 + j4 | 0, out, 16);
      binary_1.writeUint32LE(x5 + j5 | 0, out, 20);
      binary_1.writeUint32LE(x6 + j6 | 0, out, 24);
      binary_1.writeUint32LE(x7 + j7 | 0, out, 28);
      binary_1.writeUint32LE(x8 + j8 | 0, out, 32);
      binary_1.writeUint32LE(x9 + j9 | 0, out, 36);
      binary_1.writeUint32LE(x10 + j10 | 0, out, 40);
      binary_1.writeUint32LE(x11 + j11 | 0, out, 44);
      binary_1.writeUint32LE(x12 + j12 | 0, out, 48);
      binary_1.writeUint32LE(x13 + j13 | 0, out, 52);
      binary_1.writeUint32LE(x14 + j14 | 0, out, 56);
      binary_1.writeUint32LE(x15 + j15 | 0, out, 60);
    }
    function streamXOR(key, nonce, src2, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      if (key.length !== 32) {
        throw new Error("ChaCha: key size must be 32 bytes");
      }
      if (dst.length < src2.length) {
        throw new Error("ChaCha: destination is shorter than source");
      }
      var nc;
      var counterLength;
      if (nonceInplaceCounterLength === 0) {
        if (nonce.length !== 8 && nonce.length !== 12) {
          throw new Error("ChaCha nonce must be 8 or 12 bytes");
        }
        nc = new Uint8Array(16);
        counterLength = nc.length - nonce.length;
        nc.set(nonce, counterLength);
      } else {
        if (nonce.length !== 16) {
          throw new Error("ChaCha nonce with counter must be 16 bytes");
        }
        nc = nonce;
        counterLength = nonceInplaceCounterLength;
      }
      var block = new Uint8Array(64);
      for (var i4 = 0; i4 < src2.length; i4 += 64) {
        core(block, nc, key);
        for (var j4 = i4; j4 < i4 + 64 && j4 < src2.length; j4++) {
          dst[j4] = src2[j4] ^ block[j4 - i4];
        }
        incrementCounter(nc, 0, counterLength);
      }
      wipe_1.wipe(block);
      if (nonceInplaceCounterLength === 0) {
        wipe_1.wipe(nc);
      }
      return dst;
    }
    exports.streamXOR = streamXOR;
    function stream(key, nonce, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      wipe_1.wipe(dst);
      return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
    }
    exports.stream = stream;
    function incrementCounter(counter, pos, len) {
      var carry = 1;
      while (len--) {
        carry = carry + (counter[pos] & 255) | 0;
        counter[pos] = carry & 255;
        carry >>>= 8;
        pos++;
      }
      if (carry > 0) {
        throw new Error("ChaCha: counter overflow");
      }
    }
  }
});

// node_modules/@stablelib/constant-time/lib/constant-time.js
var require_constant_time = __commonJS({
  "node_modules/@stablelib/constant-time/lib/constant-time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function select(subject, resultIfOne, resultIfZero) {
      return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
    }
    exports.select = select;
    function lessOrEqual(a4, b4) {
      return (a4 | 0) - (b4 | 0) - 1 >>> 31 & 1;
    }
    exports.lessOrEqual = lessOrEqual;
    function compare2(a4, b4) {
      if (a4.length !== b4.length) {
        return 0;
      }
      var result = 0;
      for (var i4 = 0; i4 < a4.length; i4++) {
        result |= a4[i4] ^ b4[i4];
      }
      return 1 & result - 1 >>> 8;
    }
    exports.compare = compare2;
    function equal(a4, b4) {
      if (a4.length === 0 || b4.length === 0) {
        return false;
      }
      return compare2(a4, b4) !== 0;
    }
    exports.equal = equal;
  }
});

// node_modules/@stablelib/poly1305/lib/poly1305.js
var require_poly1305 = __commonJS({
  "node_modules/@stablelib/poly1305/lib/poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 16;
    var Poly1305 = (
      /** @class */
      function() {
        function Poly13052(key) {
          this.digestLength = exports.DIGEST_LENGTH;
          this._buffer = new Uint8Array(16);
          this._r = new Uint16Array(10);
          this._h = new Uint16Array(10);
          this._pad = new Uint16Array(8);
          this._leftover = 0;
          this._fin = 0;
          this._finished = false;
          var t02 = key[0] | key[1] << 8;
          this._r[0] = t02 & 8191;
          var t1 = key[2] | key[3] << 8;
          this._r[1] = (t02 >>> 13 | t1 << 3) & 8191;
          var t2 = key[4] | key[5] << 8;
          this._r[2] = (t1 >>> 10 | t2 << 6) & 7939;
          var t3 = key[6] | key[7] << 8;
          this._r[3] = (t2 >>> 7 | t3 << 9) & 8191;
          var t4 = key[8] | key[9] << 8;
          this._r[4] = (t3 >>> 4 | t4 << 12) & 255;
          this._r[5] = t4 >>> 1 & 8190;
          var t5 = key[10] | key[11] << 8;
          this._r[6] = (t4 >>> 14 | t5 << 2) & 8191;
          var t6 = key[12] | key[13] << 8;
          this._r[7] = (t5 >>> 11 | t6 << 5) & 8065;
          var t7 = key[14] | key[15] << 8;
          this._r[8] = (t6 >>> 8 | t7 << 8) & 8191;
          this._r[9] = t7 >>> 5 & 127;
          this._pad[0] = key[16] | key[17] << 8;
          this._pad[1] = key[18] | key[19] << 8;
          this._pad[2] = key[20] | key[21] << 8;
          this._pad[3] = key[22] | key[23] << 8;
          this._pad[4] = key[24] | key[25] << 8;
          this._pad[5] = key[26] | key[27] << 8;
          this._pad[6] = key[28] | key[29] << 8;
          this._pad[7] = key[30] | key[31] << 8;
        }
        Poly13052.prototype._blocks = function(m2, mpos, bytes) {
          var hibit = this._fin ? 0 : 1 << 11;
          var h02 = this._h[0], h1 = this._h[1], h22 = this._h[2], h32 = this._h[3], h42 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
          var r02 = this._r[0], r1 = this._r[1], r22 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
          while (bytes >= 16) {
            var t02 = m2[mpos + 0] | m2[mpos + 1] << 8;
            h02 += t02 & 8191;
            var t1 = m2[mpos + 2] | m2[mpos + 3] << 8;
            h1 += (t02 >>> 13 | t1 << 3) & 8191;
            var t2 = m2[mpos + 4] | m2[mpos + 5] << 8;
            h22 += (t1 >>> 10 | t2 << 6) & 8191;
            var t3 = m2[mpos + 6] | m2[mpos + 7] << 8;
            h32 += (t2 >>> 7 | t3 << 9) & 8191;
            var t4 = m2[mpos + 8] | m2[mpos + 9] << 8;
            h42 += (t3 >>> 4 | t4 << 12) & 8191;
            h5 += t4 >>> 1 & 8191;
            var t5 = m2[mpos + 10] | m2[mpos + 11] << 8;
            h6 += (t4 >>> 14 | t5 << 2) & 8191;
            var t6 = m2[mpos + 12] | m2[mpos + 13] << 8;
            h7 += (t5 >>> 11 | t6 << 5) & 8191;
            var t7 = m2[mpos + 14] | m2[mpos + 15] << 8;
            h8 += (t6 >>> 8 | t7 << 8) & 8191;
            h9 += t7 >>> 5 | hibit;
            var c5 = 0;
            var d02 = c5;
            d02 += h02 * r02;
            d02 += h1 * (5 * r9);
            d02 += h22 * (5 * r8);
            d02 += h32 * (5 * r7);
            d02 += h42 * (5 * r6);
            c5 = d02 >>> 13;
            d02 &= 8191;
            d02 += h5 * (5 * r5);
            d02 += h6 * (5 * r4);
            d02 += h7 * (5 * r3);
            d02 += h8 * (5 * r22);
            d02 += h9 * (5 * r1);
            c5 += d02 >>> 13;
            d02 &= 8191;
            var d1 = c5;
            d1 += h02 * r1;
            d1 += h1 * r02;
            d1 += h22 * (5 * r9);
            d1 += h32 * (5 * r8);
            d1 += h42 * (5 * r7);
            c5 = d1 >>> 13;
            d1 &= 8191;
            d1 += h5 * (5 * r6);
            d1 += h6 * (5 * r5);
            d1 += h7 * (5 * r4);
            d1 += h8 * (5 * r3);
            d1 += h9 * (5 * r22);
            c5 += d1 >>> 13;
            d1 &= 8191;
            var d22 = c5;
            d22 += h02 * r22;
            d22 += h1 * r1;
            d22 += h22 * r02;
            d22 += h32 * (5 * r9);
            d22 += h42 * (5 * r8);
            c5 = d22 >>> 13;
            d22 &= 8191;
            d22 += h5 * (5 * r7);
            d22 += h6 * (5 * r6);
            d22 += h7 * (5 * r5);
            d22 += h8 * (5 * r4);
            d22 += h9 * (5 * r3);
            c5 += d22 >>> 13;
            d22 &= 8191;
            var d3 = c5;
            d3 += h02 * r3;
            d3 += h1 * r22;
            d3 += h22 * r1;
            d3 += h32 * r02;
            d3 += h42 * (5 * r9);
            c5 = d3 >>> 13;
            d3 &= 8191;
            d3 += h5 * (5 * r8);
            d3 += h6 * (5 * r7);
            d3 += h7 * (5 * r6);
            d3 += h8 * (5 * r5);
            d3 += h9 * (5 * r4);
            c5 += d3 >>> 13;
            d3 &= 8191;
            var d4 = c5;
            d4 += h02 * r4;
            d4 += h1 * r3;
            d4 += h22 * r22;
            d4 += h32 * r1;
            d4 += h42 * r02;
            c5 = d4 >>> 13;
            d4 &= 8191;
            d4 += h5 * (5 * r9);
            d4 += h6 * (5 * r8);
            d4 += h7 * (5 * r7);
            d4 += h8 * (5 * r6);
            d4 += h9 * (5 * r5);
            c5 += d4 >>> 13;
            d4 &= 8191;
            var d5 = c5;
            d5 += h02 * r5;
            d5 += h1 * r4;
            d5 += h22 * r3;
            d5 += h32 * r22;
            d5 += h42 * r1;
            c5 = d5 >>> 13;
            d5 &= 8191;
            d5 += h5 * r02;
            d5 += h6 * (5 * r9);
            d5 += h7 * (5 * r8);
            d5 += h8 * (5 * r7);
            d5 += h9 * (5 * r6);
            c5 += d5 >>> 13;
            d5 &= 8191;
            var d6 = c5;
            d6 += h02 * r6;
            d6 += h1 * r5;
            d6 += h22 * r4;
            d6 += h32 * r3;
            d6 += h42 * r22;
            c5 = d6 >>> 13;
            d6 &= 8191;
            d6 += h5 * r1;
            d6 += h6 * r02;
            d6 += h7 * (5 * r9);
            d6 += h8 * (5 * r8);
            d6 += h9 * (5 * r7);
            c5 += d6 >>> 13;
            d6 &= 8191;
            var d7 = c5;
            d7 += h02 * r7;
            d7 += h1 * r6;
            d7 += h22 * r5;
            d7 += h32 * r4;
            d7 += h42 * r3;
            c5 = d7 >>> 13;
            d7 &= 8191;
            d7 += h5 * r22;
            d7 += h6 * r1;
            d7 += h7 * r02;
            d7 += h8 * (5 * r9);
            d7 += h9 * (5 * r8);
            c5 += d7 >>> 13;
            d7 &= 8191;
            var d8 = c5;
            d8 += h02 * r8;
            d8 += h1 * r7;
            d8 += h22 * r6;
            d8 += h32 * r5;
            d8 += h42 * r4;
            c5 = d8 >>> 13;
            d8 &= 8191;
            d8 += h5 * r3;
            d8 += h6 * r22;
            d8 += h7 * r1;
            d8 += h8 * r02;
            d8 += h9 * (5 * r9);
            c5 += d8 >>> 13;
            d8 &= 8191;
            var d9 = c5;
            d9 += h02 * r9;
            d9 += h1 * r8;
            d9 += h22 * r7;
            d9 += h32 * r6;
            d9 += h42 * r5;
            c5 = d9 >>> 13;
            d9 &= 8191;
            d9 += h5 * r4;
            d9 += h6 * r3;
            d9 += h7 * r22;
            d9 += h8 * r1;
            d9 += h9 * r02;
            c5 += d9 >>> 13;
            d9 &= 8191;
            c5 = (c5 << 2) + c5 | 0;
            c5 = c5 + d02 | 0;
            d02 = c5 & 8191;
            c5 = c5 >>> 13;
            d1 += c5;
            h02 = d02;
            h1 = d1;
            h22 = d22;
            h32 = d3;
            h42 = d4;
            h5 = d5;
            h6 = d6;
            h7 = d7;
            h8 = d8;
            h9 = d9;
            mpos += 16;
            bytes -= 16;
          }
          this._h[0] = h02;
          this._h[1] = h1;
          this._h[2] = h22;
          this._h[3] = h32;
          this._h[4] = h42;
          this._h[5] = h5;
          this._h[6] = h6;
          this._h[7] = h7;
          this._h[8] = h8;
          this._h[9] = h9;
        };
        Poly13052.prototype.finish = function(mac, macpos) {
          if (macpos === void 0) {
            macpos = 0;
          }
          var g3 = new Uint16Array(10);
          var c5;
          var mask;
          var f4;
          var i4;
          if (this._leftover) {
            i4 = this._leftover;
            this._buffer[i4++] = 1;
            for (; i4 < 16; i4++) {
              this._buffer[i4] = 0;
            }
            this._fin = 1;
            this._blocks(this._buffer, 0, 16);
          }
          c5 = this._h[1] >>> 13;
          this._h[1] &= 8191;
          for (i4 = 2; i4 < 10; i4++) {
            this._h[i4] += c5;
            c5 = this._h[i4] >>> 13;
            this._h[i4] &= 8191;
          }
          this._h[0] += c5 * 5;
          c5 = this._h[0] >>> 13;
          this._h[0] &= 8191;
          this._h[1] += c5;
          c5 = this._h[1] >>> 13;
          this._h[1] &= 8191;
          this._h[2] += c5;
          g3[0] = this._h[0] + 5;
          c5 = g3[0] >>> 13;
          g3[0] &= 8191;
          for (i4 = 1; i4 < 10; i4++) {
            g3[i4] = this._h[i4] + c5;
            c5 = g3[i4] >>> 13;
            g3[i4] &= 8191;
          }
          g3[9] -= 1 << 13;
          mask = (c5 ^ 1) - 1;
          for (i4 = 0; i4 < 10; i4++) {
            g3[i4] &= mask;
          }
          mask = ~mask;
          for (i4 = 0; i4 < 10; i4++) {
            this._h[i4] = this._h[i4] & mask | g3[i4];
          }
          this._h[0] = (this._h[0] | this._h[1] << 13) & 65535;
          this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535;
          this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535;
          this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535;
          this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535;
          this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535;
          this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535;
          this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535;
          f4 = this._h[0] + this._pad[0];
          this._h[0] = f4 & 65535;
          for (i4 = 1; i4 < 8; i4++) {
            f4 = (this._h[i4] + this._pad[i4] | 0) + (f4 >>> 16) | 0;
            this._h[i4] = f4 & 65535;
          }
          mac[macpos + 0] = this._h[0] >>> 0;
          mac[macpos + 1] = this._h[0] >>> 8;
          mac[macpos + 2] = this._h[1] >>> 0;
          mac[macpos + 3] = this._h[1] >>> 8;
          mac[macpos + 4] = this._h[2] >>> 0;
          mac[macpos + 5] = this._h[2] >>> 8;
          mac[macpos + 6] = this._h[3] >>> 0;
          mac[macpos + 7] = this._h[3] >>> 8;
          mac[macpos + 8] = this._h[4] >>> 0;
          mac[macpos + 9] = this._h[4] >>> 8;
          mac[macpos + 10] = this._h[5] >>> 0;
          mac[macpos + 11] = this._h[5] >>> 8;
          mac[macpos + 12] = this._h[6] >>> 0;
          mac[macpos + 13] = this._h[6] >>> 8;
          mac[macpos + 14] = this._h[7] >>> 0;
          mac[macpos + 15] = this._h[7] >>> 8;
          this._finished = true;
          return this;
        };
        Poly13052.prototype.update = function(m2) {
          var mpos = 0;
          var bytes = m2.length;
          var want;
          if (this._leftover) {
            want = 16 - this._leftover;
            if (want > bytes) {
              want = bytes;
            }
            for (var i4 = 0; i4 < want; i4++) {
              this._buffer[this._leftover + i4] = m2[mpos + i4];
            }
            bytes -= want;
            mpos += want;
            this._leftover += want;
            if (this._leftover < 16) {
              return this;
            }
            this._blocks(this._buffer, 0, 16);
            this._leftover = 0;
          }
          if (bytes >= 16) {
            want = bytes - bytes % 16;
            this._blocks(m2, mpos, want);
            mpos += want;
            bytes -= want;
          }
          if (bytes) {
            for (var i4 = 0; i4 < bytes; i4++) {
              this._buffer[this._leftover + i4] = m2[mpos + i4];
            }
            this._leftover += bytes;
          }
          return this;
        };
        Poly13052.prototype.digest = function() {
          if (this._finished) {
            throw new Error("Poly1305 was finished");
          }
          var mac = new Uint8Array(16);
          this.finish(mac);
          return mac;
        };
        Poly13052.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._r);
          wipe_1.wipe(this._h);
          wipe_1.wipe(this._pad);
          this._leftover = 0;
          this._fin = 0;
          this._finished = true;
          return this;
        };
        return Poly13052;
      }()
    );
    exports.Poly1305 = Poly1305;
    function oneTimeAuth(key, data) {
      var h5 = new Poly1305(key);
      h5.update(data);
      var digest2 = h5.digest();
      h5.clean();
      return digest2;
    }
    exports.oneTimeAuth = oneTimeAuth;
    function equal(a4, b4) {
      if (a4.length !== exports.DIGEST_LENGTH || b4.length !== exports.DIGEST_LENGTH) {
        return false;
      }
      return constant_time_1.equal(a4, b4);
    }
    exports.equal = equal;
  }
});

// node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js
var require_chacha20poly1305 = __commonJS({
  "node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chacha_1 = require_chacha();
    var poly1305_1 = require_poly1305();
    var wipe_1 = require_wipe();
    var binary_1 = require_binary();
    var constant_time_1 = require_constant_time();
    exports.KEY_LENGTH = 32;
    exports.NONCE_LENGTH = 12;
    exports.TAG_LENGTH = 16;
    var ZEROS = new Uint8Array(16);
    var ChaCha20Poly1305 = (
      /** @class */
      function() {
        function ChaCha20Poly13052(key) {
          this.nonceLength = exports.NONCE_LENGTH;
          this.tagLength = exports.TAG_LENGTH;
          if (key.length !== exports.KEY_LENGTH) {
            throw new Error("ChaCha20Poly1305 needs 32-byte key");
          }
          this._key = new Uint8Array(key);
        }
        ChaCha20Poly13052.prototype.seal = function(nonce, plaintext, associatedData, dst) {
          if (nonce.length > 16) {
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          }
          var counter = new Uint8Array(16);
          counter.set(nonce, counter.length - nonce.length);
          var authKey = new Uint8Array(32);
          chacha_1.stream(this._key, counter, authKey, 4);
          var resultLength = plaintext.length + this.tagLength;
          var result;
          if (dst) {
            if (dst.length !== resultLength) {
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            }
            result = dst;
          } else {
            result = new Uint8Array(resultLength);
          }
          chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
          this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
          wipe_1.wipe(counter);
          return result;
        };
        ChaCha20Poly13052.prototype.open = function(nonce, sealed, associatedData, dst) {
          if (nonce.length > 16) {
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          }
          if (sealed.length < this.tagLength) {
            return null;
          }
          var counter = new Uint8Array(16);
          counter.set(nonce, counter.length - nonce.length);
          var authKey = new Uint8Array(32);
          chacha_1.stream(this._key, counter, authKey, 4);
          var calculatedTag = new Uint8Array(this.tagLength);
          this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
          if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) {
            return null;
          }
          var resultLength = sealed.length - this.tagLength;
          var result;
          if (dst) {
            if (dst.length !== resultLength) {
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            }
            result = dst;
          } else {
            result = new Uint8Array(resultLength);
          }
          chacha_1.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
          wipe_1.wipe(counter);
          return result;
        };
        ChaCha20Poly13052.prototype.clean = function() {
          wipe_1.wipe(this._key);
          return this;
        };
        ChaCha20Poly13052.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
          var h5 = new poly1305_1.Poly1305(authKey);
          if (associatedData) {
            h5.update(associatedData);
            if (associatedData.length % 16 > 0) {
              h5.update(ZEROS.subarray(associatedData.length % 16));
            }
          }
          h5.update(ciphertext);
          if (ciphertext.length % 16 > 0) {
            h5.update(ZEROS.subarray(ciphertext.length % 16));
          }
          var length2 = new Uint8Array(8);
          if (associatedData) {
            binary_1.writeUint64LE(associatedData.length, length2);
          }
          h5.update(length2);
          binary_1.writeUint64LE(ciphertext.length, length2);
          h5.update(length2);
          var tag = h5.digest();
          for (var i4 = 0; i4 < tag.length; i4++) {
            tagOut[i4] = tag[i4];
          }
          h5.clean();
          wipe_1.wipe(tag);
          wipe_1.wipe(length2);
        };
        return ChaCha20Poly13052;
      }()
    );
    exports.ChaCha20Poly1305 = ChaCha20Poly1305;
  }
});

// node_modules/@stablelib/hash/lib/hash.js
var require_hash = __commonJS({
  "node_modules/@stablelib/hash/lib/hash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSerializableHash(h5) {
      return typeof h5.saveState !== "undefined" && typeof h5.restoreState !== "undefined" && typeof h5.cleanSavedState !== "undefined";
    }
    exports.isSerializableHash = isSerializableHash;
  }
});

// node_modules/@stablelib/hmac/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/@stablelib/hmac/lib/hmac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hash_1 = require_hash();
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    var HMAC = (
      /** @class */
      function() {
        function HMAC2(hash, key) {
          this._finished = false;
          this._inner = new hash();
          this._outer = new hash();
          this.blockSize = this._outer.blockSize;
          this.digestLength = this._outer.digestLength;
          var pad = new Uint8Array(this.blockSize);
          if (key.length > this.blockSize) {
            this._inner.update(key).finish(pad).clean();
          } else {
            pad.set(key);
          }
          for (var i4 = 0; i4 < pad.length; i4++) {
            pad[i4] ^= 54;
          }
          this._inner.update(pad);
          for (var i4 = 0; i4 < pad.length; i4++) {
            pad[i4] ^= 54 ^ 92;
          }
          this._outer.update(pad);
          if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
            this._innerKeyedState = this._inner.saveState();
            this._outerKeyedState = this._outer.saveState();
          }
          wipe_1.wipe(pad);
        }
        HMAC2.prototype.reset = function() {
          if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
            throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
          }
          this._inner.restoreState(this._innerKeyedState);
          this._outer.restoreState(this._outerKeyedState);
          this._finished = false;
          return this;
        };
        HMAC2.prototype.clean = function() {
          if (hash_1.isSerializableHash(this._inner)) {
            this._inner.cleanSavedState(this._innerKeyedState);
          }
          if (hash_1.isSerializableHash(this._outer)) {
            this._outer.cleanSavedState(this._outerKeyedState);
          }
          this._inner.clean();
          this._outer.clean();
        };
        HMAC2.prototype.update = function(data) {
          this._inner.update(data);
          return this;
        };
        HMAC2.prototype.finish = function(out) {
          if (this._finished) {
            this._outer.finish(out);
            return this;
          }
          this._inner.finish(out);
          this._outer.update(out.subarray(0, this.digestLength)).finish(out);
          this._finished = true;
          return this;
        };
        HMAC2.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        HMAC2.prototype.saveState = function() {
          if (!hash_1.isSerializableHash(this._inner)) {
            throw new Error("hmac: can't saveState() because hash doesn't implement it");
          }
          return this._inner.saveState();
        };
        HMAC2.prototype.restoreState = function(savedState) {
          if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
            throw new Error("hmac: can't restoreState() because hash doesn't implement it");
          }
          this._inner.restoreState(savedState);
          this._outer.restoreState(this._outerKeyedState);
          this._finished = false;
          return this;
        };
        HMAC2.prototype.cleanSavedState = function(savedState) {
          if (!hash_1.isSerializableHash(this._inner)) {
            throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
          }
          this._inner.cleanSavedState(savedState);
        };
        return HMAC2;
      }()
    );
    exports.HMAC = HMAC;
    function hmac(hash, key, data) {
      var h5 = new HMAC(hash, key);
      h5.update(data);
      var digest2 = h5.digest();
      h5.clean();
      return digest2;
    }
    exports.hmac = hmac;
    exports.equal = constant_time_1.equal;
  }
});

// node_modules/@stablelib/hkdf/lib/hkdf.js
var require_hkdf = __commonJS({
  "node_modules/@stablelib/hkdf/lib/hkdf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hmac_1 = require_hmac();
    var wipe_1 = require_wipe();
    var HKDF = (
      /** @class */
      function() {
        function HKDF2(hash, key, salt, info) {
          if (salt === void 0) {
            salt = new Uint8Array(0);
          }
          this._counter = new Uint8Array(1);
          this._hash = hash;
          this._info = info;
          var okm = hmac_1.hmac(this._hash, salt, key);
          this._hmac = new hmac_1.HMAC(hash, okm);
          this._buffer = new Uint8Array(this._hmac.digestLength);
          this._bufpos = this._buffer.length;
        }
        HKDF2.prototype._fillBuffer = function() {
          this._counter[0]++;
          var ctr = this._counter[0];
          if (ctr === 0) {
            throw new Error("hkdf: cannot expand more");
          }
          this._hmac.reset();
          if (ctr > 1) {
            this._hmac.update(this._buffer);
          }
          if (this._info) {
            this._hmac.update(this._info);
          }
          this._hmac.update(this._counter);
          this._hmac.finish(this._buffer);
          this._bufpos = 0;
        };
        HKDF2.prototype.expand = function(length2) {
          var out = new Uint8Array(length2);
          for (var i4 = 0; i4 < out.length; i4++) {
            if (this._bufpos === this._buffer.length) {
              this._fillBuffer();
            }
            out[i4] = this._buffer[this._bufpos++];
          }
          return out;
        };
        HKDF2.prototype.clean = function() {
          this._hmac.clean();
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._counter);
          this._bufpos = 0;
        };
        return HKDF2;
      }()
    );
    exports.HKDF = HKDF;
  }
});

// node_modules/@stablelib/random/lib/source/browser.js
var require_browser = __commonJS({
  "node_modules/@stablelib/random/lib/source/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserRandomSource = void 0;
    var QUOTA = 65536;
    var BrowserRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
          this._crypto = browserCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length2);
        for (let i4 = 0; i4 < out.length; i4 += QUOTA) {
          this._crypto.getRandomValues(out.subarray(i4, i4 + Math.min(out.length - i4, QUOTA)));
        }
        return out;
      }
    };
    exports.BrowserRandomSource = BrowserRandomSource;
  }
});

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_3, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@stablelib/random/lib/source/node.js
var require_node = __commonJS({
  "node_modules/@stablelib/random/lib/source/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRandomSource = void 0;
    var wipe_1 = require_wipe();
    var NodeRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        if (typeof __require !== "undefined") {
          const nodeCrypto = require_crypto();
          if (nodeCrypto && nodeCrypto.randomBytes) {
            this._crypto = nodeCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
          }
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Node.js random byte generator is not available.");
        }
        let buffer = this._crypto.randomBytes(length2);
        if (buffer.length !== length2) {
          throw new Error("NodeRandomSource: got fewer bytes than requested");
        }
        const out = new Uint8Array(length2);
        for (let i4 = 0; i4 < out.length; i4++) {
          out[i4] = buffer[i4];
        }
        (0, wipe_1.wipe)(buffer);
        return out;
      }
    };
    exports.NodeRandomSource = NodeRandomSource;
  }
});

// node_modules/@stablelib/random/lib/source/system.js
var require_system = __commonJS({
  "node_modules/@stablelib/random/lib/source/system.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SystemRandomSource = void 0;
    var browser_1 = require_browser();
    var node_1 = require_node();
    var SystemRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.name = "";
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Browser";
          return;
        }
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Node";
          return;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable) {
          throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length2);
      }
    };
    exports.SystemRandomSource = SystemRandomSource;
  }
});

// node_modules/@stablelib/random/lib/random.js
var require_random = __commonJS({
  "node_modules/@stablelib/random/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
    var system_1 = require_system();
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.defaultRandomSource = new system_1.SystemRandomSource();
    function randomBytes2(length2, prng = exports.defaultRandomSource) {
      return prng.randomBytes(length2);
    }
    exports.randomBytes = randomBytes2;
    function randomUint32(prng = exports.defaultRandomSource) {
      const buf = randomBytes2(4, prng);
      const result = (0, binary_1.readUint32LE)(buf);
      (0, wipe_1.wipe)(buf);
      return result;
    }
    exports.randomUint32 = randomUint32;
    var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function randomString(length2, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      if (charset.length < 2) {
        throw new Error("randomString charset is too short");
      }
      if (charset.length > 256) {
        throw new Error("randomString charset is too long");
      }
      let out = "";
      const charsLen = charset.length;
      const maxByte = 256 - 256 % charsLen;
      while (length2 > 0) {
        const buf = randomBytes2(Math.ceil(length2 * 256 / maxByte), prng);
        for (let i4 = 0; i4 < buf.length && length2 > 0; i4++) {
          const randomByte = buf[i4];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length2--;
          }
        }
        (0, wipe_1.wipe)(buf);
      }
      return out;
    }
    exports.randomString = randomString;
    function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      const length2 = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
      return randomString(length2, charset, prng);
    }
    exports.randomStringForEntropy = randomStringForEntropy;
  }
});

// node_modules/@stablelib/sha256/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/@stablelib/sha256/lib/sha256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 32;
    exports.BLOCK_SIZE = 64;
    var SHA256 = (
      /** @class */
      function() {
        function SHA2562() {
          this.digestLength = exports.DIGEST_LENGTH;
          this.blockSize = exports.BLOCK_SIZE;
          this._state = new Int32Array(8);
          this._temp = new Int32Array(64);
          this._buffer = new Uint8Array(128);
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          this.reset();
        }
        SHA2562.prototype._initState = function() {
          this._state[0] = 1779033703;
          this._state[1] = 3144134277;
          this._state[2] = 1013904242;
          this._state[3] = 2773480762;
          this._state[4] = 1359893119;
          this._state[5] = 2600822924;
          this._state[6] = 528734635;
          this._state[7] = 1541459225;
        };
        SHA2562.prototype.reset = function() {
          this._initState();
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          return this;
        };
        SHA2562.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._temp);
          this.reset();
        };
        SHA2562.prototype.update = function(data, dataLength) {
          if (dataLength === void 0) {
            dataLength = data.length;
          }
          if (this._finished) {
            throw new Error("SHA256: can't update because hash was finished.");
          }
          var dataPos = 0;
          this._bytesHashed += dataLength;
          if (this._bufferLength > 0) {
            while (this._bufferLength < this.blockSize && dataLength > 0) {
              this._buffer[this._bufferLength++] = data[dataPos++];
              dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
              hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
              this._bufferLength = 0;
            }
          }
          if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
            dataLength %= this.blockSize;
          }
          while (dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          return this;
        };
        SHA2562.prototype.finish = function(out) {
          if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 536870912 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 64 < 56 ? 64 : 128;
            this._buffer[left] = 128;
            for (var i4 = left + 1; i4 < padLength - 8; i4++) {
              this._buffer[i4] = 0;
            }
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
            this._finished = true;
          }
          for (var i4 = 0; i4 < this.digestLength / 4; i4++) {
            binary_1.writeUint32BE(this._state[i4], out, i4 * 4);
          }
          return this;
        };
        SHA2562.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        SHA2562.prototype.saveState = function() {
          if (this._finished) {
            throw new Error("SHA256: cannot save finished state");
          }
          return {
            state: new Int32Array(this._state),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
          };
        };
        SHA2562.prototype.restoreState = function(savedState) {
          this._state.set(savedState.state);
          this._bufferLength = savedState.bufferLength;
          if (savedState.buffer) {
            this._buffer.set(savedState.buffer);
          }
          this._bytesHashed = savedState.bytesHashed;
          this._finished = false;
          return this;
        };
        SHA2562.prototype.cleanSavedState = function(savedState) {
          wipe_1.wipe(savedState.state);
          if (savedState.buffer) {
            wipe_1.wipe(savedState.buffer);
          }
          savedState.bufferLength = 0;
          savedState.bytesHashed = 0;
        };
        return SHA2562;
      }()
    );
    exports.SHA256 = SHA256;
    var K4 = new Int32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    function hashBlocks(w4, v4, p3, pos, len) {
      while (len >= 64) {
        var a4 = v4[0];
        var b4 = v4[1];
        var c5 = v4[2];
        var d3 = v4[3];
        var e2 = v4[4];
        var f4 = v4[5];
        var g3 = v4[6];
        var h5 = v4[7];
        for (var i4 = 0; i4 < 16; i4++) {
          var j4 = pos + i4 * 4;
          w4[i4] = binary_1.readUint32BE(p3, j4);
        }
        for (var i4 = 16; i4 < 64; i4++) {
          var u3 = w4[i4 - 2];
          var t1 = (u3 >>> 17 | u3 << 32 - 17) ^ (u3 >>> 19 | u3 << 32 - 19) ^ u3 >>> 10;
          u3 = w4[i4 - 15];
          var t2 = (u3 >>> 7 | u3 << 32 - 7) ^ (u3 >>> 18 | u3 << 32 - 18) ^ u3 >>> 3;
          w4[i4] = (t1 + w4[i4 - 7] | 0) + (t2 + w4[i4 - 16] | 0);
        }
        for (var i4 = 0; i4 < 64; i4++) {
          var t1 = (((e2 >>> 6 | e2 << 32 - 6) ^ (e2 >>> 11 | e2 << 32 - 11) ^ (e2 >>> 25 | e2 << 32 - 25)) + (e2 & f4 ^ ~e2 & g3) | 0) + (h5 + (K4[i4] + w4[i4] | 0) | 0) | 0;
          var t2 = ((a4 >>> 2 | a4 << 32 - 2) ^ (a4 >>> 13 | a4 << 32 - 13) ^ (a4 >>> 22 | a4 << 32 - 22)) + (a4 & b4 ^ a4 & c5 ^ b4 & c5) | 0;
          h5 = g3;
          g3 = f4;
          f4 = e2;
          e2 = d3 + t1 | 0;
          d3 = c5;
          c5 = b4;
          b4 = a4;
          a4 = t1 + t2 | 0;
        }
        v4[0] += a4;
        v4[1] += b4;
        v4[2] += c5;
        v4[3] += d3;
        v4[4] += e2;
        v4[5] += f4;
        v4[6] += g3;
        v4[7] += h5;
        pos += 64;
        len -= 64;
      }
      return pos;
    }
    function hash(data) {
      var h5 = new SHA256();
      h5.update(data);
      var digest2 = h5.digest();
      h5.clean();
      return digest2;
    }
    exports.hash = hash;
  }
});

// node_modules/@stablelib/x25519/lib/x25519.js
var require_x25519 = __commonJS({
  "node_modules/@stablelib/x25519/lib/x25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
    var random_1 = require_random();
    var wipe_1 = require_wipe();
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 32;
    exports.SHARED_KEY_LENGTH = 32;
    function gf2(init) {
      const r3 = new Float64Array(16);
      if (init) {
        for (let i4 = 0; i4 < init.length; i4++) {
          r3[i4] = init[i4];
        }
      }
      return r3;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var _121665 = gf2([56129, 1]);
    function car25519(o4) {
      let c5 = 1;
      for (let i4 = 0; i4 < 16; i4++) {
        let v4 = o4[i4] + c5 + 65535;
        c5 = Math.floor(v4 / 65536);
        o4[i4] = v4 - c5 * 65536;
      }
      o4[0] += c5 - 1 + 37 * (c5 - 1);
    }
    function sel25519(p3, q2, b4) {
      const c5 = ~(b4 - 1);
      for (let i4 = 0; i4 < 16; i4++) {
        const t = c5 & (p3[i4] ^ q2[i4]);
        p3[i4] ^= t;
        q2[i4] ^= t;
      }
    }
    function pack25519(o4, n5) {
      const m2 = gf2();
      const t = gf2();
      for (let i4 = 0; i4 < 16; i4++) {
        t[i4] = n5[i4];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j4 = 0; j4 < 2; j4++) {
        m2[0] = t[0] - 65517;
        for (let i4 = 1; i4 < 15; i4++) {
          m2[i4] = t[i4] - 65535 - (m2[i4 - 1] >> 16 & 1);
          m2[i4 - 1] &= 65535;
        }
        m2[15] = t[15] - 32767 - (m2[14] >> 16 & 1);
        const b4 = m2[15] >> 16 & 1;
        m2[14] &= 65535;
        sel25519(t, m2, 1 - b4);
      }
      for (let i4 = 0; i4 < 16; i4++) {
        o4[2 * i4] = t[i4] & 255;
        o4[2 * i4 + 1] = t[i4] >> 8;
      }
    }
    function unpack25519(o4, n5) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = n5[2 * i4] + (n5[2 * i4 + 1] << 8);
      }
      o4[15] &= 32767;
    }
    function add(o4, a4, b4) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = a4[i4] + b4[i4];
      }
    }
    function sub(o4, a4, b4) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = a4[i4] - b4[i4];
      }
    }
    function mul(o4, a4, b4) {
      let v4, c5, t02 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b02 = b4[0], b1 = b4[1], b22 = b4[2], b32 = b4[3], b42 = b4[4], b5 = b4[5], b6 = b4[6], b7 = b4[7], b8 = b4[8], b9 = b4[9], b10 = b4[10], b11 = b4[11], b12 = b4[12], b13 = b4[13], b14 = b4[14], b15 = b4[15];
      v4 = a4[0];
      t02 += v4 * b02;
      t1 += v4 * b1;
      t2 += v4 * b22;
      t3 += v4 * b32;
      t4 += v4 * b42;
      t5 += v4 * b5;
      t6 += v4 * b6;
      t7 += v4 * b7;
      t8 += v4 * b8;
      t9 += v4 * b9;
      t10 += v4 * b10;
      t11 += v4 * b11;
      t12 += v4 * b12;
      t13 += v4 * b13;
      t14 += v4 * b14;
      t15 += v4 * b15;
      v4 = a4[1];
      t1 += v4 * b02;
      t2 += v4 * b1;
      t3 += v4 * b22;
      t4 += v4 * b32;
      t5 += v4 * b42;
      t6 += v4 * b5;
      t7 += v4 * b6;
      t8 += v4 * b7;
      t9 += v4 * b8;
      t10 += v4 * b9;
      t11 += v4 * b10;
      t12 += v4 * b11;
      t13 += v4 * b12;
      t14 += v4 * b13;
      t15 += v4 * b14;
      t16 += v4 * b15;
      v4 = a4[2];
      t2 += v4 * b02;
      t3 += v4 * b1;
      t4 += v4 * b22;
      t5 += v4 * b32;
      t6 += v4 * b42;
      t7 += v4 * b5;
      t8 += v4 * b6;
      t9 += v4 * b7;
      t10 += v4 * b8;
      t11 += v4 * b9;
      t12 += v4 * b10;
      t13 += v4 * b11;
      t14 += v4 * b12;
      t15 += v4 * b13;
      t16 += v4 * b14;
      t17 += v4 * b15;
      v4 = a4[3];
      t3 += v4 * b02;
      t4 += v4 * b1;
      t5 += v4 * b22;
      t6 += v4 * b32;
      t7 += v4 * b42;
      t8 += v4 * b5;
      t9 += v4 * b6;
      t10 += v4 * b7;
      t11 += v4 * b8;
      t12 += v4 * b9;
      t13 += v4 * b10;
      t14 += v4 * b11;
      t15 += v4 * b12;
      t16 += v4 * b13;
      t17 += v4 * b14;
      t18 += v4 * b15;
      v4 = a4[4];
      t4 += v4 * b02;
      t5 += v4 * b1;
      t6 += v4 * b22;
      t7 += v4 * b32;
      t8 += v4 * b42;
      t9 += v4 * b5;
      t10 += v4 * b6;
      t11 += v4 * b7;
      t12 += v4 * b8;
      t13 += v4 * b9;
      t14 += v4 * b10;
      t15 += v4 * b11;
      t16 += v4 * b12;
      t17 += v4 * b13;
      t18 += v4 * b14;
      t19 += v4 * b15;
      v4 = a4[5];
      t5 += v4 * b02;
      t6 += v4 * b1;
      t7 += v4 * b22;
      t8 += v4 * b32;
      t9 += v4 * b42;
      t10 += v4 * b5;
      t11 += v4 * b6;
      t12 += v4 * b7;
      t13 += v4 * b8;
      t14 += v4 * b9;
      t15 += v4 * b10;
      t16 += v4 * b11;
      t17 += v4 * b12;
      t18 += v4 * b13;
      t19 += v4 * b14;
      t20 += v4 * b15;
      v4 = a4[6];
      t6 += v4 * b02;
      t7 += v4 * b1;
      t8 += v4 * b22;
      t9 += v4 * b32;
      t10 += v4 * b42;
      t11 += v4 * b5;
      t12 += v4 * b6;
      t13 += v4 * b7;
      t14 += v4 * b8;
      t15 += v4 * b9;
      t16 += v4 * b10;
      t17 += v4 * b11;
      t18 += v4 * b12;
      t19 += v4 * b13;
      t20 += v4 * b14;
      t21 += v4 * b15;
      v4 = a4[7];
      t7 += v4 * b02;
      t8 += v4 * b1;
      t9 += v4 * b22;
      t10 += v4 * b32;
      t11 += v4 * b42;
      t12 += v4 * b5;
      t13 += v4 * b6;
      t14 += v4 * b7;
      t15 += v4 * b8;
      t16 += v4 * b9;
      t17 += v4 * b10;
      t18 += v4 * b11;
      t19 += v4 * b12;
      t20 += v4 * b13;
      t21 += v4 * b14;
      t22 += v4 * b15;
      v4 = a4[8];
      t8 += v4 * b02;
      t9 += v4 * b1;
      t10 += v4 * b22;
      t11 += v4 * b32;
      t12 += v4 * b42;
      t13 += v4 * b5;
      t14 += v4 * b6;
      t15 += v4 * b7;
      t16 += v4 * b8;
      t17 += v4 * b9;
      t18 += v4 * b10;
      t19 += v4 * b11;
      t20 += v4 * b12;
      t21 += v4 * b13;
      t22 += v4 * b14;
      t23 += v4 * b15;
      v4 = a4[9];
      t9 += v4 * b02;
      t10 += v4 * b1;
      t11 += v4 * b22;
      t12 += v4 * b32;
      t13 += v4 * b42;
      t14 += v4 * b5;
      t15 += v4 * b6;
      t16 += v4 * b7;
      t17 += v4 * b8;
      t18 += v4 * b9;
      t19 += v4 * b10;
      t20 += v4 * b11;
      t21 += v4 * b12;
      t22 += v4 * b13;
      t23 += v4 * b14;
      t24 += v4 * b15;
      v4 = a4[10];
      t10 += v4 * b02;
      t11 += v4 * b1;
      t12 += v4 * b22;
      t13 += v4 * b32;
      t14 += v4 * b42;
      t15 += v4 * b5;
      t16 += v4 * b6;
      t17 += v4 * b7;
      t18 += v4 * b8;
      t19 += v4 * b9;
      t20 += v4 * b10;
      t21 += v4 * b11;
      t22 += v4 * b12;
      t23 += v4 * b13;
      t24 += v4 * b14;
      t25 += v4 * b15;
      v4 = a4[11];
      t11 += v4 * b02;
      t12 += v4 * b1;
      t13 += v4 * b22;
      t14 += v4 * b32;
      t15 += v4 * b42;
      t16 += v4 * b5;
      t17 += v4 * b6;
      t18 += v4 * b7;
      t19 += v4 * b8;
      t20 += v4 * b9;
      t21 += v4 * b10;
      t22 += v4 * b11;
      t23 += v4 * b12;
      t24 += v4 * b13;
      t25 += v4 * b14;
      t26 += v4 * b15;
      v4 = a4[12];
      t12 += v4 * b02;
      t13 += v4 * b1;
      t14 += v4 * b22;
      t15 += v4 * b32;
      t16 += v4 * b42;
      t17 += v4 * b5;
      t18 += v4 * b6;
      t19 += v4 * b7;
      t20 += v4 * b8;
      t21 += v4 * b9;
      t22 += v4 * b10;
      t23 += v4 * b11;
      t24 += v4 * b12;
      t25 += v4 * b13;
      t26 += v4 * b14;
      t27 += v4 * b15;
      v4 = a4[13];
      t13 += v4 * b02;
      t14 += v4 * b1;
      t15 += v4 * b22;
      t16 += v4 * b32;
      t17 += v4 * b42;
      t18 += v4 * b5;
      t19 += v4 * b6;
      t20 += v4 * b7;
      t21 += v4 * b8;
      t22 += v4 * b9;
      t23 += v4 * b10;
      t24 += v4 * b11;
      t25 += v4 * b12;
      t26 += v4 * b13;
      t27 += v4 * b14;
      t28 += v4 * b15;
      v4 = a4[14];
      t14 += v4 * b02;
      t15 += v4 * b1;
      t16 += v4 * b22;
      t17 += v4 * b32;
      t18 += v4 * b42;
      t19 += v4 * b5;
      t20 += v4 * b6;
      t21 += v4 * b7;
      t22 += v4 * b8;
      t23 += v4 * b9;
      t24 += v4 * b10;
      t25 += v4 * b11;
      t26 += v4 * b12;
      t27 += v4 * b13;
      t28 += v4 * b14;
      t29 += v4 * b15;
      v4 = a4[15];
      t15 += v4 * b02;
      t16 += v4 * b1;
      t17 += v4 * b22;
      t18 += v4 * b32;
      t19 += v4 * b42;
      t20 += v4 * b5;
      t21 += v4 * b6;
      t22 += v4 * b7;
      t23 += v4 * b8;
      t24 += v4 * b9;
      t25 += v4 * b10;
      t26 += v4 * b11;
      t27 += v4 * b12;
      t28 += v4 * b13;
      t29 += v4 * b14;
      t30 += v4 * b15;
      t02 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c5 = 1;
      v4 = t02 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t02 = v4 - c5 * 65536;
      v4 = t1 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t1 = v4 - c5 * 65536;
      v4 = t2 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t2 = v4 - c5 * 65536;
      v4 = t3 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t3 = v4 - c5 * 65536;
      v4 = t4 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t4 = v4 - c5 * 65536;
      v4 = t5 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t5 = v4 - c5 * 65536;
      v4 = t6 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t6 = v4 - c5 * 65536;
      v4 = t7 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t7 = v4 - c5 * 65536;
      v4 = t8 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t8 = v4 - c5 * 65536;
      v4 = t9 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t9 = v4 - c5 * 65536;
      v4 = t10 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t10 = v4 - c5 * 65536;
      v4 = t11 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t11 = v4 - c5 * 65536;
      v4 = t12 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t12 = v4 - c5 * 65536;
      v4 = t13 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t13 = v4 - c5 * 65536;
      v4 = t14 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t14 = v4 - c5 * 65536;
      v4 = t15 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t15 = v4 - c5 * 65536;
      t02 += c5 - 1 + 37 * (c5 - 1);
      c5 = 1;
      v4 = t02 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t02 = v4 - c5 * 65536;
      v4 = t1 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t1 = v4 - c5 * 65536;
      v4 = t2 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t2 = v4 - c5 * 65536;
      v4 = t3 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t3 = v4 - c5 * 65536;
      v4 = t4 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t4 = v4 - c5 * 65536;
      v4 = t5 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t5 = v4 - c5 * 65536;
      v4 = t6 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t6 = v4 - c5 * 65536;
      v4 = t7 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t7 = v4 - c5 * 65536;
      v4 = t8 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t8 = v4 - c5 * 65536;
      v4 = t9 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t9 = v4 - c5 * 65536;
      v4 = t10 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t10 = v4 - c5 * 65536;
      v4 = t11 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t11 = v4 - c5 * 65536;
      v4 = t12 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t12 = v4 - c5 * 65536;
      v4 = t13 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t13 = v4 - c5 * 65536;
      v4 = t14 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t14 = v4 - c5 * 65536;
      v4 = t15 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t15 = v4 - c5 * 65536;
      t02 += c5 - 1 + 37 * (c5 - 1);
      o4[0] = t02;
      o4[1] = t1;
      o4[2] = t2;
      o4[3] = t3;
      o4[4] = t4;
      o4[5] = t5;
      o4[6] = t6;
      o4[7] = t7;
      o4[8] = t8;
      o4[9] = t9;
      o4[10] = t10;
      o4[11] = t11;
      o4[12] = t12;
      o4[13] = t13;
      o4[14] = t14;
      o4[15] = t15;
    }
    function square(o4, a4) {
      mul(o4, a4, a4);
    }
    function inv25519(o4, inp) {
      const c5 = gf2();
      for (let i4 = 0; i4 < 16; i4++) {
        c5[i4] = inp[i4];
      }
      for (let i4 = 253; i4 >= 0; i4--) {
        square(c5, c5);
        if (i4 !== 2 && i4 !== 4) {
          mul(c5, c5, inp);
        }
      }
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = c5[i4];
      }
    }
    function scalarMult(n5, p3) {
      const z6 = new Uint8Array(32);
      const x5 = new Float64Array(80);
      const a4 = gf2(), b4 = gf2(), c5 = gf2(), d3 = gf2(), e2 = gf2(), f4 = gf2();
      for (let i4 = 0; i4 < 31; i4++) {
        z6[i4] = n5[i4];
      }
      z6[31] = n5[31] & 127 | 64;
      z6[0] &= 248;
      unpack25519(x5, p3);
      for (let i4 = 0; i4 < 16; i4++) {
        b4[i4] = x5[i4];
      }
      a4[0] = d3[0] = 1;
      for (let i4 = 254; i4 >= 0; --i4) {
        const r3 = z6[i4 >>> 3] >>> (i4 & 7) & 1;
        sel25519(a4, b4, r3);
        sel25519(c5, d3, r3);
        add(e2, a4, c5);
        sub(a4, a4, c5);
        add(c5, b4, d3);
        sub(b4, b4, d3);
        square(d3, e2);
        square(f4, a4);
        mul(a4, c5, a4);
        mul(c5, b4, e2);
        add(e2, a4, c5);
        sub(a4, a4, c5);
        square(b4, a4);
        sub(c5, d3, f4);
        mul(a4, c5, _121665);
        add(a4, a4, d3);
        mul(c5, c5, a4);
        mul(a4, d3, f4);
        mul(d3, b4, x5);
        square(b4, e2);
        sel25519(a4, b4, r3);
        sel25519(c5, d3, r3);
      }
      for (let i4 = 0; i4 < 16; i4++) {
        x5[i4 + 16] = a4[i4];
        x5[i4 + 32] = c5[i4];
        x5[i4 + 48] = b4[i4];
        x5[i4 + 64] = d3[i4];
      }
      const x32 = x5.subarray(32);
      const x16 = x5.subarray(16);
      inv25519(x32, x32);
      mul(x16, x16, x32);
      const q2 = new Uint8Array(32);
      pack25519(q2, x16);
      return q2;
    }
    exports.scalarMult = scalarMult;
    function scalarMultBase(n5) {
      return scalarMult(n5, _9);
    }
    exports.scalarMultBase = scalarMultBase;
    function generateKeyPairFromSeed2(seed) {
      if (seed.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      const secretKey = new Uint8Array(seed);
      const publicKey = scalarMultBase(secretKey);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
    function generateKeyPair3(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed2(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair3;
    function sharedKey2(mySecretKey, theirPublicKey, rejectZero = false) {
      if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect secret key length");
      }
      if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect public key length");
      }
      const result = scalarMult(mySecretKey, theirPublicKey);
      if (rejectZero) {
        let zeros = 0;
        for (let i4 = 0; i4 < result.length; i4++) {
          zeros |= result[i4];
        }
        if (zeros === 0) {
          throw new Error("X25519: invalid shared key");
        }
      }
      return result;
    }
    exports.sharedKey = sharedKey2;
  }
});

// node_modules/elliptic/package.json
var require_package = __commonJS({
  "node_modules/elliptic/package.json"(exports, module) {
    module.exports = {
      name: "elliptic",
      version: "6.5.7",
      description: "EC cryptography",
      main: "lib/elliptic.js",
      files: [
        "lib"
      ],
      scripts: {
        lint: "eslint lib test",
        "lint:fix": "npm run lint -- --fix",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        test: "npm run lint && npm run unit",
        version: "grunt dist && git add dist/"
      },
      repository: {
        type: "git",
        url: "git@github.com:indutny/elliptic"
      },
      keywords: [
        "EC",
        "Elliptic",
        "curve",
        "Cryptography"
      ],
      author: "Fedor Indutny <fedor@indutny.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/indutny/elliptic/issues"
      },
      homepage: "https://github.com/indutny/elliptic",
      devDependencies: {
        brfs: "^2.0.2",
        coveralls: "^3.1.0",
        eslint: "^7.6.0",
        grunt: "^1.2.1",
        "grunt-browserify": "^5.3.0",
        "grunt-cli": "^1.3.2",
        "grunt-contrib-connect": "^3.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^5.0.0",
        "grunt-mocha-istanbul": "^5.0.2",
        "grunt-saucelabs": "^9.0.1",
        istanbul: "^0.4.5",
        mocha: "^8.0.1"
      },
      dependencies: {
        "bn.js": "^4.11.9",
        brorand: "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        inherits: "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    };
  }
});

// browser-external:buffer
var require_buffer = __commonJS({
  "browser-external:buffer"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_3, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number, base3, endian) {
        if (BN.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base3 === "le" || base3 === "be") {
            endian = base3;
            base3 = 10;
          }
          this._init(number || 0, base3 || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports2.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e2) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN.prototype._init = function init(number, base3, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base3, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base3, endian);
        }
        if (base3 === "hex") {
          base3 = 16;
        }
        assert(base3 === (base3 | 0) && base3 >= 2 && base3 <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base3 === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base3, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base3, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number, base3, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base3, endian);
      };
      BN.prototype._initArray = function _initArray(number, base3, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          this.words[i4] = 0;
        }
        var j4, w4;
        var off = 0;
        if (endian === "be") {
          for (i4 = number.length - 1, j4 = 0; i4 >= 0; i4 -= 3) {
            w4 = number[i4] | number[i4 - 1] << 8 | number[i4 - 2] << 16;
            this.words[j4] |= w4 << off & 67108863;
            this.words[j4 + 1] = w4 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j4++;
            }
          }
        } else if (endian === "le") {
          for (i4 = 0, j4 = 0; i4 < number.length; i4 += 3) {
            w4 = number[i4] | number[i4 + 1] << 8 | number[i4 + 2] << 16;
            this.words[j4] |= w4 << off & 67108863;
            this.words[j4 + 1] = w4 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j4++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string3, index) {
        var c5 = string3.charCodeAt(index);
        if (c5 >= 65 && c5 <= 70) {
          return c5 - 55;
        } else if (c5 >= 97 && c5 <= 102) {
          return c5 - 87;
        } else {
          return c5 - 48 & 15;
        }
      }
      function parseHexByte(string3, lowerBound, index) {
        var r3 = parseHex4Bits(string3, index);
        if (index - 1 >= lowerBound) {
          r3 |= parseHex4Bits(string3, index - 1) << 4;
        }
        return r3;
      }
      BN.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          this.words[i4] = 0;
        }
        var off = 0;
        var j4 = 0;
        var w4;
        if (endian === "be") {
          for (i4 = number.length - 1; i4 >= start; i4 -= 2) {
            w4 = parseHexByte(number, start, i4) << off;
            this.words[j4] |= w4 & 67108863;
            if (off >= 18) {
              off -= 18;
              j4 += 1;
              this.words[j4] |= w4 >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i4 = parseLength % 2 === 0 ? start + 1 : start; i4 < number.length; i4 += 2) {
            w4 = parseHexByte(number, start, i4) << off;
            this.words[j4] |= w4 & 67108863;
            if (off >= 18) {
              off -= 18;
              j4 += 1;
              this.words[j4] |= w4 >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r3 = 0;
        var len = Math.min(str.length, end);
        for (var i4 = start; i4 < len; i4++) {
          var c5 = str.charCodeAt(i4) - 48;
          r3 *= mul;
          if (c5 >= 49) {
            r3 += c5 - 49 + 10;
          } else if (c5 >= 17) {
            r3 += c5 - 17 + 10;
          } else {
            r3 += c5;
          }
        }
        return r3;
      }
      BN.prototype._parseBase = function _parseBase(number, base3, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base3) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base3 | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i4 = start; i4 < end; i4 += limbLen) {
          word = parseBase(number, i4, i4 + limbLen, base3);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i4, number.length, base3);
          for (i4 = 0; i4 < mod; i4++) {
            pow *= base3;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          dest.words[i4] = this.words[i4];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN.prototype.clone = function clone() {
        var r3 = new BN(null);
        this.copy(r3);
        return r3;
      };
      BN.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString4(base3, padding) {
        base3 = base3 || 10;
        padding = padding | 0 || 1;
        var out;
        if (base3 === 16 || base3 === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i4 = 0; i4 < this.length; i4++) {
            var w4 = this.words[i4];
            var word = ((w4 << off | carry) & 16777215).toString(16);
            carry = w4 >>> 24 - off & 16777215;
            if (carry !== 0 || i4 !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
            off += 2;
            if (off >= 26) {
              off -= 26;
              i4--;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base3 === (base3 | 0) && base3 >= 2 && base3 <= 36) {
          var groupSize = groupSizes[base3];
          var groupBase = groupBases[base3];
          out = "";
          var c5 = this.clone();
          c5.negative = 0;
          while (!c5.isZero()) {
            var r3 = c5.modn(groupBase).toString(base3);
            c5 = c5.idivn(groupBase);
            if (!c5.isZero()) {
              out = zeros[groupSize - r3.length] + r3 + out;
            } else {
              out = r3 + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN.prototype.toBuffer = function toBuffer(endian, length2) {
        assert(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length2);
      };
      BN.prototype.toArray = function toArray(endian, length2) {
        return this.toArrayLike(Array, endian, length2);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length2) {
        var byteLength = this.byteLength();
        var reqLength = length2 || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b4, i4;
        var q2 = this.clone();
        if (!littleEndian) {
          for (i4 = 0; i4 < reqLength - byteLength; i4++) {
            res[i4] = 0;
          }
          for (i4 = 0; !q2.isZero(); i4++) {
            b4 = q2.andln(255);
            q2.iushrn(8);
            res[reqLength - i4 - 1] = b4;
          }
        } else {
          for (i4 = 0; !q2.isZero(); i4++) {
            b4 = q2.andln(255);
            q2.iushrn(8);
            res[i4] = b4;
          }
          for (; i4 < reqLength; i4++) {
            res[i4] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w4) {
          return 32 - Math.clz32(w4);
        };
      } else {
        BN.prototype._countBits = function _countBits(w4) {
          var t = w4;
          var r3 = 0;
          if (t >= 4096) {
            r3 += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r3 += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r3 += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r3 += 2;
            t >>>= 2;
          }
          return r3 + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w4) {
        if (w4 === 0)
          return 26;
        var t = w4;
        var r3 = 0;
        if ((t & 8191) === 0) {
          r3 += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r3 += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r3 += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r3 += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r3++;
        }
        return r3;
      };
      BN.prototype.bitLength = function bitLength() {
        var w4 = this.words[this.length - 1];
        var hi2 = this._countBits(w4);
        return (this.length - 1) * 26 + hi2;
      };
      function toBitArray(num) {
        var w4 = new Array(num.bitLength());
        for (var bit = 0; bit < w4.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w4[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w4;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r3 = 0;
        for (var i4 = 0; i4 < this.length; i4++) {
          var b4 = this._zeroBits(this.words[i4]);
          r3 += b4;
          if (b4 !== 26)
            break;
        }
        return r3;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i4 = 0; i4 < num.length; i4++) {
          this.words[i4] = this.words[i4] | num.words[i4];
        }
        return this.strip();
      };
      BN.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or4(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b4;
        if (this.length > num.length) {
          b4 = num;
        } else {
          b4 = this;
        }
        for (var i4 = 0; i4 < b4.length; i4++) {
          this.words[i4] = this.words[i4] & num.words[i4];
        }
        this.length = b4.length;
        return this.strip();
      };
      BN.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a4;
        var b4;
        if (this.length > num.length) {
          a4 = this;
          b4 = num;
        } else {
          a4 = num;
          b4 = this;
        }
        for (var i4 = 0; i4 < b4.length; i4++) {
          this.words[i4] = a4.words[i4] ^ b4.words[i4];
        }
        if (this !== a4) {
          for (; i4 < a4.length; i4++) {
            this.words[i4] = a4.words[i4];
          }
        }
        this.length = a4.length;
        return this.strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor2(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i4 = 0; i4 < bytesNeeded; i4++) {
          this.words[i4] = ~this.words[i4] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i4] = ~this.words[i4] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r3;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r3 = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r3 = this.isub(num);
          num.negative = 1;
          return r3._normSign();
        }
        var a4, b4;
        if (this.length > num.length) {
          a4 = this;
          b4 = num;
        } else {
          a4 = num;
          b4 = this;
        }
        var carry = 0;
        for (var i4 = 0; i4 < b4.length; i4++) {
          r3 = (a4.words[i4] | 0) + (b4.words[i4] | 0) + carry;
          this.words[i4] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        for (; carry !== 0 && i4 < a4.length; i4++) {
          r3 = (a4.words[i4] | 0) + carry;
          this.words[i4] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        this.length = a4.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a4 !== this) {
          for (; i4 < a4.length; i4++) {
            this.words[i4] = a4.words[i4];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r3 = this.iadd(num);
          num.negative = 1;
          return r3._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a4, b4;
        if (cmp > 0) {
          a4 = this;
          b4 = num;
        } else {
          a4 = num;
          b4 = this;
        }
        var carry = 0;
        for (var i4 = 0; i4 < b4.length; i4++) {
          r3 = (a4.words[i4] | 0) - (b4.words[i4] | 0) + carry;
          carry = r3 >> 26;
          this.words[i4] = r3 & 67108863;
        }
        for (; carry !== 0 && i4 < a4.length; i4++) {
          r3 = (a4.words[i4] | 0) + carry;
          carry = r3 >> 26;
          this.words[i4] = r3 & 67108863;
        }
        if (carry === 0 && i4 < a4.length && a4 !== this) {
          for (; i4 < a4.length; i4++) {
            this.words[i4] = a4.words[i4];
          }
        }
        this.length = Math.max(this.length, i4);
        if (a4 !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a4 = self2.words[0] | 0;
        var b4 = num.words[0] | 0;
        var r3 = a4 * b4;
        var lo = r3 & 67108863;
        var carry = r3 / 67108864 | 0;
        out.words[0] = lo;
        for (var k3 = 1; k3 < len; k3++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k3, num.length - 1);
          for (var j4 = Math.max(0, k3 - self2.length + 1); j4 <= maxJ; j4++) {
            var i4 = k3 - j4 | 0;
            a4 = self2.words[i4] | 0;
            b4 = num.words[j4] | 0;
            r3 = a4 * b4 + rword;
            ncarry += r3 / 67108864 | 0;
            rword = r3 & 67108863;
          }
          out.words[k3] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k3] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a4 = self2.words;
        var b4 = num.words;
        var o4 = out.words;
        var c5 = 0;
        var lo;
        var mid;
        var hi2;
        var a02 = a4[0] | 0;
        var al0 = a02 & 8191;
        var ah0 = a02 >>> 13;
        var a1 = a4[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a22 = a4[2] | 0;
        var al2 = a22 & 8191;
        var ah2 = a22 >>> 13;
        var a32 = a4[3] | 0;
        var al3 = a32 & 8191;
        var ah3 = a32 >>> 13;
        var a42 = a4[4] | 0;
        var al4 = a42 & 8191;
        var ah4 = a42 >>> 13;
        var a5 = a4[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a4[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a4[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a4[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a4[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b02 = b4[0] | 0;
        var bl0 = b02 & 8191;
        var bh0 = b02 >>> 13;
        var b1 = b4[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b22 = b4[2] | 0;
        var bl2 = b22 & 8191;
        var bh2 = b22 >>> 13;
        var b32 = b4[3] | 0;
        var bl3 = b32 & 8191;
        var bh3 = b32 >>> 13;
        var b42 = b4[4] | 0;
        var bl4 = b42 & 8191;
        var bh4 = b42 >>> 13;
        var b5 = b4[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b4[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b4[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b4[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b4[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi2 = Math.imul(ah0, bh0);
        var w02 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w02 >>> 26) | 0;
        w02 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi2 = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi2 = hi2 + Math.imul(ah0, bh1) | 0;
        var w1 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi2 = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi2 = hi2 + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi2 = hi2 + Math.imul(ah0, bh2) | 0;
        var w22 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w22 >>> 26) | 0;
        w22 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi2 = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi2 = hi2 + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi2 = hi2 + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi2 = hi2 + Math.imul(ah0, bh3) | 0;
        var w32 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w32 >>> 26) | 0;
        w32 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi2 = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi2 = hi2 + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi2 = hi2 + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi2 = hi2 + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi2 = hi2 + Math.imul(ah0, bh4) | 0;
        var w4 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi2 = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi2 = hi2 + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi2 = hi2 + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi2 = hi2 + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi2 = hi2 + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi2 = hi2 + Math.imul(ah0, bh5) | 0;
        var w5 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi2 = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi2 = hi2 + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi2 = hi2 + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi2 = hi2 + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi2 = hi2 + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi2 = hi2 + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi2 = hi2 + Math.imul(ah0, bh6) | 0;
        var w6 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi2 = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi2 = hi2 + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi2 = hi2 + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi2 = hi2 + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi2 = hi2 + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi2 = hi2 + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi2 = hi2 + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi2 = hi2 + Math.imul(ah0, bh7) | 0;
        var w7 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi2 = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi2 = hi2 + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi2 = hi2 + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi2 = hi2 + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi2 = hi2 + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi2 = hi2 + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi2 = hi2 + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi2 = hi2 + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi2 = hi2 + Math.imul(ah0, bh8) | 0;
        var w8 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi2 = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi2 = hi2 + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi2 = hi2 + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi2 = hi2 + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi2 = hi2 + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi2 = hi2 + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi2 = hi2 + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi2 = hi2 + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi2 = hi2 + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi2 = hi2 + Math.imul(ah0, bh9) | 0;
        var w9 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi2 = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi2 = hi2 + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi2 = hi2 + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi2 = hi2 + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi2 = hi2 + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi2 = hi2 + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi2 = hi2 + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi2 = hi2 + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi2 = hi2 + Math.imul(ah1, bh9) | 0;
        var w10 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi2 = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi2 = hi2 + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi2 = hi2 + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi2 = hi2 + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi2 = hi2 + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi2 = hi2 + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi2 = hi2 + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi2 = hi2 + Math.imul(ah2, bh9) | 0;
        var w11 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi2 = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi2 = hi2 + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi2 = hi2 + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi2 = hi2 + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi2 = hi2 + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi2 = hi2 + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi2 = hi2 + Math.imul(ah3, bh9) | 0;
        var w12 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi2 = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi2 = hi2 + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi2 = hi2 + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi2 = hi2 + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi2 = hi2 + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi2 = hi2 + Math.imul(ah4, bh9) | 0;
        var w13 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi2 = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi2 = hi2 + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi2 = hi2 + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi2 = hi2 + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi2 = hi2 + Math.imul(ah5, bh9) | 0;
        var w14 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi2 = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi2 = hi2 + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi2 = hi2 + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi2 = hi2 + Math.imul(ah6, bh9) | 0;
        var w15 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi2 = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi2 = hi2 + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi2 = hi2 + Math.imul(ah7, bh9) | 0;
        var w16 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi2 = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi2 = hi2 + Math.imul(ah8, bh9) | 0;
        var w17 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi2 = Math.imul(ah9, bh9);
        var w18 = (c5 + lo | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi2 + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o4[0] = w02;
        o4[1] = w1;
        o4[2] = w22;
        o4[3] = w32;
        o4[4] = w4;
        o4[5] = w5;
        o4[6] = w6;
        o4[7] = w7;
        o4[8] = w8;
        o4[9] = w9;
        o4[10] = w10;
        o4[11] = w11;
        o4[12] = w12;
        o4[13] = w13;
        o4[14] = w14;
        o4[15] = w15;
        o4[16] = w16;
        o4[17] = w17;
        o4[18] = w18;
        if (c5 !== 0) {
          o4[19] = c5;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k3 = 0; k3 < out.length - 1; k3++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k3, num.length - 1);
          for (var j4 = Math.max(0, k3 - self2.length + 1); j4 <= maxJ; j4++) {
            var i4 = k3 - j4;
            var a4 = self2.words[i4] | 0;
            var b4 = num.words[j4] | 0;
            var r3 = a4 * b4;
            var lo = r3 & 67108863;
            ncarry = ncarry + (r3 / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k3] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k3] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x5, y6) {
        this.x = x5;
        this.y = y6;
      }
      FFTM.prototype.makeRBT = function makeRBT(N10) {
        var t = new Array(N10);
        var l4 = BN.prototype._countBits(N10) - 1;
        for (var i4 = 0; i4 < N10; i4++) {
          t[i4] = this.revBin(i4, l4, N10);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x5, l4, N10) {
        if (x5 === 0 || x5 === N10 - 1)
          return x5;
        var rb = 0;
        for (var i4 = 0; i4 < l4; i4++) {
          rb |= (x5 & 1) << l4 - i4 - 1;
          x5 >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N10) {
        for (var i4 = 0; i4 < N10; i4++) {
          rtws[i4] = rws[rbt[i4]];
          itws[i4] = iws[rbt[i4]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N10, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N10);
        for (var s3 = 1; s3 < N10; s3 <<= 1) {
          var l4 = s3 << 1;
          var rtwdf = Math.cos(2 * Math.PI / l4);
          var itwdf = Math.sin(2 * Math.PI / l4);
          for (var p3 = 0; p3 < N10; p3 += l4) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j4 = 0; j4 < s3; j4++) {
              var re2 = rtws[p3 + j4];
              var ie2 = itws[p3 + j4];
              var ro2 = rtws[p3 + j4 + s3];
              var io2 = itws[p3 + j4 + s3];
              var rx = rtwdf_ * ro2 - itwdf_ * io2;
              io2 = rtwdf_ * io2 + itwdf_ * ro2;
              ro2 = rx;
              rtws[p3 + j4] = re2 + ro2;
              itws[p3 + j4] = ie2 + io2;
              rtws[p3 + j4 + s3] = re2 - ro2;
              itws[p3 + j4 + s3] = ie2 - io2;
              if (j4 !== l4) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n5, m2) {
        var N10 = Math.max(m2, n5) | 1;
        var odd = N10 & 1;
        var i4 = 0;
        for (N10 = N10 / 2 | 0; N10; N10 = N10 >>> 1) {
          i4++;
        }
        return 1 << i4 + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N10) {
        if (N10 <= 1)
          return;
        for (var i4 = 0; i4 < N10 / 2; i4++) {
          var t = rws[i4];
          rws[i4] = rws[N10 - i4 - 1];
          rws[N10 - i4 - 1] = t;
          t = iws[i4];
          iws[i4] = -iws[N10 - i4 - 1];
          iws[N10 - i4 - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws3, N10) {
        var carry = 0;
        for (var i4 = 0; i4 < N10 / 2; i4++) {
          var w4 = Math.round(ws3[2 * i4 + 1] / N10) * 8192 + Math.round(ws3[2 * i4] / N10) + carry;
          ws3[i4] = w4 & 67108863;
          if (w4 < 67108864) {
            carry = 0;
          } else {
            carry = w4 / 67108864 | 0;
          }
        }
        return ws3;
      };
      FFTM.prototype.convert13b = function convert13b(ws3, len, rws, N10) {
        var carry = 0;
        for (var i4 = 0; i4 < len; i4++) {
          carry = carry + (ws3[i4] | 0);
          rws[2 * i4] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i4 + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i4 = 2 * len; i4 < N10; ++i4) {
          rws[i4] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N10) {
        var ph2 = new Array(N10);
        for (var i4 = 0; i4 < N10; i4++) {
          ph2[i4] = 0;
        }
        return ph2;
      };
      FFTM.prototype.mulp = function mulp(x5, y6, out) {
        var N10 = 2 * this.guessLen13b(x5.length, y6.length);
        var rbt = this.makeRBT(N10);
        var _3 = this.stub(N10);
        var rws = new Array(N10);
        var rwst = new Array(N10);
        var iwst = new Array(N10);
        var nrws = new Array(N10);
        var nrwst = new Array(N10);
        var niwst = new Array(N10);
        var rmws = out.words;
        rmws.length = N10;
        this.convert13b(x5.words, x5.length, rws, N10);
        this.convert13b(y6.words, y6.length, nrws, N10);
        this.transform(rws, _3, rwst, iwst, N10, rbt);
        this.transform(nrws, _3, nrwst, niwst, N10, rbt);
        for (var i4 = 0; i4 < N10; i4++) {
          var rx = rwst[i4] * nrwst[i4] - iwst[i4] * niwst[i4];
          iwst[i4] = rwst[i4] * niwst[i4] + iwst[i4] * nrwst[i4];
          rwst[i4] = rx;
        }
        this.conjugate(rwst, iwst, N10);
        this.transform(rwst, iwst, rmws, _3, N10, rbt);
        this.conjugate(rmws, _3, N10);
        this.normalize13b(rmws, N10);
        out.negative = x5.negative ^ y6.negative;
        out.length = x5.length + y6.length;
        return out.strip();
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i4 = 0; i4 < this.length; i4++) {
          var w4 = (this.words[i4] | 0) * num;
          var lo = (w4 & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w4 / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i4] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i4] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w4 = toBitArray(num);
        if (w4.length === 0)
          return new BN(1);
        var res = this;
        for (var i4 = 0; i4 < w4.length; i4++, res = res.sqr()) {
          if (w4[i4] !== 0)
            break;
        }
        if (++i4 < w4.length) {
          for (var q2 = res.sqr(); i4 < w4.length; i4++, q2 = q2.sqr()) {
            if (w4[i4] === 0)
              continue;
            res = res.mul(q2);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s3 = (bits - r3) / 26;
        var carryMask = 67108863 >>> 26 - r3 << 26 - r3;
        var i4;
        if (r3 !== 0) {
          var carry = 0;
          for (i4 = 0; i4 < this.length; i4++) {
            var newCarry = this.words[i4] & carryMask;
            var c5 = (this.words[i4] | 0) - newCarry << r3;
            this.words[i4] = c5 | carry;
            carry = newCarry >>> 26 - r3;
          }
          if (carry) {
            this.words[i4] = carry;
            this.length++;
          }
        }
        if (s3 !== 0) {
          for (i4 = this.length - 1; i4 >= 0; i4--) {
            this.words[i4 + s3] = this.words[i4];
          }
          for (i4 = 0; i4 < s3; i4++) {
            this.words[i4] = 0;
          }
          this.length += s3;
        }
        return this.strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h5;
        if (hint) {
          h5 = (hint - hint % 26) / 26;
        } else {
          h5 = 0;
        }
        var r3 = bits % 26;
        var s3 = Math.min((bits - r3) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r3 << r3;
        var maskedWords = extended;
        h5 -= s3;
        h5 = Math.max(0, h5);
        if (maskedWords) {
          for (var i4 = 0; i4 < s3; i4++) {
            maskedWords.words[i4] = this.words[i4];
          }
          maskedWords.length = s3;
        }
        if (s3 === 0) {
        } else if (this.length > s3) {
          this.length -= s3;
          for (i4 = 0; i4 < this.length; i4++) {
            this.words[i4] = this.words[i4 + s3];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i4 = this.length - 1; i4 >= 0 && (carry !== 0 || i4 >= h5); i4--) {
          var word = this.words[i4] | 0;
          this.words[i4] = carry << 26 - r3 | word >>> r3;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r3 = bit % 26;
        var s3 = (bit - r3) / 26;
        var q2 = 1 << r3;
        if (this.length <= s3)
          return false;
        var w4 = this.words[s3];
        return !!(w4 & q2);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s3 = (bits - r3) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s3) {
          return this;
        }
        if (r3 !== 0) {
          s3++;
        }
        this.length = Math.min(s3, this.length);
        if (r3 !== 0) {
          var mask = 67108863 ^ 67108863 >>> r3 << r3;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i4 = 0; i4 < this.length && this.words[i4] >= 67108864; i4++) {
          this.words[i4] -= 67108864;
          if (i4 === this.length - 1) {
            this.words[i4 + 1] = 1;
          } else {
            this.words[i4 + 1]++;
          }
        }
        this.length = Math.max(this.length, i4 + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i4 = 0; i4 < this.length && this.words[i4] < 0; i4++) {
            this.words[i4] += 67108864;
            this.words[i4 + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i4;
        this._expand(len);
        var w4;
        var carry = 0;
        for (i4 = 0; i4 < num.length; i4++) {
          w4 = (this.words[i4 + shift] | 0) + carry;
          var right = (num.words[i4] | 0) * mul;
          w4 -= right & 67108863;
          carry = (w4 >> 26) - (right / 67108864 | 0);
          this.words[i4 + shift] = w4 & 67108863;
        }
        for (; i4 < this.length - shift; i4++) {
          w4 = (this.words[i4 + shift] | 0) + carry;
          carry = w4 >> 26;
          this.words[i4 + shift] = w4 & 67108863;
        }
        if (carry === 0)
          return this.strip();
        assert(carry === -1);
        carry = 0;
        for (i4 = 0; i4 < this.length; i4++) {
          w4 = -(this.words[i4] | 0) + carry;
          carry = w4 >> 26;
          this.words[i4] = w4 & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a4 = this.clone();
        var b4 = num;
        var bhi = b4.words[b4.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b4 = b4.ushln(shift);
          a4.iushln(shift);
          bhi = b4.words[b4.length - 1] | 0;
        }
        var m2 = a4.length - b4.length;
        var q2;
        if (mode !== "mod") {
          q2 = new BN(null);
          q2.length = m2 + 1;
          q2.words = new Array(q2.length);
          for (var i4 = 0; i4 < q2.length; i4++) {
            q2.words[i4] = 0;
          }
        }
        var diff = a4.clone()._ishlnsubmul(b4, 1, m2);
        if (diff.negative === 0) {
          a4 = diff;
          if (q2) {
            q2.words[m2] = 1;
          }
        }
        for (var j4 = m2 - 1; j4 >= 0; j4--) {
          var qj = (a4.words[b4.length + j4] | 0) * 67108864 + (a4.words[b4.length + j4 - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a4._ishlnsubmul(b4, qj, j4);
          while (a4.negative !== 0) {
            qj--;
            a4.negative = 0;
            a4._ishlnsubmul(b4, 1, j4);
            if (!a4.isZero()) {
              a4.negative ^= 1;
            }
          }
          if (q2) {
            q2.words[j4] = qj;
          }
        }
        if (q2) {
          q2.strip();
        }
        a4.strip();
        if (mode !== "div" && shift !== 0) {
          a4.iushrn(shift);
        }
        return {
          div: q2 || null,
          mod: a4
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r22 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r22 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modn = function modn(num) {
        assert(num <= 67108863);
        var p3 = (1 << 26) % num;
        var acc = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          acc = (p3 * acc + (this.words[i4] | 0)) % num;
        }
        return acc;
      };
      BN.prototype.idivn = function idivn(num) {
        assert(num <= 67108863);
        var carry = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          var w4 = (this.words[i4] | 0) + carry * 67108864;
          this.words[i4] = w4 / num | 0;
          carry = w4 % num;
        }
        return this.strip();
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p3) {
        assert(p3.negative === 0);
        assert(!p3.isZero());
        var x5 = this;
        var y6 = p3.clone();
        if (x5.negative !== 0) {
          x5 = x5.umod(p3);
        } else {
          x5 = x5.clone();
        }
        var A3 = new BN(1);
        var B3 = new BN(0);
        var C4 = new BN(0);
        var D3 = new BN(1);
        var g3 = 0;
        while (x5.isEven() && y6.isEven()) {
          x5.iushrn(1);
          y6.iushrn(1);
          ++g3;
        }
        var yp = y6.clone();
        var xp = x5.clone();
        while (!x5.isZero()) {
          for (var i4 = 0, im = 1; (x5.words[0] & im) === 0 && i4 < 26; ++i4, im <<= 1)
            ;
          if (i4 > 0) {
            x5.iushrn(i4);
            while (i4-- > 0) {
              if (A3.isOdd() || B3.isOdd()) {
                A3.iadd(yp);
                B3.isub(xp);
              }
              A3.iushrn(1);
              B3.iushrn(1);
            }
          }
          for (var j4 = 0, jm = 1; (y6.words[0] & jm) === 0 && j4 < 26; ++j4, jm <<= 1)
            ;
          if (j4 > 0) {
            y6.iushrn(j4);
            while (j4-- > 0) {
              if (C4.isOdd() || D3.isOdd()) {
                C4.iadd(yp);
                D3.isub(xp);
              }
              C4.iushrn(1);
              D3.iushrn(1);
            }
          }
          if (x5.cmp(y6) >= 0) {
            x5.isub(y6);
            A3.isub(C4);
            B3.isub(D3);
          } else {
            y6.isub(x5);
            C4.isub(A3);
            D3.isub(B3);
          }
        }
        return {
          a: C4,
          b: D3,
          gcd: y6.iushln(g3)
        };
      };
      BN.prototype._invmp = function _invmp(p3) {
        assert(p3.negative === 0);
        assert(!p3.isZero());
        var a4 = this;
        var b4 = p3.clone();
        if (a4.negative !== 0) {
          a4 = a4.umod(p3);
        } else {
          a4 = a4.clone();
        }
        var x1 = new BN(1);
        var x22 = new BN(0);
        var delta = b4.clone();
        while (a4.cmpn(1) > 0 && b4.cmpn(1) > 0) {
          for (var i4 = 0, im = 1; (a4.words[0] & im) === 0 && i4 < 26; ++i4, im <<= 1)
            ;
          if (i4 > 0) {
            a4.iushrn(i4);
            while (i4-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j4 = 0, jm = 1; (b4.words[0] & jm) === 0 && j4 < 26; ++j4, jm <<= 1)
            ;
          if (j4 > 0) {
            b4.iushrn(j4);
            while (j4-- > 0) {
              if (x22.isOdd()) {
                x22.iadd(delta);
              }
              x22.iushrn(1);
            }
          }
          if (a4.cmp(b4) >= 0) {
            a4.isub(b4);
            x1.isub(x22);
          } else {
            b4.isub(a4);
            x22.isub(x1);
          }
        }
        var res;
        if (a4.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x22;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p3);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a4 = this.clone();
        var b4 = num.clone();
        a4.negative = 0;
        b4.negative = 0;
        for (var shift = 0; a4.isEven() && b4.isEven(); shift++) {
          a4.iushrn(1);
          b4.iushrn(1);
        }
        do {
          while (a4.isEven()) {
            a4.iushrn(1);
          }
          while (b4.isEven()) {
            b4.iushrn(1);
          }
          var r3 = a4.cmp(b4);
          if (r3 < 0) {
            var t = a4;
            a4 = b4;
            b4 = t;
          } else if (r3 === 0 || b4.cmpn(1) === 0) {
            break;
          }
          a4.isub(b4);
        } while (true);
        return b4.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r3 = bit % 26;
        var s3 = (bit - r3) / 26;
        var q2 = 1 << r3;
        if (this.length <= s3) {
          this._expand(s3 + 1);
          this.words[s3] |= q2;
          return this;
        }
        var carry = q2;
        for (var i4 = s3; carry !== 0 && i4 < this.length; i4++) {
          var w4 = this.words[i4] | 0;
          w4 += carry;
          carry = w4 >>> 26;
          w4 &= 67108863;
          this.words[i4] = w4;
        }
        if (carry !== 0) {
          this.words[i4] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w4 = this.words[0] | 0;
          res = w4 === num ? 0 : w4 < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          var a4 = this.words[i4] | 0;
          var b4 = num.words[i4] | 0;
          if (a4 === b4)
            continue;
          if (a4 < b4) {
            res = -1;
          } else if (a4 > b4) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt3(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt3(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p3) {
        this.name = name2;
        this.p = new BN(p3, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r3 = num;
        var rlen;
        do {
          this.split(r3, this.tmp);
          r3 = this.imulK(r3);
          r3 = r3.iadd(this.tmp);
          rlen = r3.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r3.ucmp(this.p);
        if (cmp === 0) {
          r3.words[0] = 0;
          r3.length = 1;
        } else if (cmp > 0) {
          r3.isub(this.p);
        } else {
          if (r3.strip !== void 0) {
            r3.strip();
          } else {
            r3._strip();
          }
        }
        return r3;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i4 = 0; i4 < outLen; i4++) {
          output.words[i4] = input.words[i4];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i4 = 10; i4 < input.length; i4++) {
          var next = input.words[i4] | 0;
          input.words[i4 - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i4 - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i4 = 0; i4 < num.length; i4++) {
          var w4 = num.words[i4] | 0;
          lo += w4 * 977;
          num.words[i4] = lo & 67108863;
          lo = w4 * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i4 = 0; i4 < num.length; i4++) {
          var hi2 = (num.words[i4] | 0) * 19 + carry;
          var lo = hi2 & 67108863;
          hi2 >>>= 26;
          num.words[i4] = lo;
          carry = hi2;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name2) {
        if (primes[name2])
          return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m2) {
        if (typeof m2 === "string") {
          var prime = BN._prime(m2);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m2.gtn(1), "modulus must be greater than 1");
          this.m = m2;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a4) {
        assert(a4.negative === 0, "red works only with positives");
        assert(a4.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a4, b4) {
        assert((a4.negative | b4.negative) === 0, "red works only with positives");
        assert(
          a4.red && a4.red === b4.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a4) {
        if (this.prime)
          return this.prime.ireduce(a4)._forceRed(this);
        return a4.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a4) {
        if (a4.isZero()) {
          return a4.clone();
        }
        return this.m.sub(a4)._forceRed(this);
      };
      Red.prototype.add = function add(a4, b4) {
        this._verify2(a4, b4);
        var res = a4.add(b4);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a4, b4) {
        this._verify2(a4, b4);
        var res = a4.iadd(b4);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a4, b4) {
        this._verify2(a4, b4);
        var res = a4.sub(b4);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a4, b4) {
        this._verify2(a4, b4);
        var res = a4.isub(b4);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a4, num) {
        this._verify1(a4);
        return this.imod(a4.ushln(num));
      };
      Red.prototype.imul = function imul(a4, b4) {
        this._verify2(a4, b4);
        return this.imod(a4.imul(b4));
      };
      Red.prototype.mul = function mul(a4, b4) {
        this._verify2(a4, b4);
        return this.imod(a4.mul(b4));
      };
      Red.prototype.isqr = function isqr(a4) {
        return this.imul(a4, a4.clone());
      };
      Red.prototype.sqr = function sqr(a4) {
        return this.mul(a4, a4);
      };
      Red.prototype.sqrt = function sqrt(a4) {
        if (a4.isZero())
          return a4.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a4, pow);
        }
        var q2 = this.m.subn(1);
        var s3 = 0;
        while (!q2.isZero() && q2.andln(1) === 0) {
          s3++;
          q2.iushrn(1);
        }
        assert(!q2.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z6 = this.m.bitLength();
        z6 = new BN(2 * z6 * z6).toRed(this);
        while (this.pow(z6, lpow).cmp(nOne) !== 0) {
          z6.redIAdd(nOne);
        }
        var c5 = this.pow(z6, q2);
        var r3 = this.pow(a4, q2.addn(1).iushrn(1));
        var t = this.pow(a4, q2);
        var m2 = s3;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i4 = 0; tmp.cmp(one) !== 0; i4++) {
            tmp = tmp.redSqr();
          }
          assert(i4 < m2);
          var b4 = this.pow(c5, new BN(1).iushln(m2 - i4 - 1));
          r3 = r3.redMul(b4);
          c5 = b4.redSqr();
          t = t.redMul(c5);
          m2 = i4;
        }
        return r3;
      };
      Red.prototype.invm = function invm(a4) {
        var inv = a4._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a4, num) {
        if (num.isZero())
          return new BN(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a4.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a4;
        for (var i4 = 2; i4 < wnd.length; i4++) {
          wnd[i4] = this.mul(wnd[i4 - 1], a4);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i4 = num.length - 1; i4 >= 0; i4--) {
          var word = num.words[i4];
          for (var j4 = start - 1; j4 >= 0; j4--) {
            var bit = word >> j4 & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i4 !== 0 || j4 !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r3 = num.umod(this.m);
        return r3 === num ? r3.clone() : r3;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m2) {
        Red.call(this, m2);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r3 = this.imod(num.mul(this.rinv));
        r3.red = null;
        return r3;
      };
      Mont.prototype.imul = function imul(a4, b4) {
        if (a4.isZero() || b4.isZero()) {
          a4.words[0] = 0;
          a4.length = 1;
          return a4;
        }
        var t = a4.imul(b4);
        var c5 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t.isub(c5).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a4, b4) {
        if (a4.isZero() || b4.isZero())
          return new BN(0)._forceRed(this);
        var t = a4.mul(b4);
        var c5 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t.isub(c5).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a4) {
        var res = this.imod(a4._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "node_modules/minimalistic-assert/index.js"(exports, module) {
    module.exports = assert;
    function assert(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    assert.equal = function assertEqual(l4, r3, msg) {
      if (l4 != r3)
        throw new Error(msg || "Assertion failed: " + l4 + " != " + r3);
    };
  }
});

// node_modules/minimalistic-crypto-utils/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/minimalistic-crypto-utils/lib/utils.js"(exports) {
    "use strict";
    var utils = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i4 = 0; i4 < msg.length; i4++)
          res[i4] = msg[i4] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (var i4 = 0; i4 < msg.length; i4 += 2)
          res.push(parseInt(msg[i4] + msg[i4 + 1], 16));
      } else {
        for (var i4 = 0; i4 < msg.length; i4++) {
          var c5 = msg.charCodeAt(i4);
          var hi2 = c5 >> 8;
          var lo = c5 & 255;
          if (hi2)
            res.push(hi2, lo);
          else
            res.push(lo);
        }
      }
      return res;
    }
    utils.toArray = toArray;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    utils.zero2 = zero2;
    function toHex(msg) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++)
        res += zero2(msg[i4].toString(16));
      return res;
    }
    utils.toHex = toHex;
    utils.encode = function encode5(arr, enc) {
      if (enc === "hex")
        return toHex(arr);
      else
        return arr;
    };
  }
});

// node_modules/elliptic/lib/elliptic/utils.js
var require_utils3 = __commonJS({
  "node_modules/elliptic/lib/elliptic/utils.js"(exports) {
    "use strict";
    var utils = exports;
    var BN = require_bn();
    var minAssert = require_minimalistic_assert();
    var minUtils = require_utils2();
    utils.assert = minAssert;
    utils.toArray = minUtils.toArray;
    utils.zero2 = minUtils.zero2;
    utils.toHex = minUtils.toHex;
    utils.encode = minUtils.encode;
    function getNAF(num, w4, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      var i4;
      for (i4 = 0; i4 < naf.length; i4 += 1) {
        naf[i4] = 0;
      }
      var ws3 = 1 << w4 + 1;
      var k3 = num.clone();
      for (i4 = 0; i4 < naf.length; i4++) {
        var z6;
        var mod = k3.andln(ws3 - 1);
        if (k3.isOdd()) {
          if (mod > (ws3 >> 1) - 1)
            z6 = (ws3 >> 1) - mod;
          else
            z6 = mod;
          k3.isubn(z6);
        } else {
          z6 = 0;
        }
        naf[i4] = z6;
        k3.iushrn(1);
      }
      return naf;
    }
    utils.getNAF = getNAF;
    function getJSF(k1, k22) {
      var jsf = [
        [],
        []
      ];
      k1 = k1.clone();
      k22 = k22.clone();
      var d1 = 0;
      var d22 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k22.cmpn(-d22) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k22.andln(3) + d22 & 3;
        if (m14 === 3)
          m14 = -1;
        if (m24 === 3)
          m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2)
            u1 = -m14;
          else
            u1 = m14;
        }
        jsf[0].push(u1);
        var u22;
        if ((m24 & 1) === 0) {
          u22 = 0;
        } else {
          m8 = k22.andln(7) + d22 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2)
            u22 = -m24;
          else
            u22 = m24;
        }
        jsf[1].push(u22);
        if (2 * d1 === u1 + 1)
          d1 = 1 - d1;
        if (2 * d22 === u22 + 1)
          d22 = 1 - d22;
        k1.iushrn(1);
        k22.iushrn(1);
      }
      return jsf;
    }
    utils.getJSF = getJSF;
    function cachedProperty(obj, name2, computer) {
      var key = "_" + name2;
      obj.prototype[name2] = function cachedProperty2() {
        return this[key] !== void 0 ? this[key] : this[key] = computer.call(this);
      };
    }
    utils.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
    }
    utils.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new BN(bytes, "hex", "le");
    }
    utils.intFromLE = intFromLE;
  }
});

// node_modules/brorand/index.js
var require_brorand = __commonJS({
  "node_modules/brorand/index.js"(exports, module) {
    var r3;
    module.exports = function rand(len) {
      if (!r3)
        r3 = new Rand(null);
      return r3.generate(len);
    };
    function Rand(rand) {
      this.rand = rand;
    }
    module.exports.Rand = Rand;
    Rand.prototype.generate = function generate(len) {
      return this._rand(len);
    };
    Rand.prototype._rand = function _rand(n5) {
      if (this.rand.getBytes)
        return this.rand.getBytes(n5);
      var res = new Uint8Array(n5);
      for (var i4 = 0; i4 < res.length; i4++)
        res[i4] = this.rand.getByte();
      return res;
    };
    if (typeof self === "object") {
      if (self.crypto && self.crypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n5) {
          var arr = new Uint8Array(n5);
          self.crypto.getRandomValues(arr);
          return arr;
        };
      } else if (self.msCrypto && self.msCrypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n5) {
          var arr = new Uint8Array(n5);
          self.msCrypto.getRandomValues(arr);
          return arr;
        };
      } else if (typeof window === "object") {
        Rand.prototype._rand = function() {
          throw new Error("Not implemented yet");
        };
      }
    } else {
      try {
        crypto2 = require_crypto();
        if (typeof crypto2.randomBytes !== "function")
          throw new Error("Not supported");
        Rand.prototype._rand = function _rand(n5) {
          return crypto2.randomBytes(n5);
        };
      } catch (e2) {
      }
    }
    var crypto2;
  }
});

// node_modules/elliptic/lib/elliptic/curve/base.js
var require_base = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/base.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var getNAF = utils.getNAF;
    var getJSF = utils.getJSF;
    var assert = utils.assert;
    function BaseCurve(type, conf) {
      this.type = type;
      this.p = new BN(conf.p, 16);
      this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);
      this.zero = new BN(0).toRed(this.red);
      this.one = new BN(1).toRed(this.red);
      this.two = new BN(2).toRed(this.red);
      this.n = conf.n && new BN(conf.n, 16);
      this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
      this._wnafT1 = new Array(4);
      this._wnafT2 = new Array(4);
      this._wnafT3 = new Array(4);
      this._wnafT4 = new Array(4);
      this._bitLength = this.n ? this.n.bitLength() : 0;
      var adjustCount = this.n && this.p.div(this.n);
      if (!adjustCount || adjustCount.cmpn(100) > 0) {
        this.redN = null;
      } else {
        this._maxwellTrick = true;
        this.redN = this.n.toRed(this.red);
      }
    }
    module.exports = BaseCurve;
    BaseCurve.prototype.point = function point() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype.validate = function validate() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p3, k3) {
      assert(p3.precomputed);
      var doubles = p3._getDoubles();
      var naf = getNAF(k3, 1, this._bitLength);
      var I4 = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
      I4 /= 3;
      var repr = [];
      var j4;
      var nafW;
      for (j4 = 0; j4 < naf.length; j4 += doubles.step) {
        nafW = 0;
        for (var l4 = j4 + doubles.step - 1; l4 >= j4; l4--)
          nafW = (nafW << 1) + naf[l4];
        repr.push(nafW);
      }
      var a4 = this.jpoint(null, null, null);
      var b4 = this.jpoint(null, null, null);
      for (var i4 = I4; i4 > 0; i4--) {
        for (j4 = 0; j4 < repr.length; j4++) {
          nafW = repr[j4];
          if (nafW === i4)
            b4 = b4.mixedAdd(doubles.points[j4]);
          else if (nafW === -i4)
            b4 = b4.mixedAdd(doubles.points[j4].neg());
        }
        a4 = a4.add(b4);
      }
      return a4.toP();
    };
    BaseCurve.prototype._wnafMul = function _wnafMul(p3, k3) {
      var w4 = 4;
      var nafPoints = p3._getNAFPoints(w4);
      w4 = nafPoints.wnd;
      var wnd = nafPoints.points;
      var naf = getNAF(k3, w4, this._bitLength);
      var acc = this.jpoint(null, null, null);
      for (var i4 = naf.length - 1; i4 >= 0; i4--) {
        for (var l4 = 0; i4 >= 0 && naf[i4] === 0; i4--)
          l4++;
        if (i4 >= 0)
          l4++;
        acc = acc.dblp(l4);
        if (i4 < 0)
          break;
        var z6 = naf[i4];
        assert(z6 !== 0);
        if (p3.type === "affine") {
          if (z6 > 0)
            acc = acc.mixedAdd(wnd[z6 - 1 >> 1]);
          else
            acc = acc.mixedAdd(wnd[-z6 - 1 >> 1].neg());
        } else {
          if (z6 > 0)
            acc = acc.add(wnd[z6 - 1 >> 1]);
          else
            acc = acc.add(wnd[-z6 - 1 >> 1].neg());
        }
      }
      return p3.type === "affine" ? acc.toP() : acc;
    };
    BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
      var wndWidth = this._wnafT1;
      var wnd = this._wnafT2;
      var naf = this._wnafT3;
      var max = 0;
      var i4;
      var j4;
      var p3;
      for (i4 = 0; i4 < len; i4++) {
        p3 = points[i4];
        var nafPoints = p3._getNAFPoints(defW);
        wndWidth[i4] = nafPoints.wnd;
        wnd[i4] = nafPoints.points;
      }
      for (i4 = len - 1; i4 >= 1; i4 -= 2) {
        var a4 = i4 - 1;
        var b4 = i4;
        if (wndWidth[a4] !== 1 || wndWidth[b4] !== 1) {
          naf[a4] = getNAF(coeffs[a4], wndWidth[a4], this._bitLength);
          naf[b4] = getNAF(coeffs[b4], wndWidth[b4], this._bitLength);
          max = Math.max(naf[a4].length, max);
          max = Math.max(naf[b4].length, max);
          continue;
        }
        var comb = [
          points[a4],
          /* 1 */
          null,
          /* 3 */
          null,
          /* 5 */
          points[b4]
          /* 7 */
        ];
        if (points[a4].y.cmp(points[b4].y) === 0) {
          comb[1] = points[a4].add(points[b4]);
          comb[2] = points[a4].toJ().mixedAdd(points[b4].neg());
        } else if (points[a4].y.cmp(points[b4].y.redNeg()) === 0) {
          comb[1] = points[a4].toJ().mixedAdd(points[b4]);
          comb[2] = points[a4].add(points[b4].neg());
        } else {
          comb[1] = points[a4].toJ().mixedAdd(points[b4]);
          comb[2] = points[a4].toJ().mixedAdd(points[b4].neg());
        }
        var index = [
          -3,
          /* -1 -1 */
          -1,
          /* -1 0 */
          -5,
          /* -1 1 */
          -7,
          /* 0 -1 */
          0,
          /* 0 0 */
          7,
          /* 0 1 */
          5,
          /* 1 -1 */
          1,
          /* 1 0 */
          3
          /* 1 1 */
        ];
        var jsf = getJSF(coeffs[a4], coeffs[b4]);
        max = Math.max(jsf[0].length, max);
        naf[a4] = new Array(max);
        naf[b4] = new Array(max);
        for (j4 = 0; j4 < max; j4++) {
          var ja2 = jsf[0][j4] | 0;
          var jb = jsf[1][j4] | 0;
          naf[a4][j4] = index[(ja2 + 1) * 3 + (jb + 1)];
          naf[b4][j4] = 0;
          wnd[a4] = comb;
        }
      }
      var acc = this.jpoint(null, null, null);
      var tmp = this._wnafT4;
      for (i4 = max; i4 >= 0; i4--) {
        var k3 = 0;
        while (i4 >= 0) {
          var zero = true;
          for (j4 = 0; j4 < len; j4++) {
            tmp[j4] = naf[j4][i4] | 0;
            if (tmp[j4] !== 0)
              zero = false;
          }
          if (!zero)
            break;
          k3++;
          i4--;
        }
        if (i4 >= 0)
          k3++;
        acc = acc.dblp(k3);
        if (i4 < 0)
          break;
        for (j4 = 0; j4 < len; j4++) {
          var z6 = tmp[j4];
          p3;
          if (z6 === 0)
            continue;
          else if (z6 > 0)
            p3 = wnd[j4][z6 - 1 >> 1];
          else if (z6 < 0)
            p3 = wnd[j4][-z6 - 1 >> 1].neg();
          if (p3.type === "affine")
            acc = acc.mixedAdd(p3);
          else
            acc = acc.add(p3);
        }
      }
      for (i4 = 0; i4 < len; i4++)
        wnd[i4] = null;
      if (jacobianResult)
        return acc;
      else
        return acc.toP();
    };
    function BasePoint(curve, type) {
      this.curve = curve;
      this.type = type;
      this.precomputed = null;
    }
    BaseCurve.BasePoint = BasePoint;
    BasePoint.prototype.eq = function eq() {
      throw new Error("Not implemented");
    };
    BasePoint.prototype.validate = function validate() {
      return this.curve.validate(this);
    };
    BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      bytes = utils.toArray(bytes, enc);
      var len = this.p.byteLength();
      if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
        if (bytes[0] === 6)
          assert(bytes[bytes.length - 1] % 2 === 0);
        else if (bytes[0] === 7)
          assert(bytes[bytes.length - 1] % 2 === 1);
        var res = this.point(
          bytes.slice(1, 1 + len),
          bytes.slice(1 + len, 1 + 2 * len)
        );
        return res;
      } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
        return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
      }
      throw new Error("Unknown point format");
    };
    BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
      return this.encode(enc, true);
    };
    BasePoint.prototype._encode = function _encode(compact) {
      var len = this.curve.p.byteLength();
      var x5 = this.getX().toArray("be", len);
      if (compact)
        return [this.getY().isEven() ? 2 : 3].concat(x5);
      return [4].concat(x5, this.getY().toArray("be", len));
    };
    BasePoint.prototype.encode = function encode5(enc, compact) {
      return utils.encode(this._encode(compact), enc);
    };
    BasePoint.prototype.precompute = function precompute(power) {
      if (this.precomputed)
        return this;
      var precomputed = {
        doubles: null,
        naf: null,
        beta: null
      };
      precomputed.naf = this._getNAFPoints(8);
      precomputed.doubles = this._getDoubles(4, power);
      precomputed.beta = this._getBeta();
      this.precomputed = precomputed;
      return this;
    };
    BasePoint.prototype._hasDoubles = function _hasDoubles(k3) {
      if (!this.precomputed)
        return false;
      var doubles = this.precomputed.doubles;
      if (!doubles)
        return false;
      return doubles.points.length >= Math.ceil((k3.bitLength() + 1) / doubles.step);
    };
    BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
      if (this.precomputed && this.precomputed.doubles)
        return this.precomputed.doubles;
      var doubles = [this];
      var acc = this;
      for (var i4 = 0; i4 < power; i4 += step) {
        for (var j4 = 0; j4 < step; j4++)
          acc = acc.dbl();
        doubles.push(acc);
      }
      return {
        step,
        points: doubles
      };
    };
    BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
      if (this.precomputed && this.precomputed.naf)
        return this.precomputed.naf;
      var res = [this];
      var max = (1 << wnd) - 1;
      var dbl = max === 1 ? null : this.dbl();
      for (var i4 = 1; i4 < max; i4++)
        res[i4] = res[i4 - 1].add(dbl);
      return {
        wnd,
        points: res
      };
    };
    BasePoint.prototype._getBeta = function _getBeta() {
      return null;
    };
    BasePoint.prototype.dblp = function dblp(k3) {
      var r3 = this;
      for (var i4 = 0; i4 < k3; i4++)
        r3 = r3.dbl();
      return r3;
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/elliptic/lib/elliptic/curve/short.js
var require_short = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/short.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert = utils.assert;
    function ShortCurve(conf) {
      Base.call(this, "short", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.tinv = this.two.redInvm();
      this.zeroA = this.a.fromRed().cmpn(0) === 0;
      this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
      this.endo = this._getEndomorphism(conf);
      this._endoWnafT1 = new Array(4);
      this._endoWnafT2 = new Array(4);
    }
    inherits(ShortCurve, Base);
    module.exports = ShortCurve;
    ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
      if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
        return;
      var beta;
      var lambda;
      if (conf.beta) {
        beta = new BN(conf.beta, 16).toRed(this.red);
      } else {
        var betas = this._getEndoRoots(this.p);
        beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
        beta = beta.toRed(this.red);
      }
      if (conf.lambda) {
        lambda = new BN(conf.lambda, 16);
      } else {
        var lambdas = this._getEndoRoots(this.n);
        if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
          lambda = lambdas[0];
        } else {
          lambda = lambdas[1];
          assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
        }
      }
      var basis;
      if (conf.basis) {
        basis = conf.basis.map(function(vec) {
          return {
            a: new BN(vec.a, 16),
            b: new BN(vec.b, 16)
          };
        });
      } else {
        basis = this._getEndoBasis(lambda);
      }
      return {
        beta,
        lambda,
        basis
      };
    };
    ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
      var red = num === this.p ? this.red : BN.mont(num);
      var tinv = new BN(2).toRed(red).redInvm();
      var ntinv = tinv.redNeg();
      var s3 = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);
      var l1 = ntinv.redAdd(s3).fromRed();
      var l22 = ntinv.redSub(s3).fromRed();
      return [l1, l22];
    };
    ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
      var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
      var u3 = lambda;
      var v4 = this.n.clone();
      var x1 = new BN(1);
      var y1 = new BN(0);
      var x22 = new BN(0);
      var y22 = new BN(1);
      var a02;
      var b02;
      var a1;
      var b1;
      var a22;
      var b22;
      var prevR;
      var i4 = 0;
      var r3;
      var x5;
      while (u3.cmpn(0) !== 0) {
        var q2 = v4.div(u3);
        r3 = v4.sub(q2.mul(u3));
        x5 = x22.sub(q2.mul(x1));
        var y6 = y22.sub(q2.mul(y1));
        if (!a1 && r3.cmp(aprxSqrt) < 0) {
          a02 = prevR.neg();
          b02 = x1;
          a1 = r3.neg();
          b1 = x5;
        } else if (a1 && ++i4 === 2) {
          break;
        }
        prevR = r3;
        v4 = u3;
        u3 = r3;
        x22 = x1;
        x1 = x5;
        y22 = y1;
        y1 = y6;
      }
      a22 = r3.neg();
      b22 = x5;
      var len1 = a1.sqr().add(b1.sqr());
      var len2 = a22.sqr().add(b22.sqr());
      if (len2.cmp(len1) >= 0) {
        a22 = a02;
        b22 = b02;
      }
      if (a1.negative) {
        a1 = a1.neg();
        b1 = b1.neg();
      }
      if (a22.negative) {
        a22 = a22.neg();
        b22 = b22.neg();
      }
      return [
        { a: a1, b: b1 },
        { a: a22, b: b22 }
      ];
    };
    ShortCurve.prototype._endoSplit = function _endoSplit(k3) {
      var basis = this.endo.basis;
      var v1 = basis[0];
      var v22 = basis[1];
      var c1 = v22.b.mul(k3).divRound(this.n);
      var c22 = v1.b.neg().mul(k3).divRound(this.n);
      var p1 = c1.mul(v1.a);
      var p22 = c22.mul(v22.a);
      var q1 = c1.mul(v1.b);
      var q2 = c22.mul(v22.b);
      var k1 = k3.sub(p1).sub(p22);
      var k22 = q1.add(q2).neg();
      return { k1, k2: k22 };
    };
    ShortCurve.prototype.pointFromX = function pointFromX(x5, odd) {
      x5 = new BN(x5, 16);
      if (!x5.red)
        x5 = x5.toRed(this.red);
      var y22 = x5.redSqr().redMul(x5).redIAdd(x5.redMul(this.a)).redIAdd(this.b);
      var y6 = y22.redSqrt();
      if (y6.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y6.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y6 = y6.redNeg();
      return this.point(x5, y6);
    };
    ShortCurve.prototype.validate = function validate(point) {
      if (point.inf)
        return true;
      var x5 = point.x;
      var y6 = point.y;
      var ax = this.a.redMul(x5);
      var rhs = x5.redSqr().redMul(x5).redIAdd(ax).redIAdd(this.b);
      return y6.redSqr().redISub(rhs).cmpn(0) === 0;
    };
    ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i4 = 0; i4 < points.length; i4++) {
        var split = this._endoSplit(coeffs[i4]);
        var p3 = points[i4];
        var beta = p3._getBeta();
        if (split.k1.negative) {
          split.k1.ineg();
          p3 = p3.neg(true);
        }
        if (split.k2.negative) {
          split.k2.ineg();
          beta = beta.neg(true);
        }
        npoints[i4 * 2] = p3;
        npoints[i4 * 2 + 1] = beta;
        ncoeffs[i4 * 2] = split.k1;
        ncoeffs[i4 * 2 + 1] = split.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i4 * 2, jacobianResult);
      for (var j4 = 0; j4 < i4 * 2; j4++) {
        npoints[j4] = null;
        ncoeffs[j4] = null;
      }
      return res;
    };
    function Point(curve, x5, y6, isRed) {
      Base.BasePoint.call(this, curve, "affine");
      if (x5 === null && y6 === null) {
        this.x = null;
        this.y = null;
        this.inf = true;
      } else {
        this.x = new BN(x5, 16);
        this.y = new BN(y6, 16);
        if (isRed) {
          this.x.forceRed(this.curve.red);
          this.y.forceRed(this.curve.red);
        }
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        this.inf = false;
      }
    }
    inherits(Point, Base.BasePoint);
    ShortCurve.prototype.point = function point(x5, y6, isRed) {
      return new Point(this, x5, y6, isRed);
    };
    ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
      return Point.fromJSON(this, obj, red);
    };
    Point.prototype._getBeta = function _getBeta() {
      if (!this.curve.endo)
        return;
      var pre = this.precomputed;
      if (pre && pre.beta)
        return pre.beta;
      var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (pre) {
        var curve = this.curve;
        var endoMul = function(p3) {
          return curve.point(p3.x.redMul(curve.endo.beta), p3.y);
        };
        pre.beta = beta;
        beta.precomputed = {
          beta: null,
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(endoMul)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(endoMul)
          }
        };
      }
      return beta;
    };
    Point.prototype.toJSON = function toJSON() {
      if (!this.precomputed)
        return [this.x, this.y];
      return [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
          wnd: this.precomputed.naf.wnd,
          points: this.precomputed.naf.points.slice(1)
        }
      }];
    };
    Point.fromJSON = function fromJSON(curve, obj, red) {
      if (typeof obj === "string")
        obj = JSON.parse(obj);
      var res = curve.point(obj[0], obj[1], red);
      if (!obj[2])
        return res;
      function obj2point(obj2) {
        return curve.point(obj2[0], obj2[1], red);
      }
      var pre = obj[2];
      res.precomputed = {
        beta: null,
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: [res].concat(pre.doubles.points.map(obj2point))
        },
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: [res].concat(pre.naf.points.map(obj2point))
        }
      };
      return res;
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.inf;
    };
    Point.prototype.add = function add(p3) {
      if (this.inf)
        return p3;
      if (p3.inf)
        return this;
      if (this.eq(p3))
        return this.dbl();
      if (this.neg().eq(p3))
        return this.curve.point(null, null);
      if (this.x.cmp(p3.x) === 0)
        return this.curve.point(null, null);
      var c5 = this.y.redSub(p3.y);
      if (c5.cmpn(0) !== 0)
        c5 = c5.redMul(this.x.redSub(p3.x).redInvm());
      var nx = c5.redSqr().redISub(this.x).redISub(p3.x);
      var ny = c5.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.dbl = function dbl() {
      if (this.inf)
        return this;
      var ys1 = this.y.redAdd(this.y);
      if (ys1.cmpn(0) === 0)
        return this.curve.point(null, null);
      var a4 = this.curve.a;
      var x22 = this.x.redSqr();
      var dyinv = ys1.redInvm();
      var c5 = x22.redAdd(x22).redIAdd(x22).redIAdd(a4).redMul(dyinv);
      var nx = c5.redSqr().redISub(this.x.redAdd(this.x));
      var ny = c5.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.getX = function getX() {
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      return this.y.fromRed();
    };
    Point.prototype.mul = function mul(k3) {
      k3 = new BN(k3, 16);
      if (this.isInfinity())
        return this;
      else if (this._hasDoubles(k3))
        return this.curve._fixedNafMul(this, k3);
      else if (this.curve.endo)
        return this.curve._endoWnafMulAdd([this], [k3]);
      else
        return this.curve._wnafMul(this, k3);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs, true);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
    };
    Point.prototype.eq = function eq(p3) {
      return this === p3 || this.inf === p3.inf && (this.inf || this.x.cmp(p3.x) === 0 && this.y.cmp(p3.y) === 0);
    };
    Point.prototype.neg = function neg(_precompute) {
      if (this.inf)
        return this;
      var res = this.curve.point(this.x, this.y.redNeg());
      if (_precompute && this.precomputed) {
        var pre = this.precomputed;
        var negate = function(p3) {
          return p3.neg();
        };
        res.precomputed = {
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(negate)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(negate)
          }
        };
      }
      return res;
    };
    Point.prototype.toJ = function toJ() {
      if (this.inf)
        return this.curve.jpoint(null, null, null);
      var res = this.curve.jpoint(this.x, this.y, this.curve.one);
      return res;
    };
    function JPoint(curve, x5, y6, z6) {
      Base.BasePoint.call(this, curve, "jacobian");
      if (x5 === null && y6 === null && z6 === null) {
        this.x = this.curve.one;
        this.y = this.curve.one;
        this.z = new BN(0);
      } else {
        this.x = new BN(x5, 16);
        this.y = new BN(y6, 16);
        this.z = new BN(z6, 16);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;
    }
    inherits(JPoint, Base.BasePoint);
    ShortCurve.prototype.jpoint = function jpoint(x5, y6, z6) {
      return new JPoint(this, x5, y6, z6);
    };
    JPoint.prototype.toP = function toP() {
      if (this.isInfinity())
        return this.curve.point(null, null);
      var zinv = this.z.redInvm();
      var zinv2 = zinv.redSqr();
      var ax = this.x.redMul(zinv2);
      var ay = this.y.redMul(zinv2).redMul(zinv);
      return this.curve.point(ax, ay);
    };
    JPoint.prototype.neg = function neg() {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };
    JPoint.prototype.add = function add(p3) {
      if (this.isInfinity())
        return p3;
      if (p3.isInfinity())
        return this;
      var pz2 = p3.z.redSqr();
      var z22 = this.z.redSqr();
      var u1 = this.x.redMul(pz2);
      var u22 = p3.x.redMul(z22);
      var s1 = this.y.redMul(pz2.redMul(p3.z));
      var s22 = p3.y.redMul(z22.redMul(this.z));
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s22);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v4 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v4).redISub(v4);
      var ny = r3.redMul(v4.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(p3.z).redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mixedAdd = function mixedAdd(p3) {
      if (this.isInfinity())
        return p3.toJ();
      if (p3.isInfinity())
        return this;
      var z22 = this.z.redSqr();
      var u1 = this.x;
      var u22 = p3.x.redMul(z22);
      var s1 = this.y;
      var s22 = p3.y.redMul(z22).redMul(this.z);
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s22);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v4 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v4).redISub(v4);
      var ny = r3.redMul(v4.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.dblp = function dblp(pow) {
      if (pow === 0)
        return this;
      if (this.isInfinity())
        return this;
      if (!pow)
        return this.dbl();
      var i4;
      if (this.curve.zeroA || this.curve.threeA) {
        var r3 = this;
        for (i4 = 0; i4 < pow; i4++)
          r3 = r3.dbl();
        return r3;
      }
      var a4 = this.curve.a;
      var tinv = this.curve.tinv;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jyd = jy.redAdd(jy);
      for (i4 = 0; i4 < pow; i4++) {
        var jx2 = jx.redSqr();
        var jyd2 = jyd.redSqr();
        var jyd4 = jyd2.redSqr();
        var c5 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a4.redMul(jz4));
        var t1 = jx.redMul(jyd2);
        var nx = c5.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var dny = c5.redMul(t2);
        dny = dny.redIAdd(dny).redISub(jyd4);
        var nz = jyd.redMul(jz);
        if (i4 + 1 < pow)
          jz4 = jz4.redMul(jyd4);
        jx = nx;
        jz = nz;
        jyd = dny;
      }
      return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
    };
    JPoint.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.zeroA)
        return this._zeroDbl();
      else if (this.curve.threeA)
        return this._threeDbl();
      else
        return this._dbl();
    };
    JPoint.prototype._zeroDbl = function _zeroDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s3 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s3 = s3.redIAdd(s3);
        var m2 = xx.redAdd(xx).redIAdd(xx);
        var t = m2.redSqr().redISub(s3).redISub(s3);
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        nx = t;
        ny = m2.redMul(s3.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var a4 = this.x.redSqr();
        var b4 = this.y.redSqr();
        var c5 = b4.redSqr();
        var d3 = this.x.redAdd(b4).redSqr().redISub(a4).redISub(c5);
        d3 = d3.redIAdd(d3);
        var e2 = a4.redAdd(a4).redIAdd(a4);
        var f4 = e2.redSqr();
        var c8 = c5.redIAdd(c5);
        c8 = c8.redIAdd(c8);
        c8 = c8.redIAdd(c8);
        nx = f4.redISub(d3).redISub(d3);
        ny = e2.redMul(d3.redISub(nx)).redISub(c8);
        nz = this.y.redMul(this.z);
        nz = nz.redIAdd(nz);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._threeDbl = function _threeDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s3 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s3 = s3.redIAdd(s3);
        var m2 = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
        var t = m2.redSqr().redISub(s3).redISub(s3);
        nx = t;
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        ny = m2.redMul(s3.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var delta = this.z.redSqr();
        var gamma = this.y.redSqr();
        var beta = this.x.redMul(gamma);
        var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
        alpha = alpha.redAdd(alpha).redIAdd(alpha);
        var beta4 = beta.redIAdd(beta);
        beta4 = beta4.redIAdd(beta4);
        var beta8 = beta4.redAdd(beta4);
        nx = alpha.redSqr().redISub(beta8);
        nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
        var ggamma8 = gamma.redSqr();
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._dbl = function _dbl() {
      var a4 = this.curve.a;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jx2 = jx.redSqr();
      var jy2 = jy.redSqr();
      var c5 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a4.redMul(jz4));
      var jxd4 = jx.redAdd(jx);
      jxd4 = jxd4.redIAdd(jxd4);
      var t1 = jxd4.redMul(jy2);
      var nx = c5.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var jyd8 = jy2.redSqr();
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      var ny = c5.redMul(t2).redISub(jyd8);
      var nz = jy.redAdd(jy).redMul(jz);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.trpl = function trpl() {
      if (!this.curve.zeroA)
        return this.dbl().add(this);
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var zz = this.z.redSqr();
      var yyyy = yy.redSqr();
      var m2 = xx.redAdd(xx).redIAdd(xx);
      var mm = m2.redSqr();
      var e2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      e2 = e2.redIAdd(e2);
      e2 = e2.redAdd(e2).redIAdd(e2);
      e2 = e2.redISub(mm);
      var ee3 = e2.redSqr();
      var t = yyyy.redIAdd(yyyy);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      var u3 = m2.redIAdd(e2).redSqr().redISub(mm).redISub(ee3).redISub(t);
      var yyu4 = yy.redMul(u3);
      yyu4 = yyu4.redIAdd(yyu4);
      yyu4 = yyu4.redIAdd(yyu4);
      var nx = this.x.redMul(ee3).redISub(yyu4);
      nx = nx.redIAdd(nx);
      nx = nx.redIAdd(nx);
      var ny = this.y.redMul(u3.redMul(t.redISub(u3)).redISub(e2.redMul(ee3)));
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      var nz = this.z.redAdd(e2).redSqr().redISub(zz).redISub(ee3);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mul = function mul(k3, kbase) {
      k3 = new BN(k3, kbase);
      return this.curve._wnafMul(this, k3);
    };
    JPoint.prototype.eq = function eq(p3) {
      if (p3.type === "affine")
        return this.eq(p3.toJ());
      if (this === p3)
        return true;
      var z22 = this.z.redSqr();
      var pz2 = p3.z.redSqr();
      if (this.x.redMul(pz2).redISub(p3.x.redMul(z22)).cmpn(0) !== 0)
        return false;
      var z32 = z22.redMul(this.z);
      var pz3 = pz2.redMul(p3.z);
      return this.y.redMul(pz3).redISub(p3.y.redMul(z32)).cmpn(0) === 0;
    };
    JPoint.prototype.eqXToP = function eqXToP(x5) {
      var zs3 = this.z.redSqr();
      var rx = x5.toRed(this.curve.red).redMul(zs3);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc = x5.clone();
      var t = this.curve.redN.redMul(zs3);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    JPoint.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC JPoint Infinity>";
      return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
    };
    JPoint.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/mont.js
var require_mont = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/mont.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var utils = require_utils3();
    function MontCurve(conf) {
      Base.call(this, "mont", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.i4 = new BN(4).toRed(this.red).redInvm();
      this.two = new BN(2).toRed(this.red);
      this.a24 = this.i4.redMul(this.a.redAdd(this.two));
    }
    inherits(MontCurve, Base);
    module.exports = MontCurve;
    MontCurve.prototype.validate = function validate(point) {
      var x5 = point.normalize().x;
      var x22 = x5.redSqr();
      var rhs = x22.redMul(x5).redAdd(x22.redMul(this.a)).redAdd(x5);
      var y6 = rhs.redSqrt();
      return y6.redSqr().cmp(rhs) === 0;
    };
    function Point(curve, x5, z6) {
      Base.BasePoint.call(this, curve, "projective");
      if (x5 === null && z6 === null) {
        this.x = this.curve.one;
        this.z = this.curve.zero;
      } else {
        this.x = new BN(x5, 16);
        this.z = new BN(z6, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
      }
    }
    inherits(Point, Base.BasePoint);
    MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      return this.point(utils.toArray(bytes, enc), 1);
    };
    MontCurve.prototype.point = function point(x5, z6) {
      return new Point(this, x5, z6);
    };
    MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    Point.prototype.precompute = function precompute() {
    };
    Point.prototype._encode = function _encode() {
      return this.getX().toArray("be", this.curve.p.byteLength());
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1] || curve.one);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
    Point.prototype.dbl = function dbl() {
      var a4 = this.x.redAdd(this.z);
      var aa2 = a4.redSqr();
      var b4 = this.x.redSub(this.z);
      var bb = b4.redSqr();
      var c5 = aa2.redSub(bb);
      var nx = aa2.redMul(bb);
      var nz = c5.redMul(bb.redAdd(this.curve.a24.redMul(c5)));
      return this.curve.point(nx, nz);
    };
    Point.prototype.add = function add() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.diffAdd = function diffAdd(p3, diff) {
      var a4 = this.x.redAdd(this.z);
      var b4 = this.x.redSub(this.z);
      var c5 = p3.x.redAdd(p3.z);
      var d3 = p3.x.redSub(p3.z);
      var da2 = d3.redMul(a4);
      var cb = c5.redMul(b4);
      var nx = diff.z.redMul(da2.redAdd(cb).redSqr());
      var nz = diff.x.redMul(da2.redISub(cb).redSqr());
      return this.curve.point(nx, nz);
    };
    Point.prototype.mul = function mul(k3) {
      var t = k3.clone();
      var a4 = this;
      var b4 = this.curve.point(null, null);
      var c5 = this;
      for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
        bits.push(t.andln(1));
      for (var i4 = bits.length - 1; i4 >= 0; i4--) {
        if (bits[i4] === 0) {
          a4 = a4.diffAdd(b4, c5);
          b4 = b4.dbl();
        } else {
          b4 = a4.diffAdd(b4, c5);
          a4 = a4.dbl();
        }
      }
      return b4;
    };
    Point.prototype.mulAdd = function mulAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.jumlAdd = function jumlAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.eq = function eq(other) {
      return this.getX().cmp(other.getX()) === 0;
    };
    Point.prototype.normalize = function normalize() {
      this.x = this.x.redMul(this.z.redInvm());
      this.z = this.curve.one;
      return this;
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/edwards.js
var require_edwards = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/edwards.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert = utils.assert;
    function EdwardsCurve(conf) {
      this.twisted = (conf.a | 0) !== 1;
      this.mOneA = this.twisted && (conf.a | 0) === -1;
      this.extended = this.mOneA;
      Base.call(this, "edwards", conf);
      this.a = new BN(conf.a, 16).umod(this.red.m);
      this.a = this.a.toRed(this.red);
      this.c = new BN(conf.c, 16).toRed(this.red);
      this.c2 = this.c.redSqr();
      this.d = new BN(conf.d, 16).toRed(this.red);
      this.dd = this.d.redAdd(this.d);
      assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
      this.oneC = (conf.c | 0) === 1;
    }
    inherits(EdwardsCurve, Base);
    module.exports = EdwardsCurve;
    EdwardsCurve.prototype._mulA = function _mulA(num) {
      if (this.mOneA)
        return num.redNeg();
      else
        return this.a.redMul(num);
    };
    EdwardsCurve.prototype._mulC = function _mulC(num) {
      if (this.oneC)
        return num;
      else
        return this.c.redMul(num);
    };
    EdwardsCurve.prototype.jpoint = function jpoint(x5, y6, z6, t) {
      return this.point(x5, y6, z6, t);
    };
    EdwardsCurve.prototype.pointFromX = function pointFromX(x5, odd) {
      x5 = new BN(x5, 16);
      if (!x5.red)
        x5 = x5.toRed(this.red);
      var x22 = x5.redSqr();
      var rhs = this.c2.redSub(this.a.redMul(x22));
      var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x22));
      var y22 = rhs.redMul(lhs.redInvm());
      var y6 = y22.redSqrt();
      if (y6.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y6.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y6 = y6.redNeg();
      return this.point(x5, y6);
    };
    EdwardsCurve.prototype.pointFromY = function pointFromY(y6, odd) {
      y6 = new BN(y6, 16);
      if (!y6.red)
        y6 = y6.toRed(this.red);
      var y22 = y6.redSqr();
      var lhs = y22.redSub(this.c2);
      var rhs = y22.redMul(this.d).redMul(this.c2).redSub(this.a);
      var x22 = lhs.redMul(rhs.redInvm());
      if (x22.cmp(this.zero) === 0) {
        if (odd)
          throw new Error("invalid point");
        else
          return this.point(this.zero, y6);
      }
      var x5 = x22.redSqrt();
      if (x5.redSqr().redSub(x22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      if (x5.fromRed().isOdd() !== odd)
        x5 = x5.redNeg();
      return this.point(x5, y6);
    };
    EdwardsCurve.prototype.validate = function validate(point) {
      if (point.isInfinity())
        return true;
      point.normalize();
      var x22 = point.x.redSqr();
      var y22 = point.y.redSqr();
      var lhs = x22.redMul(this.a).redAdd(y22);
      var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x22).redMul(y22)));
      return lhs.cmp(rhs) === 0;
    };
    function Point(curve, x5, y6, z6, t) {
      Base.BasePoint.call(this, curve, "projective");
      if (x5 === null && y6 === null && z6 === null) {
        this.x = this.curve.zero;
        this.y = this.curve.one;
        this.z = this.curve.one;
        this.t = this.curve.zero;
        this.zOne = true;
      } else {
        this.x = new BN(x5, 16);
        this.y = new BN(y6, 16);
        this.z = z6 ? new BN(z6, 16) : this.curve.one;
        this.t = t && new BN(t, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
        if (this.t && !this.t.red)
          this.t = this.t.toRed(this.curve.red);
        this.zOne = this.z === this.curve.one;
        if (this.curve.extended && !this.t) {
          this.t = this.x.redMul(this.y);
          if (!this.zOne)
            this.t = this.t.redMul(this.z.redInvm());
        }
      }
    }
    inherits(Point, Base.BasePoint);
    EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    EdwardsCurve.prototype.point = function point(x5, y6, z6, t) {
      return new Point(this, x5, y6, z6, t);
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1], obj[2]);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
    };
    Point.prototype._extDbl = function _extDbl() {
      var a4 = this.x.redSqr();
      var b4 = this.y.redSqr();
      var c5 = this.z.redSqr();
      c5 = c5.redIAdd(c5);
      var d3 = this.curve._mulA(a4);
      var e2 = this.x.redAdd(this.y).redSqr().redISub(a4).redISub(b4);
      var g3 = d3.redAdd(b4);
      var f4 = g3.redSub(c5);
      var h5 = d3.redSub(b4);
      var nx = e2.redMul(f4);
      var ny = g3.redMul(h5);
      var nt3 = e2.redMul(h5);
      var nz = f4.redMul(g3);
      return this.curve.point(nx, ny, nz, nt3);
    };
    Point.prototype._projDbl = function _projDbl() {
      var b4 = this.x.redAdd(this.y).redSqr();
      var c5 = this.x.redSqr();
      var d3 = this.y.redSqr();
      var nx;
      var ny;
      var nz;
      var e2;
      var h5;
      var j4;
      if (this.curve.twisted) {
        e2 = this.curve._mulA(c5);
        var f4 = e2.redAdd(d3);
        if (this.zOne) {
          nx = b4.redSub(c5).redSub(d3).redMul(f4.redSub(this.curve.two));
          ny = f4.redMul(e2.redSub(d3));
          nz = f4.redSqr().redSub(f4).redSub(f4);
        } else {
          h5 = this.z.redSqr();
          j4 = f4.redSub(h5).redISub(h5);
          nx = b4.redSub(c5).redISub(d3).redMul(j4);
          ny = f4.redMul(e2.redSub(d3));
          nz = f4.redMul(j4);
        }
      } else {
        e2 = c5.redAdd(d3);
        h5 = this.curve._mulC(this.z).redSqr();
        j4 = e2.redSub(h5).redSub(h5);
        nx = this.curve._mulC(b4.redISub(e2)).redMul(j4);
        ny = this.curve._mulC(e2).redMul(c5.redISub(d3));
        nz = e2.redMul(j4);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extDbl();
      else
        return this._projDbl();
    };
    Point.prototype._extAdd = function _extAdd(p3) {
      var a4 = this.y.redSub(this.x).redMul(p3.y.redSub(p3.x));
      var b4 = this.y.redAdd(this.x).redMul(p3.y.redAdd(p3.x));
      var c5 = this.t.redMul(this.curve.dd).redMul(p3.t);
      var d3 = this.z.redMul(p3.z.redAdd(p3.z));
      var e2 = b4.redSub(a4);
      var f4 = d3.redSub(c5);
      var g3 = d3.redAdd(c5);
      var h5 = b4.redAdd(a4);
      var nx = e2.redMul(f4);
      var ny = g3.redMul(h5);
      var nt3 = e2.redMul(h5);
      var nz = f4.redMul(g3);
      return this.curve.point(nx, ny, nz, nt3);
    };
    Point.prototype._projAdd = function _projAdd(p3) {
      var a4 = this.z.redMul(p3.z);
      var b4 = a4.redSqr();
      var c5 = this.x.redMul(p3.x);
      var d3 = this.y.redMul(p3.y);
      var e2 = this.curve.d.redMul(c5).redMul(d3);
      var f4 = b4.redSub(e2);
      var g3 = b4.redAdd(e2);
      var tmp = this.x.redAdd(this.y).redMul(p3.x.redAdd(p3.y)).redISub(c5).redISub(d3);
      var nx = a4.redMul(f4).redMul(tmp);
      var ny;
      var nz;
      if (this.curve.twisted) {
        ny = a4.redMul(g3).redMul(d3.redSub(this.curve._mulA(c5)));
        nz = f4.redMul(g3);
      } else {
        ny = a4.redMul(g3).redMul(d3.redSub(c5));
        nz = this.curve._mulC(f4).redMul(g3);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.add = function add(p3) {
      if (this.isInfinity())
        return p3;
      if (p3.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extAdd(p3);
      else
        return this._projAdd(p3);
    };
    Point.prototype.mul = function mul(k3) {
      if (this._hasDoubles(k3))
        return this.curve._fixedNafMul(this, k3);
      else
        return this.curve._wnafMul(this, k3);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p3, k22) {
      return this.curve._wnafMulAdd(1, [this, p3], [k1, k22], 2, false);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p3, k22) {
      return this.curve._wnafMulAdd(1, [this, p3], [k1, k22], 2, true);
    };
    Point.prototype.normalize = function normalize() {
      if (this.zOne)
        return this;
      var zi3 = this.z.redInvm();
      this.x = this.x.redMul(zi3);
      this.y = this.y.redMul(zi3);
      if (this.t)
        this.t = this.t.redMul(zi3);
      this.z = this.curve.one;
      this.zOne = true;
      return this;
    };
    Point.prototype.neg = function neg() {
      return this.curve.point(
        this.x.redNeg(),
        this.y,
        this.z,
        this.t && this.t.redNeg()
      );
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      this.normalize();
      return this.y.fromRed();
    };
    Point.prototype.eq = function eq(other) {
      return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
    };
    Point.prototype.eqXToP = function eqXToP(x5) {
      var rx = x5.toRed(this.curve.red).redMul(this.z);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc = x5.clone();
      var t = this.curve.redN.redMul(this.z);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    Point.prototype.toP = Point.prototype.normalize;
    Point.prototype.mixedAdd = Point.prototype.add;
  }
});

// node_modules/elliptic/lib/elliptic/curve/index.js
var require_curve = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/index.js"(exports) {
    "use strict";
    var curve = exports;
    curve.base = require_base();
    curve.short = require_short();
    curve.mont = require_mont();
    curve.edwards = require_edwards();
  }
});

// node_modules/hash.js/lib/hash/utils.js
var require_utils4 = __commonJS({
  "node_modules/hash.js/lib/hash/utils.js"(exports) {
    "use strict";
    var assert = require_minimalistic_assert();
    var inherits = require_inherits_browser();
    exports.inherits = inherits;
    function isSurrogatePair(msg, i4) {
      if ((msg.charCodeAt(i4) & 64512) !== 55296) {
        return false;
      }
      if (i4 < 0 || i4 + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i4 + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p3 = 0;
          for (var i4 = 0; i4 < msg.length; i4++) {
            var c5 = msg.charCodeAt(i4);
            if (c5 < 128) {
              res[p3++] = c5;
            } else if (c5 < 2048) {
              res[p3++] = c5 >> 6 | 192;
              res[p3++] = c5 & 63 | 128;
            } else if (isSurrogatePair(msg, i4)) {
              c5 = 65536 + ((c5 & 1023) << 10) + (msg.charCodeAt(++i4) & 1023);
              res[p3++] = c5 >> 18 | 240;
              res[p3++] = c5 >> 12 & 63 | 128;
              res[p3++] = c5 >> 6 & 63 | 128;
              res[p3++] = c5 & 63 | 128;
            } else {
              res[p3++] = c5 >> 12 | 224;
              res[p3++] = c5 >> 6 & 63 | 128;
              res[p3++] = c5 & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (i4 = 0; i4 < msg.length; i4 += 2)
            res.push(parseInt(msg[i4] + msg[i4 + 1], 16));
        }
      } else {
        for (i4 = 0; i4 < msg.length; i4++)
          res[i4] = msg[i4] | 0;
      }
      return res;
    }
    exports.toArray = toArray;
    function toHex(msg) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++)
        res += zero2(msg[i4].toString(16));
      return res;
    }
    exports.toHex = toHex;
    function htonl(w4) {
      var res = w4 >>> 24 | w4 >>> 8 & 65280 | w4 << 8 & 16711680 | (w4 & 255) << 24;
      return res >>> 0;
    }
    exports.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++) {
        var w4 = msg[i4];
        if (endian === "little")
          w4 = htonl(w4);
        res += zero8(w4.toString(16));
      }
      return res;
    }
    exports.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    exports.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7)
        return "0" + word;
      else if (word.length === 6)
        return "00" + word;
      else if (word.length === 5)
        return "000" + word;
      else if (word.length === 4)
        return "0000" + word;
      else if (word.length === 3)
        return "00000" + word;
      else if (word.length === 2)
        return "000000" + word;
      else if (word.length === 1)
        return "0000000" + word;
      else
        return word;
    }
    exports.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i4 = 0, k3 = start; i4 < res.length; i4++, k3 += 4) {
        var w4;
        if (endian === "big")
          w4 = msg[k3] << 24 | msg[k3 + 1] << 16 | msg[k3 + 2] << 8 | msg[k3 + 3];
        else
          w4 = msg[k3 + 3] << 24 | msg[k3 + 2] << 16 | msg[k3 + 1] << 8 | msg[k3];
        res[i4] = w4 >>> 0;
      }
      return res;
    }
    exports.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i4 = 0, k3 = 0; i4 < msg.length; i4++, k3 += 4) {
        var m2 = msg[i4];
        if (endian === "big") {
          res[k3] = m2 >>> 24;
          res[k3 + 1] = m2 >>> 16 & 255;
          res[k3 + 2] = m2 >>> 8 & 255;
          res[k3 + 3] = m2 & 255;
        } else {
          res[k3 + 3] = m2 >>> 24;
          res[k3 + 2] = m2 >>> 16 & 255;
          res[k3 + 1] = m2 >>> 8 & 255;
          res[k3] = m2 & 255;
        }
      }
      return res;
    }
    exports.split32 = split32;
    function rotr32(w4, b4) {
      return w4 >>> b4 | w4 << 32 - b4;
    }
    exports.rotr32 = rotr32;
    function rotl32(w4, b4) {
      return w4 << b4 | w4 >>> 32 - b4;
    }
    exports.rotl32 = rotl32;
    function sum32(a4, b4) {
      return a4 + b4 >>> 0;
    }
    exports.sum32 = sum32;
    function sum32_3(a4, b4, c5) {
      return a4 + b4 + c5 >>> 0;
    }
    exports.sum32_3 = sum32_3;
    function sum32_4(a4, b4, c5, d3) {
      return a4 + b4 + c5 + d3 >>> 0;
    }
    exports.sum32_4 = sum32_4;
    function sum32_5(a4, b4, c5, d3, e2) {
      return a4 + b4 + c5 + d3 + e2 >>> 0;
    }
    exports.sum32_5 = sum32_5;
    function sum64(buf, pos, ah2, al) {
      var bh2 = buf[pos];
      var bl = buf[pos + 1];
      var lo = al + bl >>> 0;
      var hi2 = (lo < al ? 1 : 0) + ah2 + bh2;
      buf[pos] = hi2 >>> 0;
      buf[pos + 1] = lo;
    }
    exports.sum64 = sum64;
    function sum64_hi(ah2, al, bh2, bl) {
      var lo = al + bl >>> 0;
      var hi2 = (lo < al ? 1 : 0) + ah2 + bh2;
      return hi2 >>> 0;
    }
    exports.sum64_hi = sum64_hi;
    function sum64_lo(ah2, al, bh2, bl) {
      var lo = al + bl;
      return lo >>> 0;
    }
    exports.sum64_lo = sum64_lo;
    function sum64_4_hi(ah2, al, bh2, bl, ch2, cl, dh2, dl) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      var hi2 = ah2 + bh2 + ch2 + dh2 + carry;
      return hi2 >>> 0;
    }
    exports.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah2, al, bh2, bl, ch2, cl, dh2, dl) {
      var lo = al + bl + cl + dl;
      return lo >>> 0;
    }
    exports.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah2, al, bh2, bl, ch2, cl, dh2, dl, eh, el) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      lo = lo + el >>> 0;
      carry += lo < el ? 1 : 0;
      var hi2 = ah2 + bh2 + ch2 + dh2 + eh + carry;
      return hi2 >>> 0;
    }
    exports.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah2, al, bh2, bl, ch2, cl, dh2, dl, eh, el) {
      var lo = al + bl + cl + dl + el;
      return lo >>> 0;
    }
    exports.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah2, al, num) {
      var r3 = al << 32 - num | ah2 >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah2, al, num) {
      var r3 = ah2 << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_lo = rotr64_lo;
    function shr64_hi(ah2, al, num) {
      return ah2 >>> num;
    }
    exports.shr64_hi = shr64_hi;
    function shr64_lo(ah2, al, num) {
      var r3 = ah2 << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.shr64_lo = shr64_lo;
  }
});

// node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "node_modules/hash.js/lib/hash/common.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var assert = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports.BlockHash = BlockHash;
    BlockHash.prototype.update = function update(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r3 = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r3, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r3, this.endian);
        for (var i4 = 0; i4 < msg.length; i4 += this._delta32)
          this._update(msg, i4, i4 + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest2(enc) {
      this.update(this._pad());
      assert(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k3 = bytes - (len + this.padLength) % bytes;
      var res = new Array(k3 + this.padLength);
      res[0] = 128;
      for (var i4 = 1; i4 < k3; i4++)
        res[i4] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++)
          res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = len >>> 24 & 255;
        res[i4++] = len >>> 16 & 255;
        res[i4++] = len >>> 8 & 255;
        res[i4++] = len & 255;
      } else {
        res[i4++] = len & 255;
        res[i4++] = len >>> 8 & 255;
        res[i4++] = len >>> 16 & 255;
        res[i4++] = len >>> 24 & 255;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        for (t = 8; t < this.padLength; t++)
          res[i4++] = 0;
      }
      return res;
    };
  }
});

// node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var rotr32 = utils.rotr32;
    function ft_1(s3, x5, y6, z6) {
      if (s3 === 0)
        return ch32(x5, y6, z6);
      if (s3 === 1 || s3 === 3)
        return p32(x5, y6, z6);
      if (s3 === 2)
        return maj32(x5, y6, z6);
    }
    exports.ft_1 = ft_1;
    function ch32(x5, y6, z6) {
      return x5 & y6 ^ ~x5 & z6;
    }
    exports.ch32 = ch32;
    function maj32(x5, y6, z6) {
      return x5 & y6 ^ x5 & z6 ^ y6 & z6;
    }
    exports.maj32 = maj32;
    function p32(x5, y6, z6) {
      return x5 ^ y6 ^ z6;
    }
    exports.p32 = p32;
    function s0_256(x5) {
      return rotr32(x5, 2) ^ rotr32(x5, 13) ^ rotr32(x5, 22);
    }
    exports.s0_256 = s0_256;
    function s1_256(x5) {
      return rotr32(x5, 6) ^ rotr32(x5, 11) ^ rotr32(x5, 25);
    }
    exports.s1_256 = s1_256;
    function g0_256(x5) {
      return rotr32(x5, 7) ^ rotr32(x5, 18) ^ x5 >>> 3;
    }
    exports.g0_256 = g0_256;
    function g1_256(x5) {
      return rotr32(x5, 17) ^ rotr32(x5, 19) ^ x5 >>> 10;
    }
    exports.g1_256 = g1_256;
  }
});

// node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common.BlockHash;
    var sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    function SHA1() {
      if (!(this instanceof SHA1))
        return new SHA1();
      BlockHash.call(this);
      this.h = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i4 = 0; i4 < 16; i4++)
        W[i4] = msg[start + i4];
      for (; i4 < W.length; i4++)
        W[i4] = rotl32(W[i4 - 3] ^ W[i4 - 8] ^ W[i4 - 14] ^ W[i4 - 16], 1);
      var a4 = this.h[0];
      var b4 = this.h[1];
      var c5 = this.h[2];
      var d3 = this.h[3];
      var e2 = this.h[4];
      for (i4 = 0; i4 < W.length; i4++) {
        var s3 = ~~(i4 / 20);
        var t = sum32_5(rotl32(a4, 5), ft_1(s3, b4, c5, d3), e2, W[i4], sha1_K[s3]);
        e2 = d3;
        d3 = c5;
        c5 = rotl32(b4, 30);
        b4 = a4;
        a4 = t;
      }
      this.h[0] = sum32(this.h[0], a4);
      this.h[1] = sum32(this.h[1], b4);
      this.h[2] = sum32(this.h[2], c5);
      this.h[3] = sum32(this.h[3], d3);
      this.h[4] = sum32(this.h[4], e2);
    };
    SHA1.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var shaCommon = require_common2();
    var assert = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common.BlockHash;
    var sha256_K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function SHA256() {
      if (!(this instanceof SHA256))
        return new SHA256();
      BlockHash.call(this);
      this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA256, BlockHash);
    module.exports = SHA256;
    SHA256.blockSize = 512;
    SHA256.outSize = 256;
    SHA256.hmacStrength = 192;
    SHA256.padLength = 64;
    SHA256.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i4 = 0; i4 < 16; i4++)
        W[i4] = msg[start + i4];
      for (; i4 < W.length; i4++)
        W[i4] = sum32_4(g1_256(W[i4 - 2]), W[i4 - 7], g0_256(W[i4 - 15]), W[i4 - 16]);
      var a4 = this.h[0];
      var b4 = this.h[1];
      var c5 = this.h[2];
      var d3 = this.h[3];
      var e2 = this.h[4];
      var f4 = this.h[5];
      var g3 = this.h[6];
      var h5 = this.h[7];
      assert(this.k.length === W.length);
      for (i4 = 0; i4 < W.length; i4++) {
        var T1 = sum32_5(h5, s1_256(e2), ch32(e2, f4, g3), this.k[i4], W[i4]);
        var T22 = sum32(s0_256(a4), maj32(a4, b4, c5));
        h5 = g3;
        g3 = f4;
        f4 = e2;
        e2 = sum32(d3, T1);
        d3 = c5;
        c5 = b4;
        b4 = a4;
        a4 = sum32(T1, T22);
      }
      this.h[0] = sum32(this.h[0], a4);
      this.h[1] = sum32(this.h[1], b4);
      this.h[2] = sum32(this.h[2], c5);
      this.h[3] = sum32(this.h[3], d3);
      this.h[4] = sum32(this.h[4], e2);
      this.h[5] = sum32(this.h[5], f4);
      this.h[6] = sum32(this.h[6], g3);
      this.h[7] = sum32(this.h[7], h5);
    };
    SHA256.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var SHA256 = require__2();
    function SHA224() {
      if (!(this instanceof SHA224))
        return new SHA224();
      SHA256.call(this);
      this.h = [
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ];
    }
    utils.inherits(SHA224, SHA256);
    module.exports = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 7), "big");
      else
        return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var assert = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common.BlockHash;
    var sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function SHA512() {
      if (!(this instanceof SHA512))
        return new SHA512();
      BlockHash.call(this);
      this.h = [
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W = this.W;
      for (var i4 = 0; i4 < 32; i4++)
        W[i4] = msg[start + i4];
      for (; i4 < W.length; i4 += 2) {
        var c0_hi = g1_512_hi(W[i4 - 4], W[i4 - 3]);
        var c0_lo = g1_512_lo(W[i4 - 4], W[i4 - 3]);
        var c1_hi = W[i4 - 14];
        var c1_lo = W[i4 - 13];
        var c2_hi = g0_512_hi(W[i4 - 30], W[i4 - 29]);
        var c2_lo = g0_512_lo(W[i4 - 30], W[i4 - 29]);
        var c3_hi = W[i4 - 32];
        var c3_lo = W[i4 - 31];
        W[i4] = sum64_4_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
        W[i4 + 1] = sum64_4_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W = this.W;
      var ah2 = this.h[0];
      var al = this.h[1];
      var bh2 = this.h[2];
      var bl = this.h[3];
      var ch2 = this.h[4];
      var cl = this.h[5];
      var dh2 = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh2 = this.h[10];
      var fl = this.h[11];
      var gh2 = this.h[12];
      var gl = this.h[13];
      var hh2 = this.h[14];
      var hl = this.h[15];
      assert(this.k.length === W.length);
      for (var i4 = 0; i4 < W.length; i4 += 2) {
        var c0_hi = hh2;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh2, fl, gh2, gl);
        var c2_lo = ch64_lo(eh, el, fh2, fl, gh2, gl);
        var c3_hi = this.k[i4];
        var c3_lo = this.k[i4 + 1];
        var c4_hi = W[i4];
        var c4_lo = W[i4 + 1];
        var T1_hi = sum64_5_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        var T1_lo = sum64_5_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        c0_hi = s0_512_hi(ah2, al);
        c0_lo = s0_512_lo(ah2, al);
        c1_hi = maj64_hi(ah2, al, bh2, bl, ch2, cl);
        c1_lo = maj64_lo(ah2, al, bh2, bl, ch2, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh2 = gh2;
        hl = gl;
        gh2 = fh2;
        gl = fl;
        fh2 = eh;
        fl = el;
        eh = sum64_hi(dh2, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh2 = ch2;
        dl = cl;
        ch2 = bh2;
        cl = bl;
        bh2 = ah2;
        bl = al;
        ah2 = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah2, al);
      sum64(this.h, 2, bh2, bl);
      sum64(this.h, 4, ch2, cl);
      sum64(this.h, 6, dh2, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh2, fl);
      sum64(this.h, 12, gh2, gl);
      sum64(this.h, 14, hh2, hl);
    };
    SHA512.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
    function ch64_hi(xh2, xl, yh2, yl, zh) {
      var r3 = xh2 & yh2 ^ ~xh2 & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function ch64_lo(xh2, xl, yh2, yl, zh, zl) {
      var r3 = xl & yl ^ ~xl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_hi(xh2, xl, yh2, yl, zh) {
      var r3 = xh2 & yh2 ^ xh2 & zh ^ yh2 & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_lo(xh2, xl, yh2, yl, zh, zl) {
      var r3 = xl & yl ^ xl & zl ^ yl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_hi(xh2, xl) {
      var c0_hi = rotr64_hi(xh2, xl, 28);
      var c1_hi = rotr64_hi(xl, xh2, 2);
      var c2_hi = rotr64_hi(xl, xh2, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_lo(xh2, xl) {
      var c0_lo = rotr64_lo(xh2, xl, 28);
      var c1_lo = rotr64_lo(xl, xh2, 2);
      var c2_lo = rotr64_lo(xl, xh2, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_hi(xh2, xl) {
      var c0_hi = rotr64_hi(xh2, xl, 14);
      var c1_hi = rotr64_hi(xh2, xl, 18);
      var c2_hi = rotr64_hi(xl, xh2, 9);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_lo(xh2, xl) {
      var c0_lo = rotr64_lo(xh2, xl, 14);
      var c1_lo = rotr64_lo(xh2, xl, 18);
      var c2_lo = rotr64_lo(xl, xh2, 9);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_hi(xh2, xl) {
      var c0_hi = rotr64_hi(xh2, xl, 1);
      var c1_hi = rotr64_hi(xh2, xl, 8);
      var c2_hi = shr64_hi(xh2, xl, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_lo(xh2, xl) {
      var c0_lo = rotr64_lo(xh2, xl, 1);
      var c1_lo = rotr64_lo(xh2, xl, 8);
      var c2_lo = shr64_lo(xh2, xl, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_hi(xh2, xl) {
      var c0_hi = rotr64_hi(xh2, xl, 19);
      var c1_hi = rotr64_hi(xl, xh2, 29);
      var c2_hi = shr64_hi(xh2, xl, 6);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_lo(xh2, xl) {
      var c0_lo = rotr64_lo(xh2, xl, 19);
      var c1_lo = rotr64_lo(xl, xh2, 29);
      var c2_lo = shr64_lo(xh2, xl, 6);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
  }
});

// node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384))
        return new SHA384();
      SHA512.call(this);
      this.h = [
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ];
    }
    utils.inherits(SHA384, SHA512);
    module.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 12), "big");
      else
        return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "node_modules/hash.js/lib/hash/sha.js"(exports) {
    "use strict";
    exports.sha1 = require__();
    exports.sha224 = require__3();
    exports.sha256 = require__2();
    exports.sha384 = require__5();
    exports.sha512 = require__4();
  }
});

// node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common.BlockHash;
    function RIPEMD160() {
      if (!(this instanceof RIPEMD160))
        return new RIPEMD160();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD160, BlockHash);
    exports.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update(msg, start) {
      var A3 = this.h[0];
      var B3 = this.h[1];
      var C4 = this.h[2];
      var D3 = this.h[3];
      var E3 = this.h[4];
      var Ah2 = A3;
      var Bh = B3;
      var Ch = C4;
      var Dh = D3;
      var Eh2 = E3;
      for (var j4 = 0; j4 < 80; j4++) {
        var T3 = sum32(
          rotl32(
            sum32_4(A3, f4(j4, B3, C4, D3), msg[r3[j4] + start], K4(j4)),
            s3[j4]
          ),
          E3
        );
        A3 = E3;
        E3 = D3;
        D3 = rotl32(C4, 10);
        C4 = B3;
        B3 = T3;
        T3 = sum32(
          rotl32(
            sum32_4(Ah2, f4(79 - j4, Bh, Ch, Dh), msg[rh[j4] + start], Kh(j4)),
            sh2[j4]
          ),
          Eh2
        );
        Ah2 = Eh2;
        Eh2 = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T3;
      }
      T3 = sum32_3(this.h[1], C4, Dh);
      this.h[1] = sum32_3(this.h[2], D3, Eh2);
      this.h[2] = sum32_3(this.h[3], E3, Ah2);
      this.h[3] = sum32_3(this.h[4], A3, Bh);
      this.h[4] = sum32_3(this.h[0], B3, Ch);
      this.h[0] = T3;
    };
    RIPEMD160.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "little");
      else
        return utils.split32(this.h, "little");
    };
    function f4(j4, x5, y6, z6) {
      if (j4 <= 15)
        return x5 ^ y6 ^ z6;
      else if (j4 <= 31)
        return x5 & y6 | ~x5 & z6;
      else if (j4 <= 47)
        return (x5 | ~y6) ^ z6;
      else if (j4 <= 63)
        return x5 & z6 | y6 & ~z6;
      else
        return x5 ^ (y6 | ~z6);
    }
    function K4(j4) {
      if (j4 <= 15)
        return 0;
      else if (j4 <= 31)
        return 1518500249;
      else if (j4 <= 47)
        return 1859775393;
      else if (j4 <= 63)
        return 2400959708;
      else
        return 2840853838;
    }
    function Kh(j4) {
      if (j4 <= 15)
        return 1352829926;
      else if (j4 <= 31)
        return 1548603684;
      else if (j4 <= 47)
        return 1836072691;
      else if (j4 <= 63)
        return 2053994217;
      else
        return 0;
    }
    var r3 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8,
      3,
      10,
      14,
      4,
      9,
      15,
      8,
      1,
      2,
      7,
      0,
      6,
      13,
      11,
      5,
      12,
      1,
      9,
      11,
      10,
      0,
      8,
      12,
      4,
      13,
      3,
      7,
      15,
      14,
      5,
      6,
      2,
      4,
      0,
      5,
      9,
      7,
      12,
      2,
      10,
      14,
      1,
      3,
      8,
      11,
      6,
      15,
      13
    ];
    var rh = [
      5,
      14,
      7,
      0,
      9,
      2,
      11,
      4,
      13,
      6,
      15,
      8,
      1,
      10,
      3,
      12,
      6,
      11,
      3,
      7,
      0,
      13,
      5,
      10,
      14,
      15,
      8,
      12,
      4,
      9,
      1,
      2,
      15,
      5,
      1,
      3,
      7,
      14,
      6,
      9,
      11,
      8,
      12,
      2,
      10,
      0,
      4,
      13,
      8,
      6,
      4,
      1,
      3,
      11,
      15,
      0,
      5,
      12,
      2,
      13,
      9,
      7,
      10,
      14,
      12,
      15,
      10,
      4,
      1,
      5,
      8,
      7,
      6,
      2,
      13,
      14,
      0,
      3,
      9,
      11
    ];
    var s3 = [
      11,
      14,
      15,
      12,
      5,
      8,
      7,
      9,
      11,
      13,
      14,
      15,
      6,
      7,
      9,
      8,
      7,
      6,
      8,
      13,
      11,
      9,
      7,
      15,
      7,
      12,
      15,
      9,
      11,
      7,
      13,
      12,
      11,
      13,
      6,
      7,
      14,
      9,
      13,
      15,
      14,
      8,
      13,
      6,
      5,
      12,
      7,
      5,
      11,
      12,
      14,
      15,
      14,
      15,
      9,
      8,
      9,
      14,
      5,
      6,
      8,
      6,
      5,
      12,
      9,
      15,
      5,
      11,
      6,
      8,
      13,
      12,
      5,
      12,
      13,
      14,
      11,
      8,
      5,
      6
    ];
    var sh2 = [
      8,
      9,
      9,
      11,
      13,
      15,
      15,
      5,
      7,
      7,
      8,
      11,
      14,
      14,
      12,
      6,
      9,
      13,
      15,
      7,
      12,
      8,
      9,
      11,
      7,
      7,
      12,
      7,
      6,
      15,
      13,
      11,
      9,
      7,
      15,
      11,
      8,
      6,
      6,
      14,
      12,
      13,
      5,
      14,
      13,
      13,
      7,
      5,
      15,
      5,
      8,
      11,
      14,
      14,
      6,
      14,
      6,
      9,
      12,
      9,
      12,
      5,
      15,
      8,
      8,
      5,
      12,
      9,
      12,
      5,
      14,
      6,
      8,
      13,
      6,
      5,
      15,
      13,
      11,
      11
    ];
  }
});

// node_modules/hash.js/lib/hash/hmac.js
var require_hmac2 = __commonJS({
  "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var assert = require_minimalistic_assert();
    function Hmac(hash, key, enc) {
      if (!(this instanceof Hmac))
        return new Hmac(hash, key, enc);
      this.Hash = hash;
      this.blockSize = hash.blockSize / 8;
      this.outSize = hash.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key, enc));
    }
    module.exports = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize)
        key = new this.Hash().update(key).digest();
      assert(key.length <= this.blockSize);
      for (var i4 = key.length; i4 < this.blockSize; i4++)
        key.push(0);
      for (i4 = 0; i4 < key.length; i4++)
        key[i4] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i4 = 0; i4 < key.length; i4++)
        key[i4] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest2(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// node_modules/hash.js/lib/hash.js
var require_hash2 = __commonJS({
  "node_modules/hash.js/lib/hash.js"(exports) {
    var hash = exports;
    hash.utils = require_utils4();
    hash.common = require_common();
    hash.sha = require_sha();
    hash.ripemd = require_ripemd();
    hash.hmac = require_hmac2();
    hash.sha1 = hash.sha.sha1;
    hash.sha256 = hash.sha.sha256;
    hash.sha224 = hash.sha.sha224;
    hash.sha384 = hash.sha.sha384;
    hash.sha512 = hash.sha.sha512;
    hash.ripemd160 = hash.ripemd.ripemd160;
  }
});

// node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js
var require_secp256k1 = __commonJS({
  "node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"(exports, module) {
    module.exports = {
      doubles: {
        step: 4,
        points: [
          [
            "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
            "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
          ],
          [
            "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
            "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
          ],
          [
            "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
            "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
          ],
          [
            "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
            "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
          ],
          [
            "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
            "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
          ],
          [
            "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
            "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
          ],
          [
            "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
            "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
          ],
          [
            "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
            "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
          ],
          [
            "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
            "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
          ],
          [
            "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
            "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
          ],
          [
            "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
            "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
          ],
          [
            "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
            "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
          ],
          [
            "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
            "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
          ],
          [
            "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
            "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
          ],
          [
            "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
            "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
          ],
          [
            "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
            "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
          ],
          [
            "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
            "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
          ],
          [
            "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
            "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
          ],
          [
            "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
            "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
          ],
          [
            "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
            "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
          ],
          [
            "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
            "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
          ],
          [
            "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
            "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
          ],
          [
            "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
            "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
          ],
          [
            "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
            "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
          ],
          [
            "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
            "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
          ],
          [
            "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
            "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
          ],
          [
            "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
            "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
          ],
          [
            "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
            "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
          ],
          [
            "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
            "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
          ],
          [
            "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
            "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
          ],
          [
            "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
            "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
          ],
          [
            "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
            "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
          ],
          [
            "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
            "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
          ],
          [
            "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
            "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
          ],
          [
            "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
            "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
          ],
          [
            "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
            "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
          ],
          [
            "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
            "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
          ],
          [
            "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
            "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
          ],
          [
            "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
            "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
          ],
          [
            "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
            "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
          ],
          [
            "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
            "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
          ],
          [
            "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
            "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
          ],
          [
            "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
            "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
          ],
          [
            "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
            "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
          ],
          [
            "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
            "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
          ],
          [
            "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
            "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
          ],
          [
            "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
            "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
          ],
          [
            "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
            "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
          ],
          [
            "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
            "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
          ],
          [
            "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
            "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
          ],
          [
            "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
            "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
          ],
          [
            "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
            "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
          ],
          [
            "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
            "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
          ],
          [
            "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
            "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
          ],
          [
            "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
            "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
          ],
          [
            "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
            "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
          ],
          [
            "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
            "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
          ],
          [
            "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
            "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
          ],
          [
            "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
            "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
          ],
          [
            "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
            "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
          ],
          [
            "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
            "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
          ],
          [
            "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
            "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
          ],
          [
            "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
            "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
          ],
          [
            "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
            "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
          ],
          [
            "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
            "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
          ]
        ]
      },
      naf: {
        wnd: 7,
        points: [
          [
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
            "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
          ],
          [
            "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
            "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
          ],
          [
            "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
            "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
          ],
          [
            "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
            "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
          ],
          [
            "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
            "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
          ],
          [
            "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
            "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
          ],
          [
            "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
            "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
          ],
          [
            "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
            "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
          ],
          [
            "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
            "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
          ],
          [
            "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
            "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
          ],
          [
            "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
            "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
          ],
          [
            "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
            "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
          ],
          [
            "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
            "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
          ],
          [
            "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
            "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
          ],
          [
            "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
            "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
          ],
          [
            "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
            "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
          ],
          [
            "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
            "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
          ],
          [
            "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
            "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
          ],
          [
            "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
            "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
          ],
          [
            "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
            "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
          ],
          [
            "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
            "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
          ],
          [
            "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
            "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
          ],
          [
            "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
            "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
          ],
          [
            "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
            "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
          ],
          [
            "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
            "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
          ],
          [
            "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
            "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
          ],
          [
            "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
            "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
          ],
          [
            "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
            "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
          ],
          [
            "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
            "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
          ],
          [
            "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
            "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
          ],
          [
            "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
            "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
          ],
          [
            "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
            "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
          ],
          [
            "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
            "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
          ],
          [
            "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
            "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
          ],
          [
            "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
            "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
          ],
          [
            "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
            "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
          ],
          [
            "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
            "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
          ],
          [
            "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
            "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
          ],
          [
            "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
            "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
          ],
          [
            "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
            "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
          ],
          [
            "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
            "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
          ],
          [
            "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
            "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
          ],
          [
            "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
            "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
          ],
          [
            "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
            "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
          ],
          [
            "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
            "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
          ],
          [
            "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
            "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
          ],
          [
            "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
            "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
          ],
          [
            "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
            "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
          ],
          [
            "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
            "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
          ],
          [
            "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
            "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
          ],
          [
            "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
            "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
          ],
          [
            "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
            "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
          ],
          [
            "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
            "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
          ],
          [
            "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
            "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
          ],
          [
            "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
            "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
          ],
          [
            "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
            "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
          ],
          [
            "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
            "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
          ],
          [
            "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
            "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
          ],
          [
            "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
            "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
          ],
          [
            "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
            "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
          ],
          [
            "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
            "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
          ],
          [
            "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
            "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
          ],
          [
            "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
            "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
          ],
          [
            "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
            "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
          ],
          [
            "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
            "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
          ],
          [
            "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
            "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
          ],
          [
            "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
            "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
          ],
          [
            "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
            "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
          ],
          [
            "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
            "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
          ],
          [
            "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
            "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
          ],
          [
            "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
            "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
          ],
          [
            "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
            "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
          ],
          [
            "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
            "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
          ],
          [
            "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
            "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
          ],
          [
            "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
            "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
          ],
          [
            "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
            "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
          ],
          [
            "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
            "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
          ],
          [
            "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
            "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
          ],
          [
            "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
            "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
          ],
          [
            "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
            "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
          ],
          [
            "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
            "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
          ],
          [
            "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
            "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
          ],
          [
            "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
            "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
          ],
          [
            "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
            "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
          ],
          [
            "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
            "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
          ],
          [
            "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
            "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
          ],
          [
            "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
            "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
          ],
          [
            "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
            "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
          ],
          [
            "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
            "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
          ],
          [
            "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
            "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
          ],
          [
            "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
            "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
          ],
          [
            "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
            "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
          ],
          [
            "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
            "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
          ],
          [
            "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
            "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
          ],
          [
            "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
            "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
          ],
          [
            "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
            "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
          ],
          [
            "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
            "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
          ],
          [
            "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
            "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
          ],
          [
            "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
            "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
          ],
          [
            "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
            "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
          ],
          [
            "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
            "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
          ],
          [
            "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
            "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
          ],
          [
            "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
            "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
          ],
          [
            "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
            "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
          ],
          [
            "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
            "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
          ],
          [
            "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
            "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
          ],
          [
            "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
            "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
          ],
          [
            "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
            "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
          ],
          [
            "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
            "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
          ],
          [
            "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
            "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
          ],
          [
            "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
            "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
          ],
          [
            "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
            "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
          ],
          [
            "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
            "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
          ],
          [
            "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
            "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
          ],
          [
            "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
            "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
          ],
          [
            "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
            "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
          ],
          [
            "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
            "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
          ],
          [
            "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
            "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
          ],
          [
            "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
            "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
          ],
          [
            "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
            "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
          ],
          [
            "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
            "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
          ],
          [
            "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
            "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
          ],
          [
            "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
            "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
          ],
          [
            "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
            "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
          ],
          [
            "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
            "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
          ],
          [
            "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
            "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
          ],
          [
            "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
            "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
          ]
        ]
      }
    };
  }
});

// node_modules/elliptic/lib/elliptic/curves.js
var require_curves = __commonJS({
  "node_modules/elliptic/lib/elliptic/curves.js"(exports) {
    "use strict";
    var curves = exports;
    var hash = require_hash2();
    var curve = require_curve();
    var utils = require_utils3();
    var assert = utils.assert;
    function PresetCurve(options) {
      if (options.type === "short")
        this.curve = new curve.short(options);
      else if (options.type === "edwards")
        this.curve = new curve.edwards(options);
      else
        this.curve = new curve.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert(this.g.validate(), "Invalid curve");
      assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves.PresetCurve = PresetCurve;
    function defineCurve(name2, options) {
      Object.defineProperty(curves, name2, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve2 = new PresetCurve(options);
          Object.defineProperty(curves, name2, {
            configurable: true,
            enumerable: true,
            value: curve2
          });
          return curve2;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: hash.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: hash.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: hash.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: hash.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: hash.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "9"
      ]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = require_secp256k1();
    } catch (e2) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: hash.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        pre
      ]
    });
  }
});

// node_modules/hmac-drbg/lib/hmac-drbg.js
var require_hmac_drbg = __commonJS({
  "node_modules/hmac-drbg/lib/hmac-drbg.js"(exports, module) {
    "use strict";
    var hash = require_hash2();
    var utils = require_utils2();
    var assert = require_minimalistic_assert();
    function HmacDRBG(options) {
      if (!(this instanceof HmacDRBG))
        return new HmacDRBG(options);
      this.hash = options.hash;
      this.predResist = !!options.predResist;
      this.outLen = this.hash.outSize;
      this.minEntropy = options.minEntropy || this.hash.hmacStrength;
      this._reseed = null;
      this.reseedInterval = null;
      this.K = null;
      this.V = null;
      var entropy = utils.toArray(options.entropy, options.entropyEnc || "hex");
      var nonce = utils.toArray(options.nonce, options.nonceEnc || "hex");
      var pers = utils.toArray(options.pers, options.persEnc || "hex");
      assert(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._init(entropy, nonce, pers);
    }
    module.exports = HmacDRBG;
    HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
      var seed = entropy.concat(nonce).concat(pers);
      this.K = new Array(this.outLen / 8);
      this.V = new Array(this.outLen / 8);
      for (var i4 = 0; i4 < this.V.length; i4++) {
        this.K[i4] = 0;
        this.V[i4] = 1;
      }
      this._update(seed);
      this._reseed = 1;
      this.reseedInterval = 281474976710656;
    };
    HmacDRBG.prototype._hmac = function hmac() {
      return new hash.hmac(this.hash, this.K);
    };
    HmacDRBG.prototype._update = function update(seed) {
      var kmac = this._hmac().update(this.V).update([0]);
      if (seed)
        kmac = kmac.update(seed);
      this.K = kmac.digest();
      this.V = this._hmac().update(this.V).digest();
      if (!seed)
        return;
      this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
      this.V = this._hmac().update(this.V).digest();
    };
    HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
      if (typeof entropyEnc !== "string") {
        addEnc = add;
        add = entropyEnc;
        entropyEnc = null;
      }
      entropy = utils.toArray(entropy, entropyEnc);
      add = utils.toArray(add, addEnc);
      assert(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._update(entropy.concat(add || []));
      this._reseed = 1;
    };
    HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
      if (this._reseed > this.reseedInterval)
        throw new Error("Reseed is required");
      if (typeof enc !== "string") {
        addEnc = add;
        add = enc;
        enc = null;
      }
      if (add) {
        add = utils.toArray(add, addEnc || "hex");
        this._update(add);
      }
      var temp = [];
      while (temp.length < len) {
        this.V = this._hmac().update(this.V).digest();
        temp = temp.concat(this.V);
      }
      var res = temp.slice(0, len);
      this._update(add);
      this._reseed++;
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/key.js
var require_key = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/key.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    function KeyPair(ec, options) {
      this.ec = ec;
      this.priv = null;
      this.pub = null;
      if (options.priv)
        this._importPrivate(options.priv, options.privEnc);
      if (options.pub)
        this._importPublic(options.pub, options.pubEnc);
    }
    module.exports = KeyPair;
    KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(ec, {
        pub,
        pubEnc: enc
      });
    };
    KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
      if (priv instanceof KeyPair)
        return priv;
      return new KeyPair(ec, {
        priv,
        privEnc: enc
      });
    };
    KeyPair.prototype.validate = function validate() {
      var pub = this.getPublic();
      if (pub.isInfinity())
        return { result: false, reason: "Invalid public key" };
      if (!pub.validate())
        return { result: false, reason: "Public key is not a point" };
      if (!pub.mul(this.ec.curve.n).isInfinity())
        return { result: false, reason: "Public key * N != O" };
      return { result: true, reason: null };
    };
    KeyPair.prototype.getPublic = function getPublic(compact, enc) {
      if (typeof compact === "string") {
        enc = compact;
        compact = null;
      }
      if (!this.pub)
        this.pub = this.ec.g.mul(this.priv);
      if (!enc)
        return this.pub;
      return this.pub.encode(enc, compact);
    };
    KeyPair.prototype.getPrivate = function getPrivate(enc) {
      if (enc === "hex")
        return this.priv.toString(16, 2);
      else
        return this.priv;
    };
    KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
      this.priv = new BN(key, enc || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };
    KeyPair.prototype._importPublic = function _importPublic(key, enc) {
      if (key.x || key.y) {
        if (this.ec.curve.type === "mont") {
          assert(key.x, "Need x coordinate");
        } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
          assert(key.x && key.y, "Need both x and y coordinate");
        }
        this.pub = this.ec.curve.point(key.x, key.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(key, enc);
    };
    KeyPair.prototype.derive = function derive(pub) {
      if (!pub.validate()) {
        assert(pub.validate(), "public point not validated");
      }
      return pub.mul(this.priv).getX();
    };
    KeyPair.prototype.sign = function sign2(msg, enc, options) {
      return this.ec.sign(msg, this, enc, options);
    };
    KeyPair.prototype.verify = function verify2(msg, signature) {
      return this.ec.verify(msg, signature, this);
    };
    KeyPair.prototype.inspect = function inspect() {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/signature.js
var require_signature = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    function Signature(options, enc) {
      if (options instanceof Signature)
        return options;
      if (this._importDER(options, enc))
        return;
      assert(options.r && options.s, "Signature without r or s");
      this.r = new BN(options.r, 16);
      this.s = new BN(options.s, 16);
      if (options.recoveryParam === void 0)
        this.recoveryParam = null;
      else
        this.recoveryParam = options.recoveryParam;
    }
    module.exports = Signature;
    function Position() {
      this.place = 0;
    }
    function getLength(buf, p3) {
      var initial = buf[p3.place++];
      if (!(initial & 128)) {
        return initial;
      }
      var octetLen = initial & 15;
      if (octetLen === 0 || octetLen > 4) {
        return false;
      }
      if (buf[p3.place] === 0) {
        return false;
      }
      var val = 0;
      for (var i4 = 0, off = p3.place; i4 < octetLen; i4++, off++) {
        val <<= 8;
        val |= buf[off];
        val >>>= 0;
      }
      if (val <= 127) {
        return false;
      }
      p3.place = off;
      return val;
    }
    function rmPadding(buf) {
      var i4 = 0;
      var len = buf.length - 1;
      while (!buf[i4] && !(buf[i4 + 1] & 128) && i4 < len) {
        i4++;
      }
      if (i4 === 0) {
        return buf;
      }
      return buf.slice(i4);
    }
    Signature.prototype._importDER = function _importDER(data, enc) {
      data = utils.toArray(data, enc);
      var p3 = new Position();
      if (data[p3.place++] !== 48) {
        return false;
      }
      var len = getLength(data, p3);
      if (len === false) {
        return false;
      }
      if (len + p3.place !== data.length) {
        return false;
      }
      if (data[p3.place++] !== 2) {
        return false;
      }
      var rlen = getLength(data, p3);
      if (rlen === false) {
        return false;
      }
      if ((data[p3.place] & 128) !== 0) {
        return false;
      }
      var r3 = data.slice(p3.place, rlen + p3.place);
      p3.place += rlen;
      if (data[p3.place++] !== 2) {
        return false;
      }
      var slen = getLength(data, p3);
      if (slen === false) {
        return false;
      }
      if (data.length !== slen + p3.place) {
        return false;
      }
      if ((data[p3.place] & 128) !== 0) {
        return false;
      }
      var s3 = data.slice(p3.place, slen + p3.place);
      if (r3[0] === 0) {
        if (r3[1] & 128) {
          r3 = r3.slice(1);
        } else {
          return false;
        }
      }
      if (s3[0] === 0) {
        if (s3[1] & 128) {
          s3 = s3.slice(1);
        } else {
          return false;
        }
      }
      this.r = new BN(r3);
      this.s = new BN(s3);
      this.recoveryParam = null;
      return true;
    };
    function constructLength(arr, len) {
      if (len < 128) {
        arr.push(len);
        return;
      }
      var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
      arr.push(octets | 128);
      while (--octets) {
        arr.push(len >>> (octets << 3) & 255);
      }
      arr.push(len);
    }
    Signature.prototype.toDER = function toDER(enc) {
      var r3 = this.r.toArray();
      var s3 = this.s.toArray();
      if (r3[0] & 128)
        r3 = [0].concat(r3);
      if (s3[0] & 128)
        s3 = [0].concat(s3);
      r3 = rmPadding(r3);
      s3 = rmPadding(s3);
      while (!s3[0] && !(s3[1] & 128)) {
        s3 = s3.slice(1);
      }
      var arr = [2];
      constructLength(arr, r3.length);
      arr = arr.concat(r3);
      arr.push(2);
      constructLength(arr, s3.length);
      var backHalf = arr.concat(s3);
      var res = [48];
      constructLength(res, backHalf.length);
      res = res.concat(backHalf);
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/index.js
var require_ec = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/index.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var HmacDRBG = require_hmac_drbg();
    var utils = require_utils3();
    var curves = require_curves();
    var rand = require_brorand();
    var assert = utils.assert;
    var KeyPair = require_key();
    var Signature = require_signature();
    function EC(options) {
      if (!(this instanceof EC))
        return new EC(options);
      if (typeof options === "string") {
        assert(
          Object.prototype.hasOwnProperty.call(curves, options),
          "Unknown curve " + options
        );
        options = curves[options];
      }
      if (options instanceof curves.PresetCurve)
        options = { curve: options };
      this.curve = options.curve.curve;
      this.n = this.curve.n;
      this.nh = this.n.ushrn(1);
      this.g = this.curve.g;
      this.g = options.curve.g;
      this.g.precompute(options.curve.n.bitLength() + 1);
      this.hash = options.hash || options.curve.hash;
    }
    module.exports = EC;
    EC.prototype.keyPair = function keyPair(options) {
      return new KeyPair(this, options);
    };
    EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
      return KeyPair.fromPrivate(this, priv, enc);
    };
    EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
      return KeyPair.fromPublic(this, pub, enc);
    };
    EC.prototype.genKeyPair = function genKeyPair(options) {
      if (!options)
        options = {};
      var drbg = new HmacDRBG({
        hash: this.hash,
        pers: options.pers,
        persEnc: options.persEnc || "utf8",
        entropy: options.entropy || rand(this.hash.hmacStrength),
        entropyEnc: options.entropy && options.entropyEnc || "utf8",
        nonce: this.n.toArray()
      });
      var bytes = this.n.byteLength();
      var ns2 = this.n.sub(new BN(2));
      for (; ; ) {
        var priv = new BN(drbg.generate(bytes));
        if (priv.cmp(ns2) > 0)
          continue;
        priv.iaddn(1);
        return this.keyFromPrivate(priv);
      }
    };
    EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
      var delta = msg.byteLength() * 8 - this.n.bitLength();
      if (delta > 0)
        msg = msg.ushrn(delta);
      if (!truncOnly && msg.cmp(this.n) >= 0)
        return msg.sub(this.n);
      else
        return msg;
    };
    EC.prototype.sign = function sign2(msg, key, enc, options) {
      if (typeof enc === "object") {
        options = enc;
        enc = null;
      }
      if (!options)
        options = {};
      key = this.keyFromPrivate(key, enc);
      msg = this._truncateToN(new BN(msg, 16));
      var bytes = this.n.byteLength();
      var bkey = key.getPrivate().toArray("be", bytes);
      var nonce = msg.toArray("be", bytes);
      var drbg = new HmacDRBG({
        hash: this.hash,
        entropy: bkey,
        nonce,
        pers: options.pers,
        persEnc: options.persEnc || "utf8"
      });
      var ns1 = this.n.sub(new BN(1));
      for (var iter = 0; ; iter++) {
        var k3 = options.k ? options.k(iter) : new BN(drbg.generate(this.n.byteLength()));
        k3 = this._truncateToN(k3, true);
        if (k3.cmpn(1) <= 0 || k3.cmp(ns1) >= 0)
          continue;
        var kp = this.g.mul(k3);
        if (kp.isInfinity())
          continue;
        var kpX = kp.getX();
        var r3 = kpX.umod(this.n);
        if (r3.cmpn(0) === 0)
          continue;
        var s3 = k3.invm(this.n).mul(r3.mul(key.getPrivate()).iadd(msg));
        s3 = s3.umod(this.n);
        if (s3.cmpn(0) === 0)
          continue;
        var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r3) !== 0 ? 2 : 0);
        if (options.canonical && s3.cmp(this.nh) > 0) {
          s3 = this.n.sub(s3);
          recoveryParam ^= 1;
        }
        return new Signature({ r: r3, s: s3, recoveryParam });
      }
    };
    EC.prototype.verify = function verify2(msg, signature, key, enc) {
      msg = this._truncateToN(new BN(msg, 16));
      key = this.keyFromPublic(key, enc);
      signature = new Signature(signature, "hex");
      var r3 = signature.r;
      var s3 = signature.s;
      if (r3.cmpn(1) < 0 || r3.cmp(this.n) >= 0)
        return false;
      if (s3.cmpn(1) < 0 || s3.cmp(this.n) >= 0)
        return false;
      var sinv = s3.invm(this.n);
      var u1 = sinv.mul(msg).umod(this.n);
      var u22 = sinv.mul(r3).umod(this.n);
      var p3;
      if (!this.curve._maxwellTrick) {
        p3 = this.g.mulAdd(u1, key.getPublic(), u22);
        if (p3.isInfinity())
          return false;
        return p3.getX().umod(this.n).cmp(r3) === 0;
      }
      p3 = this.g.jmulAdd(u1, key.getPublic(), u22);
      if (p3.isInfinity())
        return false;
      return p3.eqXToP(r3);
    };
    EC.prototype.recoverPubKey = function(msg, signature, j4, enc) {
      assert((3 & j4) === j4, "The recovery param is more than two bits");
      signature = new Signature(signature, enc);
      var n5 = this.n;
      var e2 = new BN(msg);
      var r3 = signature.r;
      var s3 = signature.s;
      var isYOdd = j4 & 1;
      var isSecondKey = j4 >> 1;
      if (r3.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
        throw new Error("Unable to find sencond key candinate");
      if (isSecondKey)
        r3 = this.curve.pointFromX(r3.add(this.curve.n), isYOdd);
      else
        r3 = this.curve.pointFromX(r3, isYOdd);
      var rInv = signature.r.invm(n5);
      var s1 = n5.sub(e2).mul(rInv).umod(n5);
      var s22 = s3.mul(rInv).umod(n5);
      return this.g.mulAdd(s1, r3, s22);
    };
    EC.prototype.getKeyRecoveryParam = function(e2, signature, Q3, enc) {
      signature = new Signature(signature, enc);
      if (signature.recoveryParam !== null)
        return signature.recoveryParam;
      for (var i4 = 0; i4 < 4; i4++) {
        var Qprime;
        try {
          Qprime = this.recoverPubKey(e2, signature, i4);
        } catch (e3) {
          continue;
        }
        if (Qprime.eq(Q3))
          return i4;
      }
      throw new Error("Unable to find valid recovery factor");
    };
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/key.js
var require_key2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/key.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var assert = utils.assert;
    var parseBytes = utils.parseBytes;
    var cachedProperty = utils.cachedProperty;
    function KeyPair(eddsa, params) {
      this.eddsa = eddsa;
      this._secret = parseBytes(params.secret);
      if (eddsa.isPoint(params.pub))
        this._pub = params.pub;
      else
        this._pubBytes = parseBytes(params.pub);
    }
    KeyPair.fromPublic = function fromPublic(eddsa, pub) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(eddsa, { pub });
    };
    KeyPair.fromSecret = function fromSecret(eddsa, secret) {
      if (secret instanceof KeyPair)
        return secret;
      return new KeyPair(eddsa, { secret });
    };
    KeyPair.prototype.secret = function secret() {
      return this._secret;
    };
    cachedProperty(KeyPair, "pubBytes", function pubBytes() {
      return this.eddsa.encodePoint(this.pub());
    });
    cachedProperty(KeyPair, "pub", function pub() {
      if (this._pubBytes)
        return this.eddsa.decodePoint(this._pubBytes);
      return this.eddsa.g.mul(this.priv());
    });
    cachedProperty(KeyPair, "privBytes", function privBytes() {
      var eddsa = this.eddsa;
      var hash = this.hash();
      var lastIx = eddsa.encodingLength - 1;
      var a4 = hash.slice(0, eddsa.encodingLength);
      a4[0] &= 248;
      a4[lastIx] &= 127;
      a4[lastIx] |= 64;
      return a4;
    });
    cachedProperty(KeyPair, "priv", function priv() {
      return this.eddsa.decodeInt(this.privBytes());
    });
    cachedProperty(KeyPair, "hash", function hash() {
      return this.eddsa.hash().update(this.secret()).digest();
    });
    cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
      return this.hash().slice(this.eddsa.encodingLength);
    });
    KeyPair.prototype.sign = function sign2(message) {
      assert(this._secret, "KeyPair can only verify");
      return this.eddsa.sign(message, this);
    };
    KeyPair.prototype.verify = function verify2(message, sig) {
      return this.eddsa.verify(message, sig, this);
    };
    KeyPair.prototype.getSecret = function getSecret(enc) {
      assert(this._secret, "KeyPair is public only");
      return utils.encode(this.secret(), enc);
    };
    KeyPair.prototype.getPublic = function getPublic(enc) {
      return utils.encode(this.pubBytes(), enc);
    };
    module.exports = KeyPair;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/signature.js
var require_signature2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    var cachedProperty = utils.cachedProperty;
    var parseBytes = utils.parseBytes;
    function Signature(eddsa, sig) {
      this.eddsa = eddsa;
      if (typeof sig !== "object")
        sig = parseBytes(sig);
      if (Array.isArray(sig)) {
        assert(sig.length === eddsa.encodingLength * 2, "Signature has invalid size");
        sig = {
          R: sig.slice(0, eddsa.encodingLength),
          S: sig.slice(eddsa.encodingLength)
        };
      }
      assert(sig.R && sig.S, "Signature without R or S");
      if (eddsa.isPoint(sig.R))
        this._R = sig.R;
      if (sig.S instanceof BN)
        this._S = sig.S;
      this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
      this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
    }
    cachedProperty(Signature, "S", function S4() {
      return this.eddsa.decodeInt(this.Sencoded());
    });
    cachedProperty(Signature, "R", function R2() {
      return this.eddsa.decodePoint(this.Rencoded());
    });
    cachedProperty(Signature, "Rencoded", function Rencoded() {
      return this.eddsa.encodePoint(this.R());
    });
    cachedProperty(Signature, "Sencoded", function Sencoded() {
      return this.eddsa.encodeInt(this.S());
    });
    Signature.prototype.toBytes = function toBytes() {
      return this.Rencoded().concat(this.Sencoded());
    };
    Signature.prototype.toHex = function toHex() {
      return utils.encode(this.toBytes(), "hex").toUpperCase();
    };
    module.exports = Signature;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/index.js
var require_eddsa = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/index.js"(exports, module) {
    "use strict";
    var hash = require_hash2();
    var curves = require_curves();
    var utils = require_utils3();
    var assert = utils.assert;
    var parseBytes = utils.parseBytes;
    var KeyPair = require_key2();
    var Signature = require_signature2();
    function EDDSA(curve) {
      assert(curve === "ed25519", "only tested with ed25519 so far");
      if (!(this instanceof EDDSA))
        return new EDDSA(curve);
      curve = curves[curve].curve;
      this.curve = curve;
      this.g = curve.g;
      this.g.precompute(curve.n.bitLength() + 1);
      this.pointClass = curve.point().constructor;
      this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
      this.hash = hash.sha512;
    }
    module.exports = EDDSA;
    EDDSA.prototype.sign = function sign2(message, secret) {
      message = parseBytes(message);
      var key = this.keyFromSecret(secret);
      var r3 = this.hashInt(key.messagePrefix(), message);
      var R2 = this.g.mul(r3);
      var Rencoded = this.encodePoint(R2);
      var s_ = this.hashInt(Rencoded, key.pubBytes(), message).mul(key.priv());
      var S4 = r3.add(s_).umod(this.curve.n);
      return this.makeSignature({ R: R2, S: S4, Rencoded });
    };
    EDDSA.prototype.verify = function verify2(message, sig, pub) {
      message = parseBytes(message);
      sig = this.makeSignature(sig);
      if (sig.S().gte(sig.eddsa.curve.n) || sig.S().isNeg()) {
        return false;
      }
      var key = this.keyFromPublic(pub);
      var h5 = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
      var SG = this.g.mul(sig.S());
      var RplusAh = sig.R().add(key.pub().mul(h5));
      return RplusAh.eq(SG);
    };
    EDDSA.prototype.hashInt = function hashInt() {
      var hash2 = this.hash();
      for (var i4 = 0; i4 < arguments.length; i4++)
        hash2.update(arguments[i4]);
      return utils.intFromLE(hash2.digest()).umod(this.curve.n);
    };
    EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
      return KeyPair.fromPublic(this, pub);
    };
    EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
      return KeyPair.fromSecret(this, secret);
    };
    EDDSA.prototype.makeSignature = function makeSignature(sig) {
      if (sig instanceof Signature)
        return sig;
      return new Signature(this, sig);
    };
    EDDSA.prototype.encodePoint = function encodePoint(point) {
      var enc = point.getY().toArray("le", this.encodingLength);
      enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
      return enc;
    };
    EDDSA.prototype.decodePoint = function decodePoint(bytes) {
      bytes = utils.parseBytes(bytes);
      var lastIx = bytes.length - 1;
      var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
      var xIsOdd = (bytes[lastIx] & 128) !== 0;
      var y6 = utils.intFromLE(normed);
      return this.curve.pointFromY(y6, xIsOdd);
    };
    EDDSA.prototype.encodeInt = function encodeInt(num) {
      return num.toArray("le", this.encodingLength);
    };
    EDDSA.prototype.decodeInt = function decodeInt(bytes) {
      return utils.intFromLE(bytes);
    };
    EDDSA.prototype.isPoint = function isPoint(val) {
      return val instanceof this.pointClass;
    };
  }
});

// node_modules/elliptic/lib/elliptic.js
var require_elliptic = __commonJS({
  "node_modules/elliptic/lib/elliptic.js"(exports) {
    "use strict";
    var elliptic = exports;
    elliptic.version = require_package().version;
    elliptic.utils = require_utils3();
    elliptic.rand = require_brorand();
    elliptic.curve = require_curve();
    elliptic.curves = require_curves();
    elliptic.ec = require_ec();
    elliptic.eddsa = require_eddsa();
  }
});

// node_modules/@stablelib/sha512/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/@stablelib/sha512/lib/sha512.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 64;
    exports.BLOCK_SIZE = 128;
    var SHA512 = (
      /** @class */
      function() {
        function SHA5122() {
          this.digestLength = exports.DIGEST_LENGTH;
          this.blockSize = exports.BLOCK_SIZE;
          this._stateHi = new Int32Array(8);
          this._stateLo = new Int32Array(8);
          this._tempHi = new Int32Array(16);
          this._tempLo = new Int32Array(16);
          this._buffer = new Uint8Array(256);
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          this.reset();
        }
        SHA5122.prototype._initState = function() {
          this._stateHi[0] = 1779033703;
          this._stateHi[1] = 3144134277;
          this._stateHi[2] = 1013904242;
          this._stateHi[3] = 2773480762;
          this._stateHi[4] = 1359893119;
          this._stateHi[5] = 2600822924;
          this._stateHi[6] = 528734635;
          this._stateHi[7] = 1541459225;
          this._stateLo[0] = 4089235720;
          this._stateLo[1] = 2227873595;
          this._stateLo[2] = 4271175723;
          this._stateLo[3] = 1595750129;
          this._stateLo[4] = 2917565137;
          this._stateLo[5] = 725511199;
          this._stateLo[6] = 4215389547;
          this._stateLo[7] = 327033209;
        };
        SHA5122.prototype.reset = function() {
          this._initState();
          this._bufferLength = 0;
          this._bytesHashed = 0;
          this._finished = false;
          return this;
        };
        SHA5122.prototype.clean = function() {
          wipe_1.wipe(this._buffer);
          wipe_1.wipe(this._tempHi);
          wipe_1.wipe(this._tempLo);
          this.reset();
        };
        SHA5122.prototype.update = function(data, dataLength) {
          if (dataLength === void 0) {
            dataLength = data.length;
          }
          if (this._finished) {
            throw new Error("SHA512: can't update because hash was finished.");
          }
          var dataPos = 0;
          this._bytesHashed += dataLength;
          if (this._bufferLength > 0) {
            while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
              this._buffer[this._bufferLength++] = data[dataPos++];
              dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
              hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
              this._bufferLength = 0;
            }
          }
          if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
            dataLength %= this.blockSize;
          }
          while (dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          return this;
        };
        SHA5122.prototype.finish = function(out) {
          if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 536870912 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 128 < 112 ? 128 : 256;
            this._buffer[left] = 128;
            for (var i4 = left + 1; i4 < padLength - 8; i4++) {
              this._buffer[i4] = 0;
            }
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
            this._finished = true;
          }
          for (var i4 = 0; i4 < this.digestLength / 8; i4++) {
            binary_1.writeUint32BE(this._stateHi[i4], out, i4 * 8);
            binary_1.writeUint32BE(this._stateLo[i4], out, i4 * 8 + 4);
          }
          return this;
        };
        SHA5122.prototype.digest = function() {
          var out = new Uint8Array(this.digestLength);
          this.finish(out);
          return out;
        };
        SHA5122.prototype.saveState = function() {
          if (this._finished) {
            throw new Error("SHA256: cannot save finished state");
          }
          return {
            stateHi: new Int32Array(this._stateHi),
            stateLo: new Int32Array(this._stateLo),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
          };
        };
        SHA5122.prototype.restoreState = function(savedState) {
          this._stateHi.set(savedState.stateHi);
          this._stateLo.set(savedState.stateLo);
          this._bufferLength = savedState.bufferLength;
          if (savedState.buffer) {
            this._buffer.set(savedState.buffer);
          }
          this._bytesHashed = savedState.bytesHashed;
          this._finished = false;
          return this;
        };
        SHA5122.prototype.cleanSavedState = function(savedState) {
          wipe_1.wipe(savedState.stateHi);
          wipe_1.wipe(savedState.stateLo);
          if (savedState.buffer) {
            wipe_1.wipe(savedState.buffer);
          }
          savedState.bufferLength = 0;
          savedState.bytesHashed = 0;
        };
        return SHA5122;
      }()
    );
    exports.SHA512 = SHA512;
    var K4 = new Int32Array([
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ]);
    function hashBlocks(wh2, wl, hh2, hl, m2, pos, len) {
      var ah0 = hh2[0], ah1 = hh2[1], ah2 = hh2[2], ah3 = hh2[3], ah4 = hh2[4], ah5 = hh2[5], ah6 = hh2[6], ah7 = hh2[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
      var h5, l4;
      var th, tl;
      var a4, b4, c5, d3;
      while (len >= 128) {
        for (var i4 = 0; i4 < 16; i4++) {
          var j4 = 8 * i4 + pos;
          wh2[i4] = binary_1.readUint32BE(m2, j4);
          wl[i4] = binary_1.readUint32BE(m2, j4 + 4);
        }
        for (var i4 = 0; i4 < 80; i4++) {
          var bh0 = ah0;
          var bh1 = ah1;
          var bh2 = ah2;
          var bh3 = ah3;
          var bh4 = ah4;
          var bh5 = ah5;
          var bh6 = ah6;
          var bh7 = ah7;
          var bl0 = al0;
          var bl1 = al1;
          var bl2 = al2;
          var bl3 = al3;
          var bl4 = al4;
          var bl5 = al5;
          var bl6 = al6;
          var bl7 = al7;
          h5 = ah7;
          l4 = al7;
          a4 = l4 & 65535;
          b4 = l4 >>> 16;
          c5 = h5 & 65535;
          d3 = h5 >>> 16;
          h5 = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
          l4 = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          h5 = ah4 & ah5 ^ ~ah4 & ah6;
          l4 = al4 & al5 ^ ~al4 & al6;
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          h5 = K4[i4 * 2];
          l4 = K4[i4 * 2 + 1];
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          h5 = wh2[i4 % 16];
          l4 = wl[i4 % 16];
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          b4 += a4 >>> 16;
          c5 += b4 >>> 16;
          d3 += c5 >>> 16;
          th = c5 & 65535 | d3 << 16;
          tl = a4 & 65535 | b4 << 16;
          h5 = th;
          l4 = tl;
          a4 = l4 & 65535;
          b4 = l4 >>> 16;
          c5 = h5 & 65535;
          d3 = h5 >>> 16;
          h5 = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
          l4 = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          h5 = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
          l4 = al0 & al1 ^ al0 & al2 ^ al1 & al2;
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          b4 += a4 >>> 16;
          c5 += b4 >>> 16;
          d3 += c5 >>> 16;
          bh7 = c5 & 65535 | d3 << 16;
          bl7 = a4 & 65535 | b4 << 16;
          h5 = bh3;
          l4 = bl3;
          a4 = l4 & 65535;
          b4 = l4 >>> 16;
          c5 = h5 & 65535;
          d3 = h5 >>> 16;
          h5 = th;
          l4 = tl;
          a4 += l4 & 65535;
          b4 += l4 >>> 16;
          c5 += h5 & 65535;
          d3 += h5 >>> 16;
          b4 += a4 >>> 16;
          c5 += b4 >>> 16;
          d3 += c5 >>> 16;
          bh3 = c5 & 65535 | d3 << 16;
          bl3 = a4 & 65535 | b4 << 16;
          ah1 = bh0;
          ah2 = bh1;
          ah3 = bh2;
          ah4 = bh3;
          ah5 = bh4;
          ah6 = bh5;
          ah7 = bh6;
          ah0 = bh7;
          al1 = bl0;
          al2 = bl1;
          al3 = bl2;
          al4 = bl3;
          al5 = bl4;
          al6 = bl5;
          al7 = bl6;
          al0 = bl7;
          if (i4 % 16 === 15) {
            for (var j4 = 0; j4 < 16; j4++) {
              h5 = wh2[j4];
              l4 = wl[j4];
              a4 = l4 & 65535;
              b4 = l4 >>> 16;
              c5 = h5 & 65535;
              d3 = h5 >>> 16;
              h5 = wh2[(j4 + 9) % 16];
              l4 = wl[(j4 + 9) % 16];
              a4 += l4 & 65535;
              b4 += l4 >>> 16;
              c5 += h5 & 65535;
              d3 += h5 >>> 16;
              th = wh2[(j4 + 1) % 16];
              tl = wl[(j4 + 1) % 16];
              h5 = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
              l4 = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
              a4 += l4 & 65535;
              b4 += l4 >>> 16;
              c5 += h5 & 65535;
              d3 += h5 >>> 16;
              th = wh2[(j4 + 14) % 16];
              tl = wl[(j4 + 14) % 16];
              h5 = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
              l4 = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
              a4 += l4 & 65535;
              b4 += l4 >>> 16;
              c5 += h5 & 65535;
              d3 += h5 >>> 16;
              b4 += a4 >>> 16;
              c5 += b4 >>> 16;
              d3 += c5 >>> 16;
              wh2[j4] = c5 & 65535 | d3 << 16;
              wl[j4] = a4 & 65535 | b4 << 16;
            }
          }
        }
        h5 = ah0;
        l4 = al0;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[0];
        l4 = hl[0];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[0] = ah0 = c5 & 65535 | d3 << 16;
        hl[0] = al0 = a4 & 65535 | b4 << 16;
        h5 = ah1;
        l4 = al1;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[1];
        l4 = hl[1];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[1] = ah1 = c5 & 65535 | d3 << 16;
        hl[1] = al1 = a4 & 65535 | b4 << 16;
        h5 = ah2;
        l4 = al2;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[2];
        l4 = hl[2];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[2] = ah2 = c5 & 65535 | d3 << 16;
        hl[2] = al2 = a4 & 65535 | b4 << 16;
        h5 = ah3;
        l4 = al3;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[3];
        l4 = hl[3];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[3] = ah3 = c5 & 65535 | d3 << 16;
        hl[3] = al3 = a4 & 65535 | b4 << 16;
        h5 = ah4;
        l4 = al4;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[4];
        l4 = hl[4];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[4] = ah4 = c5 & 65535 | d3 << 16;
        hl[4] = al4 = a4 & 65535 | b4 << 16;
        h5 = ah5;
        l4 = al5;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[5];
        l4 = hl[5];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[5] = ah5 = c5 & 65535 | d3 << 16;
        hl[5] = al5 = a4 & 65535 | b4 << 16;
        h5 = ah6;
        l4 = al6;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[6];
        l4 = hl[6];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[6] = ah6 = c5 & 65535 | d3 << 16;
        hl[6] = al6 = a4 & 65535 | b4 << 16;
        h5 = ah7;
        l4 = al7;
        a4 = l4 & 65535;
        b4 = l4 >>> 16;
        c5 = h5 & 65535;
        d3 = h5 >>> 16;
        h5 = hh2[7];
        l4 = hl[7];
        a4 += l4 & 65535;
        b4 += l4 >>> 16;
        c5 += h5 & 65535;
        d3 += h5 >>> 16;
        b4 += a4 >>> 16;
        c5 += b4 >>> 16;
        d3 += c5 >>> 16;
        hh2[7] = ah7 = c5 & 65535 | d3 << 16;
        hl[7] = al7 = a4 & 65535 | b4 << 16;
        pos += 128;
        len -= 128;
      }
      return pos;
    }
    function hash(data) {
      var h5 = new SHA512();
      h5.update(data);
      var digest2 = h5.digest();
      h5.clean();
      return digest2;
    }
    exports.hash = hash;
  }
});

// node_modules/@stablelib/ed25519/lib/ed25519.js
var require_ed25519 = __commonJS({
  "node_modules/@stablelib/ed25519/lib/ed25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
    var random_1 = require_random();
    var sha512_1 = require_sha512();
    var wipe_1 = require_wipe();
    exports.SIGNATURE_LENGTH = 64;
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 64;
    exports.SEED_LENGTH = 32;
    function gf2(init) {
      const r3 = new Float64Array(16);
      if (init) {
        for (let i4 = 0; i4 < init.length; i4++) {
          r3[i4] = init[i4];
        }
      }
      return r3;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var gf0 = gf2();
    var gf1 = gf2([1]);
    var D3 = gf2([
      30883,
      4953,
      19914,
      30187,
      55467,
      16705,
      2637,
      112,
      59544,
      30585,
      16505,
      36039,
      65139,
      11119,
      27886,
      20995
    ]);
    var D22 = gf2([
      61785,
      9906,
      39828,
      60374,
      45398,
      33411,
      5274,
      224,
      53552,
      61171,
      33010,
      6542,
      64743,
      22239,
      55772,
      9222
    ]);
    var X2 = gf2([
      54554,
      36645,
      11616,
      51542,
      42930,
      38181,
      51040,
      26924,
      56412,
      64982,
      57905,
      49316,
      21502,
      52590,
      14035,
      8553
    ]);
    var Y = gf2([
      26200,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214
    ]);
    var I4 = gf2([
      41136,
      18958,
      6951,
      50414,
      58488,
      44335,
      6150,
      12099,
      55207,
      15867,
      153,
      11085,
      57099,
      20417,
      9344,
      11139
    ]);
    function set25519(r3, a4) {
      for (let i4 = 0; i4 < 16; i4++) {
        r3[i4] = a4[i4] | 0;
      }
    }
    function car25519(o4) {
      let c5 = 1;
      for (let i4 = 0; i4 < 16; i4++) {
        let v4 = o4[i4] + c5 + 65535;
        c5 = Math.floor(v4 / 65536);
        o4[i4] = v4 - c5 * 65536;
      }
      o4[0] += c5 - 1 + 37 * (c5 - 1);
    }
    function sel25519(p3, q2, b4) {
      const c5 = ~(b4 - 1);
      for (let i4 = 0; i4 < 16; i4++) {
        const t = c5 & (p3[i4] ^ q2[i4]);
        p3[i4] ^= t;
        q2[i4] ^= t;
      }
    }
    function pack25519(o4, n5) {
      const m2 = gf2();
      const t = gf2();
      for (let i4 = 0; i4 < 16; i4++) {
        t[i4] = n5[i4];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j4 = 0; j4 < 2; j4++) {
        m2[0] = t[0] - 65517;
        for (let i4 = 1; i4 < 15; i4++) {
          m2[i4] = t[i4] - 65535 - (m2[i4 - 1] >> 16 & 1);
          m2[i4 - 1] &= 65535;
        }
        m2[15] = t[15] - 32767 - (m2[14] >> 16 & 1);
        const b4 = m2[15] >> 16 & 1;
        m2[14] &= 65535;
        sel25519(t, m2, 1 - b4);
      }
      for (let i4 = 0; i4 < 16; i4++) {
        o4[2 * i4] = t[i4] & 255;
        o4[2 * i4 + 1] = t[i4] >> 8;
      }
    }
    function verify32(x5, y6) {
      let d3 = 0;
      for (let i4 = 0; i4 < 32; i4++) {
        d3 |= x5[i4] ^ y6[i4];
      }
      return (1 & d3 - 1 >>> 8) - 1;
    }
    function neq25519(a4, b4) {
      const c5 = new Uint8Array(32);
      const d3 = new Uint8Array(32);
      pack25519(c5, a4);
      pack25519(d3, b4);
      return verify32(c5, d3);
    }
    function par25519(a4) {
      const d3 = new Uint8Array(32);
      pack25519(d3, a4);
      return d3[0] & 1;
    }
    function unpack25519(o4, n5) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = n5[2 * i4] + (n5[2 * i4 + 1] << 8);
      }
      o4[15] &= 32767;
    }
    function add(o4, a4, b4) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = a4[i4] + b4[i4];
      }
    }
    function sub(o4, a4, b4) {
      for (let i4 = 0; i4 < 16; i4++) {
        o4[i4] = a4[i4] - b4[i4];
      }
    }
    function mul(o4, a4, b4) {
      let v4, c5, t02 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b02 = b4[0], b1 = b4[1], b22 = b4[2], b32 = b4[3], b42 = b4[4], b5 = b4[5], b6 = b4[6], b7 = b4[7], b8 = b4[8], b9 = b4[9], b10 = b4[10], b11 = b4[11], b12 = b4[12], b13 = b4[13], b14 = b4[14], b15 = b4[15];
      v4 = a4[0];
      t02 += v4 * b02;
      t1 += v4 * b1;
      t2 += v4 * b22;
      t3 += v4 * b32;
      t4 += v4 * b42;
      t5 += v4 * b5;
      t6 += v4 * b6;
      t7 += v4 * b7;
      t8 += v4 * b8;
      t9 += v4 * b9;
      t10 += v4 * b10;
      t11 += v4 * b11;
      t12 += v4 * b12;
      t13 += v4 * b13;
      t14 += v4 * b14;
      t15 += v4 * b15;
      v4 = a4[1];
      t1 += v4 * b02;
      t2 += v4 * b1;
      t3 += v4 * b22;
      t4 += v4 * b32;
      t5 += v4 * b42;
      t6 += v4 * b5;
      t7 += v4 * b6;
      t8 += v4 * b7;
      t9 += v4 * b8;
      t10 += v4 * b9;
      t11 += v4 * b10;
      t12 += v4 * b11;
      t13 += v4 * b12;
      t14 += v4 * b13;
      t15 += v4 * b14;
      t16 += v4 * b15;
      v4 = a4[2];
      t2 += v4 * b02;
      t3 += v4 * b1;
      t4 += v4 * b22;
      t5 += v4 * b32;
      t6 += v4 * b42;
      t7 += v4 * b5;
      t8 += v4 * b6;
      t9 += v4 * b7;
      t10 += v4 * b8;
      t11 += v4 * b9;
      t12 += v4 * b10;
      t13 += v4 * b11;
      t14 += v4 * b12;
      t15 += v4 * b13;
      t16 += v4 * b14;
      t17 += v4 * b15;
      v4 = a4[3];
      t3 += v4 * b02;
      t4 += v4 * b1;
      t5 += v4 * b22;
      t6 += v4 * b32;
      t7 += v4 * b42;
      t8 += v4 * b5;
      t9 += v4 * b6;
      t10 += v4 * b7;
      t11 += v4 * b8;
      t12 += v4 * b9;
      t13 += v4 * b10;
      t14 += v4 * b11;
      t15 += v4 * b12;
      t16 += v4 * b13;
      t17 += v4 * b14;
      t18 += v4 * b15;
      v4 = a4[4];
      t4 += v4 * b02;
      t5 += v4 * b1;
      t6 += v4 * b22;
      t7 += v4 * b32;
      t8 += v4 * b42;
      t9 += v4 * b5;
      t10 += v4 * b6;
      t11 += v4 * b7;
      t12 += v4 * b8;
      t13 += v4 * b9;
      t14 += v4 * b10;
      t15 += v4 * b11;
      t16 += v4 * b12;
      t17 += v4 * b13;
      t18 += v4 * b14;
      t19 += v4 * b15;
      v4 = a4[5];
      t5 += v4 * b02;
      t6 += v4 * b1;
      t7 += v4 * b22;
      t8 += v4 * b32;
      t9 += v4 * b42;
      t10 += v4 * b5;
      t11 += v4 * b6;
      t12 += v4 * b7;
      t13 += v4 * b8;
      t14 += v4 * b9;
      t15 += v4 * b10;
      t16 += v4 * b11;
      t17 += v4 * b12;
      t18 += v4 * b13;
      t19 += v4 * b14;
      t20 += v4 * b15;
      v4 = a4[6];
      t6 += v4 * b02;
      t7 += v4 * b1;
      t8 += v4 * b22;
      t9 += v4 * b32;
      t10 += v4 * b42;
      t11 += v4 * b5;
      t12 += v4 * b6;
      t13 += v4 * b7;
      t14 += v4 * b8;
      t15 += v4 * b9;
      t16 += v4 * b10;
      t17 += v4 * b11;
      t18 += v4 * b12;
      t19 += v4 * b13;
      t20 += v4 * b14;
      t21 += v4 * b15;
      v4 = a4[7];
      t7 += v4 * b02;
      t8 += v4 * b1;
      t9 += v4 * b22;
      t10 += v4 * b32;
      t11 += v4 * b42;
      t12 += v4 * b5;
      t13 += v4 * b6;
      t14 += v4 * b7;
      t15 += v4 * b8;
      t16 += v4 * b9;
      t17 += v4 * b10;
      t18 += v4 * b11;
      t19 += v4 * b12;
      t20 += v4 * b13;
      t21 += v4 * b14;
      t22 += v4 * b15;
      v4 = a4[8];
      t8 += v4 * b02;
      t9 += v4 * b1;
      t10 += v4 * b22;
      t11 += v4 * b32;
      t12 += v4 * b42;
      t13 += v4 * b5;
      t14 += v4 * b6;
      t15 += v4 * b7;
      t16 += v4 * b8;
      t17 += v4 * b9;
      t18 += v4 * b10;
      t19 += v4 * b11;
      t20 += v4 * b12;
      t21 += v4 * b13;
      t22 += v4 * b14;
      t23 += v4 * b15;
      v4 = a4[9];
      t9 += v4 * b02;
      t10 += v4 * b1;
      t11 += v4 * b22;
      t12 += v4 * b32;
      t13 += v4 * b42;
      t14 += v4 * b5;
      t15 += v4 * b6;
      t16 += v4 * b7;
      t17 += v4 * b8;
      t18 += v4 * b9;
      t19 += v4 * b10;
      t20 += v4 * b11;
      t21 += v4 * b12;
      t22 += v4 * b13;
      t23 += v4 * b14;
      t24 += v4 * b15;
      v4 = a4[10];
      t10 += v4 * b02;
      t11 += v4 * b1;
      t12 += v4 * b22;
      t13 += v4 * b32;
      t14 += v4 * b42;
      t15 += v4 * b5;
      t16 += v4 * b6;
      t17 += v4 * b7;
      t18 += v4 * b8;
      t19 += v4 * b9;
      t20 += v4 * b10;
      t21 += v4 * b11;
      t22 += v4 * b12;
      t23 += v4 * b13;
      t24 += v4 * b14;
      t25 += v4 * b15;
      v4 = a4[11];
      t11 += v4 * b02;
      t12 += v4 * b1;
      t13 += v4 * b22;
      t14 += v4 * b32;
      t15 += v4 * b42;
      t16 += v4 * b5;
      t17 += v4 * b6;
      t18 += v4 * b7;
      t19 += v4 * b8;
      t20 += v4 * b9;
      t21 += v4 * b10;
      t22 += v4 * b11;
      t23 += v4 * b12;
      t24 += v4 * b13;
      t25 += v4 * b14;
      t26 += v4 * b15;
      v4 = a4[12];
      t12 += v4 * b02;
      t13 += v4 * b1;
      t14 += v4 * b22;
      t15 += v4 * b32;
      t16 += v4 * b42;
      t17 += v4 * b5;
      t18 += v4 * b6;
      t19 += v4 * b7;
      t20 += v4 * b8;
      t21 += v4 * b9;
      t22 += v4 * b10;
      t23 += v4 * b11;
      t24 += v4 * b12;
      t25 += v4 * b13;
      t26 += v4 * b14;
      t27 += v4 * b15;
      v4 = a4[13];
      t13 += v4 * b02;
      t14 += v4 * b1;
      t15 += v4 * b22;
      t16 += v4 * b32;
      t17 += v4 * b42;
      t18 += v4 * b5;
      t19 += v4 * b6;
      t20 += v4 * b7;
      t21 += v4 * b8;
      t22 += v4 * b9;
      t23 += v4 * b10;
      t24 += v4 * b11;
      t25 += v4 * b12;
      t26 += v4 * b13;
      t27 += v4 * b14;
      t28 += v4 * b15;
      v4 = a4[14];
      t14 += v4 * b02;
      t15 += v4 * b1;
      t16 += v4 * b22;
      t17 += v4 * b32;
      t18 += v4 * b42;
      t19 += v4 * b5;
      t20 += v4 * b6;
      t21 += v4 * b7;
      t22 += v4 * b8;
      t23 += v4 * b9;
      t24 += v4 * b10;
      t25 += v4 * b11;
      t26 += v4 * b12;
      t27 += v4 * b13;
      t28 += v4 * b14;
      t29 += v4 * b15;
      v4 = a4[15];
      t15 += v4 * b02;
      t16 += v4 * b1;
      t17 += v4 * b22;
      t18 += v4 * b32;
      t19 += v4 * b42;
      t20 += v4 * b5;
      t21 += v4 * b6;
      t22 += v4 * b7;
      t23 += v4 * b8;
      t24 += v4 * b9;
      t25 += v4 * b10;
      t26 += v4 * b11;
      t27 += v4 * b12;
      t28 += v4 * b13;
      t29 += v4 * b14;
      t30 += v4 * b15;
      t02 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c5 = 1;
      v4 = t02 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t02 = v4 - c5 * 65536;
      v4 = t1 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t1 = v4 - c5 * 65536;
      v4 = t2 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t2 = v4 - c5 * 65536;
      v4 = t3 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t3 = v4 - c5 * 65536;
      v4 = t4 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t4 = v4 - c5 * 65536;
      v4 = t5 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t5 = v4 - c5 * 65536;
      v4 = t6 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t6 = v4 - c5 * 65536;
      v4 = t7 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t7 = v4 - c5 * 65536;
      v4 = t8 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t8 = v4 - c5 * 65536;
      v4 = t9 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t9 = v4 - c5 * 65536;
      v4 = t10 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t10 = v4 - c5 * 65536;
      v4 = t11 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t11 = v4 - c5 * 65536;
      v4 = t12 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t12 = v4 - c5 * 65536;
      v4 = t13 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t13 = v4 - c5 * 65536;
      v4 = t14 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t14 = v4 - c5 * 65536;
      v4 = t15 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t15 = v4 - c5 * 65536;
      t02 += c5 - 1 + 37 * (c5 - 1);
      c5 = 1;
      v4 = t02 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t02 = v4 - c5 * 65536;
      v4 = t1 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t1 = v4 - c5 * 65536;
      v4 = t2 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t2 = v4 - c5 * 65536;
      v4 = t3 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t3 = v4 - c5 * 65536;
      v4 = t4 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t4 = v4 - c5 * 65536;
      v4 = t5 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t5 = v4 - c5 * 65536;
      v4 = t6 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t6 = v4 - c5 * 65536;
      v4 = t7 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t7 = v4 - c5 * 65536;
      v4 = t8 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t8 = v4 - c5 * 65536;
      v4 = t9 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t9 = v4 - c5 * 65536;
      v4 = t10 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t10 = v4 - c5 * 65536;
      v4 = t11 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t11 = v4 - c5 * 65536;
      v4 = t12 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t12 = v4 - c5 * 65536;
      v4 = t13 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t13 = v4 - c5 * 65536;
      v4 = t14 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t14 = v4 - c5 * 65536;
      v4 = t15 + c5 + 65535;
      c5 = Math.floor(v4 / 65536);
      t15 = v4 - c5 * 65536;
      t02 += c5 - 1 + 37 * (c5 - 1);
      o4[0] = t02;
      o4[1] = t1;
      o4[2] = t2;
      o4[3] = t3;
      o4[4] = t4;
      o4[5] = t5;
      o4[6] = t6;
      o4[7] = t7;
      o4[8] = t8;
      o4[9] = t9;
      o4[10] = t10;
      o4[11] = t11;
      o4[12] = t12;
      o4[13] = t13;
      o4[14] = t14;
      o4[15] = t15;
    }
    function square(o4, a4) {
      mul(o4, a4, a4);
    }
    function inv25519(o4, i4) {
      const c5 = gf2();
      let a4;
      for (a4 = 0; a4 < 16; a4++) {
        c5[a4] = i4[a4];
      }
      for (a4 = 253; a4 >= 0; a4--) {
        square(c5, c5);
        if (a4 !== 2 && a4 !== 4) {
          mul(c5, c5, i4);
        }
      }
      for (a4 = 0; a4 < 16; a4++) {
        o4[a4] = c5[a4];
      }
    }
    function pow2523(o4, i4) {
      const c5 = gf2();
      let a4;
      for (a4 = 0; a4 < 16; a4++) {
        c5[a4] = i4[a4];
      }
      for (a4 = 250; a4 >= 0; a4--) {
        square(c5, c5);
        if (a4 !== 1) {
          mul(c5, c5, i4);
        }
      }
      for (a4 = 0; a4 < 16; a4++) {
        o4[a4] = c5[a4];
      }
    }
    function edadd(p3, q2) {
      const a4 = gf2(), b4 = gf2(), c5 = gf2(), d3 = gf2(), e2 = gf2(), f4 = gf2(), g3 = gf2(), h5 = gf2(), t = gf2();
      sub(a4, p3[1], p3[0]);
      sub(t, q2[1], q2[0]);
      mul(a4, a4, t);
      add(b4, p3[0], p3[1]);
      add(t, q2[0], q2[1]);
      mul(b4, b4, t);
      mul(c5, p3[3], q2[3]);
      mul(c5, c5, D22);
      mul(d3, p3[2], q2[2]);
      add(d3, d3, d3);
      sub(e2, b4, a4);
      sub(f4, d3, c5);
      add(g3, d3, c5);
      add(h5, b4, a4);
      mul(p3[0], e2, f4);
      mul(p3[1], h5, g3);
      mul(p3[2], g3, f4);
      mul(p3[3], e2, h5);
    }
    function cswap(p3, q2, b4) {
      for (let i4 = 0; i4 < 4; i4++) {
        sel25519(p3[i4], q2[i4], b4);
      }
    }
    function pack(r3, p3) {
      const tx = gf2(), ty = gf2(), zi3 = gf2();
      inv25519(zi3, p3[2]);
      mul(tx, p3[0], zi3);
      mul(ty, p3[1], zi3);
      pack25519(r3, ty);
      r3[31] ^= par25519(tx) << 7;
    }
    function scalarmult(p3, q2, s3) {
      set25519(p3[0], gf0);
      set25519(p3[1], gf1);
      set25519(p3[2], gf1);
      set25519(p3[3], gf0);
      for (let i4 = 255; i4 >= 0; --i4) {
        const b4 = s3[i4 / 8 | 0] >> (i4 & 7) & 1;
        cswap(p3, q2, b4);
        edadd(q2, p3);
        edadd(p3, p3);
        cswap(p3, q2, b4);
      }
    }
    function scalarbase(p3, s3) {
      const q2 = [gf2(), gf2(), gf2(), gf2()];
      set25519(q2[0], X2);
      set25519(q2[1], Y);
      set25519(q2[2], gf1);
      mul(q2[3], X2, Y);
      scalarmult(p3, q2, s3);
    }
    function generateKeyPairFromSeed2(seed) {
      if (seed.length !== exports.SEED_LENGTH) {
        throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
      }
      const d3 = (0, sha512_1.hash)(seed);
      d3[0] &= 248;
      d3[31] &= 127;
      d3[31] |= 64;
      const publicKey = new Uint8Array(32);
      const p3 = [gf2(), gf2(), gf2(), gf2()];
      scalarbase(p3, d3);
      pack(publicKey, p3);
      const secretKey = new Uint8Array(64);
      secretKey.set(seed);
      secretKey.set(publicKey, 32);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
    function generateKeyPair3(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed2(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair3;
    function extractPublicKeyFromSecretKey(secretKey) {
      if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      return new Uint8Array(secretKey.subarray(32));
    }
    exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
    var L2 = new Float64Array([
      237,
      211,
      245,
      92,
      26,
      99,
      18,
      88,
      214,
      156,
      247,
      162,
      222,
      249,
      222,
      20,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16
    ]);
    function modL(r3, x5) {
      let carry;
      let i4;
      let j4;
      let k3;
      for (i4 = 63; i4 >= 32; --i4) {
        carry = 0;
        for (j4 = i4 - 32, k3 = i4 - 12; j4 < k3; ++j4) {
          x5[j4] += carry - 16 * x5[i4] * L2[j4 - (i4 - 32)];
          carry = Math.floor((x5[j4] + 128) / 256);
          x5[j4] -= carry * 256;
        }
        x5[j4] += carry;
        x5[i4] = 0;
      }
      carry = 0;
      for (j4 = 0; j4 < 32; j4++) {
        x5[j4] += carry - (x5[31] >> 4) * L2[j4];
        carry = x5[j4] >> 8;
        x5[j4] &= 255;
      }
      for (j4 = 0; j4 < 32; j4++) {
        x5[j4] -= carry * L2[j4];
      }
      for (i4 = 0; i4 < 32; i4++) {
        x5[i4 + 1] += x5[i4] >> 8;
        r3[i4] = x5[i4] & 255;
      }
    }
    function reduce(r3) {
      const x5 = new Float64Array(64);
      for (let i4 = 0; i4 < 64; i4++) {
        x5[i4] = r3[i4];
      }
      for (let i4 = 0; i4 < 64; i4++) {
        r3[i4] = 0;
      }
      modL(r3, x5);
    }
    function sign2(secretKey, message) {
      const x5 = new Float64Array(64);
      const p3 = [gf2(), gf2(), gf2(), gf2()];
      const d3 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d3[0] &= 248;
      d3[31] &= 127;
      d3[31] |= 64;
      const signature = new Uint8Array(64);
      signature.set(d3.subarray(32), 32);
      const hs = new sha512_1.SHA512();
      hs.update(signature.subarray(32));
      hs.update(message);
      const r3 = hs.digest();
      hs.clean();
      reduce(r3);
      scalarbase(p3, r3);
      pack(signature, p3);
      hs.reset();
      hs.update(signature.subarray(0, 32));
      hs.update(secretKey.subarray(32));
      hs.update(message);
      const h5 = hs.digest();
      reduce(h5);
      for (let i4 = 0; i4 < 32; i4++) {
        x5[i4] = r3[i4];
      }
      for (let i4 = 0; i4 < 32; i4++) {
        for (let j4 = 0; j4 < 32; j4++) {
          x5[i4 + j4] += h5[i4] * d3[j4];
        }
      }
      modL(signature.subarray(32), x5);
      return signature;
    }
    exports.sign = sign2;
    function unpackneg(r3, p3) {
      const t = gf2(), chk = gf2(), num = gf2(), den = gf2(), den2 = gf2(), den4 = gf2(), den6 = gf2();
      set25519(r3[2], gf1);
      unpack25519(r3[1], p3);
      square(num, r3[1]);
      mul(den, num, D3);
      sub(num, num, r3[2]);
      add(den, r3[2], den);
      square(den2, den);
      square(den4, den2);
      mul(den6, den4, den2);
      mul(t, den6, num);
      mul(t, t, den);
      pow2523(t, t);
      mul(t, t, num);
      mul(t, t, den);
      mul(t, t, den);
      mul(r3[0], t, den);
      square(chk, r3[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        mul(r3[0], r3[0], I4);
      }
      square(chk, r3[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        return -1;
      }
      if (par25519(r3[0]) === p3[31] >> 7) {
        sub(r3[0], gf0, r3[0]);
      }
      mul(r3[3], r3[0], r3[1]);
      return 0;
    }
    function verify2(publicKey, message, signature) {
      const t = new Uint8Array(32);
      const p3 = [gf2(), gf2(), gf2(), gf2()];
      const q2 = [gf2(), gf2(), gf2(), gf2()];
      if (signature.length !== exports.SIGNATURE_LENGTH) {
        throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
      }
      if (unpackneg(q2, publicKey)) {
        return false;
      }
      const hs = new sha512_1.SHA512();
      hs.update(signature.subarray(0, 32));
      hs.update(publicKey);
      hs.update(message);
      const h5 = hs.digest();
      reduce(h5);
      scalarmult(p3, q2, h5);
      scalarbase(q2, signature.subarray(32));
      edadd(p3, q2);
      pack(t, p3);
      if (verify32(signature, t)) {
        return false;
      }
      return true;
    }
    exports.verify = verify2;
    function convertPublicKeyToX25519(publicKey) {
      let q2 = [gf2(), gf2(), gf2(), gf2()];
      if (unpackneg(q2, publicKey)) {
        throw new Error("Ed25519: invalid public key");
      }
      let a4 = gf2();
      let b4 = gf2();
      let y6 = q2[1];
      add(a4, gf1, y6);
      sub(b4, gf1, y6);
      inv25519(b4, b4);
      mul(a4, a4, b4);
      let z6 = new Uint8Array(32);
      pack25519(z6, a4);
      return z6;
    }
    exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
    function convertSecretKeyToX25519(secretKey) {
      const d3 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d3[0] &= 248;
      d3[31] &= 127;
      d3[31] |= 64;
      const o4 = new Uint8Array(d3.subarray(0, 32));
      (0, wipe_1.wipe)(d3);
      return o4;
    }
    exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o4) {
      try {
        return JSON.stringify(o4);
      } catch (e2) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f4, args, opts) {
      var ss3 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f4 === "object" && f4 !== null) {
        var len = args.length + offset;
        if (len === 1)
          return f4;
        var objects = new Array(len);
        objects[0] = ss3(f4);
        for (var index = 1; index < len; index++) {
          objects[index] = ss3(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f4 !== "string") {
        return f4;
      }
      var argLen = args.length;
      if (argLen === 0)
        return f4;
      var str = "";
      var a4 = 1 - offset;
      var lastPos = -1;
      var flen = f4 && f4.length || 0;
      for (var i4 = 0; i4 < flen; ) {
        if (f4.charCodeAt(i4) === 37 && i4 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f4.charCodeAt(i4 + 1)) {
            case 100:
            case 102:
              if (a4 >= argLen)
                break;
              if (args[a4] == null)
                break;
              if (lastPos < i4)
                str += f4.slice(lastPos, i4);
              str += Number(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 105:
              if (a4 >= argLen)
                break;
              if (args[a4] == null)
                break;
              if (lastPos < i4)
                str += f4.slice(lastPos, i4);
              str += Math.floor(Number(args[a4]));
              lastPos = i4 + 2;
              i4++;
              break;
            case 79:
            case 111:
            case 106:
              if (a4 >= argLen)
                break;
              if (args[a4] === void 0)
                break;
              if (lastPos < i4)
                str += f4.slice(lastPos, i4);
              var type = typeof args[a4];
              if (type === "string") {
                str += "'" + args[a4] + "'";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              if (type === "function") {
                str += args[a4].name || "<anonymous>";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              str += ss3(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 115:
              if (a4 >= argLen)
                break;
              if (lastPos < i4)
                str += f4.slice(lastPos, i4);
              str += String(args[a4]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 37:
              if (lastPos < i4)
                str += f4.slice(lastPos, i4);
              str += "%";
              lastPos = i4 + 2;
              i4++;
              a4--;
              break;
          }
          ++a4;
        }
        ++i4;
      }
      if (lastPos === -1)
        return f4;
      else if (lastPos < flen) {
        str += f4.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser2 = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k3) {
          return k3 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write)
        opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1)
        stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false)
        opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log)
        logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2)
        logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set2(setOpts, logger, "error", "log");
        set2(setOpts, logger, "fatal", "error");
        set2(setOpts, logger, "warn", "error");
        set2(setOpts, logger, "info", "log");
        set2(setOpts, logger, "debug", "log");
        set2(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set2(opts, logger, level, fallback) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop)
        return;
      logger[level] = function(write) {
        return function LOG() {
          const ts3 = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i4 = 0; i4 < args.length; i4++)
            args[i4] = arguments[i4];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject)
            write.call(proto, asObject(this, level, args, ts3));
          else
            write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue)
              return;
            transmit(this, {
              ts: ts3,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts3) {
      if (logger._serialize)
        applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o4 = {};
      if (ts3) {
        o4.time = ts3;
      }
      o4.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1)
        lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o4, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string")
        msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0)
        o4.msg = msg;
      return o4;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i4 in args) {
        if (stdErrSerialize && args[i4] instanceof Error) {
          args[i4] = pino.stdSerializers.err(args[i4]);
        } else if (typeof args[i4] === "object" && !Array.isArray(args[i4])) {
          for (const k3 in args[i4]) {
            if (serialize && serialize.indexOf(k3) > -1 && k3 in serializers) {
              args[i4][k3] = serializers[k3](args[i4][k3]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i4 = 1; i4 < args.length; i4++) {
          args[i4] = arguments[i4 - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts3 = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts3;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a4) {
      return a4;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o4) {
        return typeof o4 !== "undefined" && o4;
      }
      try {
        if (typeof globalThis !== "undefined")
          return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e2) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d3, b4) {
  extendStatics2(d3, b4);
  function __() {
    this.constructor = d3;
  }
  d3.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
}
function __rest2(s3, e2) {
  var t = {};
  for (var p3 in s3)
    if (Object.prototype.hasOwnProperty.call(s3, p3) && e2.indexOf(p3) < 0)
      t[p3] = s3[p3];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p3 = Object.getOwnPropertySymbols(s3); i4 < p3.length; i4++) {
      if (e2.indexOf(p3[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p3[i4]))
        t[p3[i4]] = s3[p3[i4]];
    }
  return t;
}
function __decorate2(decorators, target, key, desc) {
  var c5 = arguments.length, r3 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r3 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i4 = decorators.length - 1; i4 >= 0; i4--)
      if (d3 = decorators[i4])
        r3 = (c5 < 3 ? d3(r3) : c5 > 3 ? d3(target, key, r3) : d3(target, key)) || r3;
  return c5 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f4, y6, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n5) {
    return function(v4) {
      return step([n5, v4]);
    };
  }
  function step(op) {
    if (f4)
      throw new TypeError("Generator is already executing.");
    while (_3)
      try {
        if (f4 = 1, y6 && (t = op[0] & 2 ? y6["return"] : op[0] ? y6["throw"] || ((t = y6["return"]) && t.call(y6), 0) : y6.next) && !(t = t.call(y6, op[1])).done)
          return t;
        if (y6 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _3.label++;
            return { value: op[1], done: false };
          case 5:
            _3.label++;
            y6 = op[1];
            op = [0];
            continue;
          case 7:
            op = _3.ops.pop();
            _3.trys.pop();
            continue;
          default:
            if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _3 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _3.label = op[1];
              break;
            }
            if (op[0] === 6 && _3.label < t[1]) {
              _3.label = t[1];
              t = op;
              break;
            }
            if (t && _3.label < t[2]) {
              _3.label = t[2];
              _3.ops.push(op);
              break;
            }
            if (t[2])
              _3.ops.pop();
            _3.trys.pop();
            continue;
        }
        op = body.call(thisArg, _3);
      } catch (e2) {
        op = [6, e2];
        y6 = 0;
      } finally {
        f4 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o4, m2, k3, k22) {
  if (k22 === void 0)
    k22 = k3;
  o4[k22] = m2[k3];
}
function __exportStar2(m2, exports) {
  for (var p3 in m2)
    if (p3 !== "default" && !exports.hasOwnProperty(p3))
      exports[p3] = m2[p3];
}
function __values2(o4) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m2 = s3 && o4[s3], i4 = 0;
  if (m2)
    return m2.call(o4);
  if (o4 && typeof o4.length === "number")
    return {
      next: function() {
        if (o4 && i4 >= o4.length)
          o4 = void 0;
        return { value: o4 && o4[i4++], done: !o4 };
      }
    };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o4, n5) {
  var m2 = typeof Symbol === "function" && o4[Symbol.iterator];
  if (!m2)
    return o4;
  var i4 = m2.call(o4), r3, ar3 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done)
      ar3.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m2 = i4["return"]))
        m2.call(i4);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar3;
}
function __spread2() {
  for (var ar3 = [], i4 = 0; i4 < arguments.length; i4++)
    ar3 = ar3.concat(__read2(arguments[i4]));
  return ar3;
}
function __spreadArrays2() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++)
    s3 += arguments[i4].length;
  for (var r3 = Array(s3), k3 = 0, i4 = 0; i4 < il; i4++)
    for (var a4 = arguments[i4], j4 = 0, jl = a4.length; j4 < jl; j4++, k3++)
      r3[k3] = a4[j4];
  return r3;
}
function __await2(v4) {
  return this instanceof __await2 ? (this.v = v4, this) : new __await2(v4);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i4, q2 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g3[n5])
      i4[n5] = function(v4) {
        return new Promise(function(a4, b4) {
          q2.push([n5, v4, a4, b4]) > 1 || resume(n5, v4);
        });
      };
  }
  function resume(n5, v4) {
    try {
      step(g3[n5](v4));
    } catch (e2) {
      settle(q2[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q2[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f4, v4) {
    if (f4(v4), q2.shift(), q2.length)
      resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator2(o4) {
  var i4, p3;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f4) {
    i4[n5] = o4[n5] ? function(v4) {
      return (p3 = !p3) ? { value: __await2(o4[n5](v4)), done: n5 === "return" } : f4 ? f4(v4) : v4;
    } : f4;
  }
}
function __asyncValues2(o4) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o4[Symbol.asyncIterator], i4;
  return m2 ? m2.call(o4) : (o4 = typeof __values2 === "function" ? __values2(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o4[n5] && function(v4) {
      return new Promise(function(resolve, reject) {
        v4 = o4[n5](v4), settle(resolve, reject, v4.done, v4.value);
      });
    };
  }
  function settle(resolve, reject, d3, v4) {
    Promise.resolve(v4).then(function(v5) {
      resolve({ value: v5, done: d3 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k3 in mod)
      if (Object.hasOwnProperty.call(mod, k3))
        result[k3] = mod[k3];
  }
  result.default = mod;
  return result;
}
function __importDefault2(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d3, b4) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b5) {
        d4.__proto__ = b5;
      } || function(d4, b5) {
        for (var p3 in b5)
          if (b5.hasOwnProperty(p3))
            d4[p3] = b5[p3];
      };
      return extendStatics2(d3, b4);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p3 in s3)
            if (Object.prototype.hasOwnProperty.call(s3, p3))
              t[p3] = s3[p3];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto2 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto2(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js
var require_browser3 = __commonJS({
  "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/lodash.isequal/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.isequal/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length2 = values.length, offset = array.length;
      while (++index < length2) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length2 = array == null ? 0 : array.length;
      while (++index < length2) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseTimes(n5, iteratee) {
      var index = -1, result = Array(n5);
      while (++index < n5) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length2 = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length2) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length2 = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length2) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length2)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length2 = array.length;
      while (length2--) {
        if (eq(array[length2][0], key)) {
          return length2;
        }
      }
      return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e2) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function isIndex(value, length2) {
      length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
      return !!length2 && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys2(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = isEqual;
  }
});

// node_modules/detect-browser/es/index.js
var __spreadArray = function(to2, from3, pack) {
  if (pack || arguments.length === 2)
    for (var i4 = 0, l4 = from3.length, ar3; i4 < l4; i4++) {
      if (ar3 || !(i4 in from3)) {
        if (!ar3)
          ar3 = Array.prototype.slice.call(from3, 0, i4);
        ar3[i4] = from3[i4];
      }
    }
  return to2.concat(ar3 || Array.prototype.slice.call(from3));
};
var BrowserInfo = (
  /** @class */
  function() {
    function BrowserInfo2(name2, version2, os) {
      this.name = name2;
      this.version = version2;
      this.os = os;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  function() {
    function NodeInfo2(version2) {
      this.version = version2;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  function() {
    function SearchBotDeviceInfo2(name2, version2, os, bot) {
      this.name = name2;
      this.version = version2;
      this.os = os;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua2) {
  return ua2 !== "" && userAgentRules.reduce(function(matched, _a2) {
    var browser = _a2[0], regex = _a2[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua2);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua2) {
  var matchedRule = matchUserAgent(ua2);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version2 = versionParts.join(".");
  var os = detectOS(ua2);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua2);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version2, os, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version2, os);
}
function detectOS(ua2) {
  for (var ii2 = 0, count = operatingSystemRules.length; ii2 < count; ii2++) {
    var _a2 = operatingSystemRules[ii2], os = _a2[0], regex = _a2[1];
    var match = regex.exec(ua2);
    if (match) {
      return os;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii2 = 0; ii2 < count; ii2++) {
    output.push("0");
  }
  return output;
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_time2 = __toESM(require_cjs());
var import_window_getters = __toESM(require_cjs2());
var import_window_metadata = __toESM(require_cjs3());
var Br = __toESM(require_query_string());
var import_chacha20poly1305 = __toESM(require_chacha20poly1305());
var import_hkdf = __toESM(require_hkdf());
var import_random2 = __toESM(require_random());
var import_sha256 = __toESM(require_sha256());
var gn = __toESM(require_x25519());

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size);
  }
  return new Uint8Array(size);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j4 = 0; j4 < BASE_MAP.length; j4++) {
    BASE_MAP[j4] = 255;
  }
  for (var i4 = 0; i4 < ALPHABET.length; i4++) {
    var x5 = ALPHABET.charAt(i4);
    var xc = x5.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x5 + " is ambiguous");
    }
    BASE_MAP[xc] = i4;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i5 = 0;
      for (var it1 = size - 1; (carry !== 0 || i5 < length2) && it1 !== -1; it1--, i5++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      pbegin++;
    }
    var it22 = size - length2;
    while (it22 !== size && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size; ++it22) {
      str += ALPHABET.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i5 = 0;
      for (var it3 = size - 1; (carry !== 0 || i5 < length2) && it3 !== -1; it3--, i5++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j5 = zeroes;
    while (it4 !== size) {
      vch[j5++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa2, bb) => {
  if (aa2 === bb)
    return true;
  if (aa2.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii2 = 0; ii2 < aa2.byteLength; ii2++) {
    if (aa2[ii2] !== bb[ii2]) {
      return false;
    }
  }
  return true;
};
var coerce = (o4) => {
  if (o4 instanceof Uint8Array && o4.constructor.name === "Uint8Array")
    return o4;
  if (o4 instanceof ArrayBuffer)
    return new Uint8Array(o4);
  if (ArrayBuffer.isView(o4)) {
    return new Uint8Array(o4.buffer, o4.byteOffset, o4.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b4) => new TextDecoder().decode(b4);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode5,
    decode: (text) => coerce(decode6(text))
  });
};
var decode = (string3, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i4 = 0; i4 < alphabet2.length; ++i4) {
    codes[alphabet2[i4]] = i4;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i4 = 0; i4 < end; ++i4) {
    const value = codes[string3[i4]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i4 = 0; i4 < data.length; ++i4) {
    buffer = buffer << 8 | data[i4];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p3, c5, i4) => {
  p3[i4] = c5;
  return p3;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p3, c5, i4) => {
  p3[c5.codePointAt(0)] = i4;
  return p3;
}, []);
function encode2(data) {
  return data.reduce((p3, c5) => {
    p3 += alphabetBytesToChars[c5];
    return p3;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode2,
  decode: decode2
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode3;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
var decode3 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b4, l4 = buf.length;
  do {
    if (counter >= l4) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b4 = buf[counter++];
    res += shift < 28 ? (b4 & REST$1) << shift : (b4 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b4 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode3,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode4 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes);
};
var decode5 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode4(bytes);
  const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes);
};
var equals2 = (a4, b4) => {
  if (a4 === b4) {
    return true;
  } else {
    return a4.code === b4.code && a4.size === b4.size && equals(a4.bytes, b4.bytes);
  }
};
var Digest = class {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
var Hasher = class {
  constructor(name2, code2, encode5) {
    this.name = name2;
    this.code = code2;
    this.encode = encode5;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new _CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode5(multihash);
      return _CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code2, digest2.bytes);
        return new _CID(version2, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i4, length2] = decode4(initialBytes.subarray(offset));
      offset += length2;
      return i4;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i4 = 0; i4 < buf.length; i4++) {
    string3 += String.fromCharCode(buf[i4]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i4 = 0; i4 < str.length; i4++) {
    buf[i4] = str.charCodeAt(i4);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string3, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string3, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string3}`);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_elliptic = __toESM(require_elliptic());

// node_modules/@walletconnect/relay-auth/dist/esm/api.js
var ed25519 = __toESM(require_ed25519());
var import_random = __toESM(require_random());
var import_time = __toESM(require_cjs());

// node_modules/@walletconnect/relay-auth/dist/esm/constants.js
var JWT_IRIDIUM_ALG = "EdDSA";
var JWT_IRIDIUM_TYP = "JWT";
var JWT_DELIMITER = ".";
var JWT_ENCODING = "base64url";
var JSON_ENCODING = "utf8";
var DATA_ENCODING = "utf8";
var DID_DELIMITER = ":";
var DID_PREFIX = "did";
var DID_METHOD = "key";
var MULTICODEC_ED25519_ENCODING = "base58btc";
var MULTICODEC_ED25519_BASE = "z";
var MULTICODEC_ED25519_HEADER = "K36";
var KEY_PAIR_SEED_LENGTH = 32;

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe2(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/concat.js
function concat2(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe2(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/util/bases.js
function createCodec2(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string2 = createCodec2("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii2 = createCodec2("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i4 = 0; i4 < buf.length; i4++) {
    string3 += String.fromCharCode(buf[i4]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe2(str.length);
  for (let i4 = 0; i4 < str.length; i4++) {
    buf[i4] = str.charCodeAt(i4);
  }
  return buf;
});
var BASES2 = {
  utf8: string2,
  "utf-8": string2,
  hex: bases.base16,
  latin1: ascii2,
  ascii: ascii2,
  binary: ascii2,
  ...bases
};
var bases_default2 = BASES2;

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/to-string.js
function toString3(array, encoding = "utf8") {
  const base3 = bases_default2[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@walletconnect/relay-auth/node_modules/uint8arrays/esm/src/from-string.js
function fromString3(string3, encoding = "utf8") {
  const base3 = bases_default2[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string3, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string3}`);
}

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_3, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_3, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a2) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@walletconnect/relay-auth/dist/esm/utils.js
function decodeJSON(str) {
  return safeJsonParse(toString3(fromString3(str, JWT_ENCODING), JSON_ENCODING));
}
function encodeJSON(val) {
  return toString3(fromString3(safeJsonStringify(val), JSON_ENCODING), JWT_ENCODING);
}
function encodeIss(publicKey) {
  const header = fromString3(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
  const multicodec = MULTICODEC_ED25519_BASE + toString3(concat2([header, publicKey]), MULTICODEC_ED25519_ENCODING);
  return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}
function encodeSig(bytes) {
  return toString3(bytes, JWT_ENCODING);
}
function decodeSig(encoded) {
  return fromString3(encoded, JWT_ENCODING);
}
function encodeData(params) {
  return fromString3([encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER), DATA_ENCODING);
}
function encodeJWT(params) {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature)
  ].join(JWT_DELIMITER);
}
function decodeJWT(jwt) {
  const params = jwt.split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  const signature = decodeSig(params[2]);
  const data = fromString3(params.slice(0, 2).join(JWT_DELIMITER), DATA_ENCODING);
  return { header, payload, signature, data };
}

// node_modules/@walletconnect/relay-auth/dist/esm/api.js
function generateKeyPair(seed = (0, import_random.randomBytes)(KEY_PAIR_SEED_LENGTH)) {
  return ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, import_time.fromMiliseconds)(Date.now())) {
  const header = { alg: JWT_IRIDIUM_ALG, typ: JWT_IRIDIUM_TYP };
  const iss = encodeIss(keyPair.publicKey);
  const exp = iat + ttl;
  const payload = { iss, sub, aud, iat, exp };
  const data = encodeData({ header, payload });
  const signature = ed25519.sign(keyPair.secretKey, data);
  return encodeJWT({ header, payload, signature });
}

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@walletconnect/utils/dist/index.es.js
var Rr = ":";
function mn(e2) {
  const [t, r3] = e2.split(Rr);
  return { namespace: t, reference: r3 };
}
function Jo(e2, t = []) {
  const r3 = [];
  return Object.keys(e2).forEach((i4) => {
    if (t.length && !t.includes(i4))
      return;
    const n5 = e2[i4];
    r3.push(...n5.accounts);
  }), r3;
}
function Or(e2, t) {
  return e2.includes(":") ? [e2] : t.chains || [];
}
var Vo = Object.defineProperty;
var Mn = Object.getOwnPropertySymbols;
var Wo = Object.prototype.hasOwnProperty;
var Xo = Object.prototype.propertyIsEnumerable;
var En = (e2, t, r3) => t in e2 ? Vo(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var Sn = (e2, t) => {
  for (var r3 in t || (t = {}))
    Wo.call(t, r3) && En(e2, r3, t[r3]);
  if (Mn)
    for (var r3 of Mn(t))
      Xo.call(t, r3) && En(e2, r3, t[r3]);
  return e2;
};
var In = "ReactNative";
var qt = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var _n = "js";
function bi() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function rr() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === In;
}
function gr() {
  return !bi() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function We() {
  return rr() ? qt.reactNative : bi() ? qt.node : gr() ? qt.browser : qt.unknown;
}
function ts() {
  var e2;
  try {
    return rr() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e2 = global.Application) == null ? void 0 : e2.applicationId : void 0;
  } catch {
    return;
  }
}
function Bn(e2, t) {
  let r3 = Br.parse(e2);
  return r3 = Sn(Sn({}, r3), t), e2 = Br.stringify(r3), e2;
}
function es() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function Cn() {
  if (We() === qt.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: r3, Version: i4 } = global.Platform;
    return [r3, i4].join("-");
  }
  const e2 = detect();
  if (e2 === null)
    return "unknown";
  const t = e2.os ? e2.os.replace(" ", "").toLowerCase() : "unknown";
  return e2.type === "browser" ? [t, e2.name, e2.version].join("-") : [t, e2.version].join("-");
}
function Rn() {
  var e2;
  const t = We();
  return t === qt.browser ? [t, ((e2 = (0, import_window_getters.getLocation)()) == null ? void 0 : e2.host) || "unknown"].join(":") : t;
}
function On(e2, t, r3) {
  const i4 = Cn(), n5 = Rn();
  return [[e2, t].join("-"), [_n, r3].join("-"), i4, n5].join("/");
}
function is({ protocol: e2, version: t, relayUrl: r3, sdkVersion: i4, auth: n5, projectId: o4, useOnCloseEvent: h5, bundleId: p3 }) {
  const A3 = r3.split("?"), v4 = On(e2, t, i4), w4 = { auth: n5, ua: v4, projectId: o4, useOnCloseEvent: h5 || void 0, origin: p3 || void 0 }, y6 = Bn(A3[1] || "", w4);
  return A3[0] + "?" + y6;
}
function _e(e2, t) {
  return e2.filter((r3) => t.includes(r3)).length === e2.length;
}
function ss(e2) {
  return Object.fromEntries(e2.entries());
}
function as(e2) {
  return new Map(Object.entries(e2));
}
function ls(e2 = import_time2.FIVE_MINUTES, t) {
  const r3 = (0, import_time2.toMiliseconds)(e2 || import_time2.FIVE_MINUTES);
  let i4, n5, o4;
  return { resolve: (h5) => {
    o4 && i4 && (clearTimeout(o4), i4(h5));
  }, reject: (h5) => {
    o4 && n5 && (clearTimeout(o4), n5(h5));
  }, done: () => new Promise((h5, p3) => {
    o4 = setTimeout(() => {
      p3(new Error(t));
    }, r3), i4 = h5, n5 = p3;
  }) };
}
function ds(e2, t, r3) {
  return new Promise(async (i4, n5) => {
    const o4 = setTimeout(() => n5(new Error(r3)), t);
    try {
      const h5 = await e2;
      i4(h5);
    } catch (h5) {
      n5(h5);
    }
    clearTimeout(o4);
  });
}
function yi(e2, t) {
  if (typeof t == "string" && t.startsWith(`${e2}:`))
    return t;
  if (e2.toLowerCase() === "topic") {
    if (typeof t != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e2.toLowerCase() === "id") {
    if (typeof t != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e2}`);
}
function ps(e2) {
  return yi("topic", e2);
}
function vs(e2) {
  return yi("id", e2);
}
function gs(e2) {
  const [t, r3] = e2.split(":"), i4 = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof r3 == "string")
    i4.topic = r3;
  else if (t === "id" && Number.isInteger(Number(r3)))
    i4.id = Number(r3);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${r3}`);
  return i4;
}
function ms(e2, t) {
  return (0, import_time2.fromMiliseconds)((t || Date.now()) + (0, import_time2.toMiliseconds)(e2));
}
function As(e2) {
  return Date.now() >= (0, import_time2.toMiliseconds)(e2);
}
function bs(e2, t) {
  return `${e2}${t ? `:${t}` : ""}`;
}
function me(e2 = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e2, ...t])];
}
async function ys({ id: e2, topic: t, wcDeepLink: r3 }) {
  var i4;
  try {
    if (!r3)
      return;
    const n5 = typeof r3 == "string" ? JSON.parse(r3) : r3;
    let o4 = n5 == null ? void 0 : n5.href;
    if (typeof o4 != "string")
      return;
    o4.endsWith("/") && (o4 = o4.slice(0, -1));
    const h5 = `${o4}/wc?requestId=${e2}&sessionTopic=${t}`, p3 = We();
    if (p3 === qt.browser) {
      if (!((i4 = (0, import_window_getters.getDocument)()) != null && i4.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      h5.startsWith("https://") || h5.startsWith("http://") ? window.open(h5, "_blank", "noreferrer noopener") : window.open(h5, "_self", "noreferrer noopener");
    } else
      p3 === qt.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(h5);
  } catch (n5) {
    console.error(n5);
  }
}
async function ws(e2, t) {
  try {
    return await e2.getItem(t) || (gr() ? localStorage.getItem(t) : void 0);
  } catch (r3) {
    console.error(r3);
  }
}
function xs(e2, t) {
  if (!e2.includes(t))
    return null;
  const r3 = e2.split(/([&,?,=])/), i4 = r3.indexOf(t);
  return r3[i4 + 2];
}
function Ms() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e2) => {
    const t = Math.random() * 16 | 0;
    return (e2 === "x" ? t : t & 3 | 8).toString(16);
  });
}
function Es() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
var Fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ss(e2) {
  var t = e2.default;
  if (typeof t == "function") {
    var r3 = function() {
      return t.apply(this, arguments);
    };
    r3.prototype = t.prototype;
  } else
    r3 = {};
  return Object.defineProperty(r3, "__esModule", { value: true }), Object.keys(e2).forEach(function(i4) {
    var n5 = Object.getOwnPropertyDescriptor(e2, i4);
    Object.defineProperty(r3, i4, n5.get ? n5 : { enumerable: true, get: function() {
      return e2[i4];
    } });
  }), r3;
}
var Un = { exports: {} };
(function(e2) {
  (function() {
    var t = "input is invalid type", r3 = "finalize already called", i4 = typeof window == "object", n5 = i4 ? window : {};
    n5.JS_SHA3_NO_WINDOW && (i4 = false);
    var o4 = !i4 && typeof self == "object", h5 = !n5.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    h5 ? n5 = Fn : o4 && (n5 = self);
    var p3 = !n5.JS_SHA3_NO_COMMON_JS && true && e2.exports, A3 = !n5.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", v4 = "0123456789abcdef".split(""), w4 = [31, 7936, 2031616, 520093696], y6 = [4, 1024, 262144, 67108864], S4 = [1, 256, 65536, 16777216], N10 = [6, 1536, 393216, 100663296], I4 = [0, 8, 16, 24], C4 = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], T3 = [224, 256, 384, 512], U3 = [128, 256], J = ["hex", "buffer", "arrayBuffer", "array", "digest"], Bt2 = { 128: 168, 256: 136 };
    (n5.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(u3) {
      return Object.prototype.toString.call(u3) === "[object Array]";
    }), A3 && (n5.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(u3) {
      return typeof u3 == "object" && u3.buffer && u3.buffer.constructor === ArrayBuffer;
    });
    for (var G = function(u3, E3, _3) {
      return function(B3) {
        return new s3(u3, E3, u3).update(B3)[_3]();
      };
    }, H2 = function(u3, E3, _3) {
      return function(B3, R2) {
        return new s3(u3, E3, R2).update(B3)[_3]();
      };
    }, L2 = function(u3, E3, _3) {
      return function(B3, R2, F2, P2) {
        return f4["cshake" + u3].update(B3, R2, F2, P2)[_3]();
      };
    }, Pt2 = function(u3, E3, _3) {
      return function(B3, R2, F2, P2) {
        return f4["kmac" + u3].update(B3, R2, F2, P2)[_3]();
      };
    }, W = function(u3, E3, _3, B3) {
      for (var R2 = 0; R2 < J.length; ++R2) {
        var F2 = J[R2];
        u3[F2] = E3(_3, B3, F2);
      }
      return u3;
    }, Rt2 = function(u3, E3) {
      var _3 = G(u3, E3, "hex");
      return _3.create = function() {
        return new s3(u3, E3, u3);
      }, _3.update = function(B3) {
        return _3.create().update(B3);
      }, W(_3, G, u3, E3);
    }, Vt2 = function(u3, E3) {
      var _3 = H2(u3, E3, "hex");
      return _3.create = function(B3) {
        return new s3(u3, E3, B3);
      }, _3.update = function(B3, R2) {
        return _3.create(R2).update(B3);
      }, W(_3, H2, u3, E3);
    }, Y = function(u3, E3) {
      var _3 = Bt2[u3], B3 = L2(u3, E3, "hex");
      return B3.create = function(R2, F2, P2) {
        return !F2 && !P2 ? f4["shake" + u3].create(R2) : new s3(u3, E3, R2).bytepad([F2, P2], _3);
      }, B3.update = function(R2, F2, P2, O4) {
        return B3.create(F2, P2, O4).update(R2);
      }, W(B3, L2, u3, E3);
    }, Wt2 = function(u3, E3) {
      var _3 = Bt2[u3], B3 = Pt2(u3, E3, "hex");
      return B3.create = function(R2, F2, P2) {
        return new g3(u3, E3, F2).bytepad(["KMAC", P2], _3).bytepad([R2], _3);
      }, B3.update = function(R2, F2, P2, O4) {
        return B3.create(R2, P2, O4).update(F2);
      }, W(B3, Pt2, u3, E3);
    }, b4 = [{ name: "keccak", padding: S4, bits: T3, createMethod: Rt2 }, { name: "sha3", padding: N10, bits: T3, createMethod: Rt2 }, { name: "shake", padding: w4, bits: U3, createMethod: Vt2 }, { name: "cshake", padding: y6, bits: U3, createMethod: Y }, { name: "kmac", padding: y6, bits: U3, createMethod: Wt2 }], f4 = {}, a4 = [], c5 = 0; c5 < b4.length; ++c5)
      for (var d3 = b4[c5], m2 = d3.bits, x5 = 0; x5 < m2.length; ++x5) {
        var M2 = d3.name + "_" + m2[x5];
        if (a4.push(M2), f4[M2] = d3.createMethod(m2[x5], d3.padding), d3.name !== "sha3") {
          var l4 = d3.name + m2[x5];
          a4.push(l4), f4[l4] = f4[M2];
        }
      }
    function s3(u3, E3, _3) {
      this.blocks = [], this.s = [], this.padding = E3, this.outputBits = _3, this.reset = true, this.finalized = false, this.block = 0, this.start = 0, this.blockCount = 1600 - (u3 << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = _3 >> 5, this.extraBytes = (_3 & 31) >> 3;
      for (var B3 = 0; B3 < 50; ++B3)
        this.s[B3] = 0;
    }
    s3.prototype.update = function(u3) {
      if (this.finalized)
        throw new Error(r3);
      var E3, _3 = typeof u3;
      if (_3 !== "string") {
        if (_3 === "object") {
          if (u3 === null)
            throw new Error(t);
          if (A3 && u3.constructor === ArrayBuffer)
            u3 = new Uint8Array(u3);
          else if (!Array.isArray(u3) && (!A3 || !ArrayBuffer.isView(u3)))
            throw new Error(t);
        } else
          throw new Error(t);
        E3 = true;
      }
      for (var B3 = this.blocks, R2 = this.byteCount, F2 = u3.length, P2 = this.blockCount, O4 = 0, Ct2 = this.s, D3, q2; O4 < F2; ) {
        if (this.reset)
          for (this.reset = false, B3[0] = this.block, D3 = 1; D3 < P2 + 1; ++D3)
            B3[D3] = 0;
        if (E3)
          for (D3 = this.start; O4 < F2 && D3 < R2; ++O4)
            B3[D3 >> 2] |= u3[O4] << I4[D3++ & 3];
        else
          for (D3 = this.start; O4 < F2 && D3 < R2; ++O4)
            q2 = u3.charCodeAt(O4), q2 < 128 ? B3[D3 >> 2] |= q2 << I4[D3++ & 3] : q2 < 2048 ? (B3[D3 >> 2] |= (192 | q2 >> 6) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 & 63) << I4[D3++ & 3]) : q2 < 55296 || q2 >= 57344 ? (B3[D3 >> 2] |= (224 | q2 >> 12) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 >> 6 & 63) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 & 63) << I4[D3++ & 3]) : (q2 = 65536 + ((q2 & 1023) << 10 | u3.charCodeAt(++O4) & 1023), B3[D3 >> 2] |= (240 | q2 >> 18) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 >> 12 & 63) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 >> 6 & 63) << I4[D3++ & 3], B3[D3 >> 2] |= (128 | q2 & 63) << I4[D3++ & 3]);
        if (this.lastByteIndex = D3, D3 >= R2) {
          for (this.start = D3 - R2, this.block = B3[P2], D3 = 0; D3 < P2; ++D3)
            Ct2[D3] ^= B3[D3];
          k3(Ct2), this.reset = true;
        } else
          this.start = D3;
      }
      return this;
    }, s3.prototype.encode = function(u3, E3) {
      var _3 = u3 & 255, B3 = 1, R2 = [_3];
      for (u3 = u3 >> 8, _3 = u3 & 255; _3 > 0; )
        R2.unshift(_3), u3 = u3 >> 8, _3 = u3 & 255, ++B3;
      return E3 ? R2.push(B3) : R2.unshift(B3), this.update(R2), R2.length;
    }, s3.prototype.encodeString = function(u3) {
      var E3, _3 = typeof u3;
      if (_3 !== "string") {
        if (_3 === "object") {
          if (u3 === null)
            throw new Error(t);
          if (A3 && u3.constructor === ArrayBuffer)
            u3 = new Uint8Array(u3);
          else if (!Array.isArray(u3) && (!A3 || !ArrayBuffer.isView(u3)))
            throw new Error(t);
        } else
          throw new Error(t);
        E3 = true;
      }
      var B3 = 0, R2 = u3.length;
      if (E3)
        B3 = R2;
      else
        for (var F2 = 0; F2 < u3.length; ++F2) {
          var P2 = u3.charCodeAt(F2);
          P2 < 128 ? B3 += 1 : P2 < 2048 ? B3 += 2 : P2 < 55296 || P2 >= 57344 ? B3 += 3 : (P2 = 65536 + ((P2 & 1023) << 10 | u3.charCodeAt(++F2) & 1023), B3 += 4);
        }
      return B3 += this.encode(B3 * 8), this.update(u3), B3;
    }, s3.prototype.bytepad = function(u3, E3) {
      for (var _3 = this.encode(E3), B3 = 0; B3 < u3.length; ++B3)
        _3 += this.encodeString(u3[B3]);
      var R2 = E3 - _3 % E3, F2 = [];
      return F2.length = R2, this.update(F2), this;
    }, s3.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = true;
        var u3 = this.blocks, E3 = this.lastByteIndex, _3 = this.blockCount, B3 = this.s;
        if (u3[E3 >> 2] |= this.padding[E3 & 3], this.lastByteIndex === this.byteCount)
          for (u3[0] = u3[_3], E3 = 1; E3 < _3 + 1; ++E3)
            u3[E3] = 0;
        for (u3[_3 - 1] |= 2147483648, E3 = 0; E3 < _3; ++E3)
          B3[E3] ^= u3[E3];
        k3(B3);
      }
    }, s3.prototype.toString = s3.prototype.hex = function() {
      this.finalize();
      for (var u3 = this.blockCount, E3 = this.s, _3 = this.outputBlocks, B3 = this.extraBytes, R2 = 0, F2 = 0, P2 = "", O4; F2 < _3; ) {
        for (R2 = 0; R2 < u3 && F2 < _3; ++R2, ++F2)
          O4 = E3[R2], P2 += v4[O4 >> 4 & 15] + v4[O4 & 15] + v4[O4 >> 12 & 15] + v4[O4 >> 8 & 15] + v4[O4 >> 20 & 15] + v4[O4 >> 16 & 15] + v4[O4 >> 28 & 15] + v4[O4 >> 24 & 15];
        F2 % u3 === 0 && (k3(E3), R2 = 0);
      }
      return B3 && (O4 = E3[R2], P2 += v4[O4 >> 4 & 15] + v4[O4 & 15], B3 > 1 && (P2 += v4[O4 >> 12 & 15] + v4[O4 >> 8 & 15]), B3 > 2 && (P2 += v4[O4 >> 20 & 15] + v4[O4 >> 16 & 15])), P2;
    }, s3.prototype.arrayBuffer = function() {
      this.finalize();
      var u3 = this.blockCount, E3 = this.s, _3 = this.outputBlocks, B3 = this.extraBytes, R2 = 0, F2 = 0, P2 = this.outputBits >> 3, O4;
      B3 ? O4 = new ArrayBuffer(_3 + 1 << 2) : O4 = new ArrayBuffer(P2);
      for (var Ct2 = new Uint32Array(O4); F2 < _3; ) {
        for (R2 = 0; R2 < u3 && F2 < _3; ++R2, ++F2)
          Ct2[F2] = E3[R2];
        F2 % u3 === 0 && k3(E3);
      }
      return B3 && (Ct2[R2] = E3[R2], O4 = O4.slice(0, P2)), O4;
    }, s3.prototype.buffer = s3.prototype.arrayBuffer, s3.prototype.digest = s3.prototype.array = function() {
      this.finalize();
      for (var u3 = this.blockCount, E3 = this.s, _3 = this.outputBlocks, B3 = this.extraBytes, R2 = 0, F2 = 0, P2 = [], O4, Ct2; F2 < _3; ) {
        for (R2 = 0; R2 < u3 && F2 < _3; ++R2, ++F2)
          O4 = F2 << 2, Ct2 = E3[R2], P2[O4] = Ct2 & 255, P2[O4 + 1] = Ct2 >> 8 & 255, P2[O4 + 2] = Ct2 >> 16 & 255, P2[O4 + 3] = Ct2 >> 24 & 255;
        F2 % u3 === 0 && k3(E3);
      }
      return B3 && (O4 = F2 << 2, Ct2 = E3[R2], P2[O4] = Ct2 & 255, B3 > 1 && (P2[O4 + 1] = Ct2 >> 8 & 255), B3 > 2 && (P2[O4 + 2] = Ct2 >> 16 & 255)), P2;
    };
    function g3(u3, E3, _3) {
      s3.call(this, u3, E3, _3);
    }
    g3.prototype = new s3(), g3.prototype.finalize = function() {
      return this.encode(this.outputBits, true), s3.prototype.finalize.call(this);
    };
    var k3 = function(u3) {
      var E3, _3, B3, R2, F2, P2, O4, Ct2, D3, q2, De, X2, Z2, Te2, $3, tt3, Fe, et3, rt3, Ue, it3, nt3, ke, ft2, ot3, qe, st3, at3, Ke, ut3, ht3, He, ct3, lt3, Le2, dt3, pt3, ze, vt2, gt3, je, mt2, At2, Qe2, bt2, yt3, Je, wt2, xt2, Ge, Mt2, Et2, Ye, St2, It2, Ve, Nt2, _t2, Me, Ee2, Se, Ie2, Ne;
      for (B3 = 0; B3 < 48; B3 += 2)
        R2 = u3[0] ^ u3[10] ^ u3[20] ^ u3[30] ^ u3[40], F2 = u3[1] ^ u3[11] ^ u3[21] ^ u3[31] ^ u3[41], P2 = u3[2] ^ u3[12] ^ u3[22] ^ u3[32] ^ u3[42], O4 = u3[3] ^ u3[13] ^ u3[23] ^ u3[33] ^ u3[43], Ct2 = u3[4] ^ u3[14] ^ u3[24] ^ u3[34] ^ u3[44], D3 = u3[5] ^ u3[15] ^ u3[25] ^ u3[35] ^ u3[45], q2 = u3[6] ^ u3[16] ^ u3[26] ^ u3[36] ^ u3[46], De = u3[7] ^ u3[17] ^ u3[27] ^ u3[37] ^ u3[47], X2 = u3[8] ^ u3[18] ^ u3[28] ^ u3[38] ^ u3[48], Z2 = u3[9] ^ u3[19] ^ u3[29] ^ u3[39] ^ u3[49], E3 = X2 ^ (P2 << 1 | O4 >>> 31), _3 = Z2 ^ (O4 << 1 | P2 >>> 31), u3[0] ^= E3, u3[1] ^= _3, u3[10] ^= E3, u3[11] ^= _3, u3[20] ^= E3, u3[21] ^= _3, u3[30] ^= E3, u3[31] ^= _3, u3[40] ^= E3, u3[41] ^= _3, E3 = R2 ^ (Ct2 << 1 | D3 >>> 31), _3 = F2 ^ (D3 << 1 | Ct2 >>> 31), u3[2] ^= E3, u3[3] ^= _3, u3[12] ^= E3, u3[13] ^= _3, u3[22] ^= E3, u3[23] ^= _3, u3[32] ^= E3, u3[33] ^= _3, u3[42] ^= E3, u3[43] ^= _3, E3 = P2 ^ (q2 << 1 | De >>> 31), _3 = O4 ^ (De << 1 | q2 >>> 31), u3[4] ^= E3, u3[5] ^= _3, u3[14] ^= E3, u3[15] ^= _3, u3[24] ^= E3, u3[25] ^= _3, u3[34] ^= E3, u3[35] ^= _3, u3[44] ^= E3, u3[45] ^= _3, E3 = Ct2 ^ (X2 << 1 | Z2 >>> 31), _3 = D3 ^ (Z2 << 1 | X2 >>> 31), u3[6] ^= E3, u3[7] ^= _3, u3[16] ^= E3, u3[17] ^= _3, u3[26] ^= E3, u3[27] ^= _3, u3[36] ^= E3, u3[37] ^= _3, u3[46] ^= E3, u3[47] ^= _3, E3 = q2 ^ (R2 << 1 | F2 >>> 31), _3 = De ^ (F2 << 1 | R2 >>> 31), u3[8] ^= E3, u3[9] ^= _3, u3[18] ^= E3, u3[19] ^= _3, u3[28] ^= E3, u3[29] ^= _3, u3[38] ^= E3, u3[39] ^= _3, u3[48] ^= E3, u3[49] ^= _3, Te2 = u3[0], $3 = u3[1], yt3 = u3[11] << 4 | u3[10] >>> 28, Je = u3[10] << 4 | u3[11] >>> 28, at3 = u3[20] << 3 | u3[21] >>> 29, Ke = u3[21] << 3 | u3[20] >>> 29, Ee2 = u3[31] << 9 | u3[30] >>> 23, Se = u3[30] << 9 | u3[31] >>> 23, mt2 = u3[40] << 18 | u3[41] >>> 14, At2 = u3[41] << 18 | u3[40] >>> 14, lt3 = u3[2] << 1 | u3[3] >>> 31, Le2 = u3[3] << 1 | u3[2] >>> 31, tt3 = u3[13] << 12 | u3[12] >>> 20, Fe = u3[12] << 12 | u3[13] >>> 20, wt2 = u3[22] << 10 | u3[23] >>> 22, xt2 = u3[23] << 10 | u3[22] >>> 22, ut3 = u3[33] << 13 | u3[32] >>> 19, ht3 = u3[32] << 13 | u3[33] >>> 19, Ie2 = u3[42] << 2 | u3[43] >>> 30, Ne = u3[43] << 2 | u3[42] >>> 30, St2 = u3[5] << 30 | u3[4] >>> 2, It2 = u3[4] << 30 | u3[5] >>> 2, dt3 = u3[14] << 6 | u3[15] >>> 26, pt3 = u3[15] << 6 | u3[14] >>> 26, et3 = u3[25] << 11 | u3[24] >>> 21, rt3 = u3[24] << 11 | u3[25] >>> 21, Ge = u3[34] << 15 | u3[35] >>> 17, Mt2 = u3[35] << 15 | u3[34] >>> 17, He = u3[45] << 29 | u3[44] >>> 3, ct3 = u3[44] << 29 | u3[45] >>> 3, ft2 = u3[6] << 28 | u3[7] >>> 4, ot3 = u3[7] << 28 | u3[6] >>> 4, Ve = u3[17] << 23 | u3[16] >>> 9, Nt2 = u3[16] << 23 | u3[17] >>> 9, ze = u3[26] << 25 | u3[27] >>> 7, vt2 = u3[27] << 25 | u3[26] >>> 7, Ue = u3[36] << 21 | u3[37] >>> 11, it3 = u3[37] << 21 | u3[36] >>> 11, Et2 = u3[47] << 24 | u3[46] >>> 8, Ye = u3[46] << 24 | u3[47] >>> 8, Qe2 = u3[8] << 27 | u3[9] >>> 5, bt2 = u3[9] << 27 | u3[8] >>> 5, qe = u3[18] << 20 | u3[19] >>> 12, st3 = u3[19] << 20 | u3[18] >>> 12, _t2 = u3[29] << 7 | u3[28] >>> 25, Me = u3[28] << 7 | u3[29] >>> 25, gt3 = u3[38] << 8 | u3[39] >>> 24, je = u3[39] << 8 | u3[38] >>> 24, nt3 = u3[48] << 14 | u3[49] >>> 18, ke = u3[49] << 14 | u3[48] >>> 18, u3[0] = Te2 ^ ~tt3 & et3, u3[1] = $3 ^ ~Fe & rt3, u3[10] = ft2 ^ ~qe & at3, u3[11] = ot3 ^ ~st3 & Ke, u3[20] = lt3 ^ ~dt3 & ze, u3[21] = Le2 ^ ~pt3 & vt2, u3[30] = Qe2 ^ ~yt3 & wt2, u3[31] = bt2 ^ ~Je & xt2, u3[40] = St2 ^ ~Ve & _t2, u3[41] = It2 ^ ~Nt2 & Me, u3[2] = tt3 ^ ~et3 & Ue, u3[3] = Fe ^ ~rt3 & it3, u3[12] = qe ^ ~at3 & ut3, u3[13] = st3 ^ ~Ke & ht3, u3[22] = dt3 ^ ~ze & gt3, u3[23] = pt3 ^ ~vt2 & je, u3[32] = yt3 ^ ~wt2 & Ge, u3[33] = Je ^ ~xt2 & Mt2, u3[42] = Ve ^ ~_t2 & Ee2, u3[43] = Nt2 ^ ~Me & Se, u3[4] = et3 ^ ~Ue & nt3, u3[5] = rt3 ^ ~it3 & ke, u3[14] = at3 ^ ~ut3 & He, u3[15] = Ke ^ ~ht3 & ct3, u3[24] = ze ^ ~gt3 & mt2, u3[25] = vt2 ^ ~je & At2, u3[34] = wt2 ^ ~Ge & Et2, u3[35] = xt2 ^ ~Mt2 & Ye, u3[44] = _t2 ^ ~Ee2 & Ie2, u3[45] = Me ^ ~Se & Ne, u3[6] = Ue ^ ~nt3 & Te2, u3[7] = it3 ^ ~ke & $3, u3[16] = ut3 ^ ~He & ft2, u3[17] = ht3 ^ ~ct3 & ot3, u3[26] = gt3 ^ ~mt2 & lt3, u3[27] = je ^ ~At2 & Le2, u3[36] = Ge ^ ~Et2 & Qe2, u3[37] = Mt2 ^ ~Ye & bt2, u3[46] = Ee2 ^ ~Ie2 & St2, u3[47] = Se ^ ~Ne & It2, u3[8] = nt3 ^ ~Te2 & tt3, u3[9] = ke ^ ~$3 & Fe, u3[18] = He ^ ~ft2 & qe, u3[19] = ct3 ^ ~ot3 & st3, u3[28] = mt2 ^ ~lt3 & dt3, u3[29] = At2 ^ ~Le2 & pt3, u3[38] = Et2 ^ ~Qe2 & yt3, u3[39] = Ye ^ ~bt2 & Je, u3[48] = Ie2 ^ ~St2 & Ve, u3[49] = Ne ^ ~It2 & Nt2, u3[0] ^= C4[B3], u3[1] ^= C4[B3 + 1];
    };
    if (p3)
      e2.exports = f4;
    else
      for (c5 = 0; c5 < a4.length; ++c5)
        n5[a4[c5]] = f4[a4[c5]];
  })();
})(Un);
var Is = Un.exports;
var Ns = "logger/5.7.0";
var kn = false;
var qn = false;
var Dr = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
var Kn = Dr.default;
var xi = null;
function _s() {
  try {
    const e2 = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        e2.push(t);
      }
    }), e2.length)
      throw new Error("missing " + e2.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (e2) {
    return e2.message;
  }
  return null;
}
var Hn = _s();
var Mi;
(function(e2) {
  e2.DEBUG = "DEBUG", e2.INFO = "INFO", e2.WARNING = "WARNING", e2.ERROR = "ERROR", e2.OFF = "OFF";
})(Mi || (Mi = {}));
var re;
(function(e2) {
  e2.UNKNOWN_ERROR = "UNKNOWN_ERROR", e2.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e2.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e2.NETWORK_ERROR = "NETWORK_ERROR", e2.SERVER_ERROR = "SERVER_ERROR", e2.TIMEOUT = "TIMEOUT", e2.BUFFER_OVERRUN = "BUFFER_OVERRUN", e2.NUMERIC_FAULT = "NUMERIC_FAULT", e2.MISSING_NEW = "MISSING_NEW", e2.INVALID_ARGUMENT = "INVALID_ARGUMENT", e2.MISSING_ARGUMENT = "MISSING_ARGUMENT", e2.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e2.CALL_EXCEPTION = "CALL_EXCEPTION", e2.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e2.NONCE_EXPIRED = "NONCE_EXPIRED", e2.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e2.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e2.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", e2.ACTION_REJECTED = "ACTION_REJECTED";
})(re || (re = {}));
var Ln = "0123456789abcdef";
var z = class _z {
  constructor(t) {
    Object.defineProperty(this, "version", { enumerable: true, value: t, writable: false });
  }
  _log(t, r3) {
    const i4 = t.toLowerCase();
    Dr[i4] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(Kn > Dr[i4]) && console.log.apply(console, r3);
  }
  debug(...t) {
    this._log(_z.levels.DEBUG, t);
  }
  info(...t) {
    this._log(_z.levels.INFO, t);
  }
  warn(...t) {
    this._log(_z.levels.WARNING, t);
  }
  makeError(t, r3, i4) {
    if (qn)
      return this.makeError("censored error", r3, {});
    r3 || (r3 = _z.errors.UNKNOWN_ERROR), i4 || (i4 = {});
    const n5 = [];
    Object.keys(i4).forEach((A3) => {
      const v4 = i4[A3];
      try {
        if (v4 instanceof Uint8Array) {
          let w4 = "";
          for (let y6 = 0; y6 < v4.length; y6++)
            w4 += Ln[v4[y6] >> 4], w4 += Ln[v4[y6] & 15];
          n5.push(A3 + "=Uint8Array(0x" + w4 + ")");
        } else
          n5.push(A3 + "=" + JSON.stringify(v4));
      } catch {
        n5.push(A3 + "=" + JSON.stringify(i4[A3].toString()));
      }
    }), n5.push(`code=${r3}`), n5.push(`version=${this.version}`);
    const o4 = t;
    let h5 = "";
    switch (r3) {
      case re.NUMERIC_FAULT: {
        h5 = "NUMERIC_FAULT";
        const A3 = t;
        switch (A3) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            h5 += "-" + A3;
            break;
          case "negative-power":
          case "negative-width":
            h5 += "-unsupported";
            break;
          case "unbound-bitwise-result":
            h5 += "-unbound-result";
            break;
        }
        break;
      }
      case re.CALL_EXCEPTION:
      case re.INSUFFICIENT_FUNDS:
      case re.MISSING_NEW:
      case re.NONCE_EXPIRED:
      case re.REPLACEMENT_UNDERPRICED:
      case re.TRANSACTION_REPLACED:
      case re.UNPREDICTABLE_GAS_LIMIT:
        h5 = r3;
        break;
    }
    h5 && (t += " [ See: https://links.ethers.org/v5-errors-" + h5 + " ]"), n5.length && (t += " (" + n5.join(", ") + ")");
    const p3 = new Error(t);
    return p3.reason = o4, p3.code = r3, Object.keys(i4).forEach(function(A3) {
      p3[A3] = i4[A3];
    }), p3;
  }
  throwError(t, r3, i4) {
    throw this.makeError(t, r3, i4);
  }
  throwArgumentError(t, r3, i4) {
    return this.throwError(t, _z.errors.INVALID_ARGUMENT, { argument: r3, value: i4 });
  }
  assert(t, r3, i4, n5) {
    t || this.throwError(r3, i4, n5);
  }
  assertArgument(t, r3, i4, n5) {
    t || this.throwArgumentError(r3, i4, n5);
  }
  checkNormalize(t) {
    Hn && this.throwError("platform missing String.prototype.normalize", _z.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: Hn });
  }
  checkSafeUint53(t, r3) {
    typeof t == "number" && (r3 == null && (r3 = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(r3, _z.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: t }), t % 1 && this.throwError(r3, _z.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: t }));
  }
  checkArgumentCount(t, r3, i4) {
    i4 ? i4 = ": " + i4 : i4 = "", t < r3 && this.throwError("missing argument" + i4, _z.errors.MISSING_ARGUMENT, { count: t, expectedCount: r3 }), t > r3 && this.throwError("too many arguments" + i4, _z.errors.UNEXPECTED_ARGUMENT, { count: t, expectedCount: r3 });
  }
  checkNew(t, r3) {
    (t === Object || t == null) && this.throwError("missing new", _z.errors.MISSING_NEW, { name: r3.name });
  }
  checkAbstract(t, r3) {
    t === r3 ? this.throwError("cannot instantiate abstract class " + JSON.stringify(r3.name) + " directly; use a sub-class", _z.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", _z.errors.MISSING_NEW, { name: r3.name });
  }
  static globalLogger() {
    return xi || (xi = new _z(Ns)), xi;
  }
  static setCensorship(t, r3) {
    if (!t && r3 && this.globalLogger().throwError("cannot permanently disable censorship", _z.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), kn) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", _z.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
    }
    qn = !!t, kn = !!r3;
  }
  static setLogLevel(t) {
    const r3 = Dr[t.toLowerCase()];
    if (r3 == null) {
      _z.globalLogger().warn("invalid log level - " + t);
      return;
    }
    Kn = r3;
  }
  static from(t) {
    return new _z(t);
  }
};
z.errors = re, z.levels = Mi;
var Bs = "bytes/5.7.0";
var Dt = new z(Bs);
function zn(e2) {
  return !!e2.toHexString;
}
function ir(e2) {
  return e2.slice || (e2.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return ir(new Uint8Array(Array.prototype.slice.apply(e2, t)));
  }), e2;
}
function Cs(e2) {
  return Jt(e2) && !(e2.length % 2) || nr(e2);
}
function jn(e2) {
  return typeof e2 == "number" && e2 == e2 && e2 % 1 === 0;
}
function nr(e2) {
  if (e2 == null)
    return false;
  if (e2.constructor === Uint8Array)
    return true;
  if (typeof e2 == "string" || !jn(e2.length) || e2.length < 0)
    return false;
  for (let t = 0; t < e2.length; t++) {
    const r3 = e2[t];
    if (!jn(r3) || r3 < 0 || r3 >= 256)
      return false;
  }
  return true;
}
function Ot(e2, t) {
  if (t || (t = {}), typeof e2 == "number") {
    Dt.checkSafeUint53(e2, "invalid arrayify value");
    const r3 = [];
    for (; e2; )
      r3.unshift(e2 & 255), e2 = parseInt(String(e2 / 256));
    return r3.length === 0 && r3.push(0), ir(new Uint8Array(r3));
  }
  if (t.allowMissingPrefix && typeof e2 == "string" && e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), zn(e2) && (e2 = e2.toHexString()), Jt(e2)) {
    let r3 = e2.substring(2);
    r3.length % 2 && (t.hexPad === "left" ? r3 = "0" + r3 : t.hexPad === "right" ? r3 += "0" : Dt.throwArgumentError("hex data is odd-length", "value", e2));
    const i4 = [];
    for (let n5 = 0; n5 < r3.length; n5 += 2)
      i4.push(parseInt(r3.substring(n5, n5 + 2), 16));
    return ir(new Uint8Array(i4));
  }
  return nr(e2) ? ir(new Uint8Array(e2)) : Dt.throwArgumentError("invalid arrayify value", "value", e2);
}
function Rs(e2) {
  const t = e2.map((n5) => Ot(n5)), r3 = t.reduce((n5, o4) => n5 + o4.length, 0), i4 = new Uint8Array(r3);
  return t.reduce((n5, o4) => (i4.set(o4, n5), n5 + o4.length), 0), ir(i4);
}
function Os(e2, t) {
  e2 = Ot(e2), e2.length > t && Dt.throwArgumentError("value out of range", "value", arguments[0]);
  const r3 = new Uint8Array(t);
  return r3.set(e2, t - e2.length), ir(r3);
}
function Jt(e2, t) {
  return !(typeof e2 != "string" || !e2.match(/^0x[0-9A-Fa-f]*$/) || t && e2.length !== 2 + 2 * t);
}
var Ei = "0123456789abcdef";
function Kt(e2, t) {
  if (t || (t = {}), typeof e2 == "number") {
    Dt.checkSafeUint53(e2, "invalid hexlify value");
    let r3 = "";
    for (; e2; )
      r3 = Ei[e2 & 15] + r3, e2 = Math.floor(e2 / 16);
    return r3.length ? (r3.length % 2 && (r3 = "0" + r3), "0x" + r3) : "0x00";
  }
  if (typeof e2 == "bigint")
    return e2 = e2.toString(16), e2.length % 2 ? "0x0" + e2 : "0x" + e2;
  if (t.allowMissingPrefix && typeof e2 == "string" && e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), zn(e2))
    return e2.toHexString();
  if (Jt(e2))
    return e2.length % 2 && (t.hexPad === "left" ? e2 = "0x0" + e2.substring(2) : t.hexPad === "right" ? e2 += "0" : Dt.throwArgumentError("hex data is odd-length", "value", e2)), e2.toLowerCase();
  if (nr(e2)) {
    let r3 = "0x";
    for (let i4 = 0; i4 < e2.length; i4++) {
      let n5 = e2[i4];
      r3 += Ei[(n5 & 240) >> 4] + Ei[n5 & 15];
    }
    return r3;
  }
  return Dt.throwArgumentError("invalid hexlify value", "value", e2);
}
function Ps(e2) {
  if (typeof e2 != "string")
    e2 = Kt(e2);
  else if (!Jt(e2) || e2.length % 2)
    return null;
  return (e2.length - 2) / 2;
}
function Qn(e2, t, r3) {
  return typeof e2 != "string" ? e2 = Kt(e2) : (!Jt(e2) || e2.length % 2) && Dt.throwArgumentError("invalid hexData", "value", e2), t = 2 + 2 * t, r3 != null ? "0x" + e2.substring(t, 2 + 2 * r3) : "0x" + e2.substring(t);
}
function oe(e2, t) {
  for (typeof e2 != "string" ? e2 = Kt(e2) : Jt(e2) || Dt.throwArgumentError("invalid hex string", "value", e2), e2.length > 2 * t + 2 && Dt.throwArgumentError("value out of range", "value", arguments[1]); e2.length < 2 * t + 2; )
    e2 = "0x0" + e2.substring(2);
  return e2;
}
function Jn(e2) {
  const t = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0, yParityAndS: "0x", compact: "0x" };
  if (Cs(e2)) {
    let r3 = Ot(e2);
    r3.length === 64 ? (t.v = 27 + (r3[32] >> 7), r3[32] &= 127, t.r = Kt(r3.slice(0, 32)), t.s = Kt(r3.slice(32, 64))) : r3.length === 65 ? (t.r = Kt(r3.slice(0, 32)), t.s = Kt(r3.slice(32, 64)), t.v = r3[64]) : Dt.throwArgumentError("invalid signature string", "signature", e2), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : Dt.throwArgumentError("signature invalid v byte", "signature", e2)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (r3[32] |= 128), t._vs = Kt(r3.slice(32, 64));
  } else {
    if (t.r = e2.r, t.s = e2.s, t.v = e2.v, t.recoveryParam = e2.recoveryParam, t._vs = e2._vs, t._vs != null) {
      const n5 = Os(Ot(t._vs), 32);
      t._vs = Kt(n5);
      const o4 = n5[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = o4 : t.recoveryParam !== o4 && Dt.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e2), n5[0] &= 127;
      const h5 = Kt(n5);
      t.s == null ? t.s = h5 : t.s !== h5 && Dt.throwArgumentError("signature v mismatch _vs", "signature", e2);
    }
    if (t.recoveryParam == null)
      t.v == null ? Dt.throwArgumentError("signature missing v and recoveryParam", "signature", e2) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const n5 = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== n5 && Dt.throwArgumentError("signature recoveryParam mismatch v", "signature", e2);
    }
    t.r == null || !Jt(t.r) ? Dt.throwArgumentError("signature missing or invalid r", "signature", e2) : t.r = oe(t.r, 32), t.s == null || !Jt(t.s) ? Dt.throwArgumentError("signature missing or invalid s", "signature", e2) : t.s = oe(t.s, 32);
    const r3 = Ot(t.s);
    r3[0] >= 128 && Dt.throwArgumentError("signature s out of range", "signature", e2), t.recoveryParam && (r3[0] |= 128);
    const i4 = Kt(r3);
    t._vs && (Jt(t._vs) || Dt.throwArgumentError("signature invalid _vs", "signature", e2), t._vs = oe(t._vs, 32)), t._vs == null ? t._vs = i4 : t._vs !== i4 && Dt.throwArgumentError("signature _vs mismatch v and s", "signature", e2);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
function Si(e2) {
  return "0x" + Is.keccak_256(Ot(e2));
}
var Gn = { exports: {} };
var Ds = {};
var Ts = Object.freeze({ __proto__: null, default: Ds });
var Fs = Ss(Ts);
(function(e2) {
  (function(t, r3) {
    function i4(b4, f4) {
      if (!b4)
        throw new Error(f4 || "Assertion failed");
    }
    function n5(b4, f4) {
      b4.super_ = f4;
      var a4 = function() {
      };
      a4.prototype = f4.prototype, b4.prototype = new a4(), b4.prototype.constructor = b4;
    }
    function o4(b4, f4, a4) {
      if (o4.isBN(b4))
        return b4;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, b4 !== null && ((f4 === "le" || f4 === "be") && (a4 = f4, f4 = 10), this._init(b4 || 0, f4 || 10, a4 || "be"));
    }
    typeof t == "object" ? t.exports = o4 : r3.BN = o4, o4.BN = o4, o4.wordSize = 26;
    var h5;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? h5 = window.Buffer : h5 = Fs.Buffer;
    } catch {
    }
    o4.isBN = function(f4) {
      return f4 instanceof o4 ? true : f4 !== null && typeof f4 == "object" && f4.constructor.wordSize === o4.wordSize && Array.isArray(f4.words);
    }, o4.max = function(f4, a4) {
      return f4.cmp(a4) > 0 ? f4 : a4;
    }, o4.min = function(f4, a4) {
      return f4.cmp(a4) < 0 ? f4 : a4;
    }, o4.prototype._init = function(f4, a4, c5) {
      if (typeof f4 == "number")
        return this._initNumber(f4, a4, c5);
      if (typeof f4 == "object")
        return this._initArray(f4, a4, c5);
      a4 === "hex" && (a4 = 16), i4(a4 === (a4 | 0) && a4 >= 2 && a4 <= 36), f4 = f4.toString().replace(/\s+/g, "");
      var d3 = 0;
      f4[0] === "-" && (d3++, this.negative = 1), d3 < f4.length && (a4 === 16 ? this._parseHex(f4, d3, c5) : (this._parseBase(f4, a4, d3), c5 === "le" && this._initArray(this.toArray(), a4, c5)));
    }, o4.prototype._initNumber = function(f4, a4, c5) {
      f4 < 0 && (this.negative = 1, f4 = -f4), f4 < 67108864 ? (this.words = [f4 & 67108863], this.length = 1) : f4 < 4503599627370496 ? (this.words = [f4 & 67108863, f4 / 67108864 & 67108863], this.length = 2) : (i4(f4 < 9007199254740992), this.words = [f4 & 67108863, f4 / 67108864 & 67108863, 1], this.length = 3), c5 === "le" && this._initArray(this.toArray(), a4, c5);
    }, o4.prototype._initArray = function(f4, a4, c5) {
      if (i4(typeof f4.length == "number"), f4.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(f4.length / 3), this.words = new Array(this.length);
      for (var d3 = 0; d3 < this.length; d3++)
        this.words[d3] = 0;
      var m2, x5, M2 = 0;
      if (c5 === "be")
        for (d3 = f4.length - 1, m2 = 0; d3 >= 0; d3 -= 3)
          x5 = f4[d3] | f4[d3 - 1] << 8 | f4[d3 - 2] << 16, this.words[m2] |= x5 << M2 & 67108863, this.words[m2 + 1] = x5 >>> 26 - M2 & 67108863, M2 += 24, M2 >= 26 && (M2 -= 26, m2++);
      else if (c5 === "le")
        for (d3 = 0, m2 = 0; d3 < f4.length; d3 += 3)
          x5 = f4[d3] | f4[d3 + 1] << 8 | f4[d3 + 2] << 16, this.words[m2] |= x5 << M2 & 67108863, this.words[m2 + 1] = x5 >>> 26 - M2 & 67108863, M2 += 24, M2 >= 26 && (M2 -= 26, m2++);
      return this._strip();
    };
    function p3(b4, f4) {
      var a4 = b4.charCodeAt(f4);
      if (a4 >= 48 && a4 <= 57)
        return a4 - 48;
      if (a4 >= 65 && a4 <= 70)
        return a4 - 55;
      if (a4 >= 97 && a4 <= 102)
        return a4 - 87;
      i4(false, "Invalid character in " + b4);
    }
    function A3(b4, f4, a4) {
      var c5 = p3(b4, a4);
      return a4 - 1 >= f4 && (c5 |= p3(b4, a4 - 1) << 4), c5;
    }
    o4.prototype._parseHex = function(f4, a4, c5) {
      this.length = Math.ceil((f4.length - a4) / 6), this.words = new Array(this.length);
      for (var d3 = 0; d3 < this.length; d3++)
        this.words[d3] = 0;
      var m2 = 0, x5 = 0, M2;
      if (c5 === "be")
        for (d3 = f4.length - 1; d3 >= a4; d3 -= 2)
          M2 = A3(f4, a4, d3) << m2, this.words[x5] |= M2 & 67108863, m2 >= 18 ? (m2 -= 18, x5 += 1, this.words[x5] |= M2 >>> 26) : m2 += 8;
      else {
        var l4 = f4.length - a4;
        for (d3 = l4 % 2 === 0 ? a4 + 1 : a4; d3 < f4.length; d3 += 2)
          M2 = A3(f4, a4, d3) << m2, this.words[x5] |= M2 & 67108863, m2 >= 18 ? (m2 -= 18, x5 += 1, this.words[x5] |= M2 >>> 26) : m2 += 8;
      }
      this._strip();
    };
    function v4(b4, f4, a4, c5) {
      for (var d3 = 0, m2 = 0, x5 = Math.min(b4.length, a4), M2 = f4; M2 < x5; M2++) {
        var l4 = b4.charCodeAt(M2) - 48;
        d3 *= c5, l4 >= 49 ? m2 = l4 - 49 + 10 : l4 >= 17 ? m2 = l4 - 17 + 10 : m2 = l4, i4(l4 >= 0 && m2 < c5, "Invalid character"), d3 += m2;
      }
      return d3;
    }
    o4.prototype._parseBase = function(f4, a4, c5) {
      this.words = [0], this.length = 1;
      for (var d3 = 0, m2 = 1; m2 <= 67108863; m2 *= a4)
        d3++;
      d3--, m2 = m2 / a4 | 0;
      for (var x5 = f4.length - c5, M2 = x5 % d3, l4 = Math.min(x5, x5 - M2) + c5, s3 = 0, g3 = c5; g3 < l4; g3 += d3)
        s3 = v4(f4, g3, g3 + d3, a4), this.imuln(m2), this.words[0] + s3 < 67108864 ? this.words[0] += s3 : this._iaddn(s3);
      if (M2 !== 0) {
        var k3 = 1;
        for (s3 = v4(f4, g3, f4.length, a4), g3 = 0; g3 < M2; g3++)
          k3 *= a4;
        this.imuln(k3), this.words[0] + s3 < 67108864 ? this.words[0] += s3 : this._iaddn(s3);
      }
      this._strip();
    }, o4.prototype.copy = function(f4) {
      f4.words = new Array(this.length);
      for (var a4 = 0; a4 < this.length; a4++)
        f4.words[a4] = this.words[a4];
      f4.length = this.length, f4.negative = this.negative, f4.red = this.red;
    };
    function w4(b4, f4) {
      b4.words = f4.words, b4.length = f4.length, b4.negative = f4.negative, b4.red = f4.red;
    }
    if (o4.prototype._move = function(f4) {
      w4(f4, this);
    }, o4.prototype.clone = function() {
      var f4 = new o4(null);
      return this.copy(f4), f4;
    }, o4.prototype._expand = function(f4) {
      for (; this.length < f4; )
        this.words[this.length++] = 0;
      return this;
    }, o4.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, o4.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        o4.prototype[Symbol.for("nodejs.util.inspect.custom")] = y6;
      } catch {
        o4.prototype.inspect = y6;
      }
    else
      o4.prototype.inspect = y6;
    function y6() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var S4 = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], N10 = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], I4 = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    o4.prototype.toString = function(f4, a4) {
      f4 = f4 || 10, a4 = a4 | 0 || 1;
      var c5;
      if (f4 === 16 || f4 === "hex") {
        c5 = "";
        for (var d3 = 0, m2 = 0, x5 = 0; x5 < this.length; x5++) {
          var M2 = this.words[x5], l4 = ((M2 << d3 | m2) & 16777215).toString(16);
          m2 = M2 >>> 24 - d3 & 16777215, d3 += 2, d3 >= 26 && (d3 -= 26, x5--), m2 !== 0 || x5 !== this.length - 1 ? c5 = S4[6 - l4.length] + l4 + c5 : c5 = l4 + c5;
        }
        for (m2 !== 0 && (c5 = m2.toString(16) + c5); c5.length % a4 !== 0; )
          c5 = "0" + c5;
        return this.negative !== 0 && (c5 = "-" + c5), c5;
      }
      if (f4 === (f4 | 0) && f4 >= 2 && f4 <= 36) {
        var s3 = N10[f4], g3 = I4[f4];
        c5 = "";
        var k3 = this.clone();
        for (k3.negative = 0; !k3.isZero(); ) {
          var u3 = k3.modrn(g3).toString(f4);
          k3 = k3.idivn(g3), k3.isZero() ? c5 = u3 + c5 : c5 = S4[s3 - u3.length] + u3 + c5;
        }
        for (this.isZero() && (c5 = "0" + c5); c5.length % a4 !== 0; )
          c5 = "0" + c5;
        return this.negative !== 0 && (c5 = "-" + c5), c5;
      }
      i4(false, "Base should be between 2 and 36");
    }, o4.prototype.toNumber = function() {
      var f4 = this.words[0];
      return this.length === 2 ? f4 += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? f4 += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i4(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -f4 : f4;
    }, o4.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, h5 && (o4.prototype.toBuffer = function(f4, a4) {
      return this.toArrayLike(h5, f4, a4);
    }), o4.prototype.toArray = function(f4, a4) {
      return this.toArrayLike(Array, f4, a4);
    };
    var C4 = function(f4, a4) {
      return f4.allocUnsafe ? f4.allocUnsafe(a4) : new f4(a4);
    };
    o4.prototype.toArrayLike = function(f4, a4, c5) {
      this._strip();
      var d3 = this.byteLength(), m2 = c5 || Math.max(1, d3);
      i4(d3 <= m2, "byte array longer than desired length"), i4(m2 > 0, "Requested array length <= 0");
      var x5 = C4(f4, m2), M2 = a4 === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M2](x5, d3), x5;
    }, o4.prototype._toArrayLikeLE = function(f4, a4) {
      for (var c5 = 0, d3 = 0, m2 = 0, x5 = 0; m2 < this.length; m2++) {
        var M2 = this.words[m2] << x5 | d3;
        f4[c5++] = M2 & 255, c5 < f4.length && (f4[c5++] = M2 >> 8 & 255), c5 < f4.length && (f4[c5++] = M2 >> 16 & 255), x5 === 6 ? (c5 < f4.length && (f4[c5++] = M2 >> 24 & 255), d3 = 0, x5 = 0) : (d3 = M2 >>> 24, x5 += 2);
      }
      if (c5 < f4.length)
        for (f4[c5++] = d3; c5 < f4.length; )
          f4[c5++] = 0;
    }, o4.prototype._toArrayLikeBE = function(f4, a4) {
      for (var c5 = f4.length - 1, d3 = 0, m2 = 0, x5 = 0; m2 < this.length; m2++) {
        var M2 = this.words[m2] << x5 | d3;
        f4[c5--] = M2 & 255, c5 >= 0 && (f4[c5--] = M2 >> 8 & 255), c5 >= 0 && (f4[c5--] = M2 >> 16 & 255), x5 === 6 ? (c5 >= 0 && (f4[c5--] = M2 >> 24 & 255), d3 = 0, x5 = 0) : (d3 = M2 >>> 24, x5 += 2);
      }
      if (c5 >= 0)
        for (f4[c5--] = d3; c5 >= 0; )
          f4[c5--] = 0;
    }, Math.clz32 ? o4.prototype._countBits = function(f4) {
      return 32 - Math.clz32(f4);
    } : o4.prototype._countBits = function(f4) {
      var a4 = f4, c5 = 0;
      return a4 >= 4096 && (c5 += 13, a4 >>>= 13), a4 >= 64 && (c5 += 7, a4 >>>= 7), a4 >= 8 && (c5 += 4, a4 >>>= 4), a4 >= 2 && (c5 += 2, a4 >>>= 2), c5 + a4;
    }, o4.prototype._zeroBits = function(f4) {
      if (f4 === 0)
        return 26;
      var a4 = f4, c5 = 0;
      return a4 & 8191 || (c5 += 13, a4 >>>= 13), a4 & 127 || (c5 += 7, a4 >>>= 7), a4 & 15 || (c5 += 4, a4 >>>= 4), a4 & 3 || (c5 += 2, a4 >>>= 2), a4 & 1 || c5++, c5;
    }, o4.prototype.bitLength = function() {
      var f4 = this.words[this.length - 1], a4 = this._countBits(f4);
      return (this.length - 1) * 26 + a4;
    };
    function T3(b4) {
      for (var f4 = new Array(b4.bitLength()), a4 = 0; a4 < f4.length; a4++) {
        var c5 = a4 / 26 | 0, d3 = a4 % 26;
        f4[a4] = b4.words[c5] >>> d3 & 1;
      }
      return f4;
    }
    o4.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var f4 = 0, a4 = 0; a4 < this.length; a4++) {
        var c5 = this._zeroBits(this.words[a4]);
        if (f4 += c5, c5 !== 26)
          break;
      }
      return f4;
    }, o4.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, o4.prototype.toTwos = function(f4) {
      return this.negative !== 0 ? this.abs().inotn(f4).iaddn(1) : this.clone();
    }, o4.prototype.fromTwos = function(f4) {
      return this.testn(f4 - 1) ? this.notn(f4).iaddn(1).ineg() : this.clone();
    }, o4.prototype.isNeg = function() {
      return this.negative !== 0;
    }, o4.prototype.neg = function() {
      return this.clone().ineg();
    }, o4.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, o4.prototype.iuor = function(f4) {
      for (; this.length < f4.length; )
        this.words[this.length++] = 0;
      for (var a4 = 0; a4 < f4.length; a4++)
        this.words[a4] = this.words[a4] | f4.words[a4];
      return this._strip();
    }, o4.prototype.ior = function(f4) {
      return i4((this.negative | f4.negative) === 0), this.iuor(f4);
    }, o4.prototype.or = function(f4) {
      return this.length > f4.length ? this.clone().ior(f4) : f4.clone().ior(this);
    }, o4.prototype.uor = function(f4) {
      return this.length > f4.length ? this.clone().iuor(f4) : f4.clone().iuor(this);
    }, o4.prototype.iuand = function(f4) {
      var a4;
      this.length > f4.length ? a4 = f4 : a4 = this;
      for (var c5 = 0; c5 < a4.length; c5++)
        this.words[c5] = this.words[c5] & f4.words[c5];
      return this.length = a4.length, this._strip();
    }, o4.prototype.iand = function(f4) {
      return i4((this.negative | f4.negative) === 0), this.iuand(f4);
    }, o4.prototype.and = function(f4) {
      return this.length > f4.length ? this.clone().iand(f4) : f4.clone().iand(this);
    }, o4.prototype.uand = function(f4) {
      return this.length > f4.length ? this.clone().iuand(f4) : f4.clone().iuand(this);
    }, o4.prototype.iuxor = function(f4) {
      var a4, c5;
      this.length > f4.length ? (a4 = this, c5 = f4) : (a4 = f4, c5 = this);
      for (var d3 = 0; d3 < c5.length; d3++)
        this.words[d3] = a4.words[d3] ^ c5.words[d3];
      if (this !== a4)
        for (; d3 < a4.length; d3++)
          this.words[d3] = a4.words[d3];
      return this.length = a4.length, this._strip();
    }, o4.prototype.ixor = function(f4) {
      return i4((this.negative | f4.negative) === 0), this.iuxor(f4);
    }, o4.prototype.xor = function(f4) {
      return this.length > f4.length ? this.clone().ixor(f4) : f4.clone().ixor(this);
    }, o4.prototype.uxor = function(f4) {
      return this.length > f4.length ? this.clone().iuxor(f4) : f4.clone().iuxor(this);
    }, o4.prototype.inotn = function(f4) {
      i4(typeof f4 == "number" && f4 >= 0);
      var a4 = Math.ceil(f4 / 26) | 0, c5 = f4 % 26;
      this._expand(a4), c5 > 0 && a4--;
      for (var d3 = 0; d3 < a4; d3++)
        this.words[d3] = ~this.words[d3] & 67108863;
      return c5 > 0 && (this.words[d3] = ~this.words[d3] & 67108863 >> 26 - c5), this._strip();
    }, o4.prototype.notn = function(f4) {
      return this.clone().inotn(f4);
    }, o4.prototype.setn = function(f4, a4) {
      i4(typeof f4 == "number" && f4 >= 0);
      var c5 = f4 / 26 | 0, d3 = f4 % 26;
      return this._expand(c5 + 1), a4 ? this.words[c5] = this.words[c5] | 1 << d3 : this.words[c5] = this.words[c5] & ~(1 << d3), this._strip();
    }, o4.prototype.iadd = function(f4) {
      var a4;
      if (this.negative !== 0 && f4.negative === 0)
        return this.negative = 0, a4 = this.isub(f4), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && f4.negative !== 0)
        return f4.negative = 0, a4 = this.isub(f4), f4.negative = 1, a4._normSign();
      var c5, d3;
      this.length > f4.length ? (c5 = this, d3 = f4) : (c5 = f4, d3 = this);
      for (var m2 = 0, x5 = 0; x5 < d3.length; x5++)
        a4 = (c5.words[x5] | 0) + (d3.words[x5] | 0) + m2, this.words[x5] = a4 & 67108863, m2 = a4 >>> 26;
      for (; m2 !== 0 && x5 < c5.length; x5++)
        a4 = (c5.words[x5] | 0) + m2, this.words[x5] = a4 & 67108863, m2 = a4 >>> 26;
      if (this.length = c5.length, m2 !== 0)
        this.words[this.length] = m2, this.length++;
      else if (c5 !== this)
        for (; x5 < c5.length; x5++)
          this.words[x5] = c5.words[x5];
      return this;
    }, o4.prototype.add = function(f4) {
      var a4;
      return f4.negative !== 0 && this.negative === 0 ? (f4.negative = 0, a4 = this.sub(f4), f4.negative ^= 1, a4) : f4.negative === 0 && this.negative !== 0 ? (this.negative = 0, a4 = f4.sub(this), this.negative = 1, a4) : this.length > f4.length ? this.clone().iadd(f4) : f4.clone().iadd(this);
    }, o4.prototype.isub = function(f4) {
      if (f4.negative !== 0) {
        f4.negative = 0;
        var a4 = this.iadd(f4);
        return f4.negative = 1, a4._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(f4), this.negative = 1, this._normSign();
      var c5 = this.cmp(f4);
      if (c5 === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var d3, m2;
      c5 > 0 ? (d3 = this, m2 = f4) : (d3 = f4, m2 = this);
      for (var x5 = 0, M2 = 0; M2 < m2.length; M2++)
        a4 = (d3.words[M2] | 0) - (m2.words[M2] | 0) + x5, x5 = a4 >> 26, this.words[M2] = a4 & 67108863;
      for (; x5 !== 0 && M2 < d3.length; M2++)
        a4 = (d3.words[M2] | 0) + x5, x5 = a4 >> 26, this.words[M2] = a4 & 67108863;
      if (x5 === 0 && M2 < d3.length && d3 !== this)
        for (; M2 < d3.length; M2++)
          this.words[M2] = d3.words[M2];
      return this.length = Math.max(this.length, M2), d3 !== this && (this.negative = 1), this._strip();
    }, o4.prototype.sub = function(f4) {
      return this.clone().isub(f4);
    };
    function U3(b4, f4, a4) {
      a4.negative = f4.negative ^ b4.negative;
      var c5 = b4.length + f4.length | 0;
      a4.length = c5, c5 = c5 - 1 | 0;
      var d3 = b4.words[0] | 0, m2 = f4.words[0] | 0, x5 = d3 * m2, M2 = x5 & 67108863, l4 = x5 / 67108864 | 0;
      a4.words[0] = M2;
      for (var s3 = 1; s3 < c5; s3++) {
        for (var g3 = l4 >>> 26, k3 = l4 & 67108863, u3 = Math.min(s3, f4.length - 1), E3 = Math.max(0, s3 - b4.length + 1); E3 <= u3; E3++) {
          var _3 = s3 - E3 | 0;
          d3 = b4.words[_3] | 0, m2 = f4.words[E3] | 0, x5 = d3 * m2 + k3, g3 += x5 / 67108864 | 0, k3 = x5 & 67108863;
        }
        a4.words[s3] = k3 | 0, l4 = g3 | 0;
      }
      return l4 !== 0 ? a4.words[s3] = l4 | 0 : a4.length--, a4._strip();
    }
    var J = function(f4, a4, c5) {
      var d3 = f4.words, m2 = a4.words, x5 = c5.words, M2 = 0, l4, s3, g3, k3 = d3[0] | 0, u3 = k3 & 8191, E3 = k3 >>> 13, _3 = d3[1] | 0, B3 = _3 & 8191, R2 = _3 >>> 13, F2 = d3[2] | 0, P2 = F2 & 8191, O4 = F2 >>> 13, Ct2 = d3[3] | 0, D3 = Ct2 & 8191, q2 = Ct2 >>> 13, De = d3[4] | 0, X2 = De & 8191, Z2 = De >>> 13, Te2 = d3[5] | 0, $3 = Te2 & 8191, tt3 = Te2 >>> 13, Fe = d3[6] | 0, et3 = Fe & 8191, rt3 = Fe >>> 13, Ue = d3[7] | 0, it3 = Ue & 8191, nt3 = Ue >>> 13, ke = d3[8] | 0, ft2 = ke & 8191, ot3 = ke >>> 13, qe = d3[9] | 0, st3 = qe & 8191, at3 = qe >>> 13, Ke = m2[0] | 0, ut3 = Ke & 8191, ht3 = Ke >>> 13, He = m2[1] | 0, ct3 = He & 8191, lt3 = He >>> 13, Le2 = m2[2] | 0, dt3 = Le2 & 8191, pt3 = Le2 >>> 13, ze = m2[3] | 0, vt2 = ze & 8191, gt3 = ze >>> 13, je = m2[4] | 0, mt2 = je & 8191, At2 = je >>> 13, Qe2 = m2[5] | 0, bt2 = Qe2 & 8191, yt3 = Qe2 >>> 13, Je = m2[6] | 0, wt2 = Je & 8191, xt2 = Je >>> 13, Ge = m2[7] | 0, Mt2 = Ge & 8191, Et2 = Ge >>> 13, Ye = m2[8] | 0, St2 = Ye & 8191, It2 = Ye >>> 13, Ve = m2[9] | 0, Nt2 = Ve & 8191, _t2 = Ve >>> 13;
      c5.negative = f4.negative ^ a4.negative, c5.length = 19, l4 = Math.imul(u3, ut3), s3 = Math.imul(u3, ht3), s3 = s3 + Math.imul(E3, ut3) | 0, g3 = Math.imul(E3, ht3);
      var Me = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, l4 = Math.imul(B3, ut3), s3 = Math.imul(B3, ht3), s3 = s3 + Math.imul(R2, ut3) | 0, g3 = Math.imul(R2, ht3), l4 = l4 + Math.imul(u3, ct3) | 0, s3 = s3 + Math.imul(u3, lt3) | 0, s3 = s3 + Math.imul(E3, ct3) | 0, g3 = g3 + Math.imul(E3, lt3) | 0;
      var Ee2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (Ee2 >>> 26) | 0, Ee2 &= 67108863, l4 = Math.imul(P2, ut3), s3 = Math.imul(P2, ht3), s3 = s3 + Math.imul(O4, ut3) | 0, g3 = Math.imul(O4, ht3), l4 = l4 + Math.imul(B3, ct3) | 0, s3 = s3 + Math.imul(B3, lt3) | 0, s3 = s3 + Math.imul(R2, ct3) | 0, g3 = g3 + Math.imul(R2, lt3) | 0, l4 = l4 + Math.imul(u3, dt3) | 0, s3 = s3 + Math.imul(u3, pt3) | 0, s3 = s3 + Math.imul(E3, dt3) | 0, g3 = g3 + Math.imul(E3, pt3) | 0;
      var Se = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, l4 = Math.imul(D3, ut3), s3 = Math.imul(D3, ht3), s3 = s3 + Math.imul(q2, ut3) | 0, g3 = Math.imul(q2, ht3), l4 = l4 + Math.imul(P2, ct3) | 0, s3 = s3 + Math.imul(P2, lt3) | 0, s3 = s3 + Math.imul(O4, ct3) | 0, g3 = g3 + Math.imul(O4, lt3) | 0, l4 = l4 + Math.imul(B3, dt3) | 0, s3 = s3 + Math.imul(B3, pt3) | 0, s3 = s3 + Math.imul(R2, dt3) | 0, g3 = g3 + Math.imul(R2, pt3) | 0, l4 = l4 + Math.imul(u3, vt2) | 0, s3 = s3 + Math.imul(u3, gt3) | 0, s3 = s3 + Math.imul(E3, vt2) | 0, g3 = g3 + Math.imul(E3, gt3) | 0;
      var Ie2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (Ie2 >>> 26) | 0, Ie2 &= 67108863, l4 = Math.imul(X2, ut3), s3 = Math.imul(X2, ht3), s3 = s3 + Math.imul(Z2, ut3) | 0, g3 = Math.imul(Z2, ht3), l4 = l4 + Math.imul(D3, ct3) | 0, s3 = s3 + Math.imul(D3, lt3) | 0, s3 = s3 + Math.imul(q2, ct3) | 0, g3 = g3 + Math.imul(q2, lt3) | 0, l4 = l4 + Math.imul(P2, dt3) | 0, s3 = s3 + Math.imul(P2, pt3) | 0, s3 = s3 + Math.imul(O4, dt3) | 0, g3 = g3 + Math.imul(O4, pt3) | 0, l4 = l4 + Math.imul(B3, vt2) | 0, s3 = s3 + Math.imul(B3, gt3) | 0, s3 = s3 + Math.imul(R2, vt2) | 0, g3 = g3 + Math.imul(R2, gt3) | 0, l4 = l4 + Math.imul(u3, mt2) | 0, s3 = s3 + Math.imul(u3, At2) | 0, s3 = s3 + Math.imul(E3, mt2) | 0, g3 = g3 + Math.imul(E3, At2) | 0;
      var Ne = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, l4 = Math.imul($3, ut3), s3 = Math.imul($3, ht3), s3 = s3 + Math.imul(tt3, ut3) | 0, g3 = Math.imul(tt3, ht3), l4 = l4 + Math.imul(X2, ct3) | 0, s3 = s3 + Math.imul(X2, lt3) | 0, s3 = s3 + Math.imul(Z2, ct3) | 0, g3 = g3 + Math.imul(Z2, lt3) | 0, l4 = l4 + Math.imul(D3, dt3) | 0, s3 = s3 + Math.imul(D3, pt3) | 0, s3 = s3 + Math.imul(q2, dt3) | 0, g3 = g3 + Math.imul(q2, pt3) | 0, l4 = l4 + Math.imul(P2, vt2) | 0, s3 = s3 + Math.imul(P2, gt3) | 0, s3 = s3 + Math.imul(O4, vt2) | 0, g3 = g3 + Math.imul(O4, gt3) | 0, l4 = l4 + Math.imul(B3, mt2) | 0, s3 = s3 + Math.imul(B3, At2) | 0, s3 = s3 + Math.imul(R2, mt2) | 0, g3 = g3 + Math.imul(R2, At2) | 0, l4 = l4 + Math.imul(u3, bt2) | 0, s3 = s3 + Math.imul(u3, yt3) | 0, s3 = s3 + Math.imul(E3, bt2) | 0, g3 = g3 + Math.imul(E3, yt3) | 0;
      var $r2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + ($r2 >>> 26) | 0, $r2 &= 67108863, l4 = Math.imul(et3, ut3), s3 = Math.imul(et3, ht3), s3 = s3 + Math.imul(rt3, ut3) | 0, g3 = Math.imul(rt3, ht3), l4 = l4 + Math.imul($3, ct3) | 0, s3 = s3 + Math.imul($3, lt3) | 0, s3 = s3 + Math.imul(tt3, ct3) | 0, g3 = g3 + Math.imul(tt3, lt3) | 0, l4 = l4 + Math.imul(X2, dt3) | 0, s3 = s3 + Math.imul(X2, pt3) | 0, s3 = s3 + Math.imul(Z2, dt3) | 0, g3 = g3 + Math.imul(Z2, pt3) | 0, l4 = l4 + Math.imul(D3, vt2) | 0, s3 = s3 + Math.imul(D3, gt3) | 0, s3 = s3 + Math.imul(q2, vt2) | 0, g3 = g3 + Math.imul(q2, gt3) | 0, l4 = l4 + Math.imul(P2, mt2) | 0, s3 = s3 + Math.imul(P2, At2) | 0, s3 = s3 + Math.imul(O4, mt2) | 0, g3 = g3 + Math.imul(O4, At2) | 0, l4 = l4 + Math.imul(B3, bt2) | 0, s3 = s3 + Math.imul(B3, yt3) | 0, s3 = s3 + Math.imul(R2, bt2) | 0, g3 = g3 + Math.imul(R2, yt3) | 0, l4 = l4 + Math.imul(u3, wt2) | 0, s3 = s3 + Math.imul(u3, xt2) | 0, s3 = s3 + Math.imul(E3, wt2) | 0, g3 = g3 + Math.imul(E3, xt2) | 0;
      var ti2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ti2 >>> 26) | 0, ti2 &= 67108863, l4 = Math.imul(it3, ut3), s3 = Math.imul(it3, ht3), s3 = s3 + Math.imul(nt3, ut3) | 0, g3 = Math.imul(nt3, ht3), l4 = l4 + Math.imul(et3, ct3) | 0, s3 = s3 + Math.imul(et3, lt3) | 0, s3 = s3 + Math.imul(rt3, ct3) | 0, g3 = g3 + Math.imul(rt3, lt3) | 0, l4 = l4 + Math.imul($3, dt3) | 0, s3 = s3 + Math.imul($3, pt3) | 0, s3 = s3 + Math.imul(tt3, dt3) | 0, g3 = g3 + Math.imul(tt3, pt3) | 0, l4 = l4 + Math.imul(X2, vt2) | 0, s3 = s3 + Math.imul(X2, gt3) | 0, s3 = s3 + Math.imul(Z2, vt2) | 0, g3 = g3 + Math.imul(Z2, gt3) | 0, l4 = l4 + Math.imul(D3, mt2) | 0, s3 = s3 + Math.imul(D3, At2) | 0, s3 = s3 + Math.imul(q2, mt2) | 0, g3 = g3 + Math.imul(q2, At2) | 0, l4 = l4 + Math.imul(P2, bt2) | 0, s3 = s3 + Math.imul(P2, yt3) | 0, s3 = s3 + Math.imul(O4, bt2) | 0, g3 = g3 + Math.imul(O4, yt3) | 0, l4 = l4 + Math.imul(B3, wt2) | 0, s3 = s3 + Math.imul(B3, xt2) | 0, s3 = s3 + Math.imul(R2, wt2) | 0, g3 = g3 + Math.imul(R2, xt2) | 0, l4 = l4 + Math.imul(u3, Mt2) | 0, s3 = s3 + Math.imul(u3, Et2) | 0, s3 = s3 + Math.imul(E3, Mt2) | 0, g3 = g3 + Math.imul(E3, Et2) | 0;
      var ei2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ei2 >>> 26) | 0, ei2 &= 67108863, l4 = Math.imul(ft2, ut3), s3 = Math.imul(ft2, ht3), s3 = s3 + Math.imul(ot3, ut3) | 0, g3 = Math.imul(ot3, ht3), l4 = l4 + Math.imul(it3, ct3) | 0, s3 = s3 + Math.imul(it3, lt3) | 0, s3 = s3 + Math.imul(nt3, ct3) | 0, g3 = g3 + Math.imul(nt3, lt3) | 0, l4 = l4 + Math.imul(et3, dt3) | 0, s3 = s3 + Math.imul(et3, pt3) | 0, s3 = s3 + Math.imul(rt3, dt3) | 0, g3 = g3 + Math.imul(rt3, pt3) | 0, l4 = l4 + Math.imul($3, vt2) | 0, s3 = s3 + Math.imul($3, gt3) | 0, s3 = s3 + Math.imul(tt3, vt2) | 0, g3 = g3 + Math.imul(tt3, gt3) | 0, l4 = l4 + Math.imul(X2, mt2) | 0, s3 = s3 + Math.imul(X2, At2) | 0, s3 = s3 + Math.imul(Z2, mt2) | 0, g3 = g3 + Math.imul(Z2, At2) | 0, l4 = l4 + Math.imul(D3, bt2) | 0, s3 = s3 + Math.imul(D3, yt3) | 0, s3 = s3 + Math.imul(q2, bt2) | 0, g3 = g3 + Math.imul(q2, yt3) | 0, l4 = l4 + Math.imul(P2, wt2) | 0, s3 = s3 + Math.imul(P2, xt2) | 0, s3 = s3 + Math.imul(O4, wt2) | 0, g3 = g3 + Math.imul(O4, xt2) | 0, l4 = l4 + Math.imul(B3, Mt2) | 0, s3 = s3 + Math.imul(B3, Et2) | 0, s3 = s3 + Math.imul(R2, Mt2) | 0, g3 = g3 + Math.imul(R2, Et2) | 0, l4 = l4 + Math.imul(u3, St2) | 0, s3 = s3 + Math.imul(u3, It2) | 0, s3 = s3 + Math.imul(E3, St2) | 0, g3 = g3 + Math.imul(E3, It2) | 0;
      var ri2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ri2 >>> 26) | 0, ri2 &= 67108863, l4 = Math.imul(st3, ut3), s3 = Math.imul(st3, ht3), s3 = s3 + Math.imul(at3, ut3) | 0, g3 = Math.imul(at3, ht3), l4 = l4 + Math.imul(ft2, ct3) | 0, s3 = s3 + Math.imul(ft2, lt3) | 0, s3 = s3 + Math.imul(ot3, ct3) | 0, g3 = g3 + Math.imul(ot3, lt3) | 0, l4 = l4 + Math.imul(it3, dt3) | 0, s3 = s3 + Math.imul(it3, pt3) | 0, s3 = s3 + Math.imul(nt3, dt3) | 0, g3 = g3 + Math.imul(nt3, pt3) | 0, l4 = l4 + Math.imul(et3, vt2) | 0, s3 = s3 + Math.imul(et3, gt3) | 0, s3 = s3 + Math.imul(rt3, vt2) | 0, g3 = g3 + Math.imul(rt3, gt3) | 0, l4 = l4 + Math.imul($3, mt2) | 0, s3 = s3 + Math.imul($3, At2) | 0, s3 = s3 + Math.imul(tt3, mt2) | 0, g3 = g3 + Math.imul(tt3, At2) | 0, l4 = l4 + Math.imul(X2, bt2) | 0, s3 = s3 + Math.imul(X2, yt3) | 0, s3 = s3 + Math.imul(Z2, bt2) | 0, g3 = g3 + Math.imul(Z2, yt3) | 0, l4 = l4 + Math.imul(D3, wt2) | 0, s3 = s3 + Math.imul(D3, xt2) | 0, s3 = s3 + Math.imul(q2, wt2) | 0, g3 = g3 + Math.imul(q2, xt2) | 0, l4 = l4 + Math.imul(P2, Mt2) | 0, s3 = s3 + Math.imul(P2, Et2) | 0, s3 = s3 + Math.imul(O4, Mt2) | 0, g3 = g3 + Math.imul(O4, Et2) | 0, l4 = l4 + Math.imul(B3, St2) | 0, s3 = s3 + Math.imul(B3, It2) | 0, s3 = s3 + Math.imul(R2, St2) | 0, g3 = g3 + Math.imul(R2, It2) | 0, l4 = l4 + Math.imul(u3, Nt2) | 0, s3 = s3 + Math.imul(u3, _t2) | 0, s3 = s3 + Math.imul(E3, Nt2) | 0, g3 = g3 + Math.imul(E3, _t2) | 0;
      var ii2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ii2 >>> 26) | 0, ii2 &= 67108863, l4 = Math.imul(st3, ct3), s3 = Math.imul(st3, lt3), s3 = s3 + Math.imul(at3, ct3) | 0, g3 = Math.imul(at3, lt3), l4 = l4 + Math.imul(ft2, dt3) | 0, s3 = s3 + Math.imul(ft2, pt3) | 0, s3 = s3 + Math.imul(ot3, dt3) | 0, g3 = g3 + Math.imul(ot3, pt3) | 0, l4 = l4 + Math.imul(it3, vt2) | 0, s3 = s3 + Math.imul(it3, gt3) | 0, s3 = s3 + Math.imul(nt3, vt2) | 0, g3 = g3 + Math.imul(nt3, gt3) | 0, l4 = l4 + Math.imul(et3, mt2) | 0, s3 = s3 + Math.imul(et3, At2) | 0, s3 = s3 + Math.imul(rt3, mt2) | 0, g3 = g3 + Math.imul(rt3, At2) | 0, l4 = l4 + Math.imul($3, bt2) | 0, s3 = s3 + Math.imul($3, yt3) | 0, s3 = s3 + Math.imul(tt3, bt2) | 0, g3 = g3 + Math.imul(tt3, yt3) | 0, l4 = l4 + Math.imul(X2, wt2) | 0, s3 = s3 + Math.imul(X2, xt2) | 0, s3 = s3 + Math.imul(Z2, wt2) | 0, g3 = g3 + Math.imul(Z2, xt2) | 0, l4 = l4 + Math.imul(D3, Mt2) | 0, s3 = s3 + Math.imul(D3, Et2) | 0, s3 = s3 + Math.imul(q2, Mt2) | 0, g3 = g3 + Math.imul(q2, Et2) | 0, l4 = l4 + Math.imul(P2, St2) | 0, s3 = s3 + Math.imul(P2, It2) | 0, s3 = s3 + Math.imul(O4, St2) | 0, g3 = g3 + Math.imul(O4, It2) | 0, l4 = l4 + Math.imul(B3, Nt2) | 0, s3 = s3 + Math.imul(B3, _t2) | 0, s3 = s3 + Math.imul(R2, Nt2) | 0, g3 = g3 + Math.imul(R2, _t2) | 0;
      var ni2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ni2 >>> 26) | 0, ni2 &= 67108863, l4 = Math.imul(st3, dt3), s3 = Math.imul(st3, pt3), s3 = s3 + Math.imul(at3, dt3) | 0, g3 = Math.imul(at3, pt3), l4 = l4 + Math.imul(ft2, vt2) | 0, s3 = s3 + Math.imul(ft2, gt3) | 0, s3 = s3 + Math.imul(ot3, vt2) | 0, g3 = g3 + Math.imul(ot3, gt3) | 0, l4 = l4 + Math.imul(it3, mt2) | 0, s3 = s3 + Math.imul(it3, At2) | 0, s3 = s3 + Math.imul(nt3, mt2) | 0, g3 = g3 + Math.imul(nt3, At2) | 0, l4 = l4 + Math.imul(et3, bt2) | 0, s3 = s3 + Math.imul(et3, yt3) | 0, s3 = s3 + Math.imul(rt3, bt2) | 0, g3 = g3 + Math.imul(rt3, yt3) | 0, l4 = l4 + Math.imul($3, wt2) | 0, s3 = s3 + Math.imul($3, xt2) | 0, s3 = s3 + Math.imul(tt3, wt2) | 0, g3 = g3 + Math.imul(tt3, xt2) | 0, l4 = l4 + Math.imul(X2, Mt2) | 0, s3 = s3 + Math.imul(X2, Et2) | 0, s3 = s3 + Math.imul(Z2, Mt2) | 0, g3 = g3 + Math.imul(Z2, Et2) | 0, l4 = l4 + Math.imul(D3, St2) | 0, s3 = s3 + Math.imul(D3, It2) | 0, s3 = s3 + Math.imul(q2, St2) | 0, g3 = g3 + Math.imul(q2, It2) | 0, l4 = l4 + Math.imul(P2, Nt2) | 0, s3 = s3 + Math.imul(P2, _t2) | 0, s3 = s3 + Math.imul(O4, Nt2) | 0, g3 = g3 + Math.imul(O4, _t2) | 0;
      var fi2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (fi2 >>> 26) | 0, fi2 &= 67108863, l4 = Math.imul(st3, vt2), s3 = Math.imul(st3, gt3), s3 = s3 + Math.imul(at3, vt2) | 0, g3 = Math.imul(at3, gt3), l4 = l4 + Math.imul(ft2, mt2) | 0, s3 = s3 + Math.imul(ft2, At2) | 0, s3 = s3 + Math.imul(ot3, mt2) | 0, g3 = g3 + Math.imul(ot3, At2) | 0, l4 = l4 + Math.imul(it3, bt2) | 0, s3 = s3 + Math.imul(it3, yt3) | 0, s3 = s3 + Math.imul(nt3, bt2) | 0, g3 = g3 + Math.imul(nt3, yt3) | 0, l4 = l4 + Math.imul(et3, wt2) | 0, s3 = s3 + Math.imul(et3, xt2) | 0, s3 = s3 + Math.imul(rt3, wt2) | 0, g3 = g3 + Math.imul(rt3, xt2) | 0, l4 = l4 + Math.imul($3, Mt2) | 0, s3 = s3 + Math.imul($3, Et2) | 0, s3 = s3 + Math.imul(tt3, Mt2) | 0, g3 = g3 + Math.imul(tt3, Et2) | 0, l4 = l4 + Math.imul(X2, St2) | 0, s3 = s3 + Math.imul(X2, It2) | 0, s3 = s3 + Math.imul(Z2, St2) | 0, g3 = g3 + Math.imul(Z2, It2) | 0, l4 = l4 + Math.imul(D3, Nt2) | 0, s3 = s3 + Math.imul(D3, _t2) | 0, s3 = s3 + Math.imul(q2, Nt2) | 0, g3 = g3 + Math.imul(q2, _t2) | 0;
      var oi2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (oi2 >>> 26) | 0, oi2 &= 67108863, l4 = Math.imul(st3, mt2), s3 = Math.imul(st3, At2), s3 = s3 + Math.imul(at3, mt2) | 0, g3 = Math.imul(at3, At2), l4 = l4 + Math.imul(ft2, bt2) | 0, s3 = s3 + Math.imul(ft2, yt3) | 0, s3 = s3 + Math.imul(ot3, bt2) | 0, g3 = g3 + Math.imul(ot3, yt3) | 0, l4 = l4 + Math.imul(it3, wt2) | 0, s3 = s3 + Math.imul(it3, xt2) | 0, s3 = s3 + Math.imul(nt3, wt2) | 0, g3 = g3 + Math.imul(nt3, xt2) | 0, l4 = l4 + Math.imul(et3, Mt2) | 0, s3 = s3 + Math.imul(et3, Et2) | 0, s3 = s3 + Math.imul(rt3, Mt2) | 0, g3 = g3 + Math.imul(rt3, Et2) | 0, l4 = l4 + Math.imul($3, St2) | 0, s3 = s3 + Math.imul($3, It2) | 0, s3 = s3 + Math.imul(tt3, St2) | 0, g3 = g3 + Math.imul(tt3, It2) | 0, l4 = l4 + Math.imul(X2, Nt2) | 0, s3 = s3 + Math.imul(X2, _t2) | 0, s3 = s3 + Math.imul(Z2, Nt2) | 0, g3 = g3 + Math.imul(Z2, _t2) | 0;
      var si2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (si2 >>> 26) | 0, si2 &= 67108863, l4 = Math.imul(st3, bt2), s3 = Math.imul(st3, yt3), s3 = s3 + Math.imul(at3, bt2) | 0, g3 = Math.imul(at3, yt3), l4 = l4 + Math.imul(ft2, wt2) | 0, s3 = s3 + Math.imul(ft2, xt2) | 0, s3 = s3 + Math.imul(ot3, wt2) | 0, g3 = g3 + Math.imul(ot3, xt2) | 0, l4 = l4 + Math.imul(it3, Mt2) | 0, s3 = s3 + Math.imul(it3, Et2) | 0, s3 = s3 + Math.imul(nt3, Mt2) | 0, g3 = g3 + Math.imul(nt3, Et2) | 0, l4 = l4 + Math.imul(et3, St2) | 0, s3 = s3 + Math.imul(et3, It2) | 0, s3 = s3 + Math.imul(rt3, St2) | 0, g3 = g3 + Math.imul(rt3, It2) | 0, l4 = l4 + Math.imul($3, Nt2) | 0, s3 = s3 + Math.imul($3, _t2) | 0, s3 = s3 + Math.imul(tt3, Nt2) | 0, g3 = g3 + Math.imul(tt3, _t2) | 0;
      var ai2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ai2 >>> 26) | 0, ai2 &= 67108863, l4 = Math.imul(st3, wt2), s3 = Math.imul(st3, xt2), s3 = s3 + Math.imul(at3, wt2) | 0, g3 = Math.imul(at3, xt2), l4 = l4 + Math.imul(ft2, Mt2) | 0, s3 = s3 + Math.imul(ft2, Et2) | 0, s3 = s3 + Math.imul(ot3, Mt2) | 0, g3 = g3 + Math.imul(ot3, Et2) | 0, l4 = l4 + Math.imul(it3, St2) | 0, s3 = s3 + Math.imul(it3, It2) | 0, s3 = s3 + Math.imul(nt3, St2) | 0, g3 = g3 + Math.imul(nt3, It2) | 0, l4 = l4 + Math.imul(et3, Nt2) | 0, s3 = s3 + Math.imul(et3, _t2) | 0, s3 = s3 + Math.imul(rt3, Nt2) | 0, g3 = g3 + Math.imul(rt3, _t2) | 0;
      var ui2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ui2 >>> 26) | 0, ui2 &= 67108863, l4 = Math.imul(st3, Mt2), s3 = Math.imul(st3, Et2), s3 = s3 + Math.imul(at3, Mt2) | 0, g3 = Math.imul(at3, Et2), l4 = l4 + Math.imul(ft2, St2) | 0, s3 = s3 + Math.imul(ft2, It2) | 0, s3 = s3 + Math.imul(ot3, St2) | 0, g3 = g3 + Math.imul(ot3, It2) | 0, l4 = l4 + Math.imul(it3, Nt2) | 0, s3 = s3 + Math.imul(it3, _t2) | 0, s3 = s3 + Math.imul(nt3, Nt2) | 0, g3 = g3 + Math.imul(nt3, _t2) | 0;
      var hi2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (hi2 >>> 26) | 0, hi2 &= 67108863, l4 = Math.imul(st3, St2), s3 = Math.imul(st3, It2), s3 = s3 + Math.imul(at3, St2) | 0, g3 = Math.imul(at3, It2), l4 = l4 + Math.imul(ft2, Nt2) | 0, s3 = s3 + Math.imul(ft2, _t2) | 0, s3 = s3 + Math.imul(ot3, Nt2) | 0, g3 = g3 + Math.imul(ot3, _t2) | 0;
      var ci2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      M2 = (g3 + (s3 >>> 13) | 0) + (ci2 >>> 26) | 0, ci2 &= 67108863, l4 = Math.imul(st3, Nt2), s3 = Math.imul(st3, _t2), s3 = s3 + Math.imul(at3, Nt2) | 0, g3 = Math.imul(at3, _t2);
      var li2 = (M2 + l4 | 0) + ((s3 & 8191) << 13) | 0;
      return M2 = (g3 + (s3 >>> 13) | 0) + (li2 >>> 26) | 0, li2 &= 67108863, x5[0] = Me, x5[1] = Ee2, x5[2] = Se, x5[3] = Ie2, x5[4] = Ne, x5[5] = $r2, x5[6] = ti2, x5[7] = ei2, x5[8] = ri2, x5[9] = ii2, x5[10] = ni2, x5[11] = fi2, x5[12] = oi2, x5[13] = si2, x5[14] = ai2, x5[15] = ui2, x5[16] = hi2, x5[17] = ci2, x5[18] = li2, M2 !== 0 && (x5[19] = M2, c5.length++), c5;
    };
    Math.imul || (J = U3);
    function Bt2(b4, f4, a4) {
      a4.negative = f4.negative ^ b4.negative, a4.length = b4.length + f4.length;
      for (var c5 = 0, d3 = 0, m2 = 0; m2 < a4.length - 1; m2++) {
        var x5 = d3;
        d3 = 0;
        for (var M2 = c5 & 67108863, l4 = Math.min(m2, f4.length - 1), s3 = Math.max(0, m2 - b4.length + 1); s3 <= l4; s3++) {
          var g3 = m2 - s3, k3 = b4.words[g3] | 0, u3 = f4.words[s3] | 0, E3 = k3 * u3, _3 = E3 & 67108863;
          x5 = x5 + (E3 / 67108864 | 0) | 0, _3 = _3 + M2 | 0, M2 = _3 & 67108863, x5 = x5 + (_3 >>> 26) | 0, d3 += x5 >>> 26, x5 &= 67108863;
        }
        a4.words[m2] = M2, c5 = x5, x5 = d3;
      }
      return c5 !== 0 ? a4.words[m2] = c5 : a4.length--, a4._strip();
    }
    function G(b4, f4, a4) {
      return Bt2(b4, f4, a4);
    }
    o4.prototype.mulTo = function(f4, a4) {
      var c5, d3 = this.length + f4.length;
      return this.length === 10 && f4.length === 10 ? c5 = J(this, f4, a4) : d3 < 63 ? c5 = U3(this, f4, a4) : d3 < 1024 ? c5 = Bt2(this, f4, a4) : c5 = G(this, f4, a4), c5;
    }, o4.prototype.mul = function(f4) {
      var a4 = new o4(null);
      return a4.words = new Array(this.length + f4.length), this.mulTo(f4, a4);
    }, o4.prototype.mulf = function(f4) {
      var a4 = new o4(null);
      return a4.words = new Array(this.length + f4.length), G(this, f4, a4);
    }, o4.prototype.imul = function(f4) {
      return this.clone().mulTo(f4, this);
    }, o4.prototype.imuln = function(f4) {
      var a4 = f4 < 0;
      a4 && (f4 = -f4), i4(typeof f4 == "number"), i4(f4 < 67108864);
      for (var c5 = 0, d3 = 0; d3 < this.length; d3++) {
        var m2 = (this.words[d3] | 0) * f4, x5 = (m2 & 67108863) + (c5 & 67108863);
        c5 >>= 26, c5 += m2 / 67108864 | 0, c5 += x5 >>> 26, this.words[d3] = x5 & 67108863;
      }
      return c5 !== 0 && (this.words[d3] = c5, this.length++), a4 ? this.ineg() : this;
    }, o4.prototype.muln = function(f4) {
      return this.clone().imuln(f4);
    }, o4.prototype.sqr = function() {
      return this.mul(this);
    }, o4.prototype.isqr = function() {
      return this.imul(this.clone());
    }, o4.prototype.pow = function(f4) {
      var a4 = T3(f4);
      if (a4.length === 0)
        return new o4(1);
      for (var c5 = this, d3 = 0; d3 < a4.length && a4[d3] === 0; d3++, c5 = c5.sqr())
        ;
      if (++d3 < a4.length)
        for (var m2 = c5.sqr(); d3 < a4.length; d3++, m2 = m2.sqr())
          a4[d3] !== 0 && (c5 = c5.mul(m2));
      return c5;
    }, o4.prototype.iushln = function(f4) {
      i4(typeof f4 == "number" && f4 >= 0);
      var a4 = f4 % 26, c5 = (f4 - a4) / 26, d3 = 67108863 >>> 26 - a4 << 26 - a4, m2;
      if (a4 !== 0) {
        var x5 = 0;
        for (m2 = 0; m2 < this.length; m2++) {
          var M2 = this.words[m2] & d3, l4 = (this.words[m2] | 0) - M2 << a4;
          this.words[m2] = l4 | x5, x5 = M2 >>> 26 - a4;
        }
        x5 && (this.words[m2] = x5, this.length++);
      }
      if (c5 !== 0) {
        for (m2 = this.length - 1; m2 >= 0; m2--)
          this.words[m2 + c5] = this.words[m2];
        for (m2 = 0; m2 < c5; m2++)
          this.words[m2] = 0;
        this.length += c5;
      }
      return this._strip();
    }, o4.prototype.ishln = function(f4) {
      return i4(this.negative === 0), this.iushln(f4);
    }, o4.prototype.iushrn = function(f4, a4, c5) {
      i4(typeof f4 == "number" && f4 >= 0);
      var d3;
      a4 ? d3 = (a4 - a4 % 26) / 26 : d3 = 0;
      var m2 = f4 % 26, x5 = Math.min((f4 - m2) / 26, this.length), M2 = 67108863 ^ 67108863 >>> m2 << m2, l4 = c5;
      if (d3 -= x5, d3 = Math.max(0, d3), l4) {
        for (var s3 = 0; s3 < x5; s3++)
          l4.words[s3] = this.words[s3];
        l4.length = x5;
      }
      if (x5 !== 0)
        if (this.length > x5)
          for (this.length -= x5, s3 = 0; s3 < this.length; s3++)
            this.words[s3] = this.words[s3 + x5];
        else
          this.words[0] = 0, this.length = 1;
      var g3 = 0;
      for (s3 = this.length - 1; s3 >= 0 && (g3 !== 0 || s3 >= d3); s3--) {
        var k3 = this.words[s3] | 0;
        this.words[s3] = g3 << 26 - m2 | k3 >>> m2, g3 = k3 & M2;
      }
      return l4 && g3 !== 0 && (l4.words[l4.length++] = g3), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, o4.prototype.ishrn = function(f4, a4, c5) {
      return i4(this.negative === 0), this.iushrn(f4, a4, c5);
    }, o4.prototype.shln = function(f4) {
      return this.clone().ishln(f4);
    }, o4.prototype.ushln = function(f4) {
      return this.clone().iushln(f4);
    }, o4.prototype.shrn = function(f4) {
      return this.clone().ishrn(f4);
    }, o4.prototype.ushrn = function(f4) {
      return this.clone().iushrn(f4);
    }, o4.prototype.testn = function(f4) {
      i4(typeof f4 == "number" && f4 >= 0);
      var a4 = f4 % 26, c5 = (f4 - a4) / 26, d3 = 1 << a4;
      if (this.length <= c5)
        return false;
      var m2 = this.words[c5];
      return !!(m2 & d3);
    }, o4.prototype.imaskn = function(f4) {
      i4(typeof f4 == "number" && f4 >= 0);
      var a4 = f4 % 26, c5 = (f4 - a4) / 26;
      if (i4(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c5)
        return this;
      if (a4 !== 0 && c5++, this.length = Math.min(c5, this.length), a4 !== 0) {
        var d3 = 67108863 ^ 67108863 >>> a4 << a4;
        this.words[this.length - 1] &= d3;
      }
      return this._strip();
    }, o4.prototype.maskn = function(f4) {
      return this.clone().imaskn(f4);
    }, o4.prototype.iaddn = function(f4) {
      return i4(typeof f4 == "number"), i4(f4 < 67108864), f4 < 0 ? this.isubn(-f4) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= f4 ? (this.words[0] = f4 - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(f4), this.negative = 1, this) : this._iaddn(f4);
    }, o4.prototype._iaddn = function(f4) {
      this.words[0] += f4;
      for (var a4 = 0; a4 < this.length && this.words[a4] >= 67108864; a4++)
        this.words[a4] -= 67108864, a4 === this.length - 1 ? this.words[a4 + 1] = 1 : this.words[a4 + 1]++;
      return this.length = Math.max(this.length, a4 + 1), this;
    }, o4.prototype.isubn = function(f4) {
      if (i4(typeof f4 == "number"), i4(f4 < 67108864), f4 < 0)
        return this.iaddn(-f4);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(f4), this.negative = 1, this;
      if (this.words[0] -= f4, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a4 = 0; a4 < this.length && this.words[a4] < 0; a4++)
          this.words[a4] += 67108864, this.words[a4 + 1] -= 1;
      return this._strip();
    }, o4.prototype.addn = function(f4) {
      return this.clone().iaddn(f4);
    }, o4.prototype.subn = function(f4) {
      return this.clone().isubn(f4);
    }, o4.prototype.iabs = function() {
      return this.negative = 0, this;
    }, o4.prototype.abs = function() {
      return this.clone().iabs();
    }, o4.prototype._ishlnsubmul = function(f4, a4, c5) {
      var d3 = f4.length + c5, m2;
      this._expand(d3);
      var x5, M2 = 0;
      for (m2 = 0; m2 < f4.length; m2++) {
        x5 = (this.words[m2 + c5] | 0) + M2;
        var l4 = (f4.words[m2] | 0) * a4;
        x5 -= l4 & 67108863, M2 = (x5 >> 26) - (l4 / 67108864 | 0), this.words[m2 + c5] = x5 & 67108863;
      }
      for (; m2 < this.length - c5; m2++)
        x5 = (this.words[m2 + c5] | 0) + M2, M2 = x5 >> 26, this.words[m2 + c5] = x5 & 67108863;
      if (M2 === 0)
        return this._strip();
      for (i4(M2 === -1), M2 = 0, m2 = 0; m2 < this.length; m2++)
        x5 = -(this.words[m2] | 0) + M2, M2 = x5 >> 26, this.words[m2] = x5 & 67108863;
      return this.negative = 1, this._strip();
    }, o4.prototype._wordDiv = function(f4, a4) {
      var c5 = this.length - f4.length, d3 = this.clone(), m2 = f4, x5 = m2.words[m2.length - 1] | 0, M2 = this._countBits(x5);
      c5 = 26 - M2, c5 !== 0 && (m2 = m2.ushln(c5), d3.iushln(c5), x5 = m2.words[m2.length - 1] | 0);
      var l4 = d3.length - m2.length, s3;
      if (a4 !== "mod") {
        s3 = new o4(null), s3.length = l4 + 1, s3.words = new Array(s3.length);
        for (var g3 = 0; g3 < s3.length; g3++)
          s3.words[g3] = 0;
      }
      var k3 = d3.clone()._ishlnsubmul(m2, 1, l4);
      k3.negative === 0 && (d3 = k3, s3 && (s3.words[l4] = 1));
      for (var u3 = l4 - 1; u3 >= 0; u3--) {
        var E3 = (d3.words[m2.length + u3] | 0) * 67108864 + (d3.words[m2.length + u3 - 1] | 0);
        for (E3 = Math.min(E3 / x5 | 0, 67108863), d3._ishlnsubmul(m2, E3, u3); d3.negative !== 0; )
          E3--, d3.negative = 0, d3._ishlnsubmul(m2, 1, u3), d3.isZero() || (d3.negative ^= 1);
        s3 && (s3.words[u3] = E3);
      }
      return s3 && s3._strip(), d3._strip(), a4 !== "div" && c5 !== 0 && d3.iushrn(c5), { div: s3 || null, mod: d3 };
    }, o4.prototype.divmod = function(f4, a4, c5) {
      if (i4(!f4.isZero()), this.isZero())
        return { div: new o4(0), mod: new o4(0) };
      var d3, m2, x5;
      return this.negative !== 0 && f4.negative === 0 ? (x5 = this.neg().divmod(f4, a4), a4 !== "mod" && (d3 = x5.div.neg()), a4 !== "div" && (m2 = x5.mod.neg(), c5 && m2.negative !== 0 && m2.iadd(f4)), { div: d3, mod: m2 }) : this.negative === 0 && f4.negative !== 0 ? (x5 = this.divmod(f4.neg(), a4), a4 !== "mod" && (d3 = x5.div.neg()), { div: d3, mod: x5.mod }) : this.negative & f4.negative ? (x5 = this.neg().divmod(f4.neg(), a4), a4 !== "div" && (m2 = x5.mod.neg(), c5 && m2.negative !== 0 && m2.isub(f4)), { div: x5.div, mod: m2 }) : f4.length > this.length || this.cmp(f4) < 0 ? { div: new o4(0), mod: this } : f4.length === 1 ? a4 === "div" ? { div: this.divn(f4.words[0]), mod: null } : a4 === "mod" ? { div: null, mod: new o4(this.modrn(f4.words[0])) } : { div: this.divn(f4.words[0]), mod: new o4(this.modrn(f4.words[0])) } : this._wordDiv(f4, a4);
    }, o4.prototype.div = function(f4) {
      return this.divmod(f4, "div", false).div;
    }, o4.prototype.mod = function(f4) {
      return this.divmod(f4, "mod", false).mod;
    }, o4.prototype.umod = function(f4) {
      return this.divmod(f4, "mod", true).mod;
    }, o4.prototype.divRound = function(f4) {
      var a4 = this.divmod(f4);
      if (a4.mod.isZero())
        return a4.div;
      var c5 = a4.div.negative !== 0 ? a4.mod.isub(f4) : a4.mod, d3 = f4.ushrn(1), m2 = f4.andln(1), x5 = c5.cmp(d3);
      return x5 < 0 || m2 === 1 && x5 === 0 ? a4.div : a4.div.negative !== 0 ? a4.div.isubn(1) : a4.div.iaddn(1);
    }, o4.prototype.modrn = function(f4) {
      var a4 = f4 < 0;
      a4 && (f4 = -f4), i4(f4 <= 67108863);
      for (var c5 = (1 << 26) % f4, d3 = 0, m2 = this.length - 1; m2 >= 0; m2--)
        d3 = (c5 * d3 + (this.words[m2] | 0)) % f4;
      return a4 ? -d3 : d3;
    }, o4.prototype.modn = function(f4) {
      return this.modrn(f4);
    }, o4.prototype.idivn = function(f4) {
      var a4 = f4 < 0;
      a4 && (f4 = -f4), i4(f4 <= 67108863);
      for (var c5 = 0, d3 = this.length - 1; d3 >= 0; d3--) {
        var m2 = (this.words[d3] | 0) + c5 * 67108864;
        this.words[d3] = m2 / f4 | 0, c5 = m2 % f4;
      }
      return this._strip(), a4 ? this.ineg() : this;
    }, o4.prototype.divn = function(f4) {
      return this.clone().idivn(f4);
    }, o4.prototype.egcd = function(f4) {
      i4(f4.negative === 0), i4(!f4.isZero());
      var a4 = this, c5 = f4.clone();
      a4.negative !== 0 ? a4 = a4.umod(f4) : a4 = a4.clone();
      for (var d3 = new o4(1), m2 = new o4(0), x5 = new o4(0), M2 = new o4(1), l4 = 0; a4.isEven() && c5.isEven(); )
        a4.iushrn(1), c5.iushrn(1), ++l4;
      for (var s3 = c5.clone(), g3 = a4.clone(); !a4.isZero(); ) {
        for (var k3 = 0, u3 = 1; !(a4.words[0] & u3) && k3 < 26; ++k3, u3 <<= 1)
          ;
        if (k3 > 0)
          for (a4.iushrn(k3); k3-- > 0; )
            (d3.isOdd() || m2.isOdd()) && (d3.iadd(s3), m2.isub(g3)), d3.iushrn(1), m2.iushrn(1);
        for (var E3 = 0, _3 = 1; !(c5.words[0] & _3) && E3 < 26; ++E3, _3 <<= 1)
          ;
        if (E3 > 0)
          for (c5.iushrn(E3); E3-- > 0; )
            (x5.isOdd() || M2.isOdd()) && (x5.iadd(s3), M2.isub(g3)), x5.iushrn(1), M2.iushrn(1);
        a4.cmp(c5) >= 0 ? (a4.isub(c5), d3.isub(x5), m2.isub(M2)) : (c5.isub(a4), x5.isub(d3), M2.isub(m2));
      }
      return { a: x5, b: M2, gcd: c5.iushln(l4) };
    }, o4.prototype._invmp = function(f4) {
      i4(f4.negative === 0), i4(!f4.isZero());
      var a4 = this, c5 = f4.clone();
      a4.negative !== 0 ? a4 = a4.umod(f4) : a4 = a4.clone();
      for (var d3 = new o4(1), m2 = new o4(0), x5 = c5.clone(); a4.cmpn(1) > 0 && c5.cmpn(1) > 0; ) {
        for (var M2 = 0, l4 = 1; !(a4.words[0] & l4) && M2 < 26; ++M2, l4 <<= 1)
          ;
        if (M2 > 0)
          for (a4.iushrn(M2); M2-- > 0; )
            d3.isOdd() && d3.iadd(x5), d3.iushrn(1);
        for (var s3 = 0, g3 = 1; !(c5.words[0] & g3) && s3 < 26; ++s3, g3 <<= 1)
          ;
        if (s3 > 0)
          for (c5.iushrn(s3); s3-- > 0; )
            m2.isOdd() && m2.iadd(x5), m2.iushrn(1);
        a4.cmp(c5) >= 0 ? (a4.isub(c5), d3.isub(m2)) : (c5.isub(a4), m2.isub(d3));
      }
      var k3;
      return a4.cmpn(1) === 0 ? k3 = d3 : k3 = m2, k3.cmpn(0) < 0 && k3.iadd(f4), k3;
    }, o4.prototype.gcd = function(f4) {
      if (this.isZero())
        return f4.abs();
      if (f4.isZero())
        return this.abs();
      var a4 = this.clone(), c5 = f4.clone();
      a4.negative = 0, c5.negative = 0;
      for (var d3 = 0; a4.isEven() && c5.isEven(); d3++)
        a4.iushrn(1), c5.iushrn(1);
      do {
        for (; a4.isEven(); )
          a4.iushrn(1);
        for (; c5.isEven(); )
          c5.iushrn(1);
        var m2 = a4.cmp(c5);
        if (m2 < 0) {
          var x5 = a4;
          a4 = c5, c5 = x5;
        } else if (m2 === 0 || c5.cmpn(1) === 0)
          break;
        a4.isub(c5);
      } while (true);
      return c5.iushln(d3);
    }, o4.prototype.invm = function(f4) {
      return this.egcd(f4).a.umod(f4);
    }, o4.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, o4.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, o4.prototype.andln = function(f4) {
      return this.words[0] & f4;
    }, o4.prototype.bincn = function(f4) {
      i4(typeof f4 == "number");
      var a4 = f4 % 26, c5 = (f4 - a4) / 26, d3 = 1 << a4;
      if (this.length <= c5)
        return this._expand(c5 + 1), this.words[c5] |= d3, this;
      for (var m2 = d3, x5 = c5; m2 !== 0 && x5 < this.length; x5++) {
        var M2 = this.words[x5] | 0;
        M2 += m2, m2 = M2 >>> 26, M2 &= 67108863, this.words[x5] = M2;
      }
      return m2 !== 0 && (this.words[x5] = m2, this.length++), this;
    }, o4.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, o4.prototype.cmpn = function(f4) {
      var a4 = f4 < 0;
      if (this.negative !== 0 && !a4)
        return -1;
      if (this.negative === 0 && a4)
        return 1;
      this._strip();
      var c5;
      if (this.length > 1)
        c5 = 1;
      else {
        a4 && (f4 = -f4), i4(f4 <= 67108863, "Number is too big");
        var d3 = this.words[0] | 0;
        c5 = d3 === f4 ? 0 : d3 < f4 ? -1 : 1;
      }
      return this.negative !== 0 ? -c5 | 0 : c5;
    }, o4.prototype.cmp = function(f4) {
      if (this.negative !== 0 && f4.negative === 0)
        return -1;
      if (this.negative === 0 && f4.negative !== 0)
        return 1;
      var a4 = this.ucmp(f4);
      return this.negative !== 0 ? -a4 | 0 : a4;
    }, o4.prototype.ucmp = function(f4) {
      if (this.length > f4.length)
        return 1;
      if (this.length < f4.length)
        return -1;
      for (var a4 = 0, c5 = this.length - 1; c5 >= 0; c5--) {
        var d3 = this.words[c5] | 0, m2 = f4.words[c5] | 0;
        if (d3 !== m2) {
          d3 < m2 ? a4 = -1 : d3 > m2 && (a4 = 1);
          break;
        }
      }
      return a4;
    }, o4.prototype.gtn = function(f4) {
      return this.cmpn(f4) === 1;
    }, o4.prototype.gt = function(f4) {
      return this.cmp(f4) === 1;
    }, o4.prototype.gten = function(f4) {
      return this.cmpn(f4) >= 0;
    }, o4.prototype.gte = function(f4) {
      return this.cmp(f4) >= 0;
    }, o4.prototype.ltn = function(f4) {
      return this.cmpn(f4) === -1;
    }, o4.prototype.lt = function(f4) {
      return this.cmp(f4) === -1;
    }, o4.prototype.lten = function(f4) {
      return this.cmpn(f4) <= 0;
    }, o4.prototype.lte = function(f4) {
      return this.cmp(f4) <= 0;
    }, o4.prototype.eqn = function(f4) {
      return this.cmpn(f4) === 0;
    }, o4.prototype.eq = function(f4) {
      return this.cmp(f4) === 0;
    }, o4.red = function(f4) {
      return new Y(f4);
    }, o4.prototype.toRed = function(f4) {
      return i4(!this.red, "Already a number in reduction context"), i4(this.negative === 0, "red works only with positives"), f4.convertTo(this)._forceRed(f4);
    }, o4.prototype.fromRed = function() {
      return i4(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o4.prototype._forceRed = function(f4) {
      return this.red = f4, this;
    }, o4.prototype.forceRed = function(f4) {
      return i4(!this.red, "Already a number in reduction context"), this._forceRed(f4);
    }, o4.prototype.redAdd = function(f4) {
      return i4(this.red, "redAdd works only with red numbers"), this.red.add(this, f4);
    }, o4.prototype.redIAdd = function(f4) {
      return i4(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, f4);
    }, o4.prototype.redSub = function(f4) {
      return i4(this.red, "redSub works only with red numbers"), this.red.sub(this, f4);
    }, o4.prototype.redISub = function(f4) {
      return i4(this.red, "redISub works only with red numbers"), this.red.isub(this, f4);
    }, o4.prototype.redShl = function(f4) {
      return i4(this.red, "redShl works only with red numbers"), this.red.shl(this, f4);
    }, o4.prototype.redMul = function(f4) {
      return i4(this.red, "redMul works only with red numbers"), this.red._verify2(this, f4), this.red.mul(this, f4);
    }, o4.prototype.redIMul = function(f4) {
      return i4(this.red, "redMul works only with red numbers"), this.red._verify2(this, f4), this.red.imul(this, f4);
    }, o4.prototype.redSqr = function() {
      return i4(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o4.prototype.redISqr = function() {
      return i4(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o4.prototype.redSqrt = function() {
      return i4(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o4.prototype.redInvm = function() {
      return i4(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o4.prototype.redNeg = function() {
      return i4(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o4.prototype.redPow = function(f4) {
      return i4(this.red && !f4.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, f4);
    };
    var H2 = { k256: null, p224: null, p192: null, p25519: null };
    function L2(b4, f4) {
      this.name = b4, this.p = new o4(f4, 16), this.n = this.p.bitLength(), this.k = new o4(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    L2.prototype._tmp = function() {
      var f4 = new o4(null);
      return f4.words = new Array(Math.ceil(this.n / 13)), f4;
    }, L2.prototype.ireduce = function(f4) {
      var a4 = f4, c5;
      do
        this.split(a4, this.tmp), a4 = this.imulK(a4), a4 = a4.iadd(this.tmp), c5 = a4.bitLength();
      while (c5 > this.n);
      var d3 = c5 < this.n ? -1 : a4.ucmp(this.p);
      return d3 === 0 ? (a4.words[0] = 0, a4.length = 1) : d3 > 0 ? a4.isub(this.p) : a4.strip !== void 0 ? a4.strip() : a4._strip(), a4;
    }, L2.prototype.split = function(f4, a4) {
      f4.iushrn(this.n, 0, a4);
    }, L2.prototype.imulK = function(f4) {
      return f4.imul(this.k);
    };
    function Pt2() {
      L2.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    n5(Pt2, L2), Pt2.prototype.split = function(f4, a4) {
      for (var c5 = 4194303, d3 = Math.min(f4.length, 9), m2 = 0; m2 < d3; m2++)
        a4.words[m2] = f4.words[m2];
      if (a4.length = d3, f4.length <= 9) {
        f4.words[0] = 0, f4.length = 1;
        return;
      }
      var x5 = f4.words[9];
      for (a4.words[a4.length++] = x5 & c5, m2 = 10; m2 < f4.length; m2++) {
        var M2 = f4.words[m2] | 0;
        f4.words[m2 - 10] = (M2 & c5) << 4 | x5 >>> 22, x5 = M2;
      }
      x5 >>>= 22, f4.words[m2 - 10] = x5, x5 === 0 && f4.length > 10 ? f4.length -= 10 : f4.length -= 9;
    }, Pt2.prototype.imulK = function(f4) {
      f4.words[f4.length] = 0, f4.words[f4.length + 1] = 0, f4.length += 2;
      for (var a4 = 0, c5 = 0; c5 < f4.length; c5++) {
        var d3 = f4.words[c5] | 0;
        a4 += d3 * 977, f4.words[c5] = a4 & 67108863, a4 = d3 * 64 + (a4 / 67108864 | 0);
      }
      return f4.words[f4.length - 1] === 0 && (f4.length--, f4.words[f4.length - 1] === 0 && f4.length--), f4;
    };
    function W() {
      L2.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    n5(W, L2);
    function Rt2() {
      L2.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    n5(Rt2, L2);
    function Vt2() {
      L2.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    n5(Vt2, L2), Vt2.prototype.imulK = function(f4) {
      for (var a4 = 0, c5 = 0; c5 < f4.length; c5++) {
        var d3 = (f4.words[c5] | 0) * 19 + a4, m2 = d3 & 67108863;
        d3 >>>= 26, f4.words[c5] = m2, a4 = d3;
      }
      return a4 !== 0 && (f4.words[f4.length++] = a4), f4;
    }, o4._prime = function(f4) {
      if (H2[f4])
        return H2[f4];
      var a4;
      if (f4 === "k256")
        a4 = new Pt2();
      else if (f4 === "p224")
        a4 = new W();
      else if (f4 === "p192")
        a4 = new Rt2();
      else if (f4 === "p25519")
        a4 = new Vt2();
      else
        throw new Error("Unknown prime " + f4);
      return H2[f4] = a4, a4;
    };
    function Y(b4) {
      if (typeof b4 == "string") {
        var f4 = o4._prime(b4);
        this.m = f4.p, this.prime = f4;
      } else
        i4(b4.gtn(1), "modulus must be greater than 1"), this.m = b4, this.prime = null;
    }
    Y.prototype._verify1 = function(f4) {
      i4(f4.negative === 0, "red works only with positives"), i4(f4.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(f4, a4) {
      i4((f4.negative | a4.negative) === 0, "red works only with positives"), i4(f4.red && f4.red === a4.red, "red works only with red numbers");
    }, Y.prototype.imod = function(f4) {
      return this.prime ? this.prime.ireduce(f4)._forceRed(this) : (w4(f4, f4.umod(this.m)._forceRed(this)), f4);
    }, Y.prototype.neg = function(f4) {
      return f4.isZero() ? f4.clone() : this.m.sub(f4)._forceRed(this);
    }, Y.prototype.add = function(f4, a4) {
      this._verify2(f4, a4);
      var c5 = f4.add(a4);
      return c5.cmp(this.m) >= 0 && c5.isub(this.m), c5._forceRed(this);
    }, Y.prototype.iadd = function(f4, a4) {
      this._verify2(f4, a4);
      var c5 = f4.iadd(a4);
      return c5.cmp(this.m) >= 0 && c5.isub(this.m), c5;
    }, Y.prototype.sub = function(f4, a4) {
      this._verify2(f4, a4);
      var c5 = f4.sub(a4);
      return c5.cmpn(0) < 0 && c5.iadd(this.m), c5._forceRed(this);
    }, Y.prototype.isub = function(f4, a4) {
      this._verify2(f4, a4);
      var c5 = f4.isub(a4);
      return c5.cmpn(0) < 0 && c5.iadd(this.m), c5;
    }, Y.prototype.shl = function(f4, a4) {
      return this._verify1(f4), this.imod(f4.ushln(a4));
    }, Y.prototype.imul = function(f4, a4) {
      return this._verify2(f4, a4), this.imod(f4.imul(a4));
    }, Y.prototype.mul = function(f4, a4) {
      return this._verify2(f4, a4), this.imod(f4.mul(a4));
    }, Y.prototype.isqr = function(f4) {
      return this.imul(f4, f4.clone());
    }, Y.prototype.sqr = function(f4) {
      return this.mul(f4, f4);
    }, Y.prototype.sqrt = function(f4) {
      if (f4.isZero())
        return f4.clone();
      var a4 = this.m.andln(3);
      if (i4(a4 % 2 === 1), a4 === 3) {
        var c5 = this.m.add(new o4(1)).iushrn(2);
        return this.pow(f4, c5);
      }
      for (var d3 = this.m.subn(1), m2 = 0; !d3.isZero() && d3.andln(1) === 0; )
        m2++, d3.iushrn(1);
      i4(!d3.isZero());
      var x5 = new o4(1).toRed(this), M2 = x5.redNeg(), l4 = this.m.subn(1).iushrn(1), s3 = this.m.bitLength();
      for (s3 = new o4(2 * s3 * s3).toRed(this); this.pow(s3, l4).cmp(M2) !== 0; )
        s3.redIAdd(M2);
      for (var g3 = this.pow(s3, d3), k3 = this.pow(f4, d3.addn(1).iushrn(1)), u3 = this.pow(f4, d3), E3 = m2; u3.cmp(x5) !== 0; ) {
        for (var _3 = u3, B3 = 0; _3.cmp(x5) !== 0; B3++)
          _3 = _3.redSqr();
        i4(B3 < E3);
        var R2 = this.pow(g3, new o4(1).iushln(E3 - B3 - 1));
        k3 = k3.redMul(R2), g3 = R2.redSqr(), u3 = u3.redMul(g3), E3 = B3;
      }
      return k3;
    }, Y.prototype.invm = function(f4) {
      var a4 = f4._invmp(this.m);
      return a4.negative !== 0 ? (a4.negative = 0, this.imod(a4).redNeg()) : this.imod(a4);
    }, Y.prototype.pow = function(f4, a4) {
      if (a4.isZero())
        return new o4(1).toRed(this);
      if (a4.cmpn(1) === 0)
        return f4.clone();
      var c5 = 4, d3 = new Array(1 << c5);
      d3[0] = new o4(1).toRed(this), d3[1] = f4;
      for (var m2 = 2; m2 < d3.length; m2++)
        d3[m2] = this.mul(d3[m2 - 1], f4);
      var x5 = d3[0], M2 = 0, l4 = 0, s3 = a4.bitLength() % 26;
      for (s3 === 0 && (s3 = 26), m2 = a4.length - 1; m2 >= 0; m2--) {
        for (var g3 = a4.words[m2], k3 = s3 - 1; k3 >= 0; k3--) {
          var u3 = g3 >> k3 & 1;
          if (x5 !== d3[0] && (x5 = this.sqr(x5)), u3 === 0 && M2 === 0) {
            l4 = 0;
            continue;
          }
          M2 <<= 1, M2 |= u3, l4++, !(l4 !== c5 && (m2 !== 0 || k3 !== 0)) && (x5 = this.mul(x5, d3[M2]), l4 = 0, M2 = 0);
        }
        s3 = 26;
      }
      return x5;
    }, Y.prototype.convertTo = function(f4) {
      var a4 = f4.umod(this.m);
      return a4 === f4 ? a4.clone() : a4;
    }, Y.prototype.convertFrom = function(f4) {
      var a4 = f4.clone();
      return a4.red = null, a4;
    }, o4.mont = function(f4) {
      return new Wt2(f4);
    };
    function Wt2(b4) {
      Y.call(this, b4), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new o4(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n5(Wt2, Y), Wt2.prototype.convertTo = function(f4) {
      return this.imod(f4.ushln(this.shift));
    }, Wt2.prototype.convertFrom = function(f4) {
      var a4 = this.imod(f4.mul(this.rinv));
      return a4.red = null, a4;
    }, Wt2.prototype.imul = function(f4, a4) {
      if (f4.isZero() || a4.isZero())
        return f4.words[0] = 0, f4.length = 1, f4;
      var c5 = f4.imul(a4), d3 = c5.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m2 = c5.isub(d3).iushrn(this.shift), x5 = m2;
      return m2.cmp(this.m) >= 0 ? x5 = m2.isub(this.m) : m2.cmpn(0) < 0 && (x5 = m2.iadd(this.m)), x5._forceRed(this);
    }, Wt2.prototype.mul = function(f4, a4) {
      if (f4.isZero() || a4.isZero())
        return new o4(0)._forceRed(this);
      var c5 = f4.mul(a4), d3 = c5.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m2 = c5.isub(d3).iushrn(this.shift), x5 = m2;
      return m2.cmp(this.m) >= 0 ? x5 = m2.isub(this.m) : m2.cmpn(0) < 0 && (x5 = m2.iadd(this.m)), x5._forceRed(this);
    }, Wt2.prototype.invm = function(f4) {
      var a4 = this.imod(f4._invmp(this.m).mul(this.r2));
      return a4._forceRed(this);
    };
  })(e2, Fn);
})(Gn);
var K = Gn.exports;
var Yn = "bignumber/5.7.0";
var Tr = K.BN;
var Ae = new z(Yn);
var Ii = {};
var Vn = 9007199254740991;
function Us(e2) {
  return e2 != null && (V.isBigNumber(e2) || typeof e2 == "number" && e2 % 1 === 0 || typeof e2 == "string" && !!e2.match(/^-?[0-9]+$/) || Jt(e2) || typeof e2 == "bigint" || nr(e2));
}
var Wn = false;
var V = class _V {
  constructor(t, r3) {
    t !== Ii && Ae.throwError("cannot call constructor directly; use BigNumber.from", z.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = r3, this._isBigNumber = true, Object.freeze(this);
  }
  fromTwos(t) {
    return zt(j(this).fromTwos(t));
  }
  toTwos(t) {
    return zt(j(this).toTwos(t));
  }
  abs() {
    return this._hex[0] === "-" ? _V.from(this._hex.substring(1)) : this;
  }
  add(t) {
    return zt(j(this).add(j(t)));
  }
  sub(t) {
    return zt(j(this).sub(j(t)));
  }
  div(t) {
    return _V.from(t).isZero() && Zt("division-by-zero", "div"), zt(j(this).div(j(t)));
  }
  mul(t) {
    return zt(j(this).mul(j(t)));
  }
  mod(t) {
    const r3 = j(t);
    return r3.isNeg() && Zt("division-by-zero", "mod"), zt(j(this).umod(r3));
  }
  pow(t) {
    const r3 = j(t);
    return r3.isNeg() && Zt("negative-power", "pow"), zt(j(this).pow(r3));
  }
  and(t) {
    const r3 = j(t);
    return (this.isNegative() || r3.isNeg()) && Zt("unbound-bitwise-result", "and"), zt(j(this).and(r3));
  }
  or(t) {
    const r3 = j(t);
    return (this.isNegative() || r3.isNeg()) && Zt("unbound-bitwise-result", "or"), zt(j(this).or(r3));
  }
  xor(t) {
    const r3 = j(t);
    return (this.isNegative() || r3.isNeg()) && Zt("unbound-bitwise-result", "xor"), zt(j(this).xor(r3));
  }
  mask(t) {
    return (this.isNegative() || t < 0) && Zt("negative-width", "mask"), zt(j(this).maskn(t));
  }
  shl(t) {
    return (this.isNegative() || t < 0) && Zt("negative-width", "shl"), zt(j(this).shln(t));
  }
  shr(t) {
    return (this.isNegative() || t < 0) && Zt("negative-width", "shr"), zt(j(this).shrn(t));
  }
  eq(t) {
    return j(this).eq(j(t));
  }
  lt(t) {
    return j(this).lt(j(t));
  }
  lte(t) {
    return j(this).lte(j(t));
  }
  gt(t) {
    return j(this).gt(j(t));
  }
  gte(t) {
    return j(this).gte(j(t));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return j(this).isZero();
  }
  toNumber() {
    try {
      return j(this).toNumber();
    } catch {
      Zt("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return Ae.throwError("this platform does not support BigInt", z.errors.UNSUPPORTED_OPERATION, { value: this.toString() });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? Wn || (Wn = true, Ae.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? Ae.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", z.errors.UNEXPECTED_ARGUMENT, {}) : Ae.throwError("BigNumber.toString does not accept parameters", z.errors.UNEXPECTED_ARGUMENT, {})), j(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(t) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(t) {
    if (t instanceof _V)
      return t;
    if (typeof t == "string")
      return t.match(/^-?0x[0-9a-f]+$/i) ? new _V(Ii, mr(t)) : t.match(/^-?[0-9]+$/) ? new _V(Ii, mr(new Tr(t))) : Ae.throwArgumentError("invalid BigNumber string", "value", t);
    if (typeof t == "number")
      return t % 1 && Zt("underflow", "BigNumber.from", t), (t >= Vn || t <= -Vn) && Zt("overflow", "BigNumber.from", t), _V.from(String(t));
    const r3 = t;
    if (typeof r3 == "bigint")
      return _V.from(r3.toString());
    if (nr(r3))
      return _V.from(Kt(r3));
    if (r3)
      if (r3.toHexString) {
        const i4 = r3.toHexString();
        if (typeof i4 == "string")
          return _V.from(i4);
      } else {
        let i4 = r3._hex;
        if (i4 == null && r3.type === "BigNumber" && (i4 = r3.hex), typeof i4 == "string" && (Jt(i4) || i4[0] === "-" && Jt(i4.substring(1))))
          return _V.from(i4);
      }
    return Ae.throwArgumentError("invalid BigNumber value", "value", t);
  }
  static isBigNumber(t) {
    return !!(t && t._isBigNumber);
  }
};
function mr(e2) {
  if (typeof e2 != "string")
    return mr(e2.toString(16));
  if (e2[0] === "-")
    return e2 = e2.substring(1), e2[0] === "-" && Ae.throwArgumentError("invalid hex", "value", e2), e2 = mr(e2), e2 === "0x00" ? e2 : "-" + e2;
  if (e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), e2 === "0x")
    return "0x00";
  for (e2.length % 2 && (e2 = "0x0" + e2.substring(2)); e2.length > 4 && e2.substring(0, 4) === "0x00"; )
    e2 = "0x" + e2.substring(4);
  return e2;
}
function zt(e2) {
  return V.from(mr(e2));
}
function j(e2) {
  const t = V.from(e2).toHexString();
  return t[0] === "-" ? new Tr("-" + t.substring(3), 16) : new Tr(t.substring(2), 16);
}
function Zt(e2, t, r3) {
  const i4 = { fault: e2, operation: t };
  return r3 != null && (i4.value = r3), Ae.throwError(e2, z.errors.NUMERIC_FAULT, i4);
}
function ks(e2) {
  return new Tr(e2, 36).toString(16);
}
var Ht = new z(Yn);
var Ar = {};
var Xn = V.from(0);
var Zn = V.from(-1);
function $n(e2, t, r3, i4) {
  const n5 = { fault: t, operation: r3 };
  return i4 !== void 0 && (n5.value = i4), Ht.throwError(e2, z.errors.NUMERIC_FAULT, n5);
}
var br = "0";
for (; br.length < 256; )
  br += br;
function Ni(e2) {
  if (typeof e2 != "number")
    try {
      e2 = V.from(e2).toNumber();
    } catch {
    }
  return typeof e2 == "number" && e2 >= 0 && e2 <= 256 && !(e2 % 1) ? "1" + br.substring(0, e2) : Ht.throwArgumentError("invalid decimal size", "decimals", e2);
}
function _i(e2, t) {
  t == null && (t = 0);
  const r3 = Ni(t);
  e2 = V.from(e2);
  const i4 = e2.lt(Xn);
  i4 && (e2 = e2.mul(Zn));
  let n5 = e2.mod(r3).toString();
  for (; n5.length < r3.length - 1; )
    n5 = "0" + n5;
  n5 = n5.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const o4 = e2.div(r3).toString();
  return r3.length === 1 ? e2 = o4 : e2 = o4 + "." + n5, i4 && (e2 = "-" + e2), e2;
}
function be(e2, t) {
  t == null && (t = 0);
  const r3 = Ni(t);
  (typeof e2 != "string" || !e2.match(/^-?[0-9.]+$/)) && Ht.throwArgumentError("invalid decimal value", "value", e2);
  const i4 = e2.substring(0, 1) === "-";
  i4 && (e2 = e2.substring(1)), e2 === "." && Ht.throwArgumentError("missing value", "value", e2);
  const n5 = e2.split(".");
  n5.length > 2 && Ht.throwArgumentError("too many decimal points", "value", e2);
  let o4 = n5[0], h5 = n5[1];
  for (o4 || (o4 = "0"), h5 || (h5 = "0"); h5[h5.length - 1] === "0"; )
    h5 = h5.substring(0, h5.length - 1);
  for (h5.length > r3.length - 1 && $n("fractional component exceeds decimals", "underflow", "parseFixed"), h5 === "" && (h5 = "0"); h5.length < r3.length - 1; )
    h5 += "0";
  const p3 = V.from(o4), A3 = V.from(h5);
  let v4 = p3.mul(r3).add(A3);
  return i4 && (v4 = v4.mul(Zn)), v4;
}
var vr = class _vr {
  constructor(t, r3, i4, n5) {
    t !== Ar && Ht.throwError("cannot use FixedFormat constructor; use FixedFormat.from", z.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = r3, this.width = i4, this.decimals = n5, this.name = (r3 ? "" : "u") + "fixed" + String(i4) + "x" + String(n5), this._multiplier = Ni(n5), Object.freeze(this);
  }
  static from(t) {
    if (t instanceof _vr)
      return t;
    typeof t == "number" && (t = `fixed128x${t}`);
    let r3 = true, i4 = 128, n5 = 18;
    if (typeof t == "string") {
      if (t !== "fixed")
        if (t === "ufixed")
          r3 = false;
        else {
          const o4 = t.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
          o4 || Ht.throwArgumentError("invalid fixed format", "format", t), r3 = o4[1] !== "u", i4 = parseInt(o4[2]), n5 = parseInt(o4[3]);
        }
    } else if (t) {
      const o4 = (h5, p3, A3) => t[h5] == null ? A3 : (typeof t[h5] !== p3 && Ht.throwArgumentError("invalid fixed format (" + h5 + " not " + p3 + ")", "format." + h5, t[h5]), t[h5]);
      r3 = o4("signed", "boolean", r3), i4 = o4("width", "number", i4), n5 = o4("decimals", "number", n5);
    }
    return i4 % 8 && Ht.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", i4), n5 > 80 && Ht.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", n5), new _vr(Ar, r3, i4, n5);
  }
};
var Ut = class _Ut {
  constructor(t, r3, i4, n5) {
    t !== Ar && Ht.throwError("cannot use FixedNumber constructor; use FixedNumber.from", z.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = n5, this._hex = r3, this._value = i4, this._isFixedNumber = true, Object.freeze(this);
  }
  _checkFormat(t) {
    this.format.name !== t.format.name && Ht.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", t);
  }
  addUnsafe(t) {
    this._checkFormat(t);
    const r3 = be(this._value, this.format.decimals), i4 = be(t._value, t.format.decimals);
    return _Ut.fromValue(r3.add(i4), this.format.decimals, this.format);
  }
  subUnsafe(t) {
    this._checkFormat(t);
    const r3 = be(this._value, this.format.decimals), i4 = be(t._value, t.format.decimals);
    return _Ut.fromValue(r3.sub(i4), this.format.decimals, this.format);
  }
  mulUnsafe(t) {
    this._checkFormat(t);
    const r3 = be(this._value, this.format.decimals), i4 = be(t._value, t.format.decimals);
    return _Ut.fromValue(r3.mul(i4).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(t) {
    this._checkFormat(t);
    const r3 = be(this._value, this.format.decimals), i4 = be(t._value, t.format.decimals);
    return _Ut.fromValue(r3.mul(this.format._multiplier).div(i4), this.format.decimals, this.format);
  }
  floor() {
    const t = this.toString().split(".");
    t.length === 1 && t.push("0");
    let r3 = _Ut.from(t[0], this.format);
    const i4 = !t[1].match(/^(0*)$/);
    return this.isNegative() && i4 && (r3 = r3.subUnsafe(tf.toFormat(r3.format))), r3;
  }
  ceiling() {
    const t = this.toString().split(".");
    t.length === 1 && t.push("0");
    let r3 = _Ut.from(t[0], this.format);
    const i4 = !t[1].match(/^(0*)$/);
    return !this.isNegative() && i4 && (r3 = r3.addUnsafe(tf.toFormat(r3.format))), r3;
  }
  round(t) {
    t == null && (t = 0);
    const r3 = this.toString().split(".");
    if (r3.length === 1 && r3.push("0"), (t < 0 || t > 80 || t % 1) && Ht.throwArgumentError("invalid decimal count", "decimals", t), r3[1].length <= t)
      return this;
    const i4 = _Ut.from("1" + br.substring(0, t), this.format), n5 = qs.toFormat(this.format);
    return this.mulUnsafe(i4).addUnsafe(n5).floor().divUnsafe(i4);
  }
  isZero() {
    return this._value === "0.0" || this._value === "0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(t) {
    if (t == null)
      return this._hex;
    t % 8 && Ht.throwArgumentError("invalid byte width", "width", t);
    const r3 = V.from(this._hex).fromTwos(this.format.width).toTwos(t).toHexString();
    return oe(r3, t / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(t) {
    return _Ut.fromString(this._value, t);
  }
  static fromValue(t, r3, i4) {
    return i4 == null && r3 != null && !Us(r3) && (i4 = r3, r3 = null), r3 == null && (r3 = 0), i4 == null && (i4 = "fixed"), _Ut.fromString(_i(t, r3), vr.from(i4));
  }
  static fromString(t, r3) {
    r3 == null && (r3 = "fixed");
    const i4 = vr.from(r3), n5 = be(t, i4.decimals);
    !i4.signed && n5.lt(Xn) && $n("unsigned value cannot be negative", "overflow", "value", t);
    let o4 = null;
    i4.signed ? o4 = n5.toTwos(i4.width).toHexString() : (o4 = n5.toHexString(), o4 = oe(o4, i4.width / 8));
    const h5 = _i(n5, i4.decimals);
    return new _Ut(Ar, o4, h5, i4);
  }
  static fromBytes(t, r3) {
    r3 == null && (r3 = "fixed");
    const i4 = vr.from(r3);
    if (Ot(t).length > i4.width / 8)
      throw new Error("overflow");
    let n5 = V.from(t);
    i4.signed && (n5 = n5.fromTwos(i4.width));
    const o4 = n5.toTwos((i4.signed ? 0 : 1) + i4.width).toHexString(), h5 = _i(n5, i4.decimals);
    return new _Ut(Ar, o4, h5, i4);
  }
  static from(t, r3) {
    if (typeof t == "string")
      return _Ut.fromString(t, r3);
    if (nr(t))
      return _Ut.fromBytes(t, r3);
    try {
      return _Ut.fromValue(t, 0, r3);
    } catch (i4) {
      if (i4.code !== z.errors.INVALID_ARGUMENT)
        throw i4;
    }
    return Ht.throwArgumentError("invalid FixedNumber value", "value", t);
  }
  static isFixedNumber(t) {
    return !!(t && t._isFixedNumber);
  }
};
var tf = Ut.from(1);
var qs = Ut.from("0.5");
var Ks = "strings/5.7.0";
var ef = new z(Ks);
var Fr;
(function(e2) {
  e2.current = "", e2.NFC = "NFC", e2.NFD = "NFD", e2.NFKC = "NFKC", e2.NFKD = "NFKD";
})(Fr || (Fr = {}));
var fr;
(function(e2) {
  e2.UNEXPECTED_CONTINUE = "unexpected continuation byte", e2.BAD_PREFIX = "bad codepoint prefix", e2.OVERRUN = "string overrun", e2.MISSING_CONTINUE = "missing continuation byte", e2.OUT_OF_RANGE = "out of UTF-8 range", e2.UTF16_SURROGATE = "UTF-16 surrogate", e2.OVERLONG = "overlong representation";
})(fr || (fr = {}));
function Hs(e2, t, r3, i4, n5) {
  return ef.throwArgumentError(`invalid codepoint at offset ${t}; ${e2}`, "bytes", r3);
}
function rf(e2, t, r3, i4, n5) {
  if (e2 === fr.BAD_PREFIX || e2 === fr.UNEXPECTED_CONTINUE) {
    let o4 = 0;
    for (let h5 = t + 1; h5 < r3.length && r3[h5] >> 6 === 2; h5++)
      o4++;
    return o4;
  }
  return e2 === fr.OVERRUN ? r3.length - t - 1 : 0;
}
function Ls(e2, t, r3, i4, n5) {
  return e2 === fr.OVERLONG ? (i4.push(n5), 0) : (i4.push(65533), rf(e2, t, r3));
}
Object.freeze({ error: Hs, ignore: rf, replace: Ls });
function Bi(e2, t = Fr.current) {
  t != Fr.current && (ef.checkNormalize(), e2 = e2.normalize(t));
  let r3 = [];
  for (let i4 = 0; i4 < e2.length; i4++) {
    const n5 = e2.charCodeAt(i4);
    if (n5 < 128)
      r3.push(n5);
    else if (n5 < 2048)
      r3.push(n5 >> 6 | 192), r3.push(n5 & 63 | 128);
    else if ((n5 & 64512) == 55296) {
      i4++;
      const o4 = e2.charCodeAt(i4);
      if (i4 >= e2.length || (o4 & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const h5 = 65536 + ((n5 & 1023) << 10) + (o4 & 1023);
      r3.push(h5 >> 18 | 240), r3.push(h5 >> 12 & 63 | 128), r3.push(h5 >> 6 & 63 | 128), r3.push(h5 & 63 | 128);
    } else
      r3.push(n5 >> 12 | 224), r3.push(n5 >> 6 & 63 | 128), r3.push(n5 & 63 | 128);
  }
  return Ot(r3);
}
function zs(e2) {
  if (e2.length % 4 !== 0)
    throw new Error("bad data");
  let t = [];
  for (let r3 = 0; r3 < e2.length; r3 += 4)
    t.push(parseInt(e2.substring(r3, r3 + 4), 16));
  return t;
}
function Ci(e2, t) {
  t || (t = function(n5) {
    return [parseInt(n5, 16)];
  });
  let r3 = 0, i4 = {};
  return e2.split(",").forEach((n5) => {
    let o4 = n5.split(":");
    r3 += parseInt(o4[0], 16), i4[r3] = t(o4[1]);
  }), i4;
}
function nf(e2) {
  let t = 0;
  return e2.split(",").map((r3) => {
    let i4 = r3.split("-");
    i4.length === 1 ? i4[1] = "0" : i4[1] === "" && (i4[1] = "1");
    let n5 = t + parseInt(i4[0], 16);
    return t = parseInt(i4[1], 16), { l: n5, h: t };
  });
}
nf("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((e2) => parseInt(e2, 16)), Ci("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), Ci("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), Ci("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", zs), nf("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
var ff = "hash/5.7.0";
function js(e2) {
  e2 = atob(e2);
  const t = [];
  for (let r3 = 0; r3 < e2.length; r3++)
    t.push(e2.charCodeAt(r3));
  return Ot(t);
}
function of(e2, t) {
  t == null && (t = 1);
  const r3 = [], i4 = r3.forEach, n5 = function(o4, h5) {
    i4.call(o4, function(p3) {
      h5 > 0 && Array.isArray(p3) ? n5(p3, h5 - 1) : r3.push(p3);
    });
  };
  return n5(e2, t), r3;
}
function Qs(e2) {
  const t = {};
  for (let r3 = 0; r3 < e2.length; r3++) {
    const i4 = e2[r3];
    t[i4[0]] = i4[1];
  }
  return t;
}
function Js(e2) {
  let t = 0;
  function r3() {
    return e2[t++] << 8 | e2[t++];
  }
  let i4 = r3(), n5 = 1, o4 = [0, 1];
  for (let H2 = 1; H2 < i4; H2++)
    o4.push(n5 += r3());
  let h5 = r3(), p3 = t;
  t += h5;
  let A3 = 0, v4 = 0;
  function w4() {
    return A3 == 0 && (v4 = v4 << 8 | e2[t++], A3 = 8), v4 >> --A3 & 1;
  }
  const y6 = 31, S4 = Math.pow(2, y6), N10 = S4 >>> 1, I4 = N10 >> 1, C4 = S4 - 1;
  let T3 = 0;
  for (let H2 = 0; H2 < y6; H2++)
    T3 = T3 << 1 | w4();
  let U3 = [], J = 0, Bt2 = S4;
  for (; ; ) {
    let H2 = Math.floor(((T3 - J + 1) * n5 - 1) / Bt2), L2 = 0, Pt2 = i4;
    for (; Pt2 - L2 > 1; ) {
      let Vt2 = L2 + Pt2 >>> 1;
      H2 < o4[Vt2] ? Pt2 = Vt2 : L2 = Vt2;
    }
    if (L2 == 0)
      break;
    U3.push(L2);
    let W = J + Math.floor(Bt2 * o4[L2] / n5), Rt2 = J + Math.floor(Bt2 * o4[L2 + 1] / n5) - 1;
    for (; !((W ^ Rt2) & N10); )
      T3 = T3 << 1 & C4 | w4(), W = W << 1 & C4, Rt2 = Rt2 << 1 & C4 | 1;
    for (; W & ~Rt2 & I4; )
      T3 = T3 & N10 | T3 << 1 & C4 >>> 1 | w4(), W = W << 1 ^ N10, Rt2 = (Rt2 ^ N10) << 1 | N10 | 1;
    J = W, Bt2 = 1 + Rt2 - W;
  }
  let G = i4 - 4;
  return U3.map((H2) => {
    switch (H2 - G) {
      case 3:
        return G + 65792 + (e2[p3++] << 16 | e2[p3++] << 8 | e2[p3++]);
      case 2:
        return G + 256 + (e2[p3++] << 8 | e2[p3++]);
      case 1:
        return G + e2[p3++];
      default:
        return H2 - 1;
    }
  });
}
function Gs(e2) {
  let t = 0;
  return () => e2[t++];
}
function Ys(e2) {
  return Gs(Js(e2));
}
function Vs(e2) {
  return e2 & 1 ? ~e2 >> 1 : e2 >> 1;
}
function Ws(e2, t) {
  let r3 = Array(e2);
  for (let i4 = 0; i4 < e2; i4++)
    r3[i4] = 1 + t();
  return r3;
}
function sf(e2, t) {
  let r3 = Array(e2);
  for (let i4 = 0, n5 = -1; i4 < e2; i4++)
    r3[i4] = n5 += 1 + t();
  return r3;
}
function Xs(e2, t) {
  let r3 = Array(e2);
  for (let i4 = 0, n5 = 0; i4 < e2; i4++)
    r3[i4] = n5 += Vs(t());
  return r3;
}
function Ur(e2, t) {
  let r3 = sf(e2(), e2), i4 = e2(), n5 = sf(i4, e2), o4 = Ws(i4, e2);
  for (let h5 = 0; h5 < i4; h5++)
    for (let p3 = 0; p3 < o4[h5]; p3++)
      r3.push(n5[h5] + p3);
  return t ? r3.map((h5) => t[h5]) : r3;
}
function Zs(e2) {
  let t = [];
  for (; ; ) {
    let r3 = e2();
    if (r3 == 0)
      break;
    t.push(t0(r3, e2));
  }
  for (; ; ) {
    let r3 = e2() - 1;
    if (r3 < 0)
      break;
    t.push(e0(r3, e2));
  }
  return Qs(of(t));
}
function $s(e2) {
  let t = [];
  for (; ; ) {
    let r3 = e2();
    if (r3 == 0)
      break;
    t.push(r3);
  }
  return t;
}
function af(e2, t, r3) {
  let i4 = Array(e2).fill(void 0).map(() => []);
  for (let n5 = 0; n5 < t; n5++)
    Xs(e2, r3).forEach((o4, h5) => i4[h5].push(o4));
  return i4;
}
function t0(e2, t) {
  let r3 = 1 + t(), i4 = t(), n5 = $s(t), o4 = af(n5.length, 1 + e2, t);
  return of(o4.map((h5, p3) => {
    const A3 = h5[0], v4 = h5.slice(1);
    return Array(n5[p3]).fill(void 0).map((w4, y6) => {
      let S4 = y6 * i4;
      return [A3 + y6 * r3, v4.map((N10) => N10 + S4)];
    });
  }));
}
function e0(e2, t) {
  let r3 = 1 + t();
  return af(r3, 1 + e2, t).map((n5) => [n5[0], n5.slice(1)]);
}
function r0(e2) {
  let t = Ur(e2).sort((i4, n5) => i4 - n5);
  return r3();
  function r3() {
    let i4 = [];
    for (; ; ) {
      let v4 = Ur(e2, t);
      if (v4.length == 0)
        break;
      i4.push({ set: new Set(v4), node: r3() });
    }
    i4.sort((v4, w4) => w4.set.size - v4.set.size);
    let n5 = e2(), o4 = n5 % 3;
    n5 = n5 / 3 | 0;
    let h5 = !!(n5 & 1);
    n5 >>= 1;
    let p3 = n5 == 1, A3 = n5 == 2;
    return { branches: i4, valid: o4, fe0f: h5, save: p3, check: A3 };
  }
}
function i0() {
  return Ys(js("AEQF2AO2DEsA2wIrAGsBRABxAN8AZwCcAEwAqgA0AGwAUgByADcATAAVAFYAIQAyACEAKAAYAFgAGwAjABQAMAAmADIAFAAfABQAKwATACoADgAbAA8AHQAYABoAGQAxADgALAAoADwAEwA9ABMAGgARAA4ADwAWABMAFgAIAA8AHgQXBYMA5BHJAS8JtAYoAe4AExozi0UAH21tAaMnBT8CrnIyhrMDhRgDygIBUAEHcoFHUPe8AXBjAewCjgDQR8IICIcEcQLwATXCDgzvHwBmBoHNAqsBdBcUAykgDhAMShskMgo8AY8jqAQfAUAfHw8BDw87MioGlCIPBwZCa4ELatMAAMspJVgsDl8AIhckSg8XAHdvTwBcIQEiDT4OPhUqbyECAEoAS34Aej8Ybx83JgT/Xw8gHxZ/7w8RICxPHA9vBw+Pfw8PHwAPFv+fAsAvCc8vEr8ivwD/EQ8Bol8OEBa/A78hrwAPCU8vESNvvwWfHwNfAVoDHr+ZAAED34YaAdJPAK7PLwSEgDLHAGo1Pz8Pvx9fUwMrpb8O/58VTzAPIBoXIyQJNF8hpwIVAT8YGAUADDNBaX3RAMomJCg9EhUeA29MABsZBTMNJipjOhc19gcIDR8bBwQHEggCWi6DIgLuAQYA+BAFCha3A5XiAEsqM7UFFgFLhAMjFTMYE1Klnw74nRVBG/ASCm0BYRN/BrsU3VoWy+S0vV8LQx+vN8gF2AC2AK5EAWwApgYDKmAAroQ0NDQ0AT+OCg7wAAIHRAbpNgVcBV0APTA5BfbPFgMLzcYL/QqqA82eBALKCjQCjqYCht0/k2+OAsXQAoP3ASTKDgDw6ACKAUYCMpIKJpRaAE4A5womABzZvs0REEKiACIQAd5QdAECAj4Ywg/wGqY2AVgAYADYvAoCGAEubA0gvAY2ALAAbpbvqpyEAGAEpgQAJgAG7gAgAEACmghUFwCqAMpAINQIwC4DthRAAPcycKgApoIdABwBfCisABoATwBqASIAvhnSBP8aH/ECeAKXAq40NjgDBTwFYQU6AXs3oABgAD4XNgmcCY1eCl5tIFZeUqGgyoNHABgAEQAaABNwWQAmABMATPMa3T34ADldyprmM1M2XociUQgLzvwAXT3xABgAEQAaABNwIGFAnADD8AAgAD4BBJWzaCcIAIEBFMAWwKoAAdq9BWAF5wLQpALEtQAKUSGkahR4GnJM+gsAwCgeFAiUAECQ0BQuL8AAIAAAADKeIheclvFqQAAETr4iAMxIARMgAMIoHhQIAn0E0pDQFC4HhznoAAAAIAI2C0/4lvFqQAAETgBJJwYCAy4ABgYAFAA8MBKYEH4eRhTkAjYeFcgACAYAeABsOqyQ5gRwDayqugEgaIIAtgoACgDmEABmBAWGme5OBJJA2m4cDeoAmITWAXwrMgOgAGwBCh6CBXYF1Tzg1wKAAFdiuABRAFwAXQBsAG8AdgBrAHYAbwCEAHEwfxQBVE5TEQADVFhTBwBDANILAqcCzgLTApQCrQL6vAAMAL8APLhNBKkE6glGKTAU4Dr4N2EYEwBCkABKk8rHAbYBmwIoAiU4Ajf/Aq4CowCAANIChzgaNBsCsTgeODcFXrgClQKdAqQBiQGYAqsCsjTsNHsfNPA0ixsAWTWiOAMFPDQSNCk2BDZHNow2TTZUNhk28Jk9VzI3QkEoAoICoQKwAqcAQAAxBV4FXbS9BW47YkIXP1ciUqs05DS/FwABUwJW11e6nHuYZmSh/RAYA8oMKvZ8KASoUAJYWAJ6ILAsAZSoqjpgA0ocBIhmDgDWAAawRDQoAAcuAj5iAHABZiR2AIgiHgCaAU68ACxuHAG0ygM8MiZIAlgBdF4GagJqAPZOHAMuBgoATkYAsABiAHgAMLoGDPj0HpKEBAAOJgAuALggTAHWAeAMEDbd20Uege0ADwAWADkAQgA9OHd+2MUQZBBhBgNNDkxxPxUQArEPqwvqERoM1irQ090ANK4H8ANYB/ADWANYB/AH8ANYB/ADWANYA1gDWBwP8B/YxRBkD00EcgWTBZAE2wiIJk4RhgctCNdUEnQjHEwDSgEBIypJITuYMxAlR0wRTQgIATZHbKx9PQNMMbBU+pCnA9AyVDlxBgMedhKlAC8PeCE1uk6DekxxpQpQT7NX9wBFBgASqwAS5gBJDSgAUCwGPQBI4zTYABNGAE2bAE3KAExdGABKaAbgAFBXAFCOAFBJABI2SWdObALDOq0//QomCZhvwHdTBkIQHCemEPgMNAG2ATwN7kvZBPIGPATKH34ZGg/OlZ0Ipi3eDO4m5C6igFsj9iqEBe5L9TzeC05RaQ9aC2YJ5DpkgU8DIgEOIowK3g06CG4Q9ArKbA3mEUYHOgPWSZsApgcCCxIdNhW2JhFirQsKOXgG/Br3C5AmsBMqev0F1BoiBk4BKhsAANAu6IWxWjJcHU9gBgQLJiPIFKlQIQ0mQLh4SRocBxYlqgKSQ3FKiFE3HpQh9zw+DWcuFFF9B/Y8BhlQC4I8n0asRQ8R0z6OPUkiSkwtBDaALDAnjAnQD4YMunxzAVoJIgmyDHITMhEYN8YIOgcaLpclJxYIIkaWYJsE+KAD9BPSAwwFQAlCBxQDthwuEy8VKgUOgSXYAvQ21i60ApBWgQEYBcwPJh/gEFFH4Q7qCJwCZgOEJewALhUiABginAhEZABgj9lTBi7MCMhqbSN1A2gU6GIRdAeSDlgHqBw0FcAc4nDJXgyGCSiksAlcAXYJmgFgBOQICjVcjKEgQmdUi1kYnCBiQUBd/QIyDGYVoES+h3kCjA9sEhwBNgF0BzoNAgJ4Ee4RbBCWCOyGBTW2M/k6JgRQIYQgEgooA1BszwsoJvoM+WoBpBJjAw00PnfvZ6xgtyUX/gcaMsZBYSHyC5NPzgydGsIYQ1QvGeUHwAP0GvQn60FYBgADpAQUOk4z7wS+C2oIjAlAAEoOpBgH2BhrCnKM0QEyjAG4mgNYkoQCcJAGOAcMAGgMiAV65gAeAqgIpAAGANADWAA6Aq4HngAaAIZCAT4DKDABIuYCkAOUCDLMAZYwAfQqBBzEDBYA+DhuSwLDsgKAa2ajBd5ZAo8CSjYBTiYEBk9IUgOwcuIA3ABMBhTgSAEWrEvMG+REAeBwLADIAPwABjYHBkIBzgH0bgC4AWALMgmjtLYBTuoqAIQAFmwB2AKKAN4ANgCA8gFUAE4FWvoF1AJQSgESMhksWGIBvAMgATQBDgB6BsyOpsoIIARuB9QCEBwV4gLvLwe2AgMi4BPOQsYCvd9WADIXUu5eZwqoCqdeaAC0YTQHMnM9UQAPH6k+yAdy/BZIiQImSwBQ5gBQQzSaNTFWSTYBpwGqKQK38AFtqwBI/wK37gK3rQK3sAK6280C0gK33AK3zxAAUEIAUD9SklKDArekArw5AEQAzAHCO147WTteO1k7XjtZO147WTteO1kDmChYI03AVU0oJqkKbV9GYewMpw3VRMk6ShPcYFJgMxPJLbgUwhXPJVcZPhq9JwYl5VUKDwUt1GYxCC00dhe9AEApaYNCY4ceMQpMHOhTklT5LRwAskujM7ANrRsWREEFSHXuYisWDwojAmSCAmJDXE6wXDchAqH4AmiZAmYKAp+FOBwMAmY8AmYnBG8EgAN/FAN+kzkHOXgYOYM6JCQCbB4CMjc4CwJtyAJtr/CLADRoRiwBaADfAOIASwYHmQyOAP8MwwAOtgJ3MAJ2o0ACeUxEAni7Hl3cRa9G9AJ8QAJ6yQJ9CgJ88UgBSH5kJQAsFklZSlwWGErNAtECAtDNSygDiFADh+dExpEzAvKiXQQDA69Lz0wuJgTQTU1NsAKLQAKK2cIcCB5EaAa4Ao44Ao5dQZiCAo7aAo5deVG1UzYLUtVUhgKT/AKTDQDqAB1VH1WwVdEHLBwplocy4nhnRTw6ApegAu+zWCKpAFomApaQApZ9nQCqWa1aCoJOADwClrYClk9cRVzSApnMApllXMtdCBoCnJw5wzqeApwXAp+cAp65iwAeEDIrEAKd8gKekwC2PmE1YfACntQCoG8BqgKeoCACnk+mY8lkKCYsAiewAiZ/AqD8AqBN2AKmMAKlzwKoAAB+AqfzaH1osgAESmodatICrOQCrK8CrWgCrQMCVx4CVd0CseLYAx9PbJgCsr4OArLpGGzhbWRtSWADJc4Ctl08QG6RAylGArhfArlIFgK5K3hwN3DiAr0aAy2zAzISAr6JcgMDM3ICvhtzI3NQAsPMAsMFc4N0TDZGdOEDPKgDPJsDPcACxX0CxkgCxhGKAshqUgLIRQLJUALJLwJkngLd03h6YniveSZL0QMYpGcDAmH1GfSVJXsMXpNevBICz2wCz20wTFTT9BSgAMeuAs90ASrrA04TfkwGAtwoAtuLAtJQA1JdA1NgAQIDVY2AikABzBfuYUZ2AILPg44C2sgC2d+EEYRKpz0DhqYAMANkD4ZyWvoAVgLfZgLeuXR4AuIw7RUB8zEoAfScAfLTiALr9ALpcXoAAur6AurlAPpIAboC7ooC652Wq5cEAu5AA4XhmHpw4XGiAvMEAGoDjheZlAL3FAORbwOSiAL3mQL52gL4Z5odmqy8OJsfA52EAv77ARwAOp8dn7QDBY4DpmsDptoA0sYDBmuhiaIGCgMMSgFgASACtgNGAJwEgLpoBgC8BGzAEowcggCEDC6kdjoAJAM0C5IKRoABZCgiAIzw3AYBLACkfng9ogigkgNmWAN6AEQCvrkEVqTGAwCsBRbAA+4iQkMCHR072jI2PTbUNsk2RjY5NvA23TZKNiU3EDcZN5I+RTxDRTBCJkK5VBYKFhZfwQCWygU3AJBRHpu+OytgNxa61A40GMsYjsn7BVwFXQVcBV0FaAVdBVwFXQVcBV0FXAVdBVwFXUsaCNyKAK4AAQUHBwKU7oICoW1e7jAEzgPxA+YDwgCkBFDAwADABKzAAOxFLhitA1UFTDeyPkM+bj51QkRCuwTQWWQ8X+0AWBYzsACNA8xwzAGm7EZ/QisoCTAbLDs6fnLfb8H2GccsbgFw13M1HAVkBW/Jxsm9CNRO8E8FDD0FBQw9FkcClOYCoMFegpDfADgcMiA2AJQACB8AsigKAIzIEAJKeBIApY5yPZQIAKQiHb4fvj5BKSRPQrZCOz0oXyxgOywfKAnGbgMClQaCAkILXgdeCD9IIGUgQj5fPoY+dT52Ao5CM0dAX9BTVG9SDzFwWTQAbxBzJF/lOEIQQglCCkKJIAls5AcClQICoKPMODEFxhi6KSAbiyfIRrMjtCgdWCAkPlFBIitCsEJRzAbMAV/OEyQzDg0OAQQEJ36i328/Mk9AybDJsQlq3tDRApUKAkFzXf1d/j9uALYP6hCoFgCTGD8kPsFKQiobrm0+zj0KSD8kPnVCRBwMDyJRTHFgMTJa5rwXQiQ2YfI/JD7BMEJEHGINTw4TOFlIRzwJO0icMQpyPyQ+wzJCRBv6DVgnKB01NgUKj2bwYzMqCoBkznBgEF+zYDIocwRIX+NgHj4HICNfh2C4CwdwFWpTG/lgUhYGAwRfv2Ts8mAaXzVgml/XYIJfuWC4HI1gUF9pYJZgMR6ilQHMAOwLAlDRefC0in4AXAEJA6PjCwc0IamOANMMCAECRQDFNRTZBgd+CwQlRA+r6+gLBDEFBnwUBXgKATIArwAGRAAHA3cDdAN2A3kDdwN9A3oDdQN7A30DfAN4A3oDfQAYEAAlAtYASwMAUAFsAHcKAHcAmgB3AHUAdQB2AHVu8UgAygDAAHcAdQB1AHYAdQALCgB3AAsAmgB3AAsCOwB3AAtu8UgAygDAAHgKAJoAdwB3AHUAdQB2AHUAeAB1AHUAdgB1bvFIAMoAwAALCgCaAHcACwB3AAsCOwB3AAtu8UgAygDAAH4ACwGgALcBpwC6AahdAu0COwLtbvFIAMoAwAALCgCaAu0ACwLtAAsCOwLtAAtu8UgAygDAA24ACwNvAAu0VsQAAzsAABCkjUIpAAsAUIusOggWcgMeBxVsGwL67U/2HlzmWOEeOgALASvuAAseAfpKUpnpGgYJDCIZM6YyARUE9ThqAD5iXQgnAJYJPnOzw0ZAEZxEKsIAkA4DhAHnTAIDxxUDK0lxCQlPYgIvIQVYJQBVqE1GakUAKGYiDToSBA1EtAYAXQJYAIF8GgMHRyAAIAjOe9YncekRAA0KACUrjwE7Ayc6AAYWAqaiKG4McEcqANoN3+Mg9TwCBhIkuCny+JwUQ29L008JluRxu3K+oAdqiHOqFH0AG5SUIfUJ5SxCGfxdipRzqTmT4V5Zb+r1Uo4Vm+NqSSEl2mNvR2JhIa8SpYO6ntdwFXHCWTCK8f2+Hxo7uiG3drDycAuKIMP5bhi06ACnqArH1rz4Rqg//lm6SgJGEVbF9xJHISaR6HxqxSnkw6shDnelHKNEfGUXSJRJ1GcsmtJw25xrZMDK9gXSm1/YMkdX4/6NKYOdtk/NQ3/NnDASjTc3fPjIjW/5sVfVObX2oTDWkr1dF9f3kxBsD3/3aQO8hPfRz+e0uEiJqt1161griu7gz8hDDwtpy+F+BWtefnKHZPAxcZoWbnznhJpy0e842j36bcNzGnIEusgGX0a8ZxsnjcSsPDZ09yZ36fCQbriHeQ72JRMILNl6ePPf2HWoVwgWAm1fb3V2sAY0+B6rAXqSwPBgseVmoqsBTSrm91+XasMYYySI8eeRxH3ZvHkMz3BQ5aJ3iUVbYPNM3/7emRtjlsMgv/9VyTsyt/mK+8fgWeT6SoFaclXqn42dAIsvAarF5vNNWHzKSkKQ/8Hfk5ZWK7r9yliOsooyBjRhfkHP4Q2DkWXQi6FG/9r/IwbmkV5T7JSopHKn1pJwm9tb5Ot0oyN1Z2mPpKXHTxx2nlK08fKk1hEYA8WgVVWL5lgx0iTv+KdojJeU23ZDjmiubXOxVXJKKi2Wjuh2HLZOFLiSC7Tls5SMh4f+Pj6xUSrNjFqLGehRNB8lC0QSLNmkJJx/wSG3MnjE9T1CkPwJI0wH2lfzwETIiVqUxg0dfu5q39Gt+hwdcxkhhNvQ4TyrBceof3Mhs/IxFci1HmHr4FMZgXEEczPiGCx0HRwzAqDq2j9AVm1kwN0mRVLWLylgtoPNapF5cY4Y1wJh/e0BBwZj44YgZrDNqvD/9Hv7GFYdUQeDJuQ3EWI4HaKqavU1XjC/n41kT4L79kqGq0kLhdTZvgP3TA3fS0ozVz+5piZsoOtIvBUFoMKbNcmBL6YxxaUAusHB38XrS8dQMnQwJfUUkpRoGr5AUeWicvBTzyK9g77+yCkf5PAysL7r/JjcZgrbvRpMW9iyaxZvKO6ceZN2EwIxKwVFPuvFuiEPGCoagbMo+SpydLrXqBzNCDGFCrO/rkcwa2xhokQZ5CdZ0AsU3JfSqJ6n5I14YA+P/uAgfhPU84Tlw7cEFfp7AEE8ey4sP12PTt4Cods1GRgDOB5xvyiR5m+Bx8O5nBCNctU8BevfV5A08x6RHd5jcwPTMDSZJOedIZ1cGQ704lxbAzqZOP05ZxaOghzSdvFBHYqomATARyAADK4elP8Ly3IrUZKfWh23Xy20uBUmLS4Pfagu9+oyVa2iPgqRP3F2CTUsvJ7+RYnN8fFZbU/HVvxvcFFDKkiTqV5UBZ3Gz54JAKByi9hkKMZJvuGgcSYXFmw08UyoQyVdfTD1/dMkCHXcTGAKeROgArsvmRrQTLUOXioOHGK2QkjHuoYFgXciZoTJd6Fs5q1QX1G+p/e26hYsEf7QZD1nnIyl/SFkNtYYmmBhpBrxl9WbY0YpHWRuw2Ll/tj9mD8P4snVzJl4F9J+1arVeTb9E5r2ILH04qStjxQNwn3m4YNqxmaNbLAqW2TN6LidwuJRqS+NXbtqxoeDXpxeGWmxzSkWxjkyCkX4NQRme6q5SAcC+M7+9ETfA/EwrzQajKakCwYyeunP6ZFlxU2oMEn1Pz31zeStW74G406ZJFCl1wAXIoUKkWotYEpOuXB1uVNxJ63dpJEqfxBeptwIHNrPz8BllZoIcBoXwgfJ+8VAUnVPvRvexnw0Ma/WiGYuJO5y8QTvEYBigFmhUxY5RqzE8OcywN/8m4UYrlaniJO75XQ6KSo9+tWHlu+hMi0UVdiKQp7NelnoZUzNaIyBPVeOwK6GNp+FfHuPOoyhaWuNvTYFkvxscMQWDh+zeFCFkgwbXftiV23ywJ4+uwRqmg9k3KzwIQpzppt8DBBOMbrqwQM5Gb05sEwdKzMiAqOloaA/lr0KA+1pr0/+HiWoiIjHA/wir2nIuS3PeU/ji3O6ZwoxcR1SZ9FhtLC5S0FIzFhbBWcGVP/KpxOPSiUoAdWUpqKH++6Scz507iCcxYI6rdMBICPJZea7OcmeFw5mObJSiqpjg2UoWNIs+cFhyDSt6geV5qgi3FunmwwDoGSMgerFOZGX1m0dMCYo5XOruxO063dwENK9DbnVM9wYFREzh4vyU1WYYJ/LRRp6oxgjqP/X5a8/4Af6p6NWkQferzBmXme0zY/4nwMJm/wd1tIqSwGz+E3xPEAOoZlJit3XddD7/BT1pllzOx+8bmQtANQ/S6fZexc6qi3W+Q2xcmXTUhuS5mpHQRvcxZUN0S5+PL9lXWUAaRZhEH8hTdAcuNMMCuVNKTEGtSUKNi3O6KhSaTzck8csZ2vWRZ+d7mW8c4IKwXIYd25S/zIftPkwPzufjEvOHWVD1m+FjpDVUTV0DGDuHj6QnaEwLu/dEgdLQOg9E1Sro9XHJ8ykLAwtPu+pxqKDuFexqON1sKQm7rwbE1E68UCfA/erovrTCG+DBSNg0l4goDQvZN6uNlbyLpcZAwj2UclycvLpIZMgv4yRlpb3YuMftozorbcGVHt/VeDV3+Fdf1TP0iuaCsPi2G4XeGhsyF1ubVDxkoJhmniQ0/jSg/eYML9KLfnCFgISWkp91eauR3IQvED0nAPXK+6hPCYs+n3+hCZbiskmVMG2da+0EsZPonUeIY8EbfusQXjsK/eFDaosbPjEfQS0RKG7yj5GG69M7MeO1HmiUYocgygJHL6M1qzUDDwUSmr99V7Sdr2F3JjQAJY+F0yH33Iv3+C9M38eML7gTgmNu/r2bUMiPvpYbZ6v1/IaESirBHNa7mPKn4dEmYg7v/+HQgPN1G79jBQ1+soydfDC2r+h2Bl/KIc5KjMK7OH6nb1jLsNf0EHVe2KBiE51ox636uyG6Lho0t3J34L5QY/ilE3mikaF4HKXG1mG1rCevT1Vv6GavltxoQe/bMrpZvRggnBxSEPEeEzkEdOxTnPXHVjUYdw8JYvjB/o7Eegc3Ma+NUxLLnsK0kJlinPmUHzHGtrk5+CAbVzFOBqpyy3QVUnzTDfC/0XD94/okH+OB+i7g9lolhWIjSnfIb+Eq43ZXOWmwvjyV/qqD+t0e+7mTEM74qP/Ozt8nmC7mRpyu63OB4KnUzFc074SqoyPUAgM+/TJGFo6T44EHnQU4X4z6qannVqgw/U7zCpwcmXV1AubIrvOmkKHazJAR55ePjp5tLBsN8vAqs3NAHdcEHOR2xQ0lsNAFzSUuxFQCFYvXLZJdOj9p4fNq6p0HBGUik2YzaI4xySy91KzhQ0+q1hjxvImRwPRf76tChlRkhRCi74NXZ9qUNeIwP+s5p+3m5nwPdNOHgSLD79n7O9m1n1uDHiMntq4nkYwV5OZ1ENbXxFd4PgrlvavZsyUO4MqYlqqn1O8W/I1dEZq5dXhrbETLaZIbC2Kj/Aa/QM+fqUOHdf0tXAQ1huZ3cmWECWSXy/43j35+Mvq9xws7JKseriZ1pEWKc8qlzNrGPUGcVgOa9cPJYIJsGnJTAUsEcDOEVULO5x0rXBijc1lgXEzQQKhROf8zIV82w8eswc78YX11KYLWQRcgHNJElBxfXr72lS2RBSl07qTKorO2uUDZr3sFhYsvnhLZn0A94KRzJ/7DEGIAhW5ZWFpL8gEwu1aLA9MuWZzNwl8Oze9Y+bX+v9gywRVnoB5I/8kXTXU3141yRLYrIOOz6SOnyHNy4SieqzkBXharjfjqq1q6tklaEbA8Qfm2DaIPs7OTq/nvJBjKfO2H9bH2cCMh1+5gspfycu8f/cuuRmtDjyqZ7uCIMyjdV3a+p3fqmXsRx4C8lujezIFHnQiVTXLXuI1XrwN3+siYYj2HHTvESUx8DlOTXpak9qFRK+L3mgJ1WsD7F4cu1aJoFoYQnu+wGDMOjJM3kiBQWHCcvhJ/HRdxodOQp45YZaOTA22Nb4XKCVxqkbwMYFhzYQYIAnCW8FW14uf98jhUG2zrKhQQ0q0CEq0t5nXyvUyvR8DvD69LU+g3i+HFWQMQ8PqZuHD+sNKAV0+M6EJC0szq7rEr7B5bQ8BcNHzvDMc9eqB5ZCQdTf80Obn4uzjwpYU7SISdtV0QGa9D3Wrh2BDQtpBKxaNFV+/Cy2P/Sv+8s7Ud0Fd74X4+o/TNztWgETUapy+majNQ68Lq3ee0ZO48VEbTZYiH1Co4OlfWef82RWeyUXo7woM03PyapGfikTnQinoNq5z5veLpeMV3HCAMTaZmA1oGLAn7XS3XYsz+XK7VMQsc4XKrmDXOLU/pSXVNUq8dIqTba///3x6LiLS6xs1xuCAYSfcQ3+rQgmu7uvf3THKt5Ooo97TqcbRqxx7EASizaQCBQllG/rYxVapMLgtLbZS64w1MDBMXX+PQpBKNwqUKOf2DDRDUXQf9EhOS0Qj4nTmlA8dzSLz/G1d+Ud8MTy/6ghhdiLpeerGY/UlDOfiuqFsMUU5/UYlP+BAmgRLuNpvrUaLlVkrqDievNVEAwF+4CoM1MZTmjxjJMsKJq+u8Zd7tNCUFy6LiyYXRJQ4VyvEQFFaCGKsxIwQkk7EzZ6LTJq2hUuPhvAW+gQnSG6J+MszC+7QCRHcnqDdyNRJ6T9xyS87A6MDutbzKGvGktpbXqtzWtXb9HsfK2cBMomjN9a4y+TaJLnXxAeX/HWzmf4cR4vALt/P4w4qgKY04ml4ZdLOinFYS6cup3G/1ie4+t1eOnpBNlqGqs75ilzkT4+DsZQxNvaSKJ//6zIbbk/M7LOhFmRc/1R+kBtz7JFGdZm/COotIdvQoXpTqP/1uqEUmCb/QWoGLMwO5ANcHzxdY48IGP5+J+zKOTBFZ4Pid+GTM+Wq12MV/H86xEJptBa6T+p3kgpwLedManBHC2GgNrFpoN2xnrMz9WFWX/8/ygSBkavq2Uv7FdCsLEYLu9LLIvAU0bNRDtzYl+/vXmjpIvuJFYjmI0im6QEYqnIeMsNjXG4vIutIGHijeAG/9EDBozKV5cldkHbLxHh25vT+ZEzbhXlqvpzKJwcEgfNwLAKFeo0/pvEE10XDB+EXRTXtSzJozQKFFAJhMxYkVaCW+E9AL7tMeU8acxidHqzb6lX4691UsDpy/LLRmT+epgW56+5Cw8tB4kMUv6s9lh3eRKbyGs+H/4mQMaYzPTf2OOdokEn+zzgvoD3FqNKk8QqGAXVsqcGdXrT62fSPkR2vROFi68A6se86UxRUk4cajfPyCC4G5wDhD+zNq4jodQ4u4n/m37Lr36n4LIAAsVr02dFi9AiwA81MYs2rm4eDlDNmdMRvEKRHfBwW5DdMNp0jPFZMeARqF/wL4XBfd+EMLBfMzpH5GH6NaW+1vrvMdg+VxDzatk3MXgO3ro3P/DpcC6+Mo4MySJhKJhSR01SGGGp5hPWmrrUgrv3lDnP+HhcI3nt3YqBoVAVTBAQT5iuhTg8nvPtd8ZeYj6w1x6RqGUBrSku7+N1+BaasZvjTk64RoIDlL8brpEcJx3OmY7jLoZsswdtmhfC/G21llXhITOwmvRDDeTTPbyASOa16cF5/A1fZAidJpqju3wYAy9avPR1ya6eNp9K8XYrrtuxlqi+bDKwlfrYdR0RRiKRVTLOH85+ZY7XSmzRpfZBJjaTa81VDcJHpZnZnSQLASGYW9l51ZV/h7eVzTi3Hv6hUsgc/51AqJRTkpbFVLXXszoBL8nBX0u/0jBLT8nH+fJePbrwURT58OY+UieRjd1vs04w0VG5VN2U6MoGZkQzKN/ptz0Q366dxoTGmj7i1NQGHi9GgnquXFYdrCfZBmeb7s0T6yrdlZH5cZuwHFyIJ/kAtGsTg0xH5taAAq44BAk1CPk9KVVbqQzrCUiFdF/6gtlPQ8bHHc1G1W92MXGZ5HEHftyLYs8mbD/9xYRUWkHmlM0zC2ilJlnNgV4bfALpQghxOUoZL7VTqtCHIaQSXm+YUMnpkXybnV+A6xlm2CVy8fn0Xlm2XRa0+zzOa21JWWmixfiPMSCZ7qA4rS93VN3pkpF1s5TonQjisHf7iU9ZGvUPOAKZcR1pbeVf/Ul7OhepGCaId9wOtqo7pJ7yLcBZ0pFkOF28y4zEI/kcUNmutBHaQpBdNM8vjCS6HZRokkeo88TBAjGyG7SR+6vUgTcyK9Imalj0kuxz0wmK+byQU11AiJFk/ya5dNduRClcnU64yGu/ieWSeOos1t3ep+RPIWQ2pyTYVbZltTbsb7NiwSi3AV+8KLWk7LxCnfZUetEM8ThnsSoGH38/nyAwFguJp8FjvlHtcWZuU4hPva0rHfr0UhOOJ/F6vS62FW7KzkmRll2HEc7oUq4fyi5T70Vl7YVIfsPHUCdHesf9Lk7WNVWO75JDkYbMI8TOW8JKVtLY9d6UJRITO8oKo0xS+o99Yy04iniGHAaGj88kEWgwv0OrHdY/nr76DOGNS59hXCGXzTKUvDl9iKpLSWYN1lxIeyywdNpTkhay74w2jFT6NS8qkjo5CxA1yfSYwp6AJIZNKIeEK5PJAW7ORgWgwp0VgzYpqovMrWxbu+DGZ6Lhie1RAqpzm8VUzKJOH3mCzWuTOLsN3VT/dv2eeYe9UjbR8YTBsLz7q60VN1sU51k+um1f8JxD5pPhbhSC8rRaB454tmh6YUWrJI3+GWY0qeWioj/tbkYITOkJaeuGt4JrJvHA+l0Gu7kY7XOaa05alMnRWVCXqFgLIwSY4uF59Ue5SU4QKuc/HamDxbr0x6csCetXGoP7Qn1Bk/J9DsynO/UD6iZ1Hyrz+jit0hDCwi/E9OjgKTbB3ZQKQ/0ZOvevfNHG0NK4Aj3Cp7NpRk07RT1i/S0EL93Ag8GRgKI9CfpajKyK6+Jj/PI1KO5/85VAwz2AwzP8FTBb075IxCXv6T9RVvWT2tUaqxDS92zrGUbWzUYk9mSs82pECH+fkqsDt93VW++4YsR/dHCYcQSYTO/KaBMDj9LSD/J/+z20Kq8XvZUAIHtm9hRPP3ItbuAu2Hm5lkPs92pd7kCxgRs0xOVBnZ13ccdA0aunrwv9SdqElJRC3g+oCu+nXyCgmXUs9yMjTMAIHfxZV+aPKcZeUBWt057Xo85Ks1Ir5gzEHCWqZEhrLZMuF11ziGtFQUds/EESajhagzcKsxamcSZxGth4UII+adPhQkUnx2WyN+4YWR+r3f8MnkyGFuR4zjzxJS8WsQYR5PTyRaD9ixa6Mh741nBHbzfjXHskGDq179xaRNrCIB1z1xRfWfjqw2pHc1zk9xlPpL8sQWAIuETZZhbnmL54rceXVNRvUiKrrqIkeogsl0XXb17ylNb0f4GA9Wd44vffEG8FSZGHEL2fbaTGRcSiCeA8PmA/f6Hz8HCS76fXUHwgwkzSwlI71ekZ7Fapmlk/KC+Hs8hUcw3N2LN5LhkVYyizYFl/uPeVP5lsoJHhhfWvvSWruCUW1ZcJOeuTbrDgywJ/qG07gZJplnTvLcYdNaH0KMYOYMGX+rB4NGPFmQsNaIwlWrfCezxre8zXBrsMT+edVLbLqN1BqB76JH4BvZTqUIMfGwPGEn+EnmTV86fPBaYbFL3DFEhjB45CewkXEAtJxk4/Ms2pPXnaRqdky0HOYdcUcE2zcXq4vaIvW2/v0nHFJH2XXe22ueDmq/18XGtELSq85j9X8q0tcNSSKJIX8FTuJF/Pf8j5PhqG2u+osvsLxYrvvfeVJL+4tkcXcr9JV7v0ERmj/X6fM3NC4j6dS1+9Umr2oPavqiAydTZPLMNRGY23LO9zAVDly7jD+70G5TPPLdhRIl4WxcYjLnM+SNcJ26FOrkrISUtPObIz5Zb3AG612krnpy15RMW+1cQjlnWFI6538qky9axd2oJmHIHP08KyP0ubGO+TQNOYuv2uh17yCIvR8VcStw7o1g0NM60sk+8Tq7YfIBJrtp53GkvzXH7OA0p8/n/u1satf/VJhtR1l8Wa6Gmaug7haSpaCaYQax6ta0mkutlb+eAOSG1aobM81D9A4iS1RRlzBBoVX6tU1S6WE2N9ORY6DfeLRC4l9Rvr5h95XDWB2mR1d4WFudpsgVYwiTwT31ljskD8ZyDOlm5DkGh9N/UB/0AI5Xvb8ZBmai2hQ4BWMqFwYnzxwB26YHSOv9WgY3JXnvoN+2R4rqGVh/LLDMtpFP+SpMGJNWvbIl5SOodbCczW2RKleksPoUeGEzrjtKHVdtZA+kfqO+rVx/iclCqwoopepvJpSTDjT+b9GWylGRF8EDbGlw6eUzmJM95Ovoz+kwLX3c2fTjFeYEsE7vUZm3mqdGJuKh2w9/QGSaqRHs99aScGOdDqkFcACoqdbBoQqqjamhH6Q9ng39JCg3lrGJwd50Qk9ovnqBTr8MME7Ps2wiVfygUmPoUBJJfJWX5Nda0nuncbFkA=="));
}
var kr = i0();
new Set(Ur(kr)), new Set(Ur(kr)), Zs(kr), r0(kr), new z(ff);
var n0 = new Uint8Array(32);
n0.fill(0);
var f0 = `Ethereum Signed Message:
`;
function uf(e2) {
  return typeof e2 == "string" && (e2 = Bi(e2)), Si(Rs([Bi(f0), Bi(String(e2.length)), e2]));
}
var o0 = "rlp/5.7.0";
new z(o0);
var s0 = "address/5.7.0";
var yr = new z(s0);
function hf(e2) {
  Jt(e2, 20) || yr.throwArgumentError("invalid address", "address", e2), e2 = e2.toLowerCase();
  const t = e2.substring(2).split(""), r3 = new Uint8Array(40);
  for (let n5 = 0; n5 < 40; n5++)
    r3[n5] = t[n5].charCodeAt(0);
  const i4 = Ot(Si(r3));
  for (let n5 = 0; n5 < 40; n5 += 2)
    i4[n5 >> 1] >> 4 >= 8 && (t[n5] = t[n5].toUpperCase()), (i4[n5 >> 1] & 15) >= 8 && (t[n5 + 1] = t[n5 + 1].toUpperCase());
  return "0x" + t.join("");
}
var a0 = 9007199254740991;
function u0(e2) {
  return Math.log10 ? Math.log10(e2) : Math.log(e2) / Math.LN10;
}
var Ri = {};
for (let e2 = 0; e2 < 10; e2++)
  Ri[String(e2)] = String(e2);
for (let e2 = 0; e2 < 26; e2++)
  Ri[String.fromCharCode(65 + e2)] = String(10 + e2);
var cf = Math.floor(u0(a0));
function h0(e2) {
  e2 = e2.toUpperCase(), e2 = e2.substring(4) + e2.substring(0, 2) + "00";
  let t = e2.split("").map((i4) => Ri[i4]).join("");
  for (; t.length >= cf; ) {
    let i4 = t.substring(0, cf);
    t = parseInt(i4, 10) % 97 + t.substring(i4.length);
  }
  let r3 = String(98 - parseInt(t, 10) % 97);
  for (; r3.length < 2; )
    r3 = "0" + r3;
  return r3;
}
function c0(e2) {
  let t = null;
  if (typeof e2 != "string" && yr.throwArgumentError("invalid address", "address", e2), e2.match(/^(0x)?[0-9a-fA-F]{40}$/))
    e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), t = hf(e2), e2.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e2 && yr.throwArgumentError("bad address checksum", "address", e2);
  else if (e2.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (e2.substring(2, 4) !== h0(e2) && yr.throwArgumentError("bad icap checksum", "address", e2), t = ks(e2.substring(4)); t.length < 40; )
      t = "0" + t;
    t = hf("0x" + t);
  } else
    yr.throwArgumentError("invalid address", "address", e2);
  return t;
}
var l0 = "properties/5.7.0";
new z(l0);
function wr(e2, t, r3) {
  Object.defineProperty(e2, t, { enumerable: true, value: r3, writable: false });
}
new z(ff);
var d0 = new Uint8Array(32);
d0.fill(0), V.from(-1);
var p0 = V.from(0);
var v0 = V.from(1);
V.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), oe(v0.toHexString(), 32), oe(p0.toHexString(), 32);
var se = {};
var Q = {};
var xr = lf;
function lf(e2, t) {
  if (!e2)
    throw new Error(t || "Assertion failed");
}
lf.equal = function(t, r3, i4) {
  if (t != r3)
    throw new Error(i4 || "Assertion failed: " + t + " != " + r3);
};
var Oi = { exports: {} };
typeof Object.create == "function" ? Oi.exports = function(t, r3) {
  r3 && (t.super_ = r3, t.prototype = Object.create(r3.prototype, { constructor: { value: t, enumerable: false, writable: true, configurable: true } }));
} : Oi.exports = function(t, r3) {
  if (r3) {
    t.super_ = r3;
    var i4 = function() {
    };
    i4.prototype = r3.prototype, t.prototype = new i4(), t.prototype.constructor = t;
  }
};
var g0 = xr;
var m0 = Oi.exports;
Q.inherits = m0;
function A0(e2, t) {
  return (e2.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= e2.length ? false : (e2.charCodeAt(t + 1) & 64512) === 56320;
}
function b0(e2, t) {
  if (Array.isArray(e2))
    return e2.slice();
  if (!e2)
    return [];
  var r3 = [];
  if (typeof e2 == "string")
    if (t) {
      if (t === "hex")
        for (e2 = e2.replace(/[^a-z0-9]+/ig, ""), e2.length % 2 !== 0 && (e2 = "0" + e2), n5 = 0; n5 < e2.length; n5 += 2)
          r3.push(parseInt(e2[n5] + e2[n5 + 1], 16));
    } else
      for (var i4 = 0, n5 = 0; n5 < e2.length; n5++) {
        var o4 = e2.charCodeAt(n5);
        o4 < 128 ? r3[i4++] = o4 : o4 < 2048 ? (r3[i4++] = o4 >> 6 | 192, r3[i4++] = o4 & 63 | 128) : A0(e2, n5) ? (o4 = 65536 + ((o4 & 1023) << 10) + (e2.charCodeAt(++n5) & 1023), r3[i4++] = o4 >> 18 | 240, r3[i4++] = o4 >> 12 & 63 | 128, r3[i4++] = o4 >> 6 & 63 | 128, r3[i4++] = o4 & 63 | 128) : (r3[i4++] = o4 >> 12 | 224, r3[i4++] = o4 >> 6 & 63 | 128, r3[i4++] = o4 & 63 | 128);
      }
  else
    for (n5 = 0; n5 < e2.length; n5++)
      r3[n5] = e2[n5] | 0;
  return r3;
}
Q.toArray = b0;
function y0(e2) {
  for (var t = "", r3 = 0; r3 < e2.length; r3++)
    t += pf(e2[r3].toString(16));
  return t;
}
Q.toHex = y0;
function df(e2) {
  var t = e2 >>> 24 | e2 >>> 8 & 65280 | e2 << 8 & 16711680 | (e2 & 255) << 24;
  return t >>> 0;
}
Q.htonl = df;
function w0(e2, t) {
  for (var r3 = "", i4 = 0; i4 < e2.length; i4++) {
    var n5 = e2[i4];
    t === "little" && (n5 = df(n5)), r3 += vf(n5.toString(16));
  }
  return r3;
}
Q.toHex32 = w0;
function pf(e2) {
  return e2.length === 1 ? "0" + e2 : e2;
}
Q.zero2 = pf;
function vf(e2) {
  return e2.length === 7 ? "0" + e2 : e2.length === 6 ? "00" + e2 : e2.length === 5 ? "000" + e2 : e2.length === 4 ? "0000" + e2 : e2.length === 3 ? "00000" + e2 : e2.length === 2 ? "000000" + e2 : e2.length === 1 ? "0000000" + e2 : e2;
}
Q.zero8 = vf;
function x0(e2, t, r3, i4) {
  var n5 = r3 - t;
  g0(n5 % 4 === 0);
  for (var o4 = new Array(n5 / 4), h5 = 0, p3 = t; h5 < o4.length; h5++, p3 += 4) {
    var A3;
    i4 === "big" ? A3 = e2[p3] << 24 | e2[p3 + 1] << 16 | e2[p3 + 2] << 8 | e2[p3 + 3] : A3 = e2[p3 + 3] << 24 | e2[p3 + 2] << 16 | e2[p3 + 1] << 8 | e2[p3], o4[h5] = A3 >>> 0;
  }
  return o4;
}
Q.join32 = x0;
function M0(e2, t) {
  for (var r3 = new Array(e2.length * 4), i4 = 0, n5 = 0; i4 < e2.length; i4++, n5 += 4) {
    var o4 = e2[i4];
    t === "big" ? (r3[n5] = o4 >>> 24, r3[n5 + 1] = o4 >>> 16 & 255, r3[n5 + 2] = o4 >>> 8 & 255, r3[n5 + 3] = o4 & 255) : (r3[n5 + 3] = o4 >>> 24, r3[n5 + 2] = o4 >>> 16 & 255, r3[n5 + 1] = o4 >>> 8 & 255, r3[n5] = o4 & 255);
  }
  return r3;
}
Q.split32 = M0;
function E0(e2, t) {
  return e2 >>> t | e2 << 32 - t;
}
Q.rotr32 = E0;
function S0(e2, t) {
  return e2 << t | e2 >>> 32 - t;
}
Q.rotl32 = S0;
function I0(e2, t) {
  return e2 + t >>> 0;
}
Q.sum32 = I0;
function N0(e2, t, r3) {
  return e2 + t + r3 >>> 0;
}
Q.sum32_3 = N0;
function _0(e2, t, r3, i4) {
  return e2 + t + r3 + i4 >>> 0;
}
Q.sum32_4 = _0;
function B0(e2, t, r3, i4, n5) {
  return e2 + t + r3 + i4 + n5 >>> 0;
}
Q.sum32_5 = B0;
function C0(e2, t, r3, i4) {
  var n5 = e2[t], o4 = e2[t + 1], h5 = i4 + o4 >>> 0, p3 = (h5 < i4 ? 1 : 0) + r3 + n5;
  e2[t] = p3 >>> 0, e2[t + 1] = h5;
}
Q.sum64 = C0;
function R0(e2, t, r3, i4) {
  var n5 = t + i4 >>> 0, o4 = (n5 < t ? 1 : 0) + e2 + r3;
  return o4 >>> 0;
}
Q.sum64_hi = R0;
function O0(e2, t, r3, i4) {
  var n5 = t + i4;
  return n5 >>> 0;
}
Q.sum64_lo = O0;
function P0(e2, t, r3, i4, n5, o4, h5, p3) {
  var A3 = 0, v4 = t;
  v4 = v4 + i4 >>> 0, A3 += v4 < t ? 1 : 0, v4 = v4 + o4 >>> 0, A3 += v4 < o4 ? 1 : 0, v4 = v4 + p3 >>> 0, A3 += v4 < p3 ? 1 : 0;
  var w4 = e2 + r3 + n5 + h5 + A3;
  return w4 >>> 0;
}
Q.sum64_4_hi = P0;
function D0(e2, t, r3, i4, n5, o4, h5, p3) {
  var A3 = t + i4 + o4 + p3;
  return A3 >>> 0;
}
Q.sum64_4_lo = D0;
function T0(e2, t, r3, i4, n5, o4, h5, p3, A3, v4) {
  var w4 = 0, y6 = t;
  y6 = y6 + i4 >>> 0, w4 += y6 < t ? 1 : 0, y6 = y6 + o4 >>> 0, w4 += y6 < o4 ? 1 : 0, y6 = y6 + p3 >>> 0, w4 += y6 < p3 ? 1 : 0, y6 = y6 + v4 >>> 0, w4 += y6 < v4 ? 1 : 0;
  var S4 = e2 + r3 + n5 + h5 + A3 + w4;
  return S4 >>> 0;
}
Q.sum64_5_hi = T0;
function F0(e2, t, r3, i4, n5, o4, h5, p3, A3, v4) {
  var w4 = t + i4 + o4 + p3 + v4;
  return w4 >>> 0;
}
Q.sum64_5_lo = F0;
function U0(e2, t, r3) {
  var i4 = t << 32 - r3 | e2 >>> r3;
  return i4 >>> 0;
}
Q.rotr64_hi = U0;
function k0(e2, t, r3) {
  var i4 = e2 << 32 - r3 | t >>> r3;
  return i4 >>> 0;
}
Q.rotr64_lo = k0;
function q0(e2, t, r3) {
  return e2 >>> r3;
}
Q.shr64_hi = q0;
function K0(e2, t, r3) {
  var i4 = e2 << 32 - r3 | t >>> r3;
  return i4 >>> 0;
}
Q.shr64_lo = K0;
var or2 = {};
var gf = Q;
var H0 = xr;
function qr() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
or2.BlockHash = qr, qr.prototype.update = function(t, r3) {
  if (t = gf.toArray(t, r3), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var i4 = t.length % this._delta8;
    this.pending = t.slice(t.length - i4, t.length), this.pending.length === 0 && (this.pending = null), t = gf.join32(t, 0, t.length - i4, this.endian);
    for (var n5 = 0; n5 < t.length; n5 += this._delta32)
      this._update(t, n5, n5 + this._delta32);
  }
  return this;
}, qr.prototype.digest = function(t) {
  return this.update(this._pad()), H0(this.pending === null), this._digest(t);
}, qr.prototype._pad = function() {
  var t = this.pendingTotal, r3 = this._delta8, i4 = r3 - (t + this.padLength) % r3, n5 = new Array(i4 + this.padLength);
  n5[0] = 128;
  for (var o4 = 1; o4 < i4; o4++)
    n5[o4] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var h5 = 8; h5 < this.padLength; h5++)
      n5[o4++] = 0;
    n5[o4++] = 0, n5[o4++] = 0, n5[o4++] = 0, n5[o4++] = 0, n5[o4++] = t >>> 24 & 255, n5[o4++] = t >>> 16 & 255, n5[o4++] = t >>> 8 & 255, n5[o4++] = t & 255;
  } else
    for (n5[o4++] = t & 255, n5[o4++] = t >>> 8 & 255, n5[o4++] = t >>> 16 & 255, n5[o4++] = t >>> 24 & 255, n5[o4++] = 0, n5[o4++] = 0, n5[o4++] = 0, n5[o4++] = 0, h5 = 8; h5 < this.padLength; h5++)
      n5[o4++] = 0;
  return n5;
};
var sr = {};
var ae = {};
var L0 = Q;
var ue = L0.rotr32;
function z0(e2, t, r3, i4) {
  if (e2 === 0)
    return mf(t, r3, i4);
  if (e2 === 1 || e2 === 3)
    return bf(t, r3, i4);
  if (e2 === 2)
    return Af(t, r3, i4);
}
ae.ft_1 = z0;
function mf(e2, t, r3) {
  return e2 & t ^ ~e2 & r3;
}
ae.ch32 = mf;
function Af(e2, t, r3) {
  return e2 & t ^ e2 & r3 ^ t & r3;
}
ae.maj32 = Af;
function bf(e2, t, r3) {
  return e2 ^ t ^ r3;
}
ae.p32 = bf;
function j0(e2) {
  return ue(e2, 2) ^ ue(e2, 13) ^ ue(e2, 22);
}
ae.s0_256 = j0;
function Q0(e2) {
  return ue(e2, 6) ^ ue(e2, 11) ^ ue(e2, 25);
}
ae.s1_256 = Q0;
function J0(e2) {
  return ue(e2, 7) ^ ue(e2, 18) ^ e2 >>> 3;
}
ae.g0_256 = J0;
function G0(e2) {
  return ue(e2, 17) ^ ue(e2, 19) ^ e2 >>> 10;
}
ae.g1_256 = G0;
var ar = Q;
var Y0 = or2;
var V0 = ae;
var Pi = ar.rotl32;
var Mr = ar.sum32;
var W0 = ar.sum32_5;
var X0 = V0.ft_1;
var yf = Y0.BlockHash;
var Z0 = [1518500249, 1859775393, 2400959708, 3395469782];
function he() {
  if (!(this instanceof he))
    return new he();
  yf.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
}
ar.inherits(he, yf);
var $0 = he;
he.blockSize = 512, he.outSize = 160, he.hmacStrength = 80, he.padLength = 64, he.prototype._update = function(t, r3) {
  for (var i4 = this.W, n5 = 0; n5 < 16; n5++)
    i4[n5] = t[r3 + n5];
  for (; n5 < i4.length; n5++)
    i4[n5] = Pi(i4[n5 - 3] ^ i4[n5 - 8] ^ i4[n5 - 14] ^ i4[n5 - 16], 1);
  var o4 = this.h[0], h5 = this.h[1], p3 = this.h[2], A3 = this.h[3], v4 = this.h[4];
  for (n5 = 0; n5 < i4.length; n5++) {
    var w4 = ~~(n5 / 20), y6 = W0(Pi(o4, 5), X0(w4, h5, p3, A3), v4, i4[n5], Z0[w4]);
    v4 = A3, A3 = p3, p3 = Pi(h5, 30), h5 = o4, o4 = y6;
  }
  this.h[0] = Mr(this.h[0], o4), this.h[1] = Mr(this.h[1], h5), this.h[2] = Mr(this.h[2], p3), this.h[3] = Mr(this.h[3], A3), this.h[4] = Mr(this.h[4], v4);
}, he.prototype._digest = function(t) {
  return t === "hex" ? ar.toHex32(this.h, "big") : ar.split32(this.h, "big");
};
var ur = Q;
var ta = or2;
var hr = ae;
var ea = xr;
var ie = ur.sum32;
var ra = ur.sum32_4;
var ia = ur.sum32_5;
var na = hr.ch32;
var fa = hr.maj32;
var oa = hr.s0_256;
var sa = hr.s1_256;
var aa = hr.g0_256;
var ua = hr.g1_256;
var wf = ta.BlockHash;
var ha = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function ce() {
  if (!(this instanceof ce))
    return new ce();
  wf.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = ha, this.W = new Array(64);
}
ur.inherits(ce, wf);
var xf = ce;
ce.blockSize = 512, ce.outSize = 256, ce.hmacStrength = 192, ce.padLength = 64, ce.prototype._update = function(t, r3) {
  for (var i4 = this.W, n5 = 0; n5 < 16; n5++)
    i4[n5] = t[r3 + n5];
  for (; n5 < i4.length; n5++)
    i4[n5] = ra(ua(i4[n5 - 2]), i4[n5 - 7], aa(i4[n5 - 15]), i4[n5 - 16]);
  var o4 = this.h[0], h5 = this.h[1], p3 = this.h[2], A3 = this.h[3], v4 = this.h[4], w4 = this.h[5], y6 = this.h[6], S4 = this.h[7];
  for (ea(this.k.length === i4.length), n5 = 0; n5 < i4.length; n5++) {
    var N10 = ia(S4, sa(v4), na(v4, w4, y6), this.k[n5], i4[n5]), I4 = ie(oa(o4), fa(o4, h5, p3));
    S4 = y6, y6 = w4, w4 = v4, v4 = ie(A3, N10), A3 = p3, p3 = h5, h5 = o4, o4 = ie(N10, I4);
  }
  this.h[0] = ie(this.h[0], o4), this.h[1] = ie(this.h[1], h5), this.h[2] = ie(this.h[2], p3), this.h[3] = ie(this.h[3], A3), this.h[4] = ie(this.h[4], v4), this.h[5] = ie(this.h[5], w4), this.h[6] = ie(this.h[6], y6), this.h[7] = ie(this.h[7], S4);
}, ce.prototype._digest = function(t) {
  return t === "hex" ? ur.toHex32(this.h, "big") : ur.split32(this.h, "big");
};
var Di = Q;
var Mf = xf;
function ye() {
  if (!(this instanceof ye))
    return new ye();
  Mf.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
}
Di.inherits(ye, Mf);
var ca = ye;
ye.blockSize = 512, ye.outSize = 224, ye.hmacStrength = 192, ye.padLength = 64, ye.prototype._digest = function(t) {
  return t === "hex" ? Di.toHex32(this.h.slice(0, 7), "big") : Di.split32(this.h.slice(0, 7), "big");
};
var jt = Q;
var la = or2;
var da = xr;
var le = jt.rotr64_hi;
var de = jt.rotr64_lo;
var Ef = jt.shr64_hi;
var Sf = jt.shr64_lo;
var Be = jt.sum64;
var Ti = jt.sum64_hi;
var Fi = jt.sum64_lo;
var pa = jt.sum64_4_hi;
var va = jt.sum64_4_lo;
var ga = jt.sum64_5_hi;
var ma = jt.sum64_5_lo;
var If = la.BlockHash;
var Aa = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
function ne() {
  if (!(this instanceof ne))
    return new ne();
  If.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = Aa, this.W = new Array(160);
}
jt.inherits(ne, If);
var Nf = ne;
ne.blockSize = 1024, ne.outSize = 512, ne.hmacStrength = 192, ne.padLength = 128, ne.prototype._prepareBlock = function(t, r3) {
  for (var i4 = this.W, n5 = 0; n5 < 32; n5++)
    i4[n5] = t[r3 + n5];
  for (; n5 < i4.length; n5 += 2) {
    var o4 = Ba(i4[n5 - 4], i4[n5 - 3]), h5 = Ca(i4[n5 - 4], i4[n5 - 3]), p3 = i4[n5 - 14], A3 = i4[n5 - 13], v4 = Na(i4[n5 - 30], i4[n5 - 29]), w4 = _a(i4[n5 - 30], i4[n5 - 29]), y6 = i4[n5 - 32], S4 = i4[n5 - 31];
    i4[n5] = pa(o4, h5, p3, A3, v4, w4, y6, S4), i4[n5 + 1] = va(o4, h5, p3, A3, v4, w4, y6, S4);
  }
}, ne.prototype._update = function(t, r3) {
  this._prepareBlock(t, r3);
  var i4 = this.W, n5 = this.h[0], o4 = this.h[1], h5 = this.h[2], p3 = this.h[3], A3 = this.h[4], v4 = this.h[5], w4 = this.h[6], y6 = this.h[7], S4 = this.h[8], N10 = this.h[9], I4 = this.h[10], C4 = this.h[11], T3 = this.h[12], U3 = this.h[13], J = this.h[14], Bt2 = this.h[15];
  da(this.k.length === i4.length);
  for (var G = 0; G < i4.length; G += 2) {
    var H2 = J, L2 = Bt2, Pt2 = Sa(S4, N10), W = Ia(S4, N10), Rt2 = ba(S4, N10, I4, C4, T3), Vt2 = ya(S4, N10, I4, C4, T3, U3), Y = this.k[G], Wt2 = this.k[G + 1], b4 = i4[G], f4 = i4[G + 1], a4 = ga(H2, L2, Pt2, W, Rt2, Vt2, Y, Wt2, b4, f4), c5 = ma(H2, L2, Pt2, W, Rt2, Vt2, Y, Wt2, b4, f4);
    H2 = Ma(n5, o4), L2 = Ea(n5, o4), Pt2 = wa(n5, o4, h5, p3, A3), W = xa(n5, o4, h5, p3, A3, v4);
    var d3 = Ti(H2, L2, Pt2, W), m2 = Fi(H2, L2, Pt2, W);
    J = T3, Bt2 = U3, T3 = I4, U3 = C4, I4 = S4, C4 = N10, S4 = Ti(w4, y6, a4, c5), N10 = Fi(y6, y6, a4, c5), w4 = A3, y6 = v4, A3 = h5, v4 = p3, h5 = n5, p3 = o4, n5 = Ti(a4, c5, d3, m2), o4 = Fi(a4, c5, d3, m2);
  }
  Be(this.h, 0, n5, o4), Be(this.h, 2, h5, p3), Be(this.h, 4, A3, v4), Be(this.h, 6, w4, y6), Be(this.h, 8, S4, N10), Be(this.h, 10, I4, C4), Be(this.h, 12, T3, U3), Be(this.h, 14, J, Bt2);
}, ne.prototype._digest = function(t) {
  return t === "hex" ? jt.toHex32(this.h, "big") : jt.split32(this.h, "big");
};
function ba(e2, t, r3, i4, n5) {
  var o4 = e2 & r3 ^ ~e2 & n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function ya(e2, t, r3, i4, n5, o4) {
  var h5 = t & i4 ^ ~t & o4;
  return h5 < 0 && (h5 += 4294967296), h5;
}
function wa(e2, t, r3, i4, n5) {
  var o4 = e2 & r3 ^ e2 & n5 ^ r3 & n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function xa(e2, t, r3, i4, n5, o4) {
  var h5 = t & i4 ^ t & o4 ^ i4 & o4;
  return h5 < 0 && (h5 += 4294967296), h5;
}
function Ma(e2, t) {
  var r3 = le(e2, t, 28), i4 = le(t, e2, 2), n5 = le(t, e2, 7), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Ea(e2, t) {
  var r3 = de(e2, t, 28), i4 = de(t, e2, 2), n5 = de(t, e2, 7), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Sa(e2, t) {
  var r3 = le(e2, t, 14), i4 = le(e2, t, 18), n5 = le(t, e2, 9), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Ia(e2, t) {
  var r3 = de(e2, t, 14), i4 = de(e2, t, 18), n5 = de(t, e2, 9), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Na(e2, t) {
  var r3 = le(e2, t, 1), i4 = le(e2, t, 8), n5 = Ef(e2, t, 7), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function _a(e2, t) {
  var r3 = de(e2, t, 1), i4 = de(e2, t, 8), n5 = Sf(e2, t, 7), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Ba(e2, t) {
  var r3 = le(e2, t, 19), i4 = le(t, e2, 29), n5 = Ef(e2, t, 6), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
function Ca(e2, t) {
  var r3 = de(e2, t, 19), i4 = de(t, e2, 29), n5 = Sf(e2, t, 6), o4 = r3 ^ i4 ^ n5;
  return o4 < 0 && (o4 += 4294967296), o4;
}
var Ui = Q;
var _f = Nf;
function we() {
  if (!(this instanceof we))
    return new we();
  _f.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
}
Ui.inherits(we, _f);
var Ra = we;
we.blockSize = 1024, we.outSize = 384, we.hmacStrength = 192, we.padLength = 128, we.prototype._digest = function(t) {
  return t === "hex" ? Ui.toHex32(this.h.slice(0, 12), "big") : Ui.split32(this.h.slice(0, 12), "big");
}, sr.sha1 = $0, sr.sha224 = ca, sr.sha256 = xf, sr.sha384 = Ra, sr.sha512 = Nf;
var Bf = {};
var Xe = Q;
var Oa = or2;
var Kr = Xe.rotl32;
var Cf = Xe.sum32;
var Er = Xe.sum32_3;
var Rf = Xe.sum32_4;
var Of = Oa.BlockHash;
function pe() {
  if (!(this instanceof pe))
    return new pe();
  Of.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Xe.inherits(pe, Of), Bf.ripemd160 = pe, pe.blockSize = 512, pe.outSize = 160, pe.hmacStrength = 192, pe.padLength = 64, pe.prototype._update = function(t, r3) {
  for (var i4 = this.h[0], n5 = this.h[1], o4 = this.h[2], h5 = this.h[3], p3 = this.h[4], A3 = i4, v4 = n5, w4 = o4, y6 = h5, S4 = p3, N10 = 0; N10 < 80; N10++) {
    var I4 = Cf(Kr(Rf(i4, Pf(N10, n5, o4, h5), t[Ta[N10] + r3], Pa(N10)), Ua[N10]), p3);
    i4 = p3, p3 = h5, h5 = Kr(o4, 10), o4 = n5, n5 = I4, I4 = Cf(Kr(Rf(A3, Pf(79 - N10, v4, w4, y6), t[Fa[N10] + r3], Da(N10)), ka[N10]), S4), A3 = S4, S4 = y6, y6 = Kr(w4, 10), w4 = v4, v4 = I4;
  }
  I4 = Er(this.h[1], o4, y6), this.h[1] = Er(this.h[2], h5, S4), this.h[2] = Er(this.h[3], p3, A3), this.h[3] = Er(this.h[4], i4, v4), this.h[4] = Er(this.h[0], n5, w4), this.h[0] = I4;
}, pe.prototype._digest = function(t) {
  return t === "hex" ? Xe.toHex32(this.h, "little") : Xe.split32(this.h, "little");
};
function Pf(e2, t, r3, i4) {
  return e2 <= 15 ? t ^ r3 ^ i4 : e2 <= 31 ? t & r3 | ~t & i4 : e2 <= 47 ? (t | ~r3) ^ i4 : e2 <= 63 ? t & i4 | r3 & ~i4 : t ^ (r3 | ~i4);
}
function Pa(e2) {
  return e2 <= 15 ? 0 : e2 <= 31 ? 1518500249 : e2 <= 47 ? 1859775393 : e2 <= 63 ? 2400959708 : 2840853838;
}
function Da(e2) {
  return e2 <= 15 ? 1352829926 : e2 <= 31 ? 1548603684 : e2 <= 47 ? 1836072691 : e2 <= 63 ? 2053994217 : 0;
}
var Ta = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
var Fa = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
var Ua = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
var ka = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
var qa = Q;
var Ka = xr;
function cr(e2, t, r3) {
  if (!(this instanceof cr))
    return new cr(e2, t, r3);
  this.Hash = e2, this.blockSize = e2.blockSize / 8, this.outSize = e2.outSize / 8, this.inner = null, this.outer = null, this._init(qa.toArray(t, r3));
}
var Ha = cr;
cr.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), Ka(t.length <= this.blockSize);
  for (var r3 = t.length; r3 < this.blockSize; r3++)
    t.push(0);
  for (r3 = 0; r3 < t.length; r3++)
    t[r3] ^= 54;
  for (this.inner = new this.Hash().update(t), r3 = 0; r3 < t.length; r3++)
    t[r3] ^= 106;
  this.outer = new this.Hash().update(t);
}, cr.prototype.update = function(t, r3) {
  return this.inner.update(t, r3), this;
}, cr.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
}, function(e2) {
  var t = e2;
  t.utils = Q, t.common = or2, t.sha = sr, t.ripemd = Bf, t.hmac = Ha, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
}(se);
function lr(e2, t, r3) {
  return r3 = { path: t, exports: {}, require: function(i4, n5) {
    return La(i4, n5 ?? r3.path);
  } }, e2(r3, r3.exports), r3.exports;
}
function La() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var ki = Df;
function Df(e2, t) {
  if (!e2)
    throw new Error(t || "Assertion failed");
}
Df.equal = function(t, r3, i4) {
  if (t != r3)
    throw new Error(i4 || "Assertion failed: " + t + " != " + r3);
};
var fe = lr(function(e2, t) {
  var r3 = t;
  function i4(h5, p3) {
    if (Array.isArray(h5))
      return h5.slice();
    if (!h5)
      return [];
    var A3 = [];
    if (typeof h5 != "string") {
      for (var v4 = 0; v4 < h5.length; v4++)
        A3[v4] = h5[v4] | 0;
      return A3;
    }
    if (p3 === "hex") {
      h5 = h5.replace(/[^a-z0-9]+/ig, ""), h5.length % 2 !== 0 && (h5 = "0" + h5);
      for (var v4 = 0; v4 < h5.length; v4 += 2)
        A3.push(parseInt(h5[v4] + h5[v4 + 1], 16));
    } else
      for (var v4 = 0; v4 < h5.length; v4++) {
        var w4 = h5.charCodeAt(v4), y6 = w4 >> 8, S4 = w4 & 255;
        y6 ? A3.push(y6, S4) : A3.push(S4);
      }
    return A3;
  }
  r3.toArray = i4;
  function n5(h5) {
    return h5.length === 1 ? "0" + h5 : h5;
  }
  r3.zero2 = n5;
  function o4(h5) {
    for (var p3 = "", A3 = 0; A3 < h5.length; A3++)
      p3 += n5(h5[A3].toString(16));
    return p3;
  }
  r3.toHex = o4, r3.encode = function(p3, A3) {
    return A3 === "hex" ? o4(p3) : p3;
  };
});
var Gt = lr(function(e2, t) {
  var r3 = t;
  r3.assert = ki, r3.toArray = fe.toArray, r3.zero2 = fe.zero2, r3.toHex = fe.toHex, r3.encode = fe.encode;
  function i4(A3, v4, w4) {
    var y6 = new Array(Math.max(A3.bitLength(), w4) + 1);
    y6.fill(0);
    for (var S4 = 1 << v4 + 1, N10 = A3.clone(), I4 = 0; I4 < y6.length; I4++) {
      var C4, T3 = N10.andln(S4 - 1);
      N10.isOdd() ? (T3 > (S4 >> 1) - 1 ? C4 = (S4 >> 1) - T3 : C4 = T3, N10.isubn(C4)) : C4 = 0, y6[I4] = C4, N10.iushrn(1);
    }
    return y6;
  }
  r3.getNAF = i4;
  function n5(A3, v4) {
    var w4 = [[], []];
    A3 = A3.clone(), v4 = v4.clone();
    for (var y6 = 0, S4 = 0, N10; A3.cmpn(-y6) > 0 || v4.cmpn(-S4) > 0; ) {
      var I4 = A3.andln(3) + y6 & 3, C4 = v4.andln(3) + S4 & 3;
      I4 === 3 && (I4 = -1), C4 === 3 && (C4 = -1);
      var T3;
      I4 & 1 ? (N10 = A3.andln(7) + y6 & 7, (N10 === 3 || N10 === 5) && C4 === 2 ? T3 = -I4 : T3 = I4) : T3 = 0, w4[0].push(T3);
      var U3;
      C4 & 1 ? (N10 = v4.andln(7) + S4 & 7, (N10 === 3 || N10 === 5) && I4 === 2 ? U3 = -C4 : U3 = C4) : U3 = 0, w4[1].push(U3), 2 * y6 === T3 + 1 && (y6 = 1 - y6), 2 * S4 === U3 + 1 && (S4 = 1 - S4), A3.iushrn(1), v4.iushrn(1);
    }
    return w4;
  }
  r3.getJSF = n5;
  function o4(A3, v4, w4) {
    var y6 = "_" + v4;
    A3.prototype[v4] = function() {
      return this[y6] !== void 0 ? this[y6] : this[y6] = w4.call(this);
    };
  }
  r3.cachedProperty = o4;
  function h5(A3) {
    return typeof A3 == "string" ? r3.toArray(A3, "hex") : A3;
  }
  r3.parseBytes = h5;
  function p3(A3) {
    return new K(A3, "hex", "le");
  }
  r3.intFromLE = p3;
});
var Hr = Gt.getNAF;
var za = Gt.getJSF;
var Lr = Gt.assert;
function Ce(e2, t) {
  this.type = e2, this.p = new K(t.p, 16), this.red = t.prime ? K.red(t.prime) : K.mont(this.p), this.zero = new K(0).toRed(this.red), this.one = new K(1).toRed(this.red), this.two = new K(2).toRed(this.red), this.n = t.n && new K(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var r3 = this.n && this.p.div(this.n);
  !r3 || r3.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = true, this.redN = this.n.toRed(this.red));
}
var Ze = Ce;
Ce.prototype.point = function() {
  throw new Error("Not implemented");
}, Ce.prototype.validate = function() {
  throw new Error("Not implemented");
}, Ce.prototype._fixedNafMul = function(t, r3) {
  Lr(t.precomputed);
  var i4 = t._getDoubles(), n5 = Hr(r3, 1, this._bitLength), o4 = (1 << i4.step + 1) - (i4.step % 2 === 0 ? 2 : 1);
  o4 /= 3;
  var h5 = [], p3, A3;
  for (p3 = 0; p3 < n5.length; p3 += i4.step) {
    A3 = 0;
    for (var v4 = p3 + i4.step - 1; v4 >= p3; v4--)
      A3 = (A3 << 1) + n5[v4];
    h5.push(A3);
  }
  for (var w4 = this.jpoint(null, null, null), y6 = this.jpoint(null, null, null), S4 = o4; S4 > 0; S4--) {
    for (p3 = 0; p3 < h5.length; p3++)
      A3 = h5[p3], A3 === S4 ? y6 = y6.mixedAdd(i4.points[p3]) : A3 === -S4 && (y6 = y6.mixedAdd(i4.points[p3].neg()));
    w4 = w4.add(y6);
  }
  return w4.toP();
}, Ce.prototype._wnafMul = function(t, r3) {
  var i4 = 4, n5 = t._getNAFPoints(i4);
  i4 = n5.wnd;
  for (var o4 = n5.points, h5 = Hr(r3, i4, this._bitLength), p3 = this.jpoint(null, null, null), A3 = h5.length - 1; A3 >= 0; A3--) {
    for (var v4 = 0; A3 >= 0 && h5[A3] === 0; A3--)
      v4++;
    if (A3 >= 0 && v4++, p3 = p3.dblp(v4), A3 < 0)
      break;
    var w4 = h5[A3];
    Lr(w4 !== 0), t.type === "affine" ? w4 > 0 ? p3 = p3.mixedAdd(o4[w4 - 1 >> 1]) : p3 = p3.mixedAdd(o4[-w4 - 1 >> 1].neg()) : w4 > 0 ? p3 = p3.add(o4[w4 - 1 >> 1]) : p3 = p3.add(o4[-w4 - 1 >> 1].neg());
  }
  return t.type === "affine" ? p3.toP() : p3;
}, Ce.prototype._wnafMulAdd = function(t, r3, i4, n5, o4) {
  var h5 = this._wnafT1, p3 = this._wnafT2, A3 = this._wnafT3, v4 = 0, w4, y6, S4;
  for (w4 = 0; w4 < n5; w4++) {
    S4 = r3[w4];
    var N10 = S4._getNAFPoints(t);
    h5[w4] = N10.wnd, p3[w4] = N10.points;
  }
  for (w4 = n5 - 1; w4 >= 1; w4 -= 2) {
    var I4 = w4 - 1, C4 = w4;
    if (h5[I4] !== 1 || h5[C4] !== 1) {
      A3[I4] = Hr(i4[I4], h5[I4], this._bitLength), A3[C4] = Hr(i4[C4], h5[C4], this._bitLength), v4 = Math.max(A3[I4].length, v4), v4 = Math.max(A3[C4].length, v4);
      continue;
    }
    var T3 = [r3[I4], null, null, r3[C4]];
    r3[I4].y.cmp(r3[C4].y) === 0 ? (T3[1] = r3[I4].add(r3[C4]), T3[2] = r3[I4].toJ().mixedAdd(r3[C4].neg())) : r3[I4].y.cmp(r3[C4].y.redNeg()) === 0 ? (T3[1] = r3[I4].toJ().mixedAdd(r3[C4]), T3[2] = r3[I4].add(r3[C4].neg())) : (T3[1] = r3[I4].toJ().mixedAdd(r3[C4]), T3[2] = r3[I4].toJ().mixedAdd(r3[C4].neg()));
    var U3 = [-3, -1, -5, -7, 0, 7, 5, 1, 3], J = za(i4[I4], i4[C4]);
    for (v4 = Math.max(J[0].length, v4), A3[I4] = new Array(v4), A3[C4] = new Array(v4), y6 = 0; y6 < v4; y6++) {
      var Bt2 = J[0][y6] | 0, G = J[1][y6] | 0;
      A3[I4][y6] = U3[(Bt2 + 1) * 3 + (G + 1)], A3[C4][y6] = 0, p3[I4] = T3;
    }
  }
  var H2 = this.jpoint(null, null, null), L2 = this._wnafT4;
  for (w4 = v4; w4 >= 0; w4--) {
    for (var Pt2 = 0; w4 >= 0; ) {
      var W = true;
      for (y6 = 0; y6 < n5; y6++)
        L2[y6] = A3[y6][w4] | 0, L2[y6] !== 0 && (W = false);
      if (!W)
        break;
      Pt2++, w4--;
    }
    if (w4 >= 0 && Pt2++, H2 = H2.dblp(Pt2), w4 < 0)
      break;
    for (y6 = 0; y6 < n5; y6++) {
      var Rt2 = L2[y6];
      Rt2 !== 0 && (Rt2 > 0 ? S4 = p3[y6][Rt2 - 1 >> 1] : Rt2 < 0 && (S4 = p3[y6][-Rt2 - 1 >> 1].neg()), S4.type === "affine" ? H2 = H2.mixedAdd(S4) : H2 = H2.add(S4));
    }
  }
  for (w4 = 0; w4 < n5; w4++)
    p3[w4] = null;
  return o4 ? H2 : H2.toP();
};
function $t(e2, t) {
  this.curve = e2, this.type = t, this.precomputed = null;
}
Ce.BasePoint = $t, $t.prototype.eq = function() {
  throw new Error("Not implemented");
}, $t.prototype.validate = function() {
  return this.curve.validate(this);
}, Ce.prototype.decodePoint = function(t, r3) {
  t = Gt.toArray(t, r3);
  var i4 = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * i4) {
    t[0] === 6 ? Lr(t[t.length - 1] % 2 === 0) : t[0] === 7 && Lr(t[t.length - 1] % 2 === 1);
    var n5 = this.point(t.slice(1, 1 + i4), t.slice(1 + i4, 1 + 2 * i4));
    return n5;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === i4)
    return this.pointFromX(t.slice(1, 1 + i4), t[0] === 3);
  throw new Error("Unknown point format");
}, $t.prototype.encodeCompressed = function(t) {
  return this.encode(t, true);
}, $t.prototype._encode = function(t) {
  var r3 = this.curve.p.byteLength(), i4 = this.getX().toArray("be", r3);
  return t ? [this.getY().isEven() ? 2 : 3].concat(i4) : [4].concat(i4, this.getY().toArray("be", r3));
}, $t.prototype.encode = function(t, r3) {
  return Gt.encode(this._encode(r3), t);
}, $t.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var r3 = { doubles: null, naf: null, beta: null };
  return r3.naf = this._getNAFPoints(8), r3.doubles = this._getDoubles(4, t), r3.beta = this._getBeta(), this.precomputed = r3, this;
}, $t.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return false;
  var r3 = this.precomputed.doubles;
  return r3 ? r3.points.length >= Math.ceil((t.bitLength() + 1) / r3.step) : false;
}, $t.prototype._getDoubles = function(t, r3) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i4 = [this], n5 = this, o4 = 0; o4 < r3; o4 += t) {
    for (var h5 = 0; h5 < t; h5++)
      n5 = n5.dbl();
    i4.push(n5);
  }
  return { step: t, points: i4 };
}, $t.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var r3 = [this], i4 = (1 << t) - 1, n5 = i4 === 1 ? null : this.dbl(), o4 = 1; o4 < i4; o4++)
    r3[o4] = r3[o4 - 1].add(n5);
  return { wnd: t, points: r3 };
}, $t.prototype._getBeta = function() {
  return null;
}, $t.prototype.dblp = function(t) {
  for (var r3 = this, i4 = 0; i4 < t; i4++)
    r3 = r3.dbl();
  return r3;
};
var qi = lr(function(e2) {
  typeof Object.create == "function" ? e2.exports = function(r3, i4) {
    i4 && (r3.super_ = i4, r3.prototype = Object.create(i4.prototype, { constructor: { value: r3, enumerable: false, writable: true, configurable: true } }));
  } : e2.exports = function(r3, i4) {
    if (i4) {
      r3.super_ = i4;
      var n5 = function() {
      };
      n5.prototype = i4.prototype, r3.prototype = new n5(), r3.prototype.constructor = r3;
    }
  };
});
var ja = Gt.assert;
function te(e2) {
  Ze.call(this, "short", e2), this.a = new K(e2.a, 16).toRed(this.red), this.b = new K(e2.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e2), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
qi(te, Ze);
var Qa = te;
te.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var r3, i4;
    if (t.beta)
      r3 = new K(t.beta, 16).toRed(this.red);
    else {
      var n5 = this._getEndoRoots(this.p);
      r3 = n5[0].cmp(n5[1]) < 0 ? n5[0] : n5[1], r3 = r3.toRed(this.red);
    }
    if (t.lambda)
      i4 = new K(t.lambda, 16);
    else {
      var o4 = this._getEndoRoots(this.n);
      this.g.mul(o4[0]).x.cmp(this.g.x.redMul(r3)) === 0 ? i4 = o4[0] : (i4 = o4[1], ja(this.g.mul(i4).x.cmp(this.g.x.redMul(r3)) === 0));
    }
    var h5;
    return t.basis ? h5 = t.basis.map(function(p3) {
      return { a: new K(p3.a, 16), b: new K(p3.b, 16) };
    }) : h5 = this._getEndoBasis(i4), { beta: r3, lambda: i4, basis: h5 };
  }
}, te.prototype._getEndoRoots = function(t) {
  var r3 = t === this.p ? this.red : K.mont(t), i4 = new K(2).toRed(r3).redInvm(), n5 = i4.redNeg(), o4 = new K(3).toRed(r3).redNeg().redSqrt().redMul(i4), h5 = n5.redAdd(o4).fromRed(), p3 = n5.redSub(o4).fromRed();
  return [h5, p3];
}, te.prototype._getEndoBasis = function(t) {
  for (var r3 = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i4 = t, n5 = this.n.clone(), o4 = new K(1), h5 = new K(0), p3 = new K(0), A3 = new K(1), v4, w4, y6, S4, N10, I4, C4, T3 = 0, U3, J; i4.cmpn(0) !== 0; ) {
    var Bt2 = n5.div(i4);
    U3 = n5.sub(Bt2.mul(i4)), J = p3.sub(Bt2.mul(o4));
    var G = A3.sub(Bt2.mul(h5));
    if (!y6 && U3.cmp(r3) < 0)
      v4 = C4.neg(), w4 = o4, y6 = U3.neg(), S4 = J;
    else if (y6 && ++T3 === 2)
      break;
    C4 = U3, n5 = i4, i4 = U3, p3 = o4, o4 = J, A3 = h5, h5 = G;
  }
  N10 = U3.neg(), I4 = J;
  var H2 = y6.sqr().add(S4.sqr()), L2 = N10.sqr().add(I4.sqr());
  return L2.cmp(H2) >= 0 && (N10 = v4, I4 = w4), y6.negative && (y6 = y6.neg(), S4 = S4.neg()), N10.negative && (N10 = N10.neg(), I4 = I4.neg()), [{ a: y6, b: S4 }, { a: N10, b: I4 }];
}, te.prototype._endoSplit = function(t) {
  var r3 = this.endo.basis, i4 = r3[0], n5 = r3[1], o4 = n5.b.mul(t).divRound(this.n), h5 = i4.b.neg().mul(t).divRound(this.n), p3 = o4.mul(i4.a), A3 = h5.mul(n5.a), v4 = o4.mul(i4.b), w4 = h5.mul(n5.b), y6 = t.sub(p3).sub(A3), S4 = v4.add(w4).neg();
  return { k1: y6, k2: S4 };
}, te.prototype.pointFromX = function(t, r3) {
  t = new K(t, 16), t.red || (t = t.toRed(this.red));
  var i4 = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), n5 = i4.redSqrt();
  if (n5.redSqr().redSub(i4).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var o4 = n5.fromRed().isOdd();
  return (r3 && !o4 || !r3 && o4) && (n5 = n5.redNeg()), this.point(t, n5);
}, te.prototype.validate = function(t) {
  if (t.inf)
    return true;
  var r3 = t.x, i4 = t.y, n5 = this.a.redMul(r3), o4 = r3.redSqr().redMul(r3).redIAdd(n5).redIAdd(this.b);
  return i4.redSqr().redISub(o4).cmpn(0) === 0;
}, te.prototype._endoWnafMulAdd = function(t, r3, i4) {
  for (var n5 = this._endoWnafT1, o4 = this._endoWnafT2, h5 = 0; h5 < t.length; h5++) {
    var p3 = this._endoSplit(r3[h5]), A3 = t[h5], v4 = A3._getBeta();
    p3.k1.negative && (p3.k1.ineg(), A3 = A3.neg(true)), p3.k2.negative && (p3.k2.ineg(), v4 = v4.neg(true)), n5[h5 * 2] = A3, n5[h5 * 2 + 1] = v4, o4[h5 * 2] = p3.k1, o4[h5 * 2 + 1] = p3.k2;
  }
  for (var w4 = this._wnafMulAdd(1, n5, o4, h5 * 2, i4), y6 = 0; y6 < h5 * 2; y6++)
    n5[y6] = null, o4[y6] = null;
  return w4;
};
function Tt(e2, t, r3, i4) {
  Ze.BasePoint.call(this, e2, "affine"), t === null && r3 === null ? (this.x = null, this.y = null, this.inf = true) : (this.x = new K(t, 16), this.y = new K(r3, 16), i4 && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = false);
}
qi(Tt, Ze.BasePoint), te.prototype.point = function(t, r3, i4) {
  return new Tt(this, t, r3, i4);
}, te.prototype.pointFromJSON = function(t, r3) {
  return Tt.fromJSON(this, t, r3);
}, Tt.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var r3 = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var i4 = this.curve, n5 = function(o4) {
        return i4.point(o4.x.redMul(i4.endo.beta), o4.y);
      };
      t.beta = r3, r3.precomputed = { beta: null, naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(n5) }, doubles: t.doubles && { step: t.doubles.step, points: t.doubles.points.map(n5) } };
    }
    return r3;
  }
}, Tt.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y];
}, Tt.fromJSON = function(t, r3, i4) {
  typeof r3 == "string" && (r3 = JSON.parse(r3));
  var n5 = t.point(r3[0], r3[1], i4);
  if (!r3[2])
    return n5;
  function o4(p3) {
    return t.point(p3[0], p3[1], i4);
  }
  var h5 = r3[2];
  return n5.precomputed = { beta: null, doubles: h5.doubles && { step: h5.doubles.step, points: [n5].concat(h5.doubles.points.map(o4)) }, naf: h5.naf && { wnd: h5.naf.wnd, points: [n5].concat(h5.naf.points.map(o4)) } }, n5;
}, Tt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
}, Tt.prototype.isInfinity = function() {
  return this.inf;
}, Tt.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var r3 = this.y.redSub(t.y);
  r3.cmpn(0) !== 0 && (r3 = r3.redMul(this.x.redSub(t.x).redInvm()));
  var i4 = r3.redSqr().redISub(this.x).redISub(t.x), n5 = r3.redMul(this.x.redSub(i4)).redISub(this.y);
  return this.curve.point(i4, n5);
}, Tt.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var r3 = this.curve.a, i4 = this.x.redSqr(), n5 = t.redInvm(), o4 = i4.redAdd(i4).redIAdd(i4).redIAdd(r3).redMul(n5), h5 = o4.redSqr().redISub(this.x.redAdd(this.x)), p3 = o4.redMul(this.x.redSub(h5)).redISub(this.y);
  return this.curve.point(h5, p3);
}, Tt.prototype.getX = function() {
  return this.x.fromRed();
}, Tt.prototype.getY = function() {
  return this.y.fromRed();
}, Tt.prototype.mul = function(t) {
  return t = new K(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
}, Tt.prototype.mulAdd = function(t, r3, i4) {
  var n5 = [this, r3], o4 = [t, i4];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n5, o4) : this.curve._wnafMulAdd(1, n5, o4, 2);
}, Tt.prototype.jmulAdd = function(t, r3, i4) {
  var n5 = [this, r3], o4 = [t, i4];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n5, o4, true) : this.curve._wnafMulAdd(1, n5, o4, 2, true);
}, Tt.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
}, Tt.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var r3 = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var i4 = this.precomputed, n5 = function(o4) {
      return o4.neg();
    };
    r3.precomputed = { naf: i4.naf && { wnd: i4.naf.wnd, points: i4.naf.points.map(n5) }, doubles: i4.doubles && { step: i4.doubles.step, points: i4.doubles.points.map(n5) } };
  }
  return r3;
}, Tt.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function Ft(e2, t, r3, i4) {
  Ze.BasePoint.call(this, e2, "jacobian"), t === null && r3 === null && i4 === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new K(0)) : (this.x = new K(t, 16), this.y = new K(r3, 16), this.z = new K(i4, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
qi(Ft, Ze.BasePoint), te.prototype.jpoint = function(t, r3, i4) {
  return new Ft(this, t, r3, i4);
}, Ft.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), r3 = t.redSqr(), i4 = this.x.redMul(r3), n5 = this.y.redMul(r3).redMul(t);
  return this.curve.point(i4, n5);
}, Ft.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
}, Ft.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var r3 = t.z.redSqr(), i4 = this.z.redSqr(), n5 = this.x.redMul(r3), o4 = t.x.redMul(i4), h5 = this.y.redMul(r3.redMul(t.z)), p3 = t.y.redMul(i4.redMul(this.z)), A3 = n5.redSub(o4), v4 = h5.redSub(p3);
  if (A3.cmpn(0) === 0)
    return v4.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var w4 = A3.redSqr(), y6 = w4.redMul(A3), S4 = n5.redMul(w4), N10 = v4.redSqr().redIAdd(y6).redISub(S4).redISub(S4), I4 = v4.redMul(S4.redISub(N10)).redISub(h5.redMul(y6)), C4 = this.z.redMul(t.z).redMul(A3);
  return this.curve.jpoint(N10, I4, C4);
}, Ft.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var r3 = this.z.redSqr(), i4 = this.x, n5 = t.x.redMul(r3), o4 = this.y, h5 = t.y.redMul(r3).redMul(this.z), p3 = i4.redSub(n5), A3 = o4.redSub(h5);
  if (p3.cmpn(0) === 0)
    return A3.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var v4 = p3.redSqr(), w4 = v4.redMul(p3), y6 = i4.redMul(v4), S4 = A3.redSqr().redIAdd(w4).redISub(y6).redISub(y6), N10 = A3.redMul(y6.redISub(S4)).redISub(o4.redMul(w4)), I4 = this.z.redMul(p3);
  return this.curve.jpoint(S4, N10, I4);
}, Ft.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var r3;
  if (this.curve.zeroA || this.curve.threeA) {
    var i4 = this;
    for (r3 = 0; r3 < t; r3++)
      i4 = i4.dbl();
    return i4;
  }
  var n5 = this.curve.a, o4 = this.curve.tinv, h5 = this.x, p3 = this.y, A3 = this.z, v4 = A3.redSqr().redSqr(), w4 = p3.redAdd(p3);
  for (r3 = 0; r3 < t; r3++) {
    var y6 = h5.redSqr(), S4 = w4.redSqr(), N10 = S4.redSqr(), I4 = y6.redAdd(y6).redIAdd(y6).redIAdd(n5.redMul(v4)), C4 = h5.redMul(S4), T3 = I4.redSqr().redISub(C4.redAdd(C4)), U3 = C4.redISub(T3), J = I4.redMul(U3);
    J = J.redIAdd(J).redISub(N10);
    var Bt2 = w4.redMul(A3);
    r3 + 1 < t && (v4 = v4.redMul(N10)), h5 = T3, A3 = Bt2, w4 = J;
  }
  return this.curve.jpoint(h5, w4.redMul(o4), A3);
}, Ft.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
}, Ft.prototype._zeroDbl = function() {
  var t, r3, i4;
  if (this.zOne) {
    var n5 = this.x.redSqr(), o4 = this.y.redSqr(), h5 = o4.redSqr(), p3 = this.x.redAdd(o4).redSqr().redISub(n5).redISub(h5);
    p3 = p3.redIAdd(p3);
    var A3 = n5.redAdd(n5).redIAdd(n5), v4 = A3.redSqr().redISub(p3).redISub(p3), w4 = h5.redIAdd(h5);
    w4 = w4.redIAdd(w4), w4 = w4.redIAdd(w4), t = v4, r3 = A3.redMul(p3.redISub(v4)).redISub(w4), i4 = this.y.redAdd(this.y);
  } else {
    var y6 = this.x.redSqr(), S4 = this.y.redSqr(), N10 = S4.redSqr(), I4 = this.x.redAdd(S4).redSqr().redISub(y6).redISub(N10);
    I4 = I4.redIAdd(I4);
    var C4 = y6.redAdd(y6).redIAdd(y6), T3 = C4.redSqr(), U3 = N10.redIAdd(N10);
    U3 = U3.redIAdd(U3), U3 = U3.redIAdd(U3), t = T3.redISub(I4).redISub(I4), r3 = C4.redMul(I4.redISub(t)).redISub(U3), i4 = this.y.redMul(this.z), i4 = i4.redIAdd(i4);
  }
  return this.curve.jpoint(t, r3, i4);
}, Ft.prototype._threeDbl = function() {
  var t, r3, i4;
  if (this.zOne) {
    var n5 = this.x.redSqr(), o4 = this.y.redSqr(), h5 = o4.redSqr(), p3 = this.x.redAdd(o4).redSqr().redISub(n5).redISub(h5);
    p3 = p3.redIAdd(p3);
    var A3 = n5.redAdd(n5).redIAdd(n5).redIAdd(this.curve.a), v4 = A3.redSqr().redISub(p3).redISub(p3);
    t = v4;
    var w4 = h5.redIAdd(h5);
    w4 = w4.redIAdd(w4), w4 = w4.redIAdd(w4), r3 = A3.redMul(p3.redISub(v4)).redISub(w4), i4 = this.y.redAdd(this.y);
  } else {
    var y6 = this.z.redSqr(), S4 = this.y.redSqr(), N10 = this.x.redMul(S4), I4 = this.x.redSub(y6).redMul(this.x.redAdd(y6));
    I4 = I4.redAdd(I4).redIAdd(I4);
    var C4 = N10.redIAdd(N10);
    C4 = C4.redIAdd(C4);
    var T3 = C4.redAdd(C4);
    t = I4.redSqr().redISub(T3), i4 = this.y.redAdd(this.z).redSqr().redISub(S4).redISub(y6);
    var U3 = S4.redSqr();
    U3 = U3.redIAdd(U3), U3 = U3.redIAdd(U3), U3 = U3.redIAdd(U3), r3 = I4.redMul(C4.redISub(t)).redISub(U3);
  }
  return this.curve.jpoint(t, r3, i4);
}, Ft.prototype._dbl = function() {
  var t = this.curve.a, r3 = this.x, i4 = this.y, n5 = this.z, o4 = n5.redSqr().redSqr(), h5 = r3.redSqr(), p3 = i4.redSqr(), A3 = h5.redAdd(h5).redIAdd(h5).redIAdd(t.redMul(o4)), v4 = r3.redAdd(r3);
  v4 = v4.redIAdd(v4);
  var w4 = v4.redMul(p3), y6 = A3.redSqr().redISub(w4.redAdd(w4)), S4 = w4.redISub(y6), N10 = p3.redSqr();
  N10 = N10.redIAdd(N10), N10 = N10.redIAdd(N10), N10 = N10.redIAdd(N10);
  var I4 = A3.redMul(S4).redISub(N10), C4 = i4.redAdd(i4).redMul(n5);
  return this.curve.jpoint(y6, I4, C4);
}, Ft.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), r3 = this.y.redSqr(), i4 = this.z.redSqr(), n5 = r3.redSqr(), o4 = t.redAdd(t).redIAdd(t), h5 = o4.redSqr(), p3 = this.x.redAdd(r3).redSqr().redISub(t).redISub(n5);
  p3 = p3.redIAdd(p3), p3 = p3.redAdd(p3).redIAdd(p3), p3 = p3.redISub(h5);
  var A3 = p3.redSqr(), v4 = n5.redIAdd(n5);
  v4 = v4.redIAdd(v4), v4 = v4.redIAdd(v4), v4 = v4.redIAdd(v4);
  var w4 = o4.redIAdd(p3).redSqr().redISub(h5).redISub(A3).redISub(v4), y6 = r3.redMul(w4);
  y6 = y6.redIAdd(y6), y6 = y6.redIAdd(y6);
  var S4 = this.x.redMul(A3).redISub(y6);
  S4 = S4.redIAdd(S4), S4 = S4.redIAdd(S4);
  var N10 = this.y.redMul(w4.redMul(v4.redISub(w4)).redISub(p3.redMul(A3)));
  N10 = N10.redIAdd(N10), N10 = N10.redIAdd(N10), N10 = N10.redIAdd(N10);
  var I4 = this.z.redAdd(p3).redSqr().redISub(i4).redISub(A3);
  return this.curve.jpoint(S4, N10, I4);
}, Ft.prototype.mul = function(t, r3) {
  return t = new K(t, r3), this.curve._wnafMul(this, t);
}, Ft.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return true;
  var r3 = this.z.redSqr(), i4 = t.z.redSqr();
  if (this.x.redMul(i4).redISub(t.x.redMul(r3)).cmpn(0) !== 0)
    return false;
  var n5 = r3.redMul(this.z), o4 = i4.redMul(t.z);
  return this.y.redMul(o4).redISub(t.y.redMul(n5)).cmpn(0) === 0;
}, Ft.prototype.eqXToP = function(t) {
  var r3 = this.z.redSqr(), i4 = t.toRed(this.curve.red).redMul(r3);
  if (this.x.cmp(i4) === 0)
    return true;
  for (var n5 = t.clone(), o4 = this.curve.redN.redMul(r3); ; ) {
    if (n5.iadd(this.curve.n), n5.cmp(this.curve.p) >= 0)
      return false;
    if (i4.redIAdd(o4), this.x.cmp(i4) === 0)
      return true;
  }
}, Ft.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
}, Ft.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var zr = lr(function(e2, t) {
  var r3 = t;
  r3.base = Ze, r3.short = Qa, r3.mont = null, r3.edwards = null;
});
var jr = lr(function(e2, t) {
  var r3 = t, i4 = Gt.assert;
  function n5(p3) {
    p3.type === "short" ? this.curve = new zr.short(p3) : p3.type === "edwards" ? this.curve = new zr.edwards(p3) : this.curve = new zr.mont(p3), this.g = this.curve.g, this.n = this.curve.n, this.hash = p3.hash, i4(this.g.validate(), "Invalid curve"), i4(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  r3.PresetCurve = n5;
  function o4(p3, A3) {
    Object.defineProperty(r3, p3, { configurable: true, enumerable: true, get: function() {
      var v4 = new n5(A3);
      return Object.defineProperty(r3, p3, { configurable: true, enumerable: true, value: v4 }), v4;
    } });
  }
  o4("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: se.sha256, gRed: false, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), o4("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: se.sha256, gRed: false, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), o4("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: se.sha256, gRed: false, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), o4("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: se.sha384, gRed: false, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), o4("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: se.sha512, gRed: false, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), o4("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["9"] }), o4("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
  var h5;
  try {
    h5 = null.crash();
  } catch {
    h5 = void 0;
  }
  o4("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: se.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: false, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", h5] });
});
function Re(e2) {
  if (!(this instanceof Re))
    return new Re(e2);
  this.hash = e2.hash, this.predResist = !!e2.predResist, this.outLen = this.hash.outSize, this.minEntropy = e2.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = fe.toArray(e2.entropy, e2.entropyEnc || "hex"), r3 = fe.toArray(e2.nonce, e2.nonceEnc || "hex"), i4 = fe.toArray(e2.pers, e2.persEnc || "hex");
  ki(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r3, i4);
}
var Tf = Re;
Re.prototype._init = function(t, r3, i4) {
  var n5 = t.concat(r3).concat(i4);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var o4 = 0; o4 < this.V.length; o4++)
    this.K[o4] = 0, this.V[o4] = 1;
  this._update(n5), this._reseed = 1, this.reseedInterval = 281474976710656;
}, Re.prototype._hmac = function() {
  return new se.hmac(this.hash, this.K);
}, Re.prototype._update = function(t) {
  var r3 = this._hmac().update(this.V).update([0]);
  t && (r3 = r3.update(t)), this.K = r3.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
}, Re.prototype.reseed = function(t, r3, i4, n5) {
  typeof r3 != "string" && (n5 = i4, i4 = r3, r3 = null), t = fe.toArray(t, r3), i4 = fe.toArray(i4, n5), ki(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i4 || [])), this._reseed = 1;
}, Re.prototype.generate = function(t, r3, i4, n5) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof r3 != "string" && (n5 = i4, i4 = r3, r3 = null), i4 && (i4 = fe.toArray(i4, n5 || "hex"), this._update(i4));
  for (var o4 = []; o4.length < t; )
    this.V = this._hmac().update(this.V).digest(), o4 = o4.concat(this.V);
  var h5 = o4.slice(0, t);
  return this._update(i4), this._reseed++, fe.encode(h5, r3);
};
var Ki = Gt.assert;
function kt(e2, t) {
  this.ec = e2, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var Hi = kt;
kt.fromPublic = function(t, r3, i4) {
  return r3 instanceof kt ? r3 : new kt(t, { pub: r3, pubEnc: i4 });
}, kt.fromPrivate = function(t, r3, i4) {
  return r3 instanceof kt ? r3 : new kt(t, { priv: r3, privEnc: i4 });
}, kt.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: false, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: true, reason: null } : { result: false, reason: "Public key * N != O" } : { result: false, reason: "Public key is not a point" };
}, kt.prototype.getPublic = function(t, r3) {
  return typeof t == "string" && (r3 = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), r3 ? this.pub.encode(r3, t) : this.pub;
}, kt.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
}, kt.prototype._importPrivate = function(t, r3) {
  this.priv = new K(t, r3 || 16), this.priv = this.priv.umod(this.ec.curve.n);
}, kt.prototype._importPublic = function(t, r3) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? Ki(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && Ki(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, r3);
}, kt.prototype.derive = function(t) {
  return t.validate() || Ki(t.validate(), "public point not validated"), t.mul(this.priv).getX();
}, kt.prototype.sign = function(t, r3, i4) {
  return this.ec.sign(t, this, r3, i4);
}, kt.prototype.verify = function(t, r3) {
  return this.ec.verify(t, r3, this);
}, kt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Ja = Gt.assert;
function Qr(e2, t) {
  if (e2 instanceof Qr)
    return e2;
  this._importDER(e2, t) || (Ja(e2.r && e2.s, "Signature without r or s"), this.r = new K(e2.r, 16), this.s = new K(e2.s, 16), e2.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e2.recoveryParam);
}
var Jr = Qr;
function Ga() {
  this.place = 0;
}
function Li(e2, t) {
  var r3 = e2[t.place++];
  if (!(r3 & 128))
    return r3;
  var i4 = r3 & 15;
  if (i4 === 0 || i4 > 4)
    return false;
  for (var n5 = 0, o4 = 0, h5 = t.place; o4 < i4; o4++, h5++)
    n5 <<= 8, n5 |= e2[h5], n5 >>>= 0;
  return n5 <= 127 ? false : (t.place = h5, n5);
}
function Ff(e2) {
  for (var t = 0, r3 = e2.length - 1; !e2[t] && !(e2[t + 1] & 128) && t < r3; )
    t++;
  return t === 0 ? e2 : e2.slice(t);
}
Qr.prototype._importDER = function(t, r3) {
  t = Gt.toArray(t, r3);
  var i4 = new Ga();
  if (t[i4.place++] !== 48)
    return false;
  var n5 = Li(t, i4);
  if (n5 === false || n5 + i4.place !== t.length || t[i4.place++] !== 2)
    return false;
  var o4 = Li(t, i4);
  if (o4 === false)
    return false;
  var h5 = t.slice(i4.place, o4 + i4.place);
  if (i4.place += o4, t[i4.place++] !== 2)
    return false;
  var p3 = Li(t, i4);
  if (p3 === false || t.length !== p3 + i4.place)
    return false;
  var A3 = t.slice(i4.place, p3 + i4.place);
  if (h5[0] === 0)
    if (h5[1] & 128)
      h5 = h5.slice(1);
    else
      return false;
  if (A3[0] === 0)
    if (A3[1] & 128)
      A3 = A3.slice(1);
    else
      return false;
  return this.r = new K(h5), this.s = new K(A3), this.recoveryParam = null, true;
};
function zi(e2, t) {
  if (t < 128) {
    e2.push(t);
    return;
  }
  var r3 = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (e2.push(r3 | 128); --r3; )
    e2.push(t >>> (r3 << 3) & 255);
  e2.push(t);
}
Qr.prototype.toDER = function(t) {
  var r3 = this.r.toArray(), i4 = this.s.toArray();
  for (r3[0] & 128 && (r3 = [0].concat(r3)), i4[0] & 128 && (i4 = [0].concat(i4)), r3 = Ff(r3), i4 = Ff(i4); !i4[0] && !(i4[1] & 128); )
    i4 = i4.slice(1);
  var n5 = [2];
  zi(n5, r3.length), n5 = n5.concat(r3), n5.push(2), zi(n5, i4.length);
  var o4 = n5.concat(i4), h5 = [48];
  return zi(h5, o4.length), h5 = h5.concat(o4), Gt.encode(h5, t);
};
var Ya = function() {
  throw new Error("unsupported");
};
var Uf = Gt.assert;
function ee(e2) {
  if (!(this instanceof ee))
    return new ee(e2);
  typeof e2 == "string" && (Uf(Object.prototype.hasOwnProperty.call(jr, e2), "Unknown curve " + e2), e2 = jr[e2]), e2 instanceof jr.PresetCurve && (e2 = { curve: e2 }), this.curve = e2.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e2.curve.g, this.g.precompute(e2.curve.n.bitLength() + 1), this.hash = e2.hash || e2.curve.hash;
}
var Va = ee;
ee.prototype.keyPair = function(t) {
  return new Hi(this, t);
}, ee.prototype.keyFromPrivate = function(t, r3) {
  return Hi.fromPrivate(this, t, r3);
}, ee.prototype.keyFromPublic = function(t, r3) {
  return Hi.fromPublic(this, t, r3);
}, ee.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var r3 = new Tf({ hash: this.hash, pers: t.pers, persEnc: t.persEnc || "utf8", entropy: t.entropy || Ya(this.hash.hmacStrength), entropyEnc: t.entropy && t.entropyEnc || "utf8", nonce: this.n.toArray() }), i4 = this.n.byteLength(), n5 = this.n.sub(new K(2)); ; ) {
    var o4 = new K(r3.generate(i4));
    if (!(o4.cmp(n5) > 0))
      return o4.iaddn(1), this.keyFromPrivate(o4);
  }
}, ee.prototype._truncateToN = function(t, r3) {
  var i4 = t.byteLength() * 8 - this.n.bitLength();
  return i4 > 0 && (t = t.ushrn(i4)), !r3 && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
}, ee.prototype.sign = function(t, r3, i4, n5) {
  typeof i4 == "object" && (n5 = i4, i4 = null), n5 || (n5 = {}), r3 = this.keyFromPrivate(r3, i4), t = this._truncateToN(new K(t, 16));
  for (var o4 = this.n.byteLength(), h5 = r3.getPrivate().toArray("be", o4), p3 = t.toArray("be", o4), A3 = new Tf({ hash: this.hash, entropy: h5, nonce: p3, pers: n5.pers, persEnc: n5.persEnc || "utf8" }), v4 = this.n.sub(new K(1)), w4 = 0; ; w4++) {
    var y6 = n5.k ? n5.k(w4) : new K(A3.generate(this.n.byteLength()));
    if (y6 = this._truncateToN(y6, true), !(y6.cmpn(1) <= 0 || y6.cmp(v4) >= 0)) {
      var S4 = this.g.mul(y6);
      if (!S4.isInfinity()) {
        var N10 = S4.getX(), I4 = N10.umod(this.n);
        if (I4.cmpn(0) !== 0) {
          var C4 = y6.invm(this.n).mul(I4.mul(r3.getPrivate()).iadd(t));
          if (C4 = C4.umod(this.n), C4.cmpn(0) !== 0) {
            var T3 = (S4.getY().isOdd() ? 1 : 0) | (N10.cmp(I4) !== 0 ? 2 : 0);
            return n5.canonical && C4.cmp(this.nh) > 0 && (C4 = this.n.sub(C4), T3 ^= 1), new Jr({ r: I4, s: C4, recoveryParam: T3 });
          }
        }
      }
    }
  }
}, ee.prototype.verify = function(t, r3, i4, n5) {
  t = this._truncateToN(new K(t, 16)), i4 = this.keyFromPublic(i4, n5), r3 = new Jr(r3, "hex");
  var o4 = r3.r, h5 = r3.s;
  if (o4.cmpn(1) < 0 || o4.cmp(this.n) >= 0 || h5.cmpn(1) < 0 || h5.cmp(this.n) >= 0)
    return false;
  var p3 = h5.invm(this.n), A3 = p3.mul(t).umod(this.n), v4 = p3.mul(o4).umod(this.n), w4;
  return this.curve._maxwellTrick ? (w4 = this.g.jmulAdd(A3, i4.getPublic(), v4), w4.isInfinity() ? false : w4.eqXToP(o4)) : (w4 = this.g.mulAdd(A3, i4.getPublic(), v4), w4.isInfinity() ? false : w4.getX().umod(this.n).cmp(o4) === 0);
}, ee.prototype.recoverPubKey = function(e2, t, r3, i4) {
  Uf((3 & r3) === r3, "The recovery param is more than two bits"), t = new Jr(t, i4);
  var n5 = this.n, o4 = new K(e2), h5 = t.r, p3 = t.s, A3 = r3 & 1, v4 = r3 >> 1;
  if (h5.cmp(this.curve.p.umod(this.curve.n)) >= 0 && v4)
    throw new Error("Unable to find sencond key candinate");
  v4 ? h5 = this.curve.pointFromX(h5.add(this.curve.n), A3) : h5 = this.curve.pointFromX(h5, A3);
  var w4 = t.r.invm(n5), y6 = n5.sub(o4).mul(w4).umod(n5), S4 = p3.mul(w4).umod(n5);
  return this.g.mulAdd(y6, h5, S4);
}, ee.prototype.getKeyRecoveryParam = function(e2, t, r3, i4) {
  if (t = new Jr(t, i4), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var n5 = 0; n5 < 4; n5++) {
    var o4;
    try {
      o4 = this.recoverPubKey(e2, t, n5);
    } catch {
      continue;
    }
    if (o4.eq(r3))
      return n5;
  }
  throw new Error("Unable to find valid recovery factor");
};
var Wa = lr(function(e2, t) {
  var r3 = t;
  r3.version = "6.5.4", r3.utils = Gt, r3.rand = function() {
    throw new Error("unsupported");
  }, r3.curve = zr, r3.curves = jr, r3.ec = Va, r3.eddsa = null;
});
var Xa = Wa.ec;
var Za = "signing-key/5.7.0";
var ji = new z(Za);
var Qi = null;
function ve() {
  return Qi || (Qi = new Xa("secp256k1")), Qi;
}
var $a = class {
  constructor(t) {
    wr(this, "curve", "secp256k1"), wr(this, "privateKey", Kt(t)), Ps(this.privateKey) !== 32 && ji.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const r3 = ve().keyFromPrivate(Ot(this.privateKey));
    wr(this, "publicKey", "0x" + r3.getPublic(false, "hex")), wr(this, "compressedPublicKey", "0x" + r3.getPublic(true, "hex")), wr(this, "_isSigningKey", true);
  }
  _addPoint(t) {
    const r3 = ve().keyFromPublic(Ot(this.publicKey)), i4 = ve().keyFromPublic(Ot(t));
    return "0x" + r3.pub.add(i4.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const r3 = ve().keyFromPrivate(Ot(this.privateKey)), i4 = Ot(t);
    i4.length !== 32 && ji.throwArgumentError("bad digest length", "digest", t);
    const n5 = r3.sign(i4, { canonical: true });
    return Jn({ recoveryParam: n5.recoveryParam, r: oe("0x" + n5.r.toString(16), 32), s: oe("0x" + n5.s.toString(16), 32) });
  }
  computeSharedSecret(t) {
    const r3 = ve().keyFromPrivate(Ot(this.privateKey)), i4 = ve().keyFromPublic(Ot(kf(t)));
    return oe("0x" + r3.derive(i4.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
};
function tu(e2, t) {
  const r3 = Jn(t), i4 = { r: Ot(r3.r), s: Ot(r3.s) };
  return "0x" + ve().recoverPubKey(Ot(e2), i4, r3.recoveryParam).encode("hex", false);
}
function kf(e2, t) {
  const r3 = Ot(e2);
  if (r3.length === 32) {
    const i4 = new $a(r3);
    return t ? "0x" + ve().keyFromPrivate(r3).getPublic(true, "hex") : i4.publicKey;
  } else {
    if (r3.length === 33)
      return t ? Kt(r3) : "0x" + ve().keyFromPublic(r3).getPublic(false, "hex");
    if (r3.length === 65)
      return t ? "0x" + ve().keyFromPublic(r3).getPublic(true, "hex") : Kt(r3);
  }
  return ji.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var eu = "transactions/5.7.0";
new z(eu);
var qf;
(function(e2) {
  e2[e2.legacy = 0] = "legacy", e2[e2.eip2930 = 1] = "eip2930", e2[e2.eip1559 = 2] = "eip1559";
})(qf || (qf = {}));
function ru(e2) {
  const t = kf(e2);
  return c0(Qn(Si(Qn(t, 1)), 12));
}
function iu(e2, t) {
  return ru(tu(Ot(e2), t));
}
var nu = "https://rpc.walletconnect.org/v1";
async function Kf(e2, t, r3, i4, n5, o4) {
  switch (r3.t) {
    case "eip191":
      return Hf(e2, t, r3.s);
    case "eip1271":
      return await Lf(e2, t, r3.s, i4, n5, o4);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${r3.t}`);
  }
}
function Hf(e2, t, r3) {
  return iu(uf(t), r3).toLowerCase() === e2.toLowerCase();
}
async function Lf(e2, t, r3, i4, n5, o4) {
  try {
    const h5 = "0x1626ba7e", p3 = "0000000000000000000000000000000000000000000000000000000000000040", A3 = "0000000000000000000000000000000000000000000000000000000000000041", v4 = r3.substring(2), w4 = uf(t).substring(2), y6 = h5 + w4 + p3 + A3 + v4, S4 = await fetch(`${o4 || nu}/?chainId=${i4}&projectId=${n5}`, { method: "POST", body: JSON.stringify({ id: fu(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e2, data: y6 }, "latest"] }) }), { result: N10 } = await S4.json();
    return N10 ? N10.slice(0, h5.length).toLowerCase() === h5.toLowerCase() : false;
  } catch (h5) {
    return console.error("isValidEip1271Signature: ", h5), false;
  }
}
function fu() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var ou = Object.defineProperty;
var su = Object.defineProperties;
var au = Object.getOwnPropertyDescriptors;
var zf = Object.getOwnPropertySymbols;
var uu = Object.prototype.hasOwnProperty;
var hu = Object.prototype.propertyIsEnumerable;
var jf = (e2, t, r3) => t in e2 ? ou(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var Ji = (e2, t) => {
  for (var r3 in t || (t = {}))
    uu.call(t, r3) && jf(e2, r3, t[r3]);
  if (zf)
    for (var r3 of zf(t))
      hu.call(t, r3) && jf(e2, r3, t[r3]);
  return e2;
};
var Qf = (e2, t) => su(e2, au(t));
var cu = "did:pkh:";
var Gr = (e2) => e2 == null ? void 0 : e2.split(":");
var Gi = (e2) => {
  const t = e2 && Gr(e2);
  if (t)
    return e2.includes(cu) ? t[3] : t[1];
};
var lu = (e2) => {
  const t = e2 && Gr(e2);
  if (t)
    return t[2] + ":" + t[3];
};
var Yi = (e2) => {
  const t = e2 && Gr(e2);
  if (t)
    return t.pop();
};
async function du(e2) {
  const { cacao: t, projectId: r3 } = e2, { s: i4, p: n5 } = t, o4 = Jf(n5, n5.iss), h5 = Yi(n5.iss);
  return await Kf(h5, o4, i4, Gi(n5.iss), r3);
}
var Jf = (e2, t) => {
  const r3 = `${e2.domain} wants you to sign in with your Ethereum account:`, i4 = Yi(t);
  if (!e2.aud && !e2.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let n5 = e2.statement || void 0;
  const o4 = `URI: ${e2.aud || e2.uri}`, h5 = `Version: ${e2.version}`, p3 = `Chain ID: ${Gi(t)}`, A3 = `Nonce: ${e2.nonce}`, v4 = `Issued At: ${e2.iat}`, w4 = e2.exp ? `Expiration Time: ${e2.exp}` : void 0, y6 = e2.nbf ? `Not Before: ${e2.nbf}` : void 0, S4 = e2.requestId ? `Request ID: ${e2.requestId}` : void 0, N10 = e2.resources ? `Resources:${e2.resources.map((C4) => `
- ${C4}`).join("")}` : void 0, I4 = Vr(e2.resources);
  if (I4) {
    const C4 = Oe(I4);
    n5 = Xi(n5, C4);
  }
  return [r3, i4, "", n5, "", o4, h5, p3, A3, v4, w4, y6, S4, N10].filter((C4) => C4 != null).join(`
`);
};
function Wf(e2) {
  return Buffer.from(JSON.stringify(e2)).toString("base64");
}
function Xf(e2) {
  return JSON.parse(Buffer.from(e2, "base64").toString("utf-8"));
}
function ge(e2) {
  if (!e2)
    throw new Error("No recap provided, value is undefined");
  if (!e2.att)
    throw new Error("No `att` property found");
  const t = Object.keys(e2.att);
  if (!(t != null && t.length))
    throw new Error("No resources found in `att` property");
  t.forEach((r3) => {
    const i4 = e2.att[r3];
    if (Array.isArray(i4))
      throw new Error(`Resource must be an object: ${r3}`);
    if (typeof i4 != "object")
      throw new Error(`Resource must be an object: ${r3}`);
    if (!Object.keys(i4).length)
      throw new Error(`Resource object is empty: ${r3}`);
    Object.keys(i4).forEach((n5) => {
      const o4 = i4[n5];
      if (!Array.isArray(o4))
        throw new Error(`Ability limits ${n5} must be an array of objects, found: ${o4}`);
      if (!o4.length)
        throw new Error(`Value of ${n5} is empty array, must be an array with objects`);
      o4.forEach((h5) => {
        if (typeof h5 != "object")
          throw new Error(`Ability limits (${n5}) must be an array of objects, found: ${h5}`);
      });
    });
  });
}
function Zf(e2, t, r3, i4 = {}) {
  return r3 == null ? void 0 : r3.sort((n5, o4) => n5.localeCompare(o4)), { att: { [e2]: Vi(t, r3, i4) } };
}
function Vi(e2, t, r3 = {}) {
  t = t == null ? void 0 : t.sort((n5, o4) => n5.localeCompare(o4));
  const i4 = t.map((n5) => ({ [`${e2}/${n5}`]: [r3] }));
  return Object.assign({}, ...i4);
}
function Yr(e2) {
  return ge(e2), `urn:recap:${Wf(e2).replace(/=/g, "")}`;
}
function Oe(e2) {
  const t = Xf(e2.replace("urn:recap:", ""));
  return ge(t), t;
}
function Au(e2, t, r3) {
  const i4 = Zf(e2, t, r3);
  return Yr(i4);
}
function Wi(e2) {
  return e2 && e2.includes("urn:recap:");
}
function bu(e2, t) {
  const r3 = Oe(e2), i4 = Oe(t), n5 = to(r3, i4);
  return Yr(n5);
}
function to(e2, t) {
  ge(e2), ge(t);
  const r3 = Object.keys(e2.att).concat(Object.keys(t.att)).sort((n5, o4) => n5.localeCompare(o4)), i4 = { att: {} };
  return r3.forEach((n5) => {
    var o4, h5;
    Object.keys(((o4 = e2.att) == null ? void 0 : o4[n5]) || {}).concat(Object.keys(((h5 = t.att) == null ? void 0 : h5[n5]) || {})).sort((p3, A3) => p3.localeCompare(A3)).forEach((p3) => {
      var A3, v4;
      i4.att[n5] = Qf(Ji({}, i4.att[n5]), { [p3]: ((A3 = e2.att[n5]) == null ? void 0 : A3[p3]) || ((v4 = t.att[n5]) == null ? void 0 : v4[p3]) });
    });
  }), i4;
}
function Xi(e2 = "", t) {
  ge(t);
  const r3 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e2.includes(r3))
    return e2;
  const i4 = [];
  let n5 = 0;
  Object.keys(t.att).forEach((p3) => {
    const A3 = Object.keys(t.att[p3]).map((y6) => ({ ability: y6.split("/")[0], action: y6.split("/")[1] }));
    A3.sort((y6, S4) => y6.action.localeCompare(S4.action));
    const v4 = {};
    A3.forEach((y6) => {
      v4[y6.ability] || (v4[y6.ability] = []), v4[y6.ability].push(y6.action);
    });
    const w4 = Object.keys(v4).map((y6) => (n5++, `(${n5}) '${y6}': '${v4[y6].join("', '")}' for '${p3}'.`));
    i4.push(w4.join(", ").replace(".,", "."));
  });
  const o4 = i4.join(" "), h5 = `${r3}${o4}`;
  return `${e2 ? e2 + " " : ""}${h5}`;
}
function yu(e2) {
  var t;
  const r3 = Oe(e2);
  ge(r3);
  const i4 = (t = r3.att) == null ? void 0 : t.eip155;
  return i4 ? Object.keys(i4).map((n5) => n5.split("/")[1]) : [];
}
function wu(e2) {
  const t = Oe(e2);
  ge(t);
  const r3 = [];
  return Object.values(t.att).forEach((i4) => {
    Object.values(i4).forEach((n5) => {
      var o4;
      (o4 = n5 == null ? void 0 : n5[0]) != null && o4.chains && r3.push(n5[0].chains);
    });
  }), [...new Set(r3.flat())];
}
function Vr(e2) {
  if (!e2)
    return;
  const t = e2 == null ? void 0 : e2[e2.length - 1];
  return Wi(t) ? t : void 0;
}
var Zi = "base10";
var Lt = "base16";
var $i = "base64pad";
var xu = "base64url";
var dr = "utf8";
var tn = 0;
var pr = 1;
var Sr = 2;
var Mu = 0;
var ro = 1;
var Ir = 12;
var en = 32;
function Eu() {
  const e2 = gn.generateKeyPair();
  return { privateKey: toString2(e2.secretKey, Lt), publicKey: toString2(e2.publicKey, Lt) };
}
function Su() {
  const e2 = (0, import_random2.randomBytes)(en);
  return toString2(e2, Lt);
}
function Iu(e2, t) {
  const r3 = gn.sharedKey(fromString2(e2, Lt), fromString2(t, Lt), true), i4 = new import_hkdf.HKDF(import_sha256.SHA256, r3).expand(en);
  return toString2(i4, Lt);
}
function Nu(e2) {
  const t = (0, import_sha256.hash)(fromString2(e2, Lt));
  return toString2(t, Lt);
}
function _u(e2) {
  const t = (0, import_sha256.hash)(fromString2(e2, dr));
  return toString2(t, Lt);
}
function rn(e2) {
  return fromString2(`${e2}`, Zi);
}
function $e(e2) {
  return Number(toString2(e2, Zi));
}
function Bu(e2) {
  const t = rn(typeof e2.type < "u" ? e2.type : tn);
  if ($e(t) === pr && typeof e2.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const r3 = typeof e2.senderPublicKey < "u" ? fromString2(e2.senderPublicKey, Lt) : void 0, i4 = typeof e2.iv < "u" ? fromString2(e2.iv, Lt) : (0, import_random2.randomBytes)(Ir), n5 = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e2.symKey, Lt)).seal(i4, fromString2(e2.message, dr));
  return nn({ type: t, sealed: n5, iv: i4, senderPublicKey: r3, encoding: e2.encoding });
}
function Cu(e2, t) {
  const r3 = rn(Sr), i4 = (0, import_random2.randomBytes)(Ir), n5 = fromString2(e2, dr);
  return nn({ type: r3, sealed: n5, iv: i4, encoding: t });
}
function Ru(e2) {
  const t = new import_chacha20poly1305.ChaCha20Poly1305(fromString2(e2.symKey, Lt)), { sealed: r3, iv: i4 } = Wr({ encoded: e2.encoded, encoding: e2 == null ? void 0 : e2.encoding }), n5 = t.open(i4, r3);
  if (n5 === null)
    throw new Error("Failed to decrypt");
  return toString2(n5, dr);
}
function Ou(e2, t) {
  const { sealed: r3 } = Wr({ encoded: e2, encoding: t });
  return toString2(r3, dr);
}
function nn(e2) {
  const { encoding: t = $i } = e2;
  if ($e(e2.type) === Sr)
    return toString2(concat([e2.type, e2.sealed]), t);
  if ($e(e2.type) === pr) {
    if (typeof e2.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return toString2(concat([e2.type, e2.senderPublicKey, e2.iv, e2.sealed]), t);
  }
  return toString2(concat([e2.type, e2.iv, e2.sealed]), t);
}
function Wr(e2) {
  const { encoded: t, encoding: r3 = $i } = e2, i4 = fromString2(t, r3), n5 = i4.slice(Mu, ro), o4 = ro;
  if ($e(n5) === pr) {
    const v4 = o4 + en, w4 = v4 + Ir, y6 = i4.slice(o4, v4), S4 = i4.slice(v4, w4), N10 = i4.slice(w4);
    return { type: n5, sealed: N10, iv: S4, senderPublicKey: y6 };
  }
  if ($e(n5) === Sr) {
    const v4 = i4.slice(o4), w4 = (0, import_random2.randomBytes)(Ir);
    return { type: n5, sealed: v4, iv: w4 };
  }
  const h5 = o4 + Ir, p3 = i4.slice(o4, h5), A3 = i4.slice(h5);
  return { type: n5, sealed: A3, iv: p3 };
}
function Pu(e2, t) {
  const r3 = Wr({ encoded: e2, encoding: t == null ? void 0 : t.encoding });
  return io({ type: $e(r3.type), senderPublicKey: typeof r3.senderPublicKey < "u" ? toString2(r3.senderPublicKey, Lt) : void 0, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey });
}
function io(e2) {
  const t = (e2 == null ? void 0 : e2.type) || tn;
  if (t === pr) {
    if (typeof (e2 == null ? void 0 : e2.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (e2 == null ? void 0 : e2.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e2 == null ? void 0 : e2.senderPublicKey, receiverPublicKey: e2 == null ? void 0 : e2.receiverPublicKey };
}
function Du(e2) {
  return e2.type === pr && typeof e2.senderPublicKey == "string" && typeof e2.receiverPublicKey == "string";
}
function Tu(e2) {
  return e2.type === Sr;
}
function no(e2) {
  return new import_elliptic.ec("p256").keyFromPublic({ x: Buffer.from(e2.x, "base64").toString("hex"), y: Buffer.from(e2.y, "base64").toString("hex") }, "hex");
}
function Fu(e2) {
  let t = e2.replace(/-/g, "+").replace(/_/g, "/");
  const r3 = t.length % 4;
  return r3 > 0 && (t += "=".repeat(4 - r3)), t;
}
function Uu(e2) {
  return Buffer.from(Fu(e2), "base64");
}
function ku(e2, t) {
  const [r3, i4, n5] = e2.split("."), o4 = Uu(n5);
  if (o4.length !== 64)
    throw new Error("Invalid signature length");
  const h5 = o4.slice(0, 32).toString("hex"), p3 = o4.slice(32, 64).toString("hex"), A3 = `${r3}.${i4}`, v4 = new import_sha256.SHA256().update(Buffer.from(A3)).digest(), w4 = no(t), y6 = Buffer.from(v4).toString("hex");
  if (!w4.verify(y6, { r: h5, s: p3 }))
    throw new Error("Invalid signature");
  return decodeJWT(e2).payload;
}
var fo = "irn";
function qu(e2) {
  return (e2 == null ? void 0 : e2.relay) || { protocol: fo };
}
function Ku(e2) {
  const t = C[e2];
  if (typeof t > "u")
    throw new Error(`Relay Protocol not supported: ${e2}`);
  return t;
}
var Hu = Object.defineProperty;
var Lu = Object.defineProperties;
var zu = Object.getOwnPropertyDescriptors;
var oo = Object.getOwnPropertySymbols;
var ju = Object.prototype.hasOwnProperty;
var Qu = Object.prototype.propertyIsEnumerable;
var so = (e2, t, r3) => t in e2 ? Hu(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var ao = (e2, t) => {
  for (var r3 in t || (t = {}))
    ju.call(t, r3) && so(e2, r3, t[r3]);
  if (oo)
    for (var r3 of oo(t))
      Qu.call(t, r3) && so(e2, r3, t[r3]);
  return e2;
};
var Ju = (e2, t) => Lu(e2, zu(t));
function uo(e2, t = "-") {
  const r3 = {}, i4 = "relay" + t;
  return Object.keys(e2).forEach((n5) => {
    if (n5.startsWith(i4)) {
      const o4 = n5.replace(i4, ""), h5 = e2[n5];
      r3[o4] = h5;
    }
  }), r3;
}
function Gu(e2) {
  e2 = e2.includes("wc://") ? e2.replace("wc://", "") : e2, e2 = e2.includes("wc:") ? e2.replace("wc:", "") : e2;
  const t = e2.indexOf(":"), r3 = e2.indexOf("?") !== -1 ? e2.indexOf("?") : void 0, i4 = e2.substring(0, t), n5 = e2.substring(t + 1, r3).split("@"), o4 = typeof r3 < "u" ? e2.substring(r3) : "", h5 = Br.parse(o4), p3 = typeof h5.methods == "string" ? h5.methods.split(",") : void 0;
  return { protocol: i4, topic: ho(n5[0]), version: parseInt(n5[1], 10), symKey: h5.symKey, relay: uo(h5), methods: p3, expiryTimestamp: h5.expiryTimestamp ? parseInt(h5.expiryTimestamp, 10) : void 0 };
}
function ho(e2) {
  return e2.startsWith("//") ? e2.substring(2) : e2;
}
function co(e2, t = "-") {
  const r3 = "relay", i4 = {};
  return Object.keys(e2).forEach((n5) => {
    const o4 = r3 + t + n5;
    e2[n5] && (i4[o4] = e2[n5]);
  }), i4;
}
function Yu(e2) {
  return `${e2.protocol}:${e2.topic}@${e2.version}?` + Br.stringify(ao(Ju(ao({ symKey: e2.symKey }, co(e2.relay)), { expiryTimestamp: e2.expiryTimestamp }), e2.methods ? { methods: e2.methods.join(",") } : {}));
}
function Vu(e2, t, r3) {
  return `${e2}?wc_ev=${r3}&topic=${t}`;
}
function tr(e2) {
  const t = [];
  return e2.forEach((r3) => {
    const [i4, n5] = r3.split(":");
    t.push(`${i4}:${n5}`);
  }), t;
}
function vo(e2) {
  const t = [];
  return Object.values(e2).forEach((r3) => {
    t.push(...tr(r3.accounts));
  }), t;
}
function go(e2, t) {
  const r3 = [];
  return Object.values(e2).forEach((i4) => {
    tr(i4.accounts).includes(t) && r3.push(...i4.methods);
  }), r3;
}
function mo(e2, t) {
  const r3 = [];
  return Object.values(e2).forEach((i4) => {
    tr(i4.accounts).includes(t) && r3.push(...i4.events);
  }), r3;
}
function fn(e2) {
  return e2.includes(":");
}
function Ao(e2) {
  return fn(e2) ? e2.split(":")[0] : e2;
}
function bo(e2) {
  const t = {};
  return e2 == null ? void 0 : e2.forEach((r3) => {
    const [i4, n5] = r3.split(":");
    t[i4] || (t[i4] = { accounts: [], chains: [], events: [] }), t[i4].accounts.push(r3), t[i4].chains.push(`${i4}:${n5}`);
  }), t;
}
function fh(e2, t) {
  t = t.map((i4) => i4.replace("did:pkh:", ""));
  const r3 = bo(t);
  for (const [i4, n5] of Object.entries(r3))
    n5.methods ? n5.methods = me(n5.methods, e2) : n5.methods = e2, n5.events = ["chainChanged", "accountsChanged"];
  return r3;
}
var yo = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var wo = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function xe(e2, t) {
  const { message: r3, code: i4 } = wo[e2];
  return { message: t ? `${r3} ${t}` : r3, code: i4 };
}
function er(e2, t) {
  const { message: r3, code: i4 } = yo[e2];
  return { message: t ? `${r3} ${t}` : r3, code: i4 };
}
function Nr(e2, t) {
  return Array.isArray(e2) ? typeof t < "u" && e2.length ? e2.every(t) : true : false;
}
function Xr(e2) {
  return Object.getPrototypeOf(e2) === Object.prototype && Object.keys(e2).length;
}
function Pe(e2) {
  return typeof e2 > "u";
}
function Yt(e2, t) {
  return t && Pe(e2) ? true : typeof e2 == "string" && !!e2.trim().length;
}
function Zr(e2, t) {
  return t && Pe(e2) ? true : typeof e2 == "number" && !isNaN(e2);
}
function oh(e2, t) {
  const { requiredNamespaces: r3 } = t, i4 = Object.keys(e2.namespaces), n5 = Object.keys(r3);
  let o4 = true;
  return _e(n5, i4) ? (i4.forEach((h5) => {
    const { accounts: p3, methods: A3, events: v4 } = e2.namespaces[h5], w4 = tr(p3), y6 = r3[h5];
    (!_e(Or(h5, y6), w4) || !_e(y6.methods, A3) || !_e(y6.events, v4)) && (o4 = false);
  }), o4) : false;
}
function _r(e2) {
  return Yt(e2, false) && e2.includes(":") ? e2.split(":").length === 2 : false;
}
function xo(e2) {
  if (Yt(e2, false) && e2.includes(":")) {
    const t = e2.split(":");
    if (t.length === 3) {
      const r3 = t[0] + ":" + t[1];
      return !!t[2] && _r(r3);
    }
  }
  return false;
}
function sh(e2) {
  if (Yt(e2, false))
    try {
      return typeof new URL(e2) < "u";
    } catch {
      return false;
    }
  return false;
}
function ah(e2) {
  var t;
  return (t = e2 == null ? void 0 : e2.proposer) == null ? void 0 : t.publicKey;
}
function uh(e2) {
  return e2 == null ? void 0 : e2.topic;
}
function hh(e2, t) {
  let r3 = null;
  return Yt(e2 == null ? void 0 : e2.publicKey, false) || (r3 = xe("MISSING_OR_INVALID", `${t} controller public key should be a string`)), r3;
}
function sn(e2) {
  let t = true;
  return Nr(e2) ? e2.length && (t = e2.every((r3) => Yt(r3, false))) : t = false, t;
}
function Mo(e2, t, r3) {
  let i4 = null;
  return Nr(t) && t.length ? t.forEach((n5) => {
    i4 || _r(n5) || (i4 = er("UNSUPPORTED_CHAINS", `${r3}, chain ${n5} should be a string and conform to "namespace:chainId" format`));
  }) : _r(e2) || (i4 = er("UNSUPPORTED_CHAINS", `${r3}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), i4;
}
function Eo(e2, t, r3) {
  let i4 = null;
  return Object.entries(e2).forEach(([n5, o4]) => {
    if (i4)
      return;
    const h5 = Mo(n5, Or(n5, o4), `${t} ${r3}`);
    h5 && (i4 = h5);
  }), i4;
}
function So(e2, t) {
  let r3 = null;
  return Nr(e2) ? e2.forEach((i4) => {
    r3 || xo(i4) || (r3 = er("UNSUPPORTED_ACCOUNTS", `${t}, account ${i4} should be a string and conform to "namespace:chainId:address" format`));
  }) : r3 = er("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), r3;
}
function Io(e2, t) {
  let r3 = null;
  return Object.values(e2).forEach((i4) => {
    if (r3)
      return;
    const n5 = So(i4 == null ? void 0 : i4.accounts, `${t} namespace`);
    n5 && (r3 = n5);
  }), r3;
}
function No(e2, t) {
  let r3 = null;
  return sn(e2 == null ? void 0 : e2.methods) ? sn(e2 == null ? void 0 : e2.events) || (r3 = er("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : r3 = er("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), r3;
}
function an(e2, t) {
  let r3 = null;
  return Object.values(e2).forEach((i4) => {
    if (r3)
      return;
    const n5 = No(i4, `${t}, namespace`);
    n5 && (r3 = n5);
  }), r3;
}
function ch(e2, t, r3) {
  let i4 = null;
  if (e2 && Xr(e2)) {
    const n5 = an(e2, t);
    n5 && (i4 = n5);
    const o4 = Eo(e2, t, r3);
    o4 && (i4 = o4);
  } else
    i4 = xe("MISSING_OR_INVALID", `${t}, ${r3} should be an object with data`);
  return i4;
}
function _o(e2, t) {
  let r3 = null;
  if (e2 && Xr(e2)) {
    const i4 = an(e2, t);
    i4 && (r3 = i4);
    const n5 = Io(e2, t);
    n5 && (r3 = n5);
  } else
    r3 = xe("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return r3;
}
function Bo(e2) {
  return Yt(e2.protocol, true);
}
function lh(e2, t) {
  let r3 = false;
  return t && !e2 ? r3 = true : e2 && Nr(e2) && e2.length && e2.forEach((i4) => {
    r3 = Bo(i4);
  }), r3;
}
function dh(e2) {
  return typeof e2 == "number";
}
function ph(e2) {
  return typeof e2 < "u" && typeof e2 !== null;
}
function vh(e2) {
  return !(!e2 || typeof e2 != "object" || !e2.code || !Zr(e2.code, false) || !e2.message || !Yt(e2.message, false));
}
function gh(e2) {
  return !(Pe(e2) || !Yt(e2.method, false));
}
function mh(e2) {
  return !(Pe(e2) || Pe(e2.result) && Pe(e2.error) || !Zr(e2.id, false) || !Yt(e2.jsonrpc, false));
}
function Ah(e2) {
  return !(Pe(e2) || !Yt(e2.name, false));
}
function bh(e2, t) {
  return !(!_r(t) || !vo(e2).includes(t));
}
function yh(e2, t, r3) {
  return Yt(r3, false) ? go(e2, t).includes(r3) : false;
}
function wh(e2, t, r3) {
  return Yt(r3, false) ? mo(e2, t).includes(r3) : false;
}
function Co(e2, t, r3) {
  let i4 = null;
  const n5 = xh(e2), o4 = Mh(t), h5 = Object.keys(n5), p3 = Object.keys(o4), A3 = Ro(Object.keys(e2)), v4 = Ro(Object.keys(t)), w4 = A3.filter((y6) => !v4.includes(y6));
  return w4.length && (i4 = xe("NON_CONFORMING_NAMESPACES", `${r3} namespaces keys don't satisfy requiredNamespaces.
      Required: ${w4.toString()}
      Received: ${Object.keys(t).toString()}`)), _e(h5, p3) || (i4 = xe("NON_CONFORMING_NAMESPACES", `${r3} namespaces chains don't satisfy required namespaces.
      Required: ${h5.toString()}
      Approved: ${p3.toString()}`)), Object.keys(t).forEach((y6) => {
    if (!y6.includes(":") || i4)
      return;
    const S4 = tr(t[y6].accounts);
    S4.includes(y6) || (i4 = xe("NON_CONFORMING_NAMESPACES", `${r3} namespaces accounts don't satisfy namespace accounts for ${y6}
        Required: ${y6}
        Approved: ${S4.toString()}`));
  }), h5.forEach((y6) => {
    i4 || (_e(n5[y6].methods, o4[y6].methods) ? _e(n5[y6].events, o4[y6].events) || (i4 = xe("NON_CONFORMING_NAMESPACES", `${r3} namespaces events don't satisfy namespace events for ${y6}`)) : i4 = xe("NON_CONFORMING_NAMESPACES", `${r3} namespaces methods don't satisfy namespace methods for ${y6}`));
  }), i4;
}
function xh(e2) {
  const t = {};
  return Object.keys(e2).forEach((r3) => {
    var i4;
    r3.includes(":") ? t[r3] = e2[r3] : (i4 = e2[r3].chains) == null || i4.forEach((n5) => {
      t[n5] = { methods: e2[r3].methods, events: e2[r3].events };
    });
  }), t;
}
function Ro(e2) {
  return [...new Set(e2.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function Mh(e2) {
  const t = {};
  return Object.keys(e2).forEach((r3) => {
    if (r3.includes(":"))
      t[r3] = e2[r3];
    else {
      const i4 = tr(e2[r3].accounts);
      i4 == null ? void 0 : i4.forEach((n5) => {
        t[n5] = { accounts: e2[r3].accounts.filter((o4) => o4.includes(`${n5}:`)), methods: e2[r3].methods, events: e2[r3].events };
      });
    }
  }), t;
}
function Eh(e2, t) {
  return Zr(e2, false) && e2 <= t.max && e2 >= t.min;
}
function Sh() {
  const e2 = We();
  return new Promise((t) => {
    switch (e2) {
      case qt.browser:
        t(Oo());
        break;
      case qt.reactNative:
        t(Po());
        break;
      case qt.node:
        t(Do());
        break;
      default:
        t(true);
    }
  });
}
function Oo() {
  return gr() && (navigator == null ? void 0 : navigator.onLine);
}
async function Po() {
  if (rr() && typeof global < "u" && global != null && global.NetInfo) {
    const e2 = await (global == null ? void 0 : global.NetInfo.fetch());
    return e2 == null ? void 0 : e2.isConnected;
  }
  return true;
}
function Do() {
  return true;
}
function Ih(e2) {
  switch (We()) {
    case qt.browser:
      To(e2);
      break;
    case qt.reactNative:
      Fo(e2);
      break;
    case qt.node:
      break;
  }
}
function To(e2) {
  !rr() && gr() && (window.addEventListener("online", () => e2(true)), window.addEventListener("offline", () => e2(false)));
}
function Fo(e2) {
  rr() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((t) => e2(t == null ? void 0 : t.isConnected)));
}
var un = {};
var Nh = class {
  static get(t) {
    return un[t];
  }
  static set(t, r3) {
    un[t] = r3;
  }
  static delete(t) {
    delete un[t];
  }
};

// node_modules/@walletconnect/logger/dist/index.es.js
var import_pino = __toESM(require_browser2());
var import_pino2 = __toESM(require_browser2());
var c = { level: "info" };
var n = "custom_context";
var l = 1e3 * 1024;
var O = class {
  constructor(e2) {
    this.nodeValue = e2, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var d = class {
  constructor(e2) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e2, this.sizeInBytes = 0;
  }
  append(e2) {
    const t = new O(e2);
    if (t.size > this.maxSizeInBytes)
      throw new Error(`[LinkedList] Value too big to insert into list: ${e2} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; )
      this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head)
      return;
    const e2 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e2.size;
  }
  toArray() {
    const e2 = [];
    let t = this.head;
    for (; t !== null; )
      e2.push(t.value), t = t.next;
    return e2;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e2 = this.head;
    return { next: () => {
      if (!e2)
        return { done: true, value: null };
      const t = e2.value;
      return e2 = e2.next, { done: false, value: t };
    } };
  }
};
var L = class {
  constructor(e2, t = l) {
    this.level = e2 ?? "error", this.levelValue = import_pino.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e2, t) {
    t === import_pino.levels.values.error ? console.error(e2) : t === import_pino.levels.values.warn ? console.warn(e2) : t === import_pino.levels.values.debug ? console.debug(e2) : t === import_pino.levels.values.trace ? console.trace(e2) : console.log(e2);
  }
  appendToLogs(e2) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e2 }));
    const t = typeof e2 == "string" ? JSON.parse(e2).level : e2.level;
    t >= this.levelValue && this.forwardToConsole(e2, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e2) {
    const t = this.getLogArray();
    return t.push(safeJsonStringify({ extraMetadata: e2 })), new Blob(t, { type: "application/json" });
  }
};
var m = class {
  constructor(e2, t = l) {
    this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
  downloadLogsBlobInBrowser(e2) {
    const t = URL.createObjectURL(this.logsToBlob(e2)), o4 = document.createElement("a");
    o4.href = t, o4.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o4), o4.click(), document.body.removeChild(o4), URL.revokeObjectURL(t);
  }
};
var B = class {
  constructor(e2, t = l) {
    this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
};
var x = Object.defineProperty;
var S = Object.defineProperties;
var _ = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var T = Object.prototype.hasOwnProperty;
var z2 = Object.prototype.propertyIsEnumerable;
var f = (r3, e2, t) => e2 in r3 ? x(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var i = (r3, e2) => {
  for (var t in e2 || (e2 = {}))
    T.call(e2, t) && f(r3, t, e2[t]);
  if (p)
    for (var t of p(e2))
      z2.call(e2, t) && f(r3, t, e2[t]);
  return r3;
};
var g = (r3, e2) => S(r3, _(e2));
function k(r3) {
  return g(i({}, r3), { level: (r3 == null ? void 0 : r3.level) || c.level });
}
function v(r3, e2 = n) {
  return r3[e2] || "";
}
function b(r3, e2, t = n) {
  return r3[t] = e2, r3;
}
function y(r3, e2 = n) {
  let t = "";
  return typeof r3.bindings > "u" ? t = v(r3, e2) : t = r3.bindings().context || "", t;
}
function w(r3, e2, t = n) {
  const o4 = y(r3, t);
  return o4.trim() ? `${o4}/${e2}` : e2;
}
function E(r3, e2, t = n) {
  const o4 = w(r3, e2, t), a4 = r3.child({ context: o4 });
  return b(a4, o4, t);
}
function C2(r3) {
  var e2, t;
  const o4 = new m((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i({}, r3.opts), { level: "trace", browser: g(i({}, (t = r3.opts) == null ? void 0 : t.browser), { write: (a4) => o4.write(a4) }) })), chunkLoggerController: o4 };
}
function I(r3) {
  var e2;
  const t = new B((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i({}, r3.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function A(r3) {
  return typeof r3.loggerOverride < "u" && typeof r3.loggerOverride != "string" ? { logger: r3.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C2(r3) : I(r3);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e2) => e2.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e2, url, type) {
  return e2.message.includes("getaddrinfo ENOTFOUND") || e2.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e2;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n2,
  IEvents: () => e,
  IJsonRpcConnection: () => o,
  IJsonRpcProvider: () => r,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs4());
__reExport(env_exports, __toESM(require_cjs4()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x5) => x5.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e = class {
};
var o = class extends e {
  constructor(c5) {
    super();
  }
};
var n2 = class extends e {
  constructor() {
    super();
  }
};
var r = class extends n2 {
  constructor(c5) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events = __toESM(require_events());
var o2 = class extends r {
  constructor(t) {
    super(t), this.events = new import_events.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async request(t, e2) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e2);
  }
  async requestStrict(t, e2) {
    return new Promise(async (i4, s3) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (n5) {
          s3(n5);
        }
      this.events.on(`${t.id}`, (n5) => {
        isJsonRpcError(n5) ? s3(n5.error) : i4(n5.result);
      });
      try {
        await this.connection.send(t, e2);
      } catch (n5) {
        s3(n5);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_events7 = __toESM(require_events());

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events2 = __toESM(require_events());
var import_time3 = __toESM(require_cjs());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n3 = class extends IEvents {
  constructor(e2) {
    super();
  }
};
var s2 = import_time3.FIVE_SECONDS;
var r2 = { pulse: "heartbeat_pulse" };
var i2 = class _i2 extends n3 {
  constructor(e2) {
    super(e2), this.events = new import_events2.EventEmitter(), this.interval = s2, this.interval = (e2 == null ? void 0 : e2.interval) || s2;
  }
  static async init(e2) {
    const t = new _i2(e2);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time3.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r2.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/unstorage/dist/shared/unstorage.d569726e.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify2(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify2(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === "undefined") {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base642 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base642;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}

// node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r3) => r3.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r3) => r3.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify2(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify2(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify2(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p3) => fullKey.startsWith(p3))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p3) => !p3.startsWith(mount.mountpoint))
        ];
      }
      return base3 ? allKeys.filter(
        (key) => key.startsWith(base3) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m2) => {
          if (m2.driver.clear) {
            return asyncCall(m2.driver.clear, m2.relativeBase, opts);
          }
          if (m2.driver.removeItem) {
            const keys2 = await m2.driver.getKeys(m2.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m2.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a4, b4) => b4.length - a4.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        context.unwatch[base3]();
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m2 = getMount(key);
      return {
        driver: m2.driver,
        base: m2.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m2) => ({
        driver: m2.driver,
        base: m2.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x2 = "idb-keyval";
var z3 = (i4 = {}) => {
  const t = i4.base && i4.base.length > 0 ? `${i4.base}:` : "", e2 = (s3) => t + s3;
  let n5;
  return i4.dbName && i4.storeName && (n5 = createStore(i4.dbName, i4.storeName)), { name: x2, options: i4, async hasItem(s3) {
    return !(typeof await get(e2(s3), n5) > "u");
  }, async getItem(s3) {
    return await get(e2(s3), n5) ?? null;
  }, setItem(s3, a4) {
    return set(e2(s3), a4, n5);
  }, removeItem(s3) {
    return del(e2(s3), n5);
  }, getKeys() {
    return keys(n5);
  }, clear() {
    return clear(n5);
  } };
};
var D = "WALLET_CONNECT_V2_INDEXED_DB";
var E2 = "keyvaluestorage";
var _2 = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z3({ dbName: D, storeName: E2 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e2 = await this.indexedDb.getItem(t);
    if (e2 !== null)
      return e2;
  }
  async setItem(t, e2) {
    await this.indexedDb.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l3 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c3 = { exports: {} };
(function() {
  let i4;
  function t() {
  }
  i4 = t, i4.prototype.getItem = function(e2) {
    return this.hasOwnProperty(e2) ? String(this[e2]) : null;
  }, i4.prototype.setItem = function(e2, n5) {
    this[e2] = String(n5);
  }, i4.prototype.removeItem = function(e2) {
    delete this[e2];
  }, i4.prototype.clear = function() {
    const e2 = this;
    Object.keys(e2).forEach(function(n5) {
      e2[n5] = void 0, delete e2[n5];
    });
  }, i4.prototype.key = function(e2) {
    return e2 = e2 || 0, Object.keys(this)[e2];
  }, i4.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l3 < "u" && l3.localStorage ? c3.exports = l3.localStorage : typeof window < "u" && window.localStorage ? c3.exports = window.localStorage : c3.exports = new t();
})();
function k2(i4) {
  var t;
  return [i4[0], safeJsonParse((t = i4[1]) != null ? t : "")];
}
var K2 = class {
  constructor() {
    this.localStorage = c3.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k2);
  }
  async getItem(t) {
    const e2 = this.localStorage.getItem(t);
    if (e2 !== null)
      return safeJsonParse(e2);
  }
  async setItem(t, e2) {
    this.localStorage.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
var N = "wc_storage_version";
var y2 = 1;
var O2 = async (i4, t, e2) => {
  const n5 = N, s3 = await t.getItem(n5);
  if (s3 && s3 >= y2) {
    e2(t);
    return;
  }
  const a4 = await i4.getKeys();
  if (!a4.length) {
    e2(t);
    return;
  }
  const m2 = [];
  for (; a4.length; ) {
    const r3 = a4.shift();
    if (!r3)
      continue;
    const o4 = r3.toLowerCase();
    if (o4.includes("wc@") || o4.includes("walletconnect") || o4.includes("wc_") || o4.includes("wallet_connect")) {
      const f4 = await i4.getItem(r3);
      await t.setItem(r3, f4), m2.push(r3);
    }
  }
  await t.setItem(n5, y2), e2(t), j2(i4, m2);
};
var j2 = async (i4, t) => {
  t.length && t.forEach(async (e2) => {
    await i4.removeItem(e2);
  });
};
var h2 = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e2) => {
      this.storage = e2, this.initialized = true;
    };
    const t = new K2();
    this.storage = t;
    try {
      const e2 = new _2();
      O2(t, e2, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e2) {
    return await this.initialize(), this.storage.setItem(t, e2);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e2 = setInterval(() => {
        this.initialized && (clearInterval(e2), t());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/types/dist/index.es.js
var import_events5 = __toESM(require_events());
var n4 = class extends IEvents {
  constructor(s3) {
    super(), this.opts = s3, this.protocol = "wc", this.version = 2;
  }
};
var h3 = class extends IEvents {
  constructor(s3, t) {
    super(), this.core = s3, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
var a2 = class {
  constructor(s3, t) {
    this.logger = s3, this.core = t;
  }
};
var g2 = class extends IEvents {
  constructor(s3, t) {
    super(), this.relayer = s3, this.logger = t;
  }
};
var u = class extends IEvents {
  constructor(s3) {
    super();
  }
};
var p2 = class {
  constructor(s3, t, e2, f4) {
    this.core = s3, this.logger = t, this.name = e2;
  }
};
var d2 = class extends IEvents {
  constructor(s3, t) {
    super(), this.relayer = s3, this.logger = t;
  }
};
var x3 = class extends IEvents {
  constructor(s3, t) {
    super(), this.core = s3, this.logger = t;
  }
};
var y3 = class {
  constructor(s3, t, e2) {
    this.core = s3, this.logger = t, this.store = e2;
  }
};
var v2 = class {
  constructor(s3, t) {
    this.projectId = s3, this.logger = t;
  }
};
var C3 = class {
  constructor(s3, t, e2) {
    this.core = s3, this.logger = t, this.telemetryEnabled = e2;
  }
};
var S2 = class {
  constructor(s3) {
    this.opts = s3, this.protocol = "wc", this.version = 2;
  }
};
var M = class {
  constructor(s3) {
    this.client = s3;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_time4 = __toESM(require_cjs());

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var w2 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser3();
var b2 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var a3 = (c5) => c5.split("?")[0];
var h4 = 10;
var S3 = w2();
var f2 = class {
  constructor(e2) {
    if (this.url = e2, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e2))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    this.url = e2;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async open(e2 = this.url) {
    await this.register(e2);
  }
  async close() {
    return new Promise((e2, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n5) => {
        this.onClose(n5), e2();
      }, this.socket.close();
    });
  }
  async send(e2) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e2));
    } catch (t) {
      this.onError(e2.id, t);
    }
  }
  register(e2 = this.url) {
    if (!isWsUrl(e2))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n5, o4) => {
        this.events.once("register_error", (s3) => {
          this.resetMaxListeners(), o4(s3);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return o4(new Error("WebSocket connection is missing or invalid"));
          n5(this.socket);
        });
      });
    }
    return this.url = e2, this.registering = true, new Promise((t, n5) => {
      const o4 = new URLSearchParams(e2).get("origin"), s3 = (0, esm_exports.isReactNative)() ? { headers: { origin: o4 } } : { rejectUnauthorized: !isLocalhostUrl(e2) }, i4 = new S3(e2, [], s3);
      b2() ? i4.onerror = (r3) => {
        const l4 = r3;
        n5(this.emitError(l4.error));
      } : i4.on("error", (r3) => {
        n5(this.emitError(r3));
      }), i4.onopen = () => {
        this.onOpen(i4), t(i4);
      };
    });
  }
  onOpen(e2) {
    e2.onmessage = (t) => this.onPayload(t), e2.onclose = (t) => this.onClose(t), this.socket = e2, this.registering = false, this.events.emit("open");
  }
  onClose(e2) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e2);
  }
  onPayload(e2) {
    if (typeof e2.data > "u")
      return;
    const t = typeof e2.data == "string" ? safeJsonParse(e2.data) : e2.data;
    this.events.emit("payload", t);
  }
  onError(e2, t) {
    const n5 = this.parseError(t), o4 = n5.message || n5.toString(), s3 = formatJsonRpcError(e2, o4);
    this.events.emit("payload", s3);
  }
  parseError(e2, t = this.url) {
    return parseConnectionError(e2, a3(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h4 && this.events.setMaxListeners(h4);
  }
  emitError(e2) {
    const t = this.parseError(new Error((e2 == null ? void 0 : e2.message) || `WebSocket connection failed for host: ${a3(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_lodash = __toESM(require_lodash());
var be2 = "wc";
var fe2 = 2;
var ne2 = "core";
var O3 = `${be2}@2:${ne2}:`;
var We2 = { name: ne2, logger: "error" };
var Xe2 = { database: ":memory:" };
var Ze2 = "crypto";
var _e2 = "client_ed25519_seed";
var Qe = import_time4.ONE_DAY;
var et = "keychain";
var tt = "0.3";
var it = "messages";
var st = "0.3";
var rt = import_time4.SIX_HOURS;
var nt = "publisher";
var ot = "irn";
var at = "error";
var Ee = "wss://relay.walletconnect.org";
var ct = "relayer";
var w3 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var ht = "_subscription";
var T2 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var lt = 0.1;
var oe2 = "2.16.3";
var F = { link_mode: "link_mode", relay: "relay" };
var ut = "0.3";
var dt = "WALLETCONNECT_CLIENT_ID";
var ve2 = "WALLETCONNECT_LINK_MODE_APPS";
var A2 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var gt = "subscription";
var pt = "0.3";
var yt = import_time4.FIVE_SECONDS * 1e3;
var Dt2 = "pairing";
var mt = "0.3";
var j3 = { wc_pairingDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 } } };
var X = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var P = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var bt = "history";
var ft = "0.3";
var _t = "expirer";
var R = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var Et = "0.3";
var vt = "verify-api";
var Is2 = "https://verify.walletconnect.com";
var wt = "https://verify.walletconnect.org";
var Z = wt;
var It = `${Z}/v3`;
var Tt2 = [Is2, wt];
var Ct = "echo";
var St = "https://echo.walletconnect.com";
var z4 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var $ = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var Cs2 = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" };
var Ss2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" };
var Ps2 = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var Rs2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var Pt = 0.1;
var Rt = "event-client";
var xt = 86400;
var Ot2 = "https://pulse.walletconnect.org/batch";
function xs2(o4, e2) {
  if (o4.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s3 = 0; s3 < t.length; s3++)
    t[s3] = 255;
  for (var i4 = 0; i4 < o4.length; i4++) {
    var r3 = o4.charAt(i4), n5 = r3.charCodeAt(0);
    if (t[n5] !== 255)
      throw new TypeError(r3 + " is ambiguous");
    t[n5] = i4;
  }
  var a4 = o4.length, c5 = o4.charAt(0), h5 = Math.log(a4) / Math.log(256), d3 = Math.log(256) / Math.log(a4);
  function g3(l4) {
    if (l4 instanceof Uint8Array || (ArrayBuffer.isView(l4) ? l4 = new Uint8Array(l4.buffer, l4.byteOffset, l4.byteLength) : Array.isArray(l4) && (l4 = Uint8Array.from(l4))), !(l4 instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (l4.length === 0)
      return "";
    for (var p3 = 0, _3 = 0, D3 = 0, E3 = l4.length; D3 !== E3 && l4[D3] === 0; )
      D3++, p3++;
    for (var N10 = (E3 - D3) * d3 + 1 >>> 0, C4 = new Uint8Array(N10); D3 !== E3; ) {
      for (var L2 = l4[D3], k3 = 0, x5 = N10 - 1; (L2 !== 0 || k3 < _3) && x5 !== -1; x5--, k3++)
        L2 += 256 * C4[x5] >>> 0, C4[x5] = L2 % a4 >>> 0, L2 = L2 / a4 >>> 0;
      if (L2 !== 0)
        throw new Error("Non-zero carry");
      _3 = k3, D3++;
    }
    for (var M2 = N10 - _3; M2 !== N10 && C4[M2] === 0; )
      M2++;
    for (var ie2 = c5.repeat(p3); M2 < N10; ++M2)
      ie2 += o4.charAt(C4[M2]);
    return ie2;
  }
  function m2(l4) {
    if (typeof l4 != "string")
      throw new TypeError("Expected String");
    if (l4.length === 0)
      return new Uint8Array();
    var p3 = 0;
    if (l4[p3] !== " ") {
      for (var _3 = 0, D3 = 0; l4[p3] === c5; )
        _3++, p3++;
      for (var E3 = (l4.length - p3) * h5 + 1 >>> 0, N10 = new Uint8Array(E3); l4[p3]; ) {
        var C4 = t[l4.charCodeAt(p3)];
        if (C4 === 255)
          return;
        for (var L2 = 0, k3 = E3 - 1; (C4 !== 0 || L2 < D3) && k3 !== -1; k3--, L2++)
          C4 += a4 * N10[k3] >>> 0, N10[k3] = C4 % 256 >>> 0, C4 = C4 / 256 >>> 0;
        if (C4 !== 0)
          throw new Error("Non-zero carry");
        D3 = L2, p3++;
      }
      if (l4[p3] !== " ") {
        for (var x5 = E3 - D3; x5 !== E3 && N10[x5] === 0; )
          x5++;
        for (var M2 = new Uint8Array(_3 + (E3 - x5)), ie2 = _3; x5 !== E3; )
          M2[ie2++] = N10[x5++];
        return M2;
      }
    }
  }
  function b4(l4) {
    var p3 = m2(l4);
    if (p3)
      return p3;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: g3, decodeUnsafe: m2, decode: b4 };
}
var Os2 = xs2;
var As2 = Os2;
var At = (o4) => {
  if (o4 instanceof Uint8Array && o4.constructor.name === "Uint8Array")
    return o4;
  if (o4 instanceof ArrayBuffer)
    return new Uint8Array(o4);
  if (ArrayBuffer.isView(o4))
    return new Uint8Array(o4.buffer, o4.byteOffset, o4.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Ns2 = (o4) => new TextEncoder().encode(o4);
var Ls2 = (o4) => new TextDecoder().decode(o4);
var zs2 = class {
  constructor(e2, t, s3) {
    this.name = e2, this.prefix = t, this.baseEncode = s3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Ms2 = class {
  constructor(e2, t, s3) {
    if (this.name = e2, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = s3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return Nt(this, e2);
  }
};
var $s2 = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return Nt(this, e2);
  }
  decode(e2) {
    const t = e2[0], s3 = this.decoders[t];
    if (s3)
      return s3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var Nt = (o4, e2) => new $s2({ ...o4.decoders || { [o4.prefix]: o4 }, ...e2.decoders || { [e2.prefix]: e2 } });
var ks2 = class {
  constructor(e2, t, s3, i4) {
    this.name = e2, this.prefix = t, this.baseEncode = s3, this.baseDecode = i4, this.encoder = new zs2(e2, t, s3), this.decoder = new Ms2(e2, t, i4);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var ae2 = ({ name: o4, prefix: e2, encode: t, decode: s3 }) => new ks2(o4, e2, t, s3);
var Q2 = ({ prefix: o4, name: e2, alphabet: t }) => {
  const { encode: s3, decode: i4 } = As2(t, e2);
  return ae2({ prefix: o4, name: e2, encode: s3, decode: (r3) => At(i4(r3)) });
};
var Fs2 = (o4, e2, t, s3) => {
  const i4 = {};
  for (let d3 = 0; d3 < e2.length; ++d3)
    i4[e2[d3]] = d3;
  let r3 = o4.length;
  for (; o4[r3 - 1] === "="; )
    --r3;
  const n5 = new Uint8Array(r3 * t / 8 | 0);
  let a4 = 0, c5 = 0, h5 = 0;
  for (let d3 = 0; d3 < r3; ++d3) {
    const g3 = i4[o4[d3]];
    if (g3 === void 0)
      throw new SyntaxError(`Non-${s3} character`);
    c5 = c5 << t | g3, a4 += t, a4 >= 8 && (a4 -= 8, n5[h5++] = 255 & c5 >> a4);
  }
  if (a4 >= t || 255 & c5 << 8 - a4)
    throw new SyntaxError("Unexpected end of data");
  return n5;
};
var Us2 = (o4, e2, t) => {
  const s3 = e2[e2.length - 1] === "=", i4 = (1 << t) - 1;
  let r3 = "", n5 = 0, a4 = 0;
  for (let c5 = 0; c5 < o4.length; ++c5)
    for (a4 = a4 << 8 | o4[c5], n5 += 8; n5 > t; )
      n5 -= t, r3 += e2[i4 & a4 >> n5];
  if (n5 && (r3 += e2[i4 & a4 << t - n5]), s3)
    for (; r3.length * t & 7; )
      r3 += "=";
  return r3;
};
var f3 = ({ name: o4, prefix: e2, bitsPerChar: t, alphabet: s3 }) => ae2({ prefix: e2, name: o4, encode(i4) {
  return Us2(i4, s3, t);
}, decode(i4) {
  return Fs2(i4, s3, t, o4);
} });
var Ks2 = ae2({ prefix: "\0", name: "identity", encode: (o4) => Ls2(o4), decode: (o4) => Ns2(o4) });
var Bs2 = Object.freeze({ __proto__: null, identity: Ks2 });
var Vs2 = f3({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var js2 = Object.freeze({ __proto__: null, base2: Vs2 });
var qs2 = f3({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gs2 = Object.freeze({ __proto__: null, base8: qs2 });
var Hs2 = Q2({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Ys2 = Object.freeze({ __proto__: null, base10: Hs2 });
var Js2 = f3({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Ws2 = f3({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Xs2 = Object.freeze({ __proto__: null, base16: Js2, base16upper: Ws2 });
var Zs2 = f3({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Qs2 = f3({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var er2 = f3({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var tr2 = f3({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var ir2 = f3({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var sr2 = f3({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var rr2 = f3({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var nr2 = f3({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var or3 = f3({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var ar2 = Object.freeze({ __proto__: null, base32: Zs2, base32upper: Qs2, base32pad: er2, base32padupper: tr2, base32hex: ir2, base32hexupper: sr2, base32hexpad: rr2, base32hexpadupper: nr2, base32z: or3 });
var cr2 = Q2({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var hr2 = Q2({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var lr2 = Object.freeze({ __proto__: null, base36: cr2, base36upper: hr2 });
var ur2 = Q2({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var dr2 = Q2({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var gr2 = Object.freeze({ __proto__: null, base58btc: ur2, base58flickr: dr2 });
var pr2 = f3({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var yr2 = f3({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var Dr2 = f3({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var mr2 = f3({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var br2 = Object.freeze({ __proto__: null, base64: pr2, base64pad: yr2, base64url: Dr2, base64urlpad: mr2 });
var Lt2 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var fr2 = Lt2.reduce((o4, e2, t) => (o4[t] = e2, o4), []);
var _r2 = Lt2.reduce((o4, e2, t) => (o4[e2.codePointAt(0)] = t, o4), []);
function Er2(o4) {
  return o4.reduce((e2, t) => (e2 += fr2[t], e2), "");
}
function vr2(o4) {
  const e2 = [];
  for (const t of o4) {
    const s3 = _r2[t.codePointAt(0)];
    if (s3 === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e2.push(s3);
  }
  return new Uint8Array(e2);
}
var wr2 = ae2({ prefix: "🚀", name: "base256emoji", encode: Er2, decode: vr2 });
var Ir2 = Object.freeze({ __proto__: null, base256emoji: wr2 });
var Tr2 = Mt;
var zt2 = 128;
var Cr2 = 127;
var Sr2 = ~Cr2;
var Pr = Math.pow(2, 31);
function Mt(o4, e2, t) {
  e2 = e2 || [], t = t || 0;
  for (var s3 = t; o4 >= Pr; )
    e2[t++] = o4 & 255 | zt2, o4 /= 128;
  for (; o4 & Sr2; )
    e2[t++] = o4 & 255 | zt2, o4 >>>= 7;
  return e2[t] = o4 | 0, Mt.bytes = t - s3 + 1, e2;
}
var Rr2 = we2;
var xr2 = 128;
var $t2 = 127;
function we2(o4, s3) {
  var t = 0, s3 = s3 || 0, i4 = 0, r3 = s3, n5, a4 = o4.length;
  do {
    if (r3 >= a4)
      throw we2.bytes = 0, new RangeError("Could not decode varint");
    n5 = o4[r3++], t += i4 < 28 ? (n5 & $t2) << i4 : (n5 & $t2) * Math.pow(2, i4), i4 += 7;
  } while (n5 >= xr2);
  return we2.bytes = r3 - s3, t;
}
var Or2 = Math.pow(2, 7);
var Ar2 = Math.pow(2, 14);
var Nr2 = Math.pow(2, 21);
var Lr2 = Math.pow(2, 28);
var zr2 = Math.pow(2, 35);
var Mr2 = Math.pow(2, 42);
var $r = Math.pow(2, 49);
var kr2 = Math.pow(2, 56);
var Fr2 = Math.pow(2, 63);
var Ur2 = function(o4) {
  return o4 < Or2 ? 1 : o4 < Ar2 ? 2 : o4 < Nr2 ? 3 : o4 < Lr2 ? 4 : o4 < zr2 ? 5 : o4 < Mr2 ? 6 : o4 < $r ? 7 : o4 < kr2 ? 8 : o4 < Fr2 ? 9 : 10;
};
var Kr2 = { encode: Tr2, decode: Rr2, encodingLength: Ur2 };
var kt2 = Kr2;
var Ft2 = (o4, e2, t = 0) => (kt2.encode(o4, e2, t), e2);
var Ut2 = (o4) => kt2.encodingLength(o4);
var Ie = (o4, e2) => {
  const t = e2.byteLength, s3 = Ut2(o4), i4 = s3 + Ut2(t), r3 = new Uint8Array(i4 + t);
  return Ft2(o4, r3, 0), Ft2(t, r3, s3), r3.set(e2, i4), new Br2(o4, t, e2, r3);
};
var Br2 = class {
  constructor(e2, t, s3, i4) {
    this.code = e2, this.size = t, this.digest = s3, this.bytes = i4;
  }
};
var Kt2 = ({ name: o4, code: e2, encode: t }) => new Vr2(o4, e2, t);
var Vr2 = class {
  constructor(e2, t, s3) {
    this.name = e2, this.code = t, this.encode = s3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const t = this.encode(e2);
      return t instanceof Uint8Array ? Ie(this.code, t) : t.then((s3) => Ie(this.code, s3));
    } else
      throw Error("Unknown type, must be binary type");
  }
};
var Bt = (o4) => async (e2) => new Uint8Array(await crypto.subtle.digest(o4, e2));
var jr2 = Kt2({ name: "sha2-256", code: 18, encode: Bt("SHA-256") });
var qr2 = Kt2({ name: "sha2-512", code: 19, encode: Bt("SHA-512") });
var Gr2 = Object.freeze({ __proto__: null, sha256: jr2, sha512: qr2 });
var Vt = 0;
var Hr2 = "identity";
var jt2 = At;
var Yr2 = (o4) => Ie(Vt, jt2(o4));
var Jr2 = { code: Vt, name: Hr2, encode: jt2, digest: Yr2 };
var Wr2 = Object.freeze({ __proto__: null, identity: Jr2 });
new TextEncoder(), new TextDecoder();
var qt2 = { ...Bs2, ...js2, ...Gs2, ...Ys2, ...Xs2, ...ar2, ...lr2, ...gr2, ...br2, ...Ir2 };
({ ...Gr2, ...Wr2 });
function Xr2(o4 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(o4) : new Uint8Array(o4);
}
function Gt2(o4, e2, t, s3) {
  return { name: o4, prefix: e2, encoder: { name: o4, prefix: e2, encode: t }, decoder: { decode: s3 } };
}
var Ht2 = Gt2("utf8", "u", (o4) => "u" + new TextDecoder("utf8").decode(o4), (o4) => new TextEncoder().encode(o4.substring(1)));
var Te = Gt2("ascii", "a", (o4) => {
  let e2 = "a";
  for (let t = 0; t < o4.length; t++)
    e2 += String.fromCharCode(o4[t]);
  return e2;
}, (o4) => {
  o4 = o4.substring(1);
  const e2 = Xr2(o4.length);
  for (let t = 0; t < o4.length; t++)
    e2[t] = o4.charCodeAt(t);
  return e2;
});
var Zr2 = { utf8: Ht2, "utf-8": Ht2, hex: qt2.base16, latin1: Te, ascii: Te, binary: Te, ...qt2 };
function Qr2(o4, e2 = "utf8") {
  const t = Zr2[e2];
  if (!t)
    throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(o4, "utf8") : t.decoder.decode(`${t.prefix}${o4}`);
}
var Yt2 = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = et, this.version = tt, this.initialized = false, this.storagePrefix = O3, this.init = async () => {
      if (!this.initialized) {
        const s3 = await this.getKeyChain();
        typeof s3 < "u" && (this.keychain = s3), this.initialized = true;
      }
    }, this.has = (s3) => (this.isInitialized(), this.keychain.has(s3)), this.set = async (s3, i4) => {
      this.isInitialized(), this.keychain.set(s3, i4), await this.persist();
    }, this.get = (s3) => {
      this.isInitialized();
      const i4 = this.keychain.get(s3);
      if (typeof i4 > "u") {
        const { message: r3 } = xe("NO_MATCHING_KEY", `${this.name}: ${s3}`);
        throw new Error(r3);
      }
      return i4;
    }, this.del = async (s3) => {
      this.isInitialized(), this.keychain.delete(s3), await this.persist();
    }, this.core = e2, this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e2) {
    await this.core.storage.setItem(this.storageKey, ss(e2));
  }
  async getKeyChain() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? as(e2) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Jt2 = class {
  constructor(e2, t, s3) {
    this.core = e2, this.logger = t, this.name = Ze2, this.randomSessionIdentifier = Su(), this.initialized = false, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }, this.hasKeys = (i4) => (this.isInitialized(), this.keychain.has(i4)), this.getClientId = async () => {
      this.isInitialized();
      const i4 = await this.getClientSeed(), r3 = generateKeyPair(i4);
      return encodeIss(r3.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const i4 = Eu();
      return this.setPrivateKey(i4.publicKey, i4.privateKey);
    }, this.signJWT = async (i4) => {
      this.isInitialized();
      const r3 = await this.getClientSeed(), n5 = generateKeyPair(r3), a4 = this.randomSessionIdentifier, c5 = Qe;
      return await signJWT(a4, i4, c5, n5);
    }, this.generateSharedKey = (i4, r3, n5) => {
      this.isInitialized();
      const a4 = this.getPrivateKey(i4), c5 = Iu(a4, r3);
      return this.setSymKey(c5, n5);
    }, this.setSymKey = async (i4, r3) => {
      this.isInitialized();
      const n5 = r3 || Nu(i4);
      return await this.keychain.set(n5, i4), n5;
    }, this.deleteKeyPair = async (i4) => {
      this.isInitialized(), await this.keychain.del(i4);
    }, this.deleteSymKey = async (i4) => {
      this.isInitialized(), await this.keychain.del(i4);
    }, this.encode = async (i4, r3, n5) => {
      this.isInitialized();
      const a4 = io(n5), c5 = safeJsonStringify(r3);
      if (Tu(a4))
        return Cu(c5, n5 == null ? void 0 : n5.encoding);
      if (Du(a4)) {
        const m2 = a4.senderPublicKey, b4 = a4.receiverPublicKey;
        i4 = await this.generateSharedKey(m2, b4);
      }
      const h5 = this.getSymKey(i4), { type: d3, senderPublicKey: g3 } = a4;
      return Bu({ type: d3, symKey: h5, message: c5, senderPublicKey: g3, encoding: n5 == null ? void 0 : n5.encoding });
    }, this.decode = async (i4, r3, n5) => {
      this.isInitialized();
      const a4 = Pu(r3, n5);
      if (Tu(a4)) {
        const c5 = Ou(r3, n5 == null ? void 0 : n5.encoding);
        return safeJsonParse(c5);
      }
      if (Du(a4)) {
        const c5 = a4.receiverPublicKey, h5 = a4.senderPublicKey;
        i4 = await this.generateSharedKey(c5, h5);
      }
      try {
        const c5 = this.getSymKey(i4), h5 = Ru({ symKey: c5, encoded: r3, encoding: n5 == null ? void 0 : n5.encoding });
        return safeJsonParse(h5);
      } catch (c5) {
        this.logger.error(`Failed to decode message from topic: '${i4}', clientId: '${await this.getClientId()}'`), this.logger.error(c5);
      }
    }, this.getPayloadType = (i4, r3 = $i) => {
      const n5 = Wr({ encoded: i4, encoding: r3 });
      return $e(n5.type);
    }, this.getPayloadSenderPublicKey = (i4, r3 = $i) => {
      const n5 = Wr({ encoded: i4, encoding: r3 });
      return n5.senderPublicKey ? toString2(n5.senderPublicKey, Lt) : void 0;
    }, this.core = e2, this.logger = E(t, this.name), this.keychain = s3 || new Yt2(this.core, this.logger);
  }
  get context() {
    return y(this.logger);
  }
  async setPrivateKey(e2, t) {
    return await this.keychain.set(e2, t), e2;
  }
  getPrivateKey(e2) {
    return this.keychain.get(e2);
  }
  async getClientSeed() {
    let e2 = "";
    try {
      e2 = this.keychain.get(_e2);
    } catch {
      e2 = Su(), await this.keychain.set(_e2, e2);
    }
    return Qr2(e2, "base16");
  }
  getSymKey(e2) {
    return this.keychain.get(e2);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Wt = class extends a2 {
  constructor(e2, t) {
    super(e2, t), this.logger = e2, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = it, this.version = st, this.initialized = false, this.storagePrefix = O3, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s3 = await this.getRelayerMessages();
          typeof s3 < "u" && (this.messages = s3), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s3) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s3);
        } finally {
          this.initialized = true;
        }
      }
    }, this.set = async (s3, i4) => {
      this.isInitialized();
      const r3 = _u(i4);
      let n5 = this.messages.get(s3);
      return typeof n5 > "u" && (n5 = {}), typeof n5[r3] < "u" || (n5[r3] = i4, this.messages.set(s3, n5), await this.persist()), r3;
    }, this.get = (s3) => {
      this.isInitialized();
      let i4 = this.messages.get(s3);
      return typeof i4 > "u" && (i4 = {}), i4;
    }, this.has = (s3, i4) => {
      this.isInitialized();
      const r3 = this.get(s3), n5 = _u(i4);
      return typeof r3[n5] < "u";
    }, this.del = async (s3) => {
      this.isInitialized(), this.messages.delete(s3), await this.persist();
    }, this.logger = E(e2, this.name), this.core = t;
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e2) {
    await this.core.storage.setItem(this.storageKey, ss(e2));
  }
  async getRelayerMessages() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? as(e2) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var en2 = class extends g2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, this.events = new import_events7.EventEmitter(), this.name = nt, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE), this.failedPublishTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND), this.needsTransportRestart = false, this.publish = async (s3, i4, r3) => {
      var n5;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s3, message: i4, opts: r3 } });
      const a4 = (r3 == null ? void 0 : r3.ttl) || rt, c5 = qu(r3), h5 = (r3 == null ? void 0 : r3.prompt) || false, d3 = (r3 == null ? void 0 : r3.tag) || 0, g3 = (r3 == null ? void 0 : r3.id) || getBigIntRpcId().toString(), m2 = { topic: s3, message: i4, opts: { ttl: a4, relay: c5, prompt: h5, tag: d3, id: g3, attestation: r3 == null ? void 0 : r3.attestation } }, b4 = `Failed to publish payload, please try again. id:${g3} tag:${d3}`, l4 = Date.now();
      let p3, _3 = 1;
      try {
        for (; p3 === void 0; ) {
          if (Date.now() - l4 > this.publishTimeout)
            throw new Error(b4);
          this.logger.trace({ id: g3, attempts: _3 }, `publisher.publish - attempt ${_3}`), p3 = await await ds(this.rpcPublish(s3, i4, a4, c5, h5, d3, g3, r3 == null ? void 0 : r3.attestation).catch((D3) => this.logger.warn(D3)), this.publishTimeout, b4), _3++, p3 || await new Promise((D3) => setTimeout(D3, this.failedPublishTimeout));
        }
        this.relayer.events.emit(w3.publish, m2), this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { id: g3, topic: s3, message: i4, opts: r3 } });
      } catch (D3) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(D3), (n5 = r3 == null ? void 0 : r3.internal) != null && n5.throwOnFailedPublish)
          throw D3;
        this.queue.set(g3, m2);
      }
    }, this.on = (s3, i4) => {
      this.events.on(s3, i4);
    }, this.once = (s3, i4) => {
      this.events.once(s3, i4);
    }, this.off = (s3, i4) => {
      this.events.off(s3, i4);
    }, this.removeListener = (s3, i4) => {
      this.events.removeListener(s3, i4);
    }, this.relayer = e2, this.logger = E(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y(this.logger);
  }
  rpcPublish(e2, t, s3, i4, r3, n5, a4, c5) {
    var h5, d3, g3, m2;
    const b4 = { method: Ku(i4.protocol).publish, params: { topic: e2, message: t, ttl: s3, prompt: r3, tag: n5, attestation: c5 }, id: a4 };
    return Pe((h5 = b4.params) == null ? void 0 : h5.prompt) && ((d3 = b4.params) == null || delete d3.prompt), Pe((g3 = b4.params) == null ? void 0 : g3.tag) && ((m2 = b4.params) == null || delete m2.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: b4 }), this.relayer.request(b4);
  }
  removeRequestFromQueue(e2) {
    this.queue.delete(e2);
  }
  checkQueue() {
    this.queue.forEach(async (e2) => {
      const { topic: t, message: s3, opts: i4 } = e2;
      await this.publish(t, s3, i4);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r2.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(w3.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(w3.message_ack, (e2) => {
      this.removeRequestFromQueue(e2.id.toString());
    });
  }
};
var tn2 = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e2, t) => {
      const s3 = this.get(e2);
      this.exists(e2, t) || this.map.set(e2, [...s3, t]);
    }, this.get = (e2) => this.map.get(e2) || [], this.exists = (e2, t) => this.get(e2).includes(t), this.delete = (e2, t) => {
      if (typeof t > "u") {
        this.map.delete(e2);
        return;
      }
      if (!this.map.has(e2))
        return;
      const s3 = this.get(e2);
      if (!this.exists(e2, t))
        return;
      const i4 = s3.filter((r3) => r3 !== t);
      if (!i4.length) {
        this.map.delete(e2);
        return;
      }
      this.map.set(e2, i4);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var sn2 = Object.defineProperty;
var rn2 = Object.defineProperties;
var nn2 = Object.getOwnPropertyDescriptors;
var Xt = Object.getOwnPropertySymbols;
var on = Object.prototype.hasOwnProperty;
var an2 = Object.prototype.propertyIsEnumerable;
var Zt2 = (o4, e2, t) => e2 in o4 ? sn2(o4, e2, { enumerable: true, configurable: true, writable: true, value: t }) : o4[e2] = t;
var ee2 = (o4, e2) => {
  for (var t in e2 || (e2 = {}))
    on.call(e2, t) && Zt2(o4, t, e2[t]);
  if (Xt)
    for (var t of Xt(e2))
      an2.call(e2, t) && Zt2(o4, t, e2[t]);
  return o4;
};
var Ce2 = (o4, e2) => rn2(o4, nn2(e2));
var Qt = class extends d2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new tn2(), this.events = new import_events7.EventEmitter(), this.name = gt, this.version = pt, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = O3, this.subscribeTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE), this.restartInProgress = false, this.batchSubscribeTopicsLimit = 500, this.pendingBatchMessages = [], this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId(), await this.restore()), this.initialized = true;
    }, this.subscribe = async (s3, i4) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s3, opts: i4 } });
      try {
        const r3 = qu(i4), n5 = { topic: s3, relay: r3, transportType: i4 == null ? void 0 : i4.transportType };
        this.pending.set(s3, n5);
        const a4 = await this.rpcSubscribe(s3, r3, i4 == null ? void 0 : i4.transportType);
        return typeof a4 == "string" && (this.onSubscribe(a4, n5), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s3, opts: i4 } })), a4;
      } catch (r3) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(r3), r3;
      }
    }, this.unsubscribe = async (s3, i4) => {
      await this.restartToComplete(), this.isInitialized(), typeof (i4 == null ? void 0 : i4.id) < "u" ? await this.unsubscribeById(s3, i4.id, i4) : await this.unsubscribeByTopic(s3, i4);
    }, this.isSubscribed = async (s3) => {
      if (this.topics.includes(s3))
        return true;
      const i4 = `${this.pendingSubscriptionWatchLabel}_${s3}`;
      return await new Promise((r3, n5) => {
        const a4 = new import_time4.Watch();
        a4.start(i4);
        const c5 = setInterval(() => {
          !this.pending.has(s3) && this.topics.includes(s3) && (clearInterval(c5), a4.stop(i4), r3(true)), a4.elapsed(i4) >= yt && (clearInterval(c5), a4.stop(i4), n5(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => false);
    }, this.on = (s3, i4) => {
      this.events.on(s3, i4);
    }, this.once = (s3, i4) => {
      this.events.once(s3, i4);
    }, this.off = (s3, i4) => {
      this.events.off(s3, i4);
    }, this.removeListener = (s3, i4) => {
      this.events.removeListener(s3, i4);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      this.restartInProgress = true, await this.restore(), await this.reset(), this.restartInProgress = false;
    }, this.relayer = e2, this.logger = E(t, this.name), this.clientId = "";
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e2, t) {
    let s3 = false;
    try {
      s3 = this.getSubscription(e2).topic === t;
    } catch {
    }
    return s3;
  }
  onEnable() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e2, t) {
    const s3 = this.topicMap.get(e2);
    await Promise.all(s3.map(async (i4) => await this.unsubscribeById(e2, i4, t)));
  }
  async unsubscribeById(e2, t, s3) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: s3 } });
    try {
      const i4 = qu(s3);
      await this.rpcUnsubscribe(e2, t, i4);
      const r3 = er("USER_DISCONNECTED", `${this.name}, ${e2}`);
      await this.onUnsubscribe(e2, t, r3), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: s3 } });
    } catch (i4) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i4), i4;
    }
  }
  async rpcSubscribe(e2, t, s3 = F.relay) {
    s3 === F.relay && await this.restartToComplete();
    const i4 = { method: Ku(t.protocol).subscribe, params: { topic: e2 } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i4 });
    try {
      const r3 = _u(e2 + this.clientId);
      return s3 === F.link_mode ? (setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(i4).catch((n5) => this.logger.warn(n5));
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), r3) : await await ds(this.relayer.request(i4).catch((n5) => this.logger.warn(n5)), this.subscribeTimeout) ? r3 : null;
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(w3.connection_stalled);
    }
    return null;
  }
  async rpcBatchSubscribe(e2) {
    if (!e2.length)
      return;
    const t = e2[0].relay, s3 = { method: Ku(t.protocol).batchSubscribe, params: { topics: e2.map((i4) => i4.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s3 });
    try {
      return await await ds(this.relayer.request(s3).catch((i4) => this.logger.warn(i4)), this.subscribeTimeout);
    } catch {
      this.relayer.events.emit(w3.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e2) {
    if (!e2.length)
      return;
    const t = e2[0].relay, s3 = { method: Ku(t.protocol).batchFetchMessages, params: { topics: e2.map((r3) => r3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s3 });
    let i4;
    try {
      i4 = await await ds(this.relayer.request(s3).catch((r3) => this.logger.warn(r3)), this.subscribeTimeout);
    } catch {
      this.relayer.events.emit(w3.connection_stalled);
    }
    return i4;
  }
  rpcUnsubscribe(e2, t, s3) {
    const i4 = { method: Ku(s3.protocol).unsubscribe, params: { topic: e2, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i4 }), this.relayer.request(i4);
  }
  onSubscribe(e2, t) {
    this.setSubscription(e2, Ce2(ee2({}, t), { id: e2 })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e2) {
    e2.length && e2.forEach((t) => {
      this.setSubscription(t.id, ee2({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e2, t, s3) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e2) && this.deleteSubscription(t, s3), await this.relayer.messages.del(e2);
  }
  async setRelayerSubscriptions(e2) {
    await this.relayer.core.storage.setItem(this.storageKey, e2);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e2, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e2, subscription: t }), this.addSubscription(e2, t);
  }
  addSubscription(e2, t) {
    this.subscriptions.set(e2, ee2({}, t)), this.topicMap.set(t.topic, e2), this.events.emit(A2.created, t);
  }
  getSubscription(e2) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e2 });
    const t = this.subscriptions.get(e2);
    if (!t) {
      const { message: s3 } = xe("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(s3);
    }
    return t;
  }
  deleteSubscription(e2, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e2, reason: t });
    const s3 = this.getSubscription(e2);
    this.subscriptions.delete(e2), this.topicMap.delete(s3.topic, e2), this.events.emit(A2.deleted, Ce2(ee2({}, s3), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(A2.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e2 = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e2; t++) {
        const s3 = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchFetchMessages(s3), await this.batchSubscribe(s3);
      }
    }
    this.events.emit(A2.resubscribed);
  }
  async restore() {
    try {
      const e2 = await this.getRelayerSubscriptions();
      if (typeof e2 > "u" || !e2.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = xe("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e2);
    }
  }
  async batchSubscribe(e2) {
    if (!e2.length)
      return;
    const t = await this.rpcBatchSubscribe(e2);
    Nr(t) && this.onBatchSubscribe(t.map((s3, i4) => Ce2(ee2({}, e2[i4]), { id: s3 })));
  }
  async batchFetchMessages(e2) {
    if (!e2.length)
      return;
    this.logger.trace(`Fetching batch messages for ${e2.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e2);
    t && t.messages && (this.pendingBatchMessages = this.pendingBatchMessages.concat(t.messages));
  }
  async onConnect() {
    await this.restart(), this.onEnable();
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (!this.initialized || !this.relayer.connected)
      return;
    const e2 = [];
    this.pending.forEach((t) => {
      e2.push(t);
    }), await this.batchSubscribe(e2), this.pendingBatchMessages.length && (await this.relayer.handleBatchMessageEvents(this.pendingBatchMessages), this.pendingBatchMessages = []);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r2.pulse, async () => {
      await this.checkPending();
    }), this.events.on(A2.created, async (e2) => {
      const t = A2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), await this.persist();
    }), this.events.on(A2.deleted, async (e2) => {
      const t = A2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), await this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async restartToComplete() {
    !this.relayer.connected && !this.relayer.connecting && await this.relayer.transportOpen(), this.restartInProgress && await new Promise((e2) => {
      const t = setInterval(() => {
        this.restartInProgress || (clearInterval(t), e2());
      }, this.pollingInterval);
    });
  }
};
var cn2 = Object.defineProperty;
var ei = Object.getOwnPropertySymbols;
var hn2 = Object.prototype.hasOwnProperty;
var ln2 = Object.prototype.propertyIsEnumerable;
var ti = (o4, e2, t) => e2 in o4 ? cn2(o4, e2, { enumerable: true, configurable: true, writable: true, value: t }) : o4[e2] = t;
var un2 = (o4, e2) => {
  for (var t in e2 || (e2 = {}))
    hn2.call(e2, t) && ti(o4, t, e2[t]);
  if (ei)
    for (var t of ei(e2))
      ln2.call(e2, t) && ti(o4, t, e2[t]);
  return o4;
};
var ii = class extends u {
  constructor(e2) {
    super(e2), this.protocol = "wc", this.version = 2, this.events = new import_events7.EventEmitter(), this.name = ct, this.transportExplicitlyClosed = false, this.initialized = false, this.connectionAttemptInProgress = false, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "stalled", "interrupted"], this.hasExperiencedNetworkDisruption = false, this.requestsInFlight = /* @__PURE__ */ new Map(), this.heartBeatTimeout = (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS + import_time4.ONE_SECOND), this.request = async (t) => {
      var s3, i4;
      this.logger.debug("Publishing Request Payload");
      const r3 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        const n5 = this.provider.request(t);
        this.requestsInFlight.set(r3, { promise: n5, request: t }), this.logger.trace({ id: r3, method: t.method, topic: (s3 = t.params) == null ? void 0 : s3.topic }, "relayer.request - attempt to publish...");
        const a4 = await new Promise(async (c5, h5) => {
          const d3 = () => {
            h5(new Error(`relayer.request - publish interrupted, id: ${r3}`));
          };
          this.provider.on(T2.disconnect, d3);
          const g3 = await n5;
          this.provider.off(T2.disconnect, d3), c5(g3);
        });
        return this.logger.trace({ id: r3, method: t.method, topic: (i4 = t.params) == null ? void 0 : i4.topic }, "relayer.request - published"), a4;
      } catch (n5) {
        throw this.logger.debug(`Failed to Publish Request: ${r3}`), n5;
      } finally {
        this.requestsInFlight.delete(r3);
      }
    }, this.resetPingTimeout = () => {
      if (bi())
        try {
          clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
            var t, s3, i4;
            (i4 = (s3 = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : s3.socket) == null || i4.terminate();
          }, this.heartBeatTimeout);
        } catch (t) {
          this.logger.warn(t);
        }
    }, this.onPayloadHandler = (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.trace("relayer connected"), this.startPingTimeout(), this.events.emit(w3.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.trace("relayer disconnected"), this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (t) => {
      this.logger.error(t), this.events.emit(w3.error, t), this.logger.info("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(T2.payload, this.onPayloadHandler), this.provider.on(T2.connect, this.onConnectHandler), this.provider.on(T2.disconnect, this.onDisconnectHandler), this.provider.on(T2.error, this.onProviderErrorHandler);
    }, this.core = e2.core, this.logger = typeof e2.logger < "u" && typeof e2.logger != "string" ? E(e2.logger, this.name) : (0, import_pino2.default)(k({ level: e2.logger || at })), this.messages = new Wt(this.logger, e2.core), this.subscriber = new Qt(this, this.logger), this.publisher = new en2(this, this.logger), this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ee, this.projectId = e2.projectId, this.bundleId = ts(), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.cached.length > 0)
      try {
        await this.transportOpen();
      } catch (e2) {
        this.logger.warn(e2);
      }
  }
  get context() {
    return y(this.logger);
  }
  get connected() {
    var e2, t, s3;
    return ((s3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : s3.readyState) === 1;
  }
  get connecting() {
    var e2, t, s3;
    return ((s3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : s3.readyState) === 0;
  }
  async publish(e2, t, s3) {
    this.isInitialized(), await this.publisher.publish(e2, t, s3), await this.recordMessageEvent({ topic: e2, message: t, publishedAt: Date.now(), transportType: F.relay });
  }
  async subscribe(e2, t) {
    var s3;
    this.isInitialized(), (t == null ? void 0 : t.transportType) === "relay" && await this.toEstablishConnection();
    let i4 = ((s3 = this.subscriber.topicMap.get(e2)) == null ? void 0 : s3[0]) || "", r3;
    const n5 = (a4) => {
      a4.topic === e2 && (this.subscriber.off(A2.created, n5), r3());
    };
    return await Promise.all([new Promise((a4) => {
      r3 = a4, this.subscriber.on(A2.created, n5);
    }), new Promise(async (a4) => {
      i4 = await this.subscriber.subscribe(e2, t) || i4, a4();
    })]), i4;
  }
  async unsubscribe(e2, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e2, t);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async transportDisconnect() {
    if (!this.hasExperiencedNetworkDisruption && this.connected && this.requestsInFlight.size > 0)
      try {
        await Promise.all(Array.from(this.requestsInFlight.values()).map((e2) => e2.promise));
      } catch (e2) {
        this.logger.warn(e2);
      }
    this.hasExperiencedNetworkDisruption || this.connected ? await ds(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e2) {
    await this.confirmOnlineStateOrThrow(), e2 && e2 !== this.relayUrl && (this.relayUrl = e2, await this.transportDisconnect()), await this.createProvider(), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    try {
      await new Promise(async (t, s3) => {
        const i4 = () => {
          this.provider.off(T2.disconnect, i4), s3(new Error("Connection interrupted while trying to subscribe"));
        };
        this.provider.on(T2.disconnect, i4), await ds(this.provider.connect(), (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE), `Socket stalled when trying to connect to ${this.relayUrl}`).catch((r3) => {
          s3(r3);
        }).finally(() => {
          clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0;
        }), this.subscriber.start().catch((r3) => {
          this.logger.error(r3), this.onDisconnectHandler();
        }), this.hasExperiencedNetworkDisruption = false, t();
      });
    } catch (t) {
      this.logger.error(t);
      const s3 = t;
      if (this.hasExperiencedNetworkDisruption = true, !this.isConnectionStalled(s3.message))
        throw t;
    } finally {
      this.connectionAttemptInProgress = false;
    }
  }
  async restartTransport(e2) {
    this.connectionAttemptInProgress || (this.relayUrl = e2 || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Sh())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e2) {
    if ((e2 == null ? void 0 : e2.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e2.sort((s3, i4) => s3.publishedAt - i4.publishedAt);
    this.logger.trace(`Batch of ${t.length} message events sorted`);
    for (const s3 of t)
      try {
        await this.onMessageEvent(s3);
      } catch (i4) {
        this.logger.warn(i4);
      }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e2, t) {
    const { topic: s3 } = e2;
    if (!t.sessionExists) {
      const i4 = ms(import_time4.FIVE_MINUTES), r3 = { topic: s3, expiry: i4, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(s3, r3);
    }
    this.events.emit(w3.message, e2), await this.recordMessageEvent(e2);
  }
  startPingTimeout() {
    var e2, t, s3, i4, r3;
    if (bi())
      try {
        (t = (e2 = this.provider) == null ? void 0 : e2.connection) != null && t.socket && ((r3 = (i4 = (s3 = this.provider) == null ? void 0 : s3.connection) == null ? void 0 : i4.socket) == null || r3.once("ping", () => {
          this.resetPingTimeout();
        })), this.resetPingTimeout();
      } catch (n5) {
        this.logger.warn(n5);
      }
  }
  isConnectionStalled(e2) {
    return this.staleConnectionErrors.some((t) => e2.includes(t));
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e2 = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o2(new f2(is({ sdkVersion: oe2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e2, useOnCloseEvent: true, bundleId: this.bundleId }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e2) {
    const { topic: t, message: s3 } = e2;
    await this.messages.set(t, s3);
  }
  async shouldIgnoreMessageEvent(e2) {
    const { topic: t, message: s3 } = e2;
    if (!s3 || s3.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${s3}`), true;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), true;
    const i4 = this.messages.has(t, s3);
    return i4 && this.logger.debug(`Ignoring duplicate message: ${s3}`), i4;
  }
  async onProviderPayload(e2) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e2 }), isJsonRpcRequest(e2)) {
      if (!e2.method.endsWith(ht))
        return;
      const t = e2.params, { topic: s3, message: i4, publishedAt: r3, attestation: n5 } = t.data, a4 = { topic: s3, message: i4, publishedAt: r3, transportType: F.relay, attestation: n5 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(un2({ type: "event", event: t.id }, a4)), this.events.emit(t.id, a4), await this.acknowledgePayload(e2), await this.onMessageEvent(a4);
    } else
      isJsonRpcResponse(e2) && this.events.emit(w3.message_ack, e2);
  }
  async onMessageEvent(e2) {
    await this.shouldIgnoreMessageEvent(e2) || (this.events.emit(w3.message, e2), await this.recordMessageEvent(e2));
  }
  async acknowledgePayload(e2) {
    const t = formatJsonRpcResult(e2.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(T2.payload, this.onPayloadHandler), this.provider.off(T2.connect, this.onConnectHandler), this.provider.off(T2.disconnect, this.onDisconnectHandler), this.provider.off(T2.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e2 = await Sh();
    Ih(async (t) => {
      e2 !== t && (e2 = t, t ? await this.restartTransport().catch((s3) => this.logger.error(s3)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    });
  }
  async onProviderDisconnect() {
    await this.subscriber.stop(), this.requestsInFlight.clear(), clearTimeout(this.pingTimeout), this.events.emit(w3.disconnect), this.connectionAttemptInProgress = false, !this.transportExplicitlyClosed && (this.reconnectTimeout || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e2) => this.logger.error(e2));
    }, (0, import_time4.toMiliseconds)(lt))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && (this.connectionAttemptInProgress && await new Promise((e2) => {
      const t = setInterval(() => {
        this.connected && (clearInterval(t), e2());
      }, this.connectionStatusPollingInterval);
    }), await this.transportOpen());
  }
};
var dn2 = Object.defineProperty;
var si = Object.getOwnPropertySymbols;
var gn2 = Object.prototype.hasOwnProperty;
var pn2 = Object.prototype.propertyIsEnumerable;
var ri = (o4, e2, t) => e2 in o4 ? dn2(o4, e2, { enumerable: true, configurable: true, writable: true, value: t }) : o4[e2] = t;
var ni = (o4, e2) => {
  for (var t in e2 || (e2 = {}))
    gn2.call(e2, t) && ri(o4, t, e2[t]);
  if (si)
    for (var t of si(e2))
      pn2.call(e2, t) && ri(o4, t, e2[t]);
  return o4;
};
var oi = class extends p2 {
  constructor(e2, t, s3, i4 = O3, r3 = void 0) {
    super(e2, t, s3, i4), this.core = e2, this.logger = t, this.name = s3, this.map = /* @__PURE__ */ new Map(), this.version = ut, this.cached = [], this.initialized = false, this.storagePrefix = O3, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((n5) => {
        this.getKey && n5 !== null && !Pe(n5) ? this.map.set(this.getKey(n5), n5) : ah(n5) ? this.map.set(n5.id, n5) : uh(n5) && this.map.set(n5.topic, n5);
      }), this.cached = [], this.initialized = true);
    }, this.set = async (n5, a4) => {
      this.isInitialized(), this.map.has(n5) ? await this.update(n5, a4) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: n5, value: a4 }), this.map.set(n5, a4), await this.persist());
    }, this.get = (n5) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: n5 }), this.getData(n5)), this.getAll = (n5) => (this.isInitialized(), n5 ? this.values.filter((a4) => Object.keys(n5).every((c5) => (0, import_lodash.default)(a4[c5], n5[c5]))) : this.values), this.update = async (n5, a4) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: n5, update: a4 });
      const c5 = ni(ni({}, this.getData(n5)), a4);
      this.map.set(n5, c5), await this.persist();
    }, this.delete = async (n5, a4) => {
      this.isInitialized(), this.map.has(n5) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: n5, reason: a4 }), this.map.delete(n5), this.addToRecentlyDeleted(n5), await this.persist());
    }, this.logger = E(t, this.name), this.storagePrefix = i4, this.getKey = r3;
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e2) {
    this.recentlyDeleted.push(e2), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e2) {
    const t = this.map.get(e2);
    if (!t) {
      if (this.recentlyDeleted.includes(e2)) {
        const { message: i4 } = xe("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e2}`);
        throw this.logger.error(i4), new Error(i4);
      }
      const { message: s3 } = xe("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.error(s3), new Error(s3);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e2 = await this.getDataStore();
      if (typeof e2 > "u" || !e2.length)
        return;
      if (this.map.size) {
        const { message: t } = xe("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var ai = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, this.name = Dt2, this.version = mt, this.events = new import_events7.default(), this.initialized = false, this.storagePrefix = O3, this.ignoredPayloadTypes = [pr], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }, this.register = ({ methods: s3 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s3])];
    }, this.create = async (s3) => {
      this.isInitialized();
      const i4 = Su(), r3 = await this.core.crypto.setSymKey(i4), n5 = ms(import_time4.FIVE_MINUTES), a4 = { protocol: ot }, c5 = { topic: r3, expiry: n5, relay: a4, active: false }, h5 = Yu({ protocol: this.core.protocol, version: this.core.version, topic: r3, symKey: i4, relay: a4, expiryTimestamp: n5, methods: s3 == null ? void 0 : s3.methods });
      return this.core.expirer.set(r3, n5), await this.pairings.set(r3, c5), await this.core.relayer.subscribe(r3, { transportType: s3 == null ? void 0 : s3.transportType }), { topic: r3, uri: h5 };
    }, this.pair = async (s3) => {
      this.isInitialized();
      const i4 = this.core.eventClient.createEvent({ properties: { topic: s3 == null ? void 0 : s3.uri, trace: [z4.pairing_started] } });
      this.isValidPair(s3, i4);
      const { topic: r3, symKey: n5, relay: a4, expiryTimestamp: c5, methods: h5 } = Gu(s3.uri);
      i4.props.properties.topic = r3, i4.addTrace(z4.pairing_uri_validation_success), i4.addTrace(z4.pairing_uri_not_expired);
      let d3;
      if (this.pairings.keys.includes(r3)) {
        if (d3 = this.pairings.get(r3), i4.addTrace(z4.existing_pairing), d3.active)
          throw i4.setError($.active_pairing_already_exists), new Error(`Pairing already exists: ${r3}. Please try again with a new connection URI.`);
        i4.addTrace(z4.pairing_not_expired);
      }
      const g3 = c5 || ms(import_time4.FIVE_MINUTES), m2 = { topic: r3, relay: a4, expiry: g3, active: false, methods: h5 };
      this.core.expirer.set(r3, g3), await this.pairings.set(r3, m2), i4.addTrace(z4.store_new_pairing), s3.activatePairing && await this.activate({ topic: r3 }), this.events.emit(X.create, m2), i4.addTrace(z4.emit_inactive_pairing), this.core.crypto.keychain.has(r3) || await this.core.crypto.setSymKey(n5, r3), i4.addTrace(z4.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i4.setError($.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(r3, { relay: a4 });
      } catch (b4) {
        throw i4.setError($.subscribe_pairing_topic_failure), b4;
      }
      return i4.addTrace(z4.subscribe_pairing_topic_success), m2;
    }, this.activate = async ({ topic: s3 }) => {
      this.isInitialized();
      const i4 = ms(import_time4.THIRTY_DAYS);
      this.core.expirer.set(s3, i4), await this.pairings.update(s3, { active: true, expiry: i4 });
    }, this.ping = async (s3) => {
      this.isInitialized(), await this.isValidPing(s3);
      const { topic: i4 } = s3;
      if (this.pairings.keys.includes(i4)) {
        const r3 = await this.sendRequest(i4, "wc_pairingPing", {}), { done: n5, resolve: a4, reject: c5 } = ls();
        this.events.once(bs("pairing_ping", r3), ({ error: h5 }) => {
          h5 ? c5(h5) : a4();
        }), await n5();
      }
    }, this.updateExpiry = async ({ topic: s3, expiry: i4 }) => {
      this.isInitialized(), await this.pairings.update(s3, { expiry: i4 });
    }, this.updateMetadata = async ({ topic: s3, metadata: i4 }) => {
      this.isInitialized(), await this.pairings.update(s3, { peerMetadata: i4 });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (s3) => {
      this.isInitialized(), await this.isValidDisconnect(s3);
      const { topic: i4 } = s3;
      this.pairings.keys.includes(i4) && (await this.sendRequest(i4, "wc_pairingDelete", er("USER_DISCONNECTED")), await this.deletePairing(i4));
    }, this.sendRequest = async (s3, i4, r3) => {
      const n5 = formatJsonRpcRequest(i4, r3), a4 = await this.core.crypto.encode(s3, n5), c5 = j3[i4].req;
      return this.core.history.set(s3, n5), this.core.relayer.publish(s3, a4, c5), n5.id;
    }, this.sendResult = async (s3, i4, r3) => {
      const n5 = formatJsonRpcResult(s3, r3), a4 = await this.core.crypto.encode(i4, n5), c5 = await this.core.history.get(i4, s3), h5 = j3[c5.request.method].res;
      await this.core.relayer.publish(i4, a4, h5), await this.core.history.resolve(n5);
    }, this.sendError = async (s3, i4, r3) => {
      const n5 = formatJsonRpcError(s3, r3), a4 = await this.core.crypto.encode(i4, n5), c5 = await this.core.history.get(i4, s3), h5 = j3[c5.request.method] ? j3[c5.request.method].res : j3.unregistered_method.res;
      await this.core.relayer.publish(i4, a4, h5), await this.core.history.resolve(n5);
    }, this.deletePairing = async (s3, i4) => {
      await this.core.relayer.unsubscribe(s3), await Promise.all([this.pairings.delete(s3, er("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s3), i4 ? Promise.resolve() : this.core.expirer.del(s3)]);
    }, this.cleanup = async () => {
      const s3 = this.pairings.getAll().filter((i4) => As(i4.expiry));
      await Promise.all(s3.map((i4) => this.deletePairing(i4.topic)));
    }, this.onRelayEventRequest = (s3) => {
      const { topic: i4, payload: r3 } = s3;
      switch (r3.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(i4, r3);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(i4, r3);
        default:
          return this.onUnknownRpcMethodRequest(i4, r3);
      }
    }, this.onRelayEventResponse = async (s3) => {
      const { topic: i4, payload: r3 } = s3, n5 = (await this.core.history.get(i4, r3.id)).request.method;
      switch (n5) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i4, r3);
        default:
          return this.onUnknownRpcMethodResponse(n5);
      }
    }, this.onPairingPingRequest = async (s3, i4) => {
      const { id: r3 } = i4;
      try {
        this.isValidPing({ topic: s3 }), await this.sendResult(r3, s3, true), this.events.emit(X.ping, { id: r3, topic: s3 });
      } catch (n5) {
        await this.sendError(r3, s3, n5), this.logger.error(n5);
      }
    }, this.onPairingPingResponse = (s3, i4) => {
      const { id: r3 } = i4;
      setTimeout(() => {
        isJsonRpcResult(i4) ? this.events.emit(bs("pairing_ping", r3), {}) : isJsonRpcError(i4) && this.events.emit(bs("pairing_ping", r3), { error: i4.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (s3, i4) => {
      const { id: r3 } = i4;
      try {
        this.isValidDisconnect({ topic: s3 }), await this.deletePairing(s3), this.events.emit(X.delete, { id: r3, topic: s3 });
      } catch (n5) {
        await this.sendError(r3, s3, n5), this.logger.error(n5);
      }
    }, this.onUnknownRpcMethodRequest = async (s3, i4) => {
      const { id: r3, method: n5 } = i4;
      try {
        if (this.registeredMethods.includes(n5))
          return;
        const a4 = er("WC_METHOD_UNSUPPORTED", n5);
        await this.sendError(r3, s3, a4), this.logger.error(a4);
      } catch (a4) {
        await this.sendError(r3, s3, a4), this.logger.error(a4);
      }
    }, this.onUnknownRpcMethodResponse = (s3) => {
      this.registeredMethods.includes(s3) || this.logger.error(er("WC_METHOD_UNSUPPORTED", s3));
    }, this.isValidPair = (s3, i4) => {
      var r3;
      if (!ph(s3)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `pair() params: ${s3}`);
        throw i4.setError($.malformed_pairing_uri), new Error(a4);
      }
      if (!sh(s3.uri)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `pair() uri: ${s3.uri}`);
        throw i4.setError($.malformed_pairing_uri), new Error(a4);
      }
      const n5 = Gu(s3 == null ? void 0 : s3.uri);
      if (!((r3 = n5 == null ? void 0 : n5.relay) != null && r3.protocol)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i4.setError($.malformed_pairing_uri), new Error(a4);
      }
      if (!(n5 != null && n5.symKey)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i4.setError($.malformed_pairing_uri), new Error(a4);
      }
      if (n5 != null && n5.expiryTimestamp && (0, import_time4.toMiliseconds)(n5 == null ? void 0 : n5.expiryTimestamp) < Date.now()) {
        i4.setError($.pairing_expired);
        const { message: a4 } = xe("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a4);
      }
    }, this.isValidPing = async (s3) => {
      if (!ph(s3)) {
        const { message: r3 } = xe("MISSING_OR_INVALID", `ping() params: ${s3}`);
        throw new Error(r3);
      }
      const { topic: i4 } = s3;
      await this.isValidPairingTopic(i4);
    }, this.isValidDisconnect = async (s3) => {
      if (!ph(s3)) {
        const { message: r3 } = xe("MISSING_OR_INVALID", `disconnect() params: ${s3}`);
        throw new Error(r3);
      }
      const { topic: i4 } = s3;
      await this.isValidPairingTopic(i4);
    }, this.isValidPairingTopic = async (s3) => {
      if (!Yt(s3, false)) {
        const { message: i4 } = xe("MISSING_OR_INVALID", `pairing topic should be a string: ${s3}`);
        throw new Error(i4);
      }
      if (!this.pairings.keys.includes(s3)) {
        const { message: i4 } = xe("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s3}`);
        throw new Error(i4);
      }
      if (As(this.pairings.get(s3).expiry)) {
        await this.deletePairing(s3);
        const { message: i4 } = xe("EXPIRED", `pairing topic: ${s3}`);
        throw new Error(i4);
      }
    }, this.core = e2, this.logger = E(t, this.name), this.pairings = new oi(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(w3.message, async (e2) => {
      const { topic: t, message: s3, transportType: i4 } = e2;
      if (!this.pairings.keys.includes(t) || i4 === F.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s3)))
        return;
      const r3 = await this.core.crypto.decode(t, s3);
      try {
        isJsonRpcRequest(r3) ? (this.core.history.set(t, r3), this.onRelayEventRequest({ topic: t, payload: r3 })) : isJsonRpcResponse(r3) && (await this.core.history.resolve(r3), await this.onRelayEventResponse({ topic: t, payload: r3 }), this.core.history.delete(t, r3.id));
      } catch (n5) {
        this.logger.error(n5);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(R.expired, async (e2) => {
      const { topic: t } = gs(e2.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(X.expire, { topic: t }));
    });
  }
};
var ci = class extends h3 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new import_events7.EventEmitter(), this.name = bt, this.version = ft, this.cached = [], this.initialized = false, this.storagePrefix = O3, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s3) => this.records.set(s3.id, s3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.set = (s3, i4, r3) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s3, request: i4, chainId: r3 }), this.records.has(i4.id))
        return;
      const n5 = { id: i4.id, topic: s3, request: { method: i4.method, params: i4.params || null }, chainId: r3, expiry: ms(import_time4.THIRTY_DAYS) };
      this.records.set(n5.id, n5), this.persist(), this.events.emit(P.created, n5);
    }, this.resolve = async (s3) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s3 }), !this.records.has(s3.id))
        return;
      const i4 = await this.getRecord(s3.id);
      typeof i4.response > "u" && (i4.response = isJsonRpcError(s3) ? { error: s3.error } : { result: s3.result }, this.records.set(i4.id, i4), this.persist(), this.events.emit(P.updated, i4));
    }, this.get = async (s3, i4) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s3, id: i4 }), await this.getRecord(i4)), this.delete = (s3, i4) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i4 }), this.values.forEach((r3) => {
        if (r3.topic === s3) {
          if (typeof i4 < "u" && r3.id !== i4)
            return;
          this.records.delete(r3.id), this.events.emit(P.deleted, r3);
        }
      }), this.persist();
    }, this.exists = async (s3, i4) => (this.isInitialized(), this.records.has(i4) ? (await this.getRecord(i4)).topic === s3 : false), this.on = (s3, i4) => {
      this.events.on(s3, i4);
    }, this.once = (s3, i4) => {
      this.events.once(s3, i4);
    }, this.off = (s3, i4) => {
      this.events.off(s3, i4);
    }, this.removeListener = (s3, i4) => {
      this.events.removeListener(s3, i4);
    }, this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e2 = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const s3 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e2.push(s3);
    }), e2;
  }
  async setJsonRpcRecords(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e2) {
    this.isInitialized();
    const t = this.records.get(e2);
    if (!t) {
      const { message: s3 } = xe("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(s3);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(P.sync);
  }
  async restore() {
    try {
      const e2 = await this.getJsonRpcRecords();
      if (typeof e2 > "u" || !e2.length)
        return;
      if (this.records.size) {
        const { message: t } = xe("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e2);
    }
  }
  registerEventListeners() {
    this.events.on(P.created, (e2) => {
      const t = P.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(P.updated, (e2) => {
      const t = P.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(P.deleted, (e2) => {
      const t = P.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.core.heartbeat.on(r2.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e2 = false;
      this.records.forEach((t) => {
        (0, import_time4.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(P.deleted, t, false), e2 = true);
      }), e2 && this.persist();
    } catch (e2) {
      this.logger.warn(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var hi = class extends x3 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new import_events7.EventEmitter(), this.name = _t, this.version = Et, this.cached = [], this.initialized = false, this.storagePrefix = O3, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s3) => this.expirations.set(s3.target, s3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.has = (s3) => {
      try {
        const i4 = this.formatTarget(s3);
        return typeof this.getExpiration(i4) < "u";
      } catch {
        return false;
      }
    }, this.set = (s3, i4) => {
      this.isInitialized();
      const r3 = this.formatTarget(s3), n5 = { target: r3, expiry: i4 };
      this.expirations.set(r3, n5), this.checkExpiry(r3, n5), this.events.emit(R.created, { target: r3, expiration: n5 });
    }, this.get = (s3) => {
      this.isInitialized();
      const i4 = this.formatTarget(s3);
      return this.getExpiration(i4);
    }, this.del = (s3) => {
      if (this.isInitialized(), this.has(s3)) {
        const i4 = this.formatTarget(s3), r3 = this.getExpiration(i4);
        this.expirations.delete(i4), this.events.emit(R.deleted, { target: i4, expiration: r3 });
      }
    }, this.on = (s3, i4) => {
      this.events.on(s3, i4);
    }, this.once = (s3, i4) => {
      this.events.once(s3, i4);
    }, this.off = (s3, i4) => {
      this.events.off(s3, i4);
    }, this.removeListener = (s3, i4) => {
      this.events.removeListener(s3, i4);
    }, this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e2) {
    if (typeof e2 == "string")
      return ps(e2);
    if (typeof e2 == "number")
      return vs(e2);
    const { message: t } = xe("UNKNOWN_TYPE", `Target type: ${typeof e2}`);
    throw new Error(t);
  }
  async setExpirations(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(R.sync);
  }
  async restore() {
    try {
      const e2 = await this.getExpirations();
      if (typeof e2 > "u" || !e2.length)
        return;
      if (this.expirations.size) {
        const { message: t } = xe("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e2);
    }
  }
  getExpiration(e2) {
    const t = this.expirations.get(e2);
    if (!t) {
      const { message: s3 } = xe("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.warn(s3), new Error(s3);
    }
    return t;
  }
  checkExpiry(e2, t) {
    const { expiry: s3 } = t;
    (0, import_time4.toMiliseconds)(s3) - Date.now() <= 0 && this.expire(e2, t);
  }
  expire(e2, t) {
    this.expirations.delete(e2), this.events.emit(R.expired, { target: e2, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e2, t) => this.checkExpiry(t, e2));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r2.pulse, () => this.checkExpirations()), this.events.on(R.created, (e2) => {
      const t = R.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(R.expired, (e2) => {
      const t = R.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(R.deleted, (e2) => {
      const t = R.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var y5 = {};
Object.defineProperty(y5, "__esModule", { value: true }), y5.getLocalStorage = y5.getLocalStorageOrThrow = y5.getCrypto = y5.getCryptoOrThrow = y5.getLocation = y5.getLocationOrThrow = y5.getNavigator = y5.getNavigatorOrThrow = li = y5.getDocument = y5.getDocumentOrThrow = y5.getFromWindowOrThrow = y5.getFromWindow = void 0;
function U2(o4) {
  let e2;
  return typeof window < "u" && typeof window[o4] < "u" && (e2 = window[o4]), e2;
}
y5.getFromWindow = U2;
function q(o4) {
  const e2 = U2(o4);
  if (!e2)
    throw new Error(`${o4} is not defined in Window`);
  return e2;
}
y5.getFromWindowOrThrow = q;
function yn() {
  return q("document");
}
y5.getDocumentOrThrow = yn;
function Dn() {
  return U2("document");
}
var li = y5.getDocument = Dn;
function mn2() {
  return q("navigator");
}
y5.getNavigatorOrThrow = mn2;
function bn() {
  return U2("navigator");
}
y5.getNavigator = bn;
function fn2() {
  return q("location");
}
y5.getLocationOrThrow = fn2;
function _n2() {
  return U2("location");
}
y5.getLocation = _n2;
function En2() {
  return q("crypto");
}
y5.getCryptoOrThrow = En2;
function vn2() {
  return U2("crypto");
}
y5.getCrypto = vn2;
function wn() {
  return q("localStorage");
}
y5.getLocalStorageOrThrow = wn;
function In2() {
  return U2("localStorage");
}
y5.getLocalStorage = In2;
var ui = class extends y3 {
  constructor(e2, t, s3) {
    super(e2, t, s3), this.core = e2, this.logger = t, this.store = s3, this.name = vt, this.verifyUrlV3 = It, this.storagePrefix = O3, this.version = fe2, this.init = async () => {
      var i4;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time4.toMiliseconds)((i4 = this.publicKey) == null ? void 0 : i4.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (i4) => {
      if (!gr() || this.isDevEnv)
        return;
      const r3 = window.location.origin, { id: n5, decryptedId: a4 } = i4, c5 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${r3}&id=${n5}&decryptedId=${a4}`;
      try {
        const h5 = li(), d3 = this.startAbortTimer(import_time4.ONE_SECOND * 5), g3 = await new Promise((m2, b4) => {
          const l4 = () => {
            window.removeEventListener("message", _3), h5.body.removeChild(p3), b4("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", l4);
          const p3 = h5.createElement("iframe");
          p3.src = c5, p3.style.display = "none", p3.addEventListener("error", l4, { signal: this.abortController.signal });
          const _3 = (D3) => {
            if (!D3.data)
              return;
            const E3 = JSON.parse(D3.data);
            if (E3.type === "verify_attestation") {
              if (decodeJWT(E3.attestation).payload.id !== n5)
                return;
              clearInterval(d3), h5.body.removeChild(p3), this.abortController.signal.removeEventListener("abort", l4), window.removeEventListener("message", _3), m2(E3.attestation === null ? "" : E3.attestation);
            }
          };
          h5.body.appendChild(p3), window.addEventListener("message", _3, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", g3), g3;
      } catch (h5) {
        this.logger.warn(h5);
      }
      return "";
    }, this.resolve = async (i4) => {
      if (this.isDevEnv)
        return "";
      const { attestationId: r3, hash: n5, encryptedId: a4 } = i4;
      if (r3 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (r3) {
        if (decodeJWT(r3).payload.id !== a4)
          return;
        const h5 = await this.isValidJwtAttestation(r3);
        if (h5) {
          if (!h5.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h5;
        }
      }
      if (!n5)
        return;
      const c5 = this.getVerifyUrl(i4 == null ? void 0 : i4.verifyUrl);
      return this.fetchAttestation(n5, c5);
    }, this.fetchAttestation = async (i4, r3) => {
      this.logger.debug(`resolving attestation: ${i4} from url: ${r3}`);
      const n5 = this.startAbortTimer(import_time4.ONE_SECOND * 5), a4 = await fetch(`${r3}/attestation/${i4}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(n5), a4.status === 200 ? await a4.json() : void 0;
    }, this.getVerifyUrl = (i4) => {
      let r3 = i4 || Z;
      return Tt2.includes(r3) || (this.logger.info(`verify url: ${r3}, not included in trusted list, assigning default: ${Z}`), r3 = Z), r3;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i4 = this.startAbortTimer(import_time4.FIVE_SECONDS), r3 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i4), await r3.json();
      } catch (i4) {
        this.logger.warn(i4);
      }
    }, this.persistPublicKey = async (i4) => {
      this.logger.debug("persisting public key to local storage", i4), await this.store.setItem(this.storeKey, i4), this.publicKey = i4;
    }, this.removePublicKey = async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }, this.isValidJwtAttestation = async (i4) => {
      const r3 = await this.getPublicKey();
      try {
        if (r3)
          return this.validateAttestation(i4, r3);
      } catch (a4) {
        this.logger.error(a4), this.logger.warn("error validating attestation");
      }
      const n5 = await this.fetchAndPersistPublicKey();
      try {
        if (n5)
          return this.validateAttestation(i4, n5);
      } catch (a4) {
        this.logger.error(a4), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise)
        return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (r3) => {
        const n5 = await this.fetchPublicKey();
        n5 && (await this.persistPublicKey(n5), r3(n5));
      });
      const i4 = await this.fetchPromise;
      return this.fetchPromise = void 0, i4;
    }, this.validateAttestation = (i4, r3) => {
      const n5 = ku(i4, r3.publicKey), a4 = { hasExpired: (0, import_time4.toMiliseconds)(n5.exp) < Date.now(), payload: n5 };
      if (a4.hasExpired)
        throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a4.payload.origin, isScam: a4.payload.isScam, isVerified: a4.payload.isVerified };
    }, this.logger = E(t, this.name), this.abortController = new AbortController(), this.isDevEnv = Es(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y(this.logger);
  }
  startAbortTimer(e2) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time4.toMiliseconds)(e2));
  }
};
var di2 = class extends v2 {
  constructor(e2, t) {
    super(e2, t), this.projectId = e2, this.logger = t, this.context = Ct, this.registerDeviceToken = async (s3) => {
      const { clientId: i4, token: r3, notificationType: n5, enableEncrypted: a4 = false } = s3, c5 = `${St}/${this.projectId}/clients`;
      await fetch(c5, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i4, type: n5, token: r3, always_raw: a4 }) });
    }, this.logger = E(t, this.context);
  }
};
var Tn = Object.defineProperty;
var gi = Object.getOwnPropertySymbols;
var Cn2 = Object.prototype.hasOwnProperty;
var Sn2 = Object.prototype.propertyIsEnumerable;
var pi2 = (o4, e2, t) => e2 in o4 ? Tn(o4, e2, { enumerable: true, configurable: true, writable: true, value: t }) : o4[e2] = t;
var te2 = (o4, e2) => {
  for (var t in e2 || (e2 = {}))
    Cn2.call(e2, t) && pi2(o4, t, e2[t]);
  if (gi)
    for (var t of gi(e2))
      Sn2.call(e2, t) && pi2(o4, t, e2[t]);
  return o4;
};
var yi2 = class extends C3 {
  constructor(e2, t, s3 = true) {
    super(e2, t, s3), this.core = e2, this.logger = t, this.context = Rt, this.storagePrefix = O3, this.storageVersion = Pt, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = false, this.init = async () => {
      if (!Es())
        try {
          const i4 = { eventId: Ms(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: On(this.core.relayer.protocol, this.core.relayer.version, oe2) } } };
          await this.sendEvent([i4]);
        } catch (i4) {
          this.logger.warn(i4);
        }
    }, this.createEvent = (i4) => {
      const { event: r3 = "ERROR", type: n5 = "", properties: { topic: a4, trace: c5 } } = i4, h5 = Ms(), d3 = this.core.projectId || "", g3 = Date.now(), m2 = te2({ eventId: h5, timestamp: g3, props: { event: r3, type: n5, properties: { topic: a4, trace: c5 } }, bundleId: d3, domain: this.getAppDomain() }, this.setMethods(h5));
      return this.telemetryEnabled && (this.events.set(h5, m2), this.shouldPersist = true), m2;
    }, this.getEvent = (i4) => {
      const { eventId: r3, topic: n5 } = i4;
      if (r3)
        return this.events.get(r3);
      const a4 = Array.from(this.events.values()).find((c5) => c5.props.properties.topic === n5);
      if (a4)
        return te2(te2({}, a4), this.setMethods(a4.eventId));
    }, this.deleteEvent = (i4) => {
      const { eventId: r3 } = i4;
      this.events.delete(r3), this.shouldPersist = true;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(r2.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i4) => {
          (0, import_time4.fromMiliseconds)(Date.now()) - (0, import_time4.fromMiliseconds)(i4.timestamp) > xt && (this.events.delete(i4.eventId), this.shouldPersist = true);
        });
      });
    }, this.setMethods = (i4) => ({ addTrace: (r3) => this.addTrace(i4, r3), setError: (r3) => this.setError(i4, r3) }), this.addTrace = (i4, r3) => {
      const n5 = this.events.get(i4);
      n5 && (n5.props.properties.trace.push(r3), this.events.set(i4, n5), this.shouldPersist = true);
    }, this.setError = (i4, r3) => {
      const n5 = this.events.get(i4);
      n5 && (n5.props.type = r3, n5.timestamp = Date.now(), this.events.set(i4, n5), this.shouldPersist = true);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }, this.restore = async () => {
      try {
        const i4 = await this.core.storage.getItem(this.storageKey) || [];
        if (!i4.length)
          return;
        i4.forEach((r3) => {
          this.events.set(r3.eventId, te2(te2({}, r3), this.setMethods(r3.eventId)));
        });
      } catch (i4) {
        this.logger.warn(i4);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0)
        return;
      const i4 = [];
      for (const [r3, n5] of this.events)
        n5.props.type && i4.push(n5);
      if (i4.length !== 0)
        try {
          if ((await this.sendEvent(i4)).ok)
            for (const r3 of i4)
              this.events.delete(r3.eventId), this.shouldPersist = true;
        } catch (r3) {
          this.logger.warn(r3);
        }
    }, this.sendEvent = async (i4) => {
      const r3 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Ot2}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${oe2}${r3}`, { method: "POST", body: JSON.stringify(i4) });
    }, this.getAppDomain = () => es().url, this.logger = E(t, this.context), this.telemetryEnabled = s3, s3 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var Pn = Object.defineProperty;
var Di2 = Object.getOwnPropertySymbols;
var Rn2 = Object.prototype.hasOwnProperty;
var xn = Object.prototype.propertyIsEnumerable;
var mi = (o4, e2, t) => e2 in o4 ? Pn(o4, e2, { enumerable: true, configurable: true, writable: true, value: t }) : o4[e2] = t;
var bi2 = (o4, e2) => {
  for (var t in e2 || (e2 = {}))
    Rn2.call(e2, t) && mi(o4, t, e2[t]);
  if (Di2)
    for (var t of Di2(e2))
      xn.call(e2, t) && mi(o4, t, e2[t]);
  return o4;
};
var ce2 = class _ce extends n4 {
  constructor(e2) {
    var t;
    super(e2), this.protocol = be2, this.version = fe2, this.name = ne2, this.events = new import_events7.EventEmitter(), this.initialized = false, this.on = (n5, a4) => this.events.on(n5, a4), this.once = (n5, a4) => this.events.once(n5, a4), this.off = (n5, a4) => this.events.off(n5, a4), this.removeListener = (n5, a4) => this.events.removeListener(n5, a4), this.dispatchEnvelope = ({ topic: n5, message: a4, sessionExists: c5 }) => {
      if (!n5 || !a4)
        return;
      const h5 = { topic: n5, message: a4, publishedAt: Date.now(), transportType: F.link_mode };
      this.relayer.onLinkMessageEvent(h5, { sessionExists: c5 });
    }, this.projectId = e2 == null ? void 0 : e2.projectId, this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ee, this.customStoragePrefix = e2 != null && e2.customStoragePrefix ? `:${e2.customStoragePrefix}` : "";
    const s3 = k({ level: typeof (e2 == null ? void 0 : e2.logger) == "string" && e2.logger ? e2.logger : We2.logger }), { logger: i4, chunkLoggerController: r3 } = A({ opts: s3, maxSizeInBytes: e2 == null ? void 0 : e2.maxLogBlobSizeInBytes, loggerOverride: e2 == null ? void 0 : e2.logger });
    this.logChunkController = r3, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var n5, a4;
      (n5 = this.logChunkController) != null && n5.downloadLogsBlobInBrowser && ((a4 = this.logChunkController) == null || a4.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E(i4, this.name), this.heartbeat = new i2(), this.crypto = new Jt2(this, this.logger, e2 == null ? void 0 : e2.keychain), this.history = new ci(this, this.logger), this.expirer = new hi(this, this.logger), this.storage = e2 != null && e2.storage ? e2.storage : new h2(bi2(bi2({}, Xe2), e2 == null ? void 0 : e2.storageOptions)), this.relayer = new ii({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new ai(this, this.logger), this.verify = new ui(this, this.logger, this.storage), this.echoClient = new di2(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new yi2(this, this.logger, e2 == null ? void 0 : e2.telemetryEnabled);
  }
  static async init(e2) {
    const t = new _ce(e2);
    await t.initialize();
    const s3 = await t.crypto.getClientId();
    return await t.storage.setItem(dt, s3), t;
  }
  get context() {
    return y(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e2;
    return (e2 = this.logChunkController) == null ? void 0 : e2.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e2) {
    this.linkModeSupportedApps.includes(e2) || (this.linkModeSupportedApps.push(e2), await this.storage.setItem(ve2, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.eventClient.init(), this.linkModeSupportedApps = await this.storage.getItem(ve2) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e2) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e2), this.logger.error(e2.message), e2;
    }
  }
};
var On2 = ce2;

// node_modules/@walletconnect/sign-client/dist/index.es.js
var import_events8 = __toESM(require_events());
var import_time5 = __toESM(require_cjs());
var be3 = "wc";
var Ce3 = 2;
var Le = "client";
var ye2 = `${be3}@${Ce3}:${Le}:`;
var we3 = { name: Le, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var xe2 = "WALLETCONNECT_DEEPLINK_CHOICE";
var st2 = "proposal";
var it2 = "Proposal expired";
var rt2 = "session";
var z5 = import_time5.SEVEN_DAYS;
var nt2 = "engine";
var v3 = { wc_sessionPropose: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time5.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time5.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var me2 = { min: import_time5.FIVE_MINUTES, max: import_time5.SEVEN_DAYS };
var x4 = { idle: "IDLE", active: "ACTIVE" };
var ot2 = "request";
var at2 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var ct2 = "wc";
var lt2 = "auth";
var pt2 = "authKeys";
var ht2 = "pairingTopics";
var dt2 = "requests";
var oe3 = `${ct2}@${1.5}:${lt2}:`;
var ae3 = `${oe3}:PUB_KEY`;
var ys2 = Object.defineProperty;
var ws2 = Object.defineProperties;
var ms2 = Object.getOwnPropertyDescriptors;
var ut2 = Object.getOwnPropertySymbols;
var _s2 = Object.prototype.hasOwnProperty;
var Es2 = Object.prototype.propertyIsEnumerable;
var gt2 = (q2, o4, e2) => o4 in q2 ? ys2(q2, o4, { enumerable: true, configurable: true, writable: true, value: e2 }) : q2[o4] = e2;
var I3 = (q2, o4) => {
  for (var e2 in o4 || (o4 = {}))
    _s2.call(o4, e2) && gt2(q2, e2, o4[e2]);
  if (ut2)
    for (var e2 of ut2(o4))
      Es2.call(o4, e2) && gt2(q2, e2, o4[e2]);
  return q2;
};
var D2 = (q2, o4) => ws2(q2, ms2(o4));
var Rs3 = class extends M {
  constructor(o4) {
    super(o4), this.name = nt2, this.events = new import_events8.default(), this.initialized = false, this.requestQueue = { state: x4.idle, queue: [] }, this.sessionRequestQueue = { state: x4.idle, queue: [] }, this.requestQueueDelay = import_time5.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(v3) }), this.initialized = true, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay)));
    }, this.connect = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = D2(I3({}, e2), { requiredNamespaces: e2.requiredNamespaces || {}, optionalNamespaces: e2.optionalNamespaces || {} });
      await this.isValidConnect(t);
      const { pairingTopic: s3, requiredNamespaces: i4, optionalNamespaces: r3, sessionProperties: n5, relays: a4 } = t;
      let c5 = s3, h5, p3 = false;
      try {
        c5 && (p3 = this.client.core.pairing.pairings.get(c5).active);
      } catch (E3) {
        throw this.client.logger.error(`connect() -> pairing.get(${c5}) failed`), E3;
      }
      if (!c5 || !p3) {
        const { topic: E3, uri: S4 } = await this.client.core.pairing.create();
        c5 = E3, h5 = S4;
      }
      if (!c5) {
        const { message: E3 } = xe("NO_MATCHING_KEY", `connect() pairing topic: ${c5}`);
        throw new Error(E3);
      }
      const d3 = await this.client.core.crypto.generateKeyPair(), l4 = v3.wc_sessionPropose.req.ttl || import_time5.FIVE_MINUTES, w4 = ms(l4), m2 = I3({ requiredNamespaces: i4, optionalNamespaces: r3, relays: a4 ?? [{ protocol: ot }], proposer: { publicKey: d3, metadata: this.client.metadata }, expiryTimestamp: w4, pairingTopic: c5 }, n5 && { sessionProperties: n5 }), { reject: y6, resolve: _3, done: R2 } = ls(l4, it2);
      this.events.once(bs("session_connect"), async ({ error: E3, session: S4 }) => {
        if (E3)
          y6(E3);
        else if (S4) {
          S4.self.publicKey = d3;
          const M2 = D2(I3({}, S4), { pairingTopic: m2.pairingTopic, requiredNamespaces: m2.requiredNamespaces, optionalNamespaces: m2.optionalNamespaces, transportType: F.relay });
          await this.client.session.set(S4.topic, M2), await this.setExpiry(S4.topic, S4.expiry), c5 && await this.client.core.pairing.updateMetadata({ topic: c5, metadata: S4.peer.metadata }), this.cleanupDuplicatePairings(M2), _3(M2);
        }
      });
      const V2 = await this.sendRequest({ topic: c5, method: "wc_sessionPropose", params: m2, throwOnFailedPublish: true });
      return await this.setProposal(V2, I3({ id: V2 }, m2)), { uri: h5, approval: R2 };
    }, this.pair = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e2);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }, this.approve = async (e2) => {
      var t, s3, i4;
      const r3 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e2 == null ? void 0 : e2.id) == null ? void 0 : t.toString(), trace: [Cs2.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (N10) {
        throw r3.setError(Ss2.no_internet_connection), N10;
      }
      try {
        await this.isValidProposalId(e2 == null ? void 0 : e2.id);
      } catch (N10) {
        throw this.client.logger.error(`approve() -> proposal.get(${e2 == null ? void 0 : e2.id}) failed`), r3.setError(Ss2.proposal_not_found), N10;
      }
      try {
        await this.isValidApprove(e2);
      } catch (N10) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r3.setError(Ss2.session_approve_namespace_validation_failure), N10;
      }
      const { id: n5, relayProtocol: a4, namespaces: c5, sessionProperties: h5, sessionConfig: p3 } = e2, d3 = this.client.proposal.get(n5);
      this.client.core.eventClient.deleteEvent({ eventId: r3.eventId });
      const { pairingTopic: l4, proposer: w4, requiredNamespaces: m2, optionalNamespaces: y6 } = d3;
      let _3 = (s3 = this.client.core.eventClient) == null ? void 0 : s3.getEvent({ topic: l4 });
      _3 || (_3 = (i4 = this.client.core.eventClient) == null ? void 0 : i4.createEvent({ type: Cs2.session_approve_started, properties: { topic: l4, trace: [Cs2.session_approve_started, Cs2.session_namespaces_validation_success] } }));
      const R2 = await this.client.core.crypto.generateKeyPair(), V2 = w4.publicKey, E3 = await this.client.core.crypto.generateSharedKey(R2, V2), S4 = I3(I3({ relay: { protocol: a4 ?? "irn" }, namespaces: c5, controller: { publicKey: R2, metadata: this.client.metadata }, expiry: ms(z5) }, h5 && { sessionProperties: h5 }), p3 && { sessionConfig: p3 }), M2 = F.relay;
      _3.addTrace(Cs2.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(E3, { transportType: M2 });
      } catch (N10) {
        throw _3.setError(Ss2.subscribe_session_topic_failure), N10;
      }
      _3.addTrace(Cs2.subscribe_session_topic_success);
      const W = D2(I3({}, S4), { topic: E3, requiredNamespaces: m2, optionalNamespaces: y6, pairingTopic: l4, acknowledged: false, self: S4.controller, peer: { publicKey: w4.publicKey, metadata: w4.metadata }, controller: R2, transportType: F.relay });
      await this.client.session.set(E3, W), _3.addTrace(Cs2.store_session);
      try {
        _3.addTrace(Cs2.publishing_session_settle), await this.sendRequest({ topic: E3, method: "wc_sessionSettle", params: S4, throwOnFailedPublish: true }).catch((N10) => {
          throw _3 == null ? void 0 : _3.setError(Ss2.session_settle_publish_failure), N10;
        }), _3.addTrace(Cs2.session_settle_publish_success), _3.addTrace(Cs2.publishing_session_approve), await this.sendResult({ id: n5, topic: l4, result: { relay: { protocol: a4 ?? "irn" }, responderPublicKey: R2 }, throwOnFailedPublish: true }).catch((N10) => {
          throw _3 == null ? void 0 : _3.setError(Ss2.session_approve_publish_failure), N10;
        }), _3.addTrace(Cs2.session_approve_publish_success);
      } catch (N10) {
        throw this.client.logger.error(N10), this.client.session.delete(E3, er("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(E3), N10;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: _3.eventId }), await this.client.core.pairing.updateMetadata({ topic: l4, metadata: w4.metadata }), await this.client.proposal.delete(n5, er("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: l4 }), await this.setExpiry(E3, ms(z5)), { topic: E3, acknowledged: () => Promise.resolve(this.client.session.get(E3)) };
    }, this.reject = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e2);
      } catch (r3) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r3;
      }
      const { id: t, reason: s3 } = e2;
      let i4;
      try {
        i4 = this.client.proposal.get(t).pairingTopic;
      } catch (r3) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r3;
      }
      i4 && (await this.sendError({ id: t, topic: i4, error: s3, rpcOpts: v3.wc_sessionPropose.reject }), await this.client.proposal.delete(t, er("USER_DISCONNECTED")));
    }, this.update = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e2);
      } catch (p3) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), p3;
      }
      const { topic: t, namespaces: s3 } = e2, { done: i4, resolve: r3, reject: n5 } = ls(), a4 = payloadId(), c5 = getBigIntRpcId().toString(), h5 = this.client.session.get(t).namespaces;
      return this.events.once(bs("session_update", a4), ({ error: p3 }) => {
        p3 ? n5(p3) : r3();
      }), await this.client.session.update(t, { namespaces: s3 }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s3 }, throwOnFailedPublish: true, clientRpcId: a4, relayRpcId: c5 }).catch((p3) => {
        this.client.logger.error(p3), this.client.session.update(t, { namespaces: h5 }), n5(p3);
      }), { acknowledged: i4 };
    }, this.extend = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e2);
      } catch (a4) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a4;
      }
      const { topic: t } = e2, s3 = payloadId(), { done: i4, resolve: r3, reject: n5 } = ls();
      return this.events.once(bs("session_extend", s3), ({ error: a4 }) => {
        a4 ? n5(a4) : r3();
      }), await this.setExpiry(t, ms(z5)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s3, throwOnFailedPublish: true }).catch((a4) => {
        n5(a4);
      }), { acknowledged: i4 };
    }, this.request = async (e2) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e2);
      } catch (w4) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), w4;
      }
      const { chainId: t, request: s3, topic: i4, expiry: r3 = v3.wc_sessionRequest.req.ttl } = e2, n5 = this.client.session.get(i4);
      (n5 == null ? void 0 : n5.transportType) === F.relay && await this.confirmOnlineStateOrThrow();
      const a4 = payloadId(), c5 = getBigIntRpcId().toString(), { done: h5, resolve: p3, reject: d3 } = ls(r3, "Request expired. Please try again.");
      this.events.once(bs("session_request", a4), ({ error: w4, result: m2 }) => {
        w4 ? d3(w4) : p3(m2);
      });
      const l4 = this.getAppLinkIfEnabled(n5.peer.metadata, n5.transportType);
      return l4 ? (await this.sendRequest({ clientRpcId: a4, relayRpcId: c5, topic: i4, method: "wc_sessionRequest", params: { request: D2(I3({}, s3), { expiryTimestamp: ms(r3) }), chainId: t }, expiry: r3, throwOnFailedPublish: true, appLink: l4 }).catch((w4) => d3(w4)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a4 }), await h5()) : await Promise.all([new Promise(async (w4) => {
        await this.sendRequest({ clientRpcId: a4, relayRpcId: c5, topic: i4, method: "wc_sessionRequest", params: { request: D2(I3({}, s3), { expiryTimestamp: ms(r3) }), chainId: t }, expiry: r3, throwOnFailedPublish: true }).catch((m2) => d3(m2)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a4 }), w4();
      }), new Promise(async (w4) => {
        var m2;
        if (!((m2 = n5.sessionConfig) != null && m2.disableDeepLink)) {
          const y6 = await ws(this.client.core.storage, xe2);
          ys({ id: a4, topic: i4, wcDeepLink: y6 });
        }
        w4();
      }), h5()]).then((w4) => w4[2]);
    }, this.respond = async (e2) => {
      this.isInitialized(), await this.isValidRespond(e2);
      const { topic: t, response: s3 } = e2, { id: i4 } = s3, r3 = this.client.session.get(t);
      r3.transportType === F.relay && await this.confirmOnlineStateOrThrow();
      const n5 = this.getAppLinkIfEnabled(r3.peer.metadata, r3.transportType);
      isJsonRpcResult(s3) ? await this.sendResult({ id: i4, topic: t, result: s3.result, throwOnFailedPublish: true, appLink: n5 }) : isJsonRpcError(s3) && await this.sendError({ id: i4, topic: t, error: s3.error, appLink: n5 }), this.cleanupAfterResponse(e2);
    }, this.ping = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e2);
      } catch (s3) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s3;
      }
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) {
        const s3 = payloadId(), i4 = getBigIntRpcId().toString(), { done: r3, resolve: n5, reject: a4 } = ls();
        this.events.once(bs("session_ping", s3), ({ error: c5 }) => {
          c5 ? a4(c5) : n5();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s3, relayRpcId: i4 }), r3()]);
      } else
        this.client.core.pairing.pairings.keys.includes(t) && await this.client.core.pairing.ping({ topic: t });
    }, this.emit = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e2);
      const { topic: t, event: s3, chainId: i4 } = e2, r3 = getBigIntRpcId().toString();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s3, chainId: i4 }, throwOnFailedPublish: true, relayRpcId: r3 });
    }, this.disconnect = async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e2);
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t))
        await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: er("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t))
        await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s3 } = xe("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s3);
      }
    }, this.find = (e2) => (this.isInitialized(), this.client.session.getAll().filter((t) => oh(t, e2))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (e2, t) => {
      var s3;
      this.isInitialized(), this.isValidAuthenticate(e2);
      const i4 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s3 = this.client.metadata.redirect) == null ? void 0 : s3.linkMode), r3 = i4 ? F.link_mode : F.relay;
      r3 === F.relay && await this.confirmOnlineStateOrThrow();
      const { chains: n5, statement: a4 = "", uri: c5, domain: h5, nonce: p3, type: d3, exp: l4, nbf: w4, methods: m2 = [], expiry: y6 } = e2, _3 = [...e2.resources || []], { topic: R2, uri: V2 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r3 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: R2, uri: V2 } });
      const E3 = await this.client.core.crypto.generateKeyPair(), S4 = Nu(E3);
      if (await Promise.all([this.client.auth.authKeys.set(ae3, { responseTopic: S4, publicKey: E3 }), this.client.auth.pairingTopics.set(S4, { topic: S4, pairingTopic: R2 })]), await this.client.core.relayer.subscribe(S4, { transportType: r3 }), this.client.logger.info(`sending request to new pairing topic: ${R2}`), m2.length > 0) {
        const { namespace: O4 } = mn(n5[0]);
        let T3 = Au(O4, "request", m2);
        Vr(_3) && (T3 = bu(T3, _3.pop())), _3.push(T3);
      }
      const M2 = y6 && y6 > v3.wc_sessionAuthenticate.req.ttl ? y6 : v3.wc_sessionAuthenticate.req.ttl, W = { authPayload: { type: d3 ?? "caip122", chains: n5, statement: a4, aud: c5, domain: h5, version: "1", nonce: p3, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: l4, nbf: w4, resources: _3 }, requester: { publicKey: E3, metadata: this.client.metadata }, expiryTimestamp: ms(M2) }, N10 = { eip155: { chains: n5, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m2])], events: ["chainChanged", "accountsChanged"] } }, De = { requiredNamespaces: {}, optionalNamespaces: N10, relays: [{ protocol: "irn" }], pairingTopic: R2, proposer: { publicKey: E3, metadata: this.client.metadata }, expiryTimestamp: ms(v3.wc_sessionPropose.req.ttl) }, { done: wt2, resolve: Ve, reject: Ee2 } = ls(M2, "Request expired"), ce3 = async ({ error: O4, session: T3 }) => {
        if (this.events.off(bs("session_request", G), Re3), O4)
          Ee2(O4);
        else if (T3) {
          T3.self.publicKey = E3, await this.client.session.set(T3.topic, T3), await this.setExpiry(T3.topic, T3.expiry), R2 && await this.client.core.pairing.updateMetadata({ topic: R2, metadata: T3.peer.metadata });
          const le3 = this.client.session.get(T3.topic);
          await this.deleteProposal(Z2), Ve({ session: le3 });
        }
      }, Re3 = async (O4) => {
        var T3, le3, Me;
        if (await this.deletePendingAuthRequest(G, { message: "fulfilled", code: 0 }), O4.error) {
          const te3 = er("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return O4.error.code === te3.code ? void 0 : (this.events.off(bs("session_connect"), ce3), Ee2(O4.error.message));
        }
        await this.deleteProposal(Z2), this.events.off(bs("session_connect"), ce3);
        const { cacaos: ke, responder: j4 } = O4.result, Ie2 = [], $e2 = [];
        for (const te3 of ke) {
          await du({ cacao: te3, projectId: this.client.core.projectId }) || (this.client.logger.error(te3, "Signature verification failed"), Ee2(er("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: fe3 } = te3, ve3 = Vr(fe3.resources), Ke = [lu(fe3.iss)], mt2 = Yi(fe3.iss);
          if (ve3) {
            const qe = yu(ve3), _t2 = wu(ve3);
            Ie2.push(...qe), Ke.push(..._t2);
          }
          for (const qe of Ke)
            $e2.push(`${qe}:${mt2}`);
        }
        const ee3 = await this.client.core.crypto.generateSharedKey(E3, j4.publicKey);
        let pe2;
        Ie2.length > 0 && (pe2 = { topic: ee3, acknowledged: true, self: { publicKey: E3, metadata: this.client.metadata }, peer: j4, controller: j4.publicKey, expiry: ms(z5), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: R2, namespaces: fh([...new Set(Ie2)], [...new Set($e2)]), transportType: r3 }, await this.client.core.relayer.subscribe(ee3, { transportType: r3 }), await this.client.session.set(ee3, pe2), R2 && await this.client.core.pairing.updateMetadata({ topic: R2, metadata: j4.metadata }), pe2 = this.client.session.get(ee3)), (T3 = this.client.metadata.redirect) != null && T3.linkMode && (le3 = j4.metadata.redirect) != null && le3.linkMode && (Me = j4.metadata.redirect) != null && Me.universal && t && (this.client.core.addLinkModeSupportedApp(j4.metadata.redirect.universal), this.client.session.update(ee3, { transportType: F.link_mode })), Ve({ auths: ke, session: pe2 });
      }, G = payloadId(), Z2 = payloadId();
      this.events.once(bs("session_connect"), ce3), this.events.once(bs("session_request", G), Re3);
      let Se;
      try {
        if (i4) {
          const O4 = formatJsonRpcRequest("wc_sessionAuthenticate", W, G);
          this.client.core.history.set(R2, O4);
          const T3 = await this.client.core.crypto.encode("", O4, { type: Sr, encoding: xu });
          Se = Vu(t, R2, T3);
        } else
          await Promise.all([this.sendRequest({ topic: R2, method: "wc_sessionAuthenticate", params: W, expiry: e2.expiry, throwOnFailedPublish: true, clientRpcId: G }), this.sendRequest({ topic: R2, method: "wc_sessionPropose", params: De, expiry: v3.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: Z2 })]);
      } catch (O4) {
        throw this.events.off(bs("session_connect"), ce3), this.events.off(bs("session_request", G), Re3), O4;
      }
      return await this.setProposal(Z2, I3({ id: Z2 }, De)), await this.setAuthRequest(G, { request: D2(I3({}, W), { verifyContext: {} }), pairingTopic: R2, transportType: r3 }), { uri: Se ?? V2, response: wt2 };
    }, this.approveSessionAuthenticate = async (e2) => {
      const { id: t, auths: s3 } = e2, i4 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [Ps2.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (y6) {
        throw i4.setError(Rs2.no_internet_connection), y6;
      }
      const r3 = this.getPendingAuthRequest(t);
      if (!r3)
        throw i4.setError(Rs2.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const n5 = r3.transportType || F.relay;
      n5 === F.relay && await this.confirmOnlineStateOrThrow();
      const a4 = r3.requester.publicKey, c5 = await this.client.core.crypto.generateKeyPair(), h5 = Nu(a4), p3 = { type: pr, receiverPublicKey: a4, senderPublicKey: c5 }, d3 = [], l4 = [];
      for (const y6 of s3) {
        if (!await du({ cacao: y6, projectId: this.client.core.projectId })) {
          i4.setError(Rs2.invalid_cacao);
          const S4 = er("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: h5, error: S4, encodeOpts: p3 }), new Error(S4.message);
        }
        i4.addTrace(Ps2.cacaos_verified);
        const { p: _3 } = y6, R2 = Vr(_3.resources), V2 = [lu(_3.iss)], E3 = Yi(_3.iss);
        if (R2) {
          const S4 = yu(R2), M2 = wu(R2);
          d3.push(...S4), V2.push(...M2);
        }
        for (const S4 of V2)
          l4.push(`${S4}:${E3}`);
      }
      const w4 = await this.client.core.crypto.generateSharedKey(c5, a4);
      i4.addTrace(Ps2.create_authenticated_session_topic);
      let m2;
      if ((d3 == null ? void 0 : d3.length) > 0) {
        m2 = { topic: w4, acknowledged: true, self: { publicKey: c5, metadata: this.client.metadata }, peer: { publicKey: a4, metadata: r3.requester.metadata }, controller: a4, expiry: ms(z5), authentication: s3, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r3.pairingTopic, namespaces: fh([...new Set(d3)], [...new Set(l4)]), transportType: n5 }, i4.addTrace(Ps2.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w4, { transportType: n5 });
        } catch (y6) {
          throw i4.setError(Rs2.subscribe_authenticated_session_topic_failure), y6;
        }
        i4.addTrace(Ps2.subscribe_authenticated_session_topic_success), await this.client.session.set(w4, m2), i4.addTrace(Ps2.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r3.pairingTopic, metadata: r3.requester.metadata });
      }
      i4.addTrace(Ps2.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: h5, id: t, result: { cacaos: s3, responder: { publicKey: c5, metadata: this.client.metadata } }, encodeOpts: p3, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r3.requester.metadata, n5) });
      } catch (y6) {
        throw i4.setError(Rs2.authenticated_session_approve_publish_failure), y6;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r3.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i4.eventId }), { session: m2 };
    }, this.rejectSessionAuthenticate = async (e2) => {
      this.isInitialized();
      const { id: t, reason: s3 } = e2, i4 = this.getPendingAuthRequest(t);
      if (!i4)
        throw new Error(`Could not find pending auth request with id ${t}`);
      i4.transportType === F.relay && await this.confirmOnlineStateOrThrow();
      const r3 = i4.requester.publicKey, n5 = await this.client.core.crypto.generateKeyPair(), a4 = Nu(r3), c5 = { type: pr, receiverPublicKey: r3, senderPublicKey: n5 };
      await this.sendError({ id: t, topic: a4, error: s3, encodeOpts: c5, rpcOpts: v3.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i4.requester.metadata, i4.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, er("USER_DISCONNECTED"));
    }, this.formatAuthMessage = (e2) => {
      this.isInitialized();
      const { request: t, iss: s3 } = e2;
      return Jf(t, s3);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0)
          for (; this.relayMessageCache.length > 0; )
            try {
              const e2 = this.relayMessageCache.shift();
              e2 && await this.onRelayMessage(e2);
            } catch (e2) {
              this.client.logger.error(e2);
            }
      }, 50);
    }, this.cleanupDuplicatePairings = async (e2) => {
      if (e2.pairingTopic)
        try {
          const t = this.client.core.pairing.pairings.get(e2.pairingTopic), s3 = this.client.core.pairing.pairings.getAll().filter((i4) => {
            var r3, n5;
            return ((r3 = i4.peerMetadata) == null ? void 0 : r3.url) && ((n5 = i4.peerMetadata) == null ? void 0 : n5.url) === e2.peer.metadata.url && i4.topic && i4.topic !== t.topic;
          });
          if (s3.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${s3.length} duplicate pairing(s)`), await Promise.all(s3.map((i4) => this.client.core.pairing.disconnect({ topic: i4.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (t) {
          this.client.logger.error(t);
        }
    }, this.deleteSession = async (e2) => {
      var t;
      const { topic: s3, expirerHasDeleted: i4 = false, emitEvent: r3 = true, id: n5 = 0 } = e2, { self: a4 } = this.client.session.get(s3);
      await this.client.core.relayer.unsubscribe(s3), await this.client.session.delete(s3, er("USER_DISCONNECTED")), this.addToRecentlyDeleted(s3, "session"), this.client.core.crypto.keychain.has(a4.publicKey) && await this.client.core.crypto.deleteKeyPair(a4.publicKey), this.client.core.crypto.keychain.has(s3) && await this.client.core.crypto.deleteSymKey(s3), i4 || this.client.core.expirer.del(s3), this.client.core.storage.removeItem(xe2).catch((c5) => this.client.logger.warn(c5)), this.getPendingSessionRequests().forEach((c5) => {
        c5.topic === s3 && this.deletePendingSessionRequest(c5.id, er("USER_DISCONNECTED"));
      }), s3 === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = x4.idle), r3 && this.client.events.emit("session_delete", { id: n5, topic: s3 });
    }, this.deleteProposal = async (e2, t) => {
      if (t)
        try {
          const s3 = this.client.proposal.get(e2), i4 = this.client.core.eventClient.getEvent({ topic: s3.pairingTopic });
          i4 == null ? void 0 : i4.setError(Ss2.proposal_expired);
        } catch {
        }
      await Promise.all([this.client.proposal.delete(e2, er("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "proposal");
    }, this.deletePendingSessionRequest = async (e2, t, s3 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i4) => i4.id !== e2), s3 && (this.sessionRequestQueue.state = x4.idle, this.client.events.emit("session_request_expire", { id: e2 }));
    }, this.deletePendingAuthRequest = async (e2, t, s3 = false) => {
      await Promise.all([this.client.auth.requests.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]);
    }, this.setExpiry = async (e2, t) => {
      this.client.session.keys.includes(e2) && (this.client.core.expirer.set(e2, t), await this.client.session.update(e2, { expiry: t }));
    }, this.setProposal = async (e2, t) => {
      this.client.core.expirer.set(e2, ms(v3.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e2, t);
    }, this.setAuthRequest = async (e2, t) => {
      const { request: s3, pairingTopic: i4, transportType: r3 = F.relay } = t;
      this.client.core.expirer.set(e2, s3.expiryTimestamp), await this.client.auth.requests.set(e2, { authPayload: s3.authPayload, requester: s3.requester, expiryTimestamp: s3.expiryTimestamp, id: e2, pairingTopic: i4, verifyContext: s3.verifyContext, transportType: r3 });
    }, this.setPendingSessionRequest = async (e2) => {
      const { id: t, topic: s3, params: i4, verifyContext: r3 } = e2, n5 = i4.request.expiryTimestamp || ms(v3.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, n5), await this.client.pendingRequest.set(t, { id: t, topic: s3, params: i4, verifyContext: r3 });
    }, this.sendRequest = async (e2) => {
      const { topic: t, method: s3, params: i4, expiry: r3, relayRpcId: n5, clientRpcId: a4, throwOnFailedPublish: c5, appLink: h5 } = e2, p3 = formatJsonRpcRequest(s3, i4, a4);
      let d3;
      const l4 = !!h5;
      try {
        const y6 = l4 ? xu : $i;
        d3 = await this.client.core.crypto.encode(t, p3, { encoding: y6 });
      } catch (y6) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), y6;
      }
      let w4;
      if (at2.includes(s3)) {
        const y6 = _u(JSON.stringify(p3)), _3 = _u(d3);
        w4 = await this.client.core.verify.register({ id: _3, decryptedId: y6 });
      }
      const m2 = v3[s3].req;
      if (m2.attestation = w4, r3 && (m2.ttl = r3), n5 && (m2.id = n5), this.client.core.history.set(t, p3), l4) {
        const y6 = Vu(h5, t, d3);
        await global.Linking.openURL(y6, this.client.name);
      } else {
        const y6 = v3[s3].req;
        r3 && (y6.ttl = r3), n5 && (y6.id = n5), c5 ? (y6.internal = D2(I3({}, y6.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d3, y6)) : this.client.core.relayer.publish(t, d3, y6).catch((_3) => this.client.logger.error(_3));
      }
      return p3.id;
    }, this.sendResult = async (e2) => {
      const { id: t, topic: s3, result: i4, throwOnFailedPublish: r3, encodeOpts: n5, appLink: a4 } = e2, c5 = formatJsonRpcResult(t, i4);
      let h5;
      const p3 = a4 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const l4 = p3 ? xu : $i;
        h5 = await this.client.core.crypto.encode(s3, c5, D2(I3({}, n5 || {}), { encoding: l4 }));
      } catch (l4) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s3} failed`), l4;
      }
      let d3;
      try {
        d3 = await this.client.core.history.get(s3, t);
      } catch (l4) {
        throw this.client.logger.error(`sendResult() -> history.get(${s3}, ${t}) failed`), l4;
      }
      if (p3) {
        const l4 = Vu(a4, s3, h5);
        await global.Linking.openURL(l4, this.client.name);
      } else {
        const l4 = v3[d3.request.method].res;
        r3 ? (l4.internal = D2(I3({}, l4.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s3, h5, l4)) : this.client.core.relayer.publish(s3, h5, l4).catch((w4) => this.client.logger.error(w4));
      }
      await this.client.core.history.resolve(c5);
    }, this.sendError = async (e2) => {
      const { id: t, topic: s3, error: i4, encodeOpts: r3, rpcOpts: n5, appLink: a4 } = e2, c5 = formatJsonRpcError(t, i4);
      let h5;
      const p3 = a4 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const l4 = p3 ? xu : $i;
        h5 = await this.client.core.crypto.encode(s3, c5, D2(I3({}, r3 || {}), { encoding: l4 }));
      } catch (l4) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s3} failed`), l4;
      }
      let d3;
      try {
        d3 = await this.client.core.history.get(s3, t);
      } catch (l4) {
        throw this.client.logger.error(`sendError() -> history.get(${s3}, ${t}) failed`), l4;
      }
      if (p3) {
        const l4 = Vu(a4, s3, h5);
        await global.Linking.openURL(l4, this.client.name);
      } else {
        const l4 = n5 || v3[d3.request.method].res;
        this.client.core.relayer.publish(s3, h5, l4);
      }
      await this.client.core.history.resolve(c5);
    }, this.cleanup = async () => {
      const e2 = [], t = [];
      this.client.session.getAll().forEach((s3) => {
        let i4 = false;
        As(s3.expiry) && (i4 = true), this.client.core.crypto.keychain.has(s3.topic) || (i4 = true), i4 && e2.push(s3.topic);
      }), this.client.proposal.getAll().forEach((s3) => {
        As(s3.expiryTimestamp) && t.push(s3.id);
      }), await Promise.all([...e2.map((s3) => this.deleteSession({ topic: s3 })), ...t.map((s3) => this.deleteProposal(s3))]);
    }, this.onRelayEventRequest = async (e2) => {
      this.requestQueue.queue.push(e2), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === x4.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = x4.active;
        const e2 = this.requestQueue.queue.shift();
        if (e2)
          try {
            await this.processRequest(e2);
          } catch (t) {
            this.client.logger.warn(t);
          }
      }
      this.requestQueue.state = x4.idle;
    }, this.processRequest = async (e2) => {
      const { topic: t, payload: s3, attestation: i4, transportType: r3, encryptedId: n5 } = e2, a4 = s3.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a4 }))
        switch (a4) {
          case "wc_sessionPropose":
            return await this.onSessionProposeRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5 });
          case "wc_sessionSettle":
            return await this.onSessionSettleRequest(t, s3);
          case "wc_sessionUpdate":
            return await this.onSessionUpdateRequest(t, s3);
          case "wc_sessionExtend":
            return await this.onSessionExtendRequest(t, s3);
          case "wc_sessionPing":
            return await this.onSessionPingRequest(t, s3);
          case "wc_sessionDelete":
            return await this.onSessionDeleteRequest(t, s3);
          case "wc_sessionRequest":
            return await this.onSessionRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5, transportType: r3 });
          case "wc_sessionEvent":
            return await this.onSessionEventRequest(t, s3);
          case "wc_sessionAuthenticate":
            return await this.onSessionAuthenticateRequest({ topic: t, payload: s3, attestation: i4, encryptedId: n5, transportType: r3 });
          default:
            return this.client.logger.info(`Unsupported request method ${a4}`);
        }
    }, this.onRelayEventResponse = async (e2) => {
      const { topic: t, payload: s3, transportType: i4 } = e2, r3 = (await this.client.core.history.get(t, s3.id)).request.method;
      switch (r3) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s3, i4);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s3);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s3);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s3);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s3);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s3);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s3);
        default:
          return this.client.logger.info(`Unsupported response method ${r3}`);
      }
    }, this.onRelayEventUnknownPayload = (e2) => {
      const { topic: t } = e2, { message: s3 } = xe("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s3);
    }, this.shouldIgnorePairingRequest = (e2) => {
      const { topic: t, requestMethod: s3 } = e2, i4 = this.expectedPairingMethodMap.get(t);
      return !i4 || i4.includes(s3) ? false : !!(i4.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (e2) => {
      const { topic: t, payload: s3, attestation: i4, encryptedId: r3 } = e2, { params: n5, id: a4 } = s3;
      try {
        const c5 = this.client.core.eventClient.getEvent({ topic: t });
        this.isValidConnect(I3({}, s3.params));
        const h5 = n5.expiryTimestamp || ms(v3.wc_sessionPropose.req.ttl), p3 = I3({ id: a4, pairingTopic: t, expiryTimestamp: h5 }, n5);
        await this.setProposal(a4, p3);
        const d3 = await this.getVerifyContext({ attestationId: i4, hash: _u(JSON.stringify(s3)), encryptedId: r3, metadata: p3.proposer.metadata });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), c5 == null ? void 0 : c5.setError($.proposal_listener_not_found)), c5 == null ? void 0 : c5.addTrace(z4.emit_session_proposal), this.client.events.emit("session_proposal", { id: a4, params: p3, verifyContext: d3 });
      } catch (c5) {
        await this.sendError({ id: a4, topic: t, error: c5, rpcOpts: v3.wc_sessionPropose.autoReject }), this.client.logger.error(c5);
      }
    }, this.onSessionProposeResponse = async (e2, t, s3) => {
      const { id: i4 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r3 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r3 });
        const n5 = this.client.proposal.get(i4);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n5 });
        const a4 = n5.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a4 });
        const c5 = r3.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: c5 });
        const h5 = await this.client.core.crypto.generateSharedKey(a4, c5);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: h5 });
        const p3 = await this.client.core.relayer.subscribe(h5, { transportType: s3 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: p3 }), await this.client.core.pairing.activate({ topic: e2 });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i4, er("USER_DISCONNECTED"));
        const r3 = bs("session_connect");
        if (this.events.listenerCount(r3) === 0)
          throw new Error(`emitting ${r3} without any listeners, 954`);
        this.events.emit(bs("session_connect"), { error: t.error });
      }
    }, this.onSessionSettleRequest = async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        this.isValidSessionSettleRequest(i4);
        const { relay: r3, controller: n5, expiry: a4, namespaces: c5, sessionProperties: h5, sessionConfig: p3 } = t.params, d3 = D2(I3(I3({ topic: e2, relay: r3, expiry: a4, namespaces: c5, acknowledged: true, pairingTopic: "", requiredNamespaces: {}, optionalNamespaces: {}, controller: n5.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: n5.publicKey, metadata: n5.metadata } }, h5 && { sessionProperties: h5 }), p3 && { sessionConfig: p3 }), { transportType: F.relay }), l4 = bs("session_connect");
        if (this.events.listenerCount(l4) === 0)
          throw new Error(`emitting ${l4} without any listeners 997`);
        this.events.emit(bs("session_connect"), { session: d3 }), await this.sendResult({ id: t.id, topic: e2, result: true, throwOnFailedPublish: true });
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }, this.onSessionSettleResponse = async (e2, t) => {
      const { id: s3 } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e2, { acknowledged: true }), this.events.emit(bs("session_approve", s3), {})) : isJsonRpcError(t) && (await this.client.session.delete(e2, er("USER_DISCONNECTED")), this.events.emit(bs("session_approve", s3), { error: t.error }));
    }, this.onSessionUpdateRequest = async (e2, t) => {
      const { params: s3, id: i4 } = t;
      try {
        const r3 = `${e2}_session_update`, n5 = Nh.get(r3);
        if (n5 && this.isRequestOutOfSync(n5, i4)) {
          this.client.logger.info(`Discarding out of sync request - ${i4}`), this.sendError({ id: i4, topic: e2, error: er("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(I3({ topic: e2 }, s3));
        try {
          Nh.set(r3, i4), await this.client.session.update(e2, { namespaces: s3.namespaces }), await this.sendResult({ id: i4, topic: e2, result: true, throwOnFailedPublish: true });
        } catch (a4) {
          throw Nh.delete(r3), a4;
        }
        this.client.events.emit("session_update", { id: i4, topic: e2, params: s3 });
      } catch (r3) {
        await this.sendError({ id: i4, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }, this.isRequestOutOfSync = (e2, t) => parseInt(t.toString().slice(0, -3)) <= parseInt(e2.toString().slice(0, -3)), this.onSessionUpdateResponse = (e2, t) => {
      const { id: s3 } = t, i4 = bs("session_update", s3);
      if (this.events.listenerCount(i4) === 0)
        throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(bs("session_update", s3), {}) : isJsonRpcError(t) && this.events.emit(bs("session_update", s3), { error: t.error });
    }, this.onSessionExtendRequest = async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidExtend({ topic: e2 }), await this.setExpiry(e2, ms(z5)), await this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }, this.onSessionExtendResponse = (e2, t) => {
      const { id: s3 } = t, i4 = bs("session_extend", s3);
      if (this.events.listenerCount(i4) === 0)
        throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(bs("session_extend", s3), {}) : isJsonRpcError(t) && this.events.emit(bs("session_extend", s3), { error: t.error });
    }, this.onSessionPingRequest = async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidPing({ topic: e2 }), await this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }, this.onSessionPingResponse = (e2, t) => {
      const { id: s3 } = t, i4 = bs("session_ping", s3);
      if (this.events.listenerCount(i4) === 0)
        throw new Error(`emitting ${i4} without any listeners`);
      setTimeout(() => {
        isJsonRpcResult(t) ? this.events.emit(bs("session_ping", s3), {}) : isJsonRpcError(t) && this.events.emit(bs("session_ping", s3), { error: t.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidDisconnect({ topic: e2, reason: t.params }), Promise.all([new Promise((i4) => {
          this.client.core.relayer.once(w3.publish, async () => {
            i4(await this.deleteSession({ topic: e2, id: s3 }));
          });
        }), this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e2, error: er("USER_DISCONNECTED") })]).catch((i4) => this.client.logger.error(i4));
      } catch (i4) {
        this.client.logger.error(i4);
      }
    }, this.onSessionRequest = async (e2) => {
      var t, s3, i4;
      const { topic: r3, payload: n5, attestation: a4, encryptedId: c5, transportType: h5 } = e2, { id: p3, params: d3 } = n5;
      try {
        await this.isValidRequest(I3({ topic: r3 }, d3));
        const l4 = this.client.session.get(r3), w4 = await this.getVerifyContext({ attestationId: a4, hash: _u(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", d3, p3))), encryptedId: c5, metadata: l4.peer.metadata, transportType: h5 }), m2 = { id: p3, topic: r3, params: d3, verifyContext: w4 };
        await this.setPendingSessionRequest(m2), h5 === F.link_mode && (t = l4.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s3 = l4.peer.metadata.redirect) == null ? void 0 : s3.universal), (i4 = this.client.signConfig) != null && i4.disableRequestQueue ? this.emitSessionRequest(m2) : (this.addSessionRequestToSessionRequestQueue(m2), this.processSessionRequestQueue());
      } catch (l4) {
        await this.sendError({ id: p3, topic: r3, error: l4 }), this.client.logger.error(l4);
      }
    }, this.onSessionRequestResponse = (e2, t) => {
      const { id: s3 } = t, i4 = bs("session_request", s3);
      if (this.events.listenerCount(i4) === 0)
        throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(bs("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit(bs("session_request", s3), { error: t.error });
    }, this.onSessionEventRequest = async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        const r3 = `${e2}_session_event_${i4.event.name}`, n5 = Nh.get(r3);
        if (n5 && this.isRequestOutOfSync(n5, s3)) {
          this.client.logger.info(`Discarding out of sync request - ${s3}`);
          return;
        }
        this.isValidEmit(I3({ topic: e2 }, i4)), this.client.events.emit("session_event", { id: s3, topic: e2, params: i4 }), Nh.set(r3, s3);
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }, this.onSessionAuthenticateResponse = (e2, t) => {
      const { id: s3 } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e2, payload: t }), isJsonRpcResult(t) ? this.events.emit(bs("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit(bs("session_request", s3), { error: t.error });
    }, this.onSessionAuthenticateRequest = async (e2) => {
      var t;
      const { topic: s3, payload: i4, attestation: r3, encryptedId: n5, transportType: a4 } = e2;
      try {
        const { requester: c5, authPayload: h5, expiryTimestamp: p3 } = i4.params, d3 = await this.getVerifyContext({ attestationId: r3, hash: _u(JSON.stringify(i4)), encryptedId: n5, metadata: c5.metadata, transportType: a4 }), l4 = { requester: c5, pairingTopic: s3, id: i4.id, authPayload: h5, verifyContext: d3, expiryTimestamp: p3 };
        await this.setAuthRequest(i4.id, { request: l4, pairingTopic: s3, transportType: a4 }), a4 === F.link_mode && (t = c5.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(c5.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s3, params: i4.params, id: i4.id, verifyContext: d3 });
      } catch (c5) {
        this.client.logger.error(c5);
        const h5 = i4.params.requester.publicKey, p3 = await this.client.core.crypto.generateKeyPair(), d3 = this.getAppLinkIfEnabled(i4.params.requester.metadata, a4), l4 = { type: pr, receiverPublicKey: h5, senderPublicKey: p3 };
        await this.sendError({ id: i4.id, topic: s3, error: c5, encodeOpts: l4, rpcOpts: v3.wc_sessionAuthenticate.autoReject, appLink: d3 });
      }
    }, this.addSessionRequestToSessionRequestQueue = (e2) => {
      this.sessionRequestQueue.queue.push(e2);
    }, this.cleanupAfterResponse = (e2) => {
      this.deletePendingSessionRequest(e2.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = x4.idle, this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: e2, error: t }) => {
      const s3 = this.client.core.history.pending;
      s3.length > 0 && s3.filter((i4) => i4.topic === e2 && i4.request.method === "wc_sessionRequest").forEach((i4) => {
        const r3 = i4.request.id, n5 = bs("session_request", r3);
        if (this.events.listenerCount(n5) === 0)
          throw new Error(`emitting ${n5} without any listeners`);
        this.events.emit(bs("session_request", i4.request.id), { error: t });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === x4.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e2 = this.sessionRequestQueue.queue[0];
      if (!e2) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = x4.active, this.emitSessionRequest(e2);
      } catch (t) {
        this.client.logger.error(t);
      }
    }, this.emitSessionRequest = (e2) => {
      this.client.events.emit("session_request", e2);
    }, this.onPairingCreated = (e2) => {
      if (e2.methods && this.expectedPairingMethodMap.set(e2.topic, e2.methods), e2.active)
        return;
      const t = this.client.proposal.getAll().find((s3) => s3.pairingTopic === e2.topic);
      t && this.onSessionProposeRequest({ topic: e2.topic, payload: formatJsonRpcRequest("wc_sessionPropose", { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties }, t.id) });
    }, this.isValidConnect = async (e2) => {
      if (!ph(e2)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e2)}`);
        throw new Error(a4);
      }
      const { pairingTopic: t, requiredNamespaces: s3, optionalNamespaces: i4, sessionProperties: r3, relays: n5 } = e2;
      if (Pe(t) || await this.isValidPairingTopic(t), !lh(n5, true)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `connect() relays: ${n5}`);
        throw new Error(a4);
      }
      !Pe(s3) && Xr(s3) !== 0 && this.validateNamespaces(s3, "requiredNamespaces"), !Pe(i4) && Xr(i4) !== 0 && this.validateNamespaces(i4, "optionalNamespaces"), Pe(r3) || this.validateSessionProps(r3, "sessionProperties");
    }, this.validateNamespaces = (e2, t) => {
      const s3 = ch(e2, "connect()", t);
      if (s3)
        throw new Error(s3.message);
    }, this.isValidApprove = async (e2) => {
      if (!ph(e2))
        throw new Error(xe("MISSING_OR_INVALID", `approve() params: ${e2}`).message);
      const { id: t, namespaces: s3, relayProtocol: i4, sessionProperties: r3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const n5 = this.client.proposal.get(t), a4 = _o(s3, "approve()");
      if (a4)
        throw new Error(a4.message);
      const c5 = Co(n5.requiredNamespaces, s3, "approve()");
      if (c5)
        throw new Error(c5.message);
      if (!Yt(i4, true)) {
        const { message: h5 } = xe("MISSING_OR_INVALID", `approve() relayProtocol: ${i4}`);
        throw new Error(h5);
      }
      Pe(r3) || this.validateSessionProps(r3, "sessionProperties");
    }, this.isValidReject = async (e2) => {
      if (!ph(e2)) {
        const { message: i4 } = xe("MISSING_OR_INVALID", `reject() params: ${e2}`);
        throw new Error(i4);
      }
      const { id: t, reason: s3 } = e2;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !vh(s3)) {
        const { message: i4 } = xe("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s3)}`);
        throw new Error(i4);
      }
    }, this.isValidSessionSettleRequest = (e2) => {
      if (!ph(e2)) {
        const { message: c5 } = xe("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e2}`);
        throw new Error(c5);
      }
      const { relay: t, controller: s3, namespaces: i4, expiry: r3 } = e2;
      if (!Bo(t)) {
        const { message: c5 } = xe("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(c5);
      }
      const n5 = hh(s3, "onSessionSettleRequest()");
      if (n5)
        throw new Error(n5.message);
      const a4 = _o(i4, "onSessionSettleRequest()");
      if (a4)
        throw new Error(a4.message);
      if (As(r3)) {
        const { message: c5 } = xe("EXPIRED", "onSessionSettleRequest()");
        throw new Error(c5);
      }
    }, this.isValidUpdate = async (e2) => {
      if (!ph(e2)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `update() params: ${e2}`);
        throw new Error(a4);
      }
      const { topic: t, namespaces: s3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i4 = this.client.session.get(t), r3 = _o(s3, "update()");
      if (r3)
        throw new Error(r3.message);
      const n5 = Co(i4.requiredNamespaces, s3, "update()");
      if (n5)
        throw new Error(n5.message);
    }, this.isValidExtend = async (e2) => {
      if (!ph(e2)) {
        const { message: s3 } = xe("MISSING_OR_INVALID", `extend() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }, this.isValidRequest = async (e2) => {
      if (!ph(e2)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `request() params: ${e2}`);
        throw new Error(a4);
      }
      const { topic: t, request: s3, chainId: i4, expiry: r3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: n5 } = this.client.session.get(t);
      if (!bh(n5, i4)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `request() chainId: ${i4}`);
        throw new Error(a4);
      }
      if (!gh(s3)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `request() ${JSON.stringify(s3)}`);
        throw new Error(a4);
      }
      if (!yh(n5, i4, s3.method)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `request() method: ${s3.method}`);
        throw new Error(a4);
      }
      if (r3 && !Eh(r3, me2)) {
        const { message: a4 } = xe("MISSING_OR_INVALID", `request() expiry: ${r3}. Expiry must be a number (in seconds) between ${me2.min} and ${me2.max}`);
        throw new Error(a4);
      }
    }, this.isValidRespond = async (e2) => {
      var t;
      if (!ph(e2)) {
        const { message: r3 } = xe("MISSING_OR_INVALID", `respond() params: ${e2}`);
        throw new Error(r3);
      }
      const { topic: s3, response: i4 } = e2;
      try {
        await this.isValidSessionTopic(s3);
      } catch (r3) {
        throw (t = e2 == null ? void 0 : e2.response) != null && t.id && this.cleanupAfterResponse(e2), r3;
      }
      if (!mh(i4)) {
        const { message: r3 } = xe("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i4)}`);
        throw new Error(r3);
      }
    }, this.isValidPing = async (e2) => {
      if (!ph(e2)) {
        const { message: s3 } = xe("MISSING_OR_INVALID", `ping() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }, this.isValidEmit = async (e2) => {
      if (!ph(e2)) {
        const { message: n5 } = xe("MISSING_OR_INVALID", `emit() params: ${e2}`);
        throw new Error(n5);
      }
      const { topic: t, event: s3, chainId: i4 } = e2;
      await this.isValidSessionTopic(t);
      const { namespaces: r3 } = this.client.session.get(t);
      if (!bh(r3, i4)) {
        const { message: n5 } = xe("MISSING_OR_INVALID", `emit() chainId: ${i4}`);
        throw new Error(n5);
      }
      if (!Ah(s3)) {
        const { message: n5 } = xe("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(n5);
      }
      if (!wh(r3, i4, s3.name)) {
        const { message: n5 } = xe("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(n5);
      }
    }, this.isValidDisconnect = async (e2) => {
      if (!ph(e2)) {
        const { message: s3 } = xe("MISSING_OR_INVALID", `disconnect() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }, this.isValidAuthenticate = (e2) => {
      const { chains: t, uri: s3, domain: i4, nonce: r3 } = e2;
      if (!Array.isArray(t) || t.length === 0)
        throw new Error("chains is required and must be a non-empty array");
      if (!Yt(s3, false))
        throw new Error("uri is required parameter");
      if (!Yt(i4, false))
        throw new Error("domain is required parameter");
      if (!Yt(r3, false))
        throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a4) => mn(a4).namespace))].length > 1)
        throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: n5 } = mn(t[0]);
      if (n5 !== "eip155")
        throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (e2) => {
      const { attestationId: t, hash: s3, encryptedId: i4, metadata: r3, transportType: n5 } = e2, a4 = { verified: { verifyUrl: r3.verifyUrl || Z, validation: "UNKNOWN", origin: r3.url || "" } };
      try {
        if (n5 === F.link_mode) {
          const h5 = this.getAppLinkIfEnabled(r3, n5);
          return a4.verified.validation = h5 && new URL(h5).origin === new URL(r3.url).origin ? "VALID" : "INVALID", a4;
        }
        const c5 = await this.client.core.verify.resolve({ attestationId: t, hash: s3, encryptedId: i4, verifyUrl: r3.verifyUrl });
        c5 && (a4.verified.origin = c5.origin, a4.verified.isScam = c5.isScam, a4.verified.validation = c5.origin === new URL(r3.url).origin ? "VALID" : "INVALID");
      } catch (c5) {
        this.client.logger.warn(c5);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a4)}`), a4;
    }, this.validateSessionProps = (e2, t) => {
      Object.values(e2).forEach((s3) => {
        if (!Yt(s3, false)) {
          const { message: i4 } = xe("MISSING_OR_INVALID", `${t} must be in Record<string, string> format. Received: ${JSON.stringify(s3)}`);
          throw new Error(i4);
        }
      });
    }, this.getPendingAuthRequest = (e2) => {
      const t = this.client.auth.requests.get(e2);
      return typeof t == "object" ? t : void 0;
    }, this.addToRecentlyDeleted = (e2, t) => {
      if (this.recentlyDeletedMap.set(e2, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s3 = 0;
        const i4 = this.recentlyDeletedLimit / 2;
        for (const r3 of this.recentlyDeletedMap.keys()) {
          if (s3++ >= i4)
            break;
          this.recentlyDeletedMap.delete(r3);
        }
      }
    }, this.checkRecentlyDeleted = (e2) => {
      const t = this.recentlyDeletedMap.get(e2);
      if (t) {
        const { message: s3 } = xe("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e2}`);
        throw new Error(s3);
      }
    }, this.isLinkModeEnabled = (e2, t) => {
      var s3, i4, r3, n5, a4, c5, h5, p3, d3;
      return !e2 || t !== F.link_mode ? false : ((i4 = (s3 = this.client.metadata) == null ? void 0 : s3.redirect) == null ? void 0 : i4.linkMode) === true && ((n5 = (r3 = this.client.metadata) == null ? void 0 : r3.redirect) == null ? void 0 : n5.universal) !== void 0 && ((c5 = (a4 = this.client.metadata) == null ? void 0 : a4.redirect) == null ? void 0 : c5.universal) !== "" && ((h5 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : h5.universal) !== void 0 && ((p3 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : p3.universal) !== "" && ((d3 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : d3.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e2.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }, this.getAppLinkIfEnabled = (e2, t) => {
      var s3;
      return this.isLinkModeEnabled(e2, t) ? (s3 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : s3.universal : void 0;
    }, this.handleLinkModeMessage = ({ url: e2 }) => {
      if (!e2 || !e2.includes("wc_ev") || !e2.includes("topic"))
        return;
      const t = xs(e2, "topic") || "", s3 = decodeURIComponent(xs(e2, "wc_ev") || ""), i4 = this.client.session.keys.includes(t);
      i4 && this.client.session.update(t, { transportType: F.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s3, sessionExists: i4 });
    }, this.registerLinkModeListeners = async () => {
      var e2;
      if (Es() || rr() && (e2 = this.client.metadata.redirect) != null && e2.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s3 = await t.getInitialURL();
          s3 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s3 });
          }, 50);
        }
      }
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: o4 } = xe("NOT_INITIALIZED", this.name);
      throw new Error(o4);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(w3.message, (o4) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(o4) : this.onRelayMessage(o4);
    });
  }
  async onRelayMessage(o4) {
    const { topic: e2, message: t, attestation: s3, transportType: i4 } = o4, { publicKey: r3 } = this.client.auth.authKeys.keys.includes(ae3) ? this.client.auth.authKeys.get(ae3) : { responseTopic: void 0, publicKey: void 0 }, n5 = await this.client.core.crypto.decode(e2, t, { receiverPublicKey: r3, encoding: i4 === F.link_mode ? xu : $i });
    try {
      isJsonRpcRequest(n5) ? (this.client.core.history.set(e2, n5), this.onRelayEventRequest({ topic: e2, payload: n5, attestation: s3, transportType: i4, encryptedId: _u(t) })) : isJsonRpcResponse(n5) ? (await this.client.core.history.resolve(n5), await this.onRelayEventResponse({ topic: e2, payload: n5, transportType: i4 }), this.client.core.history.delete(e2, n5.id)) : this.onRelayEventUnknownPayload({ topic: e2, payload: n5, transportType: i4 });
    } catch (a4) {
      this.client.logger.error(a4);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(R.expired, async (o4) => {
      const { topic: e2, id: t } = gs(o4.target);
      if (t && this.client.pendingRequest.keys.includes(t))
        return await this.deletePendingSessionRequest(t, xe("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t))
        return await this.deletePendingAuthRequest(t, xe("EXPIRED"), true);
      e2 ? this.client.session.keys.includes(e2) && (await this.deleteSession({ topic: e2, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e2 })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(X.create, (o4) => this.onPairingCreated(o4)), this.client.core.pairing.events.on(X.delete, (o4) => {
      this.addToRecentlyDeleted(o4.topic, "pairing");
    });
  }
  isValidPairingTopic(o4) {
    if (!Yt(o4, false)) {
      const { message: e2 } = xe("MISSING_OR_INVALID", `pairing topic should be a string: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.core.pairing.pairings.keys.includes(o4)) {
      const { message: e2 } = xe("NO_MATCHING_KEY", `pairing topic doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (As(this.client.core.pairing.pairings.get(o4).expiry)) {
      const { message: e2 } = xe("EXPIRED", `pairing topic: ${o4}`);
      throw new Error(e2);
    }
  }
  async isValidSessionTopic(o4) {
    if (!Yt(o4, false)) {
      const { message: e2 } = xe("MISSING_OR_INVALID", `session topic should be a string: ${o4}`);
      throw new Error(e2);
    }
    if (this.checkRecentlyDeleted(o4), !this.client.session.keys.includes(o4)) {
      const { message: e2 } = xe("NO_MATCHING_KEY", `session topic doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (As(this.client.session.get(o4).expiry)) {
      await this.deleteSession({ topic: o4 });
      const { message: e2 } = xe("EXPIRED", `session topic: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.core.crypto.keychain.has(o4)) {
      const { message: e2 } = xe("MISSING_OR_INVALID", `session topic does not exist in keychain: ${o4}`);
      throw await this.deleteSession({ topic: o4 }), new Error(e2);
    }
  }
  async isValidSessionOrPairingTopic(o4) {
    if (this.checkRecentlyDeleted(o4), this.client.session.keys.includes(o4))
      await this.isValidSessionTopic(o4);
    else if (this.client.core.pairing.pairings.keys.includes(o4))
      this.isValidPairingTopic(o4);
    else if (Yt(o4, false)) {
      const { message: e2 } = xe("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${o4}`);
      throw new Error(e2);
    } else {
      const { message: e2 } = xe("MISSING_OR_INVALID", `session or pairing topic should be a string: ${o4}`);
      throw new Error(e2);
    }
  }
  async isValidProposalId(o4) {
    if (!dh(o4)) {
      const { message: e2 } = xe("MISSING_OR_INVALID", `proposal id should be a number: ${o4}`);
      throw new Error(e2);
    }
    if (!this.client.proposal.keys.includes(o4)) {
      const { message: e2 } = xe("NO_MATCHING_KEY", `proposal id doesn't exist: ${o4}`);
      throw new Error(e2);
    }
    if (As(this.client.proposal.get(o4).expiryTimestamp)) {
      await this.deleteProposal(o4);
      const { message: e2 } = xe("EXPIRED", `proposal id: ${o4}`);
      throw new Error(e2);
    }
  }
};
var Ss3 = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, st2, ye2), this.core = o4, this.logger = e2;
  }
};
var yt2 = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, rt2, ye2), this.core = o4, this.logger = e2;
  }
};
var Is3 = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, ot2, ye2, (t) => t.id), this.core = o4, this.logger = e2;
  }
};
var fs = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, pt2, oe3, () => ae3), this.core = o4, this.logger = e2;
  }
};
var vs2 = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, ht2, oe3), this.core = o4, this.logger = e2;
  }
};
var qs3 = class extends oi {
  constructor(o4, e2) {
    super(o4, e2, dt2, oe3, (t) => t.id), this.core = o4, this.logger = e2;
  }
};
var Ts2 = class {
  constructor(o4, e2) {
    this.core = o4, this.logger = e2, this.authKeys = new fs(this.core, this.logger), this.pairingTopics = new vs2(this.core, this.logger), this.requests = new qs3(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var _e3 = class __e extends S2 {
  constructor(o4) {
    super(o4), this.protocol = be3, this.version = Ce3, this.name = we3.name, this.events = new import_events8.EventEmitter(), this.on = (t, s3) => this.events.on(t, s3), this.once = (t, s3) => this.events.once(t, s3), this.off = (t, s3) => this.events.off(t, s3), this.removeListener = (t, s3) => this.events.removeListener(t, s3), this.removeAllListeners = (t) => this.events.removeAllListeners(t), this.connect = async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.pair = async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.approve = async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.reject = async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.update = async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.extend = async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.request = async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.respond = async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.ping = async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.emit = async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.disconnect = async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.find = (t) => {
      try {
        return this.engine.find(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.authenticate = async (t, s3) => {
      try {
        return await this.engine.authenticate(t, s3);
      } catch (i4) {
        throw this.logger.error(i4.message), i4;
      }
    }, this.formatAuthMessage = (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.approveSessionAuthenticate = async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.rejectSessionAuthenticate = async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }, this.name = (o4 == null ? void 0 : o4.name) || we3.name, this.metadata = (o4 == null ? void 0 : o4.metadata) || es(), this.signConfig = o4 == null ? void 0 : o4.signConfig;
    const e2 = typeof (o4 == null ? void 0 : o4.logger) < "u" && typeof (o4 == null ? void 0 : o4.logger) != "string" ? o4.logger : (0, import_pino2.default)(k({ level: (o4 == null ? void 0 : o4.logger) || we3.logger }));
    this.core = (o4 == null ? void 0 : o4.core) || new On2(o4), this.logger = E(e2, this.name), this.session = new yt2(this.core, this.logger), this.proposal = new Ss3(this.core, this.logger), this.pendingRequest = new Is3(this.core, this.logger), this.engine = new Rs3(this), this.auth = new Ts2(this.core, this.logger);
  }
  static async init(o4) {
    const e2 = new __e(o4);
    return await e2.initialize(), e2;
  }
  get context() {
    return y(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), this.engine.processRelayMessageCache();
    } catch (o4) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(o4.message), o4;
    }
  }
};
var Ps3 = _e3;

export {
  require_events,
  safeJsonParse,
  safeJsonStringify,
  mn,
  Jo,
  me,
  fn,
  Ao,
  er,
  Nr,
  Xr,
  import_pino2 as import_pino,
  k,
  parseConnectionError,
  formatJsonRpcRequest,
  formatJsonRpcResult,
  formatJsonRpcError,
  isHttpUrl,
  esm_exports,
  o2 as o,
  it2 as it,
  _e3 as _e,
  Ps3 as Ps
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/utils/dist/index.es.js:
  (**
  * [js-sha3]{@link https://github.com/emn178/js-sha3}
  *
  * @version 0.8.0
  * @author Chen, Yi-Cyuan [emn178@gmail.com]
  * @copyright Chen, Yi-Cyuan 2015-2018
  * @license MIT
  *)
*/
//# sourceMappingURL=chunk-HSQFAESP.js.map
