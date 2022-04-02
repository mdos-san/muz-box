import { useEffect } from "react";
import QRCodeLib from "qrcode";
import Services from "../services";

const QRCode = () => {
  useEffect(() => {
    const { jwt, secret } = Services.room.getRoom();
    const token = btoa(JSON.stringify({ jwt, secret }));
    const url = `${window.location.origin}/#/client/${token}`;

    QRCodeLib.toCanvas(document.getElementById("qrcode"), url);
    console.log(`clientUrl: ${url}`);
  }, []);

  return <canvas id="qrcode"></canvas>;
};

export default QRCode;
