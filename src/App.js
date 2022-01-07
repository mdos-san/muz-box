import { useState, useEffect } from "react";

import MusicCounter from "./MusicCounter";
import MusicDisplayer from "./MusicDisplayer";
import QRCode from "./QRCode";
import ServiceLoader from "./ServiceLoader";
import SocketStatus from "./SocketStatus";
import YoutubeInput from "./YoutubeInput";
import YoutubePlayer from "./YoutubePlayer";

const App = () => {
  const [jwt, setJWT] = useState({});
  const [isClient, setIsClient] = useState(false);

  return (
    <ServiceLoader>
      <div className="app">
	<img className="logo" src="logo-muzbox.svg" alt="MuzBox" />
        {!isClient && (
          <div className="main-part">
            <QRCode jwt={jwt} />
            <YoutubePlayer />
          </div>
        )}
        <YoutubeInput />
        {!isClient && (
	  // TODO: Make an info button
          <div className="info">
            <MusicCounter />
            <MusicDisplayer />
            <SocketStatus />
          </div>
        )}
      </div>
    </ServiceLoader>
  );
};

export default App;
