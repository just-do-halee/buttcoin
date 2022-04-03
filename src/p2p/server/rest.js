module.exports = {
  _config: {},
  init: function (config = {}) {
    this.config = config;
    return this;
  },
  _model: require('express')(),
  listen: function () {
    const { port } = this._config;
    return this._model.listen(port, () => {
      console.log('Launch Node!', httpServer.address());
    });
  },
};
