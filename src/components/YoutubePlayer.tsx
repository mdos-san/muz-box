import { useEffect, useState } from "react";
import Services from "../services";

const YoutubePlayer = () => {
  const [musicId, setMusicId] = useState<string | null>(null);

  useEffect(() => Services.playlist.watchMusicId(setMusicId), []);

  if (musicId === null || musicId === undefined) {
    return <p className="youtube-player">No music in playlist</p>;
  }

  return (
    <iframe
      title="YouTube Player"
      id={`youtube-player`}
      className="youtube-player"
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/?enablejsapi=1&origin=${window.location.origin}`}
      frameBorder="0"
    ></iframe>
  );
};

export default YoutubePlayer;
