import React, {useEffect, useState} from "react";
import MainService from "./MainService";

const SocketStatus = () => {
  const [socketStatus, setSocketStatus] = useState(MainService.socket.getStatus());

  useEffect(() => MainService.socket.watchStatus(setSocketStatus), [])

  return <div>{socketStatus}</div>
}

export default SocketStatus;
