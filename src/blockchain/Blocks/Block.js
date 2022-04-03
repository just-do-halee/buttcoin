/* ---------------- */

const Txs = require('../Txs');

const BlockHeader = require('./BlockHeader');

/* ---------------- */

/** 노드들은 새로운 트랜잭션들을 하나의 블록에 모아둡니다.
 *  그리고 작업 증명에 만족하는 nonce를 찾아낸 후
 *  최종적인 블록을 완성해
 *  모두에게 전파(브로드캐스팅)합니다.
 *  그 후에 블록체인에 블록을 덧붙입니다.
 *
 *  블록 내 첫 트랜잭션은 블록 채굴자에 대한
 *  시스템으로서의 최초 발행 (코인베이스)보상입니다.
 */

module.exports = class extends BlockHeader {
  get size() {
    return;
  }
  constructor() {
    super();
    this.vtx = new Txs(); // 트랜잭션들
  }
  getBlockHeader() {
    return this.get();
  }
};
