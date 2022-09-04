import { useEffect, useState } from "react";
import Services from "../services";

const MusicCounter = () => {
  const [cache, setCache] = useState<string[]>([]);

  useEffect(() => Services.socket.watchCache(setCache), []);

  return (
    <span className="music-counter">
      Titres dans la Muz-Box: {cache.length}
    </span>
  );
};

export default MusicCounter;
