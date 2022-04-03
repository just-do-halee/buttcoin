const server = require('./server');
const client = require('./client');

module.exports = new (class extends Builder {
  constructor() {
    super(() => {
      listenTCP();
      client.tcp.build(store).connect();
    });
  }
})();

class Builder {
  constructor(run) {
    this.store = {};
    this.children = [];
    this.run = run;
  }
  build(store) {
    Object.assign(this.store, store);
    return {
      run: (...args) => {
        this.run(...args);
        return {
          stop: () => {
            for (const child of this.children) {
              child.stop();
            }
          },
        };
      },
    };
  }
}

// --------------------------------------

const listenTCP = () => {
  const tcp = server.tcp.build(store).run(
    () => {
      console.log('Listen!', store.port);
    },
    (socket) => {
      socket.on('data', (data) => {
        data = `${data}`;
        switch (data[0]) {
          case '0': // secure handshake
            data.slice(1); // decode with my private key and split
            // hash , sender ip address < check
            // change ip
            // hash , my ip address <
            socket.write(data); // encode with my private key and send
            break;
          case '1':
            break;
          default:
        }
      });
    }
  );
  instances.push(tcp);
};
