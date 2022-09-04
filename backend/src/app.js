const { Server } = require("socket.io");

const ioHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("join", (roomId) => {
      socket.join(roomId);
      socket.emit("joined");
    });

    socket.on("add-to-cache", (roomId, musicId) => {
      io.to(roomId).emit(
        `add-to-cache`,
        musicId
      );
      console.log(`[add-to-playlist]: roomId = ${roomId} | musicId = ${musicId}`);
    });
  });
};

const AppFactory = (port, allowedOrigin) => {
  const io = new Server({
    cors: {
      origin: allowedOrigin.split(","),
      methods: ["GET", "POST"],
    },
  });

  // Handler for socket request
  ioHandler(io);

  io.listen(port);

  console.log(`[startup] Application is running`);

  return {
    server: io.httpServer,
    gracefulStop: () => {
      io.sockets.disconnectSockets(true);
      io.httpServer.close();
    },
  };
};

module.exports = AppFactory;
