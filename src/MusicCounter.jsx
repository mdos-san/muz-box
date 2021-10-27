import React, { useEffect, useState } from "react";
import Services from "./services";

const MusicCounter = () => {
  const [cache, setCache] = useState([]);

  useEffect(() => Services.socket.watchCache(setCache), []);

  return <span>Music counter: {cache.length}</span>;
};

export default MusicCounter;
