import React, { useEffect } from "react";
import QRCodeService from "./QRCode.service";

const QRCodeWrapper = ({ isActive = true}) => {
  useEffect(() => {
    QRCodeService.scan();
  }, []);

  return (
    <div
      className={`qrcode-wrapper ${isActive ? "qrcode-wrapper--active" : ""}`}
    >
      <video id="qrcode-scanner"></video>
    </div>
  );
};

export default QRCodeWrapper;
