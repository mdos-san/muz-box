import React, { useEffect } from "react";
import QRCodeService from "./QRCode.service";

import "./QRCode.css";
import { Button, Separator } from "@sharpmds/core";

const QRCodeWrapper = () => {
  useEffect(() => {
    QRCodeService.scan();
  }, []);

  return (
    <div className="page--qrcode">
      <Separator margin="16px 0 0 0">
        <h2>Scanne un QRCode Muz-Box !</h2>
        <video id="qrcode-scanner" className="qrcode__scanner"></video>
        <Button onClick={() => QRCodeService.changeDevice()}>
          Changer de camera
        </Button>
      </Separator>
    </div>
  );
};

export default QRCodeWrapper;
