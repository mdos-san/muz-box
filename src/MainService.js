import AuthService from "./AuthService";
import PlaylistService from "./PlaylistService";
import SocketService from "./SocketService";
import YoutubeService from "./YoutubeService";

const MainService = () => {
  const pub = {};

  pub.init = async () => {
    const urlToken = window.location.pathname.slice(1);
    await AuthService.init(urlToken);

    pub.socket = SocketService();
    await pub.socket.init(AuthService.getEncodedJWT(), AuthService.getJWT());

    pub.playlist = PlaylistService(pub.socket);
    pub.playlist.init();

    pub.youtube = YoutubeService(global.YT);
    pub.youtube.init();
  };

  pub.clean = () => {
    pub.socket.clean();
    pub.playlist.clean();
  };

  return pub;
};

export default MainService();
