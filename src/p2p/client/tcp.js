const net = require('net');

const store = {};

const build = (obj) => {
  Object.assign(store, obj);
  return { run };
};

const run = (ip = store.connect) => {
  const { port } = store;
  const client = new net.Socket().connect(port, ip, () => {
    console.log(`[client] connected`);
    client.write('hello world!'); // 3. send data to server
  });
  return client;
};

module.exports = {
  build,
};
