import React, { useEffect } from "react";
import QRCodeLib from "qrcode";
import Services from "./services";

const QRCode = () => {
  useEffect(() => {
    const { jwt, secret } = Services.room.getRoom();
    const token = btoa(JSON.stringify({ jwt, secret }));
    QRCodeLib.toCanvas(
      document.getElementById("qrcode"),
      `${window.location.origin}/${token}`
    );
  }, []);

  return <canvas id="qrcode"></canvas>;
};

export default QRCode;
