/* ---------------- */

const { COIN, MAX_MONEY } = require('../const');

const Script = require('./Script');

/** 코인의 가장 최소 단위인 hwakyeom 의 수량을 관리합니다.
 *  0 ~ `MAX_MONEY` 의 값을 갖습니다.
 *  `COIN` 은 1 BTTC 이며 `COIN` 개수만큼의
 *  hwakyeom 과 동일합니다.
 */

class Amount {
  constructor(nValue = 0) {
    this.set(nValue);
  }
  isValid(nValue = this.nValue) {
    return nValue >= 0 && nValue <= MAX_MONEY;
  }
  set(nValue = 0) {
    if (this.isValid(nValue)) {
      this.nValue = nValue;
    }
  }
  get() {
    return this.nValue;
  }
}

/* ---------------- */

/** 한 트랜잭션 내의 Output.
 *  한 트랜잭션 Input에 맞는 공개키(Public key)
 *  가 포함되어 있습니다.
 *  청구되려면 서명할 수 있어야 합니다.
 */

module.exports = class {
  constructor() {
    this.nValue = new Amount(); // 수량
    this.scriptPubKey = new Script(); // 공개키
  }
  static Array() {
    return [];
  }
};
