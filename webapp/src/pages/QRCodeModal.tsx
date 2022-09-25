import QRCode from "../components/QRCode";
import Heading from "../ui/Heading";

const QRCodeModal = (): JSX.Element => {
  return (
    <>
      <Heading>
        Scanne ce QRCode
        <br />
        pour rejoindre
      </Heading>
      <QRCode />
    </>
  );
};

export default QRCodeModal;
