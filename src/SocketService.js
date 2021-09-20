import { io } from "socket.io-client";
import Watcher from "@mdos-san/watcher";

const SocketService = () => {
  const [watchSocket, setSocket, getSocket] = Watcher(null);
  const [watchCache, setCache, getCache] = Watcher([]);

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
