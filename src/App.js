import ServiceLoader from "./ServiceLoader";
import MainPage from "./pages/MainPage";

import { RouterService, Router } from "@sharpmds/core";
import ModeSelectorPage from "./pages/ModeSelectorPage";

const App = () => (
  <ServiceLoader>
    <Router routes={{
        "default": <ModeSelectorPage />,
        "room": <MainPage />,
    }} />
  </ServiceLoader>
);

export default App;
