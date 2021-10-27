import AuthService from "./AuthService";
import PlaylistService from "./PlaylistService";
import SocketService from "./SocketService";
import YoutubeService from "./YoutubeService";

const Services = () => {
  const services = {};

  services.init = async () => {
    const urlToken = window.location.pathname.slice(1);
    await AuthService.init(urlToken);

    services.socket = SocketService();
    await services.socket.init(AuthService.getEncodedJWT(), AuthService.getJWT());

    services.playlist = PlaylistService(services.socket);
    services.playlist.init();

    services.youtube = YoutubeService(global.YT, services.playlist);
    services.youtube.init();
  };

  services.clean = () => {
    services.socket.clean();
    services.playlist.clean();
  };

  return services;
};

export default Services();
