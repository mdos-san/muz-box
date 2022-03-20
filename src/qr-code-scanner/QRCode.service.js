import { BrowserQRCodeReader } from "@zxing/library";
import { Services } from "@sharpmds/core";
import MBServices from "../services";

const QRCodeService = () => {
  let devices = [];
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
        const jwt = result.getText().split("/")[3];
        Services.router.setPage("participant");
        MBServices.room.loadRoomWithJWT(jwt);
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
