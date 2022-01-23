import React, {useEffect, useState} from "react";
import Services from "../services";

const MusicDisplayer = () => {
  const [room, setRoom] = useState({});

  useEffect(() => Services.room.watchRoom(setRoom), []);

  return <p>Room Id: {(room.data) ? room.data.roomId : "empty"}</p>
};

export default MusicDisplayer;
