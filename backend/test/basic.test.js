const tap = require("tap");
const setupTest = require("./setup");

// When: A message is sent
// Should: Receive the message in the corresponding room
tap.test("add-to-cache: default", async () => {
  const { server, socket } = setupTest();

  socket.on(`add-to-cache`, (patch) => {
    server.close();
    socket.close();

    tap.ok(patch === "424242", "Should receive the patch applied to cache");
  });

  socket.on("joined", () => {
    socket.emit("add-to-cache", "4241", "424242");
  });

  socket.on("connect", () => {
    socket.emit("join", "4241");
  });
});
