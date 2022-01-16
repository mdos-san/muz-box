import React, { useEffect, useState } from "react";
import Services from "./services";

const ServiceLoader = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await Services.init();
      setReady(true);
    };
    fn();
    return () => Services.clean();
  }, []);

  return ready ? (
    children
  ) : (
    <div className="loading-screen">
	<img className="logo" src="logo-muzbox.svg" alt="MuzBox logo" />
      <div>Loading...</div>
    </div>
  );
};

export default ServiceLoader;
