const net = require('net');

const store = {};

const build = (obj) => {
  Object.assign(store, obj);
  return { run };
};

const run = (listeningListener, connectionListener) => {
  const { port } = store;
  return net //
    .createServer(connectionListener)
    .listen(port, listeningListener);
};

module.exports = {
  build,
};
