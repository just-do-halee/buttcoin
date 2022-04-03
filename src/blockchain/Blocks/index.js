/* ---------------- */

/* ---------------- */

module.exports = class {
  get height() {
    return this.txs.length;
  }
  constructor() {
    this.txs = [];
  }
};
