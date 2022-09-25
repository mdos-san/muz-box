import MainPage from "./pages/MainPage";
import Participant from "./participant";
import QRCode from "./qr-code-scanner/QRCode.component";
import ServiceLoader from "./ServiceLoader";
import { Router } from "@sharpmds/core";
import HomePage from "./pages/HomePage";
import Modal from "./ui/Modal";

const App = () => {
  return (
    <ServiceLoader>
      <Router
        routes={{
          "/": <HomePage />,
          "/room": <MainPage />,
          "/client/{clientToken}": <Participant />,
          "/qrcodescanner": <QRCode />,
        }}
      />
    </ServiceLoader>
  );
};

export default App;
