/* ---------------- */

const Script = require('./Script');

class OutPoint {
  constructor(hash = 0, n = 0) {
    this.hash = hash; // 트랜잭션 해시값
    this.n = n; // 인덱스
  }
}

/* ---------------- */

/** 한 트랜잭션 내의 Input.
 *  한 트랜잭션 Output의 위치를 가리키고 있습니다.
 *  가리키는 Output의 스크립트 공개키(scriptPubkey)에 부합하는
 *  스크립트 서명(scriptSig)이 포함됩니다.
 */

module.exports = class {
  constructor() {
    this.prevout = new OutPoint();
    this.scriptSig = new Script();
    this.nSequence = 0; // for the Lock-Time
  }
  static Array() {
    return [];
  }
};
