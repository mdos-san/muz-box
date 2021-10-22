import { useState, useEffect } from "react";

import AuthService from "./AuthService";
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
        <h1>MuzBox</h1>
        {!isClient && (
          <>
            <QRCode jwt={jwt} />
            <YoutubePlayer />
            <MusicCounter />
            <MusicDisplayer />
          </>
        )}
        <YoutubeInput />
        <SocketStatus />
        <span>RoomId: {jwt.id}</span>
      </div>
    </ServiceLoader>
  );
};

export default App;
