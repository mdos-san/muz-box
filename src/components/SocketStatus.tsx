import React, { useEffect, useState } from "react";
import Services from "../services";

const SocketStatus = () => {
  const [socketStatus, setSocketStatus] = useState(Services.socket.getStatus());

  useEffect(() => Services.socket.watchStatus(setSocketStatus), []);

  return <div className="hidden">{socketStatus}</div>;
};

export default SocketStatus;
