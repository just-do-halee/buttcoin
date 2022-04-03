/* ---------------- */

const CryptoJS = require('crypto-js');
const Elliptic = require('elliptic').ec;

/* ---------------- */

module.exports = {
  CryptoJS,
  sha256: CryptoJS.SHA256,
  ec: (algo) => new Elliptic(algo),
};
