// **** WARNING ****
/* ---------------- */

/** 1 BTTC 만큼의 hwakyeom 양 */
const COIN = 100000000;

/** 이보다 큰 hwakyeom 은 존재하지 않습니다.
 *  이것은 상수로서 총 발행량을 의미합니다.
 *  블록체인 네트워크의 `합의` 과정에 있어서
 *  중요 지점이기도 합니다.
 */
const MAX_MONEY = 21000000 * COIN;

/* ---------------- */

module.exports = {
  COIN,
  MAX_MONEY,
};
