const AppFactory = require("../src/app");
const clientIO = require("socket.io-client");

// Configuration for test
const allowedOrigin = "http://localhost";

const getTestPort = () => {
  const testPORT = Math.floor(Math.random() * 10000);
  return testPORT > 1024 ? testPORT : getTestPort();
};

const setupTest = () => {
  // Setup application
  const testPORT = getTestPort();
  const { server, gracefulStop } = AppFactory(testPORT, allowedOrigin);

  // Setup client
  const options = {
    transports: ["websocket"],
    "force new connection": true,
  };
  const socket = clientIO.connect(`http://localhost:${testPORT}`, options);

  return { server, socket, testPORT, options, gracefulStop };
};

module.exports = setupTest;
