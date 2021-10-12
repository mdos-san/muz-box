import AuthService from "./AuthService";
import PlaylistService from "./PlaylistService";
import SocketService from "./SocketService";

const MainService = () => {
  const pub = {};

  pub.init = async () => {
    await AuthService.init();

    pub.socket = SocketService();
    await pub.socket.init(AuthService.getEncodedJWT(), AuthService.getJWT());

    pub.playlist = PlaylistService(pub.socket);
    pub.playlist.init();
  };

  pub.clean = () => {
    pub.socket.clean();
    pub.playlist.clean();
  };

  return pub;
};

export default MainService();
