const tap = require("tap");
const setupTest = require("./setup");

// When: A message is sent
// Should: Receive the message in the corresponding room
tap.test("Can gracefully stop the app", async () => {
  const { socket, gracefulStop } = setupTest();

  socket.on("connect", () => {
    gracefulStop();
  });

  socket.on("disconnect", () => {
    tap.ok("Socket has been disconnected");
  });
});
