/* ---------------- */

const { crypto, errorSet, extractObject } = require('../util');

const throwError = errorSet({
  parse: 'parse error:',
});

/* ---------------- */

module.exports = class BlockHeader {
  static VERSION = 1;
  //
  get isNull() {
    return this.nBits === 0;
  }
  constructor() {
    /* ************* */
    this.nVersion = BlockHeader.VERSION;
    this.hashPrevBlock = 0; // 이전 블록의 해시값
    this.hashMerkleRoot = 0; // 머클 트리 루트
    this.nTime = 0;
    this.nBits = 0; // 블록의 난이도를 판정 짓는 수치
    this.nNonce = 0; // 노드가 찾아내야 하는 특정 무작위 수
    /* ************* */
  }
  get() {
    // 객체로 변환해 내보냅니다.
    return {
      nVersion: this.nVersion,
      hashPrevBlock: this.hashPrevBlock,
      hashMerkleRoot: this.hashMerkleRoot,
      nTime: this.nTime,
      nBits: this.nBits,
      nNonce: this.nNonce,
    };
  }
  toStr() {
    // JSON 문자열로 변환해 내보냅니다.
    return JSON.stringify(this.get());
  }
  fromStr(jsonStr) {
    // JSON 문자열을 JS 객체로 파싱합니다.
    const parsed = JSON.parse(jsonStr);

    if (typeof parsed !== 'object')
      throwError.parse('unexpected type ->', typeof parsed);

    // 객체 내에 필요한 요소들만 뽑아냅니다.
    const obj = extractObject(parsed, Object.keys(this.get()), {
      strict: true, // 요소가 하나라도 `undefined`일 경우 에러를 내뱉습니다.
    });

    // 뽑아낸 새 값들로 전체를 재설정합니다.
    this.nVersion = obj.nVersion;
    this.hashPrevBlock = obj.hashPrevBlock;
    this.hashMerkleRoot = obj.hashMerkleRoot;
    this.nTime = obj.nTime;
    this.nBits = obj.nBits;
    this.nNonce = obj.nNonce;
  }
  getHash() {
    // 현재 블록의 해시값을 계산 후 내보냅니다.
    return crypto.sha256(this.toStr());
  }
  getBlockTime() {
    // 블록이 생성된 시간을 내보냅니다.
    return this.nTime;
  }
};
