import { Watcher } from "@sharpmds/core";
import {
  GetWatcherValue,
  WatchValue,
} from "@sharpmds/core/build/esm/utils/Watcher";
import jsonwebtoken from "jsonwebtoken";
import { v4 } from "uuid";
import Services from "./index";

export interface RoomData {
  roomId: string;
}

export interface Room {
  data: RoomData;
  secret: string;
  jwt: string;
}

export interface RoomServiceConstructor {
  (): RoomServiceInterface;
}

export interface RoomServiceInterface {
  initRoom: () => void;
  loadRoomWithJWT: (jwt: string) => void;
  watchRoom: WatchValue<Room>;
  getRoom: GetWatcherValue<Room>;
}

export const DEFAULT_ROOM: Room = {
  data: { roomId: "default" },
  secret: "",
  jwt: "",
};

const RoomService: RoomServiceConstructor = () => {
  const [watchRoom, setRoom, getRoom] = Watcher<Room>(DEFAULT_ROOM);

  const saveRoomAndPropagate = (room: Room) => {
    setRoom(room);
    window.localStorage.setItem("room", JSON.stringify(room));
  };

  const initRoom = () => {
    const localStorageRoom = window.localStorage.getItem("room");
    const jsonRoom = localStorageRoom ? JSON.parse(localStorageRoom) : {};
    const data = jsonRoom.data ? jsonRoom.data : { roomId: v4() };
    const secret = jsonRoom.secret ? jsonRoom.secret : v4();
    const jwt = jsonRoom.jwt ? jsonRoom.jwt : jsonwebtoken.sign(data, secret);
    saveRoomAndPropagate({ data, jwt, secret });
  };

  const loadRoomWithJWT = (roomJWT: string) => {
    const jsonString = atob(roomJWT);
    const { jwt, secret } = JSON.parse(jsonString);
    const data = jsonwebtoken.verify(jwt, secret) as RoomData;
    saveRoomAndPropagate({ data, jwt, secret });
    Services.socket.cleanSocket();
    Services.socket.init();
  };

  return { initRoom, watchRoom, getRoom, loadRoomWithJWT };
};

export default RoomService;
