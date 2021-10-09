import AuthService from "./AuthService";
import SocketService from "./SocketService";

const MainService = () => {
  let socket = null;

  const init = async () => {
    await AuthService.init();

    socket = SocketService();
    await socket.init(AuthService.getEncodedJWT(), AuthService.getJWT());
  };

  const clean = () => {
    socket.clean();
  };

  const getSocket = () => socket; 

  return {
    init,
    clean,
    getSocket,
  };
};

export default MainService();
