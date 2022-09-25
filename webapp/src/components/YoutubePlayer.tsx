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
      className="rounded h-full"
      frameBorder="0"
      height="100%"
      id="youtube-player"
      src={`https://www.youtube.com/embed/?enablejsapi=1&origin=${window.location.origin}`}
      title="YouTube Player"
      width="100%"
    ></iframe>
  );
};

export default YoutubePlayer;
