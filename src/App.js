import { useState, useEffect } from "react";
import AuthService from "./AuthService";

const App = () => {
  const [jwt, setJWT] = useState({});

  useEffect(() => {
    const fn = async () => {
      await AuthService.init();
      setJWT(AuthService.getJWT());
    };
    fn();
  }, []);

  return (
    <div>
      <h1>MuzBox</h1>
      <span>{jwt.id}</span>
    </div>
  );
};

export default App;
