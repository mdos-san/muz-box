import ServiceLoader from "./ServiceLoader";
import QRCode from "./qr-code-scanner/QRCode.component";
import Participant from "./participant";
import MainPage from "./pages/MainPage";

import { Router } from "@sharpmds/core";
import ModeSelectorPage from "./pages/ModeSelectorPage";

const App = () => (
  <ServiceLoader>
    <Router
      routes={{
        default: <ModeSelectorPage />,
        room: <MainPage />,
        "qr-code-scanner": <QRCode />,
        participant: <Participant />,
      }}
    />
  </ServiceLoader>
);

export default App;
