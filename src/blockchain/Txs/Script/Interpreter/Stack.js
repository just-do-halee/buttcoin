/* ---------------- */

const { errorSet } = require('../../util');

const throwError = errorSet({
  outOfBounds: 'out of bounds:',
});

/* ---------------- */

/** 스크립트 인터프리터용 데이터구조입니다.
 */

module.exports = class {
  get length() {
    return this.stack.length;
  }
  constructor(maxSize) {
    this.MAX_SIZE = maxSize;
    this.stack = [];
  }
  push(...item) {
    if (this.length + item.length > this.MAX_SIZE)
      throwError.outOfBounds(
        `LEN(${this.length}) + ITEM_LEN(${item.length}) > MAX(${this.MAX_SIZE})`
      );

    this.stack.push(...item);
  }
  pop(length = 1) {
    if (this.length - length < 0)
      throwError.outOfBounds(`LEN(${this.length}) - ITEM_LEN(${length}) < 0`);

    return this.stack.splice(this.length - length, length);
  }
};
