import { useState, useEffect } from "react";
import AuthService from "./AuthService";
import SocketService from "./SocketService";
import QRCode from "qrcode";

const App = () => {
  const [jwt, setJWT] = useState({});
  const [inputText, setInputText] = useState("");
  const [socketStatus, setSocketStatus] = useState(
    "Socket server not connected"
  );
  const [socketService] = useState(SocketService());
  const [cache, setCache] = useState([]);

  useEffect(() => {
    let mounted = true;
    let unAuth = () => {};

    const fn = async () => {
      // Auth
      await AuthService.init();

      // QRCode setup
      QRCode.toCanvas(
        document.getElementById("qrcode"),
        `${window.location.origin}/${AuthService.getEncodedJWT()}`
      );

      // Socket
      await socketService.init(
        AuthService.getEncodedJWT(),
        AuthService.getJWT()
      );

      // Watch
      socketService.watchCache((newCache) => {
        if (mounted) {
          setCache(newCache);
        }
      });
      unAuth = AuthService.watchJWT((newJWT) => {
        if (mounted) {
          setJWT(newJWT);
        }
      });

      if (mounted) {
        setSocketStatus("Socket connected");
      }
    };
    fn();

    return () => {
      mounted = false;
      unAuth();

      // Get current socket or wait for socket connection, then disconnect
      // This can append if UseEffect's callback is trigered before socket connection
      socketService.watchSocket((s) => {
        if (s != null) {
          s.destroy();
        }
      });
    };
  }, [SocketService, AuthService]);

  return (
    <div>
      <h1>MuzBox</h1>
      <span>RoomId: {jwt.id}</span>
      <canvas id="qrcode"></canvas>
      <label>
        Lien Youtube
        <input
          value={inputText}
          onChange={(ev) => setInputText(ev.currentTarget.value)}
        />
      </label>
      <button
        onClick={() => {
          socketService.emit("add-to-cache", jwt.id, inputText.split("=")[1]);
	  setInputText("");
        }}
      >
        Ajouter
      </button>
      <span>{socketStatus}</span>
      <span>Nombre de musiques: {cache.length}</span>
    </div>
  );
};

export default App;
