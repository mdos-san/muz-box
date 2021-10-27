import React, { useEffect } from "react";
import QRCodeLib from "qrcode";
import AuthService from "./services/AuthService";

const QRCode = ({ jwt }) => {
  useEffect(() => {
    QRCodeLib.toCanvas(
      document.getElementById("qrcode"),
      `${window.location.origin}/${AuthService.getEncodedJWT()}`
    );
  }, [jwt]);

  return <canvas id="qrcode"></canvas>;
};

export default QRCode;
