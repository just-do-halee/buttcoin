const VERSION = '0.1.0';

/* ---------------- */

const Tx = require('./Tx');

/* ---------------- */

/** 블록체인 네트워크를 통해 전파될 수 있는
 *  기본 트랜잭션입니다.
 *  블록 내에 포함되어 사용됩니다.
 */

module.exports = class {
  get count() {
    return this.txs.length;
  }
  constructor() {
    this.txs = Tx.Array();
  }
};
