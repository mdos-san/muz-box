import { useState, useEffect } from "react";

import AuthService from "./services/AuthService";
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

  useEffect(() => AuthService.watchJWT(setJWT), []);
  useEffect(() => AuthService.watchIsClient(setIsClient), []);

  return (
    <ServiceLoader>
      <div className="app">
	<img class="logo" src="logo-muzbox.svg" />
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
        <span className="room-id">RoomId: {jwt.id}</span>
      </div>
    </ServiceLoader>
  );
};

export default App;
