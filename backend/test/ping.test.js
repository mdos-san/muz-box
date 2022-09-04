const tap = require("tap");
const setupTest = require("./setup");

// When: Ping event is sent
// Should: Receive a pong event
tap.test("ping", async () => {
  const { server, socket } = setupTest();

  socket.on("connect", () => {
    socket.on("pong", () => {
      server.close();
      socket.close();

      tap.pass("Should receive pong after ping event");
    });

    socket.emit("ping");
  });
});


