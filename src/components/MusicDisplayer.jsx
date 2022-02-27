import React, {useEffect, useState} from "react";
import Services from "../services";

const MusicDisplayer = () => {
  const [musicId, setMusicId] = useState(null);

  useEffect(() => Services.playlist.watchMusicId(setMusicId), []);

  return <p className="hidden">Currently playing {musicId}</p>
};

export default MusicDisplayer;
