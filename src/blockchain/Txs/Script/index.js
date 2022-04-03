/* ---------------- */

const { errorSet } = require('../../util');

const throwError = errorSet({
  unexpectedType: 'type error:',
});

const Interpreter = require('./Interpreter');

const interpreter = new Interpreter();

/* ---------------- */

module.exports = class Script {
  constructor(codes = '') {
    if (typeof codes === 'string') {
      this.script = codes;
    } else if (Array.isArray(codes)) {
      // this.script = serialize(codes);
    } else {
      throwError.unexpectedType(
        typeof codes,
        'the codes must be string or array type.'
      );
    }
  }
  concat(...targets) {
    let script = '';
    for (const target of targets) {
      if (target instanceof Script === false)
        throwError.unexpectedType(`the instace must be 'Script'`);

      script += target.script;
    }
    this.script = script;
    return script;
  }
};
