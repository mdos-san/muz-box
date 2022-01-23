import ServiceLoader from "./ServiceLoader";
import MainPage from "./pages/MainPage";

const App = () => (
  <ServiceLoader>
    <MainPage />
  </ServiceLoader>
);

export default App;
