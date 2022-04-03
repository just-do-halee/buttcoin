/* ---------------- */

const crypto = require('./crypto');

/* ---------------- */

const isUndefined = (...items) => {
  for (const item of items) {
    if (typeof item === 'undefined') return true;
  }
  return false;
};

const errorSet = (errSet) => {
  const ret = {};
  for (const key in errSet) {
    t[key] = (...msg) => {
      throw new Error(obj[key] + ' ' + msg.join(' '));
    };
  }
  return ret;
};

const extractObject = (src, keys = [], { strict = false } = {}) => {
  const ret = {};
  for (const key of keys) {
    if (strict && typeof src[key] === undefined)
      throw new Error(`extract object error: ${key} is undefined.`);
    ret[key] = src[key];
  }
  return ret;
};

const toVersion = (value, { toStr = true } = {}) => {
  const ret = crypto.sha256(JSON.stringify(value));
  return toStr ? ret.toString() : ret;
};

// returns Version
const attachVersionToObject = (obj, { toStr = true } = {}) => {
  if (typeof obj !== 'object')
    throw new Error(`unexpected type: ${typeof obj}`);
  obj.version = toVersion(obj, { toStr });
  return obj.version;
};

module.exports = {
  crypto,
  extractObject,
  isUndefined,
  errorSet,
  toVersion,
  attachVersionToObject,
};
