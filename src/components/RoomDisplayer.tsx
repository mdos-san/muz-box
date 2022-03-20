import { useEffect, useState } from "react";
import Services from "../services";
import { DEFAULT_ROOM, Room } from "../services/RoomService";

const MusicDisplayer = () => {
  const [room, setRoom] = useState<Room>(DEFAULT_ROOM);

  useEffect(() => Services.room.watchRoom(setRoom), []);

  return (
    <p className="hidden">Room Id: {room.data ? room.data.roomId : "empty"}</p>
  );
};

export default MusicDisplayer;
