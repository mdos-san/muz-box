import React, {useEffect, useState} from "react";
import Services from "./services";

const MusicDisplayer = () => {
  const [room, setRoom] = useState({});

  useEffect(() => Services.room.watchRoom(setRoom), []);

  return <p>Room Id: {room.roomId}</p>
};

export default MusicDisplayer;
