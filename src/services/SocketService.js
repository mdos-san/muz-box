import Watcher from "@mdos-san/watcher";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { io } from "socket.io-client";

const createSocket = (jwt, secret) => {
  const env = runtimeEnv();

  return io(env.REACT_APP_SOCKET_CACHE_URL, {
    forceNew: true,
    extraHeaders: { jwt, secret },
  });
};

const SocketService = (roomService) => {
  const [watchCache, setCache, getCache] = Watcher([]);
  const [watchSocket, setSocket, getSocket] = Watcher(null);
  const [watchStatus, setStatus, getStatus] = Watcher("Socket not connected");

  const init = async () => {
    const { jwt, secret, data } = roomService.getRoom();

    const localCache = window.localStorage.getItem("cache");
    if (localCache !== null) {
      setCache(JSON.parse(localCache));
    }

    // Init socket
    console.log("Connecting to room", data);
    const socket = createSocket(jwt, secret);

    return new Promise((res, rej) => {
      socket.on("connect", () => {
        console.log("setting socket");
        setSocket(socket);
        setStatus("Socket connected");
        res();
      });

      socket.on("error", (err) => {
        console.error(err);
      });

      socket.on(`add-to-cache[${data.roomId}]`, (musicId) => {
        if (!musicId) {
          console.error(`Music id '${musicId}' is invalid`);
          return;
        }
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

  const cleanSocket = () => {
    const socket = getSocket();
    if (socket !== null) {
      socket.destroy();
    }
  };

  return {
    clean,
    cleanSocket,
    emit,
    getCache,
    getStatus,
    init,
    watchCache,
    watchSocket,
    watchStatus,
  };
};

export default SocketService;
