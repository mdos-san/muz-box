import ServiceLoader from "./ServiceLoader";
import MainPage from "./MainPage";

const App = () => (
  <ServiceLoader>
    <MainPage />
  </ServiceLoader>
);

export default App;
