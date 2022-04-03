/* ---------------- */

const { errorSet } = require('../../util');

const throwError = errorSet({
  parse: 'parse error:',
});

const { policy } = require('../../../../config');

const OPCODES = require('./opcodetype');
const Stack = require('./Stack');

/* ---------------- */

module.exports = class {
  constructor() {
    this.stack = new Stack(policy.inner.MAX_STACK_SIZE);
  }
};
