import { useState, useEffect } from "react";

import AuthService from "./AuthService";
import MusicCounter from "./MusicCounter";
import QRCode from "./QRCode";
import ServiceLoader from "./ServiceLoader";
import SocketStatus from "./SocketStatus";
import YoutubeInput from "./YoutubeInput";

const App = () => {
  const [jwt, setJWT] = useState({});

  useEffect(() => AuthService.watchJWT(setJWT), []);

  return (
    <ServiceLoader>
      <div>
	<h1>MuzBox</h1>
	<QRCode jwt={jwt}/>
	<YoutubeInput />
	<SocketStatus />
	<span>RoomId: {jwt.id}</span>
	<MusicCounter />
      </div>
    </ServiceLoader>
  );
};

export default App;
