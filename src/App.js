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

  useEffect(() => AuthService.watchJWT(setJWT), []);

  return (
    <ServiceLoader>
      <div>
        <h1>MuzBox</h1>
        <QRCode jwt={jwt} />
	<YoutubePlayer />
        <YoutubeInput />
        <SocketStatus />
        <span>RoomId: {jwt.id}</span>
        <MusicCounter />
	<MusicDisplayer />
      </div>
    </ServiceLoader>
  );
};

export default App;
