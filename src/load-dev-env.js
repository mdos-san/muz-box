/* istanbul ignore file */
const AuthFactory = require("@sharp-mds/auth");
const SocketCacheFactory = require("@sharp-mds/socket-cache");

AuthFactory(8080, "test-secret", "*");
SocketCacheFactory(8081, null, "test-secret", "*");
