import React, { useEffect, useState } from "react";
import MainService from "./MainService";

const MusicCounter = () => {
  const [cache, setCache] = useState([]);

  useEffect(() => MainService.socket.watchCache(setCache), []);

  return <span>Nombre de musiques: {cache.length}</span>;
};

export default MusicCounter;
