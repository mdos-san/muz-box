import { BrowserQRCodeReader, VideoInputDevice } from "@zxing/library";
import { Services } from "@sharpmds/core";

const QRCodeService = () => {
  let devices: VideoInputDevice[] = [];
  let deviceIndex = 0;

  const codeReader = new BrowserQRCodeReader();
  codeReader.getVideoInputDevices().then((d) => (devices = d));

  const scan = async () => {
    codeReader
      .decodeFromInputVideoDevice(
        devices[deviceIndex].deviceId,
        "qrcode-scanner"
      )
      .then((result) => {
        const path = result.getText().split("#")[1];
        Services.router.setPath(path);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeDevice = () => {
    deviceIndex++;

    if (deviceIndex === devices.length) {
      deviceIndex = 0;
    }

    scan();
  };

  return { scan, changeDevice };
};

export default QRCodeService();
