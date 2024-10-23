import {
  Ao,
  Jo,
  Nr,
  Xr,
  _e,
  er,
  esm_exports,
  fn,
  formatJsonRpcError,
  formatJsonRpcRequest,
  formatJsonRpcResult,
  import_pino,
  isHttpUrl,
  it,
  k,
  me,
  mn,
  o,
  parseConnectionError,
  require_events,
  safeJsonParse,
  safeJsonStringify
} from "./chunk-HSQFAESP.js";
import {
  __commonJS,
  __toESM
} from "./chunk-SEVZ5PBP.js";

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global2 = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F2() {
        this.fetch = false;
        this.DOMException = global2.DOMException;
      }
      F2.prototype = global2;
      return new F2();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var import_events3 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js
var import_events = __toESM(require_events());
var import_cross_fetch = __toESM(require_browser_ponyfill());
var P = Object.defineProperty;
var w = Object.defineProperties;
var E = Object.getOwnPropertyDescriptors;
var c = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty;
var O = Object.prototype.propertyIsEnumerable;
var l = (r, t, e) => t in r ? P(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e;
var p = (r, t) => {
  for (var e in t || (t = {}))
    L.call(t, e) && l(r, e, t[e]);
  if (c)
    for (var e of c(t))
      O.call(t, e) && l(r, e, t[e]);
  return r;
};
var v = (r, t) => w(r, E(t));
var j = { Accept: "application/json", "Content-Type": "application/json" };
var T = "POST";
var d = { headers: j, method: T };
var g = 10;
var f = class {
  constructor(t, e = false) {
    if (this.url = t, this.disableProviderPing = e, this.events = new import_events.EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t))
      throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    this.url = t, this.disableProviderPing = e;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t, e) {
    this.events.on(t, e);
  }
  once(t, e) {
    this.events.once(t, e);
  }
  off(t, e) {
    this.events.off(t, e);
  }
  removeListener(t, e) {
    this.events.removeListener(t, e);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    if (!this.isAvailable)
      throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t) {
    this.isAvailable || await this.register();
    try {
      const e = safeJsonStringify(t), s = await (await (0, import_cross_fetch.default)(this.url, v(p({}, d), { body: e }))).json();
      this.onPayload({ data: s });
    } catch (e) {
      this.onError(t.id, e);
    }
  }
  async register(t = this.url) {
    if (!isHttpUrl(t))
      throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    if (this.registering) {
      const e = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((s, i) => {
        this.events.once("register_error", (n) => {
          this.resetMaxListeners(), i(n);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u")
            return i(new Error("HTTP connection is missing or invalid"));
          s();
        });
      });
    }
    this.url = t, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await (0, import_cross_fetch.default)(t, v(p({}, d), { body: e }));
      }
      this.onOpen();
    } catch (e) {
      const s = this.parseError(e);
      throw this.events.emit("register_error", s), this.onClose(), s;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t) {
    if (typeof t.data > "u")
      return;
    const e = typeof t.data == "string" ? safeJsonParse(t.data) : t.data;
    this.events.emit("payload", e);
  }
  onError(t, e) {
    const s = this.parseError(e), i = s.message || s.toString(), n = formatJsonRpcError(t, i);
    this.events.emit("payload", n);
  }
  parseError(t, e = this.url) {
    return parseConnectionError(t, e, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g && this.events.setMaxListeners(g);
  }
};

// node_modules/@walletconnect/universal-provider/dist/index.es.js
var import_events2 = __toESM(require_events());
var ya = "error";
var Yg = "wss://relay.walletconnect.org";
var Zg = "wc";
var Xg = "universal_provider";
var Sa = `${Zg}@2:${Xg}:`;
var Oa = "https://rpc.walletconnect.org/v1/";
var ze = "generic";
var Qg = `${Oa}bundler`;
var Tt = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var _n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var qi = { exports: {} };
(function(P3, s) {
  (function() {
    var i, p3 = "4.17.21", w2 = 200, I = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", y2 = "Expected a function", J = "Invalid `variable` option passed into `_.template`", Ht = "__lodash_hash_undefined__", Ke = 500, Ie = "__lodash_placeholder__", Dt = 1, Bt = 2, xe = 4, Ee = 1, mn2 = 2, vt = 1, he = 2, Gi = 4, Nt = 8, ye = 16, $t = 32, Se = 64, Gt = 128, Je = 256, gr = 512, Ma = 30, Ba = "...", Ga = 800, za = 16, zi = 1, Ka = 2, Ja = 3, le = 1 / 0, ee = 9007199254740991, Ya = 17976931348623157e292, wn = 0 / 0, Ut = 4294967295, Za = Ut - 1, Xa = Ut >>> 1, Qa = [["ary", Gt], ["bind", vt], ["bindKey", he], ["curry", Nt], ["curryRight", ye], ["flip", gr], ["partial", $t], ["partialRight", Se], ["rearg", Je]], Oe = "[object Arguments]", Pn = "[object Array]", Va = "[object AsyncFunction]", Ye = "[object Boolean]", Ze = "[object Date]", ka = "[object DOMException]", Cn = "[object Error]", An = "[object Function]", Ki = "[object GeneratorFunction]", Et = "[object Map]", Xe = "[object Number]", ja = "[object Null]", zt = "[object Object]", Ji = "[object Promise]", to = "[object Proxy]", Qe = "[object RegExp]", yt = "[object Set]", Ve = "[object String]", In = "[object Symbol]", eo = "[object Undefined]", ke = "[object WeakMap]", no = "[object WeakSet]", je = "[object ArrayBuffer]", Re = "[object DataView]", vr = "[object Float32Array]", _r = "[object Float64Array]", mr = "[object Int8Array]", wr = "[object Int16Array]", Pr = "[object Int32Array]", Cr = "[object Uint8Array]", Ar = "[object Uint8ClampedArray]", Ir = "[object Uint16Array]", xr = "[object Uint32Array]", ro = /\b__p \+= '';/g, io = /\b(__p \+=) '' \+/g, so = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Yi = /&(?:amp|lt|gt|quot|#39);/g, Zi = /[&<>"']/g, uo = RegExp(Yi.source), ao = RegExp(Zi.source), oo = /<%-([\s\S]+?)%>/g, co = /<%([\s\S]+?)%>/g, Xi = /<%=([\s\S]+?)%>/g, fo = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ho = /^\w*$/, lo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Er = /[\\^$.*+?()[\]{}|]/g, po = RegExp(Er.source), yr = /^\s+/, go = /\s/, vo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, _o = /\{\n\/\* \[wrapped with (.+)\] \*/, mo = /,? & /, wo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Po = /[()=,{}\[\]\/\s]/, Co = /\\(\\)?/g, Ao2 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Qi = /\w*$/, Io = /^[-+]0x[0-9a-f]+$/i, xo = /^0b[01]+$/i, Eo = /^\[object .+?Constructor\]$/, yo = /^0o[0-7]+$/i, So = /^(?:0|[1-9]\d*)$/, Oo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, xn = /($^)/, Ro = /['\n\r\u2028\u2029\\]/g, En = "\\ud800-\\udfff", bo = "\\u0300-\\u036f", To = "\\ufe20-\\ufe2f", Lo = "\\u20d0-\\u20ff", Vi = bo + To + Lo, ki = "\\u2700-\\u27bf", ji = "a-z\\xdf-\\xf6\\xf8-\\xff", Ho = "\\xac\\xb1\\xd7\\xf7", Do = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", No = "\\u2000-\\u206f", $o = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ts = "A-Z\\xc0-\\xd6\\xd8-\\xde", es = "\\ufe0e\\ufe0f", ns = Ho + Do + No + $o, Sr = "['’]", Uo = "[" + En + "]", rs = "[" + ns + "]", yn = "[" + Vi + "]", is = "\\d+", qo = "[" + ki + "]", ss = "[" + ji + "]", us = "[^" + En + ns + is + ki + ji + ts + "]", Or = "\\ud83c[\\udffb-\\udfff]", Fo = "(?:" + yn + "|" + Or + ")", as = "[^" + En + "]", Rr = "(?:\\ud83c[\\udde6-\\uddff]){2}", br = "[\\ud800-\\udbff][\\udc00-\\udfff]", be = "[" + ts + "]", os = "\\u200d", cs = "(?:" + ss + "|" + us + ")", Wo = "(?:" + be + "|" + us + ")", fs = "(?:" + Sr + "(?:d|ll|m|re|s|t|ve))?", hs = "(?:" + Sr + "(?:D|LL|M|RE|S|T|VE))?", ls = Fo + "?", ps = "[" + es + "]?", Mo = "(?:" + os + "(?:" + [as, Rr, br].join("|") + ")" + ps + ls + ")*", Bo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Go = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ds = ps + ls + Mo, zo = "(?:" + [qo, Rr, br].join("|") + ")" + ds, Ko = "(?:" + [as + yn + "?", yn, Rr, br, Uo].join("|") + ")", Jo2 = RegExp(Sr, "g"), Yo = RegExp(yn, "g"), Tr = RegExp(Or + "(?=" + Or + ")|" + Ko + ds, "g"), Zo = RegExp([be + "?" + ss + "+" + fs + "(?=" + [rs, be, "$"].join("|") + ")", Wo + "+" + hs + "(?=" + [rs, be + cs, "$"].join("|") + ")", be + "?" + cs + "+" + fs, be + "+" + hs, Go, Bo, is, zo].join("|"), "g"), Xo = RegExp("[" + os + En + Vi + es + "]"), Qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Vo = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ko = -1, G = {};
    G[vr] = G[_r] = G[mr] = G[wr] = G[Pr] = G[Cr] = G[Ar] = G[Ir] = G[xr] = true, G[Oe] = G[Pn] = G[je] = G[Ye] = G[Re] = G[Ze] = G[Cn] = G[An] = G[Et] = G[Xe] = G[zt] = G[Qe] = G[yt] = G[Ve] = G[ke] = false;
    var B = {};
    B[Oe] = B[Pn] = B[je] = B[Re] = B[Ye] = B[Ze] = B[vr] = B[_r] = B[mr] = B[wr] = B[Pr] = B[Et] = B[Xe] = B[zt] = B[Qe] = B[yt] = B[Ve] = B[In] = B[Cr] = B[Ar] = B[Ir] = B[xr] = true, B[Cn] = B[An] = B[ke] = false;
    var jo = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, tc = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ec = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, nc = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, rc = parseFloat, ic = parseInt, gs = typeof _n == "object" && _n && _n.Object === Object && _n, sc = typeof self == "object" && self && self.Object === Object && self, j3 = gs || sc || Function("return this")(), Lr = s && !s.nodeType && s, pe = Lr && true && P3 && !P3.nodeType && P3, vs = pe && pe.exports === Lr, Hr = vs && gs.process, _t = function() {
      try {
        var h = pe && pe.require && pe.require("util").types;
        return h || Hr && Hr.binding && Hr.binding("util");
      } catch {
      }
    }(), _s = _t && _t.isArrayBuffer, ms = _t && _t.isDate, ws = _t && _t.isMap, Ps = _t && _t.isRegExp, Cs = _t && _t.isSet, As = _t && _t.isTypedArray;
    function ft(h, g3, d2) {
      switch (d2.length) {
        case 0:
          return h.call(g3);
        case 1:
          return h.call(g3, d2[0]);
        case 2:
          return h.call(g3, d2[0], d2[1]);
        case 3:
          return h.call(g3, d2[0], d2[1], d2[2]);
      }
      return h.apply(g3, d2);
    }
    function uc(h, g3, d2, A) {
      for (var R2 = -1, U3 = h == null ? 0 : h.length; ++R2 < U3; ) {
        var Q2 = h[R2];
        g3(A, Q2, d2(Q2), h);
      }
      return A;
    }
    function mt(h, g3) {
      for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A && g3(h[d2], d2, h) !== false; )
        ;
      return h;
    }
    function ac(h, g3) {
      for (var d2 = h == null ? 0 : h.length; d2-- && g3(h[d2], d2, h) !== false; )
        ;
      return h;
    }
    function Is(h, g3) {
      for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A; )
        if (!g3(h[d2], d2, h))
          return false;
      return true;
    }
    function ne(h, g3) {
      for (var d2 = -1, A = h == null ? 0 : h.length, R2 = 0, U3 = []; ++d2 < A; ) {
        var Q2 = h[d2];
        g3(Q2, d2, h) && (U3[R2++] = Q2);
      }
      return U3;
    }
    function Sn(h, g3) {
      var d2 = h == null ? 0 : h.length;
      return !!d2 && Te(h, g3, 0) > -1;
    }
    function Dr(h, g3, d2) {
      for (var A = -1, R2 = h == null ? 0 : h.length; ++A < R2; )
        if (d2(g3, h[A]))
          return true;
      return false;
    }
    function z(h, g3) {
      for (var d2 = -1, A = h == null ? 0 : h.length, R2 = Array(A); ++d2 < A; )
        R2[d2] = g3(h[d2], d2, h);
      return R2;
    }
    function re(h, g3) {
      for (var d2 = -1, A = g3.length, R2 = h.length; ++d2 < A; )
        h[R2 + d2] = g3[d2];
      return h;
    }
    function Nr2(h, g3, d2, A) {
      var R2 = -1, U3 = h == null ? 0 : h.length;
      for (A && U3 && (d2 = h[++R2]); ++R2 < U3; )
        d2 = g3(d2, h[R2], R2, h);
      return d2;
    }
    function oc(h, g3, d2, A) {
      var R2 = h == null ? 0 : h.length;
      for (A && R2 && (d2 = h[--R2]); R2--; )
        d2 = g3(d2, h[R2], R2, h);
      return d2;
    }
    function $r(h, g3) {
      for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A; )
        if (g3(h[d2], d2, h))
          return true;
      return false;
    }
    var cc = Ur("length");
    function fc(h) {
      return h.split("");
    }
    function hc(h) {
      return h.match(wo) || [];
    }
    function xs(h, g3, d2) {
      var A;
      return d2(h, function(R2, U3, Q2) {
        if (g3(R2, U3, Q2))
          return A = U3, false;
      }), A;
    }
    function On(h, g3, d2, A) {
      for (var R2 = h.length, U3 = d2 + (A ? 1 : -1); A ? U3-- : ++U3 < R2; )
        if (g3(h[U3], U3, h))
          return U3;
      return -1;
    }
    function Te(h, g3, d2) {
      return g3 === g3 ? Ic(h, g3, d2) : On(h, Es, d2);
    }
    function lc(h, g3, d2, A) {
      for (var R2 = d2 - 1, U3 = h.length; ++R2 < U3; )
        if (A(h[R2], g3))
          return R2;
      return -1;
    }
    function Es(h) {
      return h !== h;
    }
    function ys(h, g3) {
      var d2 = h == null ? 0 : h.length;
      return d2 ? Fr(h, g3) / d2 : wn;
    }
    function Ur(h) {
      return function(g3) {
        return g3 == null ? i : g3[h];
      };
    }
    function qr(h) {
      return function(g3) {
        return h == null ? i : h[g3];
      };
    }
    function Ss(h, g3, d2, A, R2) {
      return R2(h, function(U3, Q2, M2) {
        d2 = A ? (A = false, U3) : g3(d2, U3, Q2, M2);
      }), d2;
    }
    function pc(h, g3) {
      var d2 = h.length;
      for (h.sort(g3); d2--; )
        h[d2] = h[d2].value;
      return h;
    }
    function Fr(h, g3) {
      for (var d2, A = -1, R2 = h.length; ++A < R2; ) {
        var U3 = g3(h[A]);
        U3 !== i && (d2 = d2 === i ? U3 : d2 + U3);
      }
      return d2;
    }
    function Wr(h, g3) {
      for (var d2 = -1, A = Array(h); ++d2 < h; )
        A[d2] = g3(d2);
      return A;
    }
    function dc(h, g3) {
      return z(g3, function(d2) {
        return [d2, h[d2]];
      });
    }
    function Os(h) {
      return h && h.slice(0, Ls(h) + 1).replace(yr, "");
    }
    function ht(h) {
      return function(g3) {
        return h(g3);
      };
    }
    function Mr(h, g3) {
      return z(g3, function(d2) {
        return h[d2];
      });
    }
    function tn(h, g3) {
      return h.has(g3);
    }
    function Rs(h, g3) {
      for (var d2 = -1, A = h.length; ++d2 < A && Te(g3, h[d2], 0) > -1; )
        ;
      return d2;
    }
    function bs(h, g3) {
      for (var d2 = h.length; d2-- && Te(g3, h[d2], 0) > -1; )
        ;
      return d2;
    }
    function gc(h, g3) {
      for (var d2 = h.length, A = 0; d2--; )
        h[d2] === g3 && ++A;
      return A;
    }
    var vc = qr(jo), _c = qr(tc);
    function mc(h) {
      return "\\" + nc[h];
    }
    function wc(h, g3) {
      return h == null ? i : h[g3];
    }
    function Le(h) {
      return Xo.test(h);
    }
    function Pc(h) {
      return Qo.test(h);
    }
    function Cc(h) {
      for (var g3, d2 = []; !(g3 = h.next()).done; )
        d2.push(g3.value);
      return d2;
    }
    function Br(h) {
      var g3 = -1, d2 = Array(h.size);
      return h.forEach(function(A, R2) {
        d2[++g3] = [R2, A];
      }), d2;
    }
    function Ts(h, g3) {
      return function(d2) {
        return h(g3(d2));
      };
    }
    function ie(h, g3) {
      for (var d2 = -1, A = h.length, R2 = 0, U3 = []; ++d2 < A; ) {
        var Q2 = h[d2];
        (Q2 === g3 || Q2 === Ie) && (h[d2] = Ie, U3[R2++] = d2);
      }
      return U3;
    }
    function Rn(h) {
      var g3 = -1, d2 = Array(h.size);
      return h.forEach(function(A) {
        d2[++g3] = A;
      }), d2;
    }
    function Ac(h) {
      var g3 = -1, d2 = Array(h.size);
      return h.forEach(function(A) {
        d2[++g3] = [A, A];
      }), d2;
    }
    function Ic(h, g3, d2) {
      for (var A = d2 - 1, R2 = h.length; ++A < R2; )
        if (h[A] === g3)
          return A;
      return -1;
    }
    function xc(h, g3, d2) {
      for (var A = d2 + 1; A--; )
        if (h[A] === g3)
          return A;
      return A;
    }
    function He(h) {
      return Le(h) ? yc(h) : cc(h);
    }
    function St(h) {
      return Le(h) ? Sc(h) : fc(h);
    }
    function Ls(h) {
      for (var g3 = h.length; g3-- && go.test(h.charAt(g3)); )
        ;
      return g3;
    }
    var Ec = qr(ec);
    function yc(h) {
      for (var g3 = Tr.lastIndex = 0; Tr.test(h); )
        ++g3;
      return g3;
    }
    function Sc(h) {
      return h.match(Tr) || [];
    }
    function Oc(h) {
      return h.match(Zo) || [];
    }
    var Rc = function h(g3) {
      g3 = g3 == null ? j3 : De.defaults(j3.Object(), g3, De.pick(j3, Vo));
      var d2 = g3.Array, A = g3.Date, R2 = g3.Error, U3 = g3.Function, Q2 = g3.Math, M2 = g3.Object, Gr = g3.RegExp, bc = g3.String, wt = g3.TypeError, bn = d2.prototype, Tc = U3.prototype, Ne = M2.prototype, Tn = g3["__core-js_shared__"], Ln = Tc.toString, W = Ne.hasOwnProperty, Lc = 0, Hs = function() {
        var t = /[^.]+$/.exec(Tn && Tn.keys && Tn.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      }(), Hn = Ne.toString, Hc = Ln.call(M2), Dc = j3._, Nc = Gr("^" + Ln.call(W).replace(Er, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Dn = vs ? g3.Buffer : i, se = g3.Symbol, Nn = g3.Uint8Array, Ds = Dn ? Dn.allocUnsafe : i, $n = Ts(M2.getPrototypeOf, M2), Ns = M2.create, $s = Ne.propertyIsEnumerable, Un = bn.splice, Us = se ? se.isConcatSpreadable : i, en = se ? se.iterator : i, de = se ? se.toStringTag : i, qn = function() {
        try {
          var t = we(M2, "defineProperty");
          return t({}, "", {}), t;
        } catch {
        }
      }(), $c = g3.clearTimeout !== j3.clearTimeout && g3.clearTimeout, Uc = A && A.now !== j3.Date.now && A.now, qc = g3.setTimeout !== j3.setTimeout && g3.setTimeout, Fn = Q2.ceil, Wn = Q2.floor, zr = M2.getOwnPropertySymbols, Fc = Dn ? Dn.isBuffer : i, qs = g3.isFinite, Wc = bn.join, Mc = Ts(M2.keys, M2), V = Q2.max, et = Q2.min, Bc = A.now, Gc = g3.parseInt, Fs = Q2.random, zc = bn.reverse, Kr = we(g3, "DataView"), nn = we(g3, "Map"), Jr = we(g3, "Promise"), $e = we(g3, "Set"), rn = we(g3, "WeakMap"), sn = we(M2, "create"), Mn = rn && new rn(), Ue = {}, Kc = Pe(Kr), Jc = Pe(nn), Yc = Pe(Jr), Zc = Pe($e), Xc = Pe(rn), Bn = se ? se.prototype : i, un = Bn ? Bn.valueOf : i, Ws = Bn ? Bn.toString : i;
      function a(t) {
        if (Y(t) && !b2(t) && !(t instanceof N2)) {
          if (t instanceof Pt)
            return t;
          if (W.call(t, "__wrapped__"))
            return Mu(t);
        }
        return new Pt(t);
      }
      var qe = function() {
        function t() {
        }
        return function(e) {
          if (!K(e))
            return {};
          if (Ns)
            return Ns(e);
          t.prototype = e;
          var n = new t();
          return t.prototype = i, n;
        };
      }();
      function Gn() {
      }
      function Pt(t, e) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = i;
      }
      a.templateSettings = { escape: oo, evaluate: co, interpolate: Xi, variable: "", imports: { _: a } }, a.prototype = Gn.prototype, a.prototype.constructor = a, Pt.prototype = qe(Gn.prototype), Pt.prototype.constructor = Pt;
      function N2(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ut, this.__views__ = [];
      }
      function Qc() {
        var t = new N2(this.__wrapped__);
        return t.__actions__ = ut(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ut(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ut(this.__views__), t;
      }
      function Vc() {
        if (this.__filtered__) {
          var t = new N2(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else
          t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function kc() {
        var t = this.__wrapped__.value(), e = this.__dir__, n = b2(t), r = e < 0, u2 = n ? t.length : 0, o3 = hh(0, u2, this.__views__), c2 = o3.start, f2 = o3.end, l2 = f2 - c2, v3 = r ? f2 : c2 - 1, _ = this.__iteratees__, m3 = _.length, C2 = 0, x2 = et(l2, this.__takeCount__);
        if (!n || !r && u2 == l2 && x2 == l2)
          return fu(t, this.__actions__);
        var S = [];
        t:
          for (; l2-- && C2 < x2; ) {
            v3 += e;
            for (var L3 = -1, O3 = t[v3]; ++L3 < m3; ) {
              var D2 = _[L3], $2 = D2.iteratee, dt = D2.type, st = $2(O3);
              if (dt == Ka)
                O3 = st;
              else if (!st) {
                if (dt == zi)
                  continue t;
                break t;
              }
            }
            S[C2++] = O3;
          }
        return S;
      }
      N2.prototype = qe(Gn.prototype), N2.prototype.constructor = N2;
      function ge(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var r = t[e];
          this.set(r[0], r[1]);
        }
      }
      function jc() {
        this.__data__ = sn ? sn(null) : {}, this.size = 0;
      }
      function tf(t) {
        var e = this.has(t) && delete this.__data__[t];
        return this.size -= e ? 1 : 0, e;
      }
      function ef(t) {
        var e = this.__data__;
        if (sn) {
          var n = e[t];
          return n === Ht ? i : n;
        }
        return W.call(e, t) ? e[t] : i;
      }
      function nf(t) {
        var e = this.__data__;
        return sn ? e[t] !== i : W.call(e, t);
      }
      function rf(t, e) {
        var n = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n[t] = sn && e === i ? Ht : e, this;
      }
      ge.prototype.clear = jc, ge.prototype.delete = tf, ge.prototype.get = ef, ge.prototype.has = nf, ge.prototype.set = rf;
      function Kt(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var r = t[e];
          this.set(r[0], r[1]);
        }
      }
      function sf() {
        this.__data__ = [], this.size = 0;
      }
      function uf(t) {
        var e = this.__data__, n = zn(e, t);
        if (n < 0)
          return false;
        var r = e.length - 1;
        return n == r ? e.pop() : Un.call(e, n, 1), --this.size, true;
      }
      function af(t) {
        var e = this.__data__, n = zn(e, t);
        return n < 0 ? i : e[n][1];
      }
      function of(t) {
        return zn(this.__data__, t) > -1;
      }
      function cf(t, e) {
        var n = this.__data__, r = zn(n, t);
        return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
      }
      Kt.prototype.clear = sf, Kt.prototype.delete = uf, Kt.prototype.get = af, Kt.prototype.has = of, Kt.prototype.set = cf;
      function Jt(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var r = t[e];
          this.set(r[0], r[1]);
        }
      }
      function ff() {
        this.size = 0, this.__data__ = { hash: new ge(), map: new (nn || Kt)(), string: new ge() };
      }
      function hf(t) {
        var e = nr(this, t).delete(t);
        return this.size -= e ? 1 : 0, e;
      }
      function lf(t) {
        return nr(this, t).get(t);
      }
      function pf(t) {
        return nr(this, t).has(t);
      }
      function df(t, e) {
        var n = nr(this, t), r = n.size;
        return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
      }
      Jt.prototype.clear = ff, Jt.prototype.delete = hf, Jt.prototype.get = lf, Jt.prototype.has = pf, Jt.prototype.set = df;
      function ve(t) {
        var e = -1, n = t == null ? 0 : t.length;
        for (this.__data__ = new Jt(); ++e < n; )
          this.add(t[e]);
      }
      function gf(t) {
        return this.__data__.set(t, Ht), this;
      }
      function vf(t) {
        return this.__data__.has(t);
      }
      ve.prototype.add = ve.prototype.push = gf, ve.prototype.has = vf;
      function Ot(t) {
        var e = this.__data__ = new Kt(t);
        this.size = e.size;
      }
      function _f() {
        this.__data__ = new Kt(), this.size = 0;
      }
      function mf(t) {
        var e = this.__data__, n = e.delete(t);
        return this.size = e.size, n;
      }
      function wf(t) {
        return this.__data__.get(t);
      }
      function Pf(t) {
        return this.__data__.has(t);
      }
      function Cf(t, e) {
        var n = this.__data__;
        if (n instanceof Kt) {
          var r = n.__data__;
          if (!nn || r.length < w2 - 1)
            return r.push([t, e]), this.size = ++n.size, this;
          n = this.__data__ = new Jt(r);
        }
        return n.set(t, e), this.size = n.size, this;
      }
      Ot.prototype.clear = _f, Ot.prototype.delete = mf, Ot.prototype.get = wf, Ot.prototype.has = Pf, Ot.prototype.set = Cf;
      function Ms(t, e) {
        var n = b2(t), r = !n && Ce(t), u2 = !n && !r && fe(t), o3 = !n && !r && !u2 && Be(t), c2 = n || r || u2 || o3, f2 = c2 ? Wr(t.length, bc) : [], l2 = f2.length;
        for (var v3 in t)
          (e || W.call(t, v3)) && !(c2 && (v3 == "length" || u2 && (v3 == "offset" || v3 == "parent") || o3 && (v3 == "buffer" || v3 == "byteLength" || v3 == "byteOffset") || Qt(v3, l2))) && f2.push(v3);
        return f2;
      }
      function Bs(t) {
        var e = t.length;
        return e ? t[ri(0, e - 1)] : i;
      }
      function Af(t, e) {
        return rr(ut(t), _e2(e, 0, t.length));
      }
      function If(t) {
        return rr(ut(t));
      }
      function Yr(t, e, n) {
        (n !== i && !Rt(t[e], n) || n === i && !(e in t)) && Yt(t, e, n);
      }
      function an(t, e, n) {
        var r = t[e];
        (!(W.call(t, e) && Rt(r, n)) || n === i && !(e in t)) && Yt(t, e, n);
      }
      function zn(t, e) {
        for (var n = t.length; n--; )
          if (Rt(t[n][0], e))
            return n;
        return -1;
      }
      function xf(t, e, n, r) {
        return ue(t, function(u2, o3, c2) {
          e(r, u2, n(u2), c2);
        }), r;
      }
      function Gs(t, e) {
        return t && Ft(e, k2(e), t);
      }
      function Ef(t, e) {
        return t && Ft(e, ot(e), t);
      }
      function Yt(t, e, n) {
        e == "__proto__" && qn ? qn(t, e, { configurable: true, enumerable: true, value: n, writable: true }) : t[e] = n;
      }
      function Zr(t, e) {
        for (var n = -1, r = e.length, u2 = d2(r), o3 = t == null; ++n < r; )
          u2[n] = o3 ? i : Oi(t, e[n]);
        return u2;
      }
      function _e2(t, e, n) {
        return t === t && (n !== i && (t = t <= n ? t : n), e !== i && (t = t >= e ? t : e)), t;
      }
      function Ct(t, e, n, r, u2, o3) {
        var c2, f2 = e & Dt, l2 = e & Bt, v3 = e & xe;
        if (n && (c2 = u2 ? n(t, r, u2, o3) : n(t)), c2 !== i)
          return c2;
        if (!K(t))
          return t;
        var _ = b2(t);
        if (_) {
          if (c2 = ph(t), !f2)
            return ut(t, c2);
        } else {
          var m3 = nt(t), C2 = m3 == An || m3 == Ki;
          if (fe(t))
            return pu(t, f2);
          if (m3 == zt || m3 == Oe || C2 && !u2) {
            if (c2 = l2 || C2 ? {} : Lu(t), !f2)
              return l2 ? nh(t, Ef(c2, t)) : eh(t, Gs(c2, t));
          } else {
            if (!B[m3])
              return u2 ? t : {};
            c2 = dh(t, m3, f2);
          }
        }
        o3 || (o3 = new Ot());
        var x2 = o3.get(t);
        if (x2)
          return x2;
        o3.set(t, c2), aa(t) ? t.forEach(function(O3) {
          c2.add(Ct(O3, e, n, O3, t, o3));
        }) : sa(t) && t.forEach(function(O3, D2) {
          c2.set(D2, Ct(O3, e, n, D2, t, o3));
        });
        var S = v3 ? l2 ? di : pi : l2 ? ot : k2, L3 = _ ? i : S(t);
        return mt(L3 || t, function(O3, D2) {
          L3 && (D2 = O3, O3 = t[D2]), an(c2, D2, Ct(O3, e, n, D2, t, o3));
        }), c2;
      }
      function yf(t) {
        var e = k2(t);
        return function(n) {
          return zs(n, t, e);
        };
      }
      function zs(t, e, n) {
        var r = n.length;
        if (t == null)
          return !r;
        for (t = M2(t); r--; ) {
          var u2 = n[r], o3 = e[u2], c2 = t[u2];
          if (c2 === i && !(u2 in t) || !o3(c2))
            return false;
        }
        return true;
      }
      function Ks(t, e, n) {
        if (typeof t != "function")
          throw new wt(y2);
        return dn(function() {
          t.apply(i, n);
        }, e);
      }
      function on(t, e, n, r) {
        var u2 = -1, o3 = Sn, c2 = true, f2 = t.length, l2 = [], v3 = e.length;
        if (!f2)
          return l2;
        n && (e = z(e, ht(n))), r ? (o3 = Dr, c2 = false) : e.length >= w2 && (o3 = tn, c2 = false, e = new ve(e));
        t:
          for (; ++u2 < f2; ) {
            var _ = t[u2], m3 = n == null ? _ : n(_);
            if (_ = r || _ !== 0 ? _ : 0, c2 && m3 === m3) {
              for (var C2 = v3; C2--; )
                if (e[C2] === m3)
                  continue t;
              l2.push(_);
            } else
              o3(e, m3, r) || l2.push(_);
          }
        return l2;
      }
      var ue = mu(qt), Js = mu(Qr, true);
      function Sf(t, e) {
        var n = true;
        return ue(t, function(r, u2, o3) {
          return n = !!e(r, u2, o3), n;
        }), n;
      }
      function Kn(t, e, n) {
        for (var r = -1, u2 = t.length; ++r < u2; ) {
          var o3 = t[r], c2 = e(o3);
          if (c2 != null && (f2 === i ? c2 === c2 && !pt(c2) : n(c2, f2)))
            var f2 = c2, l2 = o3;
        }
        return l2;
      }
      function Of(t, e, n, r) {
        var u2 = t.length;
        for (n = T3(n), n < 0 && (n = -n > u2 ? 0 : u2 + n), r = r === i || r > u2 ? u2 : T3(r), r < 0 && (r += u2), r = n > r ? 0 : ca(r); n < r; )
          t[n++] = e;
        return t;
      }
      function Ys(t, e) {
        var n = [];
        return ue(t, function(r, u2, o3) {
          e(r, u2, o3) && n.push(r);
        }), n;
      }
      function tt(t, e, n, r, u2) {
        var o3 = -1, c2 = t.length;
        for (n || (n = vh), u2 || (u2 = []); ++o3 < c2; ) {
          var f2 = t[o3];
          e > 0 && n(f2) ? e > 1 ? tt(f2, e - 1, n, r, u2) : re(u2, f2) : r || (u2[u2.length] = f2);
        }
        return u2;
      }
      var Xr2 = wu(), Zs = wu(true);
      function qt(t, e) {
        return t && Xr2(t, e, k2);
      }
      function Qr(t, e) {
        return t && Zs(t, e, k2);
      }
      function Jn(t, e) {
        return ne(e, function(n) {
          return Vt(t[n]);
        });
      }
      function me2(t, e) {
        e = oe(e, t);
        for (var n = 0, r = e.length; t != null && n < r; )
          t = t[Wt(e[n++])];
        return n && n == r ? t : i;
      }
      function Xs(t, e, n) {
        var r = e(t);
        return b2(t) ? r : re(r, n(t));
      }
      function rt(t) {
        return t == null ? t === i ? eo : ja : de && de in M2(t) ? fh(t) : Ih(t);
      }
      function Vr(t, e) {
        return t > e;
      }
      function Rf(t, e) {
        return t != null && W.call(t, e);
      }
      function bf(t, e) {
        return t != null && e in M2(t);
      }
      function Tf(t, e, n) {
        return t >= et(e, n) && t < V(e, n);
      }
      function kr(t, e, n) {
        for (var r = n ? Dr : Sn, u2 = t[0].length, o3 = t.length, c2 = o3, f2 = d2(o3), l2 = 1 / 0, v3 = []; c2--; ) {
          var _ = t[c2];
          c2 && e && (_ = z(_, ht(e))), l2 = et(_.length, l2), f2[c2] = !n && (e || u2 >= 120 && _.length >= 120) ? new ve(c2 && _) : i;
        }
        _ = t[0];
        var m3 = -1, C2 = f2[0];
        t:
          for (; ++m3 < u2 && v3.length < l2; ) {
            var x2 = _[m3], S = e ? e(x2) : x2;
            if (x2 = n || x2 !== 0 ? x2 : 0, !(C2 ? tn(C2, S) : r(v3, S, n))) {
              for (c2 = o3; --c2; ) {
                var L3 = f2[c2];
                if (!(L3 ? tn(L3, S) : r(t[c2], S, n)))
                  continue t;
              }
              C2 && C2.push(S), v3.push(x2);
            }
          }
        return v3;
      }
      function Lf(t, e, n, r) {
        return qt(t, function(u2, o3, c2) {
          e(r, n(u2), o3, c2);
        }), r;
      }
      function cn(t, e, n) {
        e = oe(e, t), t = $u(t, e);
        var r = t == null ? t : t[Wt(It(e))];
        return r == null ? i : ft(r, t, n);
      }
      function Qs(t) {
        return Y(t) && rt(t) == Oe;
      }
      function Hf(t) {
        return Y(t) && rt(t) == je;
      }
      function Df(t) {
        return Y(t) && rt(t) == Ze;
      }
      function fn2(t, e, n, r, u2) {
        return t === e ? true : t == null || e == null || !Y(t) && !Y(e) ? t !== t && e !== e : Nf(t, e, n, r, fn2, u2);
      }
      function Nf(t, e, n, r, u2, o3) {
        var c2 = b2(t), f2 = b2(e), l2 = c2 ? Pn : nt(t), v3 = f2 ? Pn : nt(e);
        l2 = l2 == Oe ? zt : l2, v3 = v3 == Oe ? zt : v3;
        var _ = l2 == zt, m3 = v3 == zt, C2 = l2 == v3;
        if (C2 && fe(t)) {
          if (!fe(e))
            return false;
          c2 = true, _ = false;
        }
        if (C2 && !_)
          return o3 || (o3 = new Ot()), c2 || Be(t) ? Ru(t, e, n, r, u2, o3) : oh(t, e, l2, n, r, u2, o3);
        if (!(n & Ee)) {
          var x2 = _ && W.call(t, "__wrapped__"), S = m3 && W.call(e, "__wrapped__");
          if (x2 || S) {
            var L3 = x2 ? t.value() : t, O3 = S ? e.value() : e;
            return o3 || (o3 = new Ot()), u2(L3, O3, n, r, o3);
          }
        }
        return C2 ? (o3 || (o3 = new Ot()), ch(t, e, n, r, u2, o3)) : false;
      }
      function $f(t) {
        return Y(t) && nt(t) == Et;
      }
      function jr(t, e, n, r) {
        var u2 = n.length, o3 = u2, c2 = !r;
        if (t == null)
          return !o3;
        for (t = M2(t); u2--; ) {
          var f2 = n[u2];
          if (c2 && f2[2] ? f2[1] !== t[f2[0]] : !(f2[0] in t))
            return false;
        }
        for (; ++u2 < o3; ) {
          f2 = n[u2];
          var l2 = f2[0], v3 = t[l2], _ = f2[1];
          if (c2 && f2[2]) {
            if (v3 === i && !(l2 in t))
              return false;
          } else {
            var m3 = new Ot();
            if (r)
              var C2 = r(v3, _, l2, t, e, m3);
            if (!(C2 === i ? fn2(_, v3, Ee | mn2, r, m3) : C2))
              return false;
          }
        }
        return true;
      }
      function Vs(t) {
        if (!K(t) || mh(t))
          return false;
        var e = Vt(t) ? Nc : Eo;
        return e.test(Pe(t));
      }
      function Uf(t) {
        return Y(t) && rt(t) == Qe;
      }
      function qf(t) {
        return Y(t) && nt(t) == yt;
      }
      function Ff(t) {
        return Y(t) && cr(t.length) && !!G[rt(t)];
      }
      function ks(t) {
        return typeof t == "function" ? t : t == null ? ct : typeof t == "object" ? b2(t) ? eu(t[0], t[1]) : tu(t) : Pa(t);
      }
      function ti(t) {
        if (!pn(t))
          return Mc(t);
        var e = [];
        for (var n in M2(t))
          W.call(t, n) && n != "constructor" && e.push(n);
        return e;
      }
      function Wf(t) {
        if (!K(t))
          return Ah(t);
        var e = pn(t), n = [];
        for (var r in t)
          r == "constructor" && (e || !W.call(t, r)) || n.push(r);
        return n;
      }
      function ei(t, e) {
        return t < e;
      }
      function js(t, e) {
        var n = -1, r = at(t) ? d2(t.length) : [];
        return ue(t, function(u2, o3, c2) {
          r[++n] = e(u2, o3, c2);
        }), r;
      }
      function tu(t) {
        var e = vi(t);
        return e.length == 1 && e[0][2] ? Du(e[0][0], e[0][1]) : function(n) {
          return n === t || jr(n, t, e);
        };
      }
      function eu(t, e) {
        return mi(t) && Hu(e) ? Du(Wt(t), e) : function(n) {
          var r = Oi(n, t);
          return r === i && r === e ? Ri(n, t) : fn2(e, r, Ee | mn2);
        };
      }
      function Yn(t, e, n, r, u2) {
        t !== e && Xr2(e, function(o3, c2) {
          if (u2 || (u2 = new Ot()), K(o3))
            Mf(t, e, c2, n, Yn, r, u2);
          else {
            var f2 = r ? r(Pi(t, c2), o3, c2 + "", t, e, u2) : i;
            f2 === i && (f2 = o3), Yr(t, c2, f2);
          }
        }, ot);
      }
      function Mf(t, e, n, r, u2, o3, c2) {
        var f2 = Pi(t, n), l2 = Pi(e, n), v3 = c2.get(l2);
        if (v3) {
          Yr(t, n, v3);
          return;
        }
        var _ = o3 ? o3(f2, l2, n + "", t, e, c2) : i, m3 = _ === i;
        if (m3) {
          var C2 = b2(l2), x2 = !C2 && fe(l2), S = !C2 && !x2 && Be(l2);
          _ = l2, C2 || x2 || S ? b2(f2) ? _ = f2 : Z(f2) ? _ = ut(f2) : x2 ? (m3 = false, _ = pu(l2, true)) : S ? (m3 = false, _ = du(l2, true)) : _ = [] : gn(l2) || Ce(l2) ? (_ = f2, Ce(f2) ? _ = fa(f2) : (!K(f2) || Vt(f2)) && (_ = Lu(l2))) : m3 = false;
        }
        m3 && (c2.set(l2, _), u2(_, l2, r, o3, c2), c2.delete(l2)), Yr(t, n, _);
      }
      function nu(t, e) {
        var n = t.length;
        if (n)
          return e += e < 0 ? n : 0, Qt(e, n) ? t[e] : i;
      }
      function ru(t, e, n) {
        e.length ? e = z(e, function(o3) {
          return b2(o3) ? function(c2) {
            return me2(c2, o3.length === 1 ? o3[0] : o3);
          } : o3;
        }) : e = [ct];
        var r = -1;
        e = z(e, ht(E3()));
        var u2 = js(t, function(o3, c2, f2) {
          var l2 = z(e, function(v3) {
            return v3(o3);
          });
          return { criteria: l2, index: ++r, value: o3 };
        });
        return pc(u2, function(o3, c2) {
          return th(o3, c2, n);
        });
      }
      function Bf(t, e) {
        return iu(t, e, function(n, r) {
          return Ri(t, r);
        });
      }
      function iu(t, e, n) {
        for (var r = -1, u2 = e.length, o3 = {}; ++r < u2; ) {
          var c2 = e[r], f2 = me2(t, c2);
          n(f2, c2) && hn(o3, oe(c2, t), f2);
        }
        return o3;
      }
      function Gf(t) {
        return function(e) {
          return me2(e, t);
        };
      }
      function ni(t, e, n, r) {
        var u2 = r ? lc : Te, o3 = -1, c2 = e.length, f2 = t;
        for (t === e && (e = ut(e)), n && (f2 = z(t, ht(n))); ++o3 < c2; )
          for (var l2 = 0, v3 = e[o3], _ = n ? n(v3) : v3; (l2 = u2(f2, _, l2, r)) > -1; )
            f2 !== t && Un.call(f2, l2, 1), Un.call(t, l2, 1);
        return t;
      }
      function su(t, e) {
        for (var n = t ? e.length : 0, r = n - 1; n--; ) {
          var u2 = e[n];
          if (n == r || u2 !== o3) {
            var o3 = u2;
            Qt(u2) ? Un.call(t, u2, 1) : ui(t, u2);
          }
        }
        return t;
      }
      function ri(t, e) {
        return t + Wn(Fs() * (e - t + 1));
      }
      function zf(t, e, n, r) {
        for (var u2 = -1, o3 = V(Fn((e - t) / (n || 1)), 0), c2 = d2(o3); o3--; )
          c2[r ? o3 : ++u2] = t, t += n;
        return c2;
      }
      function ii(t, e) {
        var n = "";
        if (!t || e < 1 || e > ee)
          return n;
        do
          e % 2 && (n += t), e = Wn(e / 2), e && (t += t);
        while (e);
        return n;
      }
      function H(t, e) {
        return Ci(Nu(t, e, ct), t + "");
      }
      function Kf(t) {
        return Bs(Ge(t));
      }
      function Jf(t, e) {
        var n = Ge(t);
        return rr(n, _e2(e, 0, n.length));
      }
      function hn(t, e, n, r) {
        if (!K(t))
          return t;
        e = oe(e, t);
        for (var u2 = -1, o3 = e.length, c2 = o3 - 1, f2 = t; f2 != null && ++u2 < o3; ) {
          var l2 = Wt(e[u2]), v3 = n;
          if (l2 === "__proto__" || l2 === "constructor" || l2 === "prototype")
            return t;
          if (u2 != c2) {
            var _ = f2[l2];
            v3 = r ? r(_, l2, f2) : i, v3 === i && (v3 = K(_) ? _ : Qt(e[u2 + 1]) ? [] : {});
          }
          an(f2, l2, v3), f2 = f2[l2];
        }
        return t;
      }
      var uu = Mn ? function(t, e) {
        return Mn.set(t, e), t;
      } : ct, Yf = qn ? function(t, e) {
        return qn(t, "toString", { configurable: true, enumerable: false, value: Ti(e), writable: true });
      } : ct;
      function Zf(t) {
        return rr(Ge(t));
      }
      function At(t, e, n) {
        var r = -1, u2 = t.length;
        e < 0 && (e = -e > u2 ? 0 : u2 + e), n = n > u2 ? u2 : n, n < 0 && (n += u2), u2 = e > n ? 0 : n - e >>> 0, e >>>= 0;
        for (var o3 = d2(u2); ++r < u2; )
          o3[r] = t[r + e];
        return o3;
      }
      function Xf(t, e) {
        var n;
        return ue(t, function(r, u2, o3) {
          return n = e(r, u2, o3), !n;
        }), !!n;
      }
      function Zn(t, e, n) {
        var r = 0, u2 = t == null ? r : t.length;
        if (typeof e == "number" && e === e && u2 <= Xa) {
          for (; r < u2; ) {
            var o3 = r + u2 >>> 1, c2 = t[o3];
            c2 !== null && !pt(c2) && (n ? c2 <= e : c2 < e) ? r = o3 + 1 : u2 = o3;
          }
          return u2;
        }
        return si(t, e, ct, n);
      }
      function si(t, e, n, r) {
        var u2 = 0, o3 = t == null ? 0 : t.length;
        if (o3 === 0)
          return 0;
        e = n(e);
        for (var c2 = e !== e, f2 = e === null, l2 = pt(e), v3 = e === i; u2 < o3; ) {
          var _ = Wn((u2 + o3) / 2), m3 = n(t[_]), C2 = m3 !== i, x2 = m3 === null, S = m3 === m3, L3 = pt(m3);
          if (c2)
            var O3 = r || S;
          else
            v3 ? O3 = S && (r || C2) : f2 ? O3 = S && C2 && (r || !x2) : l2 ? O3 = S && C2 && !x2 && (r || !L3) : x2 || L3 ? O3 = false : O3 = r ? m3 <= e : m3 < e;
          O3 ? u2 = _ + 1 : o3 = _;
        }
        return et(o3, Za);
      }
      function au(t, e) {
        for (var n = -1, r = t.length, u2 = 0, o3 = []; ++n < r; ) {
          var c2 = t[n], f2 = e ? e(c2) : c2;
          if (!n || !Rt(f2, l2)) {
            var l2 = f2;
            o3[u2++] = c2 === 0 ? 0 : c2;
          }
        }
        return o3;
      }
      function ou(t) {
        return typeof t == "number" ? t : pt(t) ? wn : +t;
      }
      function lt(t) {
        if (typeof t == "string")
          return t;
        if (b2(t))
          return z(t, lt) + "";
        if (pt(t))
          return Ws ? Ws.call(t) : "";
        var e = t + "";
        return e == "0" && 1 / t == -le ? "-0" : e;
      }
      function ae(t, e, n) {
        var r = -1, u2 = Sn, o3 = t.length, c2 = true, f2 = [], l2 = f2;
        if (n)
          c2 = false, u2 = Dr;
        else if (o3 >= w2) {
          var v3 = e ? null : uh(t);
          if (v3)
            return Rn(v3);
          c2 = false, u2 = tn, l2 = new ve();
        } else
          l2 = e ? [] : f2;
        t:
          for (; ++r < o3; ) {
            var _ = t[r], m3 = e ? e(_) : _;
            if (_ = n || _ !== 0 ? _ : 0, c2 && m3 === m3) {
              for (var C2 = l2.length; C2--; )
                if (l2[C2] === m3)
                  continue t;
              e && l2.push(m3), f2.push(_);
            } else
              u2(l2, m3, n) || (l2 !== f2 && l2.push(m3), f2.push(_));
          }
        return f2;
      }
      function ui(t, e) {
        return e = oe(e, t), t = $u(t, e), t == null || delete t[Wt(It(e))];
      }
      function cu(t, e, n, r) {
        return hn(t, e, n(me2(t, e)), r);
      }
      function Xn(t, e, n, r) {
        for (var u2 = t.length, o3 = r ? u2 : -1; (r ? o3-- : ++o3 < u2) && e(t[o3], o3, t); )
          ;
        return n ? At(t, r ? 0 : o3, r ? o3 + 1 : u2) : At(t, r ? o3 + 1 : 0, r ? u2 : o3);
      }
      function fu(t, e) {
        var n = t;
        return n instanceof N2 && (n = n.value()), Nr2(e, function(r, u2) {
          return u2.func.apply(u2.thisArg, re([r], u2.args));
        }, n);
      }
      function ai(t, e, n) {
        var r = t.length;
        if (r < 2)
          return r ? ae(t[0]) : [];
        for (var u2 = -1, o3 = d2(r); ++u2 < r; )
          for (var c2 = t[u2], f2 = -1; ++f2 < r; )
            f2 != u2 && (o3[u2] = on(o3[u2] || c2, t[f2], e, n));
        return ae(tt(o3, 1), e, n);
      }
      function hu(t, e, n) {
        for (var r = -1, u2 = t.length, o3 = e.length, c2 = {}; ++r < u2; ) {
          var f2 = r < o3 ? e[r] : i;
          n(c2, t[r], f2);
        }
        return c2;
      }
      function oi(t) {
        return Z(t) ? t : [];
      }
      function ci(t) {
        return typeof t == "function" ? t : ct;
      }
      function oe(t, e) {
        return b2(t) ? t : mi(t, e) ? [t] : Wu(q2(t));
      }
      var Qf = H;
      function ce(t, e, n) {
        var r = t.length;
        return n = n === i ? r : n, !e && n >= r ? t : At(t, e, n);
      }
      var lu = $c || function(t) {
        return j3.clearTimeout(t);
      };
      function pu(t, e) {
        if (e)
          return t.slice();
        var n = t.length, r = Ds ? Ds(n) : new t.constructor(n);
        return t.copy(r), r;
      }
      function fi(t) {
        var e = new t.constructor(t.byteLength);
        return new Nn(e).set(new Nn(t)), e;
      }
      function Vf(t, e) {
        var n = e ? fi(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.byteLength);
      }
      function kf(t) {
        var e = new t.constructor(t.source, Qi.exec(t));
        return e.lastIndex = t.lastIndex, e;
      }
      function jf(t) {
        return un ? M2(un.call(t)) : {};
      }
      function du(t, e) {
        var n = e ? fi(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.length);
      }
      function gu(t, e) {
        if (t !== e) {
          var n = t !== i, r = t === null, u2 = t === t, o3 = pt(t), c2 = e !== i, f2 = e === null, l2 = e === e, v3 = pt(e);
          if (!f2 && !v3 && !o3 && t > e || o3 && c2 && l2 && !f2 && !v3 || r && c2 && l2 || !n && l2 || !u2)
            return 1;
          if (!r && !o3 && !v3 && t < e || v3 && n && u2 && !r && !o3 || f2 && n && u2 || !c2 && u2 || !l2)
            return -1;
        }
        return 0;
      }
      function th(t, e, n) {
        for (var r = -1, u2 = t.criteria, o3 = e.criteria, c2 = u2.length, f2 = n.length; ++r < c2; ) {
          var l2 = gu(u2[r], o3[r]);
          if (l2) {
            if (r >= f2)
              return l2;
            var v3 = n[r];
            return l2 * (v3 == "desc" ? -1 : 1);
          }
        }
        return t.index - e.index;
      }
      function vu(t, e, n, r) {
        for (var u2 = -1, o3 = t.length, c2 = n.length, f2 = -1, l2 = e.length, v3 = V(o3 - c2, 0), _ = d2(l2 + v3), m3 = !r; ++f2 < l2; )
          _[f2] = e[f2];
        for (; ++u2 < c2; )
          (m3 || u2 < o3) && (_[n[u2]] = t[u2]);
        for (; v3--; )
          _[f2++] = t[u2++];
        return _;
      }
      function _u(t, e, n, r) {
        for (var u2 = -1, o3 = t.length, c2 = -1, f2 = n.length, l2 = -1, v3 = e.length, _ = V(o3 - f2, 0), m3 = d2(_ + v3), C2 = !r; ++u2 < _; )
          m3[u2] = t[u2];
        for (var x2 = u2; ++l2 < v3; )
          m3[x2 + l2] = e[l2];
        for (; ++c2 < f2; )
          (C2 || u2 < o3) && (m3[x2 + n[c2]] = t[u2++]);
        return m3;
      }
      function ut(t, e) {
        var n = -1, r = t.length;
        for (e || (e = d2(r)); ++n < r; )
          e[n] = t[n];
        return e;
      }
      function Ft(t, e, n, r) {
        var u2 = !n;
        n || (n = {});
        for (var o3 = -1, c2 = e.length; ++o3 < c2; ) {
          var f2 = e[o3], l2 = r ? r(n[f2], t[f2], f2, n, t) : i;
          l2 === i && (l2 = t[f2]), u2 ? Yt(n, f2, l2) : an(n, f2, l2);
        }
        return n;
      }
      function eh(t, e) {
        return Ft(t, _i(t), e);
      }
      function nh(t, e) {
        return Ft(t, bu(t), e);
      }
      function Qn(t, e) {
        return function(n, r) {
          var u2 = b2(n) ? uc : xf, o3 = e ? e() : {};
          return u2(n, t, E3(r, 2), o3);
        };
      }
      function Fe(t) {
        return H(function(e, n) {
          var r = -1, u2 = n.length, o3 = u2 > 1 ? n[u2 - 1] : i, c2 = u2 > 2 ? n[2] : i;
          for (o3 = t.length > 3 && typeof o3 == "function" ? (u2--, o3) : i, c2 && it2(n[0], n[1], c2) && (o3 = u2 < 3 ? i : o3, u2 = 1), e = M2(e); ++r < u2; ) {
            var f2 = n[r];
            f2 && t(e, f2, r, o3);
          }
          return e;
        });
      }
      function mu(t, e) {
        return function(n, r) {
          if (n == null)
            return n;
          if (!at(n))
            return t(n, r);
          for (var u2 = n.length, o3 = e ? u2 : -1, c2 = M2(n); (e ? o3-- : ++o3 < u2) && r(c2[o3], o3, c2) !== false; )
            ;
          return n;
        };
      }
      function wu(t) {
        return function(e, n, r) {
          for (var u2 = -1, o3 = M2(e), c2 = r(e), f2 = c2.length; f2--; ) {
            var l2 = c2[t ? f2 : ++u2];
            if (n(o3[l2], l2, o3) === false)
              break;
          }
          return e;
        };
      }
      function rh(t, e, n) {
        var r = e & vt, u2 = ln(t);
        function o3() {
          var c2 = this && this !== j3 && this instanceof o3 ? u2 : t;
          return c2.apply(r ? n : this, arguments);
        }
        return o3;
      }
      function Pu(t) {
        return function(e) {
          e = q2(e);
          var n = Le(e) ? St(e) : i, r = n ? n[0] : e.charAt(0), u2 = n ? ce(n, 1).join("") : e.slice(1);
          return r[t]() + u2;
        };
      }
      function We(t) {
        return function(e) {
          return Nr2(ma(_a(e).replace(Jo2, "")), t, "");
        };
      }
      function ln(t) {
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return new t();
            case 1:
              return new t(e[0]);
            case 2:
              return new t(e[0], e[1]);
            case 3:
              return new t(e[0], e[1], e[2]);
            case 4:
              return new t(e[0], e[1], e[2], e[3]);
            case 5:
              return new t(e[0], e[1], e[2], e[3], e[4]);
            case 6:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
            case 7:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
          }
          var n = qe(t.prototype), r = t.apply(n, e);
          return K(r) ? r : n;
        };
      }
      function ih(t, e, n) {
        var r = ln(t);
        function u2() {
          for (var o3 = arguments.length, c2 = d2(o3), f2 = o3, l2 = Me(u2); f2--; )
            c2[f2] = arguments[f2];
          var v3 = o3 < 3 && c2[0] !== l2 && c2[o3 - 1] !== l2 ? [] : ie(c2, l2);
          if (o3 -= v3.length, o3 < n)
            return Eu(t, e, Vn, u2.placeholder, i, c2, v3, i, i, n - o3);
          var _ = this && this !== j3 && this instanceof u2 ? r : t;
          return ft(_, this, c2);
        }
        return u2;
      }
      function Cu(t) {
        return function(e, n, r) {
          var u2 = M2(e);
          if (!at(e)) {
            var o3 = E3(n, 3);
            e = k2(e), n = function(f2) {
              return o3(u2[f2], f2, u2);
            };
          }
          var c2 = t(e, n, r);
          return c2 > -1 ? u2[o3 ? e[c2] : c2] : i;
        };
      }
      function Au(t) {
        return Xt(function(e) {
          var n = e.length, r = n, u2 = Pt.prototype.thru;
          for (t && e.reverse(); r--; ) {
            var o3 = e[r];
            if (typeof o3 != "function")
              throw new wt(y2);
            if (u2 && !c2 && er2(o3) == "wrapper")
              var c2 = new Pt([], true);
          }
          for (r = c2 ? r : n; ++r < n; ) {
            o3 = e[r];
            var f2 = er2(o3), l2 = f2 == "wrapper" ? gi(o3) : i;
            l2 && wi(l2[0]) && l2[1] == (Gt | Nt | $t | Je) && !l2[4].length && l2[9] == 1 ? c2 = c2[er2(l2[0])].apply(c2, l2[3]) : c2 = o3.length == 1 && wi(o3) ? c2[f2]() : c2.thru(o3);
          }
          return function() {
            var v3 = arguments, _ = v3[0];
            if (c2 && v3.length == 1 && b2(_))
              return c2.plant(_).value();
            for (var m3 = 0, C2 = n ? e[m3].apply(this, v3) : _; ++m3 < n; )
              C2 = e[m3].call(this, C2);
            return C2;
          };
        });
      }
      function Vn(t, e, n, r, u2, o3, c2, f2, l2, v3) {
        var _ = e & Gt, m3 = e & vt, C2 = e & he, x2 = e & (Nt | ye), S = e & gr, L3 = C2 ? i : ln(t);
        function O3() {
          for (var D2 = arguments.length, $2 = d2(D2), dt = D2; dt--; )
            $2[dt] = arguments[dt];
          if (x2)
            var st = Me(O3), gt = gc($2, st);
          if (r && ($2 = vu($2, r, u2, x2)), o3 && ($2 = _u($2, o3, c2, x2)), D2 -= gt, x2 && D2 < v3) {
            var X = ie($2, st);
            return Eu(t, e, Vn, O3.placeholder, n, $2, X, f2, l2, v3 - D2);
          }
          var bt = m3 ? n : this, jt = C2 ? bt[t] : t;
          return D2 = $2.length, f2 ? $2 = xh($2, f2) : S && D2 > 1 && $2.reverse(), _ && l2 < D2 && ($2.length = l2), this && this !== j3 && this instanceof O3 && (jt = L3 || ln(jt)), jt.apply(bt, $2);
        }
        return O3;
      }
      function Iu(t, e) {
        return function(n, r) {
          return Lf(n, t, e(r), {});
        };
      }
      function kn(t, e) {
        return function(n, r) {
          var u2;
          if (n === i && r === i)
            return e;
          if (n !== i && (u2 = n), r !== i) {
            if (u2 === i)
              return r;
            typeof n == "string" || typeof r == "string" ? (n = lt(n), r = lt(r)) : (n = ou(n), r = ou(r)), u2 = t(n, r);
          }
          return u2;
        };
      }
      function hi(t) {
        return Xt(function(e) {
          return e = z(e, ht(E3())), H(function(n) {
            var r = this;
            return t(e, function(u2) {
              return ft(u2, r, n);
            });
          });
        });
      }
      function jn(t, e) {
        e = e === i ? " " : lt(e);
        var n = e.length;
        if (n < 2)
          return n ? ii(e, t) : e;
        var r = ii(e, Fn(t / He(e)));
        return Le(e) ? ce(St(r), 0, t).join("") : r.slice(0, t);
      }
      function sh(t, e, n, r) {
        var u2 = e & vt, o3 = ln(t);
        function c2() {
          for (var f2 = -1, l2 = arguments.length, v3 = -1, _ = r.length, m3 = d2(_ + l2), C2 = this && this !== j3 && this instanceof c2 ? o3 : t; ++v3 < _; )
            m3[v3] = r[v3];
          for (; l2--; )
            m3[v3++] = arguments[++f2];
          return ft(C2, u2 ? n : this, m3);
        }
        return c2;
      }
      function xu(t) {
        return function(e, n, r) {
          return r && typeof r != "number" && it2(e, n, r) && (n = r = i), e = kt(e), n === i ? (n = e, e = 0) : n = kt(n), r = r === i ? e < n ? 1 : -1 : kt(r), zf(e, n, r, t);
        };
      }
      function tr(t) {
        return function(e, n) {
          return typeof e == "string" && typeof n == "string" || (e = xt(e), n = xt(n)), t(e, n);
        };
      }
      function Eu(t, e, n, r, u2, o3, c2, f2, l2, v3) {
        var _ = e & Nt, m3 = _ ? c2 : i, C2 = _ ? i : c2, x2 = _ ? o3 : i, S = _ ? i : o3;
        e |= _ ? $t : Se, e &= ~(_ ? Se : $t), e & Gi || (e &= ~(vt | he));
        var L3 = [t, e, u2, x2, m3, S, C2, f2, l2, v3], O3 = n.apply(i, L3);
        return wi(t) && Uu(O3, L3), O3.placeholder = r, qu(O3, t, e);
      }
      function li(t) {
        var e = Q2[t];
        return function(n, r) {
          if (n = xt(n), r = r == null ? 0 : et(T3(r), 292), r && qs(n)) {
            var u2 = (q2(n) + "e").split("e"), o3 = e(u2[0] + "e" + (+u2[1] + r));
            return u2 = (q2(o3) + "e").split("e"), +(u2[0] + "e" + (+u2[1] - r));
          }
          return e(n);
        };
      }
      var uh = $e && 1 / Rn(new $e([, -0]))[1] == le ? function(t) {
        return new $e(t);
      } : Di;
      function yu(t) {
        return function(e) {
          var n = nt(e);
          return n == Et ? Br(e) : n == yt ? Ac(e) : dc(e, t(e));
        };
      }
      function Zt(t, e, n, r, u2, o3, c2, f2) {
        var l2 = e & he;
        if (!l2 && typeof t != "function")
          throw new wt(y2);
        var v3 = r ? r.length : 0;
        if (v3 || (e &= ~($t | Se), r = u2 = i), c2 = c2 === i ? c2 : V(T3(c2), 0), f2 = f2 === i ? f2 : T3(f2), v3 -= u2 ? u2.length : 0, e & Se) {
          var _ = r, m3 = u2;
          r = u2 = i;
        }
        var C2 = l2 ? i : gi(t), x2 = [t, e, n, r, u2, _, m3, o3, c2, f2];
        if (C2 && Ch(x2, C2), t = x2[0], e = x2[1], n = x2[2], r = x2[3], u2 = x2[4], f2 = x2[9] = x2[9] === i ? l2 ? 0 : t.length : V(x2[9] - v3, 0), !f2 && e & (Nt | ye) && (e &= ~(Nt | ye)), !e || e == vt)
          var S = rh(t, e, n);
        else
          e == Nt || e == ye ? S = ih(t, e, f2) : (e == $t || e == (vt | $t)) && !u2.length ? S = sh(t, e, n, r) : S = Vn.apply(i, x2);
        var L3 = C2 ? uu : Uu;
        return qu(L3(S, x2), t, e);
      }
      function Su(t, e, n, r) {
        return t === i || Rt(t, Ne[n]) && !W.call(r, n) ? e : t;
      }
      function Ou(t, e, n, r, u2, o3) {
        return K(t) && K(e) && (o3.set(e, t), Yn(t, e, i, Ou, o3), o3.delete(e)), t;
      }
      function ah(t) {
        return gn(t) ? i : t;
      }
      function Ru(t, e, n, r, u2, o3) {
        var c2 = n & Ee, f2 = t.length, l2 = e.length;
        if (f2 != l2 && !(c2 && l2 > f2))
          return false;
        var v3 = o3.get(t), _ = o3.get(e);
        if (v3 && _)
          return v3 == e && _ == t;
        var m3 = -1, C2 = true, x2 = n & mn2 ? new ve() : i;
        for (o3.set(t, e), o3.set(e, t); ++m3 < f2; ) {
          var S = t[m3], L3 = e[m3];
          if (r)
            var O3 = c2 ? r(L3, S, m3, e, t, o3) : r(S, L3, m3, t, e, o3);
          if (O3 !== i) {
            if (O3)
              continue;
            C2 = false;
            break;
          }
          if (x2) {
            if (!$r(e, function(D2, $2) {
              if (!tn(x2, $2) && (S === D2 || u2(S, D2, n, r, o3)))
                return x2.push($2);
            })) {
              C2 = false;
              break;
            }
          } else if (!(S === L3 || u2(S, L3, n, r, o3))) {
            C2 = false;
            break;
          }
        }
        return o3.delete(t), o3.delete(e), C2;
      }
      function oh(t, e, n, r, u2, o3, c2) {
        switch (n) {
          case Re:
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
              return false;
            t = t.buffer, e = e.buffer;
          case je:
            return !(t.byteLength != e.byteLength || !o3(new Nn(t), new Nn(e)));
          case Ye:
          case Ze:
          case Xe:
            return Rt(+t, +e);
          case Cn:
            return t.name == e.name && t.message == e.message;
          case Qe:
          case Ve:
            return t == e + "";
          case Et:
            var f2 = Br;
          case yt:
            var l2 = r & Ee;
            if (f2 || (f2 = Rn), t.size != e.size && !l2)
              return false;
            var v3 = c2.get(t);
            if (v3)
              return v3 == e;
            r |= mn2, c2.set(t, e);
            var _ = Ru(f2(t), f2(e), r, u2, o3, c2);
            return c2.delete(t), _;
          case In:
            if (un)
              return un.call(t) == un.call(e);
        }
        return false;
      }
      function ch(t, e, n, r, u2, o3) {
        var c2 = n & Ee, f2 = pi(t), l2 = f2.length, v3 = pi(e), _ = v3.length;
        if (l2 != _ && !c2)
          return false;
        for (var m3 = l2; m3--; ) {
          var C2 = f2[m3];
          if (!(c2 ? C2 in e : W.call(e, C2)))
            return false;
        }
        var x2 = o3.get(t), S = o3.get(e);
        if (x2 && S)
          return x2 == e && S == t;
        var L3 = true;
        o3.set(t, e), o3.set(e, t);
        for (var O3 = c2; ++m3 < l2; ) {
          C2 = f2[m3];
          var D2 = t[C2], $2 = e[C2];
          if (r)
            var dt = c2 ? r($2, D2, C2, e, t, o3) : r(D2, $2, C2, t, e, o3);
          if (!(dt === i ? D2 === $2 || u2(D2, $2, n, r, o3) : dt)) {
            L3 = false;
            break;
          }
          O3 || (O3 = C2 == "constructor");
        }
        if (L3 && !O3) {
          var st = t.constructor, gt = e.constructor;
          st != gt && "constructor" in t && "constructor" in e && !(typeof st == "function" && st instanceof st && typeof gt == "function" && gt instanceof gt) && (L3 = false);
        }
        return o3.delete(t), o3.delete(e), L3;
      }
      function Xt(t) {
        return Ci(Nu(t, i, zu), t + "");
      }
      function pi(t) {
        return Xs(t, k2, _i);
      }
      function di(t) {
        return Xs(t, ot, bu);
      }
      var gi = Mn ? function(t) {
        return Mn.get(t);
      } : Di;
      function er2(t) {
        for (var e = t.name + "", n = Ue[e], r = W.call(Ue, e) ? n.length : 0; r--; ) {
          var u2 = n[r], o3 = u2.func;
          if (o3 == null || o3 == t)
            return u2.name;
        }
        return e;
      }
      function Me(t) {
        var e = W.call(a, "placeholder") ? a : t;
        return e.placeholder;
      }
      function E3() {
        var t = a.iteratee || Li;
        return t = t === Li ? ks : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function nr(t, e) {
        var n = t.__data__;
        return _h(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
      }
      function vi(t) {
        for (var e = k2(t), n = e.length; n--; ) {
          var r = e[n], u2 = t[r];
          e[n] = [r, u2, Hu(u2)];
        }
        return e;
      }
      function we(t, e) {
        var n = wc(t, e);
        return Vs(n) ? n : i;
      }
      function fh(t) {
        var e = W.call(t, de), n = t[de];
        try {
          t[de] = i;
          var r = true;
        } catch {
        }
        var u2 = Hn.call(t);
        return r && (e ? t[de] = n : delete t[de]), u2;
      }
      var _i = zr ? function(t) {
        return t == null ? [] : (t = M2(t), ne(zr(t), function(e) {
          return $s.call(t, e);
        }));
      } : Ni, bu = zr ? function(t) {
        for (var e = []; t; )
          re(e, _i(t)), t = $n(t);
        return e;
      } : Ni, nt = rt;
      (Kr && nt(new Kr(new ArrayBuffer(1))) != Re || nn && nt(new nn()) != Et || Jr && nt(Jr.resolve()) != Ji || $e && nt(new $e()) != yt || rn && nt(new rn()) != ke) && (nt = function(t) {
        var e = rt(t), n = e == zt ? t.constructor : i, r = n ? Pe(n) : "";
        if (r)
          switch (r) {
            case Kc:
              return Re;
            case Jc:
              return Et;
            case Yc:
              return Ji;
            case Zc:
              return yt;
            case Xc:
              return ke;
          }
        return e;
      });
      function hh(t, e, n) {
        for (var r = -1, u2 = n.length; ++r < u2; ) {
          var o3 = n[r], c2 = o3.size;
          switch (o3.type) {
            case "drop":
              t += c2;
              break;
            case "dropRight":
              e -= c2;
              break;
            case "take":
              e = et(e, t + c2);
              break;
            case "takeRight":
              t = V(t, e - c2);
              break;
          }
        }
        return { start: t, end: e };
      }
      function lh(t) {
        var e = t.match(_o);
        return e ? e[1].split(mo) : [];
      }
      function Tu(t, e, n) {
        e = oe(e, t);
        for (var r = -1, u2 = e.length, o3 = false; ++r < u2; ) {
          var c2 = Wt(e[r]);
          if (!(o3 = t != null && n(t, c2)))
            break;
          t = t[c2];
        }
        return o3 || ++r != u2 ? o3 : (u2 = t == null ? 0 : t.length, !!u2 && cr(u2) && Qt(c2, u2) && (b2(t) || Ce(t)));
      }
      function ph(t) {
        var e = t.length, n = new t.constructor(e);
        return e && typeof t[0] == "string" && W.call(t, "index") && (n.index = t.index, n.input = t.input), n;
      }
      function Lu(t) {
        return typeof t.constructor == "function" && !pn(t) ? qe($n(t)) : {};
      }
      function dh(t, e, n) {
        var r = t.constructor;
        switch (e) {
          case je:
            return fi(t);
          case Ye:
          case Ze:
            return new r(+t);
          case Re:
            return Vf(t, n);
          case vr:
          case _r:
          case mr:
          case wr:
          case Pr:
          case Cr:
          case Ar:
          case Ir:
          case xr:
            return du(t, n);
          case Et:
            return new r();
          case Xe:
          case Ve:
            return new r(t);
          case Qe:
            return kf(t);
          case yt:
            return new r();
          case In:
            return jf(t);
        }
      }
      function gh(t, e) {
        var n = e.length;
        if (!n)
          return t;
        var r = n - 1;
        return e[r] = (n > 1 ? "& " : "") + e[r], e = e.join(n > 2 ? ", " : " "), t.replace(vo, `{
/* [wrapped with ` + e + `] */
`);
      }
      function vh(t) {
        return b2(t) || Ce(t) || !!(Us && t && t[Us]);
      }
      function Qt(t, e) {
        var n = typeof t;
        return e = e ?? ee, !!e && (n == "number" || n != "symbol" && So.test(t)) && t > -1 && t % 1 == 0 && t < e;
      }
      function it2(t, e, n) {
        if (!K(n))
          return false;
        var r = typeof e;
        return (r == "number" ? at(n) && Qt(e, n.length) : r == "string" && e in n) ? Rt(n[e], t) : false;
      }
      function mi(t, e) {
        if (b2(t))
          return false;
        var n = typeof t;
        return n == "number" || n == "symbol" || n == "boolean" || t == null || pt(t) ? true : ho.test(t) || !fo.test(t) || e != null && t in M2(e);
      }
      function _h(t) {
        var e = typeof t;
        return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
      }
      function wi(t) {
        var e = er2(t), n = a[e];
        if (typeof n != "function" || !(e in N2.prototype))
          return false;
        if (t === n)
          return true;
        var r = gi(n);
        return !!r && t === r[0];
      }
      function mh(t) {
        return !!Hs && Hs in t;
      }
      var wh = Tn ? Vt : $i;
      function pn(t) {
        var e = t && t.constructor, n = typeof e == "function" && e.prototype || Ne;
        return t === n;
      }
      function Hu(t) {
        return t === t && !K(t);
      }
      function Du(t, e) {
        return function(n) {
          return n == null ? false : n[t] === e && (e !== i || t in M2(n));
        };
      }
      function Ph(t) {
        var e = ar(t, function(r) {
          return n.size === Ke && n.clear(), r;
        }), n = e.cache;
        return e;
      }
      function Ch(t, e) {
        var n = t[1], r = e[1], u2 = n | r, o3 = u2 < (vt | he | Gt), c2 = r == Gt && n == Nt || r == Gt && n == Je && t[7].length <= e[8] || r == (Gt | Je) && e[7].length <= e[8] && n == Nt;
        if (!(o3 || c2))
          return t;
        r & vt && (t[2] = e[2], u2 |= n & vt ? 0 : Gi);
        var f2 = e[3];
        if (f2) {
          var l2 = t[3];
          t[3] = l2 ? vu(l2, f2, e[4]) : f2, t[4] = l2 ? ie(t[3], Ie) : e[4];
        }
        return f2 = e[5], f2 && (l2 = t[5], t[5] = l2 ? _u(l2, f2, e[6]) : f2, t[6] = l2 ? ie(t[5], Ie) : e[6]), f2 = e[7], f2 && (t[7] = f2), r & Gt && (t[8] = t[8] == null ? e[8] : et(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = u2, t;
      }
      function Ah(t) {
        var e = [];
        if (t != null)
          for (var n in M2(t))
            e.push(n);
        return e;
      }
      function Ih(t) {
        return Hn.call(t);
      }
      function Nu(t, e, n) {
        return e = V(e === i ? t.length - 1 : e, 0), function() {
          for (var r = arguments, u2 = -1, o3 = V(r.length - e, 0), c2 = d2(o3); ++u2 < o3; )
            c2[u2] = r[e + u2];
          u2 = -1;
          for (var f2 = d2(e + 1); ++u2 < e; )
            f2[u2] = r[u2];
          return f2[e] = n(c2), ft(t, this, f2);
        };
      }
      function $u(t, e) {
        return e.length < 2 ? t : me2(t, At(e, 0, -1));
      }
      function xh(t, e) {
        for (var n = t.length, r = et(e.length, n), u2 = ut(t); r--; ) {
          var o3 = e[r];
          t[r] = Qt(o3, n) ? u2[o3] : i;
        }
        return t;
      }
      function Pi(t, e) {
        if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
          return t[e];
      }
      var Uu = Fu(uu), dn = qc || function(t, e) {
        return j3.setTimeout(t, e);
      }, Ci = Fu(Yf);
      function qu(t, e, n) {
        var r = e + "";
        return Ci(t, gh(r, Eh(lh(r), n)));
      }
      function Fu(t) {
        var e = 0, n = 0;
        return function() {
          var r = Bc(), u2 = za - (r - n);
          if (n = r, u2 > 0) {
            if (++e >= Ga)
              return arguments[0];
          } else
            e = 0;
          return t.apply(i, arguments);
        };
      }
      function rr(t, e) {
        var n = -1, r = t.length, u2 = r - 1;
        for (e = e === i ? r : e; ++n < e; ) {
          var o3 = ri(n, u2), c2 = t[o3];
          t[o3] = t[n], t[n] = c2;
        }
        return t.length = e, t;
      }
      var Wu = Ph(function(t) {
        var e = [];
        return t.charCodeAt(0) === 46 && e.push(""), t.replace(lo, function(n, r, u2, o3) {
          e.push(u2 ? o3.replace(Co, "$1") : r || n);
        }), e;
      });
      function Wt(t) {
        if (typeof t == "string" || pt(t))
          return t;
        var e = t + "";
        return e == "0" && 1 / t == -le ? "-0" : e;
      }
      function Pe(t) {
        if (t != null) {
          try {
            return Ln.call(t);
          } catch {
          }
          try {
            return t + "";
          } catch {
          }
        }
        return "";
      }
      function Eh(t, e) {
        return mt(Qa, function(n) {
          var r = "_." + n[0];
          e & n[1] && !Sn(t, r) && t.push(r);
        }), t.sort();
      }
      function Mu(t) {
        if (t instanceof N2)
          return t.clone();
        var e = new Pt(t.__wrapped__, t.__chain__);
        return e.__actions__ = ut(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
      }
      function yh(t, e, n) {
        (n ? it2(t, e, n) : e === i) ? e = 1 : e = V(T3(e), 0);
        var r = t == null ? 0 : t.length;
        if (!r || e < 1)
          return [];
        for (var u2 = 0, o3 = 0, c2 = d2(Fn(r / e)); u2 < r; )
          c2[o3++] = At(t, u2, u2 += e);
        return c2;
      }
      function Sh(t) {
        for (var e = -1, n = t == null ? 0 : t.length, r = 0, u2 = []; ++e < n; ) {
          var o3 = t[e];
          o3 && (u2[r++] = o3);
        }
        return u2;
      }
      function Oh() {
        var t = arguments.length;
        if (!t)
          return [];
        for (var e = d2(t - 1), n = arguments[0], r = t; r--; )
          e[r - 1] = arguments[r];
        return re(b2(n) ? ut(n) : [n], tt(e, 1));
      }
      var Rh = H(function(t, e) {
        return Z(t) ? on(t, tt(e, 1, Z, true)) : [];
      }), bh = H(function(t, e) {
        var n = It(e);
        return Z(n) && (n = i), Z(t) ? on(t, tt(e, 1, Z, true), E3(n, 2)) : [];
      }), Th = H(function(t, e) {
        var n = It(e);
        return Z(n) && (n = i), Z(t) ? on(t, tt(e, 1, Z, true), i, n) : [];
      });
      function Lh(t, e, n) {
        var r = t == null ? 0 : t.length;
        return r ? (e = n || e === i ? 1 : T3(e), At(t, e < 0 ? 0 : e, r)) : [];
      }
      function Hh(t, e, n) {
        var r = t == null ? 0 : t.length;
        return r ? (e = n || e === i ? 1 : T3(e), e = r - e, At(t, 0, e < 0 ? 0 : e)) : [];
      }
      function Dh(t, e) {
        return t && t.length ? Xn(t, E3(e, 3), true, true) : [];
      }
      function Nh(t, e) {
        return t && t.length ? Xn(t, E3(e, 3), true) : [];
      }
      function $h(t, e, n, r) {
        var u2 = t == null ? 0 : t.length;
        return u2 ? (n && typeof n != "number" && it2(t, e, n) && (n = 0, r = u2), Of(t, e, n, r)) : [];
      }
      function Bu(t, e, n) {
        var r = t == null ? 0 : t.length;
        if (!r)
          return -1;
        var u2 = n == null ? 0 : T3(n);
        return u2 < 0 && (u2 = V(r + u2, 0)), On(t, E3(e, 3), u2);
      }
      function Gu(t, e, n) {
        var r = t == null ? 0 : t.length;
        if (!r)
          return -1;
        var u2 = r - 1;
        return n !== i && (u2 = T3(n), u2 = n < 0 ? V(r + u2, 0) : et(u2, r - 1)), On(t, E3(e, 3), u2, true);
      }
      function zu(t) {
        var e = t == null ? 0 : t.length;
        return e ? tt(t, 1) : [];
      }
      function Uh(t) {
        var e = t == null ? 0 : t.length;
        return e ? tt(t, le) : [];
      }
      function qh(t, e) {
        var n = t == null ? 0 : t.length;
        return n ? (e = e === i ? 1 : T3(e), tt(t, e)) : [];
      }
      function Fh(t) {
        for (var e = -1, n = t == null ? 0 : t.length, r = {}; ++e < n; ) {
          var u2 = t[e];
          r[u2[0]] = u2[1];
        }
        return r;
      }
      function Ku(t) {
        return t && t.length ? t[0] : i;
      }
      function Wh(t, e, n) {
        var r = t == null ? 0 : t.length;
        if (!r)
          return -1;
        var u2 = n == null ? 0 : T3(n);
        return u2 < 0 && (u2 = V(r + u2, 0)), Te(t, e, u2);
      }
      function Mh(t) {
        var e = t == null ? 0 : t.length;
        return e ? At(t, 0, -1) : [];
      }
      var Bh = H(function(t) {
        var e = z(t, oi);
        return e.length && e[0] === t[0] ? kr(e) : [];
      }), Gh = H(function(t) {
        var e = It(t), n = z(t, oi);
        return e === It(n) ? e = i : n.pop(), n.length && n[0] === t[0] ? kr(n, E3(e, 2)) : [];
      }), zh = H(function(t) {
        var e = It(t), n = z(t, oi);
        return e = typeof e == "function" ? e : i, e && n.pop(), n.length && n[0] === t[0] ? kr(n, i, e) : [];
      });
      function Kh(t, e) {
        return t == null ? "" : Wc.call(t, e);
      }
      function It(t) {
        var e = t == null ? 0 : t.length;
        return e ? t[e - 1] : i;
      }
      function Jh(t, e, n) {
        var r = t == null ? 0 : t.length;
        if (!r)
          return -1;
        var u2 = r;
        return n !== i && (u2 = T3(n), u2 = u2 < 0 ? V(r + u2, 0) : et(u2, r - 1)), e === e ? xc(t, e, u2) : On(t, Es, u2, true);
      }
      function Yh(t, e) {
        return t && t.length ? nu(t, T3(e)) : i;
      }
      var Zh = H(Ju);
      function Ju(t, e) {
        return t && t.length && e && e.length ? ni(t, e) : t;
      }
      function Xh(t, e, n) {
        return t && t.length && e && e.length ? ni(t, e, E3(n, 2)) : t;
      }
      function Qh(t, e, n) {
        return t && t.length && e && e.length ? ni(t, e, i, n) : t;
      }
      var Vh = Xt(function(t, e) {
        var n = t == null ? 0 : t.length, r = Zr(t, e);
        return su(t, z(e, function(u2) {
          return Qt(u2, n) ? +u2 : u2;
        }).sort(gu)), r;
      });
      function kh(t, e) {
        var n = [];
        if (!(t && t.length))
          return n;
        var r = -1, u2 = [], o3 = t.length;
        for (e = E3(e, 3); ++r < o3; ) {
          var c2 = t[r];
          e(c2, r, t) && (n.push(c2), u2.push(r));
        }
        return su(t, u2), n;
      }
      function Ai(t) {
        return t == null ? t : zc.call(t);
      }
      function jh(t, e, n) {
        var r = t == null ? 0 : t.length;
        return r ? (n && typeof n != "number" && it2(t, e, n) ? (e = 0, n = r) : (e = e == null ? 0 : T3(e), n = n === i ? r : T3(n)), At(t, e, n)) : [];
      }
      function tl(t, e) {
        return Zn(t, e);
      }
      function el(t, e, n) {
        return si(t, e, E3(n, 2));
      }
      function nl(t, e) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var r = Zn(t, e);
          if (r < n && Rt(t[r], e))
            return r;
        }
        return -1;
      }
      function rl(t, e) {
        return Zn(t, e, true);
      }
      function il(t, e, n) {
        return si(t, e, E3(n, 2), true);
      }
      function sl(t, e) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var r = Zn(t, e, true) - 1;
          if (Rt(t[r], e))
            return r;
        }
        return -1;
      }
      function ul(t) {
        return t && t.length ? au(t) : [];
      }
      function al(t, e) {
        return t && t.length ? au(t, E3(e, 2)) : [];
      }
      function ol(t) {
        var e = t == null ? 0 : t.length;
        return e ? At(t, 1, e) : [];
      }
      function cl(t, e, n) {
        return t && t.length ? (e = n || e === i ? 1 : T3(e), At(t, 0, e < 0 ? 0 : e)) : [];
      }
      function fl(t, e, n) {
        var r = t == null ? 0 : t.length;
        return r ? (e = n || e === i ? 1 : T3(e), e = r - e, At(t, e < 0 ? 0 : e, r)) : [];
      }
      function hl(t, e) {
        return t && t.length ? Xn(t, E3(e, 3), false, true) : [];
      }
      function ll(t, e) {
        return t && t.length ? Xn(t, E3(e, 3)) : [];
      }
      var pl = H(function(t) {
        return ae(tt(t, 1, Z, true));
      }), dl = H(function(t) {
        var e = It(t);
        return Z(e) && (e = i), ae(tt(t, 1, Z, true), E3(e, 2));
      }), gl = H(function(t) {
        var e = It(t);
        return e = typeof e == "function" ? e : i, ae(tt(t, 1, Z, true), i, e);
      });
      function vl(t) {
        return t && t.length ? ae(t) : [];
      }
      function _l(t, e) {
        return t && t.length ? ae(t, E3(e, 2)) : [];
      }
      function ml(t, e) {
        return e = typeof e == "function" ? e : i, t && t.length ? ae(t, i, e) : [];
      }
      function Ii(t) {
        if (!(t && t.length))
          return [];
        var e = 0;
        return t = ne(t, function(n) {
          if (Z(n))
            return e = V(n.length, e), true;
        }), Wr(e, function(n) {
          return z(t, Ur(n));
        });
      }
      function Yu(t, e) {
        if (!(t && t.length))
          return [];
        var n = Ii(t);
        return e == null ? n : z(n, function(r) {
          return ft(e, i, r);
        });
      }
      var wl = H(function(t, e) {
        return Z(t) ? on(t, e) : [];
      }), Pl = H(function(t) {
        return ai(ne(t, Z));
      }), Cl = H(function(t) {
        var e = It(t);
        return Z(e) && (e = i), ai(ne(t, Z), E3(e, 2));
      }), Al = H(function(t) {
        var e = It(t);
        return e = typeof e == "function" ? e : i, ai(ne(t, Z), i, e);
      }), Il = H(Ii);
      function xl(t, e) {
        return hu(t || [], e || [], an);
      }
      function El(t, e) {
        return hu(t || [], e || [], hn);
      }
      var yl = H(function(t) {
        var e = t.length, n = e > 1 ? t[e - 1] : i;
        return n = typeof n == "function" ? (t.pop(), n) : i, Yu(t, n);
      });
      function Zu(t) {
        var e = a(t);
        return e.__chain__ = true, e;
      }
      function Sl(t, e) {
        return e(t), t;
      }
      function ir(t, e) {
        return e(t);
      }
      var Ol = Xt(function(t) {
        var e = t.length, n = e ? t[0] : 0, r = this.__wrapped__, u2 = function(o3) {
          return Zr(o3, t);
        };
        return e > 1 || this.__actions__.length || !(r instanceof N2) || !Qt(n) ? this.thru(u2) : (r = r.slice(n, +n + (e ? 1 : 0)), r.__actions__.push({ func: ir, args: [u2], thisArg: i }), new Pt(r, this.__chain__).thru(function(o3) {
          return e && !o3.length && o3.push(i), o3;
        }));
      });
      function Rl() {
        return Zu(this);
      }
      function bl() {
        return new Pt(this.value(), this.__chain__);
      }
      function Tl() {
        this.__values__ === i && (this.__values__ = oa(this.value()));
        var t = this.__index__ >= this.__values__.length, e = t ? i : this.__values__[this.__index__++];
        return { done: t, value: e };
      }
      function Ll() {
        return this;
      }
      function Hl(t) {
        for (var e, n = this; n instanceof Gn; ) {
          var r = Mu(n);
          r.__index__ = 0, r.__values__ = i, e ? u2.__wrapped__ = r : e = r;
          var u2 = r;
          n = n.__wrapped__;
        }
        return u2.__wrapped__ = t, e;
      }
      function Dl() {
        var t = this.__wrapped__;
        if (t instanceof N2) {
          var e = t;
          return this.__actions__.length && (e = new N2(this)), e = e.reverse(), e.__actions__.push({ func: ir, args: [Ai], thisArg: i }), new Pt(e, this.__chain__);
        }
        return this.thru(Ai);
      }
      function Nl() {
        return fu(this.__wrapped__, this.__actions__);
      }
      var $l = Qn(function(t, e, n) {
        W.call(t, n) ? ++t[n] : Yt(t, n, 1);
      });
      function Ul(t, e, n) {
        var r = b2(t) ? Is : Sf;
        return n && it2(t, e, n) && (e = i), r(t, E3(e, 3));
      }
      function ql(t, e) {
        var n = b2(t) ? ne : Ys;
        return n(t, E3(e, 3));
      }
      var Fl = Cu(Bu), Wl = Cu(Gu);
      function Ml(t, e) {
        return tt(sr(t, e), 1);
      }
      function Bl(t, e) {
        return tt(sr(t, e), le);
      }
      function Gl(t, e, n) {
        return n = n === i ? 1 : T3(n), tt(sr(t, e), n);
      }
      function Xu(t, e) {
        var n = b2(t) ? mt : ue;
        return n(t, E3(e, 3));
      }
      function Qu(t, e) {
        var n = b2(t) ? ac : Js;
        return n(t, E3(e, 3));
      }
      var zl = Qn(function(t, e, n) {
        W.call(t, n) ? t[n].push(e) : Yt(t, n, [e]);
      });
      function Kl(t, e, n, r) {
        t = at(t) ? t : Ge(t), n = n && !r ? T3(n) : 0;
        var u2 = t.length;
        return n < 0 && (n = V(u2 + n, 0)), fr(t) ? n <= u2 && t.indexOf(e, n) > -1 : !!u2 && Te(t, e, n) > -1;
      }
      var Jl = H(function(t, e, n) {
        var r = -1, u2 = typeof e == "function", o3 = at(t) ? d2(t.length) : [];
        return ue(t, function(c2) {
          o3[++r] = u2 ? ft(e, c2, n) : cn(c2, e, n);
        }), o3;
      }), Yl = Qn(function(t, e, n) {
        Yt(t, n, e);
      });
      function sr(t, e) {
        var n = b2(t) ? z : js;
        return n(t, E3(e, 3));
      }
      function Zl(t, e, n, r) {
        return t == null ? [] : (b2(e) || (e = e == null ? [] : [e]), n = r ? i : n, b2(n) || (n = n == null ? [] : [n]), ru(t, e, n));
      }
      var Xl = Qn(function(t, e, n) {
        t[n ? 0 : 1].push(e);
      }, function() {
        return [[], []];
      });
      function Ql(t, e, n) {
        var r = b2(t) ? Nr2 : Ss, u2 = arguments.length < 3;
        return r(t, E3(e, 4), n, u2, ue);
      }
      function Vl(t, e, n) {
        var r = b2(t) ? oc : Ss, u2 = arguments.length < 3;
        return r(t, E3(e, 4), n, u2, Js);
      }
      function kl(t, e) {
        var n = b2(t) ? ne : Ys;
        return n(t, or(E3(e, 3)));
      }
      function jl(t) {
        var e = b2(t) ? Bs : Kf;
        return e(t);
      }
      function tp(t, e, n) {
        (n ? it2(t, e, n) : e === i) ? e = 1 : e = T3(e);
        var r = b2(t) ? Af : Jf;
        return r(t, e);
      }
      function ep(t) {
        var e = b2(t) ? If : Zf;
        return e(t);
      }
      function np(t) {
        if (t == null)
          return 0;
        if (at(t))
          return fr(t) ? He(t) : t.length;
        var e = nt(t);
        return e == Et || e == yt ? t.size : ti(t).length;
      }
      function rp(t, e, n) {
        var r = b2(t) ? $r : Xf;
        return n && it2(t, e, n) && (e = i), r(t, E3(e, 3));
      }
      var ip = H(function(t, e) {
        if (t == null)
          return [];
        var n = e.length;
        return n > 1 && it2(t, e[0], e[1]) ? e = [] : n > 2 && it2(e[0], e[1], e[2]) && (e = [e[0]]), ru(t, tt(e, 1), []);
      }), ur = Uc || function() {
        return j3.Date.now();
      };
      function sp(t, e) {
        if (typeof e != "function")
          throw new wt(y2);
        return t = T3(t), function() {
          if (--t < 1)
            return e.apply(this, arguments);
        };
      }
      function Vu(t, e, n) {
        return e = n ? i : e, e = t && e == null ? t.length : e, Zt(t, Gt, i, i, i, i, e);
      }
      function ku(t, e) {
        var n;
        if (typeof e != "function")
          throw new wt(y2);
        return t = T3(t), function() {
          return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = i), n;
        };
      }
      var xi = H(function(t, e, n) {
        var r = vt;
        if (n.length) {
          var u2 = ie(n, Me(xi));
          r |= $t;
        }
        return Zt(t, r, e, n, u2);
      }), ju = H(function(t, e, n) {
        var r = vt | he;
        if (n.length) {
          var u2 = ie(n, Me(ju));
          r |= $t;
        }
        return Zt(e, r, t, n, u2);
      });
      function ta(t, e, n) {
        e = n ? i : e;
        var r = Zt(t, Nt, i, i, i, i, i, e);
        return r.placeholder = ta.placeholder, r;
      }
      function ea(t, e, n) {
        e = n ? i : e;
        var r = Zt(t, ye, i, i, i, i, i, e);
        return r.placeholder = ea.placeholder, r;
      }
      function na(t, e, n) {
        var r, u2, o3, c2, f2, l2, v3 = 0, _ = false, m3 = false, C2 = true;
        if (typeof t != "function")
          throw new wt(y2);
        e = xt(e) || 0, K(n) && (_ = !!n.leading, m3 = "maxWait" in n, o3 = m3 ? V(xt(n.maxWait) || 0, e) : o3, C2 = "trailing" in n ? !!n.trailing : C2);
        function x2(X) {
          var bt = r, jt = u2;
          return r = u2 = i, v3 = X, c2 = t.apply(jt, bt), c2;
        }
        function S(X) {
          return v3 = X, f2 = dn(D2, e), _ ? x2(X) : c2;
        }
        function L3(X) {
          var bt = X - l2, jt = X - v3, Ca = e - bt;
          return m3 ? et(Ca, o3 - jt) : Ca;
        }
        function O3(X) {
          var bt = X - l2, jt = X - v3;
          return l2 === i || bt >= e || bt < 0 || m3 && jt >= o3;
        }
        function D2() {
          var X = ur();
          if (O3(X))
            return $2(X);
          f2 = dn(D2, L3(X));
        }
        function $2(X) {
          return f2 = i, C2 && r ? x2(X) : (r = u2 = i, c2);
        }
        function dt() {
          f2 !== i && lu(f2), v3 = 0, r = l2 = u2 = f2 = i;
        }
        function st() {
          return f2 === i ? c2 : $2(ur());
        }
        function gt() {
          var X = ur(), bt = O3(X);
          if (r = arguments, u2 = this, l2 = X, bt) {
            if (f2 === i)
              return S(l2);
            if (m3)
              return lu(f2), f2 = dn(D2, e), x2(l2);
          }
          return f2 === i && (f2 = dn(D2, e)), c2;
        }
        return gt.cancel = dt, gt.flush = st, gt;
      }
      var up = H(function(t, e) {
        return Ks(t, 1, e);
      }), ap = H(function(t, e, n) {
        return Ks(t, xt(e) || 0, n);
      });
      function op(t) {
        return Zt(t, gr);
      }
      function ar(t, e) {
        if (typeof t != "function" || e != null && typeof e != "function")
          throw new wt(y2);
        var n = function() {
          var r = arguments, u2 = e ? e.apply(this, r) : r[0], o3 = n.cache;
          if (o3.has(u2))
            return o3.get(u2);
          var c2 = t.apply(this, r);
          return n.cache = o3.set(u2, c2) || o3, c2;
        };
        return n.cache = new (ar.Cache || Jt)(), n;
      }
      ar.Cache = Jt;
      function or(t) {
        if (typeof t != "function")
          throw new wt(y2);
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return !t.call(this);
            case 1:
              return !t.call(this, e[0]);
            case 2:
              return !t.call(this, e[0], e[1]);
            case 3:
              return !t.call(this, e[0], e[1], e[2]);
          }
          return !t.apply(this, e);
        };
      }
      function cp(t) {
        return ku(2, t);
      }
      var fp = Qf(function(t, e) {
        e = e.length == 1 && b2(e[0]) ? z(e[0], ht(E3())) : z(tt(e, 1), ht(E3()));
        var n = e.length;
        return H(function(r) {
          for (var u2 = -1, o3 = et(r.length, n); ++u2 < o3; )
            r[u2] = e[u2].call(this, r[u2]);
          return ft(t, this, r);
        });
      }), Ei = H(function(t, e) {
        var n = ie(e, Me(Ei));
        return Zt(t, $t, i, e, n);
      }), ra = H(function(t, e) {
        var n = ie(e, Me(ra));
        return Zt(t, Se, i, e, n);
      }), hp = Xt(function(t, e) {
        return Zt(t, Je, i, i, i, e);
      });
      function lp(t, e) {
        if (typeof t != "function")
          throw new wt(y2);
        return e = e === i ? e : T3(e), H(t, e);
      }
      function pp(t, e) {
        if (typeof t != "function")
          throw new wt(y2);
        return e = e == null ? 0 : V(T3(e), 0), H(function(n) {
          var r = n[e], u2 = ce(n, 0, e);
          return r && re(u2, r), ft(t, this, u2);
        });
      }
      function dp(t, e, n) {
        var r = true, u2 = true;
        if (typeof t != "function")
          throw new wt(y2);
        return K(n) && (r = "leading" in n ? !!n.leading : r, u2 = "trailing" in n ? !!n.trailing : u2), na(t, e, { leading: r, maxWait: e, trailing: u2 });
      }
      function gp(t) {
        return Vu(t, 1);
      }
      function vp(t, e) {
        return Ei(ci(e), t);
      }
      function _p() {
        if (!arguments.length)
          return [];
        var t = arguments[0];
        return b2(t) ? t : [t];
      }
      function mp(t) {
        return Ct(t, xe);
      }
      function wp(t, e) {
        return e = typeof e == "function" ? e : i, Ct(t, xe, e);
      }
      function Pp(t) {
        return Ct(t, Dt | xe);
      }
      function Cp(t, e) {
        return e = typeof e == "function" ? e : i, Ct(t, Dt | xe, e);
      }
      function Ap(t, e) {
        return e == null || zs(t, e, k2(e));
      }
      function Rt(t, e) {
        return t === e || t !== t && e !== e;
      }
      var Ip = tr(Vr), xp = tr(function(t, e) {
        return t >= e;
      }), Ce = Qs(function() {
        return arguments;
      }()) ? Qs : function(t) {
        return Y(t) && W.call(t, "callee") && !$s.call(t, "callee");
      }, b2 = d2.isArray, Ep = _s ? ht(_s) : Hf;
      function at(t) {
        return t != null && cr(t.length) && !Vt(t);
      }
      function Z(t) {
        return Y(t) && at(t);
      }
      function yp(t) {
        return t === true || t === false || Y(t) && rt(t) == Ye;
      }
      var fe = Fc || $i, Sp = ms ? ht(ms) : Df;
      function Op(t) {
        return Y(t) && t.nodeType === 1 && !gn(t);
      }
      function Rp(t) {
        if (t == null)
          return true;
        if (at(t) && (b2(t) || typeof t == "string" || typeof t.splice == "function" || fe(t) || Be(t) || Ce(t)))
          return !t.length;
        var e = nt(t);
        if (e == Et || e == yt)
          return !t.size;
        if (pn(t))
          return !ti(t).length;
        for (var n in t)
          if (W.call(t, n))
            return false;
        return true;
      }
      function bp(t, e) {
        return fn2(t, e);
      }
      function Tp(t, e, n) {
        n = typeof n == "function" ? n : i;
        var r = n ? n(t, e) : i;
        return r === i ? fn2(t, e, i, n) : !!r;
      }
      function yi(t) {
        if (!Y(t))
          return false;
        var e = rt(t);
        return e == Cn || e == ka || typeof t.message == "string" && typeof t.name == "string" && !gn(t);
      }
      function Lp(t) {
        return typeof t == "number" && qs(t);
      }
      function Vt(t) {
        if (!K(t))
          return false;
        var e = rt(t);
        return e == An || e == Ki || e == Va || e == to;
      }
      function ia(t) {
        return typeof t == "number" && t == T3(t);
      }
      function cr(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ee;
      }
      function K(t) {
        var e = typeof t;
        return t != null && (e == "object" || e == "function");
      }
      function Y(t) {
        return t != null && typeof t == "object";
      }
      var sa = ws ? ht(ws) : $f;
      function Hp(t, e) {
        return t === e || jr(t, e, vi(e));
      }
      function Dp(t, e, n) {
        return n = typeof n == "function" ? n : i, jr(t, e, vi(e), n);
      }
      function Np(t) {
        return ua(t) && t != +t;
      }
      function $p(t) {
        if (wh(t))
          throw new R2(I);
        return Vs(t);
      }
      function Up(t) {
        return t === null;
      }
      function qp(t) {
        return t == null;
      }
      function ua(t) {
        return typeof t == "number" || Y(t) && rt(t) == Xe;
      }
      function gn(t) {
        if (!Y(t) || rt(t) != zt)
          return false;
        var e = $n(t);
        if (e === null)
          return true;
        var n = W.call(e, "constructor") && e.constructor;
        return typeof n == "function" && n instanceof n && Ln.call(n) == Hc;
      }
      var Si = Ps ? ht(Ps) : Uf;
      function Fp(t) {
        return ia(t) && t >= -ee && t <= ee;
      }
      var aa = Cs ? ht(Cs) : qf;
      function fr(t) {
        return typeof t == "string" || !b2(t) && Y(t) && rt(t) == Ve;
      }
      function pt(t) {
        return typeof t == "symbol" || Y(t) && rt(t) == In;
      }
      var Be = As ? ht(As) : Ff;
      function Wp(t) {
        return t === i;
      }
      function Mp(t) {
        return Y(t) && nt(t) == ke;
      }
      function Bp(t) {
        return Y(t) && rt(t) == no;
      }
      var Gp = tr(ei), zp = tr(function(t, e) {
        return t <= e;
      });
      function oa(t) {
        if (!t)
          return [];
        if (at(t))
          return fr(t) ? St(t) : ut(t);
        if (en && t[en])
          return Cc(t[en]());
        var e = nt(t), n = e == Et ? Br : e == yt ? Rn : Ge;
        return n(t);
      }
      function kt(t) {
        if (!t)
          return t === 0 ? t : 0;
        if (t = xt(t), t === le || t === -le) {
          var e = t < 0 ? -1 : 1;
          return e * Ya;
        }
        return t === t ? t : 0;
      }
      function T3(t) {
        var e = kt(t), n = e % 1;
        return e === e ? n ? e - n : e : 0;
      }
      function ca(t) {
        return t ? _e2(T3(t), 0, Ut) : 0;
      }
      function xt(t) {
        if (typeof t == "number")
          return t;
        if (pt(t))
          return wn;
        if (K(t)) {
          var e = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = K(e) ? e + "" : e;
        }
        if (typeof t != "string")
          return t === 0 ? t : +t;
        t = Os(t);
        var n = xo.test(t);
        return n || yo.test(t) ? ic(t.slice(2), n ? 2 : 8) : Io.test(t) ? wn : +t;
      }
      function fa(t) {
        return Ft(t, ot(t));
      }
      function Kp(t) {
        return t ? _e2(T3(t), -ee, ee) : t === 0 ? t : 0;
      }
      function q2(t) {
        return t == null ? "" : lt(t);
      }
      var Jp = Fe(function(t, e) {
        if (pn(e) || at(e)) {
          Ft(e, k2(e), t);
          return;
        }
        for (var n in e)
          W.call(e, n) && an(t, n, e[n]);
      }), ha = Fe(function(t, e) {
        Ft(e, ot(e), t);
      }), hr = Fe(function(t, e, n, r) {
        Ft(e, ot(e), t, r);
      }), Yp = Fe(function(t, e, n, r) {
        Ft(e, k2(e), t, r);
      }), Zp = Xt(Zr);
      function Xp(t, e) {
        var n = qe(t);
        return e == null ? n : Gs(n, e);
      }
      var Qp = H(function(t, e) {
        t = M2(t);
        var n = -1, r = e.length, u2 = r > 2 ? e[2] : i;
        for (u2 && it2(e[0], e[1], u2) && (r = 1); ++n < r; )
          for (var o3 = e[n], c2 = ot(o3), f2 = -1, l2 = c2.length; ++f2 < l2; ) {
            var v3 = c2[f2], _ = t[v3];
            (_ === i || Rt(_, Ne[v3]) && !W.call(t, v3)) && (t[v3] = o3[v3]);
          }
        return t;
      }), Vp = H(function(t) {
        return t.push(i, Ou), ft(la, i, t);
      });
      function kp(t, e) {
        return xs(t, E3(e, 3), qt);
      }
      function jp(t, e) {
        return xs(t, E3(e, 3), Qr);
      }
      function td(t, e) {
        return t == null ? t : Xr2(t, E3(e, 3), ot);
      }
      function ed(t, e) {
        return t == null ? t : Zs(t, E3(e, 3), ot);
      }
      function nd(t, e) {
        return t && qt(t, E3(e, 3));
      }
      function rd(t, e) {
        return t && Qr(t, E3(e, 3));
      }
      function id(t) {
        return t == null ? [] : Jn(t, k2(t));
      }
      function sd(t) {
        return t == null ? [] : Jn(t, ot(t));
      }
      function Oi(t, e, n) {
        var r = t == null ? i : me2(t, e);
        return r === i ? n : r;
      }
      function ud(t, e) {
        return t != null && Tu(t, e, Rf);
      }
      function Ri(t, e) {
        return t != null && Tu(t, e, bf);
      }
      var ad = Iu(function(t, e, n) {
        e != null && typeof e.toString != "function" && (e = Hn.call(e)), t[e] = n;
      }, Ti(ct)), od = Iu(function(t, e, n) {
        e != null && typeof e.toString != "function" && (e = Hn.call(e)), W.call(t, e) ? t[e].push(n) : t[e] = [n];
      }, E3), cd = H(cn);
      function k2(t) {
        return at(t) ? Ms(t) : ti(t);
      }
      function ot(t) {
        return at(t) ? Ms(t, true) : Wf(t);
      }
      function fd(t, e) {
        var n = {};
        return e = E3(e, 3), qt(t, function(r, u2, o3) {
          Yt(n, e(r, u2, o3), r);
        }), n;
      }
      function hd(t, e) {
        var n = {};
        return e = E3(e, 3), qt(t, function(r, u2, o3) {
          Yt(n, u2, e(r, u2, o3));
        }), n;
      }
      var ld = Fe(function(t, e, n) {
        Yn(t, e, n);
      }), la = Fe(function(t, e, n, r) {
        Yn(t, e, n, r);
      }), pd = Xt(function(t, e) {
        var n = {};
        if (t == null)
          return n;
        var r = false;
        e = z(e, function(o3) {
          return o3 = oe(o3, t), r || (r = o3.length > 1), o3;
        }), Ft(t, di(t), n), r && (n = Ct(n, Dt | Bt | xe, ah));
        for (var u2 = e.length; u2--; )
          ui(n, e[u2]);
        return n;
      });
      function dd(t, e) {
        return pa(t, or(E3(e)));
      }
      var gd = Xt(function(t, e) {
        return t == null ? {} : Bf(t, e);
      });
      function pa(t, e) {
        if (t == null)
          return {};
        var n = z(di(t), function(r) {
          return [r];
        });
        return e = E3(e), iu(t, n, function(r, u2) {
          return e(r, u2[0]);
        });
      }
      function vd(t, e, n) {
        e = oe(e, t);
        var r = -1, u2 = e.length;
        for (u2 || (u2 = 1, t = i); ++r < u2; ) {
          var o3 = t == null ? i : t[Wt(e[r])];
          o3 === i && (r = u2, o3 = n), t = Vt(o3) ? o3.call(t) : o3;
        }
        return t;
      }
      function _d(t, e, n) {
        return t == null ? t : hn(t, e, n);
      }
      function md(t, e, n, r) {
        return r = typeof r == "function" ? r : i, t == null ? t : hn(t, e, n, r);
      }
      var da = yu(k2), ga = yu(ot);
      function wd(t, e, n) {
        var r = b2(t), u2 = r || fe(t) || Be(t);
        if (e = E3(e, 4), n == null) {
          var o3 = t && t.constructor;
          u2 ? n = r ? new o3() : [] : K(t) ? n = Vt(o3) ? qe($n(t)) : {} : n = {};
        }
        return (u2 ? mt : qt)(t, function(c2, f2, l2) {
          return e(n, c2, f2, l2);
        }), n;
      }
      function Pd(t, e) {
        return t == null ? true : ui(t, e);
      }
      function Cd(t, e, n) {
        return t == null ? t : cu(t, e, ci(n));
      }
      function Ad(t, e, n, r) {
        return r = typeof r == "function" ? r : i, t == null ? t : cu(t, e, ci(n), r);
      }
      function Ge(t) {
        return t == null ? [] : Mr(t, k2(t));
      }
      function Id(t) {
        return t == null ? [] : Mr(t, ot(t));
      }
      function xd(t, e, n) {
        return n === i && (n = e, e = i), n !== i && (n = xt(n), n = n === n ? n : 0), e !== i && (e = xt(e), e = e === e ? e : 0), _e2(xt(t), e, n);
      }
      function Ed(t, e, n) {
        return e = kt(e), n === i ? (n = e, e = 0) : n = kt(n), t = xt(t), Tf(t, e, n);
      }
      function yd(t, e, n) {
        if (n && typeof n != "boolean" && it2(t, e, n) && (e = n = i), n === i && (typeof e == "boolean" ? (n = e, e = i) : typeof t == "boolean" && (n = t, t = i)), t === i && e === i ? (t = 0, e = 1) : (t = kt(t), e === i ? (e = t, t = 0) : e = kt(e)), t > e) {
          var r = t;
          t = e, e = r;
        }
        if (n || t % 1 || e % 1) {
          var u2 = Fs();
          return et(t + u2 * (e - t + rc("1e-" + ((u2 + "").length - 1))), e);
        }
        return ri(t, e);
      }
      var Sd = We(function(t, e, n) {
        return e = e.toLowerCase(), t + (n ? va(e) : e);
      });
      function va(t) {
        return bi(q2(t).toLowerCase());
      }
      function _a(t) {
        return t = q2(t), t && t.replace(Oo, vc).replace(Yo, "");
      }
      function Od(t, e, n) {
        t = q2(t), e = lt(e);
        var r = t.length;
        n = n === i ? r : _e2(T3(n), 0, r);
        var u2 = n;
        return n -= e.length, n >= 0 && t.slice(n, u2) == e;
      }
      function Rd(t) {
        return t = q2(t), t && ao.test(t) ? t.replace(Zi, _c) : t;
      }
      function bd(t) {
        return t = q2(t), t && po.test(t) ? t.replace(Er, "\\$&") : t;
      }
      var Td = We(function(t, e, n) {
        return t + (n ? "-" : "") + e.toLowerCase();
      }), Ld = We(function(t, e, n) {
        return t + (n ? " " : "") + e.toLowerCase();
      }), Hd = Pu("toLowerCase");
      function Dd(t, e, n) {
        t = q2(t), e = T3(e);
        var r = e ? He(t) : 0;
        if (!e || r >= e)
          return t;
        var u2 = (e - r) / 2;
        return jn(Wn(u2), n) + t + jn(Fn(u2), n);
      }
      function Nd(t, e, n) {
        t = q2(t), e = T3(e);
        var r = e ? He(t) : 0;
        return e && r < e ? t + jn(e - r, n) : t;
      }
      function $d(t, e, n) {
        t = q2(t), e = T3(e);
        var r = e ? He(t) : 0;
        return e && r < e ? jn(e - r, n) + t : t;
      }
      function Ud(t, e, n) {
        return n || e == null ? e = 0 : e && (e = +e), Gc(q2(t).replace(yr, ""), e || 0);
      }
      function qd(t, e, n) {
        return (n ? it2(t, e, n) : e === i) ? e = 1 : e = T3(e), ii(q2(t), e);
      }
      function Fd() {
        var t = arguments, e = q2(t[0]);
        return t.length < 3 ? e : e.replace(t[1], t[2]);
      }
      var Wd = We(function(t, e, n) {
        return t + (n ? "_" : "") + e.toLowerCase();
      });
      function Md(t, e, n) {
        return n && typeof n != "number" && it2(t, e, n) && (e = n = i), n = n === i ? Ut : n >>> 0, n ? (t = q2(t), t && (typeof e == "string" || e != null && !Si(e)) && (e = lt(e), !e && Le(t)) ? ce(St(t), 0, n) : t.split(e, n)) : [];
      }
      var Bd = We(function(t, e, n) {
        return t + (n ? " " : "") + bi(e);
      });
      function Gd(t, e, n) {
        return t = q2(t), n = n == null ? 0 : _e2(T3(n), 0, t.length), e = lt(e), t.slice(n, n + e.length) == e;
      }
      function zd(t, e, n) {
        var r = a.templateSettings;
        n && it2(t, e, n) && (e = i), t = q2(t), e = hr({}, e, r, Su);
        var u2 = hr({}, e.imports, r.imports, Su), o3 = k2(u2), c2 = Mr(u2, o3), f2, l2, v3 = 0, _ = e.interpolate || xn, m3 = "__p += '", C2 = Gr((e.escape || xn).source + "|" + _.source + "|" + (_ === Xi ? Ao2 : xn).source + "|" + (e.evaluate || xn).source + "|$", "g"), x2 = "//# sourceURL=" + (W.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ko + "]") + `
`;
        t.replace(C2, function(O3, D2, $2, dt, st, gt) {
          return $2 || ($2 = dt), m3 += t.slice(v3, gt).replace(Ro, mc), D2 && (f2 = true, m3 += `' +
__e(` + D2 + `) +
'`), st && (l2 = true, m3 += `';
` + st + `;
__p += '`), $2 && (m3 += `' +
((__t = (` + $2 + `)) == null ? '' : __t) +
'`), v3 = gt + O3.length, O3;
        }), m3 += `';
`;
        var S = W.call(e, "variable") && e.variable;
        if (!S)
          m3 = `with (obj) {
` + m3 + `
}
`;
        else if (Po.test(S))
          throw new R2(J);
        m3 = (l2 ? m3.replace(ro, "") : m3).replace(io, "$1").replace(so, "$1;"), m3 = "function(" + (S || "obj") + `) {
` + (S ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f2 ? ", __e = _.escape" : "") + (l2 ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + m3 + `return __p
}`;
        var L3 = wa(function() {
          return U3(o3, x2 + "return " + m3).apply(i, c2);
        });
        if (L3.source = m3, yi(L3))
          throw L3;
        return L3;
      }
      function Kd(t) {
        return q2(t).toLowerCase();
      }
      function Jd(t) {
        return q2(t).toUpperCase();
      }
      function Yd(t, e, n) {
        if (t = q2(t), t && (n || e === i))
          return Os(t);
        if (!t || !(e = lt(e)))
          return t;
        var r = St(t), u2 = St(e), o3 = Rs(r, u2), c2 = bs(r, u2) + 1;
        return ce(r, o3, c2).join("");
      }
      function Zd(t, e, n) {
        if (t = q2(t), t && (n || e === i))
          return t.slice(0, Ls(t) + 1);
        if (!t || !(e = lt(e)))
          return t;
        var r = St(t), u2 = bs(r, St(e)) + 1;
        return ce(r, 0, u2).join("");
      }
      function Xd(t, e, n) {
        if (t = q2(t), t && (n || e === i))
          return t.replace(yr, "");
        if (!t || !(e = lt(e)))
          return t;
        var r = St(t), u2 = Rs(r, St(e));
        return ce(r, u2).join("");
      }
      function Qd(t, e) {
        var n = Ma, r = Ba;
        if (K(e)) {
          var u2 = "separator" in e ? e.separator : u2;
          n = "length" in e ? T3(e.length) : n, r = "omission" in e ? lt(e.omission) : r;
        }
        t = q2(t);
        var o3 = t.length;
        if (Le(t)) {
          var c2 = St(t);
          o3 = c2.length;
        }
        if (n >= o3)
          return t;
        var f2 = n - He(r);
        if (f2 < 1)
          return r;
        var l2 = c2 ? ce(c2, 0, f2).join("") : t.slice(0, f2);
        if (u2 === i)
          return l2 + r;
        if (c2 && (f2 += l2.length - f2), Si(u2)) {
          if (t.slice(f2).search(u2)) {
            var v3, _ = l2;
            for (u2.global || (u2 = Gr(u2.source, q2(Qi.exec(u2)) + "g")), u2.lastIndex = 0; v3 = u2.exec(_); )
              var m3 = v3.index;
            l2 = l2.slice(0, m3 === i ? f2 : m3);
          }
        } else if (t.indexOf(lt(u2), f2) != f2) {
          var C2 = l2.lastIndexOf(u2);
          C2 > -1 && (l2 = l2.slice(0, C2));
        }
        return l2 + r;
      }
      function Vd(t) {
        return t = q2(t), t && uo.test(t) ? t.replace(Yi, Ec) : t;
      }
      var kd = We(function(t, e, n) {
        return t + (n ? " " : "") + e.toUpperCase();
      }), bi = Pu("toUpperCase");
      function ma(t, e, n) {
        return t = q2(t), e = n ? i : e, e === i ? Pc(t) ? Oc(t) : hc(t) : t.match(e) || [];
      }
      var wa = H(function(t, e) {
        try {
          return ft(t, i, e);
        } catch (n) {
          return yi(n) ? n : new R2(n);
        }
      }), jd = Xt(function(t, e) {
        return mt(e, function(n) {
          n = Wt(n), Yt(t, n, xi(t[n], t));
        }), t;
      });
      function tg(t) {
        var e = t == null ? 0 : t.length, n = E3();
        return t = e ? z(t, function(r) {
          if (typeof r[1] != "function")
            throw new wt(y2);
          return [n(r[0]), r[1]];
        }) : [], H(function(r) {
          for (var u2 = -1; ++u2 < e; ) {
            var o3 = t[u2];
            if (ft(o3[0], this, r))
              return ft(o3[1], this, r);
          }
        });
      }
      function eg(t) {
        return yf(Ct(t, Dt));
      }
      function Ti(t) {
        return function() {
          return t;
        };
      }
      function ng(t, e) {
        return t == null || t !== t ? e : t;
      }
      var rg = Au(), ig = Au(true);
      function ct(t) {
        return t;
      }
      function Li(t) {
        return ks(typeof t == "function" ? t : Ct(t, Dt));
      }
      function sg(t) {
        return tu(Ct(t, Dt));
      }
      function ug(t, e) {
        return eu(t, Ct(e, Dt));
      }
      var ag = H(function(t, e) {
        return function(n) {
          return cn(n, t, e);
        };
      }), og = H(function(t, e) {
        return function(n) {
          return cn(t, n, e);
        };
      });
      function Hi(t, e, n) {
        var r = k2(e), u2 = Jn(e, r);
        n == null && !(K(e) && (u2.length || !r.length)) && (n = e, e = t, t = this, u2 = Jn(e, k2(e)));
        var o3 = !(K(n) && "chain" in n) || !!n.chain, c2 = Vt(t);
        return mt(u2, function(f2) {
          var l2 = e[f2];
          t[f2] = l2, c2 && (t.prototype[f2] = function() {
            var v3 = this.__chain__;
            if (o3 || v3) {
              var _ = t(this.__wrapped__), m3 = _.__actions__ = ut(this.__actions__);
              return m3.push({ func: l2, args: arguments, thisArg: t }), _.__chain__ = v3, _;
            }
            return l2.apply(t, re([this.value()], arguments));
          });
        }), t;
      }
      function cg() {
        return j3._ === this && (j3._ = Dc), this;
      }
      function Di() {
      }
      function fg(t) {
        return t = T3(t), H(function(e) {
          return nu(e, t);
        });
      }
      var hg = hi(z), lg = hi(Is), pg = hi($r);
      function Pa(t) {
        return mi(t) ? Ur(Wt(t)) : Gf(t);
      }
      function dg(t) {
        return function(e) {
          return t == null ? i : me2(t, e);
        };
      }
      var gg = xu(), vg = xu(true);
      function Ni() {
        return [];
      }
      function $i() {
        return false;
      }
      function _g() {
        return {};
      }
      function mg() {
        return "";
      }
      function wg() {
        return true;
      }
      function Pg(t, e) {
        if (t = T3(t), t < 1 || t > ee)
          return [];
        var n = Ut, r = et(t, Ut);
        e = E3(e), t -= Ut;
        for (var u2 = Wr(r, e); ++n < t; )
          e(n);
        return u2;
      }
      function Cg(t) {
        return b2(t) ? z(t, Wt) : pt(t) ? [t] : ut(Wu(q2(t)));
      }
      function Ag(t) {
        var e = ++Lc;
        return q2(t) + e;
      }
      var Ig = kn(function(t, e) {
        return t + e;
      }, 0), xg = li("ceil"), Eg = kn(function(t, e) {
        return t / e;
      }, 1), yg = li("floor");
      function Sg(t) {
        return t && t.length ? Kn(t, ct, Vr) : i;
      }
      function Og(t, e) {
        return t && t.length ? Kn(t, E3(e, 2), Vr) : i;
      }
      function Rg(t) {
        return ys(t, ct);
      }
      function bg(t, e) {
        return ys(t, E3(e, 2));
      }
      function Tg(t) {
        return t && t.length ? Kn(t, ct, ei) : i;
      }
      function Lg(t, e) {
        return t && t.length ? Kn(t, E3(e, 2), ei) : i;
      }
      var Hg = kn(function(t, e) {
        return t * e;
      }, 1), Dg = li("round"), Ng = kn(function(t, e) {
        return t - e;
      }, 0);
      function $g(t) {
        return t && t.length ? Fr(t, ct) : 0;
      }
      function Ug(t, e) {
        return t && t.length ? Fr(t, E3(e, 2)) : 0;
      }
      return a.after = sp, a.ary = Vu, a.assign = Jp, a.assignIn = ha, a.assignInWith = hr, a.assignWith = Yp, a.at = Zp, a.before = ku, a.bind = xi, a.bindAll = jd, a.bindKey = ju, a.castArray = _p, a.chain = Zu, a.chunk = yh, a.compact = Sh, a.concat = Oh, a.cond = tg, a.conforms = eg, a.constant = Ti, a.countBy = $l, a.create = Xp, a.curry = ta, a.curryRight = ea, a.debounce = na, a.defaults = Qp, a.defaultsDeep = Vp, a.defer = up, a.delay = ap, a.difference = Rh, a.differenceBy = bh, a.differenceWith = Th, a.drop = Lh, a.dropRight = Hh, a.dropRightWhile = Dh, a.dropWhile = Nh, a.fill = $h, a.filter = ql, a.flatMap = Ml, a.flatMapDeep = Bl, a.flatMapDepth = Gl, a.flatten = zu, a.flattenDeep = Uh, a.flattenDepth = qh, a.flip = op, a.flow = rg, a.flowRight = ig, a.fromPairs = Fh, a.functions = id, a.functionsIn = sd, a.groupBy = zl, a.initial = Mh, a.intersection = Bh, a.intersectionBy = Gh, a.intersectionWith = zh, a.invert = ad, a.invertBy = od, a.invokeMap = Jl, a.iteratee = Li, a.keyBy = Yl, a.keys = k2, a.keysIn = ot, a.map = sr, a.mapKeys = fd, a.mapValues = hd, a.matches = sg, a.matchesProperty = ug, a.memoize = ar, a.merge = ld, a.mergeWith = la, a.method = ag, a.methodOf = og, a.mixin = Hi, a.negate = or, a.nthArg = fg, a.omit = pd, a.omitBy = dd, a.once = cp, a.orderBy = Zl, a.over = hg, a.overArgs = fp, a.overEvery = lg, a.overSome = pg, a.partial = Ei, a.partialRight = ra, a.partition = Xl, a.pick = gd, a.pickBy = pa, a.property = Pa, a.propertyOf = dg, a.pull = Zh, a.pullAll = Ju, a.pullAllBy = Xh, a.pullAllWith = Qh, a.pullAt = Vh, a.range = gg, a.rangeRight = vg, a.rearg = hp, a.reject = kl, a.remove = kh, a.rest = lp, a.reverse = Ai, a.sampleSize = tp, a.set = _d, a.setWith = md, a.shuffle = ep, a.slice = jh, a.sortBy = ip, a.sortedUniq = ul, a.sortedUniqBy = al, a.split = Md, a.spread = pp, a.tail = ol, a.take = cl, a.takeRight = fl, a.takeRightWhile = hl, a.takeWhile = ll, a.tap = Sl, a.throttle = dp, a.thru = ir, a.toArray = oa, a.toPairs = da, a.toPairsIn = ga, a.toPath = Cg, a.toPlainObject = fa, a.transform = wd, a.unary = gp, a.union = pl, a.unionBy = dl, a.unionWith = gl, a.uniq = vl, a.uniqBy = _l, a.uniqWith = ml, a.unset = Pd, a.unzip = Ii, a.unzipWith = Yu, a.update = Cd, a.updateWith = Ad, a.values = Ge, a.valuesIn = Id, a.without = wl, a.words = ma, a.wrap = vp, a.xor = Pl, a.xorBy = Cl, a.xorWith = Al, a.zip = Il, a.zipObject = xl, a.zipObjectDeep = El, a.zipWith = yl, a.entries = da, a.entriesIn = ga, a.extend = ha, a.extendWith = hr, Hi(a, a), a.add = Ig, a.attempt = wa, a.camelCase = Sd, a.capitalize = va, a.ceil = xg, a.clamp = xd, a.clone = mp, a.cloneDeep = Pp, a.cloneDeepWith = Cp, a.cloneWith = wp, a.conformsTo = Ap, a.deburr = _a, a.defaultTo = ng, a.divide = Eg, a.endsWith = Od, a.eq = Rt, a.escape = Rd, a.escapeRegExp = bd, a.every = Ul, a.find = Fl, a.findIndex = Bu, a.findKey = kp, a.findLast = Wl, a.findLastIndex = Gu, a.findLastKey = jp, a.floor = yg, a.forEach = Xu, a.forEachRight = Qu, a.forIn = td, a.forInRight = ed, a.forOwn = nd, a.forOwnRight = rd, a.get = Oi, a.gt = Ip, a.gte = xp, a.has = ud, a.hasIn = Ri, a.head = Ku, a.identity = ct, a.includes = Kl, a.indexOf = Wh, a.inRange = Ed, a.invoke = cd, a.isArguments = Ce, a.isArray = b2, a.isArrayBuffer = Ep, a.isArrayLike = at, a.isArrayLikeObject = Z, a.isBoolean = yp, a.isBuffer = fe, a.isDate = Sp, a.isElement = Op, a.isEmpty = Rp, a.isEqual = bp, a.isEqualWith = Tp, a.isError = yi, a.isFinite = Lp, a.isFunction = Vt, a.isInteger = ia, a.isLength = cr, a.isMap = sa, a.isMatch = Hp, a.isMatchWith = Dp, a.isNaN = Np, a.isNative = $p, a.isNil = qp, a.isNull = Up, a.isNumber = ua, a.isObject = K, a.isObjectLike = Y, a.isPlainObject = gn, a.isRegExp = Si, a.isSafeInteger = Fp, a.isSet = aa, a.isString = fr, a.isSymbol = pt, a.isTypedArray = Be, a.isUndefined = Wp, a.isWeakMap = Mp, a.isWeakSet = Bp, a.join = Kh, a.kebabCase = Td, a.last = It, a.lastIndexOf = Jh, a.lowerCase = Ld, a.lowerFirst = Hd, a.lt = Gp, a.lte = zp, a.max = Sg, a.maxBy = Og, a.mean = Rg, a.meanBy = bg, a.min = Tg, a.minBy = Lg, a.stubArray = Ni, a.stubFalse = $i, a.stubObject = _g, a.stubString = mg, a.stubTrue = wg, a.multiply = Hg, a.nth = Yh, a.noConflict = cg, a.noop = Di, a.now = ur, a.pad = Dd, a.padEnd = Nd, a.padStart = $d, a.parseInt = Ud, a.random = yd, a.reduce = Ql, a.reduceRight = Vl, a.repeat = qd, a.replace = Fd, a.result = vd, a.round = Dg, a.runInContext = h, a.sample = jl, a.size = np, a.snakeCase = Wd, a.some = rp, a.sortedIndex = tl, a.sortedIndexBy = el, a.sortedIndexOf = nl, a.sortedLastIndex = rl, a.sortedLastIndexBy = il, a.sortedLastIndexOf = sl, a.startCase = Bd, a.startsWith = Gd, a.subtract = Ng, a.sum = $g, a.sumBy = Ug, a.template = zd, a.times = Pg, a.toFinite = kt, a.toInteger = T3, a.toLength = ca, a.toLower = Kd, a.toNumber = xt, a.toSafeInteger = Kp, a.toString = q2, a.toUpper = Jd, a.trim = Yd, a.trimEnd = Zd, a.trimStart = Xd, a.truncate = Qd, a.unescape = Vd, a.uniqueId = Ag, a.upperCase = kd, a.upperFirst = bi, a.each = Xu, a.eachRight = Qu, a.first = Ku, Hi(a, function() {
        var t = {};
        return qt(a, function(e, n) {
          W.call(a.prototype, n) || (t[n] = e);
        }), t;
      }(), { chain: false }), a.VERSION = p3, mt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        a[t].placeholder = a;
      }), mt(["drop", "take"], function(t, e) {
        N2.prototype[t] = function(n) {
          n = n === i ? 1 : V(T3(n), 0);
          var r = this.__filtered__ && !e ? new N2(this) : this.clone();
          return r.__filtered__ ? r.__takeCount__ = et(n, r.__takeCount__) : r.__views__.push({ size: et(n, Ut), type: t + (r.__dir__ < 0 ? "Right" : "") }), r;
        }, N2.prototype[t + "Right"] = function(n) {
          return this.reverse()[t](n).reverse();
        };
      }), mt(["filter", "map", "takeWhile"], function(t, e) {
        var n = e + 1, r = n == zi || n == Ja;
        N2.prototype[t] = function(u2) {
          var o3 = this.clone();
          return o3.__iteratees__.push({ iteratee: E3(u2, 3), type: n }), o3.__filtered__ = o3.__filtered__ || r, o3;
        };
      }), mt(["head", "last"], function(t, e) {
        var n = "take" + (e ? "Right" : "");
        N2.prototype[t] = function() {
          return this[n](1).value()[0];
        };
      }), mt(["initial", "tail"], function(t, e) {
        var n = "drop" + (e ? "" : "Right");
        N2.prototype[t] = function() {
          return this.__filtered__ ? new N2(this) : this[n](1);
        };
      }), N2.prototype.compact = function() {
        return this.filter(ct);
      }, N2.prototype.find = function(t) {
        return this.filter(t).head();
      }, N2.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, N2.prototype.invokeMap = H(function(t, e) {
        return typeof t == "function" ? new N2(this) : this.map(function(n) {
          return cn(n, t, e);
        });
      }), N2.prototype.reject = function(t) {
        return this.filter(or(E3(t)));
      }, N2.prototype.slice = function(t, e) {
        t = T3(t);
        var n = this;
        return n.__filtered__ && (t > 0 || e < 0) ? new N2(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== i && (e = T3(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n);
      }, N2.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, N2.prototype.toArray = function() {
        return this.take(Ut);
      }, qt(N2.prototype, function(t, e) {
        var n = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), u2 = a[r ? "take" + (e == "last" ? "Right" : "") : e], o3 = r || /^find/.test(e);
        u2 && (a.prototype[e] = function() {
          var c2 = this.__wrapped__, f2 = r ? [1] : arguments, l2 = c2 instanceof N2, v3 = f2[0], _ = l2 || b2(c2), m3 = function(D2) {
            var $2 = u2.apply(a, re([D2], f2));
            return r && C2 ? $2[0] : $2;
          };
          _ && n && typeof v3 == "function" && v3.length != 1 && (l2 = _ = false);
          var C2 = this.__chain__, x2 = !!this.__actions__.length, S = o3 && !C2, L3 = l2 && !x2;
          if (!o3 && _) {
            c2 = L3 ? c2 : new N2(this);
            var O3 = t.apply(c2, f2);
            return O3.__actions__.push({ func: ir, args: [m3], thisArg: i }), new Pt(O3, C2);
          }
          return S && L3 ? t.apply(this, f2) : (O3 = this.thru(m3), S ? r ? O3.value()[0] : O3.value() : O3);
        });
      }), mt(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var e = bn[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(t);
        a.prototype[t] = function() {
          var u2 = arguments;
          if (r && !this.__chain__) {
            var o3 = this.value();
            return e.apply(b2(o3) ? o3 : [], u2);
          }
          return this[n](function(c2) {
            return e.apply(b2(c2) ? c2 : [], u2);
          });
        };
      }), qt(N2.prototype, function(t, e) {
        var n = a[e];
        if (n) {
          var r = n.name + "";
          W.call(Ue, r) || (Ue[r] = []), Ue[r].push({ name: e, func: n });
        }
      }), Ue[Vn(i, he).name] = [{ name: "wrapper", func: i }], N2.prototype.clone = Qc, N2.prototype.reverse = Vc, N2.prototype.value = kc, a.prototype.at = Ol, a.prototype.chain = Rl, a.prototype.commit = bl, a.prototype.next = Tl, a.prototype.plant = Hl, a.prototype.reverse = Dl, a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = Nl, a.prototype.first = a.prototype.head, en && (a.prototype[en] = Ll), a;
    }, De = Rc();
    pe ? ((pe.exports = De)._ = De, Lr._ = De) : j3._ = De;
  }).call(_n);
})(qi, qi.exports);
var Vg = Object.defineProperty;
var kg = Object.defineProperties;
var jg = Object.getOwnPropertyDescriptors;
var Ra = Object.getOwnPropertySymbols;
var tv = Object.prototype.hasOwnProperty;
var ev = Object.prototype.propertyIsEnumerable;
var ba = (P3, s, i) => s in P3 ? Vg(P3, s, { enumerable: true, configurable: true, writable: true, value: i }) : P3[s] = i;
var lr = (P3, s) => {
  for (var i in s || (s = {}))
    tv.call(s, i) && ba(P3, i, s[i]);
  if (Ra)
    for (var i of Ra(s))
      ev.call(s, i) && ba(P3, i, s[i]);
  return P3;
};
var nv = (P3, s) => kg(P3, jg(s));
function Lt(P3, s, i) {
  var p3;
  const w2 = mn(P3);
  return ((p3 = s.rpcMap) == null ? void 0 : p3[w2.reference]) || `${Oa}?chainId=${w2.namespace}:${w2.reference}&projectId=${i}`;
}
function Ae(P3) {
  return P3.includes(":") ? P3.split(":")[1] : P3;
}
function Ta(P3) {
  return P3.map((s) => `${s.split(":")[0]}:${s.split(":")[1]}`);
}
function rv(P3, s) {
  const i = Object.keys(s.namespaces).filter((w2) => w2.includes(P3));
  if (!i.length)
    return [];
  const p3 = [];
  return i.forEach((w2) => {
    const I = s.namespaces[w2].accounts;
    p3.push(...I);
  }), p3;
}
function Fi(P3 = {}, s = {}) {
  const i = La(P3), p3 = La(s);
  return qi.exports.merge(i, p3);
}
function La(P3) {
  var s, i, p3, w2;
  const I = {};
  if (!Xr(P3))
    return I;
  for (const [y2, J] of Object.entries(P3)) {
    const Ht = fn(y2) ? [y2] : J.chains, Ke = J.methods || [], Ie = J.events || [], Dt = J.rpcMap || {}, Bt = Ao(y2);
    I[Bt] = nv(lr(lr({}, I[Bt]), J), { chains: me(Ht, (s = I[Bt]) == null ? void 0 : s.chains), methods: me(Ke, (i = I[Bt]) == null ? void 0 : i.methods), events: me(Ie, (p3 = I[Bt]) == null ? void 0 : p3.events), rpcMap: lr(lr({}, Dt), (w2 = I[Bt]) == null ? void 0 : w2.rpcMap) });
  }
  return I;
}
function iv(P3) {
  return P3.includes(":") ? P3.split(":")[2] : P3;
}
function Ha(P3) {
  const s = {};
  for (const [i, p3] of Object.entries(P3)) {
    const w2 = p3.methods || [], I = p3.events || [], y2 = p3.accounts || [], J = fn(i) ? [i] : p3.chains ? p3.chains : Ta(p3.accounts);
    s[i] = { chains: J, methods: w2, events: I, accounts: y2 };
  }
  return s;
}
function Wi(P3) {
  return typeof P3 == "number" ? P3 : P3.includes("0x") ? parseInt(P3, 16) : (P3 = P3.includes(":") ? P3.split(":")[1] : P3, isNaN(Number(P3)) ? P3 : Number(P3));
}
var Da = {};
var F = (P3) => Da[P3];
var Mi = (P3, s) => {
  Da[P3] = s;
};
var sv = class {
  constructor(s) {
    this.name = "polkadot", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var uv = Object.defineProperty;
var av = Object.defineProperties;
var ov = Object.getOwnPropertyDescriptors;
var Na = Object.getOwnPropertySymbols;
var cv = Object.prototype.hasOwnProperty;
var fv = Object.prototype.propertyIsEnumerable;
var $a = (P3, s, i) => s in P3 ? uv(P3, s, { enumerable: true, configurable: true, writable: true, value: i }) : P3[s] = i;
var Ua = (P3, s) => {
  for (var i in s || (s = {}))
    cv.call(s, i) && $a(P3, i, s[i]);
  if (Na)
    for (var i of Na(s))
      fv.call(s, i) && $a(P3, i, s[i]);
  return P3;
};
var qa = (P3, s) => av(P3, ov(s));
var hv = class {
  constructor(s) {
    this.name = "eip155", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(s) {
    switch (s.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(s);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(s);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(s);
    }
    return this.namespace.methods.includes(s.request.method) ? await this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(parseInt(s), i), this.chainId = parseInt(s), this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId.toString();
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = parseInt(Ae(i));
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const s = this.chainId, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  async handleSwitchChain(s) {
    var i, p3;
    let w2 = s.request.params ? (i = s.request.params[0]) == null ? void 0 : i.chainId : "0x0";
    w2 = w2.startsWith("0x") ? w2 : `0x${w2}`;
    const I = parseInt(w2, 16);
    if (this.isChainApproved(I))
      this.setDefaultChain(`${I}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({ topic: s.topic, request: { method: s.request.method, params: [{ chainId: w2 }] }, chainId: (p3 = this.namespace.chains) == null ? void 0 : p3[0] }), this.setDefaultChain(`${I}`);
    else
      throw new Error(`Failed to switch to chain 'eip155:${I}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(s) {
    return this.namespace.chains.includes(`${this.name}:${s}`);
  }
  async getCapabilities(s) {
    var i, p3, w2;
    const I = (p3 = (i = s.request) == null ? void 0 : i.params) == null ? void 0 : p3[0];
    if (!I)
      throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const y2 = this.client.session.get(s.topic), J = ((w2 = y2 == null ? void 0 : y2.sessionProperties) == null ? void 0 : w2.capabilities) || {};
    if (J != null && J[I])
      return J == null ? void 0 : J[I];
    const Ht = await this.client.request(s);
    try {
      await this.client.session.update(s.topic, { sessionProperties: qa(Ua({}, y2.sessionProperties || {}), { capabilities: qa(Ua({}, J || {}), { [I]: Ht }) }) });
    } catch (Ke) {
      console.warn("Failed to update session with capabilities", Ke);
    }
    return Ht;
  }
  async getCallStatus(s) {
    var i, p3;
    const w2 = this.client.session.get(s.topic), I = (i = w2.sessionProperties) == null ? void 0 : i.bundler_name;
    if (I) {
      const J = this.getBundlerUrl(s.chainId, I);
      try {
        return await this.getUserOperationReceipt(J, s);
      } catch (Ht) {
        console.warn("Failed to fetch call status from bundler", Ht, J);
      }
    }
    const y2 = (p3 = w2.sessionProperties) == null ? void 0 : p3.bundler_url;
    if (y2)
      try {
        return await this.getUserOperationReceipt(y2, s);
      } catch (J) {
        console.warn("Failed to fetch call status from custom bundler", J, y2);
      }
    if (this.namespace.methods.includes(s.request.method))
      return await this.client.request(s);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(s, i) {
    var p3;
    const w2 = new URL(s), I = await fetch(w2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(p3 = i.request.params) == null ? void 0 : p3[0]])) });
    if (!I.ok)
      throw new Error(`Failed to fetch user operation receipt - ${I.status}`);
    return await I.json();
  }
  getBundlerUrl(s, i) {
    return `${Qg}?projectId=${this.client.core.projectId}&chainId=${s}&bundler=${i}`;
  }
};
var lv = class {
  constructor(s) {
    this.name = "solana", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var pv = class {
  constructor(s) {
    this.name = "cosmos", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var dv = class {
  constructor(s) {
    this.name = "algorand", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    if (!this.httpProviders[s]) {
      const p3 = i || Lt(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
      if (!p3)
        throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, p3);
    }
    this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      s[i] = this.createHttpProvider(i, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    return typeof p3 > "u" ? void 0 : new o(new f(p3, F("disableProviderPing")));
  }
};
var gv = class {
  constructor(s) {
    this.name = "cip34", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      const p3 = this.getCardanoRPCUrl(i), w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, p3);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  getCardanoRPCUrl(s) {
    const i = this.namespace.rpcMap;
    if (i)
      return i[s];
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || this.getCardanoRPCUrl(s);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var vv = class {
  constructor(s) {
    this.name = "elrond", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var _v = class {
  constructor(s) {
    this.name = "multiversx", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      const w2 = Ae(i);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var mv = class {
  constructor(s) {
    this.name = "near", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i) {
    if (this.chainId = s, !this.httpProviders[s]) {
      const p3 = i || Lt(`${this.name}:${s}`, this.namespace);
      if (!p3)
        throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, p3);
    }
    this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i) => {
      var p3;
      s[i] = this.createHttpProvider(i, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace);
    return typeof p3 > "u" ? void 0 : new o(new f(p3, F("disableProviderPing")));
  }
};
var wv = class {
  constructor(s) {
    this.name = ze, this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(s.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(s.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(s.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(s.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider(s.chainId).request(s.request);
  }
  setDefaultChain(s, i) {
    this.httpProviders[s] || this.setHttpProvider(s, i), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var s, i;
    const p3 = {};
    return (i = (s = this.namespace) == null ? void 0 : s.accounts) == null || i.forEach((w2) => {
      const I = mn(w2);
      p3[`${I.namespace}:${I.reference}`] = this.createHttpProvider(w2);
    }), p3;
  }
  getHttpProvider(s) {
    const i = this.httpProviders[s];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i;
  }
  setHttpProvider(s, i) {
    const p3 = this.createHttpProvider(s, i);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i) {
    const p3 = i || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f(p3, F("disableProviderPing")));
  }
};
var Pv = Object.defineProperty;
var Cv = Object.defineProperties;
var Av = Object.getOwnPropertyDescriptors;
var Fa = Object.getOwnPropertySymbols;
var Iv = Object.prototype.hasOwnProperty;
var xv = Object.prototype.propertyIsEnumerable;
var Wa = (P3, s, i) => s in P3 ? Pv(P3, s, { enumerable: true, configurable: true, writable: true, value: i }) : P3[s] = i;
var pr = (P3, s) => {
  for (var i in s || (s = {}))
    Iv.call(s, i) && Wa(P3, i, s[i]);
  if (Fa)
    for (var i of Fa(s))
      xv.call(s, i) && Wa(P3, i, s[i]);
  return P3;
};
var Bi = (P3, s) => Cv(P3, Av(s));
var dr = class _dr {
  constructor(s) {
    this.events = new import_events2.default(), this.rpcProviders = {}, this.shouldAbortPairingAttempt = false, this.maxPairingAttempts = 10, this.disableProviderPing = false, this.providerOpts = s, this.logger = typeof (s == null ? void 0 : s.logger) < "u" && typeof (s == null ? void 0 : s.logger) != "string" ? s.logger : (0, import_pino.default)(k({ level: (s == null ? void 0 : s.logger) || ya })), this.disableProviderPing = (s == null ? void 0 : s.disableProviderPing) || false;
  }
  static async init(s) {
    const i = new _dr(s);
    return await i.initialize(), i;
  }
  async request(s, i, p3) {
    const [w2, I] = this.validateChain(i);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(w2).request({ request: pr({}, s), chainId: `${w2}:${I}`, topic: this.session.topic, expiry: p3 });
  }
  sendAsync(s, i, p3, w2) {
    const I = (/* @__PURE__ */ new Date()).getTime();
    this.request(s, p3, w2).then((y2) => i(null, formatJsonRpcResult(I, y2))).catch((y2) => i(y2, void 0));
  }
  async enable() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var s;
    if (!this.session)
      throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (s = this.session) == null ? void 0 : s.topic, reason: er("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(s) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (this.setNamespaces(s), await this.cleanupPendingPairings(), !s.skipPairing)
      return await this.pair(s.pairingTopic);
  }
  async authenticate(s, i) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    this.setNamespaces(s), await this.cleanupPendingPairings();
    const { uri: p3, response: w2 } = await this.client.authenticate(s, i);
    p3 && (this.uri = p3, this.events.emit("display_uri", p3));
    const I = await w2();
    if (this.session = I.session, this.session) {
      const y2 = Ha(this.session.namespaces);
      this.namespaces = Fi(this.namespaces, y2), this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return I;
  }
  on(s, i) {
    this.events.on(s, i);
  }
  once(s, i) {
    this.events.once(s, i);
  }
  removeListener(s, i) {
    this.events.removeListener(s, i);
  }
  off(s, i) {
    this.events.off(s, i);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(s) {
    this.shouldAbortPairingAttempt = false;
    let i = 0;
    do {
      if (this.shouldAbortPairingAttempt)
        throw new Error("Pairing aborted");
      if (i >= this.maxPairingAttempts)
        throw new Error("Max auto pairing attempts reached");
      const { uri: p3, approval: w2 } = await this.client.connect({ pairingTopic: s, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties });
      p3 && (this.uri = p3, this.events.emit("display_uri", p3)), await w2().then((I) => {
        this.session = I;
        const y2 = Ha(I.namespaces);
        this.namespaces = Fi(this.namespaces, y2), this.persist("namespaces", this.namespaces);
      }).catch((I) => {
        if (I.message !== it)
          throw I;
        i++;
      });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(s, i) {
    try {
      if (!this.session)
        return;
      const [p3, w2] = this.validateChain(s), I = this.getProvider(p3);
      I.name === ze ? I.setDefaultChain(`${p3}:${w2}`, i) : I.setDefaultChain(w2, i);
    } catch (p3) {
      if (!/Please call connect/.test(p3.message))
        throw p3;
    }
  }
  async cleanupPendingPairings(s = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const i = this.client.pairing.getAll();
    if (Nr(i)) {
      for (const p3 of i)
        s.deletePairings ? this.client.core.expirer.set(p3.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(p3.topic);
      this.logger.info(`Inactive pairings cleared: ${i.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = true;
  }
  async checkStorage() {
    if (this.namespaces = await this.getFromStore("namespaces"), this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
      const s = this.client.session.keys.length - 1;
      this.session = this.client.session.get(this.client.session.keys[s]), this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    this.client = this.providerOpts.client || await _e.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || ya, relayUrl: this.providerOpts.relayUrl || Yg, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error("Session not initialized. Please call connect() before enable()");
    const s = [...new Set(Object.keys(this.session.namespaces).map((i) => Ao(i)))];
    Mi("client", this.client), Mi("events", this.events), Mi("disableProviderPing", this.disableProviderPing), s.forEach((i) => {
      if (!this.session)
        return;
      const p3 = rv(i, this.session), w2 = Ta(p3), I = Fi(this.namespaces, this.optionalNamespaces), y2 = Bi(pr({}, I[i]), { accounts: p3, chains: w2 });
      switch (i) {
        case "eip155":
          this.rpcProviders[i] = new hv({ namespace: y2 });
          break;
        case "algorand":
          this.rpcProviders[i] = new dv({ namespace: y2 });
          break;
        case "solana":
          this.rpcProviders[i] = new lv({ namespace: y2 });
          break;
        case "cosmos":
          this.rpcProviders[i] = new pv({ namespace: y2 });
          break;
        case "polkadot":
          this.rpcProviders[i] = new sv({ namespace: y2 });
          break;
        case "cip34":
          this.rpcProviders[i] = new gv({ namespace: y2 });
          break;
        case "elrond":
          this.rpcProviders[i] = new vv({ namespace: y2 });
          break;
        case "multiversx":
          this.rpcProviders[i] = new _v({ namespace: y2 });
          break;
        case "near":
          this.rpcProviders[i] = new mv({ namespace: y2 });
          break;
        default:
          this.rpcProviders[ze] ? this.rpcProviders[ze].updateNamespace(y2) : this.rpcProviders[ze] = new wv({ namespace: y2 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (s) => {
      this.events.emit("session_ping", s);
    }), this.client.on("session_event", (s) => {
      const { params: i } = s, { event: p3 } = i;
      if (p3.name === "accountsChanged") {
        const w2 = p3.data;
        w2 && Nr(w2) && this.events.emit("accountsChanged", w2.map(iv));
      } else if (p3.name === "chainChanged") {
        const w2 = i.chainId, I = i.event.data, y2 = Ao(w2), J = Wi(w2) !== Wi(I) ? `${y2}:${Wi(I)}` : w2;
        this.onChainChanged(J);
      } else
        this.events.emit(p3.name, p3.data);
      this.events.emit("session_event", s);
    }), this.client.on("session_update", ({ topic: s, params: i }) => {
      var p3;
      const { namespaces: w2 } = i, I = (p3 = this.client) == null ? void 0 : p3.session.get(s);
      this.session = Bi(pr({}, I), { namespaces: w2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: s, params: i });
    }), this.client.on("session_delete", async (s) => {
      await this.cleanup(), this.events.emit("session_delete", s), this.events.emit("disconnect", Bi(pr({}, er("USER_DISCONNECTED")), { data: s.topic }));
    }), this.on(Tt.DEFAULT_CHAIN_CHANGED, (s) => {
      this.onChainChanged(s, true);
    });
  }
  getProvider(s) {
    return this.rpcProviders[s] || this.rpcProviders[ze];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((s) => {
      var i;
      this.getProvider(s).updateNamespace((i = this.session) == null ? void 0 : i.namespaces[s]);
    });
  }
  setNamespaces(s) {
    const { namespaces: i, optionalNamespaces: p3, sessionProperties: w2 } = s;
    i && Object.keys(i).length && (this.namespaces = i), p3 && Object.keys(p3).length && (this.optionalNamespaces = p3), this.sessionProperties = w2, this.persist("namespaces", i), this.persist("optionalNamespaces", p3);
  }
  validateChain(s) {
    const [i, p3] = (s == null ? void 0 : s.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length)
      return [i, p3];
    if (i && !Object.keys(this.namespaces || {}).map((y2) => Ao(y2)).includes(i))
      throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);
    if (i && p3)
      return [i, p3];
    const w2 = Ao(Object.keys(this.namespaces)[0]), I = this.rpcProviders[w2].getDefaultChain();
    return [w2, I];
  }
  async requestAccounts() {
    const [s] = this.validateChain();
    return await this.getProvider(s).requestAccounts();
  }
  onChainChanged(s, i = false) {
    if (!this.namespaces)
      return;
    const [p3, w2] = this.validateChain(s);
    w2 && (i || this.getProvider(p3).setDefaultChain(w2), this.namespaces[p3] ? this.namespaces[p3].defaultChain = w2 : this.namespaces[`${p3}:${w2}`] ? this.namespaces[`${p3}:${w2}`].defaultChain = w2 : this.namespaces[`${p3}:${w2}`] = { defaultChain: w2 }, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", w2));
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.session = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, this.persist("namespaces", void 0), this.persist("optionalNamespaces", void 0), this.persist("sessionProperties", void 0), await this.cleanupPendingPairings({ deletePairings: true });
  }
  persist(s, i) {
    this.client.core.storage.setItem(`${Sa}/${s}`, i);
  }
  async getFromStore(s) {
    return await this.client.core.storage.getItem(`${Sa}/${s}`);
  }
};
var Ev = dr;

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var R = "wc";
var T2 = "ethereum_provider";
var $ = `${R}@2:${T2}:`;
var j2 = "https://rpc.walletconnect.org/v1/";
var u = ["eth_sendTransaction", "personal_sign"];
var y = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"];
var g2 = ["chainChanged", "accountsChanged"];
var b = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var q = Object.defineProperty;
var N = Object.defineProperties;
var D = Object.getOwnPropertyDescriptors;
var M = Object.getOwnPropertySymbols;
var U2 = Object.prototype.hasOwnProperty;
var Q = Object.prototype.propertyIsEnumerable;
var O2 = (r, t, s) => t in r ? q(r, t, { enumerable: true, configurable: true, writable: true, value: s }) : r[t] = s;
var p2 = (r, t) => {
  for (var s in t || (t = {}))
    U2.call(t, s) && O2(r, s, t[s]);
  if (M)
    for (var s of M(t))
      Q.call(t, s) && O2(r, s, t[s]);
  return r;
};
var E2 = (r, t) => N(r, D(t));
function m2(r) {
  return Number(r[0].split(":")[1]);
}
function v2(r) {
  return `0x${r.toString(16)}`;
}
function L2(r) {
  const { chains: t, optionalChains: s, methods: i, optionalMethods: e, events: n, optionalEvents: o3, rpcMap: c2 } = r;
  if (!Nr(t))
    throw new Error("Invalid chains");
  const a = { chains: t, methods: i || u, events: n || g2, rpcMap: p2({}, t.length ? { [m2(t)]: c2[m2(t)] } : {}) }, h = n == null ? void 0 : n.filter((l2) => !g2.includes(l2)), d2 = i == null ? void 0 : i.filter((l2) => !u.includes(l2));
  if (!s && !o3 && !e && !(h != null && h.length) && !(d2 != null && d2.length))
    return { required: t.length ? a : void 0 };
  const w2 = (h == null ? void 0 : h.length) && (d2 == null ? void 0 : d2.length) || !s, I = { chains: [...new Set(w2 ? a.chains.concat(s || []) : s)], methods: [...new Set(a.methods.concat(e != null && e.length ? e : y))], events: [...new Set(a.events.concat(o3 != null && o3.length ? o3 : b))], rpcMap: c2 };
  return { required: t.length ? a : void 0, optional: s.length ? I : void 0 };
}
var C = class _C {
  constructor() {
    this.events = new import_events3.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = $, this.on = (t, s) => (this.events.on(t, s), this), this.once = (t, s) => (this.events.once(t, s), this), this.removeListener = (t, s) => (this.events.removeListener(t, s), this), this.off = (t, s) => (this.events.off(t, s), this), this.parseAccount = (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s = new _C();
    return await s.initialize(t), s;
  }
  async request(t, s) {
    return await this.signer.request(t, this.formatChainId(this.chainId), s);
  }
  sendAsync(t, s, i) {
    this.signer.sendAsync(t, s, this.formatChainId(this.chainId), i);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: s, optional: i } = L2(this.rpc);
    try {
      const e = await new Promise(async (o3, c2) => {
        var a;
        this.rpc.showQrModal && ((a = this.modal) == null || a.subscribeModal((h) => {
          !h.open && !this.signer.session && (this.signer.abortPairingAttempt(), c2(new Error("Connection request reset. Please try again.")));
        })), await this.signer.connect(E2(p2({ namespaces: p2({}, s && { [this.namespace]: s }) }, i && { optionalNamespaces: { [this.namespace]: i } }), { pairingTopic: t == null ? void 0 : t.pairingTopic })).then((h) => {
          o3(h);
        }).catch((h) => {
          c2(new Error(h.message));
        });
      });
      if (!e)
        return;
      const n = Jo(e.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n), this.setAccounts(n), this.events.emit("connect", { chainId: v2(this.chainId) });
    } catch (e) {
      throw this.signer.logger.error(e), e;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async authenticate(t, s) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i = await new Promise(async (n, o3) => {
        var c2;
        this.rpc.showQrModal && ((c2 = this.modal) == null || c2.subscribeModal((a) => {
          !a.open && !this.signer.session && (this.signer.abortPairingAttempt(), o3(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(E2(p2({}, t), { chains: this.rpc.chains }), s).then((a) => {
          n(a);
        }).catch((a) => {
          o3(new Error(a.message));
        });
      }), e = i.session;
      if (e) {
        const n = Jo(e.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n), this.setAccounts(n), this.events.emit("connect", { chainId: v2(this.chainId) });
      }
      return i;
    } catch (i) {
      throw this.signer.logger.error(i), i;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: s } = t, { event: i } = s;
      i.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i.data), this.events.emit("accountsChanged", this.accounts)) : i.name === "chainChanged" ? this.setChainId(this.formatChainId(i.data)) : this.events.emit(i.name, i.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s = parseInt(t);
      this.chainId = s, this.events.emit("chainChanged", v2(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", E2(p2({}, er("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s, i;
      this.rpc.showQrModal && ((s = this.modal) == null || s.closeModal(), (i = this.modal) == null || i.openModal({ uri: t })), this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const s = t.filter((i) => this.isCompatibleChainId(i)).map((i) => this.parseChainId(i));
    s.length && (this.chainId = s[0], this.events.emit("chainChanged", v2(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s = this.parseChainId(t);
      this.chainId = s, this.switchEthereumChain(s);
    }
  }
  parseAccountId(t) {
    const [s, i, e] = t.split(":");
    return { chainId: `${s}:${i}`, address: e };
  }
  setAccounts(t) {
    this.accounts = t.filter((s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s) => this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s, i;
    const e = (s = t == null ? void 0 : t.chains) != null ? s : [], n = (i = t == null ? void 0 : t.optionalChains) != null ? i : [], o3 = e.concat(n);
    if (!o3.length)
      throw new Error("No chains specified in either `chains` or `optionalChains`");
    const c2 = e.length ? (t == null ? void 0 : t.methods) || u : [], a = e.length ? (t == null ? void 0 : t.events) || g2 : [], h = (t == null ? void 0 : t.optionalMethods) || [], d2 = (t == null ? void 0 : t.optionalEvents) || [], w2 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(o3, t.projectId), I = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: e == null ? void 0 : e.map((l2) => this.formatChainId(l2)), optionalChains: n.map((l2) => this.formatChainId(l2)), methods: c2, events: a, optionalMethods: h, optionalEvents: d2, rpcMap: w2, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: I, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s) {
    const i = {};
    return t.forEach((e) => {
      i[e] = this.getRpcUrl(e, s);
    }), i;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? m2(this.rpc.chains) : m2(this.rpc.optionalChains), this.signer = await Ev.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s;
      try {
        const { WalletConnectModal: i } = await import("./dist-U2NMX6BN.js");
        s = i;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s)
        try {
          this.modal = new s(p2({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
        } catch (i) {
          throw this.signer.logger.error(i), new Error("Could not generate WalletConnectModal Instance");
        }
    }
  }
  loadConnectOpts(t) {
    if (!t)
      return;
    const { chains: s, optionalChains: i, rpcMap: e } = t;
    s && Nr(s) && (this.rpc.chains = s.map((n) => this.formatChainId(n)), s.forEach((n) => {
      this.rpc.rpcMap[n] = (e == null ? void 0 : e[n]) || this.getRpcUrl(n);
    })), i && Nr(i) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i == null ? void 0 : i.map((n) => this.formatChainId(n)), i.forEach((n) => {
      this.rpc.rpcMap[n] = (e == null ? void 0 : e[n]) || this.getRpcUrl(n);
    }));
  }
  getRpcUrl(t, s) {
    var i;
    return ((i = this.rpc.rpcMap) == null ? void 0 : i[t]) || `${j2}?chainId=eip155:${t}&projectId=${s || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session)
      try {
        const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
        this.setChainIds(t ? [this.formatChainId(t)] : s == null ? void 0 : s.accounts), this.setAccounts(s == null ? void 0 : s.accounts);
      } catch (t) {
        this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((s) => this.signer.logger.warn(s));
      }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((s) => this.parseAccount(s));
  }
};
var x = C;
export {
  x as EthereumProvider,
  b as OPTIONAL_EVENTS,
  y as OPTIONAL_METHODS,
  g2 as REQUIRED_EVENTS,
  u as REQUIRED_METHODS,
  C as default
};
/*! Bundled license information:

@walletconnect/universal-provider/dist/index.es.js:
  (**
  * @license
  * Lodash <https://lodash.com/>
  * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
  * Released under MIT license <https://lodash.com/license>
  * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
  * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  *)
*/
//# sourceMappingURL=index.es-VZ7VSX4A.js.map
