import Button from "../ui/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Page from "../components/Page";
import QRCodeService from "./QRCode.service";
import { Separator } from "@sharpmds/core";
import { useEffect } from "react";

const QRCodeWrapper = () => {
  useEffect(() => {
    QRCodeService.scan();
  }, []);

  return (
    <Page>
      <Header />

      <div className="h-full">
        <h2>Scanne un QRCode Muz-Box !</h2>
        <video className="container"></video>
        <Button
          onClick={() => QRCodeService.changeDevice()}
          label="Changer de camera"
        />
      </div>

      <Footer />
    </Page>
  );
};

export default QRCodeWrapper;
