import { BrowserQRCodeReader } from "@zxing/library";
import { Services } from "@sharpmds/core";

const QRCodeService = () => {
  const scan = async () => {
    const codeReader = new BrowserQRCodeReader();
    const devices = await codeReader.getVideoInputDevices();
    codeReader
      .decodeFromInputVideoDevice(devices[0].deviceId, "qrcode-scanner")
      .then((result) => {
        Services.router.setPage("participant");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { scan };
};

export default QRCodeService();
