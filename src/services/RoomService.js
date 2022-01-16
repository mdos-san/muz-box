import Watcher from "@mdos-san/watcher";
import jsonwebtoken from "jsonwebtoken";
import { v4 } from "uuid";

const RoomService = () => {
  const [watchRoom, setRoom, getRoom] = Watcher({});

  const saveRoomAndPropagate = (room) => {
    setRoom(room);
    window.localStorage.setItem("room", JSON.stringify(room));
  };

  const init = () => {
    if (window.location.pathname !== "/") {
      return initClient();
    } else {
      initRoom();
    }
  };

  const initClient = () => {
    const token = window.location.pathname.slice(1);
    const jsonString = atob(token);
    const { jwt, secret } = JSON.parse(jsonString);
    const data = jsonwebtoken.verify(jwt, secret);
    saveRoomAndPropagate({ data, jwt, secret });
  };

  const initRoom = () => {
    const localStorageRoom = window.localStorage.getItem("room");
    const jsonRoom = localStorageRoom ? JSON.parse(localStorageRoom) : {};
    const data = jsonRoom.data ? jsonRoom.data : { roomId: v4() };
    const secret = jsonRoom.secret ? jsonRoom.secret : v4();
    const jwt = jsonRoom.jwt ? jsonRoom.jwt : jsonwebtoken.sign(data, secret);
    saveRoomAndPropagate({ data, jwt, secret });
  };

  return { init, watchRoom, getRoom };
};

export default RoomService;
