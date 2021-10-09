import React, {useEffect, useState} from "react";
import MainService from "./MainService";

const SocketStatus = () => {
  const [socketStatus, setSocketStatus] = useState(MainService.getSocket().getStatus());

  useEffect(() => MainService.getSocket().watchStatus(setSocketStatus), [])

  return <div>{socketStatus}</div>
}

export default SocketStatus;
