import React, { useEffect } from "react";
import QRCodeService from "./QRCode.service";

import "./QRCode.css";

const QRCodeWrapper = () => {
  useEffect(() => {
    QRCodeService.scan();
  }, []);

  return (
    <div className="page--qrcode">
      <video id="qrcode-scanner" className="qrcode__scanner"></video>
    </div>
  );
};

export default QRCodeWrapper;
