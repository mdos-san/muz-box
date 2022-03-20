import PlaylistService from "./PlaylistService";
import RoomService from "./RoomService";
import SocketService from "./SocketService";
import YoutubeService from "./YoutubeService";

const Services = () => {
  const services = {};

  services.init = async () => {
    services.room = RoomService();
    services.room.init();

    services.socket = SocketService(services.room);
    await services.socket.init();

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
