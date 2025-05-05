var Zt = Object.defineProperty;
var Qt = (t, e, r) => e in t ? Zt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var be = (t, e, r) => Qt(t, typeof e != "symbol" ? e + "" : e, r);
import { createI18n as er } from "vue-i18n";
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return tr;
  }
}, Symbol.toStringTag, { value: "Module" })), tr = {
  install: (t) => {
    for (let e in Ce)
      t.use(Ce[e]);
  }
};
function rr(t, e) {
  if (!e || !1 in e)
    throw new Error(
      "CaareaVlibPlugin error: i18n_translate is not defined, please provide it in options (ex: app.use(CaareaVlibPlugin, { i18n_translate: i18n.global.t }))"
    );
  t.provide("i18n", e.i18n_translate);
  for (const r in Ce)
    t.component(r, Ce[r]);
}
const ls = { install: rr };
function At(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: nr } = Object.prototype, { getPrototypeOf: tt } = Object, { iterator: Le, toStringTag: Rt } = Symbol, Ne = /* @__PURE__ */ ((t) => (e) => {
  const r = nr.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ne = (t) => (t = t.toLowerCase(), (e) => Ne(e) === t), Ie = (t) => (e) => typeof e === t, { isArray: ue } = Array, pe = Ie("undefined");
function or(t) {
  return t !== null && !pe(t) && t.constructor !== null && !pe(t.constructor) && ee(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const xt = ne("ArrayBuffer");
function sr(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && xt(t.buffer), e;
}
const ir = Ie("string"), ee = Ie("function"), Ct = Ie("number"), De = (t) => t !== null && typeof t == "object", ar = (t) => t === !0 || t === !1, we = (t) => {
  if (Ne(t) !== "object")
    return !1;
  const e = tt(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Rt in t) && !(Le in t);
}, cr = ne("Date"), ur = ne("File"), lr = ne("Blob"), dr = ne("FileList"), fr = (t) => De(t) && ee(t.pipe), hr = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || ee(t.append) && ((e = Ne(t)) === "formdata" || // detect form-data instance
  e === "object" && ee(t.toString) && t.toString() === "[object FormData]"));
}, pr = ne("URLSearchParams"), [mr, gr, yr, br] = ["ReadableStream", "Request", "Response", "Headers"].map(ne), _r = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ge(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, o;
  if (typeof t != "object" && (t = [t]), ue(t))
    for (n = 0, o = t.length; n < o; n++)
      e.call(null, t[n], n, t);
  else {
    const a = r ? Object.getOwnPropertyNames(t) : Object.keys(t), c = a.length;
    let f;
    for (n = 0; n < c; n++)
      f = a[n], e.call(null, t[f], f, t);
  }
}
function Mt(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const ie = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ot = (t) => !pe(t) && t !== ie;
function We() {
  const { caseless: t } = Ot(this) && this || {}, e = {}, r = (n, o) => {
    const a = t && Mt(e, o) || o;
    we(e[a]) && we(n) ? e[a] = We(e[a], n) : we(n) ? e[a] = We({}, n) : ue(n) ? e[a] = n.slice() : e[a] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && ge(arguments[n], r);
  return e;
}
const wr = (t, e, r, { allOwnKeys: n } = {}) => (ge(e, (o, a) => {
  r && ee(o) ? t[a] = At(o, r) : t[a] = o;
}, { allOwnKeys: n }), t), kr = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), vr = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, Sr = (t, e, r, n) => {
  let o, a, c;
  const f = {};
  if (e = e || {}, t == null) return e;
  do {
    for (o = Object.getOwnPropertyNames(t), a = o.length; a-- > 0; )
      c = o[a], (!n || n(c, t, e)) && !f[c] && (e[c] = t[c], f[c] = !0);
    t = r !== !1 && tt(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, Er = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, Tr = (t) => {
  if (!t) return null;
  if (ue(t)) return t;
  let e = t.length;
  if (!Ct(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, Ar = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && tt(Uint8Array)), Rr = (t, e) => {
  const n = (t && t[Le]).call(t);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    e.call(t, a[0], a[1]);
  }
}, xr = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, Cr = ne("HTMLFormElement"), Mr = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), ot = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), Or = ne("RegExp"), Ut = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  ge(r, (o, a) => {
    let c;
    (c = e(o, a, t)) !== !1 && (n[a] = c || o);
  }), Object.defineProperties(t, n);
}, Ur = (t) => {
  Ut(t, (e, r) => {
    if (ee(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (ee(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Lr = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return ue(t) ? n(t) : n(String(t).split(e)), r;
}, Nr = () => {
}, Ir = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function Dr(t) {
  return !!(t && ee(t.append) && t[Rt] === "FormData" && t[Le]);
}
const Fr = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (De(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const a = ue(n) ? [] : {};
        return ge(n, (c, f) => {
          const T = r(c, o + 1);
          !pe(T) && (a[f] = T);
        }), e[o] = void 0, a;
      }
    }
    return n;
  };
  return r(t, 0);
}, Pr = ne("AsyncFunction"), $r = (t) => t && (De(t) || ee(t)) && ee(t.then) && ee(t.catch), Lt = ((t, e) => t ? setImmediate : e ? ((r, n) => (ie.addEventListener("message", ({ source: o, data: a }) => {
  o === ie && a === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), ie.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  ee(ie.postMessage)
), jr = typeof queueMicrotask < "u" ? queueMicrotask.bind(ie) : typeof process < "u" && process.nextTick || Lt, Br = (t) => t != null && ee(t[Le]), p = {
  isArray: ue,
  isArrayBuffer: xt,
  isBuffer: or,
  isFormData: hr,
  isArrayBufferView: sr,
  isString: ir,
  isNumber: Ct,
  isBoolean: ar,
  isObject: De,
  isPlainObject: we,
  isReadableStream: mr,
  isRequest: gr,
  isResponse: yr,
  isHeaders: br,
  isUndefined: pe,
  isDate: cr,
  isFile: ur,
  isBlob: lr,
  isRegExp: Or,
  isFunction: ee,
  isStream: fr,
  isURLSearchParams: pr,
  isTypedArray: Ar,
  isFileList: dr,
  forEach: ge,
  merge: We,
  extend: wr,
  trim: _r,
  stripBOM: kr,
  inherits: vr,
  toFlatObject: Sr,
  kindOf: Ne,
  kindOfTest: ne,
  endsWith: Er,
  toArray: Tr,
  forEachEntry: Rr,
  matchAll: xr,
  isHTMLForm: Cr,
  hasOwnProperty: ot,
  hasOwnProp: ot,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ut,
  freezeMethods: Ur,
  toObjectSet: Lr,
  toCamelCase: Mr,
  noop: Nr,
  toFiniteNumber: Ir,
  findKey: Mt,
  global: ie,
  isContextDefined: Ot,
  isSpecCompliantForm: Dr,
  toJSONObject: Fr,
  isAsyncFn: Pr,
  isThenable: $r,
  setImmediate: Lt,
  asap: jr,
  isIterable: Br
};
function P(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
p.inherits(P, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Nt = P.prototype, It = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  It[t] = { value: t };
});
Object.defineProperties(P, It);
Object.defineProperty(Nt, "isAxiosError", { value: !0 });
P.from = (t, e, r, n, o, a) => {
  const c = Object.create(Nt);
  return p.toFlatObject(t, c, function(T) {
    return T !== Error.prototype;
  }, (f) => f !== "isAxiosError"), P.call(c, t.message, e, r, n, o), c.cause = t, c.name = t.name, a && Object.assign(c, a), c;
};
const Yr = null;
function Ge(t) {
  return p.isPlainObject(t) || p.isArray(t);
}
function Dt(t) {
  return p.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function st(t, e, r) {
  return t ? t.concat(e).map(function(o, a) {
    return o = Dt(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : e;
}
function Hr(t) {
  return p.isArray(t) && !t.some(Ge);
}
const qr = p.toFlatObject(p, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Fe(t, e, r) {
  if (!p.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), r = p.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(k, _) {
    return !p.isUndefined(_[k]);
  });
  const n = r.metaTokens, o = r.visitor || u, a = r.dots, c = r.indexes, T = (r.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(e);
  if (!p.isFunction(o))
    throw new TypeError("visitor must be a function");
  function i(d) {
    if (d === null) return "";
    if (p.isDate(d))
      return d.toISOString();
    if (!T && p.isBlob(d))
      throw new P("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(d) || p.isTypedArray(d) ? T && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function u(d, k, _) {
    let I = d;
    if (d && !_ && typeof d == "object") {
      if (p.endsWith(k, "{}"))
        k = n ? k : k.slice(0, -2), d = JSON.stringify(d);
      else if (p.isArray(d) && Hr(d) || (p.isFileList(d) || p.endsWith(k, "[]")) && (I = p.toArray(d)))
        return k = Dt(k), I.forEach(function($, J) {
          !(p.isUndefined($) || $ === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? st([k], J, a) : c === null ? k : k + "[]",
            i($)
          );
        }), !1;
    }
    return Ge(d) ? !0 : (e.append(st(_, k, a), i(d)), !1);
  }
  const h = [], b = Object.assign(qr, {
    defaultVisitor: u,
    convertValue: i,
    isVisitable: Ge
  });
  function m(d, k) {
    if (!p.isUndefined(d)) {
      if (h.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + k.join("."));
      h.push(d), p.forEach(d, function(I, U) {
        (!(p.isUndefined(I) || I === null) && o.call(
          e,
          I,
          p.isString(U) ? U.trim() : U,
          k,
          b
        )) === !0 && m(I, k ? k.concat(U) : [U]);
      }), h.pop();
    }
  }
  if (!p.isObject(t))
    throw new TypeError("data must be an object");
  return m(t), e;
}
function it(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function rt(t, e) {
  this._pairs = [], t && Fe(t, this, e);
}
const Ft = rt.prototype;
Ft.append = function(e, r) {
  this._pairs.push([e, r]);
};
Ft.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, it);
  } : it;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function zr(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Pt(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || zr;
  p.isFunction(r) && (r = {
    serialize: r
  });
  const o = r && r.serialize;
  let a;
  if (o ? a = o(e, r) : a = p.isURLSearchParams(e) ? e.toString() : new rt(e, r).toString(n), a) {
    const c = t.indexOf("#");
    c !== -1 && (t = t.slice(0, c)), t += (t.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return t;
}
class at {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    p.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const $t = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Kr = typeof URLSearchParams < "u" ? URLSearchParams : rt, Vr = typeof FormData < "u" ? FormData : null, Jr = typeof Blob < "u" ? Blob : null, Wr = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Kr,
    FormData: Vr,
    Blob: Jr
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, nt = typeof window < "u" && typeof document < "u", Xe = typeof navigator == "object" && navigator || void 0, Gr = nt && (!Xe || ["ReactNative", "NativeScript", "NS"].indexOf(Xe.product) < 0), Xr = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Zr = nt && window.location.href || "http://localhost", Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: nt,
  hasStandardBrowserEnv: Gr,
  hasStandardBrowserWebWorkerEnv: Xr,
  navigator: Xe,
  origin: Zr
}, Symbol.toStringTag, { value: "Module" })), G = {
  ...Qr,
  ...Wr
};
function en(t, e) {
  return Fe(t, new G.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, a) {
      return G.isNode && p.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function tn(t) {
  return p.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function rn(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], e[a] = t[a];
  return e;
}
function jt(t) {
  function e(r, n, o, a) {
    let c = r[a++];
    if (c === "__proto__") return !0;
    const f = Number.isFinite(+c), T = a >= r.length;
    return c = !c && p.isArray(o) ? o.length : c, T ? (p.hasOwnProp(o, c) ? o[c] = [o[c], n] : o[c] = n, !f) : ((!o[c] || !p.isObject(o[c])) && (o[c] = []), e(r, n, o[c], a) && p.isArray(o[c]) && (o[c] = rn(o[c])), !f);
  }
  if (p.isFormData(t) && p.isFunction(t.entries)) {
    const r = {};
    return p.forEachEntry(t, (n, o) => {
      e(tn(n), o, r, 0);
    }), r;
  }
  return null;
}
function nn(t, e, r) {
  if (p.isString(t))
    try {
      return (e || JSON.parse)(t), p.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const ye = {
  transitional: $t,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = p.isObject(e);
    if (a && p.isHTMLForm(e) && (e = new FormData(e)), p.isFormData(e))
      return o ? JSON.stringify(jt(e)) : e;
    if (p.isArrayBuffer(e) || p.isBuffer(e) || p.isStream(e) || p.isFile(e) || p.isBlob(e) || p.isReadableStream(e))
      return e;
    if (p.isArrayBufferView(e))
      return e.buffer;
    if (p.isURLSearchParams(e))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let f;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return en(e, this.formSerializer).toString();
      if ((f = p.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const T = this.env && this.env.FormData;
        return Fe(
          f ? { "files[]": e } : e,
          T && new T(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), nn(e)) : e;
  }],
  transformResponse: [function(e) {
    const r = this.transitional || ye.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (p.isResponse(e) || p.isReadableStream(e))
      return e;
    if (e && p.isString(e) && (n && !this.responseType || o)) {
      const c = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(e);
      } catch (f) {
        if (c)
          throw f.name === "SyntaxError" ? P.from(f, P.ERR_BAD_RESPONSE, this, null, this.response) : f;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: G.classes.FormData,
    Blob: G.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  ye.headers[t] = {};
});
const on = p.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), sn = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(c) {
    o = c.indexOf(":"), r = c.substring(0, o).trim().toLowerCase(), n = c.substring(o + 1).trim(), !(!r || e[r] && on[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, ct = Symbol("internals");
function fe(t) {
  return t && String(t).trim().toLowerCase();
}
function ke(t) {
  return t === !1 || t == null ? t : p.isArray(t) ? t.map(ke) : String(t);
}
function an(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const cn = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Ye(t, e, r, n, o) {
  if (p.isFunction(n))
    return n.call(this, e, r);
  if (o && (e = r), !!p.isString(e)) {
    if (p.isString(n))
      return e.indexOf(n) !== -1;
    if (p.isRegExp(n))
      return n.test(e);
  }
}
function un(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function ln(t, e) {
  const r = p.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, a, c) {
        return this[n].call(this, e, o, a, c);
      },
      configurable: !0
    });
  });
}
let te = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const o = this;
    function a(f, T, i) {
      const u = fe(T);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const h = p.findKey(o, u);
      (!h || o[h] === void 0 || i === !0 || i === void 0 && o[h] !== !1) && (o[h || T] = ke(f));
    }
    const c = (f, T) => p.forEach(f, (i, u) => a(i, u, T));
    if (p.isPlainObject(e) || e instanceof this.constructor)
      c(e, r);
    else if (p.isString(e) && (e = e.trim()) && !cn(e))
      c(sn(e), r);
    else if (p.isObject(e) && p.isIterable(e)) {
      let f = {}, T, i;
      for (const u of e) {
        if (!p.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        f[i = u[0]] = (T = f[i]) ? p.isArray(T) ? [...T, u[1]] : [T, u[1]] : u[1];
      }
      c(f, r);
    } else
      e != null && a(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = fe(e), e) {
      const n = p.findKey(this, e);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return an(o);
        if (p.isFunction(r))
          return r.call(this, o, n);
        if (p.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = fe(e), e) {
      const n = p.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Ye(this, this[n], n, r)));
    }
    return !1;
  }
  delete(e, r) {
    const n = this;
    let o = !1;
    function a(c) {
      if (c = fe(c), c) {
        const f = p.findKey(n, c);
        f && (!r || Ye(n, n[f], f, r)) && (delete n[f], o = !0);
      }
    }
    return p.isArray(e) ? e.forEach(a) : a(e), o;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const a = r[n];
      (!e || Ye(this, this[a], a, e, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(e) {
    const r = this, n = {};
    return p.forEach(this, (o, a) => {
      const c = p.findKey(n, a);
      if (c) {
        r[c] = ke(o), delete r[a];
        return;
      }
      const f = e ? un(a) : String(a).trim();
      f !== a && delete r[a], r[f] = ke(o), n[f] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = e && p.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const n = new this(e);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(e) {
    const n = (this[ct] = this[ct] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(c) {
      const f = fe(c);
      n[f] || (ln(o, c), n[f] = !0);
    }
    return p.isArray(e) ? e.forEach(a) : a(e), this;
  }
};
te.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(te.prototype, ({ value: t }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[r] = n;
    }
  };
});
p.freezeMethods(te);
function He(t, e) {
  const r = this || ye, n = e || r, o = te.from(n.headers);
  let a = n.data;
  return p.forEach(t, function(f) {
    a = f.call(r, a, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), a;
}
function Bt(t) {
  return !!(t && t.__CANCEL__);
}
function le(t, e, r) {
  P.call(this, t ?? "canceled", P.ERR_CANCELED, e, r), this.name = "CanceledError";
}
p.inherits(le, P, {
  __CANCEL__: !0
});
function Yt(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new P(
    "Request failed with status code " + r.status,
    [P.ERR_BAD_REQUEST, P.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function dn(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function fn(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, a = 0, c;
  return e = e !== void 0 ? e : 1e3, function(T) {
    const i = Date.now(), u = n[a];
    c || (c = i), r[o] = T, n[o] = i;
    let h = a, b = 0;
    for (; h !== o; )
      b += r[h++], h = h % t;
    if (o = (o + 1) % t, o === a && (a = (a + 1) % t), i - c < e)
      return;
    const m = u && i - u;
    return m ? Math.round(b * 1e3 / m) : void 0;
  };
}
function hn(t, e) {
  let r = 0, n = 1e3 / e, o, a;
  const c = (i, u = Date.now()) => {
    r = u, o = null, a && (clearTimeout(a), a = null), t.apply(null, i);
  };
  return [(...i) => {
    const u = Date.now(), h = u - r;
    h >= n ? c(i, u) : (o = i, a || (a = setTimeout(() => {
      a = null, c(o);
    }, n - h)));
  }, () => o && c(o)];
}
const Me = (t, e, r = 3) => {
  let n = 0;
  const o = fn(50, 250);
  return hn((a) => {
    const c = a.loaded, f = a.lengthComputable ? a.total : void 0, T = c - n, i = o(T), u = c <= f;
    n = c;
    const h = {
      loaded: c,
      total: f,
      progress: f ? c / f : void 0,
      bytes: T,
      rate: i || void 0,
      estimated: i && f && u ? (f - c) / i : void 0,
      event: a,
      lengthComputable: f != null,
      [e ? "download" : "upload"]: !0
    };
    t(h);
  }, r);
}, ut = (t, e) => {
  const r = t != null;
  return [(n) => e[0]({
    lengthComputable: r,
    total: t,
    loaded: n
  }), e[1]];
}, lt = (t) => (...e) => p.asap(() => t(...e)), pn = G.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (r) => (r = new URL(r, G.origin), t.protocol === r.protocol && t.host === r.host && (e || t.port === r.port)))(
  new URL(G.origin),
  G.navigator && /(msie|trident)/i.test(G.navigator.userAgent)
) : () => !0, mn = G.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, r, n, o, a) {
      const c = [t + "=" + encodeURIComponent(e)];
      p.isNumber(r) && c.push("expires=" + new Date(r).toGMTString()), p.isString(n) && c.push("path=" + n), p.isString(o) && c.push("domain=" + o), a === !0 && c.push("secure"), document.cookie = c.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function gn(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function yn(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Ht(t, e, r) {
  let n = !gn(e);
  return t && (n || r == !1) ? yn(t, e) : e;
}
const dt = (t) => t instanceof te ? { ...t } : t;
function ce(t, e) {
  e = e || {};
  const r = {};
  function n(i, u, h, b) {
    return p.isPlainObject(i) && p.isPlainObject(u) ? p.merge.call({ caseless: b }, i, u) : p.isPlainObject(u) ? p.merge({}, u) : p.isArray(u) ? u.slice() : u;
  }
  function o(i, u, h, b) {
    if (p.isUndefined(u)) {
      if (!p.isUndefined(i))
        return n(void 0, i, h, b);
    } else return n(i, u, h, b);
  }
  function a(i, u) {
    if (!p.isUndefined(u))
      return n(void 0, u);
  }
  function c(i, u) {
    if (p.isUndefined(u)) {
      if (!p.isUndefined(i))
        return n(void 0, i);
    } else return n(void 0, u);
  }
  function f(i, u, h) {
    if (h in e)
      return n(i, u);
    if (h in t)
      return n(void 0, i);
  }
  const T = {
    url: a,
    method: a,
    data: a,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    withXSRFToken: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: f,
    headers: (i, u, h) => o(dt(i), dt(u), h, !0)
  };
  return p.forEach(Object.keys(Object.assign({}, t, e)), function(u) {
    const h = T[u] || o, b = h(t[u], e[u], u);
    p.isUndefined(b) && h !== f || (r[u] = b);
  }), r;
}
const qt = (t) => {
  const e = ce({}, t);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: a, headers: c, auth: f } = e;
  e.headers = c = te.from(c), e.url = Pt(Ht(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), f && c.set(
    "Authorization",
    "Basic " + btoa((f.username || "") + ":" + (f.password ? unescape(encodeURIComponent(f.password)) : ""))
  );
  let T;
  if (p.isFormData(r)) {
    if (G.hasStandardBrowserEnv || G.hasStandardBrowserWebWorkerEnv)
      c.setContentType(void 0);
    else if ((T = c.getContentType()) !== !1) {
      const [i, ...u] = T ? T.split(";").map((h) => h.trim()).filter(Boolean) : [];
      c.setContentType([i || "multipart/form-data", ...u].join("; "));
    }
  }
  if (G.hasStandardBrowserEnv && (n && p.isFunction(n) && (n = n(e)), n || n !== !1 && pn(e.url))) {
    const i = o && a && mn.read(a);
    i && c.set(o, i);
  }
  return e;
}, bn = typeof XMLHttpRequest < "u", _n = bn && function(t) {
  return new Promise(function(r, n) {
    const o = qt(t);
    let a = o.data;
    const c = te.from(o.headers).normalize();
    let { responseType: f, onUploadProgress: T, onDownloadProgress: i } = o, u, h, b, m, d;
    function k() {
      m && m(), d && d(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let _ = new XMLHttpRequest();
    _.open(o.method.toUpperCase(), o.url, !0), _.timeout = o.timeout;
    function I() {
      if (!_)
        return;
      const $ = te.from(
        "getAllResponseHeaders" in _ && _.getAllResponseHeaders()
      ), F = {
        data: !f || f === "text" || f === "json" ? _.responseText : _.response,
        status: _.status,
        statusText: _.statusText,
        headers: $,
        config: t,
        request: _
      };
      Yt(function(z) {
        r(z), k();
      }, function(z) {
        n(z), k();
      }, F), _ = null;
    }
    "onloadend" in _ ? _.onloadend = I : _.onreadystatechange = function() {
      !_ || _.readyState !== 4 || _.status === 0 && !(_.responseURL && _.responseURL.indexOf("file:") === 0) || setTimeout(I);
    }, _.onabort = function() {
      _ && (n(new P("Request aborted", P.ECONNABORTED, t, _)), _ = null);
    }, _.onerror = function() {
      n(new P("Network Error", P.ERR_NETWORK, t, _)), _ = null;
    }, _.ontimeout = function() {
      let J = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const F = o.transitional || $t;
      o.timeoutErrorMessage && (J = o.timeoutErrorMessage), n(new P(
        J,
        F.clarifyTimeoutError ? P.ETIMEDOUT : P.ECONNABORTED,
        t,
        _
      )), _ = null;
    }, a === void 0 && c.setContentType(null), "setRequestHeader" in _ && p.forEach(c.toJSON(), function(J, F) {
      _.setRequestHeader(F, J);
    }), p.isUndefined(o.withCredentials) || (_.withCredentials = !!o.withCredentials), f && f !== "json" && (_.responseType = o.responseType), i && ([b, d] = Me(i, !0), _.addEventListener("progress", b)), T && _.upload && ([h, m] = Me(T), _.upload.addEventListener("progress", h), _.upload.addEventListener("loadend", m)), (o.cancelToken || o.signal) && (u = ($) => {
      _ && (n(!$ || $.type ? new le(null, t, _) : $), _.abort(), _ = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const U = dn(o.url);
    if (U && G.protocols.indexOf(U) === -1) {
      n(new P("Unsupported protocol " + U + ":", P.ERR_BAD_REQUEST, t));
      return;
    }
    _.send(a || null);
  });
}, wn = (t, e) => {
  const { length: r } = t = t ? t.filter(Boolean) : [];
  if (e || r) {
    let n = new AbortController(), o;
    const a = function(i) {
      if (!o) {
        o = !0, f();
        const u = i instanceof Error ? i : this.reason;
        n.abort(u instanceof P ? u : new le(u instanceof Error ? u.message : u));
      }
    };
    let c = e && setTimeout(() => {
      c = null, a(new P(`timeout ${e} of ms exceeded`, P.ETIMEDOUT));
    }, e);
    const f = () => {
      t && (c && clearTimeout(c), c = null, t.forEach((i) => {
        i.unsubscribe ? i.unsubscribe(a) : i.removeEventListener("abort", a);
      }), t = null);
    };
    t.forEach((i) => i.addEventListener("abort", a));
    const { signal: T } = n;
    return T.unsubscribe = () => p.asap(f), T;
  }
}, kn = function* (t, e) {
  let r = t.byteLength;
  if (r < e) {
    yield t;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + e, yield t.slice(n, o), n = o;
}, vn = async function* (t, e) {
  for await (const r of Sn(t))
    yield* kn(r, e);
}, Sn = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await e.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await e.cancel();
  }
}, ft = (t, e, r, n) => {
  const o = vn(t, e);
  let a = 0, c, f = (T) => {
    c || (c = !0, n && n(T));
  };
  return new ReadableStream({
    async pull(T) {
      try {
        const { done: i, value: u } = await o.next();
        if (i) {
          f(), T.close();
          return;
        }
        let h = u.byteLength;
        if (r) {
          let b = a += h;
          r(b);
        }
        T.enqueue(new Uint8Array(u));
      } catch (i) {
        throw f(i), i;
      }
    },
    cancel(T) {
      return f(T), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Pe = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", zt = Pe && typeof ReadableStream == "function", En = Pe && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), Kt = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, Tn = zt && Kt(() => {
  let t = !1;
  const e = new Request(G.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), ht = 64 * 1024, Ze = zt && Kt(() => p.isReadableStream(new Response("").body)), Oe = {
  stream: Ze && ((t) => t.body)
};
Pe && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !Oe[e] && (Oe[e] = p.isFunction(t[e]) ? (r) => r[e]() : (r, n) => {
      throw new P(`Response type '${e}' is not supported`, P.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const An = async (t) => {
  if (t == null)
    return 0;
  if (p.isBlob(t))
    return t.size;
  if (p.isSpecCompliantForm(t))
    return (await new Request(G.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (p.isArrayBufferView(t) || p.isArrayBuffer(t))
    return t.byteLength;
  if (p.isURLSearchParams(t) && (t = t + ""), p.isString(t))
    return (await En(t)).byteLength;
}, Rn = async (t, e) => {
  const r = p.toFiniteNumber(t.getContentLength());
  return r ?? An(e);
}, xn = Pe && (async (t) => {
  let {
    url: e,
    method: r,
    data: n,
    signal: o,
    cancelToken: a,
    timeout: c,
    onDownloadProgress: f,
    onUploadProgress: T,
    responseType: i,
    headers: u,
    withCredentials: h = "same-origin",
    fetchOptions: b
  } = qt(t);
  i = i ? (i + "").toLowerCase() : "text";
  let m = wn([o, a && a.toAbortSignal()], c), d;
  const k = m && m.unsubscribe && (() => {
    m.unsubscribe();
  });
  let _;
  try {
    if (T && Tn && r !== "get" && r !== "head" && (_ = await Rn(u, n)) !== 0) {
      let F = new Request(e, {
        method: "POST",
        body: n,
        duplex: "half"
      }), V;
      if (p.isFormData(n) && (V = F.headers.get("content-type")) && u.setContentType(V), F.body) {
        const [z, j] = ut(
          _,
          Me(lt(T))
        );
        n = ft(F.body, ht, z, j);
      }
    }
    p.isString(h) || (h = h ? "include" : "omit");
    const I = "credentials" in Request.prototype;
    d = new Request(e, {
      ...b,
      signal: m,
      method: r.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: I ? h : void 0
    });
    let U = await fetch(d);
    const $ = Ze && (i === "stream" || i === "response");
    if (Ze && (f || $ && k)) {
      const F = {};
      ["status", "statusText", "headers"].forEach((K) => {
        F[K] = U[K];
      });
      const V = p.toFiniteNumber(U.headers.get("content-length")), [z, j] = f && ut(
        V,
        Me(lt(f), !0)
      ) || [];
      U = new Response(
        ft(U.body, ht, z, () => {
          j && j(), k && k();
        }),
        F
      );
    }
    i = i || "text";
    let J = await Oe[p.findKey(Oe, i) || "text"](U, t);
    return !$ && k && k(), await new Promise((F, V) => {
      Yt(F, V, {
        data: J,
        headers: te.from(U.headers),
        status: U.status,
        statusText: U.statusText,
        config: t,
        request: d
      });
    });
  } catch (I) {
    throw k && k(), I && I.name === "TypeError" && /Load failed|fetch/i.test(I.message) ? Object.assign(
      new P("Network Error", P.ERR_NETWORK, t, d),
      {
        cause: I.cause || I
      }
    ) : P.from(I, I && I.code, t, d);
  }
}), Qe = {
  http: Yr,
  xhr: _n,
  fetch: xn
};
p.forEach(Qe, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const pt = (t) => `- ${t}`, Cn = (t) => p.isFunction(t) || t === null || t === !1, Vt = {
  getAdapter: (t) => {
    t = p.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    const o = {};
    for (let a = 0; a < e; a++) {
      r = t[a];
      let c;
      if (n = r, !Cn(r) && (n = Qe[(c = String(r)).toLowerCase()], n === void 0))
        throw new P(`Unknown adapter '${c}'`);
      if (n)
        break;
      o[c || "#" + a] = n;
    }
    if (!n) {
      const a = Object.entries(o).map(
        ([f, T]) => `adapter ${f} ` + (T === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let c = e ? a.length > 1 ? `since :
` + a.map(pt).join(`
`) : " " + pt(a[0]) : "as no adapter specified";
      throw new P(
        "There is no suitable adapter to dispatch the request " + c,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Qe
};
function qe(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new le(null, t);
}
function mt(t) {
  return qe(t), t.headers = te.from(t.headers), t.data = He.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Vt.getAdapter(t.adapter || ye.adapter)(t).then(function(n) {
    return qe(t), n.data = He.call(
      t,
      t.transformResponse,
      n
    ), n.headers = te.from(n.headers), n;
  }, function(n) {
    return Bt(n) || (qe(t), n && n.response && (n.response.data = He.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = te.from(n.response.headers))), Promise.reject(n);
  });
}
const Jt = "1.9.0", $e = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  $e[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const gt = {};
$e.transitional = function(e, r, n) {
  function o(a, c) {
    return "[Axios v" + Jt + "] Transitional option '" + a + "'" + c + (n ? ". " + n : "");
  }
  return (a, c, f) => {
    if (e === !1)
      throw new P(
        o(c, " has been removed" + (r ? " in " + r : "")),
        P.ERR_DEPRECATED
      );
    return r && !gt[c] && (gt[c] = !0, console.warn(
      o(
        c,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(a, c, f) : !0;
  };
};
$e.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Mn(t, e, r) {
  if (typeof t != "object")
    throw new P("options must be an object", P.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o], c = e[a];
    if (c) {
      const f = t[a], T = f === void 0 || c(f, a, t);
      if (T !== !0)
        throw new P("option " + a + " must be " + T, P.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new P("Unknown option " + a, P.ERR_BAD_OPTION);
  }
}
const ve = {
  assertOptions: Mn,
  validators: $e
}, se = ve.validators;
let ae = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new at(),
      response: new at()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const a = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? a && !String(n.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + a) : n.stack = a;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = ce(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && ve.assertOptions(n, {
      silentJSONParsing: se.transitional(se.boolean),
      forcedJSONParsing: se.transitional(se.boolean),
      clarifyTimeoutError: se.transitional(se.boolean)
    }, !1), o != null && (p.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : ve.assertOptions(o, {
      encode: se.function,
      serialize: se.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), ve.assertOptions(r, {
      baseUrl: se.spelling("baseURL"),
      withXsrfToken: se.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let c = a && p.merge(
      a.common,
      a[r.method]
    );
    a && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete a[d];
      }
    ), r.headers = te.concat(c, a);
    const f = [];
    let T = !0;
    this.interceptors.request.forEach(function(k) {
      typeof k.runWhen == "function" && k.runWhen(r) === !1 || (T = T && k.synchronous, f.unshift(k.fulfilled, k.rejected));
    });
    const i = [];
    this.interceptors.response.forEach(function(k) {
      i.push(k.fulfilled, k.rejected);
    });
    let u, h = 0, b;
    if (!T) {
      const d = [mt.bind(this), void 0];
      for (d.unshift.apply(d, f), d.push.apply(d, i), b = d.length, u = Promise.resolve(r); h < b; )
        u = u.then(d[h++], d[h++]);
      return u;
    }
    b = f.length;
    let m = r;
    for (h = 0; h < b; ) {
      const d = f[h++], k = f[h++];
      try {
        m = d(m);
      } catch (_) {
        k.call(this, _);
        break;
      }
    }
    try {
      u = mt.call(this, m);
    } catch (d) {
      return Promise.reject(d);
    }
    for (h = 0, b = i.length; h < b; )
      u = u.then(i[h++], i[h++]);
    return u;
  }
  getUri(e) {
    e = ce(this.defaults, e);
    const r = Ht(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Pt(r, e.params, e.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(e) {
  ae.prototype[e] = function(r, n) {
    return this.request(ce(n || {}, {
      method: e,
      url: r,
      data: (n || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
    return function(a, c, f) {
      return this.request(ce(f || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: c
      }));
    };
  }
  ae.prototype[e] = r(), ae.prototype[e + "Form"] = r(!0);
});
let On = class Wt {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; )
        n._listeners[a](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const c = new Promise((f) => {
        n.subscribe(f), a = f;
      }).then(o);
      return c.cancel = function() {
        n.unsubscribe(a);
      }, c;
    }, e(function(a, c, f) {
      n.reason || (n.reason = new le(a, c, f), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), r = (n) => {
      e.abort(n);
    };
    return this.subscribe(r), e.signal.unsubscribe = () => this.unsubscribe(r), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Wt(function(o) {
        e = o;
      }),
      cancel: e
    };
  }
};
function Un(t) {
  return function(r) {
    return t.apply(null, r);
  };
}
function Ln(t) {
  return p.isObject(t) && t.isAxiosError === !0;
}
const et = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(et).forEach(([t, e]) => {
  et[e] = t;
});
function Gt(t) {
  const e = new ae(t), r = At(ae.prototype.request, e);
  return p.extend(r, ae.prototype, e, { allOwnKeys: !0 }), p.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Gt(ce(t, o));
  }, r;
}
const q = Gt(ye);
q.Axios = ae;
q.CanceledError = le;
q.CancelToken = On;
q.isCancel = Bt;
q.VERSION = Jt;
q.toFormData = Fe;
q.AxiosError = P;
q.Cancel = q.CanceledError;
q.all = function(e) {
  return Promise.all(e);
};
q.spread = Un;
q.isAxiosError = Ln;
q.mergeConfig = ce;
q.AxiosHeaders = te;
q.formToJSON = (t) => jt(p.isHTMLForm(t) ? new FormData(t) : t);
q.getAdapter = Vt.getAdapter;
q.HttpStatusCode = et;
q.default = q;
const {
  Axios: hs,
  AxiosError: ps,
  CanceledError: ms,
  isCancel: gs,
  CancelToken: ys,
  VERSION: bs,
  all: _s,
  Cancel: ws,
  isAxiosError: ks,
  spread: vs,
  toFormData: Ss,
  AxiosHeaders: Es,
  HttpStatusCode: Ts,
  formToJSON: As,
  getAdapter: Rs,
  mergeConfig: xs
} = q;
class X {
  constructor() {
    if (this.constructor === X)
      throw new TypeError(
        'Abstract class "AbstractService" cannot be instantiated directly'
      );
    return this.instance || (this.instance = this), this.instance;
  }
  clear() {
  }
  isInitialized() {
    return !0;
  }
  checkIsInitialized() {
    if (this.isInitialized()) return !0;
    throw Error("Service should be initialized first");
  }
}
class Nn extends X {
  constructor() {
    super(), this._i18n_t = null;
  }
  setI18n(e) {
    this._i18n_t = e;
  }
  hasCoverageCriteria(e) {
    return Object.keys(this.getCoverageCritNames(e)).length > 0;
  }
  getCoverageCritNames(e) {
    return Object.keys(e).reduce((r, n) => (n.includes("coverage_duration") ? r.duration = n : n.includes("coverage_km") && (r.km = n), r), {});
  }
  hasCoverageDurationKmCouple(e) {
    const r = this.getCoverageCritNames(e);
    return ["duration", "km"].every((n) => Object.keys(r).includes(n));
  }
  isCriterionValueInCovDurationOptions(e, r, n) {
    return Object.keys(r).includes(e[n]);
  }
  getValidCoverageDurationWithoutSelectValues(e, r, n = null) {
    const o = Object.keys(r);
    return n ? (o.includes(e[n]) || (e[n] = o[0]), e) : o.includes(e) ? e : o[0];
  }
  getValidCoverageDuration(e, r, n) {
    const o = this.getCoverageCritNames(e), a = e[o.duration], c = r[o.duration];
    return n.duration[a] ? e : a !== c && n.duration[c] ? r : {
      [o.duration]: Object.keys(n.duration).filter(
        (f) => n.duration[f] === !0
      )[0]
    };
  }
  getCoverageDurationFirstSelectableValue(e) {
    return Object.keys(e.duration_km).filter(
      (n) => this._isCoverageCoupleDurationSelectable(e, n)
    )[0];
  }
  getValidCoverageCouple(e, r, n) {
    const o = this.getCoverageCritNames(e), a = e[o.duration], c = e[o.km], f = r[o.duration], T = r[o.km];
    return n.duration_km[a][c] ? e : (a !== f || c !== T) && n.duration_km[f][T] ? r : {
      [o.duration]: this.getCoverageDurationFirstSelectableValue(n),
      [o.km]: this.getCoverageKmFirstSelectableValue(n)
    };
  }
  getValidCoverageCoupleOnDurationChange(e, r) {
    const n = this.getCoverageCritNames(e), o = e[n.duration], a = e[n.km], c = this.getCoverageKmFirstSelectableValueForDuration(
      r,
      o
    );
    return r.duration_km[o][a] || c === null ? {
      [n.duration]: o,
      [n.km]: a
    } : {
      [n.duration]: o,
      [n.km]: c
    };
  }
  getCoverageKmFirstSelectableValue(e) {
    for (const r of Object.keys(e.duration_km)) {
      const n = this.getCoverageKmFirstSelectableValueForDuration(
        e,
        r
      );
      if (n !== null)
        return n;
    }
  }
  getCoverageDurationOptions(e, r) {
    return this.hasCoverageDurationKmCouple(e) ? Object.keys(r.duration_km).reduce(
      (n, o) => (this._isCoverageCoupleDurationSelectable(r, o) && (n[o] = this._i18n_t(`criteria.durations.${o}`)), n),
      {}
    ) : Object.keys(r.duration).reduce((n, o) => (r.duration[o] && (n[o] = this._i18n_t(`criteria.durations.${o}`)), n), {});
  }
  getCoverageKmOptionsForDuration(e, r) {
    return Object.keys(e.duration_km[r]).reduce(
      (n, o) => (e.duration_km[r][o] && (n[o] = this._i18n_t(`criteria.kms.${o}`)), n),
      {}
    );
  }
  getCoverageKmFirstSelectableValueForDuration(e, r) {
    const n = Object.keys(
      e.duration_km[r]
    ).filter((o) => e.duration_km[r][o] === !0);
    return n.length > 0 ? (n.sort((o, a) => o.localeCompare(a, void 0, {
      numeric: !0,
      sensitivity: "base"
    })), n[0]) : null;
  }
  _isCoverageCoupleDurationSelectable(e, r) {
    return Object.values(e.duration_km[r]).some(
      (n) => n === !0
    );
  }
  areAllCoverageUserSelectableValuesFalse(e) {
    let r = [];
    return Object.prototype.hasOwnProperty.call(e, "duration_km") ? r = Object.values(e.duration_km).map((n) => Object.values(n)).flat() : r = Object.values(e.duration).flat(), !r.some((n) => n === !0);
  }
  areAllCoverageUserSelectableValuesTrue(e) {
    let r = [];
    return Object.prototype.hasOwnProperty.call(e, "duration_km") ? r = Object.values(e.duration_km).map((n) => Object.values(n)).flat() : r = Object.values(e.duration).flat(), !r.some((n) => n === !1);
  }
}
let Cs = new Nn();
class In extends X {
  constructor() {
    super(...arguments);
    be(this, "special_criteria", ["sales_mode_", "usage_"]);
  }
  getSpecialCriteriaValue(r, n, o) {
    for (let a in n) {
      const c = n[a];
      if (c.startsWith(o))
        return c;
    }
    return "";
  }
  getSpecialCriteriaName(r) {
    let n = [];
    for (let o in r) {
      const a = r[o];
      for (let c in this.special_criteria)
        a.startsWith(this.special_criteria[c]) && n.push(a);
    }
    return n;
  }
}
let Ms = new In();
class Dn extends X {
  constructor() {
    super(...arguments);
    be(this, "currencyCode", {
      kow: "₩",
      eur: "€"
    });
  }
  getCurrencySymbol() {
    return this.currencyCode["eur"];
  }
  getProductMemoCurrencySymbol(r) {
    return r !== "ko" ? this.currencyCode.eur : this.currencyCode.kow;
  }
  getCurrencyEurToKrwRate() {
    return 1400;
  }
}
const Os = new Dn(), Us = 1, Ls = 2, Ns = 3, Is = 4, Ds = 5, Fs = 6;
class Fn extends X {
  constructor() {
    super(...arguments);
    be(this, "mappingGroups", {
      1: "internal_admin",
      2: "distributor_admin",
      3: "internal_user",
      4: "seller_distributor",
      5: "beneficiary",
      6: "guest"
    });
  }
  get INTERNAL_ADMIN() {
    return 1;
  }
  get DISTRIBUTOR_ADMIN() {
    return 2;
  }
  get INTERNAL_USER() {
    return 3;
  }
  get SELLER_DISTRIBUTOR() {
    return 4;
  }
  get BENEFICIARY() {
    return 5;
  }
  get GUEST() {
    return 6;
  }
  getCodeById(r) {
    return this.mappingGroups[r];
  }
}
let Pn = new Fn();
const $n = { title: "Select a vehicle", by_plate: "By plate number", by_vin: "By VIN number", by_manual_search: "By manual search", brand_and_model: "Brand / model", refine_the_search: "Refine the search", placeholder: { plate: "", vin: "Enter the VIN serial number" }, button: { search: "Search", modify_search: "Edit search", modify_version: "Edit version", validate: "Validate", next: "Next" }, help: { velastic: "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, error: { number: "Please enter a valid number" }, pick_version: "Choose a result", results_for: "results for", no_results: "No result", km: "Mileage", age: "Age", year: "Year", month: "Month", price: "Price", automatic: "Automatic", manual: "Manual", essence: "gasoline", diesel: "diesel", electrique: "electric", gpl: "lpg", hybride: "hybrid", horsepower: "Hp", erase_filters: "Erase filters", filter: "Filter", make: "Make", model: "Model", energy: "Energy", version: "Version", trim_level: "Trim level", fiscal_hp: "Fiscal power", all_make: "All", all_trim_level: "All", all_version: "All", all_model: "All", all_energy: "All" }, jn = {
  search: $n
}, Bn = { emptySelect: "List is empty" }, Yn = {
  rowSelect: Bn
}, Hn = "MMMM d, yyyy", qn = {
  date_format: Hn
}, zn = { vehicle: jn, form: Yn, datepicker: qn }, Kn = { title: "Sélectionnez un véhicule", by_plate: "Par plaque d'immatriculation", by_vin: "Par numéro de chassis", by_manual_search: "Par recherche directe", brand_and_model: "Marque / modèle", refine_the_search: "Affinez la recherche", placeholder: { plate: "", vin: "Saisissez le n° de serie VIN" }, button: { search: "Rechercher", modify_search: "Modifier la recherche", modify_version: "Modifier la version", validate: "Valider", next: "Suivant" }, help: { velastic: "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, error: { number: "Veuillez renseigner un nombre valide" }, pick_version: "Sélectionnez un des résultats", results_for: "résultats pour", no_results: "Aucun résultat", km: "Kilométrage", age: "Age", year: "Année", month: "Mois", price: "Prix", automatic: "Automatique", manual: "Manuelle", essence: "essence", diesel: "diesel", electrique: "électrique", gpl: "gpl", hybride: "hybride", horsepower: "Cv", erase_filters: "Effacer les filtres", filter: "Filtrer", make: "Marque", model: "Modèle", energy: "Énergie", version: "Version", trim_level: "Finition", fiscal_hp: "Puissance fiscale", all_make: "Toutes", all_trim_level: "Toutes", all_version: "Toutes", all_model: "Tous", all_energy: "Toutes" }, Vn = {
  search: Kn
}, Jn = { emptySelect: "La liste est vide" }, Wn = {
  rowSelect: Jn
}, Gn = "d MMMM yyyy", Xn = {
  date_format: Gn
}, Zn = { vehicle: Vn, form: Wn, datepicker: Xn }, Qn = { title: "Seleccione un vehículo", by_plate: "Por matrícula", by_vin: "Por número de chasis", by_manual_search: "Por búsqueda directa", brand_and_model: "Marca / modelo", refine_the_search: "Refinar la búsqueda", placeholder: { plate: "", vin: "Introduzca el número de serie del VIN" }, button: { search: "Buscar en", modify_search: "Modificar la búsqueda", modify_version: "Cambiar la versión", validate: "Validar", next: "Siguiente" }, help: { velastic: "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, error: { number: "Introduzca un número válido" }, pick_version: "Seleccione uno de los resultados", results_for: "resultados para", no_results: "Sin resultados", km: "Kilometraje", age: "Edad", year: "Año", month: "Mes", price: "Premios", automatic: "Automático", manual: "Manual", essence: "gasolina", diesel: "diesel", electrique: "eléctrico", gpl: "glp", hybride: "híbrido", horsepower: "potencia", erase_filters: "Borrar filtros", filter: "Filtro", make: "Marca", model: "Modelo", energy: "Energía", version: "Versión", trim_level: "Acabado", fiscal_hp: "Poder fiscal", all_make: "Todos", all_trim_level: "Todos", all_version: "Todos", all_model: "Todos", all_energy: "Todos" }, eo = {
  search: Qn
}, to = { emptySelect: "La lista está vacía" }, ro = {
  rowSelect: to
}, no = "d 'de' MMMM 'de' yyyy", oo = {
  date_format: no
}, so = { vehicle: eo, form: ro, datepicker: oo }, io = { title: "차량 선택", by_plate: "번호판별", by_vin: "섀시 번호별", by_manual_search: "직접 검색으로", brand_and_model: "제조사/모델", refine_the_search: "검색 구체화", placeholder: { plate: "", vin: "VIN 일련 번호를 입력합니다." }, button: { search: "검색", modify_search: "검색 수정하기", modify_version: "버전 변경", validate: "유효성 검사", next: "다음" }, help: { velastic: "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, error: { number: "유효한 번호를 입력하세요." }, pick_version: "다음 결과 중 하나를 선택합니다.", results_for: "에 대한 결과", no_results: "결과 없음", km: "마일리지", age: "나이", year: "연도", month: "월", price: "수상 경력", automatic: "자동", manual: "매뉴얼", essence: "가솔린", diesel: "디젤", electrique: "전기", gpl: "액화석유가스", hybride: "하이브리드", horsepower: "마력", erase_filters: "필터 삭제", filter: "필터", make: "브랜드", model: "모델", energy: "에너지", version: "버전", trim_level: "완료", fiscal_hp: "재정 능력", all_make: "모두", all_trim_level: "모두", all_version: "모두", all_model: "모두", all_energy: "모두" }, ao = {
  search: io
}, co = { emptySelect: "목록이 비어 있습니다." }, uo = {
  rowSelect: co
}, lo = "yyyy년 M월 d일", fo = {
  date_format: lo
}, ho = { vehicle: ao, form: uo, datepicker: fo }, po = { currency: { style: "currency", currency: "EUR" }, cash_pricing: { style: "currency", minimumFractionDigits: 0, maximumFractionDigits: 0 }, monthly_pricing: { style: "currency", minimumFractionDigits: 2, maximumFractionDigits: 2 } }, mo = { currency: { style: "currency", currency: "EUR" }, cash_pricing: { style: "currency", minimumFractionDigits: 0, maximumFractionDigits: 0 }, monthly_pricing: { style: "currency", minimumFractionDigits: 2, maximumFractionDigits: 2 } }, go = {
  fr: po,
  en: mo
}, yo = {
  en: zn,
  fr: Zn,
  es: so,
  ko: ho
}, me = er({
  legacy: !1,
  // Vous devez définir cette option sur false pour Vue 3
  fallbackLocale: "fr",
  locale: "fr",
  messages: yo,
  numberFormats: go
});
class bo extends X {
  /**
   * Return the price formatted for display, according to the current locale and whether it's a cash or monthly price.
   * Cash price must be displayed without any decimals ; monthly price must be displayed with 2 decimals.
   *
   * @param {Number} price price to be formatted
   * @param {String} currency_code currency_code to be applied
   * @param {Boolean} isMonthly whether it's a monthly price or not
   *
   * @returns {String} formatted price
   */
  getFormattedPriceToDisplay(e, r = !1, n = "EUR") {
    const o = r ? "monthly_pricing" : "cash_pricing";
    return me.global.n(e, { key: o, currency: n });
  }
}
const Ps = new bo();
class _o extends X {
  isArray(e) {
    return Array.isArray(e);
  }
  /**
   * Creates a sequence of numbers, starting from 0 by default, increments by 1
   * and stops before a specified number
   *
   * same as Python range()
   *
   * @param start
   * @param end
   * @returns {unknown[]}
   */
  range(e, r) {
    return [...Array(r - e).keys()].map((n) => e + n);
  }
  areSame(e, r) {
    return e.every((n) => r.includes(n)) && r.every((n) => e.includes(n));
  }
  /**
   * Adds an element to the array if it does not already exist
   *
   * @param baseArray
   * @param value
   */
  pushIfNotExist(e, r) {
    return e.includes(r) || e.push(r), e;
  }
  /**
   * Return an object containing only the entries common to all objects.
   * Limitation: dict should contain only simple types
   *
   * @param {Array} array
   */
  getObjectWithCommonEntriesOnly(e) {
    if (e.length === 0)
      return {};
    const r = [...e], n = r.sort((o, a) => Object.keys(o).length > Object.keys(a).length ? 1 : -1);
    return Object.fromEntries(
      Object.entries(n[0]).filter(([o]) => r.every((a) => Object.keys(a).includes(o)))
    );
  }
  /**
   * Returns the length of the longest string in the provided array.
   *
   * @param array
   * @returns {Number}
   */
  getStringMaxLength(e) {
    return e.reduce((r, n) => n.length > r ? n.length : r, 0);
  }
  /**
   * Check if array contains provided values.
   * Values must be simple elements like string, integers, ...
   *
   * @param baseArray
   * @param values
   * @returns boolean
   */
  areValuesInArray(e, r) {
    return r.every((n) => e.includes(n));
  }
  /**
   * Returns an array that contains the items of both input arrays, without duplicated items.
   *
   * @param array1
   * @param array2
   * @returns {Array}
   */
  concatWithoutDuplicates(e, r) {
    let n = e;
    return r.forEach(
      (o) => n = wo.pushIfNotExist(n, o)
    ), n;
  }
  /**
   * Returns an array that contains the items in ascending order.
   *
   * @param array
   * @returns {Array}
   */
  sortIntegers(e) {
    if (e.some((r) => !Number.isInteger(r)))
      throw new TypeError();
    return e.sort((r, n) => r - n);
  }
  /**
   * Returns an indicator whether an object with the provided values exists in an array.
   * It only checks property - value couples not whether it's the same object.
   *
   * @param array
   * @param object
   * @returns {boolean}
   */
  isObjectWithSameValuesInArray(e, r) {
    return e.some((n) => JSON.stringify(n) === JSON.stringify(r));
  }
}
let wo = new _o();
function de(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Se = { exports: {} }, ko = Se.exports, yt;
function je() {
  return yt || (yt = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(ko, function() {
      var r = 1e3, n = 6e4, o = 36e5, a = "millisecond", c = "second", f = "minute", T = "hour", i = "day", u = "week", h = "month", b = "quarter", m = "year", d = "date", k = "Invalid Date", _ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, I = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, U = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(L) {
        var R = ["th", "st", "nd", "rd"], A = L % 100;
        return "[" + L + (R[(A - 20) % 10] || R[A] || R[0]) + "]";
      } }, $ = function(L, R, A) {
        var O = String(L);
        return !O || O.length >= R ? L : "" + Array(R + 1 - O.length).join(A) + L;
      }, J = { s: $, z: function(L) {
        var R = -L.utcOffset(), A = Math.abs(R), O = Math.floor(A / 60), x = A % 60;
        return (R <= 0 ? "+" : "-") + $(O, 2, "0") + ":" + $(x, 2, "0");
      }, m: function L(R, A) {
        if (R.date() < A.date()) return -L(A, R);
        var O = 12 * (A.year() - R.year()) + (A.month() - R.month()), x = R.clone().add(O, h), D = A - x < 0, s = R.clone().add(O + (D ? -1 : 1), h);
        return +(-(O + (A - x) / (D ? x - s : s - x)) || 0);
      }, a: function(L) {
        return L < 0 ? Math.ceil(L) || 0 : Math.floor(L);
      }, p: function(L) {
        return { M: h, y: m, w: u, d: i, D: d, h: T, m: f, s: c, ms: a, Q: b }[L] || String(L || "").toLowerCase().replace(/s$/, "");
      }, u: function(L) {
        return L === void 0;
      } }, F = "en", V = {};
      V[F] = U;
      var z = "$isDayjsObject", j = function(L) {
        return L instanceof re || !(!L || !L[z]);
      }, K = function L(R, A, O) {
        var x;
        if (!R) return F;
        if (typeof R == "string") {
          var D = R.toLowerCase();
          V[D] && (x = D), A && (V[D] = A, x = D);
          var s = R.split("-");
          if (!x && s.length > 1) return L(s[0]);
        } else {
          var l = R.name;
          V[l] = R, x = l;
        }
        return !O && x && (F = x), x || !O && F;
      }, Y = function(L, R) {
        if (j(L)) return L.clone();
        var A = typeof R == "object" ? R : {};
        return A.date = L, A.args = arguments, new re(A);
      }, B = J;
      B.l = K, B.i = j, B.w = function(L, R) {
        return Y(L, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
      };
      var re = function() {
        function L(A) {
          this.$L = K(A.locale, null, !0), this.parse(A), this.$x = this.$x || A.x || {}, this[z] = !0;
        }
        var R = L.prototype;
        return R.parse = function(A) {
          this.$d = function(O) {
            var x = O.date, D = O.utc;
            if (x === null) return /* @__PURE__ */ new Date(NaN);
            if (B.u(x)) return /* @__PURE__ */ new Date();
            if (x instanceof Date) return new Date(x);
            if (typeof x == "string" && !/Z$/i.test(x)) {
              var s = x.match(_);
              if (s) {
                var l = s[2] - 1 || 0, w = (s[7] || "0").substring(0, 3);
                return D ? new Date(Date.UTC(s[1], l, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, w)) : new Date(s[1], l, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, w);
              }
            }
            return new Date(x);
          }(A), this.init();
        }, R.init = function() {
          var A = this.$d;
          this.$y = A.getFullYear(), this.$M = A.getMonth(), this.$D = A.getDate(), this.$W = A.getDay(), this.$H = A.getHours(), this.$m = A.getMinutes(), this.$s = A.getSeconds(), this.$ms = A.getMilliseconds();
        }, R.$utils = function() {
          return B;
        }, R.isValid = function() {
          return this.$d.toString() !== k;
        }, R.isSame = function(A, O) {
          var x = Y(A);
          return this.startOf(O) <= x && x <= this.endOf(O);
        }, R.isAfter = function(A, O) {
          return Y(A) < this.startOf(O);
        }, R.isBefore = function(A, O) {
          return this.endOf(O) < Y(A);
        }, R.$g = function(A, O, x) {
          return B.u(A) ? this[O] : this.set(x, A);
        }, R.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, R.valueOf = function() {
          return this.$d.getTime();
        }, R.startOf = function(A, O) {
          var x = this, D = !!B.u(O) || O, s = B.p(A), l = function(N, M) {
            var H = B.w(x.$u ? Date.UTC(x.$y, M, N) : new Date(x.$y, M, N), x);
            return D ? H : H.endOf(i);
          }, w = function(N, M) {
            return B.w(x.toDate()[N].apply(x.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(M)), x);
          }, v = this.$W, S = this.$M, E = this.$D, g = "set" + (this.$u ? "UTC" : "");
          switch (s) {
            case m:
              return D ? l(1, 0) : l(31, 11);
            case h:
              return D ? l(1, S) : l(0, S + 1);
            case u:
              var y = this.$locale().weekStart || 0, C = (v < y ? v + 7 : v) - y;
              return l(D ? E - C : E + (6 - C), S);
            case i:
            case d:
              return w(g + "Hours", 0);
            case T:
              return w(g + "Minutes", 1);
            case f:
              return w(g + "Seconds", 2);
            case c:
              return w(g + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, R.endOf = function(A) {
          return this.startOf(A, !1);
        }, R.$set = function(A, O) {
          var x, D = B.p(A), s = "set" + (this.$u ? "UTC" : ""), l = (x = {}, x[i] = s + "Date", x[d] = s + "Date", x[h] = s + "Month", x[m] = s + "FullYear", x[T] = s + "Hours", x[f] = s + "Minutes", x[c] = s + "Seconds", x[a] = s + "Milliseconds", x)[D], w = D === i ? this.$D + (O - this.$W) : O;
          if (D === h || D === m) {
            var v = this.clone().set(d, 1);
            v.$d[l](w), v.init(), this.$d = v.set(d, Math.min(this.$D, v.daysInMonth())).$d;
          } else l && this.$d[l](w);
          return this.init(), this;
        }, R.set = function(A, O) {
          return this.clone().$set(A, O);
        }, R.get = function(A) {
          return this[B.p(A)]();
        }, R.add = function(A, O) {
          var x, D = this;
          A = Number(A);
          var s = B.p(O), l = function(S) {
            var E = Y(D);
            return B.w(E.date(E.date() + Math.round(S * A)), D);
          };
          if (s === h) return this.set(h, this.$M + A);
          if (s === m) return this.set(m, this.$y + A);
          if (s === i) return l(1);
          if (s === u) return l(7);
          var w = (x = {}, x[f] = n, x[T] = o, x[c] = r, x)[s] || 1, v = this.$d.getTime() + A * w;
          return B.w(v, this);
        }, R.subtract = function(A, O) {
          return this.add(-1 * A, O);
        }, R.format = function(A) {
          var O = this, x = this.$locale();
          if (!this.isValid()) return x.invalidDate || k;
          var D = A || "YYYY-MM-DDTHH:mm:ssZ", s = B.z(this), l = this.$H, w = this.$m, v = this.$M, S = x.weekdays, E = x.months, g = x.meridiem, y = function(M, H, W, Q) {
            return M && (M[H] || M(O, D)) || W[H].slice(0, Q);
          }, C = function(M) {
            return B.s(l % 12 || 12, M, "0");
          }, N = g || function(M, H, W) {
            var Q = M < 12 ? "AM" : "PM";
            return W ? Q.toLowerCase() : Q;
          };
          return D.replace(I, function(M, H) {
            return H || function(W) {
              switch (W) {
                case "YY":
                  return String(O.$y).slice(-2);
                case "YYYY":
                  return B.s(O.$y, 4, "0");
                case "M":
                  return v + 1;
                case "MM":
                  return B.s(v + 1, 2, "0");
                case "MMM":
                  return y(x.monthsShort, v, E, 3);
                case "MMMM":
                  return y(E, v);
                case "D":
                  return O.$D;
                case "DD":
                  return B.s(O.$D, 2, "0");
                case "d":
                  return String(O.$W);
                case "dd":
                  return y(x.weekdaysMin, O.$W, S, 2);
                case "ddd":
                  return y(x.weekdaysShort, O.$W, S, 3);
                case "dddd":
                  return S[O.$W];
                case "H":
                  return String(l);
                case "HH":
                  return B.s(l, 2, "0");
                case "h":
                  return C(1);
                case "hh":
                  return C(2);
                case "a":
                  return N(l, w, !0);
                case "A":
                  return N(l, w, !1);
                case "m":
                  return String(w);
                case "mm":
                  return B.s(w, 2, "0");
                case "s":
                  return String(O.$s);
                case "ss":
                  return B.s(O.$s, 2, "0");
                case "SSS":
                  return B.s(O.$ms, 3, "0");
                case "Z":
                  return s;
              }
              return null;
            }(M) || s.replace(":", "");
          });
        }, R.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, R.diff = function(A, O, x) {
          var D, s = this, l = B.p(O), w = Y(A), v = (w.utcOffset() - this.utcOffset()) * n, S = this - w, E = function() {
            return B.m(s, w);
          };
          switch (l) {
            case m:
              D = E() / 12;
              break;
            case h:
              D = E();
              break;
            case b:
              D = E() / 3;
              break;
            case u:
              D = (S - v) / 6048e5;
              break;
            case i:
              D = (S - v) / 864e5;
              break;
            case T:
              D = S / o;
              break;
            case f:
              D = S / n;
              break;
            case c:
              D = S / r;
              break;
            default:
              D = S;
          }
          return x ? D : B.a(D);
        }, R.daysInMonth = function() {
          return this.endOf(h).$D;
        }, R.$locale = function() {
          return V[this.$L];
        }, R.locale = function(A, O) {
          if (!A) return this.$L;
          var x = this.clone(), D = K(A, O, !0);
          return D && (x.$L = D), x;
        }, R.clone = function() {
          return B.w(this.$d, this);
        }, R.toDate = function() {
          return new Date(this.valueOf());
        }, R.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, R.toISOString = function() {
          return this.$d.toISOString();
        }, R.toString = function() {
          return this.$d.toUTCString();
        }, L;
      }(), Z = re.prototype;
      return Y.prototype = Z, [["$ms", a], ["$s", c], ["$m", f], ["$H", T], ["$W", i], ["$M", h], ["$y", m], ["$D", d]].forEach(function(L) {
        Z[L[1]] = function(R) {
          return this.$g(R, L[0], L[1]);
        };
      }), Y.extend = function(L, R) {
        return L.$i || (L(R, re, Y), L.$i = !0), Y;
      }, Y.locale = K, Y.isDayjs = j, Y.unix = function(L) {
        return Y(1e3 * L);
      }, Y.en = V[F], Y.Ls = V, Y.p = {}, Y;
    });
  }(Se)), Se.exports;
}
var vo = je();
const he = /* @__PURE__ */ de(vo);
var Ee = { exports: {} }, So = Ee.exports, bt;
function Eo() {
  return bt || (bt = 1, function(t, e) {
    (function(r, n) {
      t.exports = n(je());
    })(So, function(r) {
      function n(c) {
        return c && typeof c == "object" && "default" in c ? c : { default: c };
      }
      var o = n(r), a = { name: "fr", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinal: function(c) {
        return "" + c + (c === 1 ? "er" : "");
      } };
      return o.default.locale(a, null, !0), a;
    });
  }(Ee)), Ee.exports;
}
var To = Eo();
const _t = /* @__PURE__ */ de(To);
var Te = { exports: {} }, Ao = Te.exports, wt;
function Ro() {
  return wt || (wt = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(Ao, function() {
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
        var n = ["th", "st", "nd", "rd"], o = r % 100;
        return "[" + r + (n[(o - 20) % 10] || n[o] || n[0]) + "]";
      } };
    });
  }(Te)), Te.exports;
}
var xo = Ro();
const Co = /* @__PURE__ */ de(xo);
var Ae = { exports: {} }, Mo = Ae.exports, kt;
function Oo() {
  return kt || (kt = 1, function(t, e) {
    (function(r, n) {
      t.exports = n(je());
    })(Mo, function(r) {
      function n(c) {
        return c && typeof c == "object" && "default" in c ? c : { default: c };
      }
      var o = n(r), a = { name: "es", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(c) {
        return c + "º";
      } };
      return o.default.locale(a, null, !0), a;
    });
  }(Ae)), Ae.exports;
}
var Uo = Oo();
const Lo = /* @__PURE__ */ de(Uo);
var Re = { exports: {} }, No = Re.exports, vt;
function Io() {
  return vt || (vt = 1, function(t, e) {
    (function(r, n) {
      t.exports = n(je());
    })(No, function(r) {
      function n(c) {
        return c && typeof c == "object" && "default" in c ? c : { default: c };
      }
      var o = n(r), a = { name: "ko", weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"), weekdaysShort: "일_월_화_수_목_금_토".split("_"), weekdaysMin: "일_월_화_수_목_금_토".split("_"), months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), ordinal: function(c) {
        return c + "일";
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY년 MMMM D일", LLL: "YYYY년 MMMM D일 A h:mm", LLLL: "YYYY년 MMMM D일 dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY년 MMMM D일", lll: "YYYY년 MMMM D일 A h:mm", llll: "YYYY년 MMMM D일 dddd A h:mm" }, meridiem: function(c) {
        return c < 12 ? "오전" : "오후";
      }, relativeTime: { future: "%s 후", past: "%s 전", s: "몇 초", m: "1분", mm: "%d분", h: "한 시간", hh: "%d시간", d: "하루", dd: "%d일", M: "한 달", MM: "%d달", y: "일 년", yy: "%d년" } };
      return o.default.locale(a, null, !0), a;
    });
  }(Re)), Re.exports;
}
var Do = Io();
const Fo = /* @__PURE__ */ de(Do);
class Po extends X {
  constructor() {
    super(), he.locale(_t), this.localeLang = {
      en: Co,
      fr: _t,
      es: Lo,
      ko: Fo
    };
  }
  now() {
    return he();
  }
  /**
   * @param date
   * @param date2 optional
   * @returns {number}
   */
  diffDaysBetweenDates(e, r = this.now()) {
    return he(e).diff(r, "days");
  }
  /**
   * @param numberOfDays
   * @returns {string}
   */
  getFormattedDateDaysAgoFromNow(e) {
    return console.log("numberOfDays", e), this.format(this.now().subtract(e, "days"), "YYYY-MM-DD");
  }
  /**
   * @param numberOfMonths
   * @returns {string}
   */
  getFormattedDateMonthsAgoFromNow(e) {
    return console.log("numberOfMonths", e), this.format(this.now().subtract(e, "months"), "YYYY-MM-DD");
  }
  /**
   * @param numberOfYears
   * @returns {string}
   */
  getFormattedDateYearsAgoFromNow(e) {
    return console.log("numberOfYears", e), this.format(this.now().subtract(e, "years"), "YYYY-MM-DD");
  }
  /**
   * @param date
   * @param format
   * @param localLanguageParam
   * @returns {string}
   */
  format(e, r = "dd/mm/YYYY", n = "fr") {
    return he.locale(this.localeLang[n]), he(e).format(r);
  }
  /**
   * Convert date to MySQL format
   * @param date
   * @returns {string}
   */
  to_mysql_date(e) {
    return this.format(e, "YYYY-MM-DD");
  }
}
let $s = new Po();
class _e extends Error {
  constructor(e, r) {
    super(e), this.status = r.status, this.data = r.data ? r.data : r.statusText, this.response = r;
  }
}
class $o extends X {
  /**
   * get data from url
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  // get(url, options = {}) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.get(url, options)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
  get(e, r = {}) {
    return q.get(e, r).then((n) => n.data).catch((n) => {
      throw n.response ? new _e(n, n.response) : n;
    });
  }
  /**
   * post data to url
   * @param url
   * @param data
   * @param options
   * @returns {Promise<unknown>}
   */
  // post(url, data, options = {}) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.post(url, data, options)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
  post(e, r, n = {}) {
    return q.post(e, r, n).then((o) => o.data).catch((o) => {
      throw o.response ? new _e(o, o.response) : o;
    });
  }
  /**
   * put data to url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  // put(url, data) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.put(url, data)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
  put(e, r, n = {}) {
    return q.put(e, r, n).then((o) => o.data).catch((o) => {
      throw o.response ? new _e(o, o.response) : o;
    });
  }
  /**
   * delete data from url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  // delete(url, data) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.delete(url, data)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
  delete(e, r, n = {}) {
    return q.delete(e, r, n).then((o) => o.data).catch((o) => {
      throw o.response ? new _e(o, o.response) : o;
    });
  }
}
let ze = new $o();
var xe = { exports: {} };
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
var jo = xe.exports, St;
function Bo() {
  return St || (St = 1, function(t) {
    (function(e, r) {
      t.exports ? t.exports = r() : e.numeral = r();
    })(jo, function() {
      var e, r, n = "2.0.6", o = {}, a = {}, c = {
        currentLocale: "en",
        zeroFormat: null,
        nullFormat: null,
        defaultFormat: "0,0",
        scalePercentBy100: !0
      }, f = {
        currentLocale: c.currentLocale,
        zeroFormat: c.zeroFormat,
        nullFormat: c.nullFormat,
        defaultFormat: c.defaultFormat,
        scalePercentBy100: c.scalePercentBy100
      };
      function T(i, u) {
        this._input = i, this._value = u;
      }
      return e = function(i) {
        var u, h, b, m;
        if (e.isNumeral(i))
          u = i.value();
        else if (i === 0 || typeof i > "u")
          u = 0;
        else if (i === null || r.isNaN(i))
          u = null;
        else if (typeof i == "string")
          if (f.zeroFormat && i === f.zeroFormat)
            u = 0;
          else if (f.nullFormat && i === f.nullFormat || !i.replace(/[^0-9]+/g, "").length)
            u = null;
          else {
            for (h in o)
              if (m = typeof o[h].regexps.unformat == "function" ? o[h].regexps.unformat() : o[h].regexps.unformat, m && i.match(m)) {
                b = o[h].unformat;
                break;
              }
            b = b || e._.stringToNumber, u = b(i);
          }
        else
          u = Number(i) || null;
        return new T(i, u);
      }, e.version = n, e.isNumeral = function(i) {
        return i instanceof T;
      }, e._ = r = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(i, u, h) {
          var b = a[e.options.currentLocale], m = !1, d = !1, k = 0, _ = "", I = 1e12, U = 1e9, $ = 1e6, J = 1e3, F = "", V = !1, z, j, K, Y, B, re, Z;
          if (i = i || 0, j = Math.abs(i), e._.includes(u, "(") ? (m = !0, u = u.replace(/[\(|\)]/g, "")) : (e._.includes(u, "+") || e._.includes(u, "-")) && (B = e._.includes(u, "+") ? u.indexOf("+") : i < 0 ? u.indexOf("-") : -1, u = u.replace(/[\+|\-]/g, "")), e._.includes(u, "a") && (z = u.match(/a(k|m|b|t)?/), z = z ? z[1] : !1, e._.includes(u, " a") && (_ = " "), u = u.replace(new RegExp(_ + "a[kmbt]?"), ""), j >= I && !z || z === "t" ? (_ += b.abbreviations.trillion, i = i / I) : j < I && j >= U && !z || z === "b" ? (_ += b.abbreviations.billion, i = i / U) : j < U && j >= $ && !z || z === "m" ? (_ += b.abbreviations.million, i = i / $) : (j < $ && j >= J && !z || z === "k") && (_ += b.abbreviations.thousand, i = i / J)), e._.includes(u, "[.]") && (d = !0, u = u.replace("[.]", ".")), K = i.toString().split(".")[0], Y = u.split(".")[1], re = u.indexOf(","), k = (u.split(".")[0].split(",")[0].match(/0/g) || []).length, Y ? (e._.includes(Y, "[") ? (Y = Y.replace("]", ""), Y = Y.split("["), F = e._.toFixed(i, Y[0].length + Y[1].length, h, Y[1].length)) : F = e._.toFixed(i, Y.length, h), K = F.split(".")[0], e._.includes(F, ".") ? F = b.delimiters.decimal + F.split(".")[1] : F = "", d && Number(F.slice(1)) === 0 && (F = "")) : K = e._.toFixed(i, 0, h), _ && !z && Number(K) >= 1e3 && _ !== b.abbreviations.trillion)
            switch (K = String(Number(K) / 1e3), _) {
              case b.abbreviations.thousand:
                _ = b.abbreviations.million;
                break;
              case b.abbreviations.million:
                _ = b.abbreviations.billion;
                break;
              case b.abbreviations.billion:
                _ = b.abbreviations.trillion;
                break;
            }
          if (e._.includes(K, "-") && (K = K.slice(1), V = !0), K.length < k)
            for (var L = k - K.length; L > 0; L--)
              K = "0" + K;
          return re > -1 && (K = K.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + b.delimiters.thousands)), u.indexOf(".") === 0 && (K = ""), Z = K + F + (_ || ""), m ? Z = (m && V ? "(" : "") + Z + (m && V ? ")" : "") : B >= 0 ? Z = B === 0 ? (V ? "-" : "+") + Z : Z + (V ? "-" : "+") : V && (Z = "-" + Z), Z;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(i) {
          var u = a[f.currentLocale], h = i, b = {
            thousand: 3,
            million: 6,
            billion: 9,
            trillion: 12
          }, m, d, k;
          if (f.zeroFormat && i === f.zeroFormat)
            d = 0;
          else if (f.nullFormat && i === f.nullFormat || !i.replace(/[^0-9]+/g, "").length)
            d = null;
          else {
            d = 1, u.delimiters.decimal !== "." && (i = i.replace(/\./g, "").replace(u.delimiters.decimal, "."));
            for (m in b)
              if (k = new RegExp("[^a-zA-Z]" + u.abbreviations[m] + "(?:\\)|(\\" + u.currency.symbol + ")?(?:\\))?)?$"), h.match(k)) {
                d *= Math.pow(10, b[m]);
                break;
              }
            d *= (i.split("-").length + Math.min(i.split("(").length - 1, i.split(")").length - 1)) % 2 ? 1 : -1, i = i.replace(/[^0-9\.]+/g, ""), d *= Number(i);
          }
          return d;
        },
        isNaN: function(i) {
          return typeof i == "number" && isNaN(i);
        },
        includes: function(i, u) {
          return i.indexOf(u) !== -1;
        },
        insert: function(i, u, h) {
          return i.slice(0, h) + u + i.slice(h);
        },
        reduce: function(i, u) {
          if (this === null)
            throw new TypeError("Array.prototype.reduce called on null or undefined");
          if (typeof u != "function")
            throw new TypeError(u + " is not a function");
          var h = Object(i), b = h.length >>> 0, m = 0, d;
          if (arguments.length === 3)
            d = arguments[2];
          else {
            for (; m < b && !(m in h); )
              m++;
            if (m >= b)
              throw new TypeError("Reduce of empty array with no initial value");
            d = h[m++];
          }
          for (; m < b; m++)
            m in h && (d = u(d, h[m], m, h));
          return d;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function(i) {
          var u = i.toString().split(".");
          return u.length < 2 ? 1 : Math.pow(10, u[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function() {
          var i = Array.prototype.slice.call(arguments);
          return i.reduce(function(u, h) {
            var b = r.multiplier(h);
            return u > b ? u : b;
          }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(i, u, h, b) {
          var m = i.toString().split("."), d = u - (b || 0), k, _, I, U;
          return m.length === 2 ? k = Math.min(Math.max(m[1].length, d), u) : k = d, I = Math.pow(10, k), U = (h(i + "e+" + k) / I).toFixed(k), b > u - k && (_ = new RegExp("\\.?0{1," + (b - (u - k)) + "}$"), U = U.replace(_, "")), U;
        }
      }, e.options = f, e.formats = o, e.locales = a, e.locale = function(i) {
        return i && (f.currentLocale = i.toLowerCase()), f.currentLocale;
      }, e.localeData = function(i) {
        if (!i)
          return a[f.currentLocale];
        if (i = i.toLowerCase(), !a[i])
          throw new Error("Unknown locale : " + i);
        return a[i];
      }, e.reset = function() {
        for (var i in c)
          f[i] = c[i];
      }, e.zeroFormat = function(i) {
        f.zeroFormat = typeof i == "string" ? i : null;
      }, e.nullFormat = function(i) {
        f.nullFormat = typeof i == "string" ? i : null;
      }, e.defaultFormat = function(i) {
        f.defaultFormat = typeof i == "string" ? i : "0.0";
      }, e.register = function(i, u, h) {
        if (u = u.toLowerCase(), this[i + "s"][u])
          throw new TypeError(u + " " + i + " already registered.");
        return this[i + "s"][u] = h, h;
      }, e.validate = function(i, u) {
        var h, b, m, d, k, _, I, U;
        if (typeof i != "string" && (i += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", i)), i = i.trim(), i.match(/^\d+$/))
          return !0;
        if (i === "")
          return !1;
        try {
          I = e.localeData(u);
        } catch {
          I = e.localeData(e.locale());
        }
        return m = I.currency.symbol, k = I.abbreviations, h = I.delimiters.decimal, I.delimiters.thousands === "." ? b = "\\." : b = I.delimiters.thousands, U = i.match(/^[^\d]+/), U !== null && (i = i.substr(1), U[0] !== m) || (U = i.match(/[^\d]+$/), U !== null && (i = i.slice(0, -1), U[0] !== k.thousand && U[0] !== k.million && U[0] !== k.billion && U[0] !== k.trillion)) ? !1 : (_ = new RegExp(b + "{2}"), i.match(/[^\d.,]/g) ? !1 : (d = i.split(h), d.length > 2 ? !1 : d.length < 2 ? !!d[0].match(/^\d+.*\d$/) && !d[0].match(_) : d[0].length === 1 ? !!d[0].match(/^\d+$/) && !d[0].match(_) && !!d[1].match(/^\d+$/) : !!d[0].match(/^\d+.*\d$/) && !d[0].match(_) && !!d[1].match(/^\d+$/)));
      }, e.fn = T.prototype = {
        clone: function() {
          return e(this);
        },
        format: function(i, u) {
          var h = this._value, b = i || f.defaultFormat, m, d, k;
          if (u = u || Math.round, h === 0 && f.zeroFormat !== null)
            d = f.zeroFormat;
          else if (h === null && f.nullFormat !== null)
            d = f.nullFormat;
          else {
            for (m in o)
              if (b.match(o[m].regexps.format)) {
                k = o[m].format;
                break;
              }
            k = k || e._.numberToFormat, d = k(h, b, u);
          }
          return d;
        },
        value: function() {
          return this._value;
        },
        input: function() {
          return this._input;
        },
        set: function(i) {
          return this._value = Number(i), this;
        },
        add: function(i) {
          var u = r.correctionFactor.call(null, this._value, i);
          function h(b, m, d, k) {
            return b + Math.round(u * m);
          }
          return this._value = r.reduce([this._value, i], h, 0) / u, this;
        },
        subtract: function(i) {
          var u = r.correctionFactor.call(null, this._value, i);
          function h(b, m, d, k) {
            return b - Math.round(u * m);
          }
          return this._value = r.reduce([i], h, Math.round(this._value * u)) / u, this;
        },
        multiply: function(i) {
          function u(h, b, m, d) {
            var k = r.correctionFactor(h, b);
            return Math.round(h * k) * Math.round(b * k) / Math.round(k * k);
          }
          return this._value = r.reduce([this._value, i], u, 1), this;
        },
        divide: function(i) {
          function u(h, b, m, d) {
            var k = r.correctionFactor(h, b);
            return Math.round(h * k) / Math.round(b * k);
          }
          return this._value = r.reduce([this._value, i], u), this;
        },
        difference: function(i) {
          return Math.abs(e(this._value).subtract(i).value());
        }
      }, e.register("locale", "en", {
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        abbreviations: {
          thousand: "k",
          million: "m",
          billion: "b",
          trillion: "t"
        },
        ordinal: function(i) {
          var u = i % 10;
          return ~~(i % 100 / 10) === 1 ? "th" : u === 1 ? "st" : u === 2 ? "nd" : u === 3 ? "rd" : "th";
        },
        currency: {
          symbol: "$"
        }
      }), function() {
        e.register("format", "bps", {
          regexps: {
            format: /(BPS)/,
            unformat: /(BPS)/
          },
          format: function(i, u, h) {
            var b = e._.includes(u, " BPS") ? " " : "", m;
            return i = i * 1e4, u = u.replace(/\s?BPS/, ""), m = e._.numberToFormat(i, u, h), e._.includes(m, ")") ? (m = m.split(""), m.splice(-1, 0, b + "BPS"), m = m.join("")) : m = m + b + "BPS", m;
          },
          unformat: function(i) {
            return +(e._.stringToNumber(i) * 1e-4).toFixed(15);
          }
        });
      }(), function() {
        var i = {
          base: 1e3,
          suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        }, u = {
          base: 1024,
          suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        }, h = i.suffixes.concat(u.suffixes.filter(function(m) {
          return i.suffixes.indexOf(m) < 0;
        })), b = h.join("|");
        b = "(" + b.replace("B", "B(?!PS)") + ")", e.register("format", "bytes", {
          regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(b)
          },
          format: function(m, d, k) {
            var _, I = e._.includes(d, "ib") ? u : i, U = e._.includes(d, " b") || e._.includes(d, " ib") ? " " : "", $, J, F;
            for (d = d.replace(/\s?i?b/, ""), $ = 0; $ <= I.suffixes.length; $++)
              if (J = Math.pow(I.base, $), F = Math.pow(I.base, $ + 1), m === null || m === 0 || m >= J && m < F) {
                U += I.suffixes[$], J > 0 && (m = m / J);
                break;
              }
            return _ = e._.numberToFormat(m, d, k), _ + U;
          },
          unformat: function(m) {
            var d = e._.stringToNumber(m), k, _;
            if (d) {
              for (k = i.suffixes.length - 1; k >= 0; k--) {
                if (e._.includes(m, i.suffixes[k])) {
                  _ = Math.pow(i.base, k);
                  break;
                }
                if (e._.includes(m, u.suffixes[k])) {
                  _ = Math.pow(u.base, k);
                  break;
                }
              }
              d *= _ || 1;
            }
            return d;
          }
        });
      }(), function() {
        e.register("format", "currency", {
          regexps: {
            format: /(\$)/
          },
          format: function(i, u, h) {
            var b = e.locales[e.options.currentLocale], m = {
              before: u.match(/^([\+|\-|\(|\s|\$]*)/)[0],
              after: u.match(/([\+|\-|\)|\s|\$]*)$/)[0]
            }, d, k, _;
            for (u = u.replace(/\s?\$\s?/, ""), d = e._.numberToFormat(i, u, h), i >= 0 ? (m.before = m.before.replace(/[\-\(]/, ""), m.after = m.after.replace(/[\-\)]/, "")) : i < 0 && !e._.includes(m.before, "-") && !e._.includes(m.before, "(") && (m.before = "-" + m.before), _ = 0; _ < m.before.length; _++)
              switch (k = m.before[_], k) {
                case "$":
                  d = e._.insert(d, b.currency.symbol, _);
                  break;
                case " ":
                  d = e._.insert(d, " ", _ + b.currency.symbol.length - 1);
                  break;
              }
            for (_ = m.after.length - 1; _ >= 0; _--)
              switch (k = m.after[_], k) {
                case "$":
                  d = _ === m.after.length - 1 ? d + b.currency.symbol : e._.insert(d, b.currency.symbol, -(m.after.length - (1 + _)));
                  break;
                case " ":
                  d = _ === m.after.length - 1 ? d + " " : e._.insert(d, " ", -(m.after.length - (1 + _) + b.currency.symbol.length - 1));
                  break;
              }
            return d;
          }
        });
      }(), function() {
        e.register("format", "exponential", {
          regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
          },
          format: function(i, u, h) {
            var b, m = typeof i == "number" && !e._.isNaN(i) ? i.toExponential() : "0e+0", d = m.split("e");
            return u = u.replace(/e[\+|\-]{1}0/, ""), b = e._.numberToFormat(Number(d[0]), u, h), b + "e" + d[1];
          },
          unformat: function(i) {
            var u = e._.includes(i, "e+") ? i.split("e+") : i.split("e-"), h = Number(u[0]), b = Number(u[1]);
            b = e._.includes(i, "e-") ? b *= -1 : b;
            function m(d, k, _, I) {
              var U = e._.correctionFactor(d, k), $ = d * U * (k * U) / (U * U);
              return $;
            }
            return e._.reduce([h, Math.pow(10, b)], m, 1);
          }
        });
      }(), function() {
        e.register("format", "ordinal", {
          regexps: {
            format: /(o)/
          },
          format: function(i, u, h) {
            var b = e.locales[e.options.currentLocale], m, d = e._.includes(u, " o") ? " " : "";
            return u = u.replace(/\s?o/, ""), d += b.ordinal(i), m = e._.numberToFormat(i, u, h), m + d;
          }
        });
      }(), function() {
        e.register("format", "percentage", {
          regexps: {
            format: /(%)/,
            unformat: /(%)/
          },
          format: function(i, u, h) {
            var b = e._.includes(u, " %") ? " " : "", m;
            return e.options.scalePercentBy100 && (i = i * 100), u = u.replace(/\s?\%/, ""), m = e._.numberToFormat(i, u, h), e._.includes(m, ")") ? (m = m.split(""), m.splice(-1, 0, b + "%"), m = m.join("")) : m = m + b + "%", m;
          },
          unformat: function(i) {
            var u = e._.stringToNumber(i);
            return e.options.scalePercentBy100 ? u * 0.01 : u;
          }
        });
      }(), function() {
        e.register("format", "time", {
          regexps: {
            format: /(:)/,
            unformat: /(:)/
          },
          format: function(i, u, h) {
            var b = Math.floor(i / 60 / 60), m = Math.floor((i - b * 60 * 60) / 60), d = Math.round(i - b * 60 * 60 - m * 60);
            return b + ":" + (m < 10 ? "0" + m : m) + ":" + (d < 10 ? "0" + d : d);
          },
          unformat: function(i) {
            var u = i.split(":"), h = 0;
            return u.length === 3 ? (h = h + Number(u[0]) * 60 * 60, h = h + Number(u[1]) * 60, h = h + Number(u[2])) : u.length === 2 && (h = h + Number(u[0]) * 60, h = h + Number(u[1])), Number(h);
          }
        });
      }(), e;
    });
  }(xe)), xe.exports;
}
var Yo = Bo();
const Ho = /* @__PURE__ */ de(Yo);
class qo extends X {
  /**
   * Returns true if str param is a number.
   * @param str
   * @returns {boolean}
   */
  isNumber(e) {
    return !isNaN(e);
  }
  /**
   * format a number
   * @param value
   * @param format
   * @returns {*}
   */
  // todofsc: faire les tests si utilisé products
  numberFormat(e, r = "0,0") {
    return Ho(e).format(r);
  }
  numeralFormat(e, r = "0,0[.]00 $") {
    return this.numberFormat(e, r);
  }
}
let js = new qo();
class zo extends X {
  /**
   *
   * @param {String} from
   * @param {String} to
   * @param {Object} obj
   */
  getRange(e, r, n) {
    const a = Object.entries(n).filter(([, c]) => c >= e && c <= r);
    return Object.fromEntries(a);
  }
  deepCopy(e) {
    return JSON.parse(JSON.stringify(e));
  }
  /**
   * Return a string that can be used to print the content of an object.
   * An optional delimiter can be set to separate the properties in the string. Default delimiter is ", ".
   * Warning (limitation) : for now, only use this service if all the values are printable.
   *
   * @param {Object} object object to be treated
   * @param {String} [delimiter=", "] delimiter to separate properties
   *
   * @returns {String}
   */
  getPrintableContent(e, r = ", ") {
    return e === null ? "" : Object.keys(e).map((o) => `${o}: ${e[o]}`).join(r);
  }
}
let Bs = new zo();
function Xt(t) {
  if (!(this instanceof Xt))
    throw new Error("The 'Keycloak' constructor must be invoked with 'new'.");
  if (typeof t != "string" && !Ve(t))
    throw new Error("The 'Keycloak' constructor must be provided with a configuration object, or a URL to a JSON configuration file.");
  if (Ve(t)) {
    const s = "oidcProvider" in t ? ["clientId"] : ["url", "realm", "clientId"];
    for (const l of s)
      if (!t[l])
        throw new Error(`The configuration object is missing the required '${l}' property.`);
  }
  var e = this, r, n = [], o, a = {
    enable: !0,
    callbackList: [],
    interval: 5
  };
  e.didInitialize = !1;
  var c = !0, f = D(console.info), T = D(console.warn);
  globalThis.isSecureContext || T(
    `[KEYCLOAK] Keycloak JS must be used in a 'secure context' to function properly as it relies on browser APIs that are otherwise not available.
Continuing to run your application insecurely will lead to unexpected behavior and breakage.

For more information see: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts`
  ), e.init = function(s = {}) {
    if (e.didInitialize)
      throw new Error("A 'Keycloak' instance can only be initialized once.");
    e.didInitialize = !0, e.authenticated = !1, o = x();
    var l = ["default", "cordova", "cordova-native"];
    if (l.indexOf(s.adapter) > -1 ? r = L(s.adapter) : typeof s.adapter == "object" ? r = s.adapter : window.Cordova || window.cordova ? r = L("cordova") : r = L(), typeof s.useNonce < "u" && (c = s.useNonce), typeof s.checkLoginIframe < "u" && (a.enable = s.checkLoginIframe), s.checkLoginIframeInterval && (a.interval = s.checkLoginIframeInterval), s.onLoad === "login-required" && (e.loginRequired = !0), s.responseMode)
      if (s.responseMode === "query" || s.responseMode === "fragment")
        e.responseMode = s.responseMode;
      else
        throw "Invalid value for responseMode";
    if (s.flow) {
      switch (s.flow) {
        case "standard":
          e.responseType = "code";
          break;
        case "implicit":
          e.responseType = "id_token token";
          break;
        case "hybrid":
          e.responseType = "code id_token token";
          break;
        default:
          throw "Invalid value for flow";
      }
      e.flow = s.flow;
    }
    if (s.timeSkew != null && (e.timeSkew = s.timeSkew), s.redirectUri && (e.redirectUri = s.redirectUri), s.silentCheckSsoRedirectUri && (e.silentCheckSsoRedirectUri = s.silentCheckSsoRedirectUri), typeof s.silentCheckSsoFallback == "boolean" ? e.silentCheckSsoFallback = s.silentCheckSsoFallback : e.silentCheckSsoFallback = !0, typeof s.pkceMethod < "u") {
      if (s.pkceMethod !== "S256" && s.pkceMethod !== !1)
        throw new TypeError(`Invalid value for pkceMethod', expected 'S256' or false but got ${s.pkceMethod}.`);
      e.pkceMethod = s.pkceMethod;
    } else
      e.pkceMethod = "S256";
    typeof s.enableLogging == "boolean" ? e.enableLogging = s.enableLogging : e.enableLogging = !1, s.logoutMethod === "POST" ? e.logoutMethod = "POST" : e.logoutMethod = "GET", typeof s.scope == "string" && (e.scope = s.scope), typeof s.acrValues == "string" && (e.acrValues = s.acrValues), typeof s.messageReceiveTimeout == "number" && s.messageReceiveTimeout > 0 ? e.messageReceiveTimeout = s.messageReceiveTimeout : e.messageReceiveTimeout = 1e4, e.responseMode || (e.responseMode = "fragment"), e.responseType || (e.responseType = "code", e.flow = "standard");
    var w = j(), v = j();
    v.promise.then(function() {
      e.onReady && e.onReady(e.authenticated), w.setSuccess(e.authenticated);
    }).catch(function(y) {
      w.setError(y);
    });
    var S = I();
    function E() {
      var y = function(M) {
        M || (N.prompt = "none"), s.locale && (N.locale = s.locale), e.login(N).then(function() {
          v.setSuccess();
        }).catch(function(H) {
          v.setError(H);
        });
      }, C = async function() {
        var M = document.createElement("iframe"), H = await e.createLoginUrl({ prompt: "none", redirectUri: e.silentCheckSsoRedirectUri });
        M.setAttribute("src", H), M.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin"), M.setAttribute("title", "keycloak-silent-check-sso"), M.style.display = "none", document.body.appendChild(M);
        var W = function(Q) {
          if (!(Q.origin !== window.location.origin || M.contentWindow !== Q.source)) {
            var oe = F(Q.data);
            _(oe, v), document.body.removeChild(M), window.removeEventListener("message", W);
          }
        };
        window.addEventListener("message", W);
      }, N = {};
      switch (s.onLoad) {
        case "check-sso":
          a.enable ? Y().then(function() {
            re().then(function(M) {
              M ? v.setSuccess() : e.silentCheckSsoRedirectUri ? C() : y(!1);
            }).catch(function(M) {
              v.setError(M);
            });
          }) : e.silentCheckSsoRedirectUri ? C() : y(!1);
          break;
        case "login-required":
          y(!0);
          break;
        default:
          throw "Invalid value for onLoad";
      }
    }
    function g() {
      var y = F(window.location.href);
      if (y && window.history.replaceState(window.history.state, null, y.newUrl), y && y.valid)
        return Y().then(function() {
          _(y, v);
        }).catch(function(C) {
          v.setError(C);
        });
      s.token && s.refreshToken ? ($(s.token, s.refreshToken, s.idToken), a.enable ? Y().then(function() {
        re().then(function(C) {
          C ? (e.onAuthSuccess && e.onAuthSuccess(), v.setSuccess(), B()) : v.setSuccess();
        }).catch(function(C) {
          v.setError(C);
        });
      }) : e.updateToken(-1).then(function() {
        e.onAuthSuccess && e.onAuthSuccess(), v.setSuccess();
      }).catch(function(C) {
        e.onAuthError && e.onAuthError(), s.onLoad ? E() : v.setError(C);
      })) : s.onLoad ? E() : v.setSuccess();
    }
    return S.then(function() {
      Z().then(g).catch(function(y) {
        w.setError(y);
      });
    }), S.catch(function(y) {
      w.setError(y);
    }), w.promise;
  }, e.login = function(s) {
    return r.login(s);
  };
  function i(s) {
    if (typeof crypto > "u" || typeof crypto.getRandomValues > "u")
      throw new Error("Web Crypto API is not available.");
    return crypto.getRandomValues(new Uint8Array(s));
  }
  function u(s) {
    return h(s, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  }
  function h(s, l) {
    for (var w = i(s), v = new Array(s), S = 0; S < s; S++)
      v[S] = l.charCodeAt(w[S] % l.length);
    return String.fromCharCode.apply(null, v);
  }
  async function b(s, l) {
    if (s !== "S256")
      throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${s}'.`);
    const w = new Uint8Array(await Vo(l));
    return Ko(w).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
  }
  function m(s) {
    var l = {
      id_token: {
        acr: s
      }
    };
    return JSON.stringify(l);
  }
  e.createLoginUrl = async function(s) {
    var l = J(), w = J(), v = r.redirectUri(s), S = {
      state: l,
      nonce: w,
      redirectUri: encodeURIComponent(v),
      loginOptions: s
    };
    s && s.prompt && (S.prompt = s.prompt);
    var E;
    s && s.action == "register" ? E = e.endpoints.register() : E = e.endpoints.authorize();
    var g = s && s.scope || e.scope;
    g ? g.indexOf("openid") === -1 && (g = "openid " + g) : g = "openid";
    var y = E + "?client_id=" + encodeURIComponent(e.clientId) + "&redirect_uri=" + encodeURIComponent(v) + "&state=" + encodeURIComponent(l) + "&response_mode=" + encodeURIComponent(e.responseMode) + "&response_type=" + encodeURIComponent(e.responseType) + "&scope=" + encodeURIComponent(g);
    if (c && (y = y + "&nonce=" + encodeURIComponent(w)), s && s.prompt && (y += "&prompt=" + encodeURIComponent(s.prompt)), s && typeof s.maxAge == "number" && (y += "&max_age=" + encodeURIComponent(s.maxAge)), s && s.loginHint && (y += "&login_hint=" + encodeURIComponent(s.loginHint)), s && s.idpHint && (y += "&kc_idp_hint=" + encodeURIComponent(s.idpHint)), s && s.action && s.action != "register" && (y += "&kc_action=" + encodeURIComponent(s.action)), s && s.locale && (y += "&ui_locales=" + encodeURIComponent(s.locale)), s && s.acr) {
      var C = m(s.acr);
      y += "&claims=" + encodeURIComponent(C);
    }
    if ((s && s.acrValues || e.acrValues) && (y += "&acr_values=" + encodeURIComponent(s.acrValues || e.acrValues)), e.pkceMethod)
      try {
        const N = u(96), M = await b(e.pkceMethod, N);
        S.pkceCodeVerifier = N, y += "&code_challenge=" + M, y += "&code_challenge_method=" + e.pkceMethod;
      } catch (N) {
        throw new Error("Failed to generate PKCE challenge.", { cause: N });
      }
    return o.add(S), y;
  }, e.logout = function(s) {
    return r.logout(s);
  }, e.createLogoutUrl = function(s) {
    if (((s == null ? void 0 : s.logoutMethod) ?? e.logoutMethod) === "POST")
      return e.endpoints.logout();
    var w = e.endpoints.logout() + "?client_id=" + encodeURIComponent(e.clientId) + "&post_logout_redirect_uri=" + encodeURIComponent(r.redirectUri(s, !1));
    return e.idToken && (w += "&id_token_hint=" + encodeURIComponent(e.idToken)), w;
  }, e.register = function(s) {
    return r.register(s);
  }, e.createRegisterUrl = async function(s) {
    return s || (s = {}), s.action = "register", await e.createLoginUrl(s);
  }, e.createAccountUrl = function(s) {
    var l = d(), w = void 0;
    return typeof l < "u" && (w = l + "/account?referrer=" + encodeURIComponent(e.clientId) + "&referrer_uri=" + encodeURIComponent(r.redirectUri(s))), w;
  }, e.accountManagement = function() {
    return r.accountManagement();
  }, e.hasRealmRole = function(s) {
    var l = e.realmAccess;
    return !!l && l.roles.indexOf(s) >= 0;
  }, e.hasResourceRole = function(s, l) {
    if (!e.resourceAccess)
      return !1;
    var w = e.resourceAccess[l || e.clientId];
    return !!w && w.roles.indexOf(s) >= 0;
  }, e.loadUserProfile = function() {
    var s = d() + "/account", l = new XMLHttpRequest();
    l.open("GET", s, !0), l.setRequestHeader("Accept", "application/json"), l.setRequestHeader("Authorization", "bearer " + e.token);
    var w = j();
    return l.onreadystatechange = function() {
      l.readyState == 4 && (l.status == 200 ? (e.profile = JSON.parse(l.responseText), w.setSuccess(e.profile)) : w.setError());
    }, l.send(), w.promise;
  }, e.loadUserInfo = function() {
    var s = e.endpoints.userinfo(), l = new XMLHttpRequest();
    l.open("GET", s, !0), l.setRequestHeader("Accept", "application/json"), l.setRequestHeader("Authorization", "bearer " + e.token);
    var w = j();
    return l.onreadystatechange = function() {
      l.readyState == 4 && (l.status == 200 ? (e.userInfo = JSON.parse(l.responseText), w.setSuccess(e.userInfo)) : w.setError());
    }, l.send(), w.promise;
  }, e.isTokenExpired = function(s) {
    if (!e.tokenParsed || !e.refreshToken && e.flow != "implicit")
      throw "Not authenticated";
    if (e.timeSkew == null)
      return f("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set"), !0;
    var l = e.tokenParsed.exp - Math.ceil((/* @__PURE__ */ new Date()).getTime() / 1e3) + e.timeSkew;
    if (s) {
      if (isNaN(s))
        throw "Invalid minValidity";
      l -= s;
    }
    return l < 0;
  }, e.updateToken = function(s) {
    var l = j();
    if (!e.refreshToken)
      return l.setError(), l.promise;
    s = s || 5;
    var w = function() {
      var S = !1;
      if (s == -1 ? (S = !0, f("[KEYCLOAK] Refreshing token: forced refresh")) : (!e.tokenParsed || e.isTokenExpired(s)) && (S = !0, f("[KEYCLOAK] Refreshing token: token expired")), !S)
        l.setSuccess(!1);
      else {
        var E = "grant_type=refresh_token&refresh_token=" + e.refreshToken, g = e.endpoints.token();
        if (n.push(l), n.length == 1) {
          var y = new XMLHttpRequest();
          y.open("POST", g, !0), y.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), y.withCredentials = !0, E += "&client_id=" + encodeURIComponent(e.clientId);
          var C = (/* @__PURE__ */ new Date()).getTime();
          y.onreadystatechange = function() {
            if (y.readyState == 4)
              if (y.status == 200) {
                f("[KEYCLOAK] Token refreshed"), C = (C + (/* @__PURE__ */ new Date()).getTime()) / 2;
                var N = JSON.parse(y.responseText);
                $(N.access_token, N.refresh_token, N.id_token, C), e.onAuthRefreshSuccess && e.onAuthRefreshSuccess();
                for (var M = n.pop(); M != null; M = n.pop())
                  M.setSuccess(!0);
              } else {
                T("[KEYCLOAK] Failed to refresh token"), y.status == 400 && e.clearToken(), e.onAuthRefreshError && e.onAuthRefreshError();
                for (var M = n.pop(); M != null; M = n.pop())
                  M.setError("Failed to refresh token: An unexpected HTTP error occurred while attempting to refresh the token.");
              }
          }, y.send(E);
        }
      }
    };
    if (a.enable) {
      var v = re();
      v.then(function() {
        w();
      }).catch(function(S) {
        l.setError(S);
      });
    } else
      w();
    return l.promise;
  }, e.clearToken = function() {
    e.token && ($(null, null, null), e.onAuthLogout && e.onAuthLogout(), e.loginRequired && e.login());
  };
  function d() {
    if (typeof e.authServerUrl < "u")
      return e.authServerUrl.charAt(e.authServerUrl.length - 1) == "/" ? e.authServerUrl + "realms/" + encodeURIComponent(e.realm) : e.authServerUrl + "/realms/" + encodeURIComponent(e.realm);
  }
  function k() {
    return window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
  }
  function _(s, l) {
    var w = s.code, v = s.error, S = s.prompt, E = (/* @__PURE__ */ new Date()).getTime();
    if (s.kc_action_status && e.onActionUpdate && e.onActionUpdate(s.kc_action_status, s.kc_action), v) {
      if (S != "none")
        if (s.error_description && s.error_description === "authentication_expired")
          e.login(s.loginOptions);
        else {
          var g = { error: v, error_description: s.error_description };
          e.onAuthError && e.onAuthError(g), l && l.setError(g);
        }
      else
        l && l.setSuccess();
      return;
    } else e.flow != "standard" && (s.access_token || s.id_token) && M(s.access_token, null, s.id_token, !0);
    if (e.flow != "implicit" && w) {
      var y = "code=" + w + "&grant_type=authorization_code", C = e.endpoints.token(), N = new XMLHttpRequest();
      N.open("POST", C, !0), N.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), y += "&client_id=" + encodeURIComponent(e.clientId), y += "&redirect_uri=" + s.redirectUri, s.pkceCodeVerifier && (y += "&code_verifier=" + s.pkceCodeVerifier), N.withCredentials = !0, N.onreadystatechange = function() {
        if (N.readyState == 4)
          if (N.status == 200) {
            var H = JSON.parse(N.responseText);
            M(H.access_token, H.refresh_token, H.id_token, e.flow === "standard"), B();
          } else
            e.onAuthError && e.onAuthError(), l && l.setError();
      }, N.send(y);
    }
    function M(H, W, Q, oe) {
      E = (E + (/* @__PURE__ */ new Date()).getTime()) / 2, $(H, W, Q, E), c && e.idTokenParsed && e.idTokenParsed.nonce != s.storedNonce ? (f("[KEYCLOAK] Invalid nonce, clearing token"), e.clearToken(), l && l.setError()) : oe && (e.onAuthSuccess && e.onAuthSuccess(), l && l.setSuccess());
    }
  }
  function I() {
    var s = j(), l;
    typeof t == "string" && (l = t);
    function w(g) {
      g ? e.endpoints = {
        authorize: function() {
          return g.authorization_endpoint;
        },
        token: function() {
          return g.token_endpoint;
        },
        logout: function() {
          if (!g.end_session_endpoint)
            throw "Not supported by the OIDC server";
          return g.end_session_endpoint;
        },
        checkSessionIframe: function() {
          if (!g.check_session_iframe)
            throw "Not supported by the OIDC server";
          return g.check_session_iframe;
        },
        register: function() {
          throw 'Redirection to "Register user" page not supported in standard OIDC mode';
        },
        userinfo: function() {
          if (!g.userinfo_endpoint)
            throw "Not supported by the OIDC server";
          return g.userinfo_endpoint;
        }
      } : e.endpoints = {
        authorize: function() {
          return d() + "/protocol/openid-connect/auth";
        },
        token: function() {
          return d() + "/protocol/openid-connect/token";
        },
        logout: function() {
          return d() + "/protocol/openid-connect/logout";
        },
        checkSessionIframe: function() {
          return d() + "/protocol/openid-connect/login-status-iframe.html";
        },
        thirdPartyCookiesIframe: function() {
          return d() + "/protocol/openid-connect/3p-cookies/step1.html";
        },
        register: function() {
          return d() + "/protocol/openid-connect/registrations";
        },
        userinfo: function() {
          return d() + "/protocol/openid-connect/userinfo";
        }
      };
    }
    if (l) {
      var v = new XMLHttpRequest();
      v.open("GET", l, !0), v.setRequestHeader("Accept", "application/json"), v.onreadystatechange = function() {
        if (v.readyState == 4)
          if (v.status == 200 || U(v)) {
            var g = JSON.parse(v.responseText);
            e.authServerUrl = g["auth-server-url"], e.realm = g.realm, e.clientId = g.resource, w(null), s.setSuccess();
          } else
            s.setError();
      }, v.send();
    } else {
      e.clientId = t.clientId;
      var S = t.oidcProvider;
      if (!S)
        e.authServerUrl = t.url, e.realm = t.realm, w(null), s.setSuccess();
      else if (typeof S == "string") {
        var E;
        S.charAt(S.length - 1) == "/" ? E = S + ".well-known/openid-configuration" : E = S + "/.well-known/openid-configuration";
        var v = new XMLHttpRequest();
        v.open("GET", E, !0), v.setRequestHeader("Accept", "application/json"), v.onreadystatechange = function() {
          if (v.readyState == 4)
            if (v.status == 200 || U(v)) {
              var y = JSON.parse(v.responseText);
              w(y), s.setSuccess();
            } else
              s.setError();
        }, v.send();
      } else
        w(S), s.setSuccess();
    }
    return s.promise;
  }
  function U(s) {
    return s.status == 0 && s.responseText && s.responseURL.startsWith("file:");
  }
  function $(s, l, w, v) {
    if (e.tokenTimeoutHandle && (clearTimeout(e.tokenTimeoutHandle), e.tokenTimeoutHandle = null), l ? (e.refreshToken = l, e.refreshTokenParsed = Ke(l)) : (delete e.refreshToken, delete e.refreshTokenParsed), w ? (e.idToken = w, e.idTokenParsed = Ke(w)) : (delete e.idToken, delete e.idTokenParsed), s) {
      if (e.token = s, e.tokenParsed = Ke(s), e.sessionId = e.tokenParsed.sid, e.authenticated = !0, e.subject = e.tokenParsed.sub, e.realmAccess = e.tokenParsed.realm_access, e.resourceAccess = e.tokenParsed.resource_access, v && (e.timeSkew = Math.floor(v / 1e3) - e.tokenParsed.iat), e.timeSkew != null && (f("[KEYCLOAK] Estimated time difference between browser and server is " + e.timeSkew + " seconds"), e.onTokenExpired)) {
        var S = (e.tokenParsed.exp - (/* @__PURE__ */ new Date()).getTime() / 1e3 + e.timeSkew) * 1e3;
        f("[KEYCLOAK] Token expires in " + Math.round(S / 1e3) + " s"), S <= 0 ? e.onTokenExpired() : e.tokenTimeoutHandle = setTimeout(e.onTokenExpired, S);
      }
    } else
      delete e.token, delete e.tokenParsed, delete e.subject, delete e.realmAccess, delete e.resourceAccess, e.authenticated = !1;
  }
  function J() {
    if (typeof crypto > "u" || typeof crypto.randomUUID > "u")
      throw new Error("Web Crypto API is not available.");
    return crypto.randomUUID();
  }
  function F(s) {
    var l = V(s);
    if (l) {
      var w = o.get(l.state);
      return w && (l.valid = !0, l.redirectUri = w.redirectUri, l.storedNonce = w.nonce, l.prompt = w.prompt, l.pkceCodeVerifier = w.pkceCodeVerifier, l.loginOptions = w.loginOptions), l;
    }
  }
  function V(s) {
    var l;
    switch (e.flow) {
      case "standard":
        l = ["code", "state", "session_state", "kc_action_status", "kc_action", "iss"];
        break;
      case "implicit":
        l = ["access_token", "token_type", "id_token", "state", "session_state", "expires_in", "kc_action_status", "kc_action", "iss"];
        break;
      case "hybrid":
        l = ["access_token", "token_type", "id_token", "code", "state", "session_state", "expires_in", "kc_action_status", "kc_action", "iss"];
        break;
    }
    l.push("error"), l.push("error_description"), l.push("error_uri");
    var w = s.indexOf("?"), v = s.indexOf("#"), S, E;
    if (e.responseMode === "query" && w !== -1 ? (S = s.substring(0, w), E = z(s.substring(w + 1, v !== -1 ? v : s.length), l), E.paramsString !== "" && (S += "?" + E.paramsString), v !== -1 && (S += s.substring(v))) : e.responseMode === "fragment" && v !== -1 && (S = s.substring(0, v), E = z(s.substring(v + 1), l), E.paramsString !== "" && (S += "#" + E.paramsString)), E && E.oauthParams) {
      if (e.flow === "standard" || e.flow === "hybrid") {
        if ((E.oauthParams.code || E.oauthParams.error) && E.oauthParams.state)
          return E.oauthParams.newUrl = S, E.oauthParams;
      } else if (e.flow === "implicit" && (E.oauthParams.access_token || E.oauthParams.error) && E.oauthParams.state)
        return E.oauthParams.newUrl = S, E.oauthParams;
    }
  }
  function z(s, l) {
    for (var w = s.split("&"), v = {
      paramsString: "",
      oauthParams: {}
    }, S = 0; S < w.length; S++) {
      var E = w[S].indexOf("="), g = w[S].slice(0, E);
      l.indexOf(g) !== -1 ? v.oauthParams[g] = w[S].slice(E + 1) : (v.paramsString !== "" && (v.paramsString += "&"), v.paramsString += w[S]);
    }
    return v;
  }
  function j() {
    var s = {
      setSuccess: function(l) {
        s.resolve(l);
      },
      setError: function(l) {
        s.reject(l);
      }
    };
    return s.promise = new Promise(function(l, w) {
      s.resolve = l, s.reject = w;
    }), s;
  }
  function K(s, l, w) {
    var v = null, S = new Promise(function(E, g) {
      v = setTimeout(function() {
        g({ error: w });
      }, l);
    });
    return Promise.race([s, S]).finally(function() {
      clearTimeout(v);
    });
  }
  function Y() {
    var s = j();
    if (!a.enable || a.iframe)
      return s.setSuccess(), s.promise;
    var l = document.createElement("iframe");
    a.iframe = l, l.onload = function() {
      var S = e.endpoints.authorize();
      S.charAt(0) === "/" ? a.iframeOrigin = k() : a.iframeOrigin = S.substring(0, S.indexOf("/", 8)), s.setSuccess();
    };
    var w = e.endpoints.checkSessionIframe();
    l.setAttribute("src", w), l.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin"), l.setAttribute("title", "keycloak-session-iframe"), l.style.display = "none", document.body.appendChild(l);
    var v = function(S) {
      if (!(S.origin !== a.iframeOrigin || a.iframe.contentWindow !== S.source) && (S.data == "unchanged" || S.data == "changed" || S.data == "error")) {
        S.data != "unchanged" && e.clearToken();
        for (var E = a.callbackList.splice(0, a.callbackList.length), g = E.length - 1; g >= 0; --g) {
          var y = E[g];
          S.data == "error" ? y.setError() : y.setSuccess(S.data == "unchanged");
        }
      }
    };
    return window.addEventListener("message", v, !1), s.promise;
  }
  function B() {
    a.enable && e.token && setTimeout(function() {
      re().then(function(s) {
        s && B();
      });
    }, a.interval * 1e3);
  }
  function re() {
    var s = j();
    if (a.iframe && a.iframeOrigin) {
      var l = e.clientId + " " + (e.sessionId ? e.sessionId : "");
      a.callbackList.push(s);
      var w = a.iframeOrigin;
      a.callbackList.length == 1 && a.iframe.contentWindow.postMessage(l, w);
    } else
      s.setSuccess();
    return s.promise;
  }
  function Z() {
    var s = j();
    if ((a.enable || e.silentCheckSsoRedirectUri) && typeof e.endpoints.thirdPartyCookiesIframe == "function") {
      var l = document.createElement("iframe");
      l.setAttribute("src", e.endpoints.thirdPartyCookiesIframe()), l.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin"), l.setAttribute("title", "keycloak-3p-check-iframe"), l.style.display = "none", document.body.appendChild(l);
      var w = function(v) {
        l.contentWindow === v.source && (v.data !== "supported" && v.data !== "unsupported" || (v.data === "unsupported" && (T(
          `[KEYCLOAK] Your browser is blocking access to 3rd-party cookies, this means:

 - It is not possible to retrieve tokens without redirecting to the Keycloak server (a.k.a. no support for silent authentication).
 - It is not possible to automatically detect changes to the session status (such as the user logging out in another tab).

For more information see: https://www.keycloak.org/securing-apps/javascript-adapter#_modern_browsers`
        ), a.enable = !1, e.silentCheckSsoFallback && (e.silentCheckSsoRedirectUri = !1)), document.body.removeChild(l), window.removeEventListener("message", w), s.setSuccess()));
      };
      window.addEventListener("message", w, !1);
    } else
      s.setSuccess();
    return K(s.promise, e.messageReceiveTimeout, "Timeout when waiting for 3rd party check iframe message.");
  }
  function L(s) {
    if (!s || s == "default")
      return {
        login: async function(g) {
          return window.location.assign(await e.createLoginUrl(g)), j().promise;
        },
        logout: async function(g) {
          if (((g == null ? void 0 : g.logoutMethod) ?? e.logoutMethod) === "GET") {
            window.location.replace(e.createLogoutUrl(g));
            return;
          }
          const C = document.createElement("form");
          C.setAttribute("method", "POST"), C.setAttribute("action", e.createLogoutUrl(g)), C.style.display = "none";
          const N = {
            id_token_hint: e.idToken,
            client_id: e.clientId,
            post_logout_redirect_uri: r.redirectUri(g, !1)
          };
          for (const [M, H] of Object.entries(N)) {
            const W = document.createElement("input");
            W.setAttribute("type", "hidden"), W.setAttribute("name", M), W.setAttribute("value", H), C.appendChild(W);
          }
          document.body.appendChild(C), C.submit();
        },
        register: async function(g) {
          return window.location.assign(await e.createRegisterUrl(g)), j().promise;
        },
        accountManagement: function() {
          var g = e.createAccountUrl();
          if (typeof g < "u")
            window.location.href = g;
          else
            throw "Not supported by the OIDC server";
          return j().promise;
        },
        redirectUri: function(g, y) {
          return g && g.redirectUri ? g.redirectUri : e.redirectUri ? e.redirectUri : location.href;
        }
      };
    if (s == "cordova") {
      a.enable = !1;
      var l = function(g, y, C) {
        return window.cordova && window.cordova.InAppBrowser ? window.cordova.InAppBrowser.open(g, y, C) : window.open(g, y, C);
      }, w = function(g) {
        return g && g.cordovaOptions ? Object.keys(g.cordovaOptions).reduce(function(y, C) {
          return y[C] = g.cordovaOptions[C], y;
        }, {}) : {};
      }, v = function(g) {
        return Object.keys(g).reduce(function(y, C) {
          return y.push(C + "=" + g[C]), y;
        }, []).join(",");
      }, S = function(g) {
        var y = w(g);
        return y.location = "no", g && g.prompt == "none" && (y.hidden = "yes"), v(y);
      }, E = function() {
        return e.redirectUri || "http://localhost";
      };
      return {
        login: async function(g) {
          var y = j(), C = S(g), N = await e.createLoginUrl(g), M = l(N, "_blank", C), H = !1, W = !1, Q = function() {
            W = !0, M.close();
          };
          return M.addEventListener("loadstart", function(oe) {
            if (oe.url.indexOf(E()) == 0) {
              var Be = F(oe.url);
              _(Be, y), Q(), H = !0;
            }
          }), M.addEventListener("loaderror", function(oe) {
            if (!H)
              if (oe.url.indexOf(E()) == 0) {
                var Be = F(oe.url);
                _(Be, y), Q(), H = !0;
              } else
                y.setError(), Q();
          }), M.addEventListener("exit", function(oe) {
            W || y.setError({
              reason: "closed_by_user"
            });
          }), y.promise;
        },
        logout: function(g) {
          var y = j(), C = e.createLogoutUrl(g), N = l(C, "_blank", "location=no,hidden=yes,clearcache=yes"), M;
          return N.addEventListener("loadstart", function(H) {
            H.url.indexOf(E()) == 0 && N.close();
          }), N.addEventListener("loaderror", function(H) {
            H.url.indexOf(E()) == 0 || (M = !0), N.close();
          }), N.addEventListener("exit", function(H) {
            M ? y.setError() : (e.clearToken(), y.setSuccess());
          }), y.promise;
        },
        register: async function(g) {
          var y = j(), C = await e.createRegisterUrl(), N = S(g), M = l(C, "_blank", N);
          return M.addEventListener("loadstart", function(H) {
            if (H.url.indexOf(E()) == 0) {
              M.close();
              var W = F(H.url);
              _(W, y);
            }
          }), y.promise;
        },
        accountManagement: function() {
          var g = e.createAccountUrl();
          if (typeof g < "u") {
            var y = l(g, "_blank", "location=no");
            y.addEventListener("loadstart", function(C) {
              C.url.indexOf(E()) == 0 && y.close();
            });
          } else
            throw "Not supported by the OIDC server";
        },
        redirectUri: function(g) {
          return E();
        }
      };
    }
    if (s == "cordova-native")
      return a.enable = !1, {
        login: async function(g) {
          var y = j(), C = await e.createLoginUrl(g);
          return universalLinks.subscribe("keycloak", function(N) {
            universalLinks.unsubscribe("keycloak"), window.cordova.plugins.browsertab.close();
            var M = F(N.url);
            _(M, y);
          }), window.cordova.plugins.browsertab.openUrl(C), y.promise;
        },
        logout: function(g) {
          var y = j(), C = e.createLogoutUrl(g);
          return universalLinks.subscribe("keycloak", function(N) {
            universalLinks.unsubscribe("keycloak"), window.cordova.plugins.browsertab.close(), e.clearToken(), y.setSuccess();
          }), window.cordova.plugins.browsertab.openUrl(C), y.promise;
        },
        register: async function(g) {
          var y = j(), C = await e.createRegisterUrl(g);
          return universalLinks.subscribe("keycloak", function(N) {
            universalLinks.unsubscribe("keycloak"), window.cordova.plugins.browsertab.close();
            var M = F(N.url);
            _(M, y);
          }), window.cordova.plugins.browsertab.openUrl(C), y.promise;
        },
        accountManagement: function() {
          var g = e.createAccountUrl();
          if (typeof g < "u")
            window.cordova.plugins.browsertab.openUrl(g);
          else
            throw "Not supported by the OIDC server";
        },
        redirectUri: function(g) {
          return g && g.redirectUri ? g.redirectUri : e.redirectUri ? e.redirectUri : "http://localhost";
        }
      };
    throw "invalid adapter type: " + s;
  }
  const R = "kc-callback-";
  var A = function() {
    if (!(this instanceof A))
      return new A();
    localStorage.setItem("kc-test", "test"), localStorage.removeItem("kc-test");
    var s = this;
    function l() {
      const E = Date.now();
      for (const [g, y] of v()) {
        const C = S(y);
        (C === null || C < E) && localStorage.removeItem(g);
      }
    }
    function w() {
      for (const [E] of v())
        localStorage.removeItem(E);
    }
    function v() {
      return Object.entries(localStorage).filter(([E]) => E.startsWith(R));
    }
    function S(E) {
      let g;
      try {
        g = JSON.parse(E);
      } catch {
        return null;
      }
      return Ve(g) && "expires" in g && typeof g.expires == "number" ? g.expires : null;
    }
    s.get = function(E) {
      if (E) {
        var g = R + E, y = localStorage.getItem(g);
        return y && (localStorage.removeItem(g), y = JSON.parse(y)), l(), y;
      }
    }, s.add = function(E) {
      l();
      const g = R + E.state, y = JSON.stringify({
        ...E,
        // Set the expiry time to 1 hour from now.
        expires: Date.now() + 60 * 60 * 1e3
      });
      try {
        localStorage.setItem(g, y);
      } catch {
        w(), localStorage.setItem(g, y);
      }
    };
  }, O = function() {
    if (!(this instanceof O))
      return new O();
    var s = this;
    s.get = function(S) {
      if (S) {
        var E = w(R + S);
        if (v(R + S, "", l(-100)), E)
          return JSON.parse(E);
      }
    }, s.add = function(S) {
      v(R + S.state, JSON.stringify(S), l(60));
    }, s.removeItem = function(S) {
      v(S, "", l(-100));
    };
    var l = function(S) {
      var E = /* @__PURE__ */ new Date();
      return E.setTime(E.getTime() + S * 60 * 1e3), E;
    }, w = function(S) {
      for (var E = S + "=", g = document.cookie.split(";"), y = 0; y < g.length; y++) {
        for (var C = g[y]; C.charAt(0) == " "; )
          C = C.substring(1);
        if (C.indexOf(E) == 0)
          return C.substring(E.length, C.length);
      }
      return "";
    }, v = function(S, E, g) {
      var y = S + "=" + E + "; expires=" + g.toUTCString() + "; ";
      document.cookie = y;
    };
  };
  function x() {
    try {
      return new A();
    } catch {
    }
    return new O();
  }
  function D(s) {
    return function() {
      e.enableLogging && s.apply(console, Array.prototype.slice.call(arguments));
    };
  }
}
function Ko(t) {
  const e = String.fromCodePoint(...t);
  return btoa(e);
}
async function Vo(t) {
  const r = new TextEncoder().encode(t);
  if (typeof crypto > "u" || typeof crypto.subtle > "u")
    throw new Error("Web Crypto API is not available.");
  return await crypto.subtle.digest("SHA-256", r);
}
function Ke(t) {
  const [e, r] = t.split(".");
  if (typeof r != "string")
    throw new Error("Unable to decode token, payload not found.");
  let n;
  try {
    n = Jo(r);
  } catch (o) {
    throw new Error("Unable to decode token, payload is not a valid Base64URL value.", { cause: o });
  }
  try {
    return JSON.parse(n);
  } catch (o) {
    throw new Error("Unable to decode token, payload is not a valid JSON value.", { cause: o });
  }
}
function Jo(t) {
  let e = t.replaceAll("-", "+").replaceAll("_", "/");
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
      break;
    default:
      throw new Error("Input is not of the correct length.");
  }
  try {
    return Wo(e);
  } catch {
    return atob(e);
  }
}
function Wo(t) {
  return decodeURIComponent(atob(t).replace(/(.)/g, (e, r) => {
    let n = r.charCodeAt(0).toString(16).toUpperCase();
    return n.length < 2 && (n = "0" + n), "%" + n;
  }));
}
function Ve(t) {
  return typeof t == "object" && t !== null;
}
class Go extends X {
  constructor() {
    super(), this.clear();
  }
  clear() {
    this._keycloakAuth = null;
  }
  _initSsoClient() {
    this._keycloakAuth || (this._keycloakAuth = new Xt({
      url: void 0,
      realm: void 0,
      clientId: void 0
      // url: import.meta.env.VITE_SSO_URL,
      // realm: import.meta.env.VITE_SSO_REALM,
      // clientId: import.meta.env.VITE_SSO_CLIENT_ID,
    }));
  }
  isAuthenticated() {
    return this._keycloakAuth && this._keycloakAuth.authenticated;
  }
  async init(e, r, n) {
    this._initSsoClient();
    try {
      if (await this._keycloakAuth.init({
        onLoad: "login-required",
        checkLoginIframe: !window.Cypress
      }))
        return await r(e);
      window.location.reload();
    } catch (o) {
      return console.error("Sso failed", o), await n(e, o);
    }
  }
  async refreshToken() {
    if (!this._keycloakAuth || !this.isAuthenticated())
      return null;
    try {
      const e = await this._keycloakAuth.updateToken(70);
    } catch {
      console.error("Failed to refresh token");
    }
    return this._keycloakAuth.token;
  }
  async logout() {
    if (!this._keycloakAuth)
      return null;
    await this._keycloakAuth.logout();
  }
}
let Ue = new Go();
class Xo extends X {
  /**
   * Returns a string where the first character in every word is upper case.
   * @param str
   * @returns {string}
   */
  title(e) {
    return e.trim().toLowerCase().split(" ").map(function(r) {
      return r[0].toUpperCase() + r.substr(1);
    }).join(" ");
  }
  upperFirst(e) {
    return e ? (e = e.toString(), e.charAt(0).toUpperCase() + e.slice(1)) : "";
  }
}
let Ys = new Xo();
class Zo extends X {
  constructor() {
    super(), this._urls = null;
  }
  clear() {
    this._urls = null;
  }
  isInitialized() {
    return this._urls !== null;
  }
  initialize(e) {
    this._urls = e;
  }
  /**
   * retrieve query string
   *
   * @param {object} queryString - {<key>: <value>} to build as query string
   *
   * @return {string}
   */
  getQueryString(e) {
    return Object.keys(e).map(
      (r) => encodeURIComponent(r) + "=" + encodeURIComponent(e[r])
    ).join("&");
  }
  _checkUrlNameExists(e) {
    if (Object.prototype.hasOwnProperty.call(this._urls, e))
      return this._urls[e];
    throw Error(`url name '${e}' not found in urls`);
  }
  /**
   * Render api url
   *
   * ex:
   * urls = {user: "user/{id}/permissions/"}
   * const result = render("user", {id: 24});
   * result is equal to : user/24/permissions/
   *
   * NB: base url should be define with axios baseURL
   *
   * @param {String} urlName url name to use
   * @param {Object} params (optional) key to substitute with value in url
   * @param {Object} queryString (optional) query string to add to url
   *
   * @return {string}
   */
  render(e, r = {}, n = {}) {
    r = r || {}, n = n || {}, this.checkIsInitialized();
    let o = this._checkUrlNameExists(e);
    return Object.keys(r).forEach(
      (a) => o = o.replace("{" + a + "}", r[a])
    ), n = this.getQueryString(n), n && (o += "?" + n), o;
  }
}
let Je = new Zo();
const Et = {
  initialize() {
    q.defaults.withCredentials = !0, q.defaults.baseURL = void 0, q.defaults.headers.common["Sso-Client-Id"] = void 0, q.interceptors.request.use(
      async (t) => {
        const e = await Ue.refreshToken();
        return e && (t.headers.Authorization = `Bearer ${e}`), t;
      },
      (t) => Promise.reject(t)
    ), q.interceptors.response.use(
      void 0,
      async (t) => await this.errorHandler(t)
    );
  },
  setAuthorizationSharedTokenHeader(t) {
    q.defaults.headers.common.Authorization = "Shared-Token " + t;
  },
  resetAuthorizationHeader() {
    delete q.defaults.headers.common.Authorization;
  },
  async errorHandler(t, e) {
    if (console.error("errorHandler", t, t.response), t.response) {
      if (t.response.status === 401)
        return Ue.logout(), e.replace({ name: "403" }), Promise.reject(t.response);
      if (t.response.status === 403)
        return e.replace({ name: "403" }), Promise.reject(t.response);
      if (t.response.status < 500)
        return console.warn("Axios interception error < 500", t), Promise.reject(t);
    }
    return console.error("Axios unknown error", t.response), e.replace({ name: "500" }), Promise.reject(t.response);
  }
}, { mapGetters: Qo } = import("vuex"), Hs = {
  computed: {
    ...Qo("auth", ["isGuestUser", "isLoggedIn"]),
    getUrlName() {
      return console.log(
        "getUrlName",
        this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone"
      ), this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone";
    }
  }
}, qs = {
  methods: {
    transformImage(t, e) {
      return t.replace("/upload/", `/upload/${e},e_improve/`);
    },
    fitToSizeWithAspectRatioRetained(t, e, r, n = "b_white") {
      const o = `w_${e},h_${r},c_pad,${n}`;
      return this.transformImage(t, o);
    }
  }
}, es = {
  current_user: null,
  current_user_group: null,
  sharing_token: null
}, ts = {
  SET_CURRENT_USER(t, e) {
    t.current_user = e;
  },
  SET_CURRENT_USER_GROUP(t, e) {
    t.current_user_group = e;
  },
  SET_SHARING_TOKEN(t, e) {
    t.sharing_token = e, Et.setAuthorizationSharedTokenHeader(e);
  },
  RESET_AUTH(t) {
    Et.resetAuthorizationHeader(), t.current_user = null, t.current_user_group = null, t.sharing_token = null;
  }
}, rs = {
  async fetchLoggedUser({ commit: t }) {
    try {
      let e = await ze.get(Je.render("fetchLoggedUser"));
      t("SET_CURRENT_USER", e), t("SET_CURRENT_USER_GROUP", e.group);
    } catch (e) {
      console.error("failed: ", e);
    }
  },
  async setSharingToken({ commit: t, dispatch: e }, r) {
    await e("logout"), t("SET_SHARING_TOKEN", r);
  },
  async acceptCookies({ commit: t }, e) {
    const r = {
      accepted_cookies: !0
    };
    try {
      const n = await ze.put(
        Je.render("userAcceptCookies", { id: e }),
        r
      );
      t("SET_CURRENT_USER", n);
    } catch (n) {
      throw console.error("acceptCookies failed: ", n), n;
    }
  },
  async logout({ commit: t }) {
    t("RESET_AUTH"), await Ue.logout();
  },
  async updateLang({ dispatch: t }, e) {
    await ze.put(Je.render("userLang", { id: e.userId }), {
      lang: e.lang
    }), await t("fetchLoggedUser");
  }
}, ns = {
  isLoggedIn: (t, e) => t.sharing_token && e.isGuestUser || Ue.isAuthenticated(),
  isLoggedInSharingMode: (t, e) => t.sharing_token && e.isGuestUser,
  isGuestUser: (t) => t.current_user && t.current_user.group.id === Pn.GUEST,
  isSharingTokenExists: (t) => (e) => t.sharing_token && t.sharing_token === e,
  getCurrentUser: (t) => t.current_user,
  getCurrentUserGroupId: (t) => t.current_user.group.id,
  areCookiesAccepted: (t) => t.current_user.profile.accepted_cookies,
  getRouteName: (t) => (e) => t.sharing_token ? `shared_${e}` : e,
  hasSharingToken: (t) => t.sharing_token !== null,
  getSharingToken: (t) => t.sharing_token,
  getUserLang: (t) => t.current_user.profile.lang
}, zs = {
  namespaced: !0,
  state: es,
  mutations: ts,
  actions: rs,
  getters: ns
}, Tt = "cs-lang", os = {
  current_lang: null
}, ss = {
  SET_CURRENT_LANGUAGE: (t, e) => {
    t.current_lang = e;
  }
}, is = {
  _setLang({ commit: t }, e) {
    localStorage.setItem(Tt, e), me.global.locale.value = e, q.defaults.headers.common["Accept-Language"] = e, document.querySelector("html").setAttribute("lang", e), t("SET_CURRENT_LANGUAGE", e);
  },
  initI18n({ dispatch: t }) {
    const e = localStorage.getItem(Tt) || navigator.language.slice(0, 2) || me.global.locale.value;
    t("_setLang", e);
  },
  setCurrentLang({ state: t, dispatch: e }, r) {
    if (t.current_lang === null)
      throw Error(
        `You should initialize language with 'dispatch("config/initLang")' first`
      );
    e("_setLang", r);
  },
  setUserLang({ state: t, dispatch: e, rootGetters: r }) {
    const n = r["auth/getUserLang"];
    n !== t.current_lang && e("_setLang", n);
  }
}, as = {
  getCurrentLang: (t) => t.current_lang,
  // isLangAvailable: (state) => (lang) => i18n.global.availableLocales.includes(lang),
  isLangAvailable: () => (t) => me.global.availableLocales.includes(t),
  availableLangs: () => me.global.availableLocales
}, Ks = {
  namespaced: !0,
  state: os,
  mutations: ss,
  actions: is,
  getters: as
};
export {
  wo as ArrayService,
  Et as AxiosHelper,
  Ds as BENEFICIARY,
  Cs as BeneficiaryCriteriaService,
  ls as CaareaVlibPlugin,
  Ms as CriteriaService,
  Os as CurrencyService,
  Ls as DISTRIBUTOR_ADMIN,
  $s as DateService,
  Hs as ErrorPageMixin,
  Fs as GUEST,
  Pn as GroupService,
  _e as HttpError,
  ze as HttpService,
  Us as INTERNAL_ADMIN,
  Ns as INTERNAL_USER,
  qs as ImageMixin,
  js as NumberService,
  Bs as ObjectService,
  Ps as PricingService,
  Is as SELLER_DISTRIBUTOR,
  Ue as SsoService,
  Ys as StringService,
  Je as UrlService,
  zs as authStore,
  Ks as configStore
};
