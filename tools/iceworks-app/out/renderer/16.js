(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 1187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * filesize
 *
 * @copyright 2017 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.5.11
 */
(function (global) {
	var b = /^(b|B)$/,
	    symbol = {
		iec: {
			bits: ["b", "Kib", "Mib", "Gib", "Tib", "Pib", "Eib", "Zib", "Yib"],
			bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
		},
		jedec: {
			bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		}
	},
	    fullform = {
		iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
		jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
	};

	/**
  * filesize
  *
  * @method filesize
  * @param  {Mixed}   arg        String, Int or Float to transform
  * @param  {Object}  descriptor [Optional] Flags
  * @return {String}             Readable file size String
  */
	function filesize(arg) {
		var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = [],
		    val = 0,
		    e = void 0,
		    base = void 0,
		    bits = void 0,
		    ceil = void 0,
		    full = void 0,
		    fullforms = void 0,
		    neg = void 0,
		    num = void 0,
		    output = void 0,
		    round = void 0,
		    unix = void 0,
		    spacer = void 0,
		    standard = void 0,
		    symbols = void 0;

		if (isNaN(arg)) {
			throw new Error("Invalid arguments");
		}

		bits = descriptor.bits === true;
		unix = descriptor.unix === true;
		base = descriptor.base || 2;
		round = descriptor.round !== undefined ? descriptor.round : unix ? 1 : 2;
		spacer = descriptor.spacer !== undefined ? descriptor.spacer : unix ? "" : " ";
		symbols = descriptor.symbols || descriptor.suffixes || {};
		standard = base === 2 ? descriptor.standard || "jedec" : "jedec";
		output = descriptor.output || "string";
		full = descriptor.fullform === true;
		fullforms = descriptor.fullforms instanceof Array ? descriptor.fullforms : [];
		e = descriptor.exponent !== undefined ? descriptor.exponent : -1;
		num = Number(arg);
		neg = num < 0;
		ceil = base > 2 ? 1000 : 1024;

		// Flipping a negative number to determine the size
		if (neg) {
			num = -num;
		}

		// Determining the exponent
		if (e === -1 || isNaN(e)) {
			e = Math.floor(Math.log(num) / Math.log(ceil));

			if (e < 0) {
				e = 0;
			}
		}

		// Exceeding supported length, time to reduce & multiply
		if (e > 8) {
			e = 8;
		}

		// Zero is now a special case because bytes divide by 1
		if (num === 0) {
			result[0] = 0;
			result[1] = unix ? "" : symbol[standard][bits ? "bits" : "bytes"][e];
		} else {
			val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1000, e));

			if (bits) {
				val = val * 8;

				if (val >= ceil && e < 8) {
					val = val / ceil;
					e++;
				}
			}

			result[0] = Number(val.toFixed(e > 0 ? round : 0));
			result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[standard][bits ? "bits" : "bytes"][e];

			if (unix) {
				result[1] = standard === "jedec" ? result[1].charAt(0) : e > 0 ? result[1].replace(/B$/, "") : result[1];

				if (b.test(result[1])) {
					result[0] = Math.floor(result[0]);
					result[1] = "";
				}
			}
		}

		// Decorating a 'diff'
		if (neg) {
			result[0] = -result[0];
		}

		// Applying custom symbol
		result[1] = symbols[result[1]] || result[1];

		// Returning Array, Object, or String (default)
		if (output === "array") {
			return result;
		}

		if (output === "exponent") {
			return e;
		}

		if (output === "object") {
			return { value: result[0], suffix: result[1], symbol: result[1] };
		}

		if (full) {
			result[1] = fullforms[e] ? fullforms[e] : fullform[standard][e] + (bits ? "bit" : "byte") + (result[0] === 1 ? "" : "s");
		}

		return result.join(spacer);
	}

	// Partial application for functional programming
	filesize.partial = function (opt) {
		return function (arg) {
			return filesize(arg, opt);
		};
	};

	// CommonJS, AMD, script tag
	if (true) {
		module.exports = filesize;
	} else {}
})(typeof window !== "undefined" ? window : global);


/***/ }),

/***/ 1188:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1189:
/***/ (function(module, exports) {


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}


/***/ }),

/***/ 1190:
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(11);
var path = __webpack_require__(3);
var alloc = __webpack_require__(1191);
var MAX_BYTES = 512;

module.exports = function(bytes, size, cb) {
  // Only two args
  if (cb === undefined) {
    var file = bytes;
    cb = size;

    fs.stat(file, function(err, stat) {
      if (err || !stat.isFile()) return cb(err, false);

      fs.open(file, 'r', function(r_err, descriptor){
          if (r_err) return cb(r_err);
          bytes = alloc(MAX_BYTES);
          // Read the file with no encoding for raw buffer access.
          fs.read(descriptor, bytes, 0, bytes.length, 0, function(err, size, bytes){
            fs.close(descriptor, function(c_err){
                if (c_err) return cb(c_err, false);
                return cb(null, isBinaryCheck(bytes, size));
            });
          });
      });
    });
  }
  else
    return cb(null, isBinaryCheck(bytes, size));
};

function isBinaryCheck(bytes, size) {
  if (size === 0)
    return false;

  var suspicious_bytes = 0;
  var total_bytes = Math.min(size, MAX_BYTES);

  // UTF-8 BOM
  if (size >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) {
    return false;
  }

  // UTF-32 BOM
  if (size >= 4 && bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] == 0xFE && bytes[3] == 0xFF) {
    return false;
  }

  // UTF-32 LE BOM
  if (size >= 4 && bytes[0] == 0xFF && bytes[1] == 0xFE && bytes[2] === 0x00 && bytes[3] === 0x00) {
    return false;
  }

  // GB BOM
  if (size >= 4 && bytes[0] == 0x84 && bytes[1] == 0x31 && bytes[2] == 0x95 && bytes[3] == 0x33) {
    return false;
  }

  if (total_bytes >= 5 && bytes.slice(0, 5) == "%PDF-") {
      /* PDF. This is binary. */
      return true;
  }

  // UTF-16 BE BOM
  if (size >= 2 && bytes[0] == 0xFE && bytes[1] == 0xFF) {
    return false;
  }

  // UTF-16 LE BOM
  if (size >= 2 && bytes[0] == 0xFF && bytes[1] == 0xFE) {
    return false;
  }

  for (var i = 0; i < total_bytes; i++) {
    if (bytes[i] === 0) { // NULL byte--it's binary!
      return true;
    }
    else if ((bytes[i] < 7 || bytes[i] > 14) && (bytes[i] < 32 || bytes[i] > 127)) {
      // UTF-8 detection
      if (bytes[i] > 193 && bytes[i] < 224 && i + 1 < total_bytes) {
          i++;
          if (bytes[i] > 127 && bytes[i] < 192) {
            continue;
          }
      }
      else if (bytes[i] > 223 && bytes[i] < 240 && i + 2 < total_bytes) {
          i++;
          if (bytes[i] > 127 && bytes[i] < 192 && bytes[i + 1] > 127 && bytes[i + 1] < 192) {
            i++;
            continue;
          }
      }
      suspicious_bytes++;
      // Read at least 32 bytes before making a decision
      if (i > 32 && (suspicious_bytes * 100) / total_bytes > 10) {
        return true;
      }
    }
  }

  if ((suspicious_bytes * 100) / total_bytes > 10) {
    return true;
  }

  return false;
}

module.exports.sync = function(bytes, size) {
  // Only one arg
  if (size === undefined) {
    var file = bytes;
    try {
      if(!fs.statSync(file).isFile()) return false;
    } catch (err) {
      // otherwise continue on
    }
    var descriptor = fs.openSync(file, 'r');
    try {
      // Read the file with no encoding for raw buffer access.
      bytes = alloc(MAX_BYTES);
      size = fs.readSync(descriptor, bytes, 0, bytes.length, 0);
    } finally {
      fs.closeSync(descriptor);
    }
    return isBinaryCheck(bytes, size);
  }
  else
    return isBinaryCheck(bytes, size);
}


/***/ }),

/***/ 1191:
/***/ (function(module, exports, __webpack_require__) {

var bufferFill = __webpack_require__(1192)
var allocUnsafe = __webpack_require__(1193)

module.exports = function alloc (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  }

  if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }

  if (Buffer.alloc) {
    return Buffer.alloc(size, fill, encoding)
  }

  var buffer = allocUnsafe(size)

  if (size === 0) {
    return buffer
  }

  if (fill === undefined) {
    return bufferFill(buffer, 0)
  }

  if (typeof encoding !== 'string') {
    encoding = undefined
  }

  return bufferFill(buffer, fill, encoding)
}


/***/ }),

/***/ 1192:
/***/ (function(module, exports) {

/* Node.js 6.4.0 and up has full support */
var hasFullSupport = (function () {
  try {
    if (!Buffer.isEncoding('latin1')) {
      return false
    }

    var buf = Buffer.alloc ? Buffer.alloc(4) : new Buffer(4)

    buf.fill('ab', 'ucs2')

    return (buf.toString('hex') === '61006200')
  } catch (_) {
    return false
  }
}())

function isSingleByte (val) {
  return (val.length === 1 && val.charCodeAt(0) < 256)
}

function fillWithNumber (buffer, val, start, end) {
  if (start < 0 || end > buffer.length) {
    throw new RangeError('Out of range index')
  }

  start = start >>> 0
  end = end === undefined ? buffer.length : end >>> 0

  if (end > start) {
    buffer.fill(val, start, end)
  }

  return buffer
}

function fillWithBuffer (buffer, val, start, end) {
  if (start < 0 || end > buffer.length) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return buffer
  }

  start = start >>> 0
  end = end === undefined ? buffer.length : end >>> 0

  var pos = start
  var len = val.length
  while (pos <= (end - len)) {
    val.copy(buffer, pos)
    pos += len
  }

  if (pos !== end) {
    val.copy(buffer, pos, 0, end - pos)
  }

  return buffer
}

function fill (buffer, val, start, end, encoding) {
  if (hasFullSupport) {
    return buffer.fill(val, start, end, encoding)
  }

  if (typeof val === 'number') {
    return fillWithNumber(buffer, val, start, end)
  }

  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = buffer.length
    } else if (typeof end === 'string') {
      encoding = end
      end = buffer.length
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }

    if (encoding === 'latin1') {
      encoding = 'binary'
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }

    if (val === '') {
      return fillWithNumber(buffer, 0, start, end)
    }

    if (isSingleByte(val)) {
      return fillWithNumber(buffer, val.charCodeAt(0), start, end)
    }

    val = new Buffer(val, encoding)
  }

  if (Buffer.isBuffer(val)) {
    return fillWithBuffer(buffer, val, start, end)
  }

  // Other values (e.g. undefined, boolean, object) results in zero-fill
  return fillWithNumber(buffer, 0, start, end)
}

module.exports = fill


/***/ }),

/***/ 1193:
/***/ (function(module, exports) {

function allocUnsafe (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  }

  if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }

  if (Buffer.allocUnsafe) {
    return Buffer.allocUnsafe(size)
  } else {
    return new Buffer(size)
  }
}

module.exports = allocUnsafe


/***/ }),

/***/ 1194:
/***/ (function(module, exports, __webpack_require__) {

/*
 * Line By Line
 *
 * A NodeJS module that helps you reading large text files, line by line,
 * without buffering the files into memory.
 *
 * Copyright (c) 2012 Markus von der Wehd <mvdw@mwin.de>
 * MIT License, see LICENSE.txt, see http://www.opensource.org/licenses/mit-license.php
 */

var stream = __webpack_require__(41);
var StringDecoder = __webpack_require__(654).StringDecoder;
var path = __webpack_require__(3);
var fs = __webpack_require__(11);
var events = __webpack_require__(32);

// let's make sure we have a setImmediate function (node.js <0.10)
if (typeof global.setImmediate == 'undefined') { setImmediate = process.nextTick;}

var LineByLineReader = function (filepath, options) {
	var self = this;

	this._encoding = options && options.encoding || 'utf8';
	if (filepath instanceof stream.Readable) {
		this._readStream = filepath;
	}
	else {
		this._readStream = null;
		this._filepath = path.normalize(filepath);
		this._streamOptions = { encoding: this._encoding };

		if (options && options.start) {
			this._streamOptions.start = options.start;
		}

		if (options && options.end) {
			this._streamOptions.end = options.end;
		}
	}
	this._skipEmptyLines = options && options.skipEmptyLines || false;

	this._lines = [];
	this._lineFragment = '';
	this._paused = false;
	this._end = false;
	this._ended = false;
	this.decoder = new StringDecoder(this._encoding);

	events.EventEmitter.call(this);

	setImmediate(function () {
		self._initStream();
	});
};

LineByLineReader.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: LineByLineReader,
		enumerable: false
	}
});

LineByLineReader.prototype._initStream = function () {
	var self = this,
		readStream = this._readStream ? this._readStream :
			fs.createReadStream(this._filepath, this._streamOptions);

	readStream.on('error', function (err) {
		self.emit('error', err);
	});

	readStream.on('open', function () {
		self.emit('open');
	});

	readStream.on('data', function (data) {
		self._readStream.pause();
		var dataAsString = data;
		if (data instanceof Buffer) {
			dataAsString = self.decoder.write(data);
		}
		self._lines = self._lines.concat(dataAsString.split(/(?:\n|\r\n|\r)/g));

		self._lines[0] = self._lineFragment + self._lines[0];
		self._lineFragment = self._lines.pop() || '';

		setImmediate(function () {
			self._nextLine();
		});
	});

	readStream.on('end', function () {
		self._end = true;

		setImmediate(function () {
			self._nextLine();
		});
	});

	this._readStream = readStream;
};

LineByLineReader.prototype._nextLine = function () {
	var self = this,
		line;

	if (this._paused) {
		return;
	}

	if (this._lines.length === 0) {
		if (this._end) {
			if (this._lineFragment) {
				this.emit('line', this._lineFragment);
				this._lineFragment = '';
			}
			if (!this._paused) {
				this.end();
			}
		} else {
			this._readStream.resume();
		}
		return;
	}

	line = this._lines.shift();

	if (!this._skipEmptyLines || line.length > 0) {
		this.emit('line', line);
	}

	setImmediate(function () {
		if (!this._paused) {
			self._nextLine();
		}
	});
};

LineByLineReader.prototype.pause = function () {
	this._paused = true;
};

LineByLineReader.prototype.resume = function () {
	var self = this;

	this._paused = false;

	setImmediate(function () {
		self._nextLine();
	});
};

LineByLineReader.prototype.end = function () {
	if (!this._ended){
		this._ended = true;
		this.emit('end');
	}
};

LineByLineReader.prototype.close = function () {
	var self = this;

	this._readStream.destroy();
	this._end = true;
	this._lines = [];

	setImmediate(function () {
		self._nextLine();
	});
};

module.exports = LineByLineReader;


/***/ }),

/***/ 1195:
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",a="year",o=/^(\d{4})-?(\d{1,2})-?(\d{0,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/,h=/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},f={padStart:c,padZoneStr:function(t){var n=Math.abs(t),e=Math.floor(n/60),r=n%60;return(t<=0?"+":"-")+c(e,2,"0")+":"+c(r,2,"0")},monthDiff:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,"months"),i=n-r<0,s=t.clone().add(e+(i?-1:1),"months");return Number(-(e+(n-r)/(i?r-s:s-r))||0)},absFloor:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},prettyUnit:function(o){return{M:u,y:a,w:s,d:i,h:r,m:e,s:n,ms:t}[o]||String(o||"").toLowerCase().replace(/s$/,"")},isUndefined:function(t){return void 0===t}},$="en",l={};l[$]=d;var m=function(t){return t instanceof D},y=function(t,n,e){var r;if(!t)return null;if("string"==typeof t)l[t]&&(r=t),n&&(l[t]=n,r=t);else{var i=t.name;l[i]=t,r=i}return e||($=r),r},M=function(t,n){if(m(t))return t.clone();var e=n?"string"==typeof n?{format:n}:n:{};return e.date=t,new D(e)},p=function(t,n){return M(t,{locale:n.$L})},S=f;S.parseLocale=y,S.isDayjs=m,S.wrapper=p;var D=function(){function d(t){this.parse(t)}var c=d.prototype;return c.parse=function(t){var n,e;this.$d=null===(n=t.date)?new Date(NaN):S.isUndefined(n)?new Date:n instanceof Date?n:"string"==typeof n&&/.*[^Z]$/i.test(n)&&(e=n.match(o))?new Date(e[1],e[2]-1,e[3]||1,e[5]||0,e[6]||0,e[7]||0,e[8]||0):new Date(n),this.init(t)},c.init=function(t){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds(),this.$L=this.$L||y(t.locale,null,!0)||$},c.$utils=function(){return S},c.isValid=function(){return!("Invalid Date"===this.$d.toString())},c.isSame=function(t,n){var e=M(t);return this.startOf(n)<=e&&e<=this.endOf(n)},c.isAfter=function(t,n){return M(t)<this.startOf(n)},c.isBefore=function(t,n){return this.endOf(n)<M(t)},c.year=function(){return this.$y},c.month=function(){return this.$M},c.day=function(){return this.$W},c.date=function(){return this.$D},c.hour=function(){return this.$H},c.minute=function(){return this.$m},c.second=function(){return this.$s},c.millisecond=function(){return this.$ms},c.unix=function(){return Math.floor(this.valueOf()/1e3)},c.valueOf=function(){return this.$d.getTime()},c.startOf=function(t,o){var h=this,d=!!S.isUndefined(o)||o,c=function(t,n){var e=p(new Date(h.$y,n,t),h);return d?e:e.endOf(i)},f=function(t,n){return p(h.toDate()[t].apply(h.toDate(),(d?[0,0,0,0]:[23,59,59,999]).slice(n)),h)};switch(S.prettyUnit(t)){case a:return d?c(1,0):c(31,11);case u:return d?c(1,this.$M):c(0,this.$M+1);case s:return c(d?this.$D-this.$W:this.$D+(6-this.$W),this.$M);case i:case"date":return f("setHours",0);case r:return f("setMinutes",1);case e:return f("setSeconds",2);case n:return f("setMilliseconds",3);default:return this.clone()}},c.endOf=function(t){return this.startOf(t,!1)},c.$set=function(s,o){var h,d=S.prettyUnit(s),c=(h={},h[i]="setDate",h.date="setDate",h[u]="setMonth",h[a]="setFullYear",h[r]="setHours",h[e]="setMinutes",h[n]="setSeconds",h[t]="setMilliseconds",h)[d],f=d===i?this.$D+(o-this.$W):o;return this.$d[c]&&this.$d[c](f),this.init(),this},c.set=function(t,n){return this.clone().$set(t,n)},c.add=function(t,o){var h,d=this;t=Number(t);var c=S.prettyUnit(o),f=function(n,e){var r=d.set("date",1).set(n,e+t);return r.set("date",Math.min(d.$D,r.daysInMonth()))},$=function(n){var e=new Date(d.$d);return e.setDate(e.getDate()+n*t),p(e,d)};if(c===u)return f(u,this.$M);if(c===a)return f(a,this.$y);if(c===i)return $(1);if(c===s)return $(7);var l=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,m=this.valueOf()+t*l;return p(m,this)},c.subtract=function(t,n){return this.add(-1*t,n)},c.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=S.padZoneStr(this.$d.getTimezoneOffset()),i=this.$locale(),s=i.weekdays,u=i.months,a=function(t,n,e,r){return t&&t[n]||e[n].substr(0,r)},o=function(t){return 0===n.$H?12:S.padStart(n.$H<13?n.$H:n.$H-12,"hh"===t?2:1,"0")};return e.replace(h,function(t){return t.indexOf("[")>-1?t.replace(/\[|\]/g,""):{YY:String(n.$y).slice(-2),YYYY:String(n.$y),M:String(n.$M+1),MM:S.padStart(n.$M+1,2,"0"),MMM:a(i.monthsShort,n.$M,u,3),MMMM:u[n.$M],D:String(n.$D),DD:S.padStart(n.$D,2,"0"),d:String(n.$W),dd:a(i.weekdaysMin,n.$W,s,2),ddd:a(i.weekdaysShort,n.$W,s,3),dddd:s[n.$W],H:String(n.$H),HH:S.padStart(n.$H,2,"0"),h:o(t),hh:o(t),a:n.$H<12?"am":"pm",A:n.$H<12?"AM":"PM",m:String(n.$m),mm:S.padStart(n.$m,2,"0"),s:String(n.$s),ss:S.padStart(n.$s,2,"0"),SSS:S.padStart(n.$ms,3,"0"),Z:r}[t]||r.replace(":","")})},c.diff=function(t,o,h){var d,c=S.prettyUnit(o),f=M(t),$=this-f,l=S.monthDiff(this,f);return l=(d={},d[a]=l/12,d[u]=l,d.quarter=l/3,d[s]=$/6048e5,d[i]=$/864e5,d[r]=$/36e5,d[e]=$/6e4,d[n]=$/1e3,d)[c]||$,h?l:S.absFloor(l)},c.daysInMonth=function(){return this.endOf(u).$D},c.$locale=function(){return l[this.$L]},c.locale=function(t,n){var e=this.clone();return e.$L=y(t,n,!0),e},c.clone=function(){return p(this.toDate(),this)},c.toDate=function(){return new Date(this.$d)},c.toArray=function(){return[this.$y,this.$M,this.$D,this.$H,this.$m,this.$s,this.$ms]},c.toJSON=function(){return this.toISOString()},c.toISOString=function(){return this.$d.toISOString()},c.toObject=function(){return{years:this.$y,months:this.$M,date:this.$D,hours:this.$H,minutes:this.$m,seconds:this.$s,milliseconds:this.$ms}},c.toString=function(){return this.$d.toUTCString()},d}();return M.prototype=D.prototype,M.extend=function(t,n){return t(n,D,M),M},M.locale=y,M.isDayjs=m,M.unix=function(t){return M(1e3*t)},M.en=l[$],M});


/***/ }),

/***/ 1196:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

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
  // Assume cyclic values are equal.
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
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = orderBy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(727)(module)))

/***/ }),

/***/ 1197:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1198:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1199:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(796);
__webpack_require__(796);
module.exports = __webpack_require__(1202);

/***/ }),

/***/ 1200:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
__webpack_require__(83);
__webpack_require__(302);
__webpack_require__(1201);

/***/ }),

/***/ 1201:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _step = __webpack_require__(1203);

var _step2 = _interopRequireDefault(_step);

var _stepItem = __webpack_require__(1204);

var _stepItem2 = _interopRequireDefault(_stepItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_step2['default'].Item = _stepItem2['default'];

exports['default'] = _step2['default'];
module.exports = exports['default'];

/***/ }),

/***/ 1203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Step */
var Step = (_temp = _class = function (_Component) {
    _inherits(Step, _Component);

    function Step(props, context) {
        _classCallCheck(this, Step);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            parentWidth: 'auto',
            parentHeight: 'auto'
        };
        _this.resize = _this.resize.bind(_this);
        return _this;
    }

    Step.prototype.componentDidMount = function componentDidMount() {
        /* istanbul ignore if */
        if (!_nextUtil.support.flex) {
            this.resize();
            _nextDom.events.on(window, 'resize', this.resize);
        }
    };

    Step.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('current' in newProps) {
            this.setState({
                current: newProps.current
            });
        }
    };

    Step.prototype.componentWillUnmount = function componentWillUnmount() {
        /* istanbul ignore if */
        if (!_nextUtil.support.flex) {
            _nextDom.events.off(window, 'resize', this.resize);
        }
    };

    Step.prototype.resize = function resize() {
        if (this.step) {
            this.setState({
                parentWidth: this.step.offsetWidth || 0,
                parentHeight: this.step.offsetHeight || 0
            });
        }
    };

    Step.prototype._getValidChildren = function _getValidChildren(children) {
        var result = [];
        _react2['default'].Children.forEach(children, function (child) {
            if (_react2['default'].isValidElement(child)) {
                result.push(child);
            }
        });
        return result;
    };

    Step.prototype._stepRefHandler = function _stepRefHandler(ref) {
        this.step = ref;
    };

    Step.prototype.render = function render() {
        var _classNames;

        /* eslint-disable prefer-const */
        var _props = this.props,
            className = _props.className,
            current = _props.current,
            direction = _props.direction,
            type = _props.type,
            children = _props.children,
            readOnly = _props.readOnly,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['className', 'current', 'direction', 'type', 'children', 'readOnly', 'animation']);

        var prefix = this.context.prefix || this.props.prefix;
        var _state = this.state,
            parentWidth = _state.parentWidth,
            parentHeight = _state.parentHeight;

        // type不同对应的direction不同

        direction = type === 'arrow' ? 'horizontal' : direction;

        // children去除null
        children = this._getValidChildren(children);

        // 修改子节点属性
        var cloneChildren = _react.Children.map(children, function (child, index) {
            var status = index < current ? 'finish' : index === current ? 'process' : 'wait';

            return _react2['default'].cloneElement(child, {
                prefix: prefix,
                key: index,
                index: index,
                total: children.length,
                status: child.props.status || status,
                type: type,
                direction: direction,
                parentWidth: parentWidth,
                parentHeight: parentHeight,
                readOnly: readOnly,
                animation: animation
            });
        });

        var stepCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'step', true), _defineProperty(_classNames, prefix + 'step-' + type, type), _defineProperty(_classNames, prefix + 'step-' + direction, direction), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: stepCls, ref: this._stepRefHandler.bind(this) }),
            cloneChildren
        );
    };

    return Step;
}(_react.Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 当前步骤
     */
    current: _propTypes2['default'].number,
    /**
     * 展示方向
     */
    direction: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    /**
     * 类型
     */
    type: _propTypes2['default'].oneOf(['circle', 'arrow', 'dot']),
    /**
     * 是否只读模式
     */
    readOnly: _propTypes2['default'].bool,
    /**
     * 是否开启动效
     */
    animation: _propTypes2['default'].bool,
    /**
     * 自定义样式名
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    current: 0,
    direction: 'horizontal',
    type: 'circle',
    animation: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Step.displayName = 'Step';
exports['default'] = Step;
module.exports = exports['default'];

/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextProgress = __webpack_require__(303);

var _nextProgress2 = _interopRequireDefault(_nextProgress);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Step.Item */
var StepItem = (_temp = _class = function (_Component) {
    _inherits(StepItem, _Component);

    function StepItem(props) {
        _classCallCheck(this, StepItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.removeClickedCls = _this.removeClickedCls.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this._nodeRefHandler = _this._nodeRefHandler.bind(_this);
        return _this;
    }

    StepItem.prototype.getNode = function getNode() {
        var _props = this.props,
            prefix = _props.prefix,
            index = _props.index,
            status = _props.status,
            icon = _props.icon,
            type = _props.type,
            percent = _props.percent;

        var nodeElement = icon;
        if (type === 'dot') {
            nodeElement = icon ? _react2['default'].createElement(_nextIcon2['default'], { type: icon }) : _react2['default'].createElement('span', { className: prefix + 'step-item-node-dot' });
        } else if (type === 'circle' && percent) {
            nodeElement = _react2['default'].createElement(_nextProgress2['default'], { shape: 'circle', percent: percent, className: prefix + 'step-item-progress' });
        } else {
            nodeElement = _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-node-circle' },
                icon ? _react2['default'].createElement(_nextIcon2['default'], { type: icon }) : this._itemRender(index, status)
            );
        }

        return nodeElement;
    };

    StepItem.prototype.getStyle = function getStyle() {
        var _props2 = this.props,
            parentWidth = _props2.parentWidth,
            parentHeight = _props2.parentHeight,
            direction = _props2.direction,
            total = _props2.total,
            type = _props2.type;

        var width = 'auto';

        if (!_nextUtil.support.flex && Number(parentWidth) && Number(parentHeight)) {
            if (type === 'arrow') {
                width = Math.floor(parentWidth / total - parentHeight / 2 - parentHeight / 8);
            } else {
                width = direction === 'horizontal' ? Math.floor(parentWidth / total) : 'auto';
            }
        }

        return {
            width: width
        };
    };

    StepItem.prototype.onClick = function onClick() {
        var _props3 = this.props,
            index = _props3.index,
            disabled = _props3.disabled,
            readOnly = _props3.readOnly,
            animation = _props3.animation;

        if (disabled || readOnly) {
            return false;
        }

        if (animation && this.stepNode) {
            _nextDom.classList.hasClass(this.stepNode, 'clicked') ? _nextDom.classList.removeClass(this.stepNode, 'clicked') : _nextDom.classList.addClass(this.stepNode, 'clicked');
        }
        this.props.onClick(index);
    };

    StepItem.prototype.removeClickedCls = function removeClickedCls() {
        var _props4 = this.props,
            animation = _props4.animation,
            prefix = _props4.prefix;

        if (animation && this.stepNode && _nextDom.classList.hasClass(this.stepNode, 'clicked')) {
            _nextDom.classList.removeClass(this.stepNode, 'clicked');
        }
    };

    // 节点的渲染方法


    StepItem.prototype._itemRender = function _itemRender(index, status) {
        var itemRender = this.props.itemRender;

        if (itemRender) {
            return itemRender(index, status);
        }
        return status === 'finish' ? _react2['default'].createElement(_nextIcon2['default'], { type: 'select' }) : index + 1;
    };

    StepItem.prototype._nodeRefHandler = function _nodeRefHandler(ref) {
        this.stepNode = ref;
    };

    StepItem.prototype.render = function render() {
        var _classNames;

        var _props5 = this.props,
            prefix = _props5.prefix,
            className = _props5.className,
            status = _props5.status,
            title = _props5.title,
            index = _props5.index,
            total = _props5.total,
            type = _props5.type,
            content = _props5.content,
            direction = _props5.direction,
            disabled = _props5.disabled,
            onClick = _props5.onClick,
            readOnly = _props5.readOnly,
            animation = _props5.animation,
            others = _objectWithoutProperties(_props5, ['prefix', 'className', 'status', 'title', 'index', 'total', 'type', 'content', 'direction', 'disabled', 'onClick', 'readOnly', 'animation']);

        var nodeElement = this.getNode();
        var pickProps = (0, _nextUtil.pickAttrs)(others);

        var stepCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'step-item', true), _defineProperty(_classNames, prefix + 'step-item-' + status, status), _defineProperty(_classNames, prefix + 'step-item-first', index === 0), _defineProperty(_classNames, prefix + 'step-item-last', index === total - 1), _defineProperty(_classNames, prefix + 'step-item-disabled', disabled), _defineProperty(_classNames, prefix + 'step-item-read-only', readOnly), _defineProperty(_classNames, className, className), _classNames));

        var nodeCls = (0, _classnames2['default'])(_defineProperty({}, prefix + 'step-item-node', true));

        var overlayCls = status === 'finish' ? { width: '100%' } : null;

        var arrowElement = _react2['default'].createElement(
            'div',
            _extends({}, pickProps, { style: this.getStyle(), className: stepCls, onClick: this.onClick }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-title' },
                    title
                )
            )
        );
        var otherElement = _react2['default'].createElement(
            'div',
            _extends({}, pickProps, { style: this.getStyle(), className: stepCls }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-tail' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-tail-underlay' },
                    _react2['default'].createElement('div', { className: prefix + 'step-item-tail-overlay', style: overlayCls })
                )
            ),
            direction === 'vertical' ? _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-node-placeholder', onClick: this.onClick },
                    _react2['default'].createElement(
                        'div',
                        {
                            className: prefix + 'step-item-node',
                            ref: this._nodeRefHandler,
                            onTransitionEnd: this.removeClickedCls },
                        nodeElement
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-body' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'step-item-title' },
                        title
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'step-item-content' },
                        content
                    )
                )
            ) : _react2['default'].createElement(
                'div',
                { className: prefix + 'step-item-container' },
                _react2['default'].createElement(
                    'div',
                    {
                        className: prefix + 'step-item-node',
                        onClick: this.onClick,
                        ref: this._nodeRefHandler,
                        onTransitionEnd: this.removeClickedCls },
                    nodeElement
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'step-item-title' },
                    title
                )
            )
        );

        return type === 'arrow' ? arrowElement : otherElement;
    };

    return StepItem;
}(_react.Component), _class.propTypes = {
    /**
     * 组件的样式品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 步骤的状态，如不传，会根据外层的 Step 的 current 属性生成，可选值为 `wait`, `process`, `finish`
     */
    status: _propTypes2['default'].oneOf(['wait', 'process', 'finish']),
    /**
     * 标题
     */
    title: _propTypes2['default'].node,
    direction: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    type: _propTypes2['default'].oneOf(['circle', 'arrow', 'dot']),
    /**
     * 图标
     */
    icon: _propTypes2['default'].string,
    /**
     * 内容，用于垂直状态下的内容填充
     */
    content: _propTypes2['default'].node,
    /**
     * StepItem 的自定义渲染
     * @param {Number} index   节点索引
     * @param {String} status  节点状态
     * @returns {Node} 节点的渲染结果
     */
    itemRender: _propTypes2['default'].func,
    /**
     * 百分比
     */
    percent: _propTypes2['default'].number,
    index: _propTypes2['default'].number,
    total: _propTypes2['default'].number,
    animation: _propTypes2['default'].bool, // 是否开启动效，由父级传入
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    parentWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    parentHeight: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 点击步骤时的回调
     * @param {Number} index 节点索引
     */
    onClick: _propTypes2['default'].func,
    /**
     * 自定义样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    direction: 'horizontal',
    type: 'circle',
    index: 0,
    total: 1,
    onClick: function onClick() {}
}, _temp);
StepItem.displayName = 'StepItem';
exports['default'] = StepItem;
module.exports = exports['default'];

/***/ }),

/***/ 1205:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(797);
__webpack_require__(797);
module.exports = __webpack_require__(304);

/***/ }),

/***/ 1206:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(173);
__webpack_require__(1207);

/***/ }),

/***/ 1207:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1208:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(798);
__webpack_require__(798);
module.exports = __webpack_require__(745);

/***/ }),

/***/ 1209:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(799);
__webpack_require__(799);
module.exports = __webpack_require__(1214);

/***/ }),

/***/ 1210:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(811);
__webpack_require__(1211);
__webpack_require__(1213);

/***/ }),

/***/ 1211:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(715);
__webpack_require__(1212);

/***/ }),

/***/ 1212:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1213:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextSelect = __webpack_require__(812);

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextCascader = __webpack_require__(1215);

var _nextCascader2 = _interopRequireDefault(_nextCascader);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var isMacChrome = function () {
    var agent = window.navigator.userAgent.toLowerCase();
    return agent.indexOf('macintosh') > -1 && agent.indexOf('chrome') > -1;
}();

/**
 * CascaderSelect
 */
var CascaderSelect = (_temp = _class = function (_Component) {
    _inherits(CascaderSelect, _Component);

    function CascaderSelect(props, context) {
        _classCallCheck(this, CascaderSelect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            value: 'value' in props ? props.value : props.defaultValue,
            visible: props.defaultVisible
        };
        ['handleVisibleChange', 'handleChange', 'handleRemove', 'afterOpen', 'getCascader'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        return _this;
    }

    CascaderSelect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };

    CascaderSelect.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    CascaderSelect.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    CascaderSelect.prototype.updateCache = function updateCache(dataSource) {
        var _this2 = this;

        this._v2n = {};
        this._p2n = {};
        var loop = function loop(data) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
            return data.forEach(function (item, index) {
                var value = item.value,
                    children = item.children;

                var pos = prefix + '-' + index;
                _this2._v2n[value] = _this2._p2n[pos] = _extends({}, item, { pos: pos });

                if (children && children.length) {
                    loop(children, pos);
                }
            });
        };

        loop(dataSource);
    };

    CascaderSelect.prototype.flatValue = function flatValue(value) {
        var _this3 = this;

        var getDepth = function getDepth(v) {
            return _this3.getPos(v).split('-').length;
        };
        var newValue = value.slice(0).sort(function (prev, next) {
            return getDepth(prev) - getDepth(next);
        });

        for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
                if (i !== j && this.isDescendantOrSelf(this.getPos(newValue[i]), this.getPos(newValue[j]))) {
                    newValue.splice(j, 1);
                    j--;
                }
            }
        }

        return newValue;
    };

    CascaderSelect.prototype.isDescendantOrSelf = function isDescendantOrSelf(currentPos, targetPos) {
        if (!currentPos || !targetPos) {
            return false;
        }

        var currentNums = currentPos.split('-');
        var targetNums = targetPos.split('-');

        return currentNums.length <= targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    CascaderSelect.prototype.getValue = function getValue(pos) {
        return this._p2n[pos] ? this._p2n[pos].value : null;
    };

    CascaderSelect.prototype.getPos = function getPos(value) {
        return this._v2n[value] ? this._v2n[value].pos : null;
    };

    CascaderSelect.prototype.getData = function getData(value) {
        var _this4 = this;

        return value.map(function (v) {
            return _this4._v2n[v];
        });
    };

    CascaderSelect.prototype.getSignleData = function getSignleData(value) {
        var _this5 = this;

        if (!value.length) {
            return null;
        }

        var data = this._v2n[value];
        if (!data) {
            return null;
        }

        var nums = data.pos.split('-');
        var label = nums.slice(1).reduce(function (ret, num, index) {
            var p = nums.slice(0, index + 2).join('-');
            ret.push(_this5._p2n[p].label);
            return ret;
        }, []);

        return _extends({}, data, {
            label: this.props.displayRender(label, data)
        });
    };

    CascaderSelect.prototype.getMultipleData = function getMultipleData(value) {
        var _this6 = this;

        var _props = this.props,
            checkStrictly = _props.checkStrictly,
            canOnlyCheckLeaf = _props.canOnlyCheckLeaf,
            dataSource = _props.dataSource;

        var newValue = void 0;
        if (checkStrictly || canOnlyCheckLeaf) {
            newValue = value;
        } else {
            var filterValue = value.filter(function (v) {
                return typeof _this6._v2n[v] !== 'undefined';
            });
            newValue = this.flatValue(filterValue);

            var childChecked = function childChecked(child) {
                return newValue.indexOf(child.value) > -1;
            };
            var removeValue = function removeValue(child) {
                return newValue.splice(newValue.indexOf(child.value), 1);
            };
            var addParentValue = function addParentValue(i, parent) {
                return newValue.splice(i, 0, parent.value);
            };
            for (var i = 0; i < newValue.length; i++) {
                var pos = this.getPos(newValue[i]);
                var nums = pos.split('-');
                if (nums.length === 2) {
                    break;
                }
                for (var j = nums.length - 2; j > 0; j--) {
                    var parent = nums.slice(1, j + 1).reduce(function (ret, num) {
                        return ret.children[num];
                    }, { children: dataSource });
                    var parentChecked = parent.children.every(childChecked);
                    if (parentChecked) {
                        parent.children.forEach(removeValue);
                        addParentValue(i, parent);
                    } else {
                        break;
                    }
                }
            }
        }

        return this.getData(newValue);
    };

    CascaderSelect.prototype.getIndeterminate = function getIndeterminate(value) {
        var _this7 = this;

        var indeterminate = [];

        var positions = value.map(this.getPos.bind(this));
        positions.forEach(function (pos) {
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentPos = nums.slice(0, i - 1).join('-');
                var parentValue = _this7.getValue(parentPos);
                if (indeterminate.indexOf(parentValue) === -1) {
                    indeterminate.push(parentValue);
                }
            }
        });

        return indeterminate;
    };

    CascaderSelect.prototype.completeValue = function completeValue(value) {
        var newValue = [];

        var flatValue = this.flatValue(value).reverse();
        if (flatValue.length) {
            var ps = Object.keys(this._p2n);
            for (var i = 0; i < ps.length; i++) {
                for (var j = 0; j < flatValue.length; j++) {
                    var v = flatValue[j];
                    if (this.isDescendantOrSelf(this.getPos(v), ps[i])) {
                        newValue.push(this.getValue(ps[i]));
                        ps.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }

        return newValue;
    };

    CascaderSelect.prototype.isLeaf = function isLeaf(data) {
        return !(data.children && data.children.length || !!this.props.loadData && !data.isLeaf);
    };

    CascaderSelect.prototype.handleVisibleChange = function handleVisibleChange(visible) {
        this.setState({
            visible: visible
        });
    };

    CascaderSelect.prototype.handleChange = function handleChange(value, data, extra) {
        var _props2 = this.props,
            multiple = _props2.multiple,
            changeOnSelect = _props2.changeOnSelect,
            onChange = _props2.onChange;


        var st = {};
        if (!multiple && (!changeOnSelect || this.isLeaf(data))) {
            st.visible = !this.state.visible;
        }
        if (!('value' in this.props)) {
            st.value = value;
        }
        if (Object.keys(st).length) {
            this.setState(st);
        }

        if (onChange) {
            onChange(value, data, extra);
        }
    };

    CascaderSelect.prototype.handleRemove = function handleRemove(value) {
        value = this.normalizeValue(value);

        if ('onChange' in this.props) {
            var _props3 = this.props,
                multiple = _props3.multiple,
                checkStrictly = _props3.checkStrictly,
                onChange = _props3.onChange;

            if (multiple) {
                var currentValue = void 0;
                for (var i = 0; i < this.state.value.length; i++) {
                    if (value.indexOf(this.state.value[i]) === -1) {
                        currentValue = this.state.value[i];
                        break;
                    }
                }
                var currentData = this._v2n[currentValue];
                var data = this.getData(value);
                var checked = false;

                if (checkStrictly) {
                    this.props.onChange(value, data, {
                        checked: checked,
                        currentData: currentData,
                        checkedData: data
                    });
                } else {
                    var checkedValue = this.completeValue(value);
                    var checkedData = this.getData(checkedValue);
                    var indeterminateValue = this.getIndeterminate(value);
                    var indeterminateData = this.getData(indeterminateValue);
                    this.props.onChange(value, data, {
                        checked: checked,
                        currentData: currentData,
                        checkedData: checkedData,
                        indeterminateData: indeterminateData
                    });
                }
            } else {
                onChange(null, null);
            }
        }

        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }
    };

    CascaderSelect.prototype.afterOpen = function afterOpen() {
        // mac + chrome + 高分辨率屏幕（mac pro）+ 出现滚动条 + 有动画播放
        // 下拉弹层在第一次展开时，会发生展示错位现象
        // http://gitlab.alibaba-inc.com/next/cascader-select/issues/17
        // 所以 .next-cascader-menu 默认设置 overflow: hidden;
        // 打开弹层后，删除该样式
        if (isMacChrome && this.cascader) {
            var cascaderNode = (0, _reactDom.findDOMNode)(this.cascader);
            _nextDom.classList.removeClass(cascaderNode, 'menu-overflow-hidden');
        }

        this.props.afterOpen();
    };

    CascaderSelect.prototype.getCascader = function getCascader(ref) {
        this.cascader = ref;
    };

    CascaderSelect.prototype.renderOverlay = function renderOverlay() {
        var prefix = this.getPrefix();
        var cascaderSelectPrefix = prefix + 'cascader-select-';
        var _props4 = this.props,
            dataSource = _props4.dataSource,
            multiple = _props4.multiple,
            defaultExpandedValue = _props4.defaultExpandedValue,
            expandTrigger = _props4.expandTrigger,
            checkStrictly = _props4.checkStrictly,
            labelWidth = _props4.labelWidth,
            showItemCount = _props4.showItemCount,
            changeOnSelect = _props4.changeOnSelect,
            canOnlyCheckLeaf = _props4.canOnlyCheckLeaf,
            loadData = _props4.loadData;
        var value = this.state.value;


        return _react2['default'].createElement(
            'div',
            { className: cascaderSelectPrefix + 'dropdown' },
            _react2['default'].createElement(_nextCascader2['default'], { ref: this.getCascader,
                value: value,
                className: isMacChrome ? 'menu-overflow-hidden' : null,
                dataSource: dataSource,
                onChange: this.handleChange,
                multiple: multiple,
                canOnlySelectLeaf: !changeOnSelect,
                canOnlyCheckLeaf: canOnlyCheckLeaf,
                defaultExpandedValue: defaultExpandedValue,
                expandTrigger: expandTrigger,
                checkStrictly: checkStrictly,
                labelWidth: labelWidth,
                showItemCount: showItemCount,
                loadData: loadData,
                setCascaderInnerWidth: false })
        );
    };

    CascaderSelect.prototype.render = function render() {
        var prefix = this.getPrefix();
        var _props5 = this.props,
            size = _props5.size,
            shape = _props5.shape,
            placeholder = _props5.placeholder,
            dataSource = _props5.dataSource,
            disabled = _props5.disabled,
            hasArrow = _props5.hasArrow,
            hasClear = _props5.hasClear,
            popupClassName = _props5.popupClassName,
            multiple = _props5.multiple,
            className = _props5.className,
            style = _props5.style,
            container = _props5.container;
        var _state = this.state,
            value = _state.value,
            visible = _state.visible;

        var others = (0, _nextUtil.pickOthers)(CascaderSelect, this.props);
        var overlay = this.renderOverlay();

        this.updateCache(dataSource);
        var normalizedValue = this.normalizeValue(value);

        return _react2['default'].createElement(_nextSelect2['default'], _extends({ prefix: prefix,
            className: className,
            style: style,
            size: size,
            shape: shape,
            placeholder: placeholder,
            disabled: disabled,
            hasArrow: hasArrow,
            hasClear: hasClear,
            popupClassName: popupClassName,
            multiple: multiple,
            value: multiple ? this.getMultipleData(normalizedValue) : this.getSignleData(normalizedValue),
            onChange: this.handleRemove,
            visible: visible,
            onVisibleChange: this.handleVisibleChange,
            overlay: overlay,
            container: container,
            afterOpen: this.afterOpen
        }, others));
    };

    return CascaderSelect;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 选择框大小
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 选择框形状
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
    /**
     * 选择框占位符
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头
     */
    hasArrow: _propTypes2['default'].bool,
    /**
     * 是否显示清空按钮，该按钮可以清空当前选中的值，该属性仅在单选模式下有效
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 数据源，结构可参考下方说明
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （非受控）默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * （受控）当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * 选中值改变时触发的回调函数
     * @param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组
     * @param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
     * @param {Object} extra 额外参数
     * @param {Array} extra.selectedPath 单选时选中的数据的路径
     * @param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中
     * @param {Object} extra.currentData 多选时当前操作的数据
     * @param {Array} extra.checkedData 多选时所有被选中的数据
     * @param {Array} extra.indeterminateData 多选时半选的数据
     */
    onChange: _propTypes2['default'].func,
    /**
     * 初始下拉框是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置
     */
    defaultExpandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 展开触发的方式
     */
    expandTrigger: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 是否多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 是否选中即发生改变, 该属性仅在单选模式下有效
     */
    changeOnSelect: _propTypes2['default'].bool,
    /**
     * 是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效
     */
    canOnlyCheckLeaf: _propTypes2['default'].bool,
    /**
     * 父子节点是否选中不关联
     */
    checkStrictly: _propTypes2['default'].bool,
    /**
     * 文字区域宽度，当文字超过宽度时，结尾会以省略号显示，默认值为文字实际宽度
     */
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 每一列展示的个数
     */
    showItemCount: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 选择框单选时展示结果的函数
     * @param {Array} label 选中路径的文本数组
     * @return {ReactNode} 渲染在选择框中的内容
     */
    displayRender: _propTypes2['default'].func,
    /**
     * 下拉框样式自定义类名
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 下拉框挂载的容器节点
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 异步加载数据函数
     * @param {Object} data 当前点击异步加载的数据
     */
    loadData: _propTypes2['default'].func,
    afterOpen: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    shape: 'normal',
    disabled: false,
    hasArrow: true,
    hasClear: false,
    dataSource: [],
    defaultValue: null,
    defaultVisible: false,
    expandTrigger: 'click',
    multiple: false,
    changeOnSelect: false,
    canOnlyCheckLeaf: false,
    checkStrictly: false,
    showItemCount: 6,
    displayRender: function displayRender(label) {
        return label.join(' / ');
    },
    afterOpen: function afterOpen() {}
}, _temp);
CascaderSelect.displayName = 'CascaderSelect';
exports['default'] = CascaderSelect;
module.exports = exports['default'];

/***/ }),

/***/ 1215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = __webpack_require__(39);

var _nextDom = __webpack_require__(120);

var _menu = __webpack_require__(1216);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Cascader
 */
var Cascader = (_temp = _class = function (_Component) {
    _inherits(Cascader, _Component);

    function Cascader(props, context) {
        _classCallCheck(this, Cascader);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var defaultValue = props.defaultValue,
            value = props.value,
            defaultExpandedValue = props.defaultExpandedValue,
            expandedValue = props.expandedValue,
            dataSource = props.dataSource,
            multiple = props.multiple,
            checkStrictly = props.checkStrictly,
            canOnlyCheckLeaf = props.canOnlyCheckLeaf,
            loadData = props.loadData;


        _this.updateCache(dataSource);

        var normalizedValue = _this.normalizeValue(typeof value === 'undefined' ? defaultValue : value);
        if (!loadData) {
            normalizedValue = normalizedValue.filter(function (v) {
                return _this._v2n[v];
            });
        }
        var realExpandedValue = typeof expandedValue === 'undefined' ? typeof defaultExpandedValue === 'undefined' ? _this.getExpandedValue(normalizedValue[0]) : _this.normalizeValue(defaultExpandedValue) : _this.normalizeValue(expandedValue);
        var st = {
            value: normalizedValue,
            expandedValue: realExpandedValue
        };
        if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
            st.value = _this.completeValue(props.dataSource, st.value);
        }

        _this.state = st;

        _this.lastExpandedValue = [].concat(_toConsumableArray(_this.state.expandedValue));

        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.getCascaderNode = _this.getCascaderNode.bind(_this);
        return _this;
    }

    Cascader.prototype.componentDidMount = function componentDidMount() {
        this.setCascaderInnerWidth();
    };

    Cascader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        this.updateCache(nextProps.dataSource);

        var state = {};
        if ('value' in nextProps) {
            state.value = this.normalizeValue(nextProps.value);
            if (!nextProps.loadData) {
                state.value = state.value.filter(function (v) {
                    return _this2._v2n[v];
                });
            }

            var multiple = nextProps.multiple,
                checkStrictly = nextProps.checkStrictly,
                canOnlyCheckLeaf = nextProps.canOnlyCheckLeaf;

            if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
                state.value = this.completeValue(nextProps.dataSource, state.value);
            }
            if (!this.state.expandedValue.length && !('expandedValue' in nextProps)) {
                state.expandedValue = this.getExpandedValue(state.value[0]);
            }
        }
        if ('expandedValue' in nextProps) {
            state.expandedValue = this.normalizeValue(nextProps.expandedValue);
        }
        if (Object.keys(state).length) {
            this.setState(state);
        }
    };

    Cascader.prototype.componentDidUpdate = function componentDidUpdate() {
        this.setCascaderInnerWidth();
    };

    Cascader.prototype.getCascaderNode = function getCascaderNode(ref) {
        this.cascader = ref;
        if (this.cascader) {
            this.cascaderInner = this.cascader.querySelector('.' + this.props.prefix + 'cascader-inner');
        }
    };

    Cascader.prototype.setCascaderInnerWidth = function setCascaderInnerWidth() {
        if (!this.props.setCascaderInnerWidth) {
            return;
        }

        var menuWrappers = [].concat(_toConsumableArray(this.cascaderInner.querySelectorAll('.' + this.props.prefix + 'cascader-menu-wrapper')));
        if (menuWrappers.length === 0) {
            return;
        }

        _nextDom.style.set(this.cascaderInner, 'width', null);
        var cascaderClientWidth = this.cascader.clientWidth;
        var cascaderInnerWidth = _nextDom.style.get(this.cascaderInner, 'width');
        var allMenusWidth = Math.ceil(menuWrappers.reduce(function (ret, menuWrapper) {
            return ret + _nextDom.style.get(menuWrapper, 'width');
        }, 0));
        var hasRightBorderClass = 'has-right-border';
        var hasRightBorder = _nextDom.classList.hasClass(this.cascaderInner, hasRightBorderClass);
        if (cascaderClientWidth > allMenusWidth) {
            var borderWidth = _nextDom.style.get(this.cascader, 'borderRightWidth');
            if (cascaderInnerWidth !== allMenusWidth + borderWidth) {
                _nextDom.style.set(this.cascaderInner, 'width', allMenusWidth + borderWidth);
            }
            if (!hasRightBorder) {
                _nextDom.classList.addClass(this.cascaderInner, hasRightBorderClass);
            }
        } else {
            if (cascaderInnerWidth !== allMenusWidth) {
                _nextDom.style.set(this.cascaderInner, 'width', allMenusWidth);
            }
            if (hasRightBorder) {
                _nextDom.classList.removeClass(this.cascaderInner, hasRightBorderClass);
            }
        }
    };

    Cascader.prototype.updateCache = function updateCache(dataSource) {
        var _this3 = this;

        this._v2n = {};
        this._p2n = {};
        var loop = function loop(data) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
            return data.forEach(function (item, index) {
                var value = item.value,
                    children = item.children;

                var pos = prefix + '-' + index;
                _this3._v2n[value] = _this3._p2n[pos] = _extends({}, item, { pos: pos });

                if (children && children.length) {
                    loop(children, pos);
                }
            });
        };

        loop(dataSource);
    };

    Cascader.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    Cascader.prototype.getExpandedValue = function getExpandedValue(v) {
        var _this4 = this;

        if (!v || !this._v2n[v]) {
            return [];
        }

        var pos = this._v2n[v].pos;
        if (pos.split('-').length === 2) {
            return [];
        }

        var expandedMap = {};
        Object.keys(this._p2n).forEach(function (p) {
            if (_this4.isDescendantOrSelf(p, pos) && p !== pos) {
                expandedMap[_this4._p2n[p].value] = p;
            }
        });

        return Object.keys(expandedMap).sort(function (prev, next) {
            return expandedMap[prev].split('-').length - expandedMap[next].split('-').length;
        });
    };

    Cascader.prototype.completeValue = function completeValue(dataSource, value) {
        var _this5 = this;

        var filterValue = value.filter(function (v) {
            return typeof _this5._v2n[v] !== 'undefined';
        });
        var flatValue = this.flatValue(filterValue);

        var childChecked = function childChecked(child) {
            return flatValue.indexOf(child.value) > -1;
        };
        var removeValue = function removeValue(child) {
            return flatValue.splice(flatValue.indexOf(child.value), 1);
        };
        var addParentValue = function addParentValue(i, parent) {
            return flatValue.splice(i, 0, parent.value);
        };
        for (var i = 0; i < flatValue.length; i++) {
            var pos = this.getPos(flatValue[i]);
            var nums = pos.split('-');
            if (nums.length === 2) {
                break;
            }
            for (var j = nums.length - 2; j > 0; j--) {
                var parent = nums.slice(1, j + 1).reduce(function (ret, num) {
                    return ret.children[num];
                }, { children: dataSource });
                var parentChecked = parent.children.every(childChecked);
                if (parentChecked) {
                    parent.children.forEach(removeValue);
                    addParentValue(i, parent);
                } else {
                    break;
                }
            }
        }

        var newValue = [];
        flatValue = flatValue.reverse();
        var ps = Object.keys(this._p2n);
        if (flatValue.length) {
            for (var _i = 0; _i < ps.length; _i++) {
                for (var _j = 0; _j < flatValue.length; _j++) {
                    var v = flatValue[_j];
                    if (this.isDescendantOrSelf(this.getPos(v), ps[_i])) {
                        newValue.push(this.getValue(ps[_i]));
                        ps.splice(_i, 1);
                        _i--;
                        break;
                    }
                }
            }
        }

        return newValue;
    };

    Cascader.prototype.flatValue = function flatValue(value) {
        var _this6 = this;

        var getDepth = function getDepth(v) {
            return _this6.getPos(v).split('-').length;
        };
        var newValue = value.slice(0).sort(function (prev, next) {
            return getDepth(prev) - getDepth(next);
        });

        for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
                if (i !== j && this.isDescendantOrSelf(this.getPos(newValue[i]), this.getPos(newValue[j]))) {
                    newValue.splice(j, 1);
                    j--;
                }
            }
        }

        return newValue;
    };

    Cascader.prototype.getValue = function getValue(pos) {
        return this._p2n[pos] ? this._p2n[pos].value : null;
    };

    Cascader.prototype.getPos = function getPos(value) {
        return this._v2n[value] ? this._v2n[value].pos : null;
    };

    Cascader.prototype.getData = function getData(value) {
        var _this7 = this;

        return value.map(function (v) {
            return _this7._v2n[v];
        });
    };

    Cascader.prototype.isDescendantOrSelf = function isDescendantOrSelf(currentPos, targetPos) {
        if (!currentPos || !targetPos) {
            return false;
        }

        var currentNums = currentPos.split('-');
        var targetNums = targetPos.split('-');

        return currentNums.length <= targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    Cascader.prototype.isSiblingOrSelf = function isSiblingOrSelf(currentPos, targetPos) {
        var currentNums = currentPos.split('-').slice(0, -1);
        var targetNums = targetPos.split('-').slice(0, -1);

        return currentNums.length === targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    Cascader.prototype.processValue = function processValue(value, v, checked) {
        var index = value.indexOf(v);
        if (checked && index === -1) {
            value.push(v);
        } else if (!checked && index > -1) {
            value.splice(index, 1);
        }
    };

    Cascader.prototype.handleSelect = function handleSelect(v, level, canExpand) {
        var _this8 = this;

        if (!(this.props.canOnlySelectLeaf && canExpand) && this.state.value[0] !== v) {
            if (!('value' in this.props)) {
                this.setState({
                    value: [v]
                });
            }

            if ('onChange' in this.props) {
                var data = this._v2n[v];
                var nums = data.pos.split('-');
                var selectedPath = nums.slice(1).reduce(function (ret, num, index) {
                    var p = nums.slice(0, index + 2).join('-');
                    ret.push(_this8._p2n[p]);
                    return ret;
                }, []);

                this.props.onChange(v, data, {
                    selectedPath: selectedPath
                });
            }
        }

        if (this.props.expandTrigger === 'click') {
            return this.handleExpand(v, level, canExpand);
        }

        if (canExpand) {
            if (!this.props.canOnlySelectLeaf) {
                this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue.slice(0, -1)));
            }
        } else {
            this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue));
        }
    };

    Cascader.prototype.handleCheck = function handleCheck(v, checked) {
        var _this9 = this;

        this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue));

        var _props = this.props,
            checkStrictly = _props.checkStrictly,
            canOnlyCheckLeaf = _props.canOnlyCheckLeaf;
        var value = this.state.value;


        if (checkStrictly || canOnlyCheckLeaf) {
            this.processValue(value, v, checked);
        } else {
            var pos = this.getPos(v);

            var ps = Object.keys(this._p2n);
            ps.forEach(function (p) {
                if (_this9.isDescendantOrSelf(pos, p)) {
                    _this9.processValue(value, _this9.getValue(p), checked);
                }
            });

            var currentPos = pos;
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentChecked = true;
                for (var j = 0; j < ps.length; j++) {
                    var p = ps[j];
                    if (this.isSiblingOrSelf(currentPos, p)) {
                        var _v = this.getValue(p);
                        if (value.indexOf(_v) === -1) {
                            parentChecked = false;
                            break;
                        }
                    }
                }
                var parentPos = nums.slice(0, i - 1).join('-');
                this.processValue(value, this.getValue(parentPos), parentChecked);

                currentPos = parentPos;
            }
        }

        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }

        if ('onChange' in this.props) {
            if (checkStrictly || canOnlyCheckLeaf) {
                var data = this.getData(value);
                this.props.onChange(value, data, {
                    checked: checked,
                    currentData: this._v2n[v],
                    checkedData: data
                });
            } else {
                var flatValue = this.flatValue(value);
                var flatData = this.getData(flatValue);
                var checkedData = this.getData(value);
                var indeterminateValue = this.getIndeterminate(value);
                var indeterminateData = this.getData(indeterminateValue);
                this.props.onChange(flatValue, flatData, {
                    checked: checked,
                    currentData: this._v2n[v],
                    checkedData: checkedData,
                    indeterminateData: indeterminateData
                });
            }
        }
    };

    Cascader.prototype.handleExpand = function handleExpand(value, level, canExpand) {
        var _this10 = this;

        var loadData = this.props.loadData;
        var expandedValue = this.state.expandedValue;


        if (canExpand || expandedValue.length > level) {
            if (canExpand) {
                expandedValue.splice(level, expandedValue.length - level, value);
            } else {
                expandedValue.splice(level);
            }

            if (canExpand && loadData) {
                return loadData(this._v2n[value]).then(function () {
                    _this10.setExpandValue(expandedValue);
                });
            } else {
                this.setExpandValue(expandedValue);
            }
        }
    };

    Cascader.prototype.handleMouseLeave = function handleMouseLeave() {
        this.setExpandValue([].concat(_toConsumableArray(this.lastExpandedValue)));
    };

    Cascader.prototype.setExpandValue = function setExpandValue(expandedValue) {
        if (!('expandedValue' in this.props)) {
            this.setState({
                expandedValue: expandedValue
            });
        }

        if ('onExpand' in this.props) {
            this.props.onExpand(expandedValue);
        }
    };

    Cascader.prototype.getIndeterminate = function getIndeterminate(value) {
        var _this11 = this;

        var indeterminate = [];

        var positions = this.flatValue(value).map(this.getPos.bind(this));
        positions.forEach(function (pos) {
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentPos = nums.slice(0, i - 1).join('-');
                var parentValue = _this11.getValue(parentPos);
                if (indeterminate.indexOf(parentValue) === -1) {
                    indeterminate.push(parentValue);
                }
            }
        });

        return indeterminate;
    };

    Cascader.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Cascader.prototype.renderMenu = function renderMenu(data, level) {
        var _this12 = this;

        var _props2 = this.props,
            multiple = _props2.multiple,
            checkStrictly = _props2.checkStrictly,
            expandTrigger = _props2.expandTrigger,
            labelWidth = _props2.labelWidth,
            showItemCount = _props2.showItemCount,
            loadData = _props2.loadData,
            canOnlyCheckLeaf = _props2.canOnlyCheckLeaf;
        var _state = this.state,
            value = _state.value,
            expandedValue = _state.expandedValue;

        var prefix = this.getPrefix();
        var MenuItem = multiple ? _menu2['default'].CheckboxItem : _menu2['default'].Item;

        return _react2['default'].createElement(
            _menu2['default'],
            { prefix: prefix, showItemCount: showItemCount, key: level },
            data.map(function (item) {
                var _cx;

                var disabled = !!item.disabled;
                var canExpand = item.children && item.children.length || !!loadData && !item.isLeaf;
                var expanded = expandedValue[level] === item.value;
                var props = { prefix: prefix, disabled: disabled, canExpand: canExpand, expanded: expanded };
                if (multiple) {
                    props.checkable = !(canOnlyCheckLeaf && canExpand);
                    props.checked = value.indexOf(item.value) > -1;
                    props.checkboxDisabled = !!item.checkboxDisabled;
                    props.className = props.checked ? 'js-selected' : null;
                    props.indeterminate = checkStrictly || canOnlyCheckLeaf ? false : _this12.indeterminate.indexOf(item.value) > -1;
                    if (!disabled) {
                        props.onCheck = _this12.handleCheck.bind(_this12, item.value);
                        var callbackName = expandTrigger === 'click' ? 'onClick' : 'onMouseEnter';
                        props[callbackName] = _this12.handleExpand.bind(_this12, item.value, level, canExpand);
                    }
                } else {
                    props.selected = value[0] === item.value;
                    props.className = props.selected ? 'js-selected' : null;
                    if (!disabled) {
                        props.onClick = _this12.handleSelect.bind(_this12, item.value, level, canExpand);
                        if (expandTrigger !== 'click') {
                            props.onMouseEnter = _this12.handleExpand.bind(_this12, item.value, level, canExpand);
                        }
                    }
                }

                var setLabelWidth = typeof labelWidth !== 'undefined';
                var spanProps = {
                    className: (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'cascader-menu-item-label', true), _defineProperty(_cx, 'ellipsis', setLabelWidth), _cx)),
                    title: item.label
                };
                if (setLabelWidth) {
                    spanProps.style = { width: Number(labelWidth) + 'px' };
                }

                return _react2['default'].createElement(
                    MenuItem,
                    _extends({ key: item.value }, props),
                    _react2['default'].createElement(
                        'span',
                        spanProps,
                        item.label
                    )
                );
            })
        );
    };

    Cascader.prototype.renderMenus = function renderMenus() {
        var _props3 = this.props,
            dataSource = _props3.dataSource,
            multiple = _props3.multiple,
            checkStrictly = _props3.checkStrictly,
            canOnlyCheckLeaf = _props3.canOnlyCheckLeaf;
        var _state2 = this.state,
            value = _state2.value,
            expandedValue = _state2.expandedValue;

        if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
            this.indeterminate = this.getIndeterminate(value);
        }

        var menus = [];
        var data = dataSource;

        for (var i = 0; i <= expandedValue.length; i++) {
            if (!data) {
                break;
            }

            menus.push(this.renderMenu(data, i));

            var expandedItem = void 0;
            for (var j = 0; j < data.length; j++) {
                if (data[j].value === expandedValue[i]) {
                    expandedItem = data[j];
                    break;
                }
            }
            data = expandedItem ? expandedItem.children : null;
        }

        return menus;
    };

    Cascader.prototype.render = function render() {
        var _cx2;

        var _props4 = this.props,
            className = _props4.className,
            expandTrigger = _props4.expandTrigger,
            multiple = _props4.multiple,
            dataSource = _props4.dataSource,
            style = _props4.style;

        var others = (0, _nextUtil.pickOthers)(Cascader, this.props);
        var prefix = this.getPrefix();

        var props = _extends({
            className: (0, _classnames2['default'])((_cx2 = {}, _defineProperty(_cx2, prefix + 'cascader', true), _defineProperty(_cx2, 'multiple', multiple), _defineProperty(_cx2, className, !!className), _cx2)),
            style: style,
            ref: 'cascader'
        }, others);
        if (expandTrigger === 'hover') {
            props.onMouseLeave = this.handleMouseLeave;
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, props, { ref: this.getCascaderNode }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'cascader-inner' },
                dataSource && dataSource.length ? this.renderMenus() : null
            )
        );
    };

    return Cascader;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 数据源，结构可参考下方说明
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （非受控）默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * （受控）当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * 选中值改变时触发的回调函数
     * @param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组
     * @param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
     * @param {Object} extra 额外参数
     * @param {Array} extra.selectedPath 单选时选中的数据的路径
     * @param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中
     * @param {Object} extra.currentData 多选时当前操作的数据
     * @param {Array} extra.checkedData 多选时所有被选中的数据
     * @param {Array} extra.indeterminateData 多选时半选的数据
     */
    onChange: _propTypes2['default'].func,
    /**
     * （非受控）默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置
     */
    defaultExpandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * （受控）当前展开值
     */
    expandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 展开触发的方式
     */
    expandTrigger: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 展开时触发的回调函数
     * @param {Array} expandedValue 各列展开值的数组
     */
    onExpand: _propTypes2['default'].func,
    /**
     * 是否多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 单选时是否只能选中叶子节点
     */
    canOnlySelectLeaf: _propTypes2['default'].bool,
    /**
     * 多选时是否只能选中叶子节点
     */
    canOnlyCheckLeaf: _propTypes2['default'].bool,
    /**
     * 父子节点是否选中不关联
     */
    checkStrictly: _propTypes2['default'].bool,
    /**
     * 文字区域宽度，当文字超过宽度时，结尾会以省略号显示，默认值为文字实际宽度
     */
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 每一列展示的个数
     */
    showItemCount: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 异步加载数据函数
     * @param {Object} data 当前点击异步加载的数据
     */
    loadData: _propTypes2['default'].func,
    setCascaderInnerWidth: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    dataSource: [],
    defaultValue: null,
    canOnlySelectLeaf: false,
    canOnlyCheckLeaf: false,
    expandTrigger: 'click',
    multiple: false,
    checkStrictly: false,
    showItemCount: 6,
    setCascaderInnerWidth: true
}, _temp);
Cascader.displayName = 'Cascader';
exports['default'] = Cascader;
module.exports = exports['default'];

/***/ }),

/***/ 1216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextCheckbox = __webpack_require__(716);

var _nextCheckbox2 = _interopRequireDefault(_nextCheckbox);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

var scrollbarWidth = void 0;

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Menu.prototype.componentDidMount = function componentDidMount() {
        this.computeMenuHeight();
        this.computeMenuWidth();

        var itemSelector = '.' + this.props.prefix + 'cascader-menu-item';
        var menu = this.refs.menu;
        var targetItem = menu.querySelector(itemSelector + '.expanded') || menu.querySelector(itemSelector + '.js-selected');
        if (targetItem) {
            menu.scrollTop = targetItem.offsetTop - Math.floor((menu.clientHeight / targetItem.clientHeight - 1) / 2) * targetItem.clientHeight;
        }
    };

    Menu.prototype.componentDidUpdate = function componentDidUpdate() {
        this.computeMenuHeight();
        this.computeMenuWidth();
    };

    Menu.prototype.computeMenuHeight = function computeMenuHeight() {
        var menu = this.refs.menu;
        var item = menu.querySelector('.' + this.props.prefix + 'cascader-menu-item');
        if (!item || !parseInt(item.clientHeight, 10)) {
            return;
        }

        menu.style.height = this.props.showItemCount * item.clientHeight + 'px';
    };

    Menu.prototype.computeMenuWidth = function computeMenuWidth() {
        var menu = this.refs.menu;
        if (typeof this.props.labelWidth === 'undefined') {
            if (scrollbarWidth === undefined) {
                scrollbarWidth = (0, _nextUtil.scrollbar)().width;
            }
            if (scrollbarWidth > 0) {
                menu.style.width = 'auto';
                if (menu.scrollHeight > menu.clientHeight) {
                    menu.style.width = menu.offsetWidth + scrollbarWidth + 'px';
                }
            }
        }
    };

    Menu.prototype.render = function render() {
        var _props = this.props,
            prefix = _props.prefix,
            children = _props.children;


        return _react2['default'].createElement(
            'div',
            { className: prefix + 'cascader-menu-wrapper' },
            _react2['default'].createElement(
                'ul',
                { className: prefix + 'cascader-menu', ref: 'menu' },
                children
            )
        );
    };

    return Menu;
}(_react.Component);

Menu.displayName = 'Menu';

var Item = function (_Component2) {
    _inherits(Item, _Component2);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this2 = _possibleConstructorReturn(this, _Component2.call(this, props));

        _this2.state = {
            loading: false
        };

        _this2.handleClick = _this2.handleClick.bind(_this2);
        _this2.handleMouseEnter = _this2.handleMouseEnter.bind(_this2);
        _this2.removeLoading = _this2.removeLoading.bind(_this2);
        return _this2;
    }

    Item.prototype.addLoading = function addLoading() {
        this.setState({
            loading: true
        });
    };

    Item.prototype.removeLoading = function removeLoading() {
        this.setState({
            loading: false
        });
    };

    Item.prototype.setLoadingIfNeed = function setLoadingIfNeed(p) {
        if (p && typeof p.then === 'function') {
            this.addLoading();
            p.then(this.removeLoading)['catch'](this.removeLoading);
        }
    };

    Item.prototype.handleClick = function handleClick(e) {
        if ('onClick' in this.props) {
            this.setLoadingIfNeed(this.props.onClick(e));
        }
    };

    Item.prototype.handleMouseEnter = function handleMouseEnter(e) {
        if ('onMouseEnter' in this.props) {
            this.setLoadingIfNeed(this.props.onMouseEnter(e));
        }
    };

    Item.prototype.render = function render() {
        var _cx;

        var _props2 = this.props,
            prefix = _props2.prefix,
            className = _props2.className,
            disabled = _props2.disabled,
            selected = _props2.selected,
            expanded = _props2.expanded,
            canExpand = _props2.canExpand,
            children = _props2.children;
        var loading = this.state.loading;


        var classNames = (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'cascader-menu-item', true), _defineProperty(_cx, 'expanded', expanded), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, className, !!className), _cx));

        return _react2['default'].createElement(
            'li',
            { className: classNames, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter },
            selected ? _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-selected', type: 'select' }) : null,
            children,
            canExpand ? loading ? _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-loading', type: 'loading' }) : _react2['default'].createElement(_nextIcon2['default'], { className: prefix + 'cascader-menu-icon-expand', type: 'arrow-right' }) : null
        );
    };

    return Item;
}(_react.Component);

Item.displayName = 'Item';

var CheckboxItem = function (_Component3) {
    _inherits(CheckboxItem, _Component3);

    function CheckboxItem() {
        _classCallCheck(this, CheckboxItem);

        return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
    }

    CheckboxItem.prototype.stopPropagation = function stopPropagation(e) {
        e.stopPropagation();
    };

    CheckboxItem.prototype.render = function render() {
        var _props3 = this.props,
            prefix = _props3.prefix,
            disabled = _props3.disabled,
            checkable = _props3.checkable,
            checkboxDisabled = _props3.checkboxDisabled,
            checked = _props3.checked,
            indeterminate = _props3.indeterminate,
            onCheck = _props3.onCheck,
            children = _props3.children,
            others = _objectWithoutProperties(_props3, ['prefix', 'disabled', 'checkable', 'checkboxDisabled', 'checked', 'indeterminate', 'onCheck', 'children']);

        return _react2['default'].createElement(
            Item,
            _extends({ prefix: prefix, disabled: disabled }, others),
            checkable ? _react2['default'].createElement(_nextCheckbox2['default'], { className: prefix + 'cascader-menu-checkbox', disabled: disabled || checkboxDisabled, checked: checked, indeterminate: indeterminate, onChange: onCheck, onClick: this.stopPropagation }) : null,
            children
        );
    };

    return CheckboxItem;
}(_react.Component);

CheckboxItem.displayName = 'CheckboxItem';


Menu.Item = Item;
Menu.CheckboxItem = CheckboxItem;

exports['default'] = Menu;
module.exports = exports['default'];

/***/ }),

/***/ 1217:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: ./renderer/node_modules/react-sortable-hoc/dist/commonjs/index.js
var commonjs = __webpack_require__(756);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: ./renderer/node_modules/classnames/index.js
var classnames = __webpack_require__(8);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/feedback/index.js
var feedback = __webpack_require__(26);
var feedback_default = /*#__PURE__*/__webpack_require__.n(feedback);

// EXTERNAL MODULE: ./node_modules/filesize/lib/filesize.js
var filesize = __webpack_require__(1187);
var filesize_default = /*#__PURE__*/__webpack_require__.n(filesize);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(11);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: ./renderer/node_modules/junk/index.js
var junk = __webpack_require__(182);
var junk_default = /*#__PURE__*/__webpack_require__.n(junk);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(3);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: ./node_modules/path-exists/index.js
var path_exists = __webpack_require__(35);
var path_exists_default = /*#__PURE__*/__webpack_require__.n(path_exists);

// EXTERNAL MODULE: ./renderer/node_modules/fecha/fecha.js
var fecha = __webpack_require__(254);
var fecha_default = /*#__PURE__*/__webpack_require__.n(fecha);

// EXTERNAL MODULE: ./renderer/src/components/DashboardCard/index.scss
var components_DashboardCard = __webpack_require__(1188);

// CONCATENATED MODULE: ./renderer/src/components/DashboardCard/index.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var DashboardCard_DashboardCard =
/*#__PURE__*/
function (_Component) {
  _inherits(DashboardCard, _Component);

  function DashboardCard() {
    _classCallCheck(this, DashboardCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(DashboardCard).apply(this, arguments));
  }

  _createClass(DashboardCard, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", _extends({
        className: "dashboard-card-wrapper"
      }, this.props), external_window_React_default.a.createElement("div", {
        className: "dashboard-card"
      }, this.props.children));
    }
  }]);

  return DashboardCard;
}(external_window_React_["Component"]);

var DashboardCard_Header =
/*#__PURE__*/
function (_Component2) {
  _inherits(Header, _Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", _extends({
        className: "dashboard-card-header"
      }, this.props), this.props.children);
    }
  }]);

  return Header;
}(external_window_React_["Component"]);

var DashboardCard_Body =
/*#__PURE__*/
function (_Component3) {
  _inherits(Body, _Component3);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).apply(this, arguments));
  }

  _createClass(Body, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", _extends({
        className: "dashboard-card-body"
      }, this.props), external_window_React_default.a.createElement("div", {
        className: "dashboard-card-body-innner"
      }, this.props.children));
    }
  }]);

  return Body;
}(external_window_React_["Component"]);

DashboardCard_DashboardCard.Header = DashboardCard_Header;
DashboardCard_DashboardCard.Body = DashboardCard_Body;
/* harmony default export */ var src_components_DashboardCard = (DashboardCard_DashboardCard);
// EXTERNAL MODULE: ./renderer/src/components/EmptyTips/index.jsx
var EmptyTips = __webpack_require__(663);

// EXTERNAL MODULE: ./renderer/src/components/ExtraButton/index.jsx
var ExtraButton = __webpack_require__(665);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// EXTERNAL MODULE: ./renderer/src/services.js
var services = __webpack_require__(6);

// EXTERNAL MODULE: ./renderer/src/lib/project-scripts.js
var project_scripts = __webpack_require__(673);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/PluginHoc.jsx
function PluginHoc_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { PluginHoc_typeof = function _typeof(obj) { return typeof obj; }; } else { PluginHoc_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return PluginHoc_typeof(obj); }

function PluginHoc_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PluginHoc_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PluginHoc_createClass(Constructor, protoProps, staticProps) { if (protoProps) PluginHoc_defineProperties(Constructor.prototype, protoProps); if (staticProps) PluginHoc_defineProperties(Constructor, staticProps); return Constructor; }

function PluginHoc_possibleConstructorReturn(self, call) { if (call && (PluginHoc_typeof(call) === "object" || typeof call === "function")) { return call; } return PluginHoc_assertThisInitialized(self); }

function PluginHoc_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PluginHoc_getPrototypeOf(o) { PluginHoc_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PluginHoc_getPrototypeOf(o); }

function PluginHoc_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) PluginHoc_setPrototypeOf(subClass, superClass); }

function PluginHoc_setPrototypeOf(o, p) { PluginHoc_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PluginHoc_setPrototypeOf(o, p); }







var PluginHoc_PluginHoc = function PluginHoc(WrappedComponent) {
  var _dec, _class;

  var Plugin = (_dec = Object(index_module["b" /* inject */])('git'), _dec(_class = Object(index_module["c" /* observer */])(_class =
  /*#__PURE__*/
  function (_Component) {
    PluginHoc_inherits(Plugin, _Component);

    function Plugin(props) {
      var _this;

      PluginHoc_classCallCheck(this, Plugin);

      _this = PluginHoc_possibleConstructorReturn(this, PluginHoc_getPrototypeOf(Plugin).call(this, props));
      _this.state = {
        hasError: false
      };
      return _this;
    }

    PluginHoc_createClass(Plugin, [{
      key: "componentDidCatch",
      value: function componentDidCatch(error) {
        var extension = WrappedComponent.extensionName || WrappedComponent.displayName || WrappedComponent.name;
        error.message = "".concat(extension, " error: ").concat(error.message);
        logger.error(error);
        this.props.git.loading = false;
        this.setState({
          hasError: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.hasError) {
          return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
            size: 120
          }, "\u63D2\u4EF6", WrappedComponent.extensionName, "\u51FA\u9519\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u5173\u95ED\uFF0C\u5E76\u5EFA\u8BAE\u5C06\u6B64\u95EE\u9898\u53CD\u9988\u7ED9\u98DE\u51B0\uFF08ICE\uFF09\u56E2\u961F\uFF0C\u70B9\u51FB\u83DC\u5355\u9879\uFF1A\u5E2E\u52A9 => \u53CD\u9988\u95EE\u9898")));
        }

        return external_window_React_default.a.createElement(WrappedComponent, this.props);
      }
    }]);

    return Plugin;
  }(external_window_React_["Component"])) || _class) || _class);
  Plugin.displayName = "Hoc(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
  Plugin.extensionName = WrappedComponent.extensionName;
  return Plugin;
};

/* harmony default export */ var ProjectDashboard_PluginHoc = (PluginHoc_PluginHoc);
// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Assets.jsx


var Assets_dec, Assets_class, _class2, _temp;

function Assets_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Assets_typeof = function _typeof(obj) { return typeof obj; }; } else { Assets_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Assets_typeof(obj); }

function Assets_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Assets_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Assets_createClass(Constructor, protoProps, staticProps) { if (protoProps) Assets_defineProperties(Constructor.prototype, protoProps); if (staticProps) Assets_defineProperties(Constructor, staticProps); return Constructor; }

function Assets_possibleConstructorReturn(self, call) { if (call && (Assets_typeof(call) === "object" || typeof call === "function")) { return call; } return Assets_assertThisInitialized(self); }

function Assets_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Assets_getPrototypeOf(o) { Assets_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Assets_getPrototypeOf(o); }

function Assets_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Assets_setPrototypeOf(subClass, superClass); }

function Assets_setPrototypeOf(o, p) { Assets_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Assets_setPrototypeOf(o, p); }
















var folder = services["a" /* default */].folder;
var extColorMap = {
  js: 'rgb(246, 222, 56)',
  css: 'rgb(42, 83, 224)',
  html: 'rgb(225, 77, 48)'
};
var Assets_Assets = (Assets_dec = Object(index_module["b" /* inject */])('projects'), Assets_dec(Assets_class = Object(index_module["c" /* observer */])(Assets_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  Assets_inherits(Assets, _Component);

  function Assets(props) {
    var _this;

    Assets_classCallCheck(this, Assets);

    _this = Assets_possibleConstructorReturn(this, Assets_getPrototypeOf(Assets).call(this, props));

    _this.recursiveAssets = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;
      var cwd = currentProject.clientPath;
      var distPath = '';

      if (external_fs_default.a.existsSync(external_path_default.a.join(cwd, 'dist'))) {
        distPath = external_path_default.a.join(cwd, 'dist');
      } else {
        distPath = external_path_default.a.join(cwd, 'build');
      }

      if (path_exists_default.a.sync(distPath)) {
        var assets = _this.recursiveReaddirSync(distPath, distPath);

        _this.setState({
          assets: assets,
          refreshing: false
        });
      } else {
        _this.setState({
          assets: [],
          refreshing: false
        });
      }
    };

    _this.handleReload = function () {
      _this.setState({
        refreshing: true
      }, function () {
        setTimeout(function () {
          _this.recursiveAssets();
        }, 300);
      });
    };

    _this.handleFolderOpen = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;

      if (currentProject) {
        var cwd = currentProject.clientPath;
        var distPath = external_path_default.a.join(cwd, 'build');
        folder.open(distPath);
      } else {
        feedback_default.a.toast.error('项目不存在');
      }
    };

    _this.handleBuildProject = function () {
      var projects = _this.props.projects;
      project_scripts["a" /* default */].build(projects.currentProject);
    };

    _this.recursiveReaddirSync = function (dirPath, rootDir) {
      var stats;
      var list = [];
      var files = external_fs_default.a.readdirSync(dirPath).filter(junk_default.a.not);
      files.forEach(function (file) {
        var fullPath = external_path_default.a.join(dirPath, file);
        stats = external_fs_default.a.lstatSync(fullPath);

        if (stats.isDirectory()) {
          list = list.concat(_this.recursiveReaddirSync(fullPath, rootDir));
        } else {
          list.push({
            path: external_path_default.a.relative(rootDir, fullPath),
            size: filesize_default()(stats.size),
            fullPath: fullPath,
            statsSize: stats.size
          });
        }
      });
      list = list.sort(function (a, b) {
        return a.path.localeCompare(b.path);
      });
      return list;
    };

    _this.renderAssets = function () {
      var assets = _this.state.assets;
      return external_window_React_default.a.createElement("ul", null, assets.sort(function (prev, next) {
        return next.statsSize - prev.statsSize;
      }).map(function (file) {
        var ext = external_path_default.a.extname(file.path).substr(1);
        ext = ext.split('#')[0];
        var largeAsset = file.statsSize > 1024000;
        return external_window_React_default.a.createElement("li", {
          key: file.path,
          style: {
            lineHeight: '20px',
            height: 24,
            padding: '2px 0',
            clear: 'both',
            overflow: 'hidden',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }
        }, external_window_React_default.a.createElement("div", {
          style: {
            paddingLeft: 6,
            float: 'right',
            flex: '0 0 80px',
            textAlign: 'right',
            color: largeAsset ? '#FA7070' : '#2ECA9C'
          }
        }, file.size), external_window_React_default.a.createElement("div", {
          style: {
            padding: '0 1px',
            backgroundColor: extColorMap[ext] || '#9c9c9c',
            color: '#fff',
            borderRadius: '4px',
            width: 40,
            textAlign: 'center',
            fontSize: 10,
            opacity: 0.8,
            float: 'left'
          }
        }, ext.toLocaleUpperCase()), external_window_React_default.a.createElement("div", {
          style: {
            float: 'left',
            paddingLeft: 6,
            width: 'calc(100% - 120px)',
            whiteSpace: 'nowrap',
            lineHeight: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },
          title: file.path
        }, file.path));
      }));
    };

    _this.renderBody = function () {
      var _this$state = _this.state,
          assets = _this$state.assets,
          refreshing = _this$state.refreshing;

      if (refreshing) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6B63\u5728\u68C0\u6D4B\u6784\u5EFA\u7ED3\u679C...");
      }

      if (assets && assets.length > 0) {
        return _this.renderAssets();
      }

      return external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6682\u65E0\u6784\u5EFA\u7ED3\u679C\uFF0C\u8BF7\u5148\u6784\u5EFA\u9879\u76EE");
    };

    _this.getResultInfo = function () {
      var _this$state2 = _this.state,
          assets = _this$state2.assets,
          refreshing = _this$state2.refreshing;

      if (refreshing) {
        return null;
      }

      if (assets && assets.length > 0) {
        return {
          count: assets.length,
          time: fecha_default.a.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        };
      }

      return null;
    };

    _this.state = {
      assets: [],
      refreshing: false
    };
    _this.watcher = null;
    return _this;
  }

  Assets_createClass(Assets, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.recursiveAssets();
      this.props.projects.on('change', this.recursiveAssets);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.projects.removeListener('change', this.recursiveAssets);
    }
  }, {
    key: "render",
    value: function render() {
      var info = this.getResultInfo();
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "\u6784\u5EFA\u7ED3\u679C", info && external_window_React_default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#666',
          paddingLeft: 10
        }
      }, "(", info.count, ")\xA0\xA0", info.time)), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '构建项目',
        onClick: this.handleBuildProject
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "build",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '打开文件夹',
        onClick: this.handleFolderOpen
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "folderopen",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '刷新',
        onClick: this.handleReload
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.renderBody()));
    }
  }]);

  return Assets;
}(external_window_React_["Component"]), _class2.extensionName = 'assets', _temp)) || Assets_class) || Assets_class);
var styles = {};
/* harmony default export */ var ProjectDashboard_Assets = (ProjectDashboard_PluginHoc(Assets_Assets));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/form/index.js
var lib_form = __webpack_require__(757);
var form_default = /*#__PURE__*/__webpack_require__.n(lib_form);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/input/index.js
var lib_input = __webpack_require__(664);
var input_default = /*#__PURE__*/__webpack_require__.n(lib_input);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/select/index.js
var lib_select = __webpack_require__(724);
var select_default = /*#__PURE__*/__webpack_require__.n(lib_select);

// EXTERNAL MODULE: ./node_modules/js-base64/base64.js
var base64 = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/co/index.js
var co = __webpack_require__(1189);

// EXTERNAL MODULE: ./renderer/src/components/BrowserLink.jsx
var BrowserLink = __webpack_require__(176);

// EXTERNAL MODULE: ./renderer/src/components/dialog/index.js + 4 modules
var components_dialog = __webpack_require__(100);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Aliyun.jsx






var Aliyun_dec, Aliyun_class, Aliyun_class2, Aliyun_temp;

function Aliyun_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Aliyun_typeof = function _typeof(obj) { return typeof obj; }; } else { Aliyun_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Aliyun_typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Aliyun_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Aliyun_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Aliyun_createClass(Constructor, protoProps, staticProps) { if (protoProps) Aliyun_defineProperties(Constructor.prototype, protoProps); if (staticProps) Aliyun_defineProperties(Constructor, staticProps); return Constructor; }

function Aliyun_possibleConstructorReturn(self, call) { if (call && (Aliyun_typeof(call) === "object" || typeof call === "function")) { return call; } return Aliyun_assertThisInitialized(self); }

function Aliyun_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Aliyun_getPrototypeOf(o) { Aliyun_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Aliyun_getPrototypeOf(o); }

function Aliyun_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Aliyun_setPrototypeOf(subClass, superClass); }

function Aliyun_setPrototypeOf(o, p) { Aliyun_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Aliyun_setPrototypeOf(o, p); }
















var alioss = services["a" /* default */].alioss;
var STORE_KEY = 'extension:aliyun:data';
var regionList = [{
  value: 'oss-cn-hangzhou',
  label: '华东 1'
}, {
  value: 'oss-cn-shanghai',
  label: '华东 2'
}, {
  value: 'oss-cn-qingdao',
  label: '华北 1'
}, {
  value: 'oss-cn-beijing',
  label: '华北 2'
}, {
  value: 'oss-cn-zhangjiakou',
  label: '华北 3'
}, {
  value: 'oss-cn-huhehaote',
  label: '华北 5'
}, {
  value: 'oss-cn-shenzhen',
  label: '华南 1'
}, {
  value: 'oss-cn-hongkong',
  label: '香港'
}, {
  value: 'oss-us-west-1',
  label: '美国西部 1'
}, {
  value: 'oss-us-east-1',
  label: '美国东部 1'
}, {
  value: 'oss-ap-southeast-1',
  label: '亚太东南 1'
}, {
  value: 'oss-ap-southeast-2',
  label: '亚太东南 2'
}, {
  value: 'oss-ap-southeast-3',
  label: '亚太东南 3'
}, {
  value: 'oss-ap-southeast-5',
  label: '亚太东南 5'
}, {
  value: 'oss-ap-northeast-1',
  label: '亚太东北 1'
}, {
  value: 'oss-ap-south-1',
  label: '亚太南部 1'
}, {
  value: 'oss-eu-central-1',
  label: '欧洲中部 1'
}, {
  value: 'oss-me-east-1',
  label: '中东东部 1'
}]; // https://help.aliyun.com/document_detail/31837.html

var regionMap = {
  'oss-cn-hangzhou': {
    endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    name: '华东 1'
  },
  'oss-cn-shanghai': {
    endpoint: 'oss-cn-shanghai.aliyuncs.com',
    name: '华东 2'
  },
  'oss-cn-qingdao': {
    endpoint: 'oss-cn-qingdao.aliyuncs.com',
    name: '华北 1'
  },
  'oss-cn-beijing': {
    endpoint: 'oss-cn-beijing.aliyuncs.com',
    name: '华北 2'
  },
  'oss-cn-zhangjiakou': {
    endpoint: 'oss-cn-zhangjiakou.aliyuncs.com',
    name: '华北 3'
  },
  'oss-cn-huhehaote': {
    endpoint: 'oss-cn-huhehaote.aliyuncs.com',
    name: '华北 5'
  },
  'oss-cn-shenzhen': {
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    name: '华南 1'
  },
  'oss-cn-hongkong': {
    endpoint: 'oss-cn-hongkong.aliyuncs.com',
    name: '香港'
  },
  'oss-us-west-1': {
    endpoint: 'oss-us-west-1.aliyuncs.com',
    name: '美国西部 1'
  },
  'oss-us-east-1': {
    endpoint: 'oss-us-east-1.aliyuncs.com',
    name: '美国东部 1'
  },
  'oss-ap-southeast-1': {
    endpoint: 'oss-ap-southeast-1.aliyuncs.com',
    name: '亚太东南 1'
  },
  'oss-ap-southeast-2': {
    endpoint: 'oss-ap-southeast-2.aliyuncs.com',
    name: '亚太东南 2'
  },
  'oss-ap-southeast-3': {
    endpoint: 'oss-ap-southeast-3.aliyuncs.com',
    name: '亚太东南 3'
  },
  'oss-ap-southeast-5': {
    endpoint: 'oss-ap-southeast-5.aliyuncs.com',
    name: '亚太东南 5'
  },
  'oss-ap-northeast-1': {
    endpoint: 'oss-ap-northeast-1.aliyuncs.com',
    name: '亚太东北 1'
  },
  'oss-ap-south-1': {
    endpoint: 'oss-ap-south-1.aliyuncs.com',
    name: '亚太南部 1'
  },
  'oss-eu-central-1': {
    endpoint: 'oss-eu-central-1.aliyuncs.com',
    name: '欧洲中部 1'
  },
  'oss-me-east-1': {
    endpoint: 'oss-me-east-1.aliyuncs.com',
    name: '中东东部 1'
  }
};
var Aliyun_Aliyun = (Aliyun_dec = Object(index_module["b" /* inject */])('projects'), Aliyun_dec(Aliyun_class = Object(index_module["c" /* observer */])(Aliyun_class = (Aliyun_temp = Aliyun_class2 =
/*#__PURE__*/
function (_Component) {
  Aliyun_inherits(Aliyun, _Component);

  function Aliyun(props) {
    var _this;

    Aliyun_classCallCheck(this, Aliyun);

    _this = Aliyun_possibleConstructorReturn(this, Aliyun_getPrototypeOf(Aliyun).call(this, props));

    _this.ossValueChange = function (key, value) {
      _this.setState(_defineProperty({}, key, value), _this.saveAliossData);
    };

    _this.saveAliossData = function () {
      var _this$state = _this.state,
          region = _this$state.region,
          accessKeyId = _this$state.accessKeyId,
          accessKeySecret = _this$state.accessKeySecret,
          selectedBucket = _this$state.selectedBucket,
          bucketDirectory = _this$state.bucketDirectory,
          bucketOptions = _this$state.bucketOptions;
      var base64Value = base64["Base64"].encode(JSON.stringify({
        region: region,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        selectedBucket: selectedBucket,
        bucketDirectory: bucketDirectory,
        bucketOptions: bucketOptions // cdn,

      }));
      localStorage.setItem(STORE_KEY, base64Value);
    };

    _this.getOssConfig = function () {
      if (!_this.state.accessKeyId || !_this.state.accessKeySecret) {
        feedback_default.a.toast.error('请先输入 accessKeyId、accessKeySecret');

        return false;
      } else {
        return {
          region: _this.state.region,
          endpoint: regionMap[_this.state.region].endpoint,
          accessKeyId: _this.state.accessKeyId,
          accessKeySecret: _this.state.accessKeySecret,
          time: '200s'
        };
      }
    };

    _this.handleClear = function () {
      _this.setState({
        region: 'oss-cn-hangzhou',
        accessKeyId: '',
        accessKeySecret: '',
        selectedBucket: undefined,
        bucketDirectory: '',
        bucketOptions: [] // cdn: '',

      }, function () {
        localStorage.removeItem(STORE_KEY);
      });
    };

    _this.handleRefeshBucket = function () {
      var ossConfig = _this.getOssConfig();

      if (!ossConfig) {
        return;
      }

      alioss.getBuckets(ossConfig).then(function (result) {
        var buckets = result.buckets;
        var bucketOptions = buckets.map(function (bucket) {
          return {
            label: bucket.name,
            value: bucket.name
          };
        });

        feedback_default.a.toast.success('Bucket 列表已刷新');

        _this.setState({
          bucketOptions: bucketOptions,
          selectedBucket: bucketOptions[0].value
        }, _this.saveAliossData);
      }).catch(function () {
        var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        components_dialog["a" /* default */].alert({
          title: 'Bucket 列表刷新失败',
          content: err.message
        });
      });
    };

    _this.handleUploadOss = function () {
      var currentProject = _this.props.projects.currentProject;
      var buildDir = '';

      if (external_fs_default.a.existsSync(external_path_default.a.join(currentProject.clientPath, 'dist'))) {
        buildDir = external_path_default.a.join(currentProject.clientPath, 'dist');
      } else {
        buildDir = external_path_default.a.join(currentProject.clientPath, 'build');
      }

      if (path_exists_default.a.sync(buildDir)) {
        var assets = _this.recursiveReaddirSync(buildDir, buildDir);

        if (assets.length === 0) {
          feedback_default.a.toast.error('当前构建结果为空');
        } else {
          if (!_this.state.selectedBucket) {
            feedback_default.a.toast.error('未选择 bucket');
          } else {
            _this.setState({
              isUploading: true
            });

            components_dialog["a" /* default */].confirm({
              title: '上传到阿里云 OSS',
              content: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("div", null, "\u662F\u5426\u5C06\u6784\u5EFA\u7ED3\u679C\u4E0A\u4F20\u5230:"), external_window_React_default.a.createElement("div", {
                style: {
                  paddingLeft: '2em'
                }
              }, "\u533A\u57DF: ", regionMap[_this.state.region].name, ' - ', _this.state.region), external_window_React_default.a.createElement("div", {
                style: {
                  paddingLeft: '2em'
                }
              }, "\u7EC8\u7AEF: ", regionMap[_this.state.region].endpoint), external_window_React_default.a.createElement("div", {
                style: {
                  paddingLeft: '2em'
                }
              }, "\u5B58\u50A8\u7A7A\u95F4: ", _this.state.selectedBucket), external_window_React_default.a.createElement("div", {
                style: {
                  paddingLeft: '2em'
                }
              }, "\u5B58\u50A8\u8DEF\u5F84: ", _this.state.bucketDirectory || '/'))
            }, function (ok) {
              if (ok) {
                var ossConfig = _this.getOssConfig();

                if (!ossConfig) {
                  return;
                }

                alioss.upload2oss(ossConfig, _this.state.selectedBucket, _this.state.bucketDirectory, assets).then(function (uploadResult) {
                  _this.renderUploadResult(uploadResult);
                }).catch(function (e) {
                  components_dialog["a" /* default */].alert({
                    title: '上传失败',
                    content: e.message
                  });

                  _this.setState({
                    isUploading: false
                  });
                });
              } else {
                _this.setState({
                  isUploading: false
                });
              }
            });
          }
        }
      } else {
        feedback_default.a.toast.error('暂无构建结果');
      }
    };

    _this.recursiveReaddirSync = function (dirPath, rootDir) {
      var stats;
      var list = [];
      var files = external_fs_default.a.readdirSync(dirPath).filter(junk_default.a.not);
      files.forEach(function (file) {
        var fullPath = external_path_default.a.join(dirPath, file);
        stats = external_fs_default.a.lstatSync(fullPath);

        if (stats.isDirectory()) {
          list = list.concat(_this.recursiveReaddirSync(fullPath, rootDir));
        } else {
          list.push({
            path: external_path_default.a.relative(rootDir, fullPath),
            fullPath: fullPath
          });
        }
      });
      list = list.sort(function (a, b) {
        return a.path.localeCompare(b.path);
      });
      return list;
    };

    _this.renderUploadResult = function (result) {
      var successCount = 0;
      var faildCount = 0;
      var content = result.map(function (item) {
        var success = item.code === 0;

        if (success) {
          successCount += 1;
        } else {
          faildCount = 0;
        }

        return external_window_React_default.a.createElement("tr", {
          key: item.path
        }, external_window_React_default.a.createElement("td", {
          style: {
            padding: 3
          }
        }, external_window_React_default.a.createElement("span", {
          style: {
            color: '#fff',
            padding: '3px 4px',
            backgroundColor: success ? '#2ECA9C' : '#FA7070'
          }
        }, success ? '成功' : '失败')), external_window_React_default.a.createElement("td", {
          style: {
            padding: 3,
            wordBreak: 'break-all'
          }
        }, item.path), external_window_React_default.a.createElement("td", {
          style: {
            padding: 3,
            wordBreak: 'break-all'
          }
        }, success ? external_window_React_default.a.createElement(BrowserLink["a" /* default */], {
          href: item.url
        }, item.url) : external_window_React_default.a.createElement("span", null, item.message)));
      });
      components_dialog["a" /* default */].alert({
        title: external_window_React_default.a.createElement("div", null, "\u4E0A\u4F20\u7ED3\u679C", external_window_React_default.a.createElement("span", {
          style: {
            fontSize: 12,
            paddingLeft: 10,
            color: '#666'
          }
        }, "\u6210\u529F\uFF1A(", successCount, ") \u5931\u8D25\uFF1A(", faildCount, ")")),
        content: external_window_React_default.a.createElement("table", {
          style: {
            width: '75%'
          }
        }, external_window_React_default.a.createElement("thead", null, external_window_React_default.a.createElement("tr", null, external_window_React_default.a.createElement("th", {
          style: {
            padding: 3,
            width: 40
          }
        }, "\u72B6\u6001"), external_window_React_default.a.createElement("th", {
          style: {
            padding: 3
          }
        }, "\u6587\u4EF6"), external_window_React_default.a.createElement("th", {
          style: {
            padding: 3
          }
        }, "URL / \u4FE1\u606F"))), external_window_React_default.a.createElement("tbody", null, content)),
        fullWidth: true
      }, function () {
        _this.setState({
          isUploading: false
        });
      });
    };

    var _base64Value = localStorage.getItem(STORE_KEY);

    var initState = {};

    if (_base64Value) {
      try {
        initState = JSON.parse(base64["Base64"].decode(_base64Value));
      } catch (e) {}
    }

    _this.state = initState;
    return _this;
  }

  Aliyun_createClass(Aliyun, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "\u963F\u91CC\u4E91 OSS"), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'topRight',
        tipText: '清空数据',
        onClick: this.handleClear
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "clear",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, external_window_React_default.a.createElement(form_default.a, {
        direction: "ver",
        field: this.field
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }, "\u533A\u57DF:"), external_window_React_default.a.createElement(select_default.a, {
        size: "small",
        style: {
          width: '60%'
        },
        placeholder: "\u8BF7\u9009\u62E9 region",
        value: this.state.region,
        onChange: this.ossValueChange.bind(this, 'region'),
        dataSource: regionList
      }), external_window_React_default.a.createElement(BrowserLink["a" /* default */], {
        style: {
          color: '#3080FE',
          marginLeft: 10,
          padding: '2px 4px'
        },
        href: "https://help.aliyun.com/document_detail/31837.html"
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "help"
      }))), external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }, "AccessKey ID:"), external_window_React_default.a.createElement(input_default.a, {
        size: "small",
        style: {
          width: '60%'
        },
        value: this.state.accessKeyId,
        onChange: this.ossValueChange.bind(this, 'accessKeyId'),
        placeholder: "accessKeyId"
      }), external_window_React_default.a.createElement(BrowserLink["a" /* default */], {
        style: {
          color: '#3080FE',
          marginLeft: 10,
          padding: '2px 4px'
        },
        href: "https://help.aliyun.com/knowledge_detail/38738.html"
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "help"
      }))), external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }, "Secret:"), external_window_React_default.a.createElement(input_default.a, {
        size: "small",
        style: {
          width: '60%'
        },
        htmlType: "password",
        value: this.state.accessKeySecret,
        onChange: this.ossValueChange.bind(this, 'accessKeySecret'),
        placeholder: "accessKeySecret"
      })), external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }, "\u5B58\u50A8\u7A7A\u95F4:"), external_window_React_default.a.createElement(select_default.a, {
        size: "small",
        style: {
          width: '60%'
        },
        placeholder: "\u8BF7\u9009\u62E9 bucket",
        value: this.state.selectedBucket,
        onChange: this.ossValueChange.bind(this, 'selectedBucket'),
        dataSource: this.state.bucketOptions || []
      }), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE',
          marginLeft: 10
        },
        placement: 'top',
        tipText: '刷新 bukcet 列表',
        onClick: this.handleRefeshBucket
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload"
      }))), external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }, "\u5B58\u50A8\u8DEF\u5F84:"), external_window_React_default.a.createElement(input_default.a, {
        size: "small",
        style: {
          width: '60%'
        },
        value: this.state.bucketDirectory,
        onChange: this.ossValueChange.bind(this, 'bucketDirectory'),
        placeholder: "\u5B58\u50A8\u8DEF\u5F84\uFF08\u4E0D\u586B\u5219\u9ED8\u8BA4\u5728\u6839\u76EE\u5F55\uFF09"
      })), external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formItem
      }, external_window_React_default.a.createElement("div", {
        style: Aliyun_styles.formLabel
      }), external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        type: "primary",
        onClick: this.handleUploadOss,
        loading: this.state.isUploading
      }, "\u63D0\u4EA4\u4E0A\u4F20")))));
    }
  }]);

  return Aliyun;
}(external_window_React_["Component"]), Aliyun_class2.extensionName = 'aliyun', Aliyun_temp)) || Aliyun_class) || Aliyun_class);
var Aliyun_styles = {
  formItem: {
    width: '100%',
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  formLabel: {
    textAlign: 'right',
    paddingRight: 10,
    width: 100
  }
};
/* harmony default export */ var ProjectDashboard_Aliyun = (ProjectDashboard_PluginHoc(Aliyun_Aliyun));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/tab/index.js
var tab = __webpack_require__(674);
var tab_default = /*#__PURE__*/__webpack_require__.n(tab);

// EXTERNAL MODULE: ./node_modules/fs-extra/lib/index.js
var lib = __webpack_require__(27);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/es/index.js + 28 modules
var es = __webpack_require__(99);

// EXTERNAL MODULE: ./renderer/src/lib/logger.js
var lib_logger = __webpack_require__(7);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Dependencies.jsx


var Dependencies_dec, Dependencies_class, Dependencies_class2, Dependencies_temp;

function Dependencies_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Dependencies_typeof = function _typeof(obj) { return typeof obj; }; } else { Dependencies_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Dependencies_typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Dependencies_defineProperty(target, key, source[key]); }); } return target; }

function Dependencies_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Dependencies_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dependencies_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Dependencies_createClass(Constructor, protoProps, staticProps) { if (protoProps) Dependencies_defineProperties(Constructor.prototype, protoProps); if (staticProps) Dependencies_defineProperties(Constructor, staticProps); return Constructor; }

function Dependencies_possibleConstructorReturn(self, call) { if (call && (Dependencies_typeof(call) === "object" || typeof call === "function")) { return call; } return Dependencies_assertThisInitialized(self); }

function Dependencies_getPrototypeOf(o) { Dependencies_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Dependencies_getPrototypeOf(o); }

function Dependencies_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Dependencies_setPrototypeOf(subClass, superClass); }

function Dependencies_setPrototypeOf(o, p) { Dependencies_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Dependencies_setPrototypeOf(o, p); }

function Dependencies_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// import { Icon } from '@icedesign/base';














var npm = services["a" /* default */].npm;
var Dependencies_Dependencies = (Dependencies_dec = Object(index_module["b" /* inject */])('projects', 'installer'), Dependencies_dec(Dependencies_class = Object(index_module["c" /* observer */])(Dependencies_class = (Dependencies_temp = Dependencies_class2 =
/*#__PURE__*/
function (_Component) {
  Dependencies_inherits(Dependencies, _Component);

  function Dependencies(props) {
    var _this;

    Dependencies_classCallCheck(this, Dependencies);

    _this = Dependencies_possibleConstructorReturn(this, Dependencies_getPrototypeOf(Dependencies).call(this, props));

    _this.readPackageVersion = function (name, cwd) {
      return new Promise(function (resolve) {
        var pkgPath = external_path_default.a.join(cwd, 'node_modules', name, 'package.json');
        var v = '-';

        if (path_exists_default.a.sync(pkgPath)) {
          try {
            v = lib_default.a.readJsonSync(pkgPath).version;
          } catch (e) {}
        }

        resolve([name, v]);
      });
    };

    _this.updateOutdated = function () {
      var projects = _this.props.projects;
      var _this$state = _this.state,
          dependencies = _this$state.dependencies,
          devDependencies = _this$state.devDependencies;
      var currentProject = projects.currentProject;
      npm.exec('npm outdated --json --silent', {
        cwd: currentProject.clientPath
      }, function (error, stdout, stderr) {
        if (stdout) {
          try {
            var outdatedDeps = JSON.parse(stdout);
            var outdated = [];

            var _arr = Object.entries(outdatedDeps);

            for (var _i = 0; _i < _arr.length; _i++) {
              var _arr$_i = _slicedToArray(_arr[_i], 2),
                  key = _arr$_i[0],
                  value = _arr$_i[1];

              outdated.push(_objectSpread({
                name: key
              }, value));
            }

            outdated.forEach(function (newer) {
              if (newer.current && newer.current !== newer.wanted) {
                if (newer.name in dependencies) {
                  dependencies[newer.name].latest = newer.latest;
                  dependencies[newer.name].wanted = newer.wanted;
                }

                if (newer.name in devDependencies) {
                  devDependencies[newer.name].latest = newer.latest;
                  devDependencies[newer.name].wanted = newer.wanted;
                }
              }
            });

            _this.setState({
              dependencies: dependencies,
              devDependencies: devDependencies
            });
          } catch (e) {}
        }
      });
    };

    _this.updateInstalled = function () {
      var projects = _this.props.projects;
      var _this$state2 = _this.state,
          dependencies = _this$state2.dependencies,
          devDependencies = _this$state2.devDependencies;
      var currentProject = projects.currentProject; // 更新所有已经依赖的版本

      Promise.all(Object.keys(dependencies).map(function (name) {
        return _this.readPackageVersion(name, currentProject.clientPath);
      })).then(function (depsInstalled) {
        depsInstalled.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              installedVersion = _ref2[1];

          dependencies[name].current = installedVersion;
        });
        return Promise.resolve();
      }).then(function () {
        return Promise.all(Object.keys(devDependencies).map(function (name) {
          return _this.readPackageVersion(name, currentProject.clientPath);
        }));
      }).then(function (devDepsInstalled) {
        devDepsInstalled.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              name = _ref4[0],
              installedVersion = _ref4[1];

          devDependencies[name].current = installedVersion;
        });
        return Promise.resolve();
      }).then(function () {
        _this.setState({
          dependencies: dependencies,
          devDependencies: devDependencies
        }, _this.updateOutdated);
      });
    };

    _this.readPackage = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;
      var dependencies = {};
      var devDependencies = {};
      if (!currentProject || !currentProject.exists) return null; // package.json 的路径地址

      var packageFilePath = external_path_default.a.join(currentProject.clientPath, 'package.json');

      if (external_fs_default.a.existsSync(packageFilePath)) {
        var packageData = external_fs_default.a.readFileSync(packageFilePath);

        try {
          packageData = JSON.parse(String(packageData));
          var deps = packageData.dependencies;

          if (deps) {
            // 转换格式
            deps = Object.entries(deps).reduce(function (accumulator, current) {
              var _current = _slicedToArray(current, 2),
                  name = _current[0],
                  version = _current[1];

              accumulator[name] = {
                require: version
              };
              return accumulator;
            }, {});
            dependencies = Object.assign(dependencies, deps);
          }

          var devDeps = packageData.devDependencies;

          if (devDeps) {
            // 转换格式
            devDeps = Object.entries(devDeps).reduce(function (accumulator, current) {
              var _current2 = _slicedToArray(current, 2),
                  name = _current2[0],
                  version = _current2[1];

              accumulator[name] = {
                require: version
              };
              return accumulator;
            }, {});
            devDependencies = Object.assign(devDependencies, devDeps);
          }

          _this.setState({
            dependencies: dependencies,
            devDependencies: devDependencies
          }, _this.updateInstalled);
        } catch (e) {
          _this.setState({
            dependencies: dependencies,
            devDependencies: devDependencies
          });

          lib_logger["a" /* default */].info('package.json 文件 parse 失败'); // eslint-disable-line no-console

          lib_logger["a" /* default */].error(e); // eslint-disable-line no-console
        }
      } else {
        _this.setState({
          dependencies: dependencies,
          devDependencies: devDependencies
        });
      }
    };

    _this.handleNpminstallOpen = function () {
      var type = _this.props.type;

      _this.props.installer.open(type);
    };

    _this.handleReload = function () {
      var _this$state3 = _this.state,
          dependencies = _this$state3.dependencies,
          devDependencies = _this$state3.devDependencies;
      Object.keys(dependencies).forEach(function (name) {
        dependencies[name].current = '-';
        dependencies[name].wanted = false;
      });
      Object.keys(devDependencies).forEach(function (name) {
        devDependencies[name].current = '-';
        devDependencies[name].wanted = false;
      });

      _this.setState({
        dependencies: dependencies,
        devDependencies: devDependencies
      }, function () {
        setTimeout(function () {
          _this.readPackage();
        }, 0);
      });
    };

    _this.handleUpdateDependencies = function (name, type) {
      var projects = _this.props.projects;
      var deps = _this.state[type];
      var currentProject = projects.currentProject;

      if (!deps[name].installing) {
        deps[name].installing = true;

        _this.setState(Dependencies_defineProperty({}, type, deps));

        npm.exec("npm update ".concat(name, " --silent"), {
          cwd: currentProject.clientPath
        }, function (error) {
          if (error) {
            deps[name].installing = false;
          } else {
            deps[name].current = deps[name].wanted;
            deps[name].installing = false;
            delete deps[name].wanted;
          }

          _this.setState(Dependencies_defineProperty({}, type, deps));
        });
      }
    };

    _this.renderDependencies = function (deps) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dependencies';
      var depsArr = Object.keys(deps);

      if (depsArr.length === 0) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          style: {
            minHeight: 40
          }
        }, "\u6682\u65E0\u4F9D\u8D56\u9879");
      }

      return external_window_React_default.a.createElement("div", {
        style: Dependencies_styles.depsWrapper
      }, depsArr.map(function (name) {
        return external_window_React_default.a.createElement("div", {
          style: Dependencies_styles.depsItem,
          key: name
        }, external_window_React_default.a.createElement(es["default"], {
          placement: 'top',
          overlay: name
        }, external_window_React_default.a.createElement("div", {
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '20px',
            color: '#999'
          }
        }, name)), external_window_React_default.a.createElement("div", {
          style: {
            lineHeight: '20px',
            height: 20,
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            flexDirection: 'row',
            color: '#666'
          }
        }, external_window_React_default.a.createElement("span", null, deps[name].current), deps[name].wanted && external_window_React_default.a.createElement(es["default"], {
          placement: 'top',
          overlay: external_window_React_default.a.createElement("span", null, "\u5347\u7EA7\u5230 ", deps[name].wanted, ' ', deps[name].installing ? ' 正在更新中' : '')
        }, external_window_React_default.a.createElement("div", {
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '20px',
            color: '#999'
          }
        }, external_window_React_default.a.createElement("span", {
          style: {
            paddingLeft: 8,
            color: deps[name].installing ? '#fcda52' : '#2eca9c',
            cursor: 'pointer'
          },
          onClick: _this.handleUpdateDependencies.bind(Dependencies_assertThisInitialized(Dependencies_assertThisInitialized(_this)), name, type)
        }, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: "package"
        }))))));
      }));
    };

    _this.state = {
      dependencies: {},
      devDependencies: {}
    };
    return _this;
  }

  Dependencies_createClass(Dependencies, [{
    key: "unsafe_componentWillMount",
    value: function unsafe_componentWillMount() {
      this.readPackage();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // ipcRenderer.on('focus', this.readPackage);
      this.props.projects.on('change', this.readPackage);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // ipcRenderer.removeListener('foucs', this.readPackage);
      this.props.projects.removeListener('change', this.readPackage);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          dependencies = _this$state4.dependencies,
          devDependencies = _this$state4.devDependencies;
      var dependenciesOutdatedCount = 0;
      Object.entries(dependencies).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            name = _ref6[0],
            value = _ref6[1];

        if (value.wanted) {
          dependenciesOutdatedCount += 1;
        }
      });
      var devDependenciesOutdatedCount = 0;
      Object.entries(devDependencies).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            name = _ref8[0],
            value = _ref8[1];

        if (value.wanted) {
          devDependenciesOutdatedCount += 1;
        }
      });
      var currentProject = this.props.projects.currentProject;
      var title = currentProject.nodeFramework ? '依赖管理(前端)' : '依赖管理';
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, title), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '刷新',
        onClick: this.handleReload
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '添加依赖',
        onClick: this.handleNpminstallOpen
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "plus-o",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, external_window_React_default.a.createElement(tab_default.a, {
        size: "small",
        contentStyle: {
          padding: '10px 0 0'
        }
      }, external_window_React_default.a.createElement(tab_default.a.TabPane, {
        tab: external_window_React_default.a.createElement("div", null, "dependencies", dependenciesOutdatedCount > 0 ? external_window_React_default.a.createElement("span", {
          style: {
            paddingLeft: 10,
            fontSize: 12,
            color: '#2eca9c'
          }
        }, "(", dependenciesOutdatedCount, ")") : external_window_React_default.a.createElement("span", {
          style: {
            paddingLeft: 10,
            fontSize: 12,
            color: '#666'
          }
        }, "(", Object.keys(dependencies).length, ")")),
        key: "dependencies"
      }, this.renderDependencies(dependencies)), external_window_React_default.a.createElement(tab_default.a.TabPane, {
        tab: external_window_React_default.a.createElement("div", null, "devDependencies", devDependenciesOutdatedCount > 0 ? external_window_React_default.a.createElement("span", {
          style: {
            paddingLeft: 10,
            fontSize: 12,
            color: '#2eca9c'
          }
        }, "(", devDependenciesOutdatedCount, ")") : external_window_React_default.a.createElement("span", {
          style: {
            paddingLeft: 10,
            fontSize: 12,
            color: '#666'
          }
        }, "(", Object.keys(devDependencies).length, ")")),
        key: "devDependencies"
      }, this.renderDependencies(devDependencies, 'devDependencies')))));
    }
  }]);

  return Dependencies;
}(external_window_React_["Component"]), Dependencies_class2.extensionName = 'dependencies', Dependencies_temp)) || Dependencies_class) || Dependencies_class);
var Dependencies_styles = {
  item: {
    borderBottom: '1px solid #eee',
    color: '#666',
    textAlign: 'left',
    padding: '4px'
  },
  depsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  depsItem: {
    flex: '0 0 33.33%',
    width: '33.33%',
    padding: '0 5px 8px'
  }
};
/* harmony default export */ var ProjectDashboard_Dependencies = (ProjectDashboard_PluginHoc(Dependencies_Dependencies));
// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/isbinaryfile/index.js
var isbinaryfile = __webpack_require__(1190);
var isbinaryfile_default = /*#__PURE__*/__webpack_require__.n(isbinaryfile);

// EXTERNAL MODULE: ./renderer/node_modules/line-by-line/line-by-line.js
var line_by_line = __webpack_require__(1194);
var line_by_line_default = /*#__PURE__*/__webpack_require__.n(line_by_line);

// EXTERNAL MODULE: ./renderer/src/lib/file-system.js
var file_system = __webpack_require__(181);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Todo.jsx
var Todo_dec, Todo_class, Todo_class2, Todo_temp;

function Todo_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Todo_typeof = function _typeof(obj) { return typeof obj; }; } else { Todo_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Todo_typeof(obj); }

function Todo_slicedToArray(arr, i) { return Todo_arrayWithHoles(arr) || Todo_iterableToArrayLimit(arr, i) || Todo_nonIterableRest(); }

function Todo_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Todo_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Todo_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Todo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Todo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Todo_createClass(Constructor, protoProps, staticProps) { if (protoProps) Todo_defineProperties(Constructor.prototype, protoProps); if (staticProps) Todo_defineProperties(Constructor, staticProps); return Constructor; }

function Todo_possibleConstructorReturn(self, call) { if (call && (Todo_typeof(call) === "object" || typeof call === "function")) { return call; } return Todo_assertThisInitialized(self); }

function Todo_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Todo_getPrototypeOf(o) { Todo_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Todo_getPrototypeOf(o); }

function Todo_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Todo_setPrototypeOf(subClass, superClass); }

function Todo_setPrototypeOf(o, p) { Todo_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Todo_setPrototypeOf(o, p); }













function recursiveReaddirSync(dirPath, rootDir) {
  var list = [];
  var stats;
  var files = Object(file_system["a" /* readdirSync */])(dirPath);
  var ignoreFiles = ['node_modules'];
  files.forEach(function (file) {
    if (ignoreFiles.includes(file)) {
      return;
    }

    var fullPath = external_path_default.a.join(dirPath, file);
    stats = external_fs_default.a.lstatSync(fullPath);

    if (stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(fullPath, rootDir));
    } else if (!isbinaryfile_default.a.sync(fullPath)) {
      list.push([external_path_default.a.relative(rootDir, fullPath), fullPath]);
    }
  });
  return list;
}

var lineLengthLimit = 1000;
var messageChecks = {
  note: {
    regex: /(?:^|[^:])\/[/*]\s*NOTE\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✐ NOTE'
  },
  optimize: {
    regex: /(?:^|[^:])\/[/*]\s*OPTIMIZE\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ↻ OPTIMIZE'
  },
  todo: {
    regex: /(?:^|[^:])\/[/*]\s*TODO\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✓ TODO'
  },
  hack: {
    regex: /(?:^|[^:])\/[/*]\s*HACK\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✄ HACK'
  },
  xxx: {
    regex: /(?:^|[^:])\/[/*]\s*XXX\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✗ XXX'
  },
  fixme: {
    regex: /(?:^|[^:])\/[/*]\s*FIXME\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ☠ FIXME'
  },
  bug: {
    regex: /(?:^|[^:])\/[/*]\s*BUG\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ☢ BUG'
  }
};
/**
 * Takes a line of a file and the line number, and returns an array of all of
 * the messages found in that line. Can return multiple messages per line, for
 * example, if a message was annotated with more than one type. EG: FIXME TODO
 *
 * Each message in the array will have a label, a line_number, and a
 * message. Will also include an author property if one is found on the
 * message.
 *
 * @param   {String} lineString The
 * @param   {Number} lineNumber
 *
 * @return  {Array}
 */

function retrieveMessagesFromLine(lineString, lineNumber) {
  var messageFormat = {
    author: null,
    message: null,
    label: null,
    line_number: lineNumber
  };
  var messages = [];
  Object.keys(messageChecks).forEach(function (checkName) {
    var matchResults = lineString.match(messageChecks[checkName].regex);
    var checker = messageChecks[checkName];
    var thisMessage;

    if (matchResults && matchResults.length) {
      thisMessage = JSON.parse(JSON.stringify(messageFormat)); // Clone the above structure.

      thisMessage.label = checker.label;

      if (matchResults[1] && matchResults[1].length) {
        thisMessage.author = matchResults[1].trim();
      }

      if (matchResults[2] && matchResults[2].length) {
        thisMessage.message = matchResults[2].trim();
      }
    }

    if (thisMessage) messages.push(thisMessage);
  });
  return messages;
}

var Todo_Todo = (Todo_dec = Object(index_module["b" /* inject */])('projects'), Todo_dec(Todo_class = Object(index_module["c" /* observer */])(Todo_class = (Todo_temp = Todo_class2 =
/*#__PURE__*/
function (_Component) {
  Todo_inherits(Todo, _Component);

  function Todo(props) {
    var _this;

    Todo_classCallCheck(this, Todo);

    _this = Todo_possibleConstructorReturn(this, Todo_getPrototypeOf(Todo).call(this, props));

    _this.searchDirectory = function () {
      // TODO 监听目录文件变更
      var currentProject = _this.props.projects.currentProject;

      if (currentProject && currentProject.fullPath) {
        var srcDir = currentProject.clientSrcPath;
        var files = recursiveReaddirSync(srcDir, srcDir);

        _this.setState({
          files: []
        });

        if (files.length > 0) {
          files.forEach(function (_ref) {
            var _ref2 = Todo_slicedToArray(_ref, 2),
                filePath = _ref2[0],
                fullPath = _ref2[1];

            _this.matchTodo(filePath, fullPath);
          });
        } else {
          _this.setState({
            files: []
          });
        }
      } else {
        _this.setState({
          files: []
        });
      }
    };

    _this.matchTodo = function (filePath, fullPath) {
      var input = new line_by_line_default.a(fullPath);
      var fileMessages = {
        path: filePath,
        totalLines: 0,
        messages: []
      };
      var currentFileLineNumber = 1;
      input.on('line', function (line) {
        if (line.length < lineLengthLimit) {
          var messages = retrieveMessagesFromLine(line, currentFileLineNumber);
          messages.forEach(function (message) {
            fileMessages.messages.push(message);
          });
        }

        currentFileLineNumber += 1;
      });
      input.on('end', function () {
        fileMessages.totalLines = currentFileLineNumber;

        if (fileMessages.messages.length) {
          _this.state.files.push(fileMessages);

          _this.setState(fileMessages);
        }
      });
    };

    _this.todoCount = function (files) {
      var count = 0;
      files.forEach(function (file) {
        files.forEach(function () {
          count += 1;
        });
      });
      return count;
    };

    _this.state = {
      files: []
    };
    return _this;
  }

  Todo_createClass(Todo, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.searchDirectory();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      external_electron_["ipcRenderer"].on('focus', this.searchDirectory);
      this.props.projects.on('change', function () {
        _this2.setState({
          files: []
        });

        _this2.searchDirectory();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      external_electron_["ipcRenderer"].removeListener('focus', this.searchDirectory);
      this.props.projects.removeListener('change', this.searchDirectory);
    }
  }, {
    key: "getPaddedLineNumber",

    /**
     * Takes a line number and returns a padded string matching the total number of
     * characters in totalLinesNumber. EG: A lineNumber of 12 and a
     * totalLinesNumber of 1323 will return the string '  12'.
     *
     * @param   {Number} lineNumber
     * @param   {Number} totalLinesNumber
     *
     * @return  {String}
     */
    value: function getPaddedLineNumber(lineNumber, totalLinesNumber) {
      var paddedLineNumberString = '' + lineNumber;

      while (paddedLineNumberString.length < ('' + totalLinesNumber).length) {
        paddedLineNumberString = ' ' + paddedLineNumberString;
      }

      return paddedLineNumberString;
    }
    /**
     * Takes an individual message object, as output from retrieveMessagesFromLine
     * and formats it for output.
     *
     * @param     {Object}    individualMessage
     * @property  {String}    individualMessage.author
     * @property  {String}    individualMessage.message
     * @property  {String}    individualMessage.label
     * @property  {Number}    individualMessage.line_number
     * @param     {Number}    totalNumberOfLines
     *
     * @return    {String}    The formatted message string.
     */

  }, {
    key: "formatMessageOutput",
    value: function formatMessageOutput(individualMessage, totalNumberOfLines) {
      var paddedLineNumber = this.getPaddedLineNumber(individualMessage.line_number, totalNumberOfLines);
      var finalLabelString;
      var finalNoteString;
      finalNoteString = '  [Line ' + paddedLineNumber + '] ';
      finalLabelString = individualMessage.label;

      if (individualMessage.author) {
        finalLabelString += ' from ' + individualMessage.author + ': ';
      } else {
        finalLabelString += ': ';
      }

      finalNoteString += finalLabelString;

      if (individualMessage.message && individualMessage.message.length) {
        finalNoteString += individualMessage.message;
      } else {
        finalNoteString += '[ no message ]';
      }

      return finalNoteString;
    }
    /**
     * Takes an object representing the messages and other meta-info for the file
     * and calls off to the formatters for the messages, as well as logs the
     * formatted result.
     *
     * @param     {Object}  messagesInfo
     * @property  {String}  messagesInfo.path The file path
     * @property  {Array}   messagesInfo.messages All of the message objects for the file.
     * @property  {String}  messagesInfo.totalLines Total number of lines in the file.
     */

  }, {
    key: "renderMessages",
    value: function renderMessages(messagesInfo) {
      var _this3 = this;

      var currentProject = this.props.projects.currentProject;
      var clientSrcPath = currentProject.clientSrcPath;
      return external_window_React_default.a.createElement("td", {
        style: {
          lineHeight: '20px'
        }
      }, external_window_React_default.a.createElement("div", null, clientSrcPath + '/' + messagesInfo.path), external_window_React_default.a.createElement("ul", {
        style: {
          paddingLeft: '2em',
          fontSize: '0.8em',
          color: '#666'
        }
      }, messagesInfo.messages.map(function (message, index) {
        return external_window_React_default.a.createElement("li", {
          key: index
        }, _this3.formatMessageOutput(message, messagesInfo.totalLines));
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "TODO", external_window_React_default.a.createElement("span", {
        style: {
          paddingLeft: 10,
          fontSize: 12,
          color: '#666'
        }
      }, "(", this.todoCount(this.state.files), ")"))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.state.files.length === 0 ? external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6682\u65E0 TODO \u9879") : external_window_React_default.a.createElement("table", null, external_window_React_default.a.createElement("tbody", null, this.state.files.map(function (file, index) {
        return external_window_React_default.a.createElement("tr", {
          key: index
        }, _this4.renderMessages(file));
      })))));
    }
  }]);

  return Todo;
}(external_window_React_["Component"]), Todo_class2.extensionName = 'todo', Todo_temp)) || Todo_class) || Todo_class);
/* harmony default export */ var ProjectDashboard_Todo = (ProjectDashboard_PluginHoc(Todo_Todo));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/dialog/index.js
var lib_dialog = __webpack_require__(24);
var dialog_default = /*#__PURE__*/__webpack_require__.n(lib_dialog);

// EXTERNAL MODULE: ./renderer/node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(1195);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/notification/lib/index.js
var notification_lib = __webpack_require__(44);
var notification_lib_default = /*#__PURE__*/__webpack_require__.n(notification_lib);

// EXTERNAL MODULE: ./renderer/node_modules/lodash.orderby/index.js
var lodash_orderby = __webpack_require__(1196);
var lodash_orderby_default = /*#__PURE__*/__webpack_require__.n(lodash_orderby);

// CONCATENATED MODULE: ./renderer/node_modules/vscode-uri/lib/esm/index.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isWindows;
if (typeof process === 'object') {
    isWindows = process.platform === 'win32';
}
else if (typeof navigator === 'object') {
    var userAgent = navigator.userAgent;
    isWindows = userAgent.indexOf('Windows') >= 0;
}
//#endregion
var _schemePattern = /^\w[\w\d+.-]*$/;
var _singleSlashStart = /^\//;
var _doubleSlashStart = /^\/\//;
function _validateUri(ret) {
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
var _empty = '';
var _slash = '/';
var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 */
var URI = (function () {
    /**
     * @internal
     */
    function URI(schemeOrData, authority, path, query, fragment) {
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = schemeOrData || _empty;
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this);
        }
    }
    URI.isUri = function (thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string'
            && typeof thing.fragment === 'string'
            && typeof thing.path === 'string'
            && typeof thing.query === 'string'
            && typeof thing.scheme === 'string';
    };
    Object.defineProperty(URI.prototype, "fsPath", {
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
         * platform specific path separator.
         *
         * * Will *not* validate the path for invalid characters and semantics.
         * * Will *not* look at the scheme of this URI.
         * * The result shall *not* be used for display purposes but for accessing a file on disk.
         *
         *
         * The *difference* to `URI#path` is the use of the platform specific separator and the handling
         * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
         *
         * ```ts
            const u = URI.parse('file://server/c$/folder/file.txt')
            u.authority === 'server'
            u.path === '/shares/c$/file.txt'
            u.fsPath === '\\server\c$\folder\file.txt'
        ```
         *
         * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
         * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
         * with URIs that represent files on disk (`file` scheme).
         */
        get: function () {
            // if (this.scheme !== 'file') {
            // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
            // }
            return _makeFsPath(this);
        },
        enumerable: true,
        configurable: true
    });
    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
        if (!change) {
            return this;
        }
        var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
        if (scheme === void 0) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === void 0) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === void 0) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === void 0) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === void 0) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new _URI(scheme, authority, path, query, fragment);
    };
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    URI.parse = function (value) {
        var match = _regexp.exec(value);
        if (!match) {
            return new _URI(_empty, _empty, _empty, _empty, _empty);
        }
        return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty), decodeURIComponent(match[7] || _empty), decodeURIComponent(match[9] || _empty));
    };
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';

    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    URI.file = function (path) {
        var authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            var idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new _URI('file', authority, path, _empty, _empty);
    };
    URI.from = function (components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string presentation for this URI. It's guardeed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        return _asFormatted(this, skipEncoding);
    };
    URI.prototype.toJSON = function () {
        return this;
    };
    URI.revive = function (data) {
        if (!data) {
            return data;
        }
        else if (data instanceof URI) {
            return data;
        }
        else {
            var result = new _URI(data);
            result._fsPath = data.fsPath;
            result._formatted = data.external;
            return result;
        }
    };
    return URI;
}());
/* harmony default export */ var esm = (URI);
// tslint:disable-next-line:class-name
var _URI = (function (_super) {
    __extends(_URI, _super);
    function _URI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._formatted = null;
        _this._fsPath = null;
        return _this;
    }
    Object.defineProperty(_URI.prototype, "fsPath", {
        get: function () {
            if (!this._fsPath) {
                this._fsPath = _makeFsPath(this);
            }
            return this._fsPath;
        },
        enumerable: true,
        configurable: true
    });
    _URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    };
    _URI.prototype.toJSON = function () {
        var res = {
            $mid: 1
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        // uri components
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    };
    return _URI;
}(URI));
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
var encodeTable = (_a = {},
    _a[58 /* Colon */] = '%3A',
    _a[47 /* Slash */] = '%2F',
    _a[63 /* QuestionMark */] = '%3F',
    _a[35 /* Hash */] = '%23',
    _a[91 /* OpenSquareBracket */] = '%5B',
    _a[93 /* CloseSquareBracket */] = '%5D',
    _a[64 /* AtSign */] = '%40',
    _a[33 /* ExclamationMark */] = '%21',
    _a[36 /* DollarSign */] = '%24',
    _a[38 /* Ampersand */] = '%26',
    _a[39 /* SingleQuote */] = '%27',
    _a[40 /* OpenParen */] = '%28',
    _a[41 /* CloseParen */] = '%29',
    _a[42 /* Asterisk */] = '%2A',
    _a[43 /* Plus */] = '%2B',
    _a[44 /* Comma */] = '%2C',
    _a[59 /* Semicolon */] = '%3B',
    _a[61 /* Equals */] = '%3D',
    _a[32 /* Space */] = '%20',
    _a);
function encodeURIComponentFast(uriComponent, allowSlash) {
    var res = undefined;
    var nativeEncodePos = -1;
    for (var pos = 0; pos < uriComponent.length; pos++) {
        var code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= 97 /* a */ && code <= 122 /* z */)
            || (code >= 65 /* A */ && code <= 90 /* Z */)
            || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
            || code === 45 /* Dash */
            || code === 46 /* Period */
            || code === 95 /* Underline */
            || code === 126 /* Tilde */
            || (allowSlash && code === 47 /* Slash */)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            var escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
function encodeURIComponentMinimal(path) {
    var res = undefined;
    for (var pos = 0; pos < path.length; pos++) {
        var code = path.charCodeAt(pos);
        if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 * @param uri
 */
function _makeFsPath(uri) {
    var value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = "//" + uri.authority + uri.path;
    }
    else if (uri.path.charCodeAt(0) === 47 /* Slash */
        && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
        && uri.path.charCodeAt(2) === 58 /* Colon */) {
        // windows drive letter: file:///c:/far/boo
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
    }
    else {
        // other path
        value = uri.path;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    var res = '';
    var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        var idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            var userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(':');
        if (idx === -1) {
            res += encoder(authority, false);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
            var code = path.charCodeAt(1);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
            var code = path.charCodeAt(0);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true);
    }
    if (query) {
        res += '?';
        res += encoder(query, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
}
var _a;

// EXTERNAL MODULE: ./renderer/src/pages/Home/ProjectDashboard/Pages/index.scss
var Pages = __webpack_require__(1197);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Pages/index.jsx


var Pages_dec, Pages_class, Pages_class2, Pages_temp;

function Pages_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Pages_typeof = function _typeof(obj) { return typeof obj; }; } else { Pages_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Pages_typeof(obj); }

function Pages_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Pages_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Pages_createClass(Constructor, protoProps, staticProps) { if (protoProps) Pages_defineProperties(Constructor.prototype, protoProps); if (staticProps) Pages_defineProperties(Constructor, staticProps); return Constructor; }

function Pages_possibleConstructorReturn(self, call) { if (call && (Pages_typeof(call) === "object" || typeof call === "function")) { return call; } return Pages_assertThisInitialized(self); }

function Pages_getPrototypeOf(o) { Pages_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Pages_getPrototypeOf(o); }

function Pages_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Pages_setPrototypeOf(subClass, superClass); }

function Pages_setPrototypeOf(o, p) { Pages_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Pages_setPrototypeOf(o, p); }

function Pages_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * 获取当前页面项目的所有 page
 */
















var scaffolder = services["a" /* default */].scaffolder,
    editors = services["a" /* default */].editors,
    settings = services["a" /* default */].settings;



function formatDate(date) {
  return dayjs_min_default()(date).format('YYYY-MM-DD hh:mm');
}

function recursivePagesSync(dirPath, rootDir) {
  var list = [];
  var stats;
  var files = Object(file_system["a" /* readdirSync */])(dirPath);
  files.forEach(function (file) {
    var fullPath = external_path_default.a.join(dirPath, file);
    stats = external_fs_default.a.lstatSync(fullPath);

    if (stats.isDirectory()) {
      var _stats = stats,
          atime = _stats.atime,
          birthtime = _stats.birthtime,
          ctime = _stats.ctime,
          mtime = _stats.mtime;
      list.push({
        name: external_path_default.a.relative(rootDir, fullPath),
        fullPath: fullPath,
        atime: formatDate(atime),
        birthtime: formatDate(birthtime),
        ctime: formatDate(ctime),
        mtime: formatDate(mtime)
      });
    }
  });
  return list;
}

var Pages_PagesCard = (Pages_dec = Object(index_module["b" /* inject */])('projects', 'newpage', 'pageBlockPicker'), Pages_dec(Pages_class = Object(index_module["c" /* observer */])(Pages_class = (Pages_temp = Pages_class2 =
/*#__PURE__*/
function (_Component) {
  Pages_inherits(PagesCard, _Component);

  function PagesCard(props) {
    var _this;

    Pages_classCallCheck(this, PagesCard);

    _this = Pages_possibleConstructorReturn(this, Pages_getPrototypeOf(PagesCard).call(this, props));

    _this.serachPages = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;

      if (currentProject && currentProject.fullPath) {
        var pagesDirectory = external_path_default.a.join(currentProject.clientSrcPath, 'pages');
        var pages = recursivePagesSync(pagesDirectory, pagesDirectory);

        _this.setState({
          pages: pages
        });
      } else {
        _this.setState({
          pages: []
        });
      }
    };

    _this.handleCreatePage = function () {
      var projects = _this.props.projects;

      _this.props.newpage.toggle();
    };

    _this.handleOpenEditor = function (fileName) {
      var editor = settings.get('editor');
      var projects = _this.props.projects;
      var uriFolder = "".concat(projects.currentProject.fullPath);
      var uriFile = "".concat(projects.currentProject.fullPath, "/src/pages/").concat(fileName, "/").concat(fileName, ".jsx");

      if (!external_fs_default.a.existsSync(uriFile)) {
        uriFile = "".concat(projects.currentProject.fullPath, "/src/pages/").concat(fileName, "/index.js");
      }

      if (editor === 'VisualStudioCode') {
        uriFolder = esm.file(uriFolder).toString();
        uriFile = esm.file(uriFile).toString();

        _this.editorOpenFile(uriFolder, uriFile, ['--folder-uri'], ['--file-uri']);
      } else {
        _this.editorOpenFile(uriFolder, uriFile);
      }
    };

    _this.editorOpenFile = function (folder, file) {
      var folderOpt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var fileOpt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      editors.open(folder, folderOpt, false);
      setTimeout(function () {
        editors.open(file, fileOpt, false);
      }, 1000);
    };

    _this.handlePageDelete = function (name) {
      var _this$props = _this.props,
          projects = _this$props.projects,
          newpage = _this$props.newpage;
      var currentProject = projects.currentProject;

      dialog_default.a.confirm({
        title: '删除页面',
        content: "\u786E\u5B9A\u5220\u9664\u9875\u9762 ".concat(name, " \u5417\uFF1F"),
        onOk: function onOk() {
          scaffolder.removePage({
            clientSrcPath: currentProject.clientSrcPath,
            pageFolderName: name
          }).then(function () {
            logger.debug('删除页面成功');
            notification_lib_default.a.success({
              message: "\u5220\u9664\u9875\u9762 ".concat(name, " \u6210\u529F")
            });

            _this.serachPages();
          }).catch(function (error) {
            logger.debug('删除页面失败', error);
            components_dialog["a" /* default */].notice({
              title: '删除页面失败',
              error: error
            });
          });
        }
      });
    };

    _this.renderPageList = function () {
      var pages = _this.state.pages;
      var editor = settings.get('editor');

      if (pages && pages.length === 0) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6682\u65E0\u9875\u9762");
      } // 按时间倒叙


      var pagesOrderByTime = lodash_orderby_default()(pages, ['birthtime'], ['desc']);
      return pagesOrderByTime.map(function (page) {
        if (page.name === 'IceworksPreviewPage') {
          return null;
        }

        return external_window_React_default.a.createElement("div", {
          className: "page-item",
          key: page.name,
          "data-path": page.fullPath
        }, editor === 'VisualStudioCode' || editor === 'SublimeText' ? external_window_React_default.a.createElement("a", {
          className: "page-item-name",
          onClick: function onClick() {
            _this.handleOpenEditor(page.name);
          }
        }, page.name) : external_window_React_default.a.createElement("div", null, page.name), external_window_React_default.a.createElement("div", {
          className: "operational"
        }, external_window_React_default.a.createElement("span", {
          className: "page-creat-time"
        }, page.birthtime), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
          style: {
            color: '#3080FE'
          },
          placement: 'top',
          tipText: "\u6DFB\u52A0\u533A\u5757",
          onClick: _this.handlePageAddBlock.bind(Pages_assertThisInitialized(Pages_assertThisInitialized(_this)), page.fullPath, page.name)
        }, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: "block-add"
        })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
          style: {
            color: '#3080FE'
          },
          placement: 'top',
          tipText: "\u5220\u9664\u9875\u9762",
          onClick: _this.handlePageDelete.bind(Pages_assertThisInitialized(Pages_assertThisInitialized(_this)), page.name)
        }, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: "trash"
        }))));
      });
    };

    _this.state = {
      pages: []
    };
    return _this;
  }

  Pages_createClass(PagesCard, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.serachPages();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      external_electron_["ipcRenderer"].on('focus', this.serachPages);
      this.props.projects.on('change', this.serachPages);
      this.props.newpage.on('generate-page-success', this.serachPages);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      external_electron_["ipcRenderer"].removeListener('focus', this.serachPages);
      this.props.projects.removeListener('change', this.serachPages);
      this.props.newpage.removeListener('generate-page-success', this.serachPages);
    }
  }, {
    key: "handlePageAddBlock",
    value: function handlePageAddBlock(fullPath, name) {
      // todo 增加 block 到指定页面中
      this.props.pageBlockPicker.open({
        blocksPath: fullPath,
        projectPath: this.props.projects.currentProject.fullPath,
        pageName: name
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pages = this.state.pages;
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "\u9875\u9762\u5217\u8868", external_window_React_default.a.createElement("span", {
        style: {
          paddingLeft: 10,
          fontSize: 12,
          color: '#666'
        }
      }, "(", pages.length, ")")), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '刷新',
        onClick: this.serachPages
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '新建页面',
        onClick: this.handleCreatePage
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "plus-o",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.renderPageList()));
    }
  }]);

  return PagesCard;
}(external_window_React_["Component"]), Pages_class2.extensionName = 'pages', Pages_temp)) || Pages_class) || Pages_class);
/* harmony default export */ var ProjectDashboard_Pages = (ProjectDashboard_PluginHoc(Pages_PagesCard));
// EXTERNAL MODULE: ./node_modules/uppercamelcase/index.js
var uppercamelcase = __webpack_require__(77);
var uppercamelcase_default = /*#__PURE__*/__webpack_require__.n(uppercamelcase);

// EXTERNAL MODULE: ./renderer/src/components/Chrome/index.jsx
var Chrome = __webpack_require__(792);

// EXTERNAL MODULE: ./renderer/src/components/CustomScaffold/Attribute.jsx
var Attribute = __webpack_require__(707);

// EXTERNAL MODULE: ./renderer/src/components/Scaffold/Preview.jsx
var Preview = __webpack_require__(740);

// EXTERNAL MODULE: ./renderer/src/datacenter/scanLayout.js
var scanLayout = __webpack_require__(234);

// EXTERNAL MODULE: ./renderer/src/pages/Home/ProjectDashboard/Layouts/Layouts.scss
var Layouts = __webpack_require__(1198);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Layouts/index.jsx



var Layouts_dec, Layouts_class, Layouts_class2, Layouts_temp;

function Layouts_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Layouts_typeof = function _typeof(obj) { return typeof obj; }; } else { Layouts_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Layouts_typeof(obj); }

function Layouts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Layouts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Layouts_createClass(Constructor, protoProps, staticProps) { if (protoProps) Layouts_defineProperties(Constructor.prototype, protoProps); if (staticProps) Layouts_defineProperties(Constructor, staticProps); return Constructor; }

function Layouts_possibleConstructorReturn(self, call) { if (call && (Layouts_typeof(call) === "object" || typeof call === "function")) { return call; } return Layouts_assertThisInitialized(self); }

function Layouts_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Layouts_getPrototypeOf(o) { Layouts_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Layouts_getPrototypeOf(o); }

function Layouts_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Layouts_setPrototypeOf(subClass, superClass); }

function Layouts_setPrototypeOf(o, p) { Layouts_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Layouts_setPrototypeOf(o, p); }








 // import ExtraButton from '../../../../components/ExtraButton';
// import Icon from '../../../../components/Icon';







var templateBuilderUtils = services["a" /* default */].templateBuilderUtils;

var Layouts_LayoutBuilder = (Layouts_dec = Object(index_module["b" /* inject */])('projects'), Layouts_dec(Layouts_class = Object(index_module["c" /* observer */])(Layouts_class = (Layouts_temp = Layouts_class2 =
/*#__PURE__*/
function (_Component) {
  Layouts_inherits(LayoutBuilder, _Component);

  function LayoutBuilder(props) {
    var _this;

    Layouts_classCallCheck(this, LayoutBuilder);

    _this = Layouts_possibleConstructorReturn(this, Layouts_getPrototypeOf(LayoutBuilder).call(this, props));

    _this.handleLayoutConfigChange = function (value) {
      _this.setState({
        layoutConfig: value
      });
    };

    _this.getLayoutConfig = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;
      var themeConfig = {
        theme: 'dark',
        primaryColor: '#3080FE',
        secondaryColor: '#FFC107'
      };

      if (currentProject) {
        var pkgData = currentProject.getPkgData();

        if (pkgData && pkgData.themeConfig) {
          themeConfig = pkgData.themeConfig;
        }
      }

      var DEFAULT_LAYOUT_CONFIG = {
        name: '',
        directory: '',
        enableName: true,
        enableTheme: false,
        themeConfig: themeConfig,
        layout: 'fluid-layout',
        header: {
          position: 'static',
          width: 'full-width',
          enabled: true
        },
        aside: {
          position: 'embed-fixed',
          mode: 'vertical',
          width: 200,
          collapsed: false,
          enabled: true
        },
        footer: {
          position: 'fixed',
          width: 'full-width',
          enabled: true
        }
      };
      return DEFAULT_LAYOUT_CONFIG;
    };

    _this.freshLayoutList = function () {
      var projects = _this.props.projects;
      var currentProject = projects.currentProject;

      if (currentProject && currentProject.fullPath) {
        var targetPath = currentProject.clientSrcPath;
        Object(scanLayout["a" /* default */])({
          targetPath: targetPath
        }).then(function (layouts) {
          _this.setState({
            localLayouts: layouts,
            scaning: false,
            layoutValidate: scanLayout["a" /* default */].layoutValidate(targetPath)
          });
        });
      }
    };

    _this.renderLayoutList = function () {
      var _this$state = _this.state,
          localLayouts = _this$state.localLayouts,
          scaning = _this$state.scaning,
          layoutValidate = _this$state.layoutValidate;

      if (scaning) {
        return external_window_React_default.a.createElement("div", null, "\u626B\u63CF\u4E2D...");
      }

      if (!layoutValidate) {
        return external_window_React_default.a.createElement("div", null, "\u6682\u65E0\u5E03\u5C40");
      }

      if (Array.isArray(localLayouts) && localLayouts.length > 0) {
        return localLayouts.map(function (layout, idx) {
          return external_window_React_default.a.createElement("div", {
            className: "layout-item",
            key: uppercamelcase_default()(layout.name) + idx
          }, external_window_React_default.a.createElement("div", {
            className: "name"
          }, uppercamelcase_default()(layout.name)), external_window_React_default.a.createElement("div", {
            className: "title",
            title: layout.customLayout ? '' : layout.title
          }, layout.customLayout ? '自定义布局' : layout.title));
        });
      } else {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6682\u65E0\u5E03\u5C40");
      }
    };

    _this.showDialog = function () {
      var layoutConfig = _this.getLayoutConfig();

      _this.setState({
        layoutConfig: layoutConfig,
        dialogVisible: true
      });
    };

    _this.hideDialog = function () {
      _this.setState({
        dialogVisible: false
      });
    };

    _this.createCustomLayout = function () {
      var layoutConfig = _this.state.layoutConfig;
      var currentProject = _this.props.projects.currentProject;

      if (!layoutConfig.name || layoutConfig.name.trim() === '') {
        feedback_default.a.toast.error('请输入布局名称');

        return false;
      }

      var layoutName = layoutConfig.name.trim();

      if (!/^[a-z]/i.test(layoutName)) {
        feedback_default.a.toast.error('布局名称须为字母开头');

        return false;
      }

      if (currentProject) {
        var currentPath = currentProject.clientPath;
        layoutConfig.directory = currentPath;
        templateBuilderUtils.generatorLayout(layoutConfig).then(function (layouDeps) {
          lib_logger["a" /* default */].info('新增布局用到的依赖', layouDeps);
          return Promise.resolve({
            currentPath: currentPath,
            layoutConfig: layoutConfig
          });
        }).then(function () {
          feedback_default.a.toast.success("".concat(layoutConfig.name, " \u81EA\u5B9A\u4E49\u5E03\u5C40\u751F\u6210\u6210\u529F"));

          _this.hideDialog();
        }).catch(function (e) {
          lib_logger["a" /* default */].error(e);

          feedback_default.a.toast.error("".concat(layoutConfig.name, " \u81EA\u5B9A\u4E49\u5E03\u5C40\u751F\u6210\u5931\u8D25, ").concat(e.message));

          _this.hideDialog();
        });
      } else {
        _this.hideDialog();

        feedback_default.a.toast.error('当前项目不存在');

        lib_logger["a" /* default */].error(new Error('项目不存在'));
      }
    };

    _this.renderShowCase = function () {
      return external_window_React_default.a.createElement(Chrome["a" /* default */], null, external_window_React_default.a.createElement(Preview["a" /* default */], {
        layoutConfig: _this.state.layoutConfig
      }));
    };

    _this.renderDialog = function () {
      var dialogVisible = _this.state.dialogVisible;
      return external_window_React_default.a.createElement(dialog_default.a, {
        style: {
          minWidth: '400px'
        },
        visible: dialogVisible,
        onOk: _this.createCustomLayout,
        onCancel: _this.hideDialog,
        onClose: _this.hideDialog,
        isFullScreen: true
      }, external_window_React_default.a.createElement("div", {
        style: {
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: '20px'
        }
      }, "\u65B0\u5EFA\u5E03\u5C40"), external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row'
        }
      }, external_window_React_default.a.createElement(Attribute["a" /* default */], {
        onChange: _this.handleLayoutConfigChange,
        layoutConfig: _this.state.layoutConfig
      }), external_window_React_default.a.createElement("div", {
        style: {
          paddingLeft: 20
        }
      }, _this.renderShowCase())));
    };

    _this.state = {
      localLayouts: [],
      scaning: true,
      dialogVisible: false,
      layoutValidate: false,
      layoutConfig: _this.getLayoutConfig()
    };
    return _this;
  }

  Layouts_createClass(LayoutBuilder, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.freshLayoutList();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      external_electron_["ipcRenderer"].on('focus', this.freshLayoutList);
      this.props.projects.on('change', this.freshLayoutList);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      external_electron_["ipcRenderer"].removeListener('focus', this.freshLayoutList);
      this.props.projects.removeListener('change', this.freshLayoutList);
    }
  }, {
    key: "render",
    value: function render() {
      var currentProject = this.props.projects.currentProject;
      var applicationType;

      if (currentProject) {
        applicationType = currentProject.getApplicationType();
      }

      return external_window_React_default.a.createElement(src_components_DashboardCard, null, this.renderDialog(), external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "\u5E03\u5C40\u5217\u8868", external_window_React_default.a.createElement("span", {
        style: {
          paddingLeft: 10,
          fontSize: 12,
          color: '#666'
        }
      }, "(", this.state.localLayouts.length, ")"))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.renderLayoutList()));
    }
  }]);

  return LayoutBuilder;
}(external_window_React_["Component"]), Layouts_class2.extensionName = 'layout-builder', Layouts_temp)) || Layouts_class) || Layouts_class);
/* harmony default export */ var ProjectDashboard_Layouts = (ProjectDashboard_PluginHoc(Layouts_LayoutBuilder));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/checkbox/index.js
var lib_checkbox = __webpack_require__(671);
var checkbox_default = /*#__PURE__*/__webpack_require__.n(lib_checkbox);

// EXTERNAL MODULE: ./renderer/node_modules/deepcopy/index.js
var deepcopy = __webpack_require__(773);
var deepcopy_default = /*#__PURE__*/__webpack_require__.n(deepcopy);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Proxies/index.jsx






var Proxies_dec, Proxies_class, Proxies_class2, Proxies_temp;

function Proxies_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Proxies_typeof = function _typeof(obj) { return typeof obj; }; } else { Proxies_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Proxies_typeof(obj); }

function Proxies_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Proxies_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Proxies_createClass(Constructor, protoProps, staticProps) { if (protoProps) Proxies_defineProperties(Constructor.prototype, protoProps); if (staticProps) Proxies_defineProperties(Constructor, staticProps); return Constructor; }

function Proxies_possibleConstructorReturn(self, call) { if (call && (Proxies_typeof(call) === "object" || typeof call === "function")) { return call; } return Proxies_assertThisInitialized(self); }

function Proxies_getPrototypeOf(o) { Proxies_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Proxies_getPrototypeOf(o); }

function Proxies_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Proxies_setPrototypeOf(subClass, superClass); }

function Proxies_setPrototypeOf(o, p) { Proxies_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Proxies_setPrototypeOf(o, p); }

function Proxies_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Proxies_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Proxies_defineProperty(target, key, source[key]); }); } return target; }

function Proxies_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Proxies_slicedToArray(arr, i) { return Proxies_arrayWithHoles(arr) || Proxies_iterableToArrayLimit(arr, i) || Proxies_nonIterableRest(); }

function Proxies_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Proxies_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Proxies_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var newRuleItem = ['', {
  enable: true
}];

Object.fromEntries = function (array) {
  return array.reduce(function (obj, _ref) {
    var _ref2 = Proxies_slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return Proxies_objectSpread({}, obj, Proxies_defineProperty({}, k, v));
  }, {});
};

var Proxies_Proxies = (Proxies_dec = Object(index_module["b" /* inject */])('projects', 'newpage', 'pageBlockPicker'), Proxies_dec(Proxies_class = Object(index_module["c" /* observer */])(Proxies_class = (Proxies_temp = Proxies_class2 =
/*#__PURE__*/
function (_Component) {
  Proxies_inherits(Proxies, _Component);

  function Proxies(props) {
    var _this;

    Proxies_classCallCheck(this, Proxies);

    _this = Proxies_possibleConstructorReturn(this, Proxies_getPrototypeOf(Proxies).call(this, props));

    _this.readProxyConfig = function () {
      var currentProject = _this.props.projects.currentProject;

      if (currentProject) {
        var pkgFilePath = external_path_default.a.join(currentProject.clientPath, 'package.json');

        try {
          var pkgData = external_fs_default.a.readFileSync(pkgFilePath);
          pkgData = JSON.parse(pkgData.toString());
          var proxyConfig = pkgData.proxyConfig || {};
          var proxyConfigRules = Object.entries(proxyConfig).map(function (_ref3) {
            var _ref4 = Proxies_slicedToArray(_ref3, 2),
                rule = _ref4[0],
                options = _ref4[1];

            if (typeof options === 'string') {
              return [rule, {
                target: options,
                enable: true
              }];
            }

            return [rule, Proxies_objectSpread({}, options)];
          });

          _this.setState({
            proxyConfig: proxyConfig,
            proxyConfigRules: proxyConfigRules
          });
        } catch (e) {}
      }
    };

    _this.writeProxyConfig = function (proxyConfig, cb) {
      var currentProject = _this.props.projects.currentProject;

      if (currentProject) {
        var pkgFilePath = external_path_default.a.join(currentProject.clientPath, 'package.json');

        try {
          var pkgData = external_fs_default.a.readFileSync(pkgFilePath);
          pkgData = JSON.parse(pkgData.toString());
          pkgData.proxyConfig = proxyConfig;
          external_fs_default.a.writeFile(pkgFilePath, JSON.stringify(pkgData, null, 2), cb);
        } catch (e) {
          lib_logger["a" /* default */].error(pkgFilePath + ' 不存在');
        }
      }
    };

    _this.handleModifyRules = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleClose = function () {
      _this.setState({
        proxyConfigRules: Object.entries(_this.state.proxyConfig),
        visible: false
      });
    };

    _this.handleChangeRule = function (index, value) {
      _this.setState(function (state) {
        state.proxyConfigRules[index][0] = value;
        return {
          proxyConfigRules: state.proxyConfigRules
        };
      });
    };

    _this.handleChangeEnable = function (index, value) {
      _this.setState(function (state) {
        state.proxyConfigRules[index][1].enable = value;
        return {
          proxyConfigRules: state.proxyConfigRules
        };
      });
    };

    _this.handleChangeRuleTarget = function (index, value) {
      _this.setState(function (state) {
        state.proxyConfigRules[index][1].target = value;
        return {
          proxyConfigRules: state.proxyConfigRules
        };
      });
    };

    _this.handleAddRule = function () {
      _this.setState(function (state) {
        state.proxyConfigRules.push(deepcopy_default()(newRuleItem));
        return {
          proxyConfigRules: state.proxyConfigRules
        };
      });
    };

    _this.handleDeleteRule = function (index) {
      _this.setState(function (state) {
        state.proxyConfigRules.splice(index, 1);
        return {
          proxyConfigRules: state.proxyConfigRules
        };
      });
    };

    _this.handleSaveProxy = function () {
      var proxyConfigRules = _this.state.proxyConfigRules;
      proxyConfigRules = proxyConfigRules.filter(function (_ref5) {
        var _ref6 = Proxies_slicedToArray(_ref5, 2),
            rule = _ref6[0],
            options = _ref6[1];

        return rule && options.target && rule !== '' && options.target !== '';
      });
      var proxyConfig = Object.fromEntries(proxyConfigRules);

      _this.writeProxyConfig(proxyConfig, function (error) {
        if (!error) {
          feedback_default.a.toast.success('代理配置修改成功，重启调试服务使代理生效');

          _this.setState({
            proxyConfig: proxyConfig,
            proxyConfigRules: proxyConfigRules,
            visible: false
          });
        } else {
          feedback_default.a.toast.error('代理配置修改失败');
        }
      });
    };

    _this.renderProxyConfig = function () {
      var proxyConfig = _this.state.proxyConfig;
      var proxyRules = Object.keys(proxyConfig);

      if (proxyConfig && proxyRules.length > 0) {
        return external_window_React_default.a.createElement("table", {
          style: Proxies_styles.table
        }, external_window_React_default.a.createElement("thead", null, external_window_React_default.a.createElement("tr", null, external_window_React_default.a.createElement("th", {
          style: Proxies_styles.th
        }, "\u542F\u7528"), external_window_React_default.a.createElement("th", {
          style: Proxies_styles.th
        }, "\u5339\u914D\u89C4\u5219"), external_window_React_default.a.createElement("th", {
          style: Proxies_styles.th
        }, "\u4EE3\u7406\u76EE\u6807\u5730\u5740"))), external_window_React_default.a.createElement("tbody", null, proxyRules.map(function (rule, index) {
          return external_window_React_default.a.createElement("tr", {
            key: index
          }, external_window_React_default.a.createElement("td", {
            style: Proxies_styles.td
          }, proxyConfig[rule].enable ? 'Y' : 'N'), external_window_React_default.a.createElement("td", {
            style: Proxies_styles.td
          }, rule), external_window_React_default.a.createElement("td", {
            style: Proxies_styles.td
          }, proxyConfig[rule].target));
        })));
      } else {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u6682\u65E0\u4EE3\u7406\u914D\u7F6E");
      }
    };

    _this.renderProxyForm = function () {
      var proxyConfigRules = _this.state.proxyConfigRules;

      if (Array.isArray(proxyConfigRules) && proxyConfigRules.length === 0) {
        proxyConfigRules.push(deepcopy_default()(newRuleItem));
      }

      return external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("div", {
        style: Proxies_styles.ruleItem
      }, external_window_React_default.a.createElement("div", {
        style: Proxies_styles.ruleEnable
      }, "\u542F\u7528"), external_window_React_default.a.createElement("div", {
        style: Proxies_styles.rule
      }, "\u5339\u914D\u89C4\u5219", external_window_React_default.a.createElement(es["default"], {
        placement: "top",
        overlay: external_window_React_default.a.createElement("div", {
          style: {
            maxWidth: 300
          }
        }, external_window_React_default.a.createElement("dl", {
          style: {
            margin: 0,
            padding: 0
          }
        }, external_window_React_default.a.createElement("dt", {
          style: {
            fontSize: 14,
            padding: '5px 0'
          }
        }, "\u89C4\u5219\u8BF4\u660E"), external_window_React_default.a.createElement("dd", {
          style: {
            color: '#aaa',
            lineHeight: '20px',
            margin: 0
          }
        }, "`/**` \u8868\u793A\u5339\u914D\u6240\u6709\u8BF7\u6C42\u3002"), external_window_React_default.a.createElement("dd", {
          style: {
            color: '#aaa',
            lineHeight: '20px',
            margin: 0
          }
        }, "`/api/**` \u8868\u793A\u5339\u914D\u6240\u6709\u8D77\u59CB\u8DEF\u5F84\u4E3A `/api` \u7684\u8BF7\u6C42\u3002"), external_window_React_default.a.createElement("dt", {
          style: {
            fontSize: 14,
            padding: '5px 0'
          }
        }, "\u76EE\u6807\u5730\u5740\u8BF4\u660E"), external_window_React_default.a.createElement("dd", {
          style: {
            color: '#aaa',
            lineHeight: '20px',
            margin: 0
          }
        }, "\u5339\u914D\u8DEF\u5F84\u540E\u7684\u8BF7\u6C42\u5C06\u5B9E\u9645\u4EE5\u76EE\u6807\u5730\u5740 + \u539F\u8BF7\u6C42\u5730\u5740\u53D1\u9001\u8BF7\u6C42\u3002"), external_window_React_default.a.createElement("dd", {
          style: {
            color: '#aaa',
            lineHeight: '20px',
            margin: 0
          }
        }, "\u4F8B\u5982\uFF1A\u5339\u914D\u89C4\u5219\u4E3A `/**` \u76EE\u6807\u5730\u5740\u4E3A `http://127.0.0.1:7001`\uFF0C\u5F53\u53D1\u9001\u8BF7\u6C42 `/get/users` \u5219\u8BF7\u6C42\u5230 `http://127.0.0.1:7001/get/users`\u3002")))
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "help"
      }))), external_window_React_default.a.createElement("div", {
        style: Proxies_styles.ruleTarget
      }, "\u4EE3\u7406\u76EE\u6807\u5730\u5740"), external_window_React_default.a.createElement("div", {
        style: Proxies_styles.ruleBtns
      }, external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        type: "primary",
        onClick: _this.handleAddRule
      }, "\u65B0\u589E"))), proxyConfigRules.map(function (rule, index) {
        return external_window_React_default.a.createElement("div", {
          style: Proxies_styles.ruleItem,
          key: index
        }, external_window_React_default.a.createElement("div", {
          style: Proxies_styles.ruleEnable
        }, external_window_React_default.a.createElement(checkbox_default.a, {
          checked: rule[1].enable,
          placeholder: "/**",
          onChange: _this.handleChangeEnable.bind(Proxies_assertThisInitialized(Proxies_assertThisInitialized(_this)), index)
        })), external_window_React_default.a.createElement("div", {
          style: Proxies_styles.rule
        }, external_window_React_default.a.createElement(input_default.a, {
          style: {
            width: '100%'
          },
          value: rule[0],
          placeholder: "/**",
          onChange: _this.handleChangeRule.bind(Proxies_assertThisInitialized(Proxies_assertThisInitialized(_this)), index)
        })), external_window_React_default.a.createElement("div", {
          style: Proxies_styles.ruleTarget
        }, external_window_React_default.a.createElement(input_default.a, {
          style: {
            width: '100%'
          },
          value: rule[1].target,
          placeholder: "http://127.0.0.1:7001",
          onChange: _this.handleChangeRuleTarget.bind(Proxies_assertThisInitialized(Proxies_assertThisInitialized(_this)), index)
        })), external_window_React_default.a.createElement("div", {
          style: Proxies_styles.ruleBtns
        }, external_window_React_default.a.createElement(button_default.a, {
          size: "small",
          onClick: _this.handleDeleteRule.bind(Proxies_assertThisInitialized(Proxies_assertThisInitialized(_this)), index)
        }, "\u5220\u9664")));
      }));
    };

    _this.state = {
      visible: false,
      proxyConfig: {},
      proxyConfigRules: []
    };
    return _this;
  }

  Proxies_createClass(Proxies, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.readProxyConfig();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.projects.on('change', this.readProxyConfig);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.projects.removeListener('change', this.readProxyConfig);
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "\u4EE3\u7406\u914D\u7F6E"), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '刷新',
        onClick: this.readProxyConfig
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '修改代理规则',
        onClick: this.handleModifyRules
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "edit",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.renderProxyConfig(), external_window_React_default.a.createElement(dialog_default.a, {
        style: {
          width: '60%'
        },
        title: "\u81EA\u5B9A\u4E49\u4EE3\u7406\u914D\u7F6E",
        visible: this.state.visible,
        onClose: this.handleClose,
        onCancel: this.handleClose,
        footer: external_window_React_default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }
        }, external_window_React_default.a.createElement(button_default.a, {
          type: "primary",
          onClick: this.handleSaveProxy
        }, "\u4FDD\u5B58"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleClose
        }, "\u53D6\u6D88"))
      }, this.renderProxyForm())));
    }
  }]);

  return Proxies;
}(external_window_React_["Component"]), Proxies_class2.extensionName = 'proxies', Proxies_temp)) || Proxies_class) || Proxies_class);
var Proxies_styles = {
  table: {
    width: '100%'
  },
  th: {
    lineHeight: '24px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
    padding: '3px'
  },
  td: {
    lineHeight: '20px',
    borderBottom: '1px solid #eee',
    padding: '3px',
    color: '#666'
  },
  ruleItem: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rule: {
    width: '40%',
    flex: '0 0 40%',
    padding: '0 5px'
  },
  ruleEnable: {
    width: '40px',
    flex: '0 0 40px',
    padding: '0 5px',
    textAlign: 'center'
  },
  ruleTarget: {
    flex: 'auto',
    padding: '0 5px'
  },
  ruleBtns: {
    flex: '0 0 auto',
    padding: '0 0 0 5px'
  }
};
/* harmony default export */ var ProjectDashboard_Proxies = (ProjectDashboard_PluginHoc(Proxies_Proxies));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/balloon/index.js
var balloon = __webpack_require__(723);
var balloon_default = /*#__PURE__*/__webpack_require__.n(balloon);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/form-binder/lib/index.js
var form_binder_lib = __webpack_require__(689);

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(32);

// EXTERNAL MODULE: external "string_decoder"
var external_string_decoder_ = __webpack_require__(654);

// EXTERNAL MODULE: ./renderer/src/spc.js
var spc = __webpack_require__(313);

// EXTERNAL MODULE: ./renderer/src/stores/projects.js + 1 modules
var stores_projects = __webpack_require__(16);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Def/Client.js


function Client_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Client_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Client_createClass(Constructor, protoProps, staticProps) { if (protoProps) Client_defineProperties(Constructor.prototype, protoProps); if (staticProps) Client_defineProperties(Constructor, staticProps); return Constructor; }




/* eslint-disable */
var Client;

try {
  Client = external_electron_["remote"].require("unsupport-def");
} catch (e) {
  Client = {
    Client:
    /*#__PURE__*/
    function () {
      function A() {
        Client_classCallCheck(this, A);
      }

      Client_createClass(A, [{
        key: "on",
        value: function on() {}
      }, {
        key: "run",
        value: function run() {
          dialog_default.a.alert({
            title: '提示',
            content: external_window_React_default.a.createElement("div", {
              style: {
                width: 400
              }
            }, "\u7F3A\u5C11 DEF \u5BA2\u6237\u7AEF\u4F9D\u8D56\uFF0C\u8BF7\u67E5\u770B\u6587\u6863")
          });
        }
      }]);

      return A;
    }()
  };
}

/* harmony default export */ var Def_Client = (Client);
// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Def/index.jsx





var Def_dec, Def_class, Def_class2, Def_temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Def_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Def_typeof = function _typeof(obj) { return typeof obj; }; } else { Def_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Def_typeof(obj); }

function Def_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Def_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Def_createClass(Constructor, protoProps, staticProps) { if (protoProps) Def_defineProperties(Constructor.prototype, protoProps); if (staticProps) Def_defineProperties(Constructor, staticProps); return Constructor; }

function Def_possibleConstructorReturn(self, call) { if (call && (Def_typeof(call) === "object" || typeof call === "function")) { return call; } return Def_assertThisInitialized(self); }

function Def_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Def_getPrototypeOf(o) { Def_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Def_getPrototypeOf(o); }

function Def_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Def_setPrototypeOf(subClass, superClass); }

function Def_setPrototypeOf(o, p) { Def_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Def_setPrototypeOf(o, p); }

















var shared = services["a" /* default */].shared;
var decoder = new external_string_decoder_["StringDecoder"]('utf8');

var Def_ClientEmiter =
/*#__PURE__*/
function (_EventEmitter) {
  Def_inherits(ClientEmiter, _EventEmitter);

  function ClientEmiter() {
    var _this;

    Def_classCallCheck(this, ClientEmiter);

    _this = Def_possibleConstructorReturn(this, Def_getPrototypeOf(ClientEmiter).call(this));
    _this.cwdValue = '';
    return _this;
  }

  Def_createClass(ClientEmiter, [{
    key: "send",
    value: function send(data) {
      spc["default"].emit('session:data', {
        cwd: this.cwd,
        data: decoder.write(data)
      });
    }
  }, {
    key: "newline",
    value: function newline() {
      spc["default"].emit('session:newline', {
        cwd: this.cwd
      });
    }
  }, {
    key: "cwd",
    set: function set(value) {
      this.cwdValue = value;
    },
    get: function get() {
      return this.cwdValue;
    }
  }]);

  return ClientEmiter;
}(external_events_["EventEmitter"]);

var clientEmiter = new Def_ClientEmiter();
var client = new Def_Client.Client();
client.on('start', function () {
  var currentProject = stores_projects["a" /* default */].currentProject;

  if (currentProject) {
    currentProject.toggleTerminal();
  }

  clientEmiter.emit('start');
});
client.on('message', function (msg) {
  clientEmiter.send(msg + '\n\r');
});
client.on('build_message', function (msg) {
  clientEmiter.send(msg);
});
client.on('error', function (error) {
  clientEmiter.send('\r\n' + error.message);
  clientEmiter.emit('error', error);
});
client.on('success', function () {
  clientEmiter.newline();
  clientEmiter.emit('success');
});
var Def_Def = (Def_dec = Object(index_module["b" /* inject */])('projects', 'user', 'git'), Def_dec(Def_class = Object(index_module["c" /* observer */])(Def_class = (Def_temp = Def_class2 =
/*#__PURE__*/
function (_Component) {
  Def_inherits(Def, _Component);

  function Def(props) {
    var _this2;

    Def_classCallCheck(this, Def);

    _this2 = Def_possibleConstructorReturn(this, Def_getPrototypeOf(Def).call(this, props));

    _this2.getUserInfo = function () {
      var userValue = localStorage.getItem('login:user');
      var user;

      if (userValue) {
        try {
          user = JSON.parse(userValue);
        } catch (e) {}
      }

      return user;
    };

    _this2.handlePublishToDaily =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this2.cloudPublish('daily');

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              lib_logger["a" /* default */].error(_context.t0);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));
    _this2.handlePublishToProd =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this2.cloudPublish('prod');

            case 3:
              _context2.next = 8;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              lib_logger["a" /* default */].error(_context2.t0);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 5]]);
    }));

    _this2.confirmFilesIsCommit = function () {
      var currentProject = _this2.props.projects.currentProject;
      var trigger = external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "help",
        style: {
          marginLeft: '3px',
          fontSize: '14px'
        }
      });
      return new Promise(function (resolve, reject) {
        var dialog = dialog_default.a.confirm({
          needWrapper: false,
          title: '提示',
          content: external_window_React_default.a.createElement("div", {
            style: {
              textAlign: 'center',
              margin: '20px 10px',
              fontSize: '16px'
            }
          }, "\u5F53\u524D Git \u4ED3\u5E93\u672C\u5730\u6709\u672A\u63D0\u4EA4\u7684\u4EE3\u7801\uFF0C\u8BF7\u786E\u8BA4\u64CD\u4F5C"),
          footer: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(button_default.a, {
            onClick: function onClick() {
              resolve('git');
              dialog.hide();
            },
            type: "primary"
          }, "\u63D0\u4EA4\u5E76\u53D1\u5E03", external_window_React_default.a.createElement(balloon_default.a, {
            trigger: trigger,
            align: "b",
            alignment: "edge",
            style: {
              width: 600
            }
          }, external_window_React_default.a.createElement("div", {
            style: {
              margin: '0 0 10px 0',
              fontSize: '14px'
            }
          }, "Git \u63D0\u4EA4\u5C06\u6267\u884C\u4EE5\u4E0B\u64CD\u4F5C\uFF1A"), external_window_React_default.a.createElement("ul", null, external_window_React_default.a.createElement("li", null, external_window_React_default.a.createElement("i", null, "git add .")), external_window_React_default.a.createElement("li", null, external_window_React_default.a.createElement("i", null, "git commit -m 'chore: update ", currentProject.projectName, "'")), external_window_React_default.a.createElement("li", null, external_window_React_default.a.createElement("i", null, "git push"))))), external_window_React_default.a.createElement(button_default.a, {
            onClick: function onClick() {
              resolve(true);
              dialog.hide();
            }
          }, "\u76F4\u63A5\u53D1\u5E03"), external_window_React_default.a.createElement(button_default.a, {
            onClick: function onClick() {
              resolve(false);
              dialog.hide();
            }
          }, "\u53D6\u6D88"))
        });
      });
    };

    _this2.cloudPublish =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(target) {
        var _this2$props, projects, git, originRemote, currentBranch, status, user, lastCommit, currentProject, nextPublish, commitDone, pushDone;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this2$props = _this2.props, projects = _this2$props.projects, git = _this2$props.git;
                originRemote = git.originRemote, currentBranch = git.currentBranch, status = git.status;
                user = _this2.getUserInfo(); // 1. 检测是否登录

                if (!(!user || !user.workid)) {
                  _context3.next = 6;
                  break;
                }

                components_dialog["a" /* default */].confirm({
                  title: '请先登录内网账号！',
                  content: '是否立即登录，登录完成后请重新发布'
                }, function (ok) {
                  if (ok) {
                    _this2.props.user.open();
                  }
                });
                return _context3.abrupt("return");

              case 6:
                if (/[^\/]+\/\d+\.\d+\.\d+/i.test(currentBranch)) {
                  _context3.next = 9;
                  break;
                }

                feedback_default.a.toast.error('云构建要求分支名为： prefix/x.y.z 格式，例如：daily/1.0.0，请到 Git 插件变更分支');

                return _context3.abrupt("return");

              case 9:
                _context3.next = 11;
                return _this2.setState({
                  defPublishing: true
                });

              case 11:
                _context3.next = 13;
                return git.lastCommit();

              case 13:
                lastCommit = _context3.sent;

                if (lastCommit) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return");

              case 16:
                currentProject = projects.currentProject;

                if (!(target === 'daily')) {
                  _context3.next = 46;
                  break;
                }

                if (!(status && status.files && status.files.length > 0)) {
                  _context3.next = 37;
                  break;
                }

                _context3.next = 21;
                return _this2.confirmFilesIsCommit();

              case 21:
                nextPublish = _context3.sent;

                if (!(nextPublish === 'git')) {
                  _context3.next = 34;
                  break;
                }

                _context3.next = 25;
                return git.addAndCommit('.', "chore: update ".concat(currentProject.projectName));

              case 25:
                commitDone = _context3.sent;

                if (!commitDone) {
                  _context3.next = 30;
                  break;
                }

                git.checkIsRepo();
                _context3.next = 32;
                break;

              case 30:
                _this2.setState({
                  defPublishing: false
                });

                return _context3.abrupt("return");

              case 32:
                _context3.next = 37;
                break;

              case 34:
                if (nextPublish) {
                  _context3.next = 37;
                  break;
                }

                _this2.setState({
                  defPublishing: false
                });

                return _context3.abrupt("return");

              case 37:
                _context3.next = 39;
                return git.push();

              case 39:
                pushDone = _context3.sent;

                if (!pushDone) {
                  _context3.next = 44;
                  break;
                }

                notification_lib_default.a.success({
                  message: 'Git 推送代码成功',
                  duration: 8
                });
                _context3.next = 46;
                break;

              case 44:
                _this2.setState({
                  defPublishing: false
                });

                return _context3.abrupt("return");

              case 46:
                // eslint-disable-next-line
                lib_logger["a" /* default */].info(currentBranch, '提交完成，开始进入前端发布');
                client.run({
                  hideBuildMessage: true,
                  // eslint-disable-next-line
                  client_token: shared.defToken,
                  // 可找 @上坡(shangpo.zw)  @星弛(xingchi.mxc)
                  // eslint-disable-next-line
                  client_emp_id: user.workid,
                  target: target,
                  // daily: 资源发布日常环境，prod: 资源发布线上环境
                  repo: originRemote.refs.push,
                  // 仓库地址
                  branch: currentBranch,
                  // 仓库分支
                  // eslint-disable-next-line
                  commit_id: lastCommit.latest.hash,
                  // 当前发布的 commit id 值
                  env: shared.defEnv // (可选)DEF 发布系统的环境, daily: 日常，prepub: 预发，prod: 线上；联调时可使用

                });

                _this2.setState({
                  defPublishing: false
                }, function () {
                  git.checkIsRepo();
                });

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this2.renderBody = function () {
      var _this2$props2 = _this2.props,
          projects = _this2$props2.projects,
          git = _this2$props2.git;
      var currentProject = projects.currentProject;

      if (git.loading) {
        return external_window_React_default.a.createElement("div", null, "Loading");
      }

      if (git.showMainPanel) {
        return external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("div", {
          style: {
            paddingTop: 5,
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }, external_window_React_default.a.createElement("div", {
          style: {
            flex: 'auto',
            display: 'flex',
            flexDirection: 'flow',
            minHeight: 140
          }
        }, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: "tip",
          style: {
            color: 'rgb(48, 128, 254)',
            paddingRight: 10,
            position: 'relative',
            top: '14px'
          }
        }), external_window_React_default.a.createElement("div", {
          style: {
            color: '#aaa',
            fontSize: 14,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px'
          }
        }, external_window_React_default.a.createElement("p", null, "1. git \u64CD\u4F5C\u8BF7\u5728 Git \u63D2\u4EF6\u4E2D\u5904\u7406"), external_window_React_default.a.createElement("p", {
          style: {
            whiteSpace: 'initial'
          }
        }, "2. def \u53D1\u5E03\u8981\u6C42\u5206\u652F\u540D\u4E3A\uFF1A prefix/x.y.z\uFF0C\u4F8B\u5982\uFF1Adaily/1.0.0"))), external_window_React_default.a.createElement(button_default.a.Group, null, external_window_React_default.a.createElement(button_default.a, {
          size: "small",
          type: "secondary",
          onClick: _this2.handlePublishToDaily,
          loading: _this2.state.defPublishing,
          disabled: currentProject.statusCloudBuild === 'start'
        }, "\u65E5\u5E38\u53D1\u5E03"), external_window_React_default.a.createElement(button_default.a, {
          size: "small",
          type: "primary",
          onClick: _this2.handlePublishToProd,
          disabled: currentProject.statusCloudBuild === 'start'
        }, "\u6B63\u5F0F\u53D1\u5E03")), currentProject.statusCloudBuild === 'start' && external_window_React_default.a.createElement("div", {
          style: {
            fontSize: 12,
            marginLeft: 10
          }
        }, "\u6B63\u5728\u53D1\u5E03\u4E2D...")));
      }

      return external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }, external_window_React_default.a.createElement(EmptyTips["a" /* default */], null, "\u8BE5\u9879\u76EE\u4E0D\u662F\u4E00\u4E2A Git \u4ED3\u5E93\uFF0C\u8BF7\u5728 Git \u63D2\u4EF6\u914D\u7F6E\u540E\u4F7F\u7528\uFF0C\u6216\u8005\u624B\u52A8\u521D\u59CB\u5316\u9879\u76EE"));
    };

    _this2.state = {
      defPublishing: false
    };

    _this2.init();

    return _this2;
  }

  Def_createClass(Def, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var projects = this.props.projects;
      clientEmiter.on('start', function () {
        var currentProject = projects.currentProject;
        currentProject.setCloudBuild('start');
      });
      clientEmiter.on('success', function () {
        var currentProject = projects.currentProject;
        currentProject.setCloudBuild('success');
      });
      clientEmiter.on('error', function () {
        var currentProject = projects.currentProject;
        currentProject.setCloudBuild('error');
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      var _this$props$projects$ = this.props.projects.currentProject,
          currentProject = _this$props$projects$ === void 0 ? {} : _this$props$projects$;
      var cwd = currentProject.fullPath;
      clientEmiter.cwd = cwd;
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "DEF \u53D1\u5E03")), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, this.renderBody()));
    }
  }]);

  return Def;
}(external_window_React_["Component"]), Def_class2.extensionName = 'def', Def_temp)) || Def_class) || Def_class);
var Def_styles = {
  statusTag: {
    padding: '0 4px',
    color: '#fff',
    fontSize: 10,
    borderRadius: 2,
    marginRight: 5
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px'
  },
  itemContent: {
    display: 'flex',
    padding: 4,
    boxSizing: 'border-box',
    overflow: 'hidden',
    lineHeight: '20px',
    flex: 1
  },
  formError: {
    display: 'block',
    marginTop: '5px'
  }
};
/* harmony default export */ var ProjectDashboard_Def = (ProjectDashboard_PluginHoc(Def_Def));
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/loading/index.js
var loading = __webpack_require__(184);
var loading_default = /*#__PURE__*/__webpack_require__.n(loading);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/step/index.js
var step = __webpack_require__(1199);
var step_default = /*#__PURE__*/__webpack_require__.n(step);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/dropdown/index.js
var dropdown = __webpack_require__(1205);
var dropdown_default = /*#__PURE__*/__webpack_require__.n(dropdown);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/menu/index.js
var lib_menu = __webpack_require__(1208);
var menu_default = /*#__PURE__*/__webpack_require__.n(lib_menu);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/field/index.js
var field = __webpack_require__(697);
var field_default = /*#__PURE__*/__webpack_require__.n(field);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/cascader-select/index.js
var cascader_select = __webpack_require__(1209);
var cascader_select_default = /*#__PURE__*/__webpack_require__.n(cascader_select);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Git/components/DialogBranches.jsx





var DialogBranches_dec, DialogBranches_class, DialogBranches_temp;

function DialogBranches_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DialogBranches_typeof = function _typeof(obj) { return typeof obj; }; } else { DialogBranches_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DialogBranches_typeof(obj); }

function DialogBranches_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function DialogBranches_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { DialogBranches_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { DialogBranches_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function DialogBranches_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DialogBranches_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DialogBranches_createClass(Constructor, protoProps, staticProps) { if (protoProps) DialogBranches_defineProperties(Constructor.prototype, protoProps); if (staticProps) DialogBranches_defineProperties(Constructor, staticProps); return Constructor; }

function DialogBranches_possibleConstructorReturn(self, call) { if (call && (DialogBranches_typeof(call) === "object" || typeof call === "function")) { return call; } return DialogBranches_assertThisInitialized(self); }

function DialogBranches_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function DialogBranches_getPrototypeOf(o) { DialogBranches_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return DialogBranches_getPrototypeOf(o); }

function DialogBranches_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) DialogBranches_setPrototypeOf(subClass, superClass); }

function DialogBranches_setPrototypeOf(o, p) { DialogBranches_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return DialogBranches_setPrototypeOf(o, p); }




var DialogBranches_DialogBranches = (DialogBranches_dec = Object(index_module["b" /* inject */])('git'), DialogBranches_dec(DialogBranches_class = Object(index_module["c" /* observer */])(DialogBranches_class = (DialogBranches_temp =
/*#__PURE__*/
function (_Component) {
  DialogBranches_inherits(DialogBranches, _Component);

  function DialogBranches() {
    var _getPrototypeOf2;

    var _this;

    DialogBranches_classCallCheck(this, DialogBranches);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = DialogBranches_possibleConstructorReturn(this, (_getPrototypeOf2 = DialogBranches_getPrototypeOf(DialogBranches)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.closeDilogGitBranches = function () {
      var git = _this.props.git;
      git.visibleDialogBranches = false;
      git.gitFormReset();
    };

    _this.handleGitBranchesOk =
    /*#__PURE__*/
    DialogBranches_asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var git, branchOrigin, checkoutBranch, branchType, checkoutDone, _checkoutDone;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              git = _this.props.git;
              branchOrigin = git.branchOrigin, checkoutBranch = git.checkoutBranch, branchType = git.branchType;

              if (!(branchOrigin === checkoutBranch && branchType === 'local')) {
                _context.next = 10;
                break;
              }

              _context.next = 5;
              return git.checkout();

            case 5:
              checkoutDone = _context.sent;

              if (checkoutDone) {
                git.checkIsRepo();
              }

              git.gitFormReset();
              _context.next = 15;
              break;

            case 10:
              _context.next = 12;
              return git.checkoutLocalBranch();

            case 12:
              _checkoutDone = _context.sent;

              if (_checkoutDone) {
                git.checkIsRepo();
              }

              git.gitFormReset();

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    _this.handleSelectBranch = function (value, data, extra) {
      var git = _this.props.git;

      if (extra.selectedPath[0].label === 'local') {
        git.branchOrigin = value;
        git.checkoutBranch = value;
        git.branchType = 'origin';
      } else {
        git.branchOrigin = value;
        git.checkoutBranch = '';
        git.branchType = 'local';
      }
    };

    _this.displayBranch = function (label) {
      return label[1];
    };

    _this.handleGitLocalBranch = function (value) {
      var git = _this.props.git;
      git.checkoutBranch = value;
    };

    return _this;
  }

  DialogBranches_createClass(DialogBranches, [{
    key: "render",
    value: function render() {
      var git = this.props.git;
      return external_window_React_default.a.createElement(dialog_default.a, {
        visible: git.visibleDialogBranches,
        title: "\u5207\u6362\u5206\u652F",
        onClose: this.closeDilogGitBranches,
        footer: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(button_default.a, {
          disabled: git.checkoutBranch.length === 0,
          onClick: this.handleGitBranchesOk,
          type: "primary"
        }, "\u786E\u5B9A"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.closeDilogGitBranches
        }, "\u53D6\u6D88"))
      }, external_window_React_default.a.createElement("div", {
        style: {
          lineHeight: '28px',
          height: 20
        }
      }, external_window_React_default.a.createElement("span", {
        style: {
          margin: '0 8px'
        }
      }, "Checkout"), external_window_React_default.a.createElement(cascader_select_default.a, {
        placeholder: "\u9009\u62E9\u5206\u652F",
        onChange: this.handleSelectBranch,
        dataSource: git.branchesCheckout,
        style: {
          verticalAlign: 'middle'
        },
        displayRender: this.displayBranch
      }), external_window_React_default.a.createElement("span", {
        style: {
          margin: '0 8px'
        }
      }, "as"), external_window_React_default.a.createElement(input_default.a, {
        onChange: this.handleGitLocalBranch,
        placeholder: "\u8BF7\u8F93\u5165\u672C\u5730\u5206\u652F\u540D\u79F0",
        value: git.checkoutBranch,
        disabled: git.branchOrigin === ''
      })));
    }
  }]);

  return DialogBranches;
}(external_window_React_["Component"]), DialogBranches_temp)) || DialogBranches_class) || DialogBranches_class);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Git/components/DialogNewBranch.jsx





var DialogNewBranch_dec, DialogNewBranch_class, DialogNewBranch_temp;

function DialogNewBranch_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DialogNewBranch_typeof = function _typeof(obj) { return typeof obj; }; } else { DialogNewBranch_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DialogNewBranch_typeof(obj); }

function DialogNewBranch_extends() { DialogNewBranch_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return DialogNewBranch_extends.apply(this, arguments); }

function DialogNewBranch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function DialogNewBranch_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { DialogNewBranch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { DialogNewBranch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function DialogNewBranch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DialogNewBranch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DialogNewBranch_createClass(Constructor, protoProps, staticProps) { if (protoProps) DialogNewBranch_defineProperties(Constructor.prototype, protoProps); if (staticProps) DialogNewBranch_defineProperties(Constructor, staticProps); return Constructor; }

function DialogNewBranch_possibleConstructorReturn(self, call) { if (call && (DialogNewBranch_typeof(call) === "object" || typeof call === "function")) { return call; } return DialogNewBranch_assertThisInitialized(self); }

function DialogNewBranch_getPrototypeOf(o) { DialogNewBranch_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return DialogNewBranch_getPrototypeOf(o); }

function DialogNewBranch_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) DialogNewBranch_setPrototypeOf(subClass, superClass); }

function DialogNewBranch_setPrototypeOf(o, p) { DialogNewBranch_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return DialogNewBranch_setPrototypeOf(o, p); }

function DialogNewBranch_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var DialogNewBranch_DialogNewBranch = (DialogNewBranch_dec = Object(index_module["b" /* inject */])('git'), DialogNewBranch_dec(DialogNewBranch_class = Object(index_module["c" /* observer */])(DialogNewBranch_class = (DialogNewBranch_temp =
/*#__PURE__*/
function (_Component) {
  DialogNewBranch_inherits(DialogNewBranch, _Component);

  function DialogNewBranch(props) {
    var _this;

    DialogNewBranch_classCallCheck(this, DialogNewBranch);

    _this = DialogNewBranch_possibleConstructorReturn(this, DialogNewBranch_getPrototypeOf(DialogNewBranch).call(this, props));

    _this.closeDialogNewBranch = function () {
      var git = _this.props.git;
      git.visibleDialogNewBranch = false;
      git.gitFormReset();

      _this.field.reset();
    };

    _this.handleGitNewBranchOk = function () {
      var git = _this.props.git;

      _this.field.validate(
      /*#__PURE__*/
      function () {
        var _ref = DialogNewBranch_asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(errors, values) {
          var newBranch, newBranchDone;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!errors) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  newBranch = values.newBranch;
                  _context.next = 5;
                  return git.newBranch(newBranch);

                case 5:
                  newBranchDone = _context.sent;

                  if (!newBranchDone) {
                    _context.next = 13;
                    break;
                  }

                  git.visibleDialogNewBranch = false;
                  _context.next = 10;
                  return git.checkIsRepo();

                case 10:
                  git.gitFormReset();
                  _context.next = 15;
                  break;

                case 13:
                  git.visibleDialogNewBranch = false;
                  git.gitFormReset();

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    };

    _this.checkNewBranch = function (rule, value, callback) {
      if (value) {
        callback();
      } else {
        callback("请输入分支名称");
      }
    };

    _this.field = new field_default.a(DialogNewBranch_assertThisInitialized(DialogNewBranch_assertThisInitialized(_this)));
    return _this;
  }

  DialogNewBranch_createClass(DialogNewBranch, [{
    key: "render",
    value: function render() {
      var git = this.props.git;
      var init = this.field.init;
      return external_window_React_default.a.createElement(dialog_default.a, {
        visible: git.visibleDialogNewBranch,
        title: "\u65B0\u5EFA\u5206\u652F",
        onClose: this.closeDialogNewBranch,
        footer: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleGitNewBranchOk,
          type: "primary"
        }, "\u786E\u5B9A"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.closeDialogNewBranch
        }, "\u53D6\u6D88"))
      }, external_window_React_default.a.createElement("div", {
        style: DialogNewBranch_styles.item
      }, external_window_React_default.a.createElement("div", {
        style: DialogNewBranch_styles.itemTitle
      }, "\u65B0\u5206\u652F\u540D\uFF1A"), external_window_React_default.a.createElement("div", {
        style: {
          height: 48,
          position: 'relative',
          top: 11
        }
      }, external_window_React_default.a.createElement(input_default.a, DialogNewBranch_extends({
        placeholder: "\u8BF7\u8F93\u5165\u5206\u652F\u540D\u79F0",
        style: {
          width: 350,
          marginLeft: 10
        }
      }, init('newBranch', {
        rules: {
          validator: this.checkNewBranch
        }
      }))), external_window_React_default.a.createElement("br", null), this.field.getError('newBranch') ? external_window_React_default.a.createElement("span", {
        style: {
          color: '#fa7070',
          fontSize: 12,
          display: 'inline-block',
          margin: '5px 0 0 10px'
        }
      }, this.field.getError('newBranch').join(",")) : "")));
    }
  }]);

  return DialogNewBranch;
}(external_window_React_["Component"]), DialogNewBranch_temp)) || DialogNewBranch_class) || DialogNewBranch_class);

var DialogNewBranch_styles = {
  item: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 90
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px'
  }
};
// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Git/components/DialogChangeRemote.jsx





var DialogChangeRemote_dec, DialogChangeRemote_class, DialogChangeRemote_temp;

function DialogChangeRemote_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { DialogChangeRemote_typeof = function _typeof(obj) { return typeof obj; }; } else { DialogChangeRemote_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return DialogChangeRemote_typeof(obj); }

function DialogChangeRemote_extends() { DialogChangeRemote_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return DialogChangeRemote_extends.apply(this, arguments); }

function DialogChangeRemote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function DialogChangeRemote_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { DialogChangeRemote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { DialogChangeRemote_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function DialogChangeRemote_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DialogChangeRemote_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DialogChangeRemote_createClass(Constructor, protoProps, staticProps) { if (protoProps) DialogChangeRemote_defineProperties(Constructor.prototype, protoProps); if (staticProps) DialogChangeRemote_defineProperties(Constructor, staticProps); return Constructor; }

function DialogChangeRemote_possibleConstructorReturn(self, call) { if (call && (DialogChangeRemote_typeof(call) === "object" || typeof call === "function")) { return call; } return DialogChangeRemote_assertThisInitialized(self); }

function DialogChangeRemote_getPrototypeOf(o) { DialogChangeRemote_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return DialogChangeRemote_getPrototypeOf(o); }

function DialogChangeRemote_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) DialogChangeRemote_setPrototypeOf(subClass, superClass); }

function DialogChangeRemote_setPrototypeOf(o, p) { DialogChangeRemote_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return DialogChangeRemote_setPrototypeOf(o, p); }

function DialogChangeRemote_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var DialogChangeRemote_DialogChangeRemote = (DialogChangeRemote_dec = Object(index_module["b" /* inject */])('git'), DialogChangeRemote_dec(DialogChangeRemote_class = Object(index_module["c" /* observer */])(DialogChangeRemote_class = (DialogChangeRemote_temp =
/*#__PURE__*/
function (_Component) {
  DialogChangeRemote_inherits(DialogChangeRemote, _Component);

  function DialogChangeRemote(props) {
    var _this;

    DialogChangeRemote_classCallCheck(this, DialogChangeRemote);

    _this = DialogChangeRemote_possibleConstructorReturn(this, DialogChangeRemote_getPrototypeOf(DialogChangeRemote).call(this, props));

    _this.handleAddRemote = function () {
      var _this$props$git = _this.props.git,
          git = _this$props$git === void 0 ? {} : _this$props$git;

      _this.field.validate(
      /*#__PURE__*/
      function () {
        var _ref = DialogChangeRemote_asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(errors, values) {
          var remoteUrlInput, originRemote, addDone;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!errors) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  remoteUrlInput = values.remoteUrlInput;

                  if (!(remoteUrlInput === git.remoteUrl)) {
                    _context.next = 6;
                    break;
                  }

                  git.visibleDialogChangeRemote = false;
                  return _context.abrupt("return");

                case 6:
                  git.removeAndAddRemoting = true;
                  _context.next = 9;
                  return git.getOriginRemote();

                case 9:
                  originRemote = _context.sent;

                  if (!(originRemote.length > 0)) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 13;
                  return git.removeRemote();

                case 13:
                  _context.next = 15;
                  return git.addRemote(remoteUrlInput);

                case 15:
                  addDone = _context.sent;

                  if (!addDone) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 19;
                  return git.checkIsRepo();

                case 19:
                  notification_lib_default.a.success({
                    message: '仓库地址修改成功',
                    duration: 8
                  });
                  git.removeAndAddRemoting = false;
                  git.visibleDialogChangeRemote = false;

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    };

    _this.closeDialogChangeRemote = function () {
      var git = _this.props.git;
      git.visibleDialogChangeRemote = false;

      _this.field.reset();
    };

    _this.field = new field_default.a(DialogChangeRemote_assertThisInitialized(DialogChangeRemote_assertThisInitialized(_this)));
    return _this;
  }

  DialogChangeRemote_createClass(DialogChangeRemote, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props$git2 = this.props.git,
          git = _this$props$git2 === void 0 ? {} : _this$props$git2;

      if (git.remoteUrl) {
        this.field.setValue('remoteUrlInput', git.remoteUrl);
      } else {
        this.field.setValue('remoteUrlInput', '');
      }
    }
  }, {
    key: "checkGitRepo",
    value: function checkGitRepo(rule, value, callback) {
      if (/^git@.+.git$/.test(value)) {
        callback();
      } else if (/^http.+.git$/.test(value)) {
        callback("请使用 SSH 协议地址，即以 git@ 开头的地址");
      } else {
        callback("请输入正确的 git 仓库地址");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var git = this.props.git;
      var init = this.field.init;
      return external_window_React_default.a.createElement(dialog_default.a, {
        visible: git.visibleDialogChangeRemote,
        title: "\u4FEE\u6539\u4ED3\u5E93\u5730\u5740",
        onClose: this.closeDialogChangeRemote,
        footer: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(button_default.a, {
          type: "primary",
          onClick: this.handleAddRemote,
          loading: git.removeAndAddRemoting
        }, "\u786E\u5B9A"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.closeDialogChangeRemote
        }, "\u53D6\u6D88"))
      }, external_window_React_default.a.createElement("div", {
        style: DialogChangeRemote_styles.item
      }, external_window_React_default.a.createElement("div", {
        style: DialogChangeRemote_styles.itemTitle
      }, "\u4ED3\u5E93\u5730\u5740:"), external_window_React_default.a.createElement("div", {
        style: {
          height: 48,
          position: 'relative',
          top: 11
        }
      }, external_window_React_default.a.createElement(input_default.a, DialogChangeRemote_extends({
        placeholder: "\u5982\uFF1Agit@github.com:alibaba/ice.git",
        style: {
          width: 350,
          marginLeft: 10
        }
      }, init('remoteUrlInput', {
        rules: {
          validator: this.checkGitRepo
        }
      }))), external_window_React_default.a.createElement("br", null), this.field.getError('remoteUrlInput') ? external_window_React_default.a.createElement("span", {
        style: {
          color: '#fa7070',
          fontSize: 12,
          display: 'inline-block',
          margin: '5px 0 0 10px'
        }
      }, this.field.getError('remoteUrlInput').join(",")) : "")));
    }
  }]);

  return DialogChangeRemote;
}(external_window_React_["Component"]), DialogChangeRemote_temp)) || DialogChangeRemote_class) || DialogChangeRemote_class);

var DialogChangeRemote_styles = {
  item: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 90
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px'
  }
};
// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/Git/index.jsx











var Git_dec, Git_class, Git_class2, Git_temp;

function Git_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Git_typeof = function _typeof(obj) { return typeof obj; }; } else { Git_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Git_typeof(obj); }

function Git_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Git_defineProperty(target, key, source[key]); }); } return target; }

function Git_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Git_slicedToArray(arr, i) { return Git_arrayWithHoles(arr) || Git_iterableToArrayLimit(arr, i) || Git_nonIterableRest(); }

function Git_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Git_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Git_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Git_extends() { Git_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Git_extends.apply(this, arguments); }

function Git_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Git_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Git_createClass(Constructor, protoProps, staticProps) { if (protoProps) Git_defineProperties(Constructor.prototype, protoProps); if (staticProps) Git_defineProperties(Constructor, staticProps); return Constructor; }

function Git_possibleConstructorReturn(self, call) { if (call && (Git_typeof(call) === "object" || typeof call === "function")) { return call; } return Git_assertThisInitialized(self); }

function Git_getPrototypeOf(o) { Git_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Git_getPrototypeOf(o); }

function Git_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Git_setPrototypeOf(subClass, superClass); }

function Git_setPrototypeOf(o, p) { Git_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Git_setPrototypeOf(o, p); }

function Git_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }













var ButtonGroup = button_default.a.Group;
var CheckboxGroup = checkbox_default.a.Group;
var steps = ["Git init", "关联仓库"];
var Git_GitPanel = (Git_dec = Object(index_module["b" /* inject */])('projects', 'git'), Git_dec(Git_class = Object(index_module["c" /* observer */])(Git_class = (Git_temp = Git_class2 =
/*#__PURE__*/
function (_Component) {
  Git_inherits(GitPanel, _Component);

  function GitPanel(props) {
    var _this;

    Git_classCallCheck(this, GitPanel);

    _this = Git_possibleConstructorReturn(this, Git_getPrototypeOf(GitPanel).call(this, props));

    _this.onProjectChange = function () {
      var git = _this.props.git;

      _this.field.reset();

      git.reset();

      _this.handleReload(true);
    };

    _this.handleGitInit = function () {
      var git = _this.props.git;
      var initDone = git.init();

      if (initDone) {
        _this.handleReload(true);
      }
    };

    _this.handleReload = function () {
      var showLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var git = _this.props.git;

      if (showLoading) {
        git.reloading = true;
      }

      git.checkIsRepo();
      git.reloading = false;
    };

    _this.renderStep0 = function () {
      var git = _this.props.git;
      return external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }, external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
        style: {
          minHeight: 90
        }
      }, "\u8BE5\u9879\u76EE\u4E0D\u662F\u4E00\u4E2A Git \u4ED3\u5E93\uFF0C\u8BF7\u70B9\u51FB Git init \u5F00\u59CB\u914D\u7F6E"), external_window_React_default.a.createElement(button_default.a, {
        type: "secondary",
        onClick: _this.handleGitInit,
        loading: git.gitIniting
      }, "Git init"));
    };

    _this.renderStep1 = function () {
      var git = _this.props.git;
      var init = _this.field.init;
      return external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }, external_window_React_default.a.createElement("div", {
        style: Git_styles.item
      }, external_window_React_default.a.createElement("div", {
        style: Git_styles.itemTitle
      }, "\u4ED3\u5E93\u5730\u5740:"), external_window_React_default.a.createElement("div", {
        style: {
          height: 48,
          position: 'relative',
          top: 11
        }
      }, external_window_React_default.a.createElement(input_default.a, Git_extends({
        placeholder: "\u5982\uFF1Agit@github.com:alibaba/ice.git",
        style: {
          marginLeft: 10,
          width: 240
        }
      }, init('remoteUrl', {
        rules: {
          validator: _this.checkGitRepo
        }
      }))), external_window_React_default.a.createElement("br", null), _this.field.getError('remoteUrl') ? external_window_React_default.a.createElement("span", {
        style: {
          color: '#fa7070',
          fontSize: 12,
          display: 'inline-block',
          margin: '5px 0 0 10px'
        }
      }, _this.field.getError('remoteUrl').join(",")) : "")), external_window_React_default.a.createElement(button_default.a, {
        type: "secondary",
        onClick: _this.handleAddRemote,
        loading: git.gitRemoteAdding
      }, "\u5173\u8054\u4ED3\u5E93"));
    };

    _this.handleAddRemote = function () {
      var _this$props$git = _this.props.git,
          git = _this$props$git === void 0 ? {} : _this$props$git;

      _this.field.validate(function (errors, values) {
        if (errors) return;
        var remoteUrl = values.remoteUrl;

        if (remoteUrl === git.remoteUrl) {
          return;
        }

        var addDone = git.addRemote(remoteUrl);

        if (addDone) {
          _this.handleReload(true);
        }
      });
    };

    _this.onFilesChange = function (selectedFiles) {
      var _this$props$git2 = _this.props.git,
          git = _this$props$git2 === void 0 ? {} : _this$props$git2;
      git.selectedFiles = selectedFiles;
    };

    _this.checkAllFiles = function () {
      var _this$props$git3 = _this.props.git,
          git = _this$props$git3 === void 0 ? {} : _this$props$git3;

      if (git.selectedFiles && git.selectedFiles.length === 0) {
        git.selectedFiles = git.unstagedFiles.slice();
      } else {
        git.selectedFiles = [];
      }
    };

    _this.getUserInfo = function () {
      var userValue = localStorage.getItem('login:user');
      var user;

      if (userValue) {
        try {
          user = JSON.parse(userValue);
        } catch (e) {}
      }

      return user;
    };

    _this.handleGitCommit = function () {
      var _this$props$git4 = _this.props.git,
          git = _this$props$git4 === void 0 ? {} : _this$props$git4;

      var user = _this.getUserInfo();

      var commitDone = git.addAndCommit();

      if (commitDone) {
        notification_lib_default.a.success({
          message: 'Git 提交成功',
          duration: 8
        });

        _this.handleReload(true);
      }
    };

    _this.getFiles = function () {
      var _this$props$git5 = _this.props.git,
          git = _this$props$git5 === void 0 ? {} : _this$props$git5;
      var statusMap = [['conflicted', '#FA7070', '冲突'], ['not_added', '#2ECA9C', '未添加'], ['modified', '#FCDA52', '已变更'], ['created', '#5485F7', '新创建'], ['deleted', '#999999', '已删除'], ['renamed', '#FA7070', '重命名']];
      var dataSource = [];

      if (git.status && git.status.files && git.status.files.length > 0) {
        statusMap.forEach(function (_ref) {
          var _ref2 = Git_slicedToArray(_ref, 3),
              key = _ref2[0],
              color = _ref2[1],
              cn = _ref2[2];

          var files = git.status[key];

          if (Array.isArray(files) && files.length > 0) {
            var statusLabel = external_window_React_default.a.createElement("span", {
              key: key,
              style: Git_objectSpread({}, Git_styles.statusTag, {
                backgroundColor: color
              })
            }, cn);
            dataSource = dataSource.concat(files.map(function (file, index) {
              return external_window_React_default.a.createElement("div", {
                key: index,
                style: Git_styles.fileItem
              }, external_window_React_default.a.createElement(checkbox_default.a, {
                value: file
              }, statusLabel, external_window_React_default.a.createElement("span", null, file)));
            }));
          }
        });
      }

      return dataSource;
    };

    _this.setCommitMsg = function (value) {
      var _this$props$git6 = _this.props.git,
          git = _this$props$git6 === void 0 ? {} : _this$props$git6;
      git.commitMsg = value;
    };

    _this.renderMainPanel = function () {
      var _this$props$git7 = _this.props.git,
          git = _this$props$git7 === void 0 ? {} : _this$props$git7;

      var dataSource = _this.getFiles();

      return external_window_React_default.a.createElement("div", {
        style: Git_styles.mainPanel
      }, external_window_React_default.a.createElement("div", {
        style: Git_styles.topContainer
      }, external_window_React_default.a.createElement("div", {
        style: Git_styles.filesTitle
      }, external_window_React_default.a.createElement("span", null, "\u53D8\u66F4\u6587\u4EF6", external_window_React_default.a.createElement("span", {
        style: {
          paddingLeft: 10,
          fontSize: 12,
          color: '#666'
        }
      }, "(", git.unstagedFiles.length, ")")), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        onClick: _this.checkAllFiles
      }, "\u5168\u9009")), external_window_React_default.a.createElement("div", {
        style: Git_styles.filesContent
      }, external_window_React_default.a.createElement(CheckboxGroup, {
        value: git.selectedFiles,
        onChange: _this.onFilesChange
      }, dataSource.map(function (item) {
        return item;
      })))), external_window_React_default.a.createElement("div", {
        style: Git_styles.bottomContainer
      }, external_window_React_default.a.createElement(input_default.a, {
        onChange: _this.setCommitMsg,
        value: git.commitMsg,
        placeholder: "\u63D0\u4EA4\u4FE1\u606F",
        style: {
          flexGrow: 2,
          display: 'flex',
          height: 28,
          borderRadius: 0
        }
      }), external_window_React_default.a.createElement(button_default.a, {
        type: "primary",
        disabled: git.selectedFiles.length === 0 || !git.commitMsg,
        onClick: _this.handleGitCommit,
        loading: git.gitCommiting,
        style: {
          width: 120,
          borderRadius: 0,
          position: 'relative',
          left: '-1px'
        }
      }, git.unstagedFiles.length === 0 && '提交', git.unstagedFiles.length !== 0 && git.selectedFiles.length === 0 && '选择文件提交', git.selectedFiles.length !== 0 && !git.commitMsg && '输入信息提交', git.selectedFiles.length !== 0 && git.commitMsg && '提交')), external_window_React_default.a.createElement("div", {
        style: Git_styles.bottomTips
      }, "\u53D8\u66F4\u4FE1\u606F\u4E0D\u4F1A\u5B9E\u65F6\u5237\u65B0\uFF0C\u63D0\u4EA4\u524D\u8BF7\u5148\u901A\u8FC7\u53F3\u4E0A\u89D2\u7684\u6309\u94AE\u66F4\u65B0\u72B6\u6001"));
    };

    _this.handleChangeRemote = function () {
      var git = _this.props.git;
      git.visibleDialogChangeRemote = true;
    };

    _this.handleGitNewBranchOpen = function () {
      var git = _this.props.git;

      if (git.remoteUrl) {
        git.visibleDialogNewBranch = true;
      } else {
        feedback_default.a.toast.error('当前项目未设置仓库地址');
      }
    };

    _this.handleGitBranchesOpen = function () {
      var git = _this.props.git;

      if (!git.remoteUrl) {
        feedback_default.a.toast.error('当前项目未设置 git remote 地址');

        return;
      }

      git.getBranches();
    };

    _this.handlePull = function () {
      var git = _this.props.git;
      var pullDone = git.pull();

      if (pullDone) {
        notification_lib_default.a.success({
          message: 'Git 拉取当前分支最新代码成功',
          duration: 8
        });
      }
    };

    _this.handlePush = function () {
      var git = _this.props.git;
      var pushDone = git.push();

      if (pushDone) {
        notification_lib_default.a.success({
          message: 'Git 推送当前分支本地代码成功',
          duration: 8
        });
      }
    };

    _this.field = new field_default.a(Git_assertThisInitialized(Git_assertThisInitialized(_this))); // 初始化gitTools

    _this.init();

    return _this;
  }

  Git_createClass(GitPanel, [{
    key: "init",
    value: function init() {
      var git = this.props.git;
      git.initTools();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          git = _this$props.git,
          projects = _this$props.projects;

      try {
        git.checkIsRepo(); // ipcRenderer.on('focus', this.handleReload);

        projects.on('change', this.onProjectChange);
      } catch (error) {
        var errMsg = error && error.message || '仓库地址错误';

        if (error && error.message && error.message.includes('ENOENT')) {
          errMsg = 'git 插件在当前项目不可用，请在插件设置中关闭，使用其他方式操作git。不可用原因可能为：项目读写权限问题，或者 simple-git 包在当前环境下不可用';
        }

        dialog_default.a.alert({
          title: '提示',
          content: external_window_React_default.a.createElement("div", {
            style: {
              width: 400
            }
          }, errMsg)
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          git = _this$props2.git,
          projects = _this$props2.projects; // ipcRenderer.removeListener('focus', this.handleReload);

      projects.removeListener('change', this.onProjectChange);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.init();
    }
  }, {
    key: "checkGitRepo",
    value: function checkGitRepo(rule, value, callback) {
      if (/^git@.+.git$/.test(value)) {
        callback();
      } else if (/^http.+.git$/.test(value)) {
        callback("请使用 SSH 协议地址，即以 git@ 开头的地址");
      } else {
        callback("请输入正确的 git 仓库地址");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var git = this.props.git;
      var currentStep = git.currentStep;
      var menu = external_window_React_default.a.createElement(menu_default.a, null, external_window_React_default.a.createElement(menu_default.a.Item, {
        onClick: this.handleGitNewBranchOpen
      }, "\u65B0\u5EFA\u5206\u652F"), external_window_React_default.a.createElement(menu_default.a.Item, {
        onClick: this.handleGitBranchesOpen
      }, "\u5207\u6362\u5206\u652F"));
      return external_window_React_default.a.createElement(src_components_DashboardCard, null, external_window_React_default.a.createElement(loading_default.a, {
        visible: git.reloading,
        style: {
          width: '100%',
          height: '100%'
        },
        shape: "fusion-reactor"
      }, external_window_React_default.a.createElement(src_components_DashboardCard.Header, null, external_window_React_default.a.createElement("div", null, "Git", git.showMainPanel && external_window_React_default.a.createElement("span", {
        style: {
          paddingLeft: 10,
          fontSize: 12,
          color: '#666'
        }
      }, "\uFF08", git.currentBranch, "\uFF09")), git.showMainPanel && external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '变更分支',
        onClick: this.handlePull
      }, external_window_React_default.a.createElement(dropdown_default.a, {
        trigger: external_window_React_default.a.createElement("a", {
          style: {
            zIndex: 2
          }
        }, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: "git",
          style: {
            fontSize: 16
          }
        })),
        align: "tr br",
        triggerType: "click"
      }, menu)), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: 'Pull',
        onClick: this.handlePull
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "down-arrow",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: 'Push',
        onClick: this.handlePush
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "up-arrow",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '修改仓库地址',
        onClick: this.handleChangeRemote
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "edit",
        style: {
          fontSize: 18
        }
      })), external_window_React_default.a.createElement(ExtraButton["a" /* default */], {
        style: {
          color: '#3080FE'
        },
        placement: 'top',
        tipText: '刷新',
        onClick: function onClick() {
          _this2.handleReload(true);
        }
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "reload",
        style: {
          fontSize: 18
        }
      })))), external_window_React_default.a.createElement(src_components_DashboardCard.Body, null, git.loading ? external_window_React_default.a.createElement("div", null, "Loading") : git.showMainPanel ? // git.unstagedFiles.length === 0 ? (
      //   <div
      //     style={{
      //       display: 'flex',
      //       flexDirection: 'column',
      //       alignItems: 'center'
      //     }}
      //   >
      //     <EmptyTips>暂无变更文件</EmptyTips>
      //   </div>
      // ) : (
      // 主面板
      this.renderMainPanel() // )
      : // 初始化引导
      external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(step_default.a, {
        current: currentStep,
        shape: "circle"
      }, steps.map(function (item, index) {
        return external_window_React_default.a.createElement(step_default.a.Item, {
          key: index,
          title: item
        });
      })), currentStep === 0 && this.renderStep0(), currentStep === 1 && this.renderStep1()), git.visibleDialogChangeRemote && external_window_React_default.a.createElement(DialogChangeRemote_DialogChangeRemote, null), external_window_React_default.a.createElement(DialogNewBranch_DialogNewBranch, null), external_window_React_default.a.createElement(DialogBranches_DialogBranches, null))));
    }
  }]);

  return GitPanel;
}(external_window_React_["Component"]), Git_class2.extensionName = 'git', Git_class2.displayName = 'Git', Git_temp)) || Git_class) || Git_class); // export default GitPanel;

/* harmony default export */ var Git = (ProjectDashboard_PluginHoc(Git_GitPanel));
var Git_styles = {
  statusTag: {
    padding: '3px 4px',
    color: '#fff',
    fontSize: 10,
    borderRadius: 2,
    marginRight: 5,
    display: 'inline-block',
    position: 'relative',
    top: '-1px'
  },
  item: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 90
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px'
  },
  mainPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '215px'
  },
  topContainer: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 187
  },
  bottomContainer: {
    height: 28,
    display: 'flex'
  },
  filesTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 22
  },
  filesContent: {
    flexGrow: 2,
    background: '#f5f2f0',
    overflow: 'auto',
    marginBottom: 10,
    height: 155,
    padding: '5px'
  },
  files: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 5px 0'
  },
  fileItem: {
    paddingBottom: 4
  },
  bottomTips: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 8
  }
};
// EXTERNAL MODULE: ./renderer/src/components/Link.jsx
var Link = __webpack_require__(63);

// EXTERNAL MODULE: ./renderer/src/pages/Home/ProjectDashboard/index.scss
var Home_ProjectDashboard = __webpack_require__(1217);

// CONCATENATED MODULE: ./renderer/src/pages/Home/ProjectDashboard/index.jsx
var _ExtensionMap, ProjectDashboard_dec, ProjectDashboard_class, ProjectDashboard_temp;

function ProjectDashboard_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ProjectDashboard_typeof = function _typeof(obj) { return typeof obj; }; } else { ProjectDashboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ProjectDashboard_typeof(obj); }

function ProjectDashboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProjectDashboard_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProjectDashboard_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProjectDashboard_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProjectDashboard_defineProperties(Constructor, staticProps); return Constructor; }

function ProjectDashboard_possibleConstructorReturn(self, call) { if (call && (ProjectDashboard_typeof(call) === "object" || typeof call === "function")) { return call; } return ProjectDashboard_assertThisInitialized(self); }

function ProjectDashboard_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ProjectDashboard_getPrototypeOf(o) { ProjectDashboard_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ProjectDashboard_getPrototypeOf(o); }

function ProjectDashboard_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ProjectDashboard_setPrototypeOf(subClass, superClass); }

function ProjectDashboard_setPrototypeOf(o, p) { ProjectDashboard_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ProjectDashboard_setPrototypeOf(o, p); }

function ProjectDashboard_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var ExtensionMap = (_ExtensionMap = {}, ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Assets.extensionName, ProjectDashboard_Assets), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Aliyun.extensionName, ProjectDashboard_Aliyun), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Def.extensionName, ProjectDashboard_Def), ProjectDashboard_defineProperty(_ExtensionMap, Git.extensionName, Git), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Dependencies.extensionName, ProjectDashboard_Dependencies), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Layouts.extensionName, ProjectDashboard_Layouts), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Pages.extensionName, ProjectDashboard_Pages), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Proxies.extensionName, ProjectDashboard_Proxies), ProjectDashboard_defineProperty(_ExtensionMap, ProjectDashboard_Todo.extensionName, ProjectDashboard_Todo), _ExtensionMap);

 // eslint-disable-next-line babel/new-cap

var DragHandle = Object(commonjs["SortableHandle"])(function () {
  return external_window_React_default.a.createElement("span", {
    className: "sortable-extension-item-handle"
  });
}); // eslint-disable-next-line babel/new-cap

var SortableExtensionItem = Object(commonjs["SortableElement"])(function (_ref) {
  var Component = _ref.Component,
      isSorting = _ref.isSorting,
      props = _ref.props;
  return external_window_React_default.a.createElement("div", {
    className: classnames_default()({
      'sortable-extension-item': true,
      'sortable-extension-item-sorting': isSorting
    })
  }, external_window_React_default.a.createElement(DragHandle, null), external_window_React_default.a.createElement(Component, props));
}); // eslint-disable-next-line babel/new-cap

var SortableExtensions = Object(commonjs["SortableContainer"])(function (_ref2) {
  var items = _ref2.items,
      isSorting = _ref2.isSorting;
  return external_window_React_default.a.createElement("div", {
    className: 'sortable-extensions'
  }, items.map(function (_ref3, index) {
    var Component = _ref3.Component,
        props = _ref3.props;
    return external_window_React_default.a.createElement(SortableExtensionItem, {
      key: 'sortable-extension-item' + index,
      index: index,
      Component: Component,
      isSorting: isSorting,
      props: props
    });
  }));
});
var ProjectDashboard_ProjectDashboard = (ProjectDashboard_dec = Object(index_module["b" /* inject */])('projects', 'extensions'), ProjectDashboard_dec(ProjectDashboard_class = Object(index_module["c" /* observer */])(ProjectDashboard_class = (ProjectDashboard_temp =
/*#__PURE__*/
function (_Component) {
  ProjectDashboard_inherits(ProjectDashboard, _Component);

  function ProjectDashboard(props) {
    var _this;

    ProjectDashboard_classCallCheck(this, ProjectDashboard);

    _this = ProjectDashboard_possibleConstructorReturn(this, ProjectDashboard_getPrototypeOf(ProjectDashboard).call(this, props));

    _this.onSortStart = function () {
      _this.props.extensions.sortStart();
    };

    _this.onSortEnd = function (_ref4) {
      var oldIndex = _ref4.oldIndex,
          newIndex = _ref4.newIndex;

      if (oldIndex !== newIndex) {
        var orderByName = _this.props.extensions.orderByName;
        var newOrderByName = Object(commonjs["arrayMove"])(orderByName, oldIndex, newIndex);
        _this.props.extensions.orderByName = newOrderByName;
      }

      _this.props.extensions.sortEnd();
    };

    return _this;
  }

  ProjectDashboard_createClass(ProjectDashboard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          projects = _this$props.projects,
          extensions = _this$props.extensions;
      var currentProject = projects.currentProject;
      var orderByName = extensions.orderByName,
          isSorting = extensions.isSorting;

      if (!(currentProject && currentProject.exists) || currentProject.isUnavailable) {
        return null;
      }

      if (orderByName.length > 0) {
        var extensionComponents = orderByName.map(function (name) {
          return {
            Component: ExtensionMap[name]
          };
        }).filter(function (extension) {
          return !!extension.Component;
        });
        return external_window_React_default.a.createElement("div", {
          className: this.props.className
        }, external_window_React_default.a.createElement(SortableExtensions, {
          axis: "xy",
          helperClass: 'sortable-extension-item-draging',
          onSortStart: this.onSortStart,
          onSortEnd: this.onSortEnd,
          useDragHandle: true,
          items: extensionComponents,
          isSorting: isSorting
        }));
      }

      return external_window_React_default.a.createElement("div", {
        className: "project-dashboard-empty"
      }, "\u672A\u5F00\u542F\u4EFB\u4F55\u63D2\u4EF6\uFF0C\u53EF\u524D\u5F80 ", external_window_React_default.a.createElement(Link["a" /* default */], {
        to: "/extensions"
      }, "\u63D2\u4EF6"), " \b\u9009\u62E9\u5F00\u542F");
    }
  }]);

  return ProjectDashboard;
}(external_window_React_["Component"]), ProjectDashboard_temp)) || ProjectDashboard_class) || ProjectDashboard_class);
/* harmony default export */ var pages_Home_ProjectDashboard = __webpack_exports__["default"] = (ProjectDashboard_ProjectDashboard);

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
module.exports = __webpack_require__(309);

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var BrowserLink =
/*#__PURE__*/
function (_Component) {
  _inherits(BrowserLink, _Component);

  function BrowserLink() {
    _classCallCheck(this, BrowserLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(BrowserLink).apply(this, arguments));
  }

  _createClass(BrowserLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", _extends({}, this.props, {
        style: _objectSpread({
          textDecoration: 'none'
        }, style),
        onClick: function onClick(event) {
          event.preventDefault();
          electron__WEBPACK_IMPORTED_MODULE_0__["shell"].openExternal(href);
        }
      }));
    }
  }]);

  return BrowserLink;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (BrowserLink);

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
__webpack_require__(124);
module.exports = __webpack_require__(311);

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(172);
__webpack_require__(310);

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = __webpack_require__(82);

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Loading */
var Loading = (_temp = _class = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loading.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            tip = _props.tip,
            state = _props.state,
            _props$visible = _props.visible,
            visible = _props$visible === undefined ? state !== 'off' : _props$visible,
            children = _props.children,
            className = _props.className,
            style = _props.style,
            shape = _props.shape,
            color = _props.color;


        state && _nextUtil.log.deprecated('state', 'visible', 'Loading');

        var prefix = this.context.prefix || this.props.prefix;

        var tipDom = null;
        var dotCls = prefix + 'loading-dot';

        switch (shape) {
            case 'flower':
                tipDom = _react2['default'].createElement(
                    'span',
                    { className: prefix + 'loading-flower' },
                    _react2['default'].createElement(_nextIcon2['default'], { type: 'loading', className: prefix + 'loading-icon', style: { color: color } })
                );
                break;
            case 'fusion-reactor':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-fusion-reactor' },
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } }),
                    _react2['default'].createElement('div', { className: dotCls, style: { backgroundColor: color } })
                );
                break;
            case 'dot-circle':
                tipDom = _react2['default'].createElement(
                    'div',
                    { className: prefix + 'loading-dot-circle' },
                    _react2['default'].createElement(
                        'div',
                        { className: dotCls, style: { color: color } },
                        'loading...'
                    )
                );
                break;
        }

        var loadingCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'loading', true), _defineProperty(_classNames, 'loading', visible), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            { className: loadingCls, style: style },
            visible ? _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-tip' },
                tipDom,
                tip
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: prefix + 'loading-component' },
                visible ? _react2['default'].createElement('div', { className: prefix + 'loading-masker' }) : null,
                children
            )
        );
    };

    return Loading;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义内容
     */
    tip: _propTypes2['default'].any,
    state: _propTypes2['default'].oneOf(['', 'on', 'off']),
    /**
     * loading 状态, 默认 true
     */
    visible: _propTypes2['default'].bool,
    /**
     * 自定义class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     * 动画类型
     * @enumdesc 无, icon, fusion矢量, 点圈
     */
    shape: _propTypes2['default'].oneOf(['', 'flower', 'fusion-reactor', 'dot-circle']),
    /**
     * 动画颜色
     */
    color: _propTypes2['default'].string,
    /**
     * 子元素
     */
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    state: '', //TODO: deprecated in 1.0 release
    shape: ''
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Loading.displayName = 'Loading';
exports['default'] = Loading;
module.exports = exports['default'];

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attribute; });
/* harmony import */ var _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(674);
/* harmony import */ var _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var deepcopy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(773);
/* harmony import */ var deepcopy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepcopy__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(725);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TabPane = _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default.a.TabPane;

var Attribute =
/*#__PURE__*/
function (_Component) {
  _inherits(Attribute, _Component);

  function Attribute(props) {
    var _this;

    _classCallCheck(this, Attribute);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Attribute).call(this, props));

    _this.onChange = function (value) {
      _this.props.onChange(value);
    };

    return _this;
  }

  _createClass(Attribute, [{
    key: "render",
    value: function render() {
      var layoutConfig = this.props.layoutConfig;
      var lc = deepcopy__WEBPACK_IMPORTED_MODULE_2___default()(layoutConfig);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "project-config-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default.a, {
        size: "small",
        onChange: this.handleChange
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "1",
        tab: "\u4E3B\u9898"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["BasicForm"], {
        value: lc,
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "2",
        tab: "\u5E03\u5C40"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          height: '284px',
          overflowY: 'scroll'
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["HeaderForm"], {
        value: lc,
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["AsideForm"], {
        value: lc,
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["FooterForm"], {
        value: lc,
        onChange: this.onChange
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "3",
        tab: "\u9AD8\u7EA7"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["AdvancedForm"], {
        value: lc,
        onChange: this.onChange
      }))));
    }
  }]);

  return Attribute;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

Attribute.defaultProps = {
  onChange: function onChange() {}
};


/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(725);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Preview =
/*#__PURE__*/
function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, _getPrototypeOf(Preview).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? 350 : _this$props$width,
          _this$props$scale = _this$props.scale,
          scale = _this$props$scale === void 0 ? 0.65 : _this$props$scale,
          layoutConfig = _this$props.layoutConfig;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: _objectSpread({}, style, {
          width: width,
          height: width * scale,
          overflow: 'hidden'
        })
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__["PreviewLayout"], {
        value: layoutConfig,
        scale: width / 960 // 缩放比例
        ,
        width: 960 // 预览宽度
        ,
        height: 960 * scale // 预览高度

      }));
    }
  }]);

  return Preview;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Preview);

/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Chrome =
/*#__PURE__*/
function (_Component) {
  _inherits(Chrome, _Component);

  function Chrome() {
    _classCallCheck(this, Chrome);

    return _possibleConstructorReturn(this, _getPrototypeOf(Chrome).apply(this, arguments));
  }

  _createClass(Chrome, [{
    key: "render",
    value: function render() {
      var _this$props$style = this.props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: styles.browserWraper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: styles.browserHeader
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#EE5C56',
          left: 14
        })
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#F8BD32',
          left: 34
        })
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#62CB43',
          left: 54
        })
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.browserBody, style)
      }, this.props.children));
    }
  }]);

  return Chrome;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var styles = {
  browserWraper: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ddd',
    overflow: 'hidden'
  },
  browserHeader: {
    height: 30,
    backgroundColor: '#fefefe',
    // background: 'linear-gradient(to bottom, #eee 0%,#d5d5d5 100%)',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    boxShadow: '0 0 2px #ddd',
    borderBottom: '1px solid #ddd',
    position: 'relative'
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: '50%',
    boxShadow: '0 0 1px rgba(0,0,0,.3) inset',
    position: 'absolute',
    top: 30 / 2 - 12 / 2
  },
  browserBody: {}
};
/* harmony default export */ __webpack_exports__["a"] = (Chrome);

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(796);
module.exports = __webpack_require__(1200);

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(797);
module.exports = __webpack_require__(1206);

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(798);
module.exports = __webpack_require__(743);

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(799);
module.exports = __webpack_require__(1210);

/***/ })

}]);