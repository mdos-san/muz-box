import { io } from "socket.io-client";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Watcher from "@mdos-san/watcher";

const SocketService = () => {
  const env = runtimeEnv();
  const defaultCache = window.localStorage.getItem("cache") || [];
  const [watchCache, setCache, getCache] = Watcher(defaultCache);
  const [watchSocket, setSocket, getSocket] = Watcher(null);


  const init = async (token, jwt) => {
    let socket = io(env.REACT_APP_SOCKET_CACHE_URL, {
      forceNew: true,
      query: `token=${token}`,
      extraHeaders: { Authorization: `Bearer ${token}` },
    });

    return new Promise((res, rej) => {
      socket.on("connect", () => {
        setSocket(socket);
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
    getSocket().emit(name, ...args);
  };

  return { emit, init, watchCache, watchSocket };
};

export default SocketService;
