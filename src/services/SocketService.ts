// @ts-ignore
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { Watcher } from "@sharpmds/core";
import {
  GetWatcherValue,
  WatchValue,
} from "@sharpmds/core/build/esm/utils/Watcher";
import { io, Socket } from "socket.io-client";
import { RoomServiceInterface } from "./RoomService";

export interface SocketServiceConstructor {
  (roomService: RoomServiceInterface): SocketServiceInterface;
}

export interface SocketServiceInterface {
  clean: () => void;
  cleanSocket: () => void;
  emit: (name: string, ...args: unknown[]) => void;
  getCache: GetWatcherValue<string[]>;
  getStatus: GetWatcherValue<string>;
  init: () => Promise<unknown>;
  watchCache: WatchValue<string[]>;
  watchSocket: WatchValue<Socket | null>;
  watchStatus: WatchValue<string>;
}

const SocketService: SocketServiceConstructor = (
  roomService: RoomServiceInterface
) => {
  const [watchCache, setCache, getCache] = Watcher<string[]>([]);
  const [watchSocket, setSocket, getSocket] = Watcher<Socket | null>(null);
  const [watchStatus, setStatus, getStatus] = Watcher("Socket not connected");

  const init = async () => {
    const { data } = roomService.getRoom();

    const localCache = window.localStorage.getItem("cache");
    if (localCache !== null) {
      setCache(JSON.parse(localCache));
    }

    const socket = createSocket();

    return new Promise<void>((res, rej) => {
      socket.on("connect", () => {
        socket.emit("join", data.roomId);
        setSocket(socket);
        setStatus("Socket connected");
        res();
      });

      socket.on("connect_error", (err) => {
        console.error("custom", JSON.stringify(err));
      });

      socket.on(`add-to-cache`, (musicId) => {
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

  const emit = (name: string, ...args: unknown[]) => {
    const socket = getSocket();

    if (socket === null) {
      console.error(`[SocketService - emit] socket is null`);
      return;
    }

    if (socket.connected) {
      socket.emit(name, ...args);
    } else {
      console.log("TODO: Retry ?");
    }
  };

  const clean = () => {
    watchSocket((socket: Socket | null) => {
      if (socket !== null) {
        socket.disconnect();
      }
    });
  };

  const cleanSocket = () => {
    const socket = getSocket();
    if (socket !== null) {
      socket.disconnect();
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

const createSocket = () => {
  return io(process.env.REACT_APP_SOCKET_CACHE_URL || "http://localhost:8081", {
    forceNew: true,
  });
};

export default SocketService;