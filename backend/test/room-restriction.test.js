const tap = require("tap");
const setupTest = require("./setup");
const clientIO = require("socket.io-client");
const jsonwebtoken = require("jsonwebtoken");

const createClient = (port) => {
  const ioOptions = {
    "force new connection": true,
    transports: ["websocket"],
  };
  return clientIO.connect(`http://localhost:${port}`, ioOptions);
};

tap.test(
  "add-to-cache: should be broacasted only to socket in same room",
  async () => {
    const { server, socket, testPORT } = setupTest();

    // Connect 2 more clients
    const sameRoomSocket = createClient(testPORT);
    const notSameRoomSocket = createClient(testPORT);

    notSameRoomSocket.on("connect", () => {
      notSameRoomSocket.on(`add-to-cache`, (patch) => {
        tap.fail("add-to-cache should not be broacasted to all socket");
      });
    });

    sameRoomSocket.on(`add-to-cache`, (patch) => {
      socket.close();
      sameRoomSocket.close();
      notSameRoomSocket.close();
      server.close();

      tap.ok(patch === "424242", "Should receive the patch applied to cache");
    });

    socket.on("joined", () => {
      socket.emit("add-to-cache", "4241", "424242");
    });

    socket.on("connect", () => {
      socket.emit("join", "4241");
    });

    sameRoomSocket.on("connect", () => {
      sameRoomSocket.emit("join", "4241");
    });
  }
);
