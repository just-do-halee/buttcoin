/* ---------------- */

/* ---------------- */

class BlockChain {
  constructor() {
    this.blocks = [];
  }
}

module.exports = {
  run: function (config) {
    this._server.tcp.init(config).listen();
  },
};
