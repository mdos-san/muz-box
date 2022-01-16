import { useState, useEffect } from "react";

import MusicCounter from "./MusicCounter";
import MusicDisplayer from "./MusicDisplayer";
import QRCode from "./QRCode";
import SocketStatus from "./SocketStatus";
import YoutubeInput from "./YoutubeInput";
import YoutubePlayer from "./YoutubePlayer";
import RoomDisplayer from "./RoomDisplayer";

const MainPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setIsClient(true);
    }
  }, []);

  return (
      <div className="app">
        <img className="logo" src="logo-muzbox.svg" alt="MuzBox" />
        {!isClient && (
          <div className="main-part">
            <QRCode />
            <YoutubePlayer />
          </div>
        )}
        <YoutubeInput />
        {!isClient && (
          // TODO: Make an info button
          <div className="info">
            <MusicCounter />
            <MusicDisplayer />
          </div>
        )}
        <SocketStatus />
        <RoomDisplayer />
      </div>
  );
};

export default MainPage;
