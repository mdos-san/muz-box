import React, {useEffect, useState} from "react";
import MainService from "./MainService";

const MusicDisplayer = () => {
  const [musicId, setMusicId] = useState(null);

  useEffect(() => MainService.playlist.watchMusicId(setMusicId), []);

  return <p>Currently playing {musicId}</p>
};

export default MusicDisplayer;
