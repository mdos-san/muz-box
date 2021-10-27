import Watcher from "@mdos-san/watcher";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { io } from "socket.io-client";

const createSocket = (token) => {
  const env = runtimeEnv();

  return io(env.REACT_APP_SOCKET_CACHE_URL, {
    forceNew: true,
    query: `token=${token}`,
    extraHeaders: { Authorization: `Bearer ${token}` },
  });
};

const SocketService = () => {
  const [watchCache, setCache, getCache] = Watcher([]);
  const [watchSocket, setSocket, getSocket] = Watcher(null);
  const [watchStatus, setStatus, getStatus] = Watcher("Socket not connected");

  const init = async (token, jwt) => {
    const localCache = window.localStorage.getItem("cache");
    if (localCache !== null) {
      setCache(JSON.parse(localCache));
    }

    // Init socket
    const socket = createSocket(token);
    return new Promise((res, rej) => {
      socket.on("connect", () => {
        setSocket(socket);
        setStatus("Socket connected");
        res();
      });

      socket.on(`add-to-cache[${jwt.id}]`, (musicId) => {
        const newCache = [...getCache(), musicId];
        setCache(newCache);
        window.localStorage.setItem("cache", JSON.stringify(newCache));
      });
    });
  };

  const emit = (name, ...args) => {
    const socket = getSocket();

    if (socket.connected) {
      socket.emit(name, ...args);
    } else {
      console.log("TODO: Retry ?");
    }
  };

  const clean = () => {
    watchSocket((s) => {
      if (s !== null) {
        s.destroy();
      }
    });
  };

  return { emit, init, watchCache, watchSocket, clean, watchStatus, getStatus, getCache };
};

export default SocketService;