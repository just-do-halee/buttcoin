/* ---------------- */

const TxIn = require('./TxIn');
const TxOut = require('./TxOut');

/* ---------------- */

/** 블록체인 네트워크를 통해 전파될 수 있는
 *  기본 트랜잭션입니다.
 *  블록 내에 포함되어 사용됩니다.
 */

module.exports = class Tx {
  static VERSION = 1;
  constructor() {
    this.vin = TxIn.Array();
    this.vout = TxOut.Array();
    this.nVersion = Tx.VERSION;
    this.nLockTime = 0;
  }
  static Array() {
    return [];
  }
};
