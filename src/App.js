import { useState, useEffect } from "react";
import AuthService from "./AuthService";
import QRCode from "qrcode";

const App = () => {
  const [jwt, setJWT] = useState({});

  useEffect(() => {
    const fn = async () => {
      await AuthService.init();
      setJWT(AuthService.getJWT());
      QRCode.toCanvas(
        document.getElementById("qrcode"),
        `${window.location.origin}/${AuthService.getEncodedJWT()}`
      );
    };
    fn();
  }, []);

  return (
    <div>
      <h1>MuzBox</h1>
      <span>{jwt.id}</span>
      <canvas id="qrcode"></canvas>
    </div>
  );
};

export default App;
