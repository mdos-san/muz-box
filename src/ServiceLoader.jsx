import React, { useEffect, useState } from "react";
import MainService from "./MainService";

const ServiceLoader = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await MainService.init();
      setReady(true);
    };
    fn();
    return () => MainService.clean();
  }, []);

  return ready ? children : <div>Loading...</div>;
};

export default ServiceLoader;
