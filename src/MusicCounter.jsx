import React, { useEffect, useState } from "react";
import MainService from "./MainService";

const MusicCounter = () => {
  const [cache, setCache] = useState([]);

  useEffect(() => MainService.socket.watchCache(setCache), []);

  return <span>Music counter: {cache.length}</span>;
};

export default MusicCounter;
