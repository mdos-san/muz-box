import PlaylistService from "./PlaylistService";
import RoomService from "./RoomService";
import SocketService from "./SocketService";
import YoutubeService from "./YoutubeService";

const Services = () => {
  const room = RoomService();
  const socket = SocketService(room);
  const playlist = PlaylistService(socket);
  const youtube = YoutubeService((global as any).YT, playlist);

  const init = async () => {
    room.init();
    await socket.init();
    playlist.init();
    youtube.init();
  };

  const clean = () => {
    socket.clean();
    playlist.clean();
  };

  return {
    room,
    socket,
    playlist,
    youtube,
    init,
    clean,
  };
};

export default Services();
