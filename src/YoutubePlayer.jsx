import React, { useEffect, useState } from "react";
import MainService from "./MainService";

const YoutubePlayer = () => {
  const [musicId, setMusicId] = useState(null);

  useEffect(() => MainService.playlist.watchMusicId(setMusicId));

  if (musicId === null) {
    return <p>No music in playlist</p>;
  }

  return (
    <iframe
      id={`youtube-player-${musicId}`}
      type="text/html"
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&origin=${window.location.origin}`}
      frameBorder="0"
    ></iframe>
  );
};

export default YoutubePlayer;
