import { io } from "socket.io-client";
import runtimeEnv from '@mars/heroku-js-runtime-env';
import Watcher from "@mdos-san/watcher";

const SocketService = () => {
  const [watchSocket, setSocket, getSocket] = Watcher(null);
  const [watchCache, setCache, getCache] = Watcher([]);
  const env = runtimeEnv();

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
        setCache([...getCache(), musicId]);
      });
    });
  };

  const emit = (name, ...args) => {
    getSocket().emit(name, ...args);
  };

  return { emit, init, watchCache, watchSocket };
};

export default SocketService;
