import { io } from "socket.io-client";
import Watcher from "@mdos-san/watcher";

const SocketService = () => {
  const {
    watchValue: watchSocket,
    setValue: setSocket,
    getValue: getSocket,
  } = Watcher(null);
  const {
    watchValue: watchCache,
    setValue: setCache,
    getValue: getCache,
  } = Watcher([]);

  const init = async (token, jwt) => {
    let socket = io("http://localhost:4241", {
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
