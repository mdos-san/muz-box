import ServiceLoader from "./ServiceLoader";
import QRCode from "./qr-code-scanner/QRCode.component";
import Participant from "./participant";
import MainPage from "./pages/MainPage";

import { Router } from "@sharpmds/core";
import ModeSelectorPage from "./pages/ModeSelectorPage";

const App = () => {
  return (
    <ServiceLoader>
      <Router
        routes={{
          "/": <ModeSelectorPage />,
          "/room": <MainPage />,
          "/client/{clientToken}": <Participant />,
          "/qrcodescanner": <QRCode />,
        }}
      />
    </ServiceLoader>
  );
};

export default App;
