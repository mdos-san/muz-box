import Watcher from "@mdos-san/watcher";
import MainService from "./MainService";

const PlaylistService = (SocketService) => {
  let initiated = false;
  const [watchMusicId, setMusicId, getMusicId] = Watcher(null);
  let playlist = {
    musicList: [],
    newList: [],
  };
  let intervalId = null;

  const setNextMusicId = () => {
    let musicId = null;

    if (playlist.newList.length > 0) {
      const shifted = playlist.newList.shift();
      playlist.musicList.push(shifted);
      musicId = shifted;
    } else if (playlist.musicList.length > 0) {
      const randomIndex = parseInt(Math.random() * playlist.musicList.length);
      musicId = playlist.musicList[randomIndex];
    }

    setMusicId(musicId);
    return musicId;
  };

  const clean = () => {
    clearInterval(intervalId);
  };

  const init = () => {
    playlist.musicList = MainService.socket.getCache();
    MainService.socket.watchCache((cache) => {
      if (initiated) {
        playlist.newList.push(cache[cache.length - 1]);
      }
    });

    intervalId = setInterval(() => {
      if (getMusicId()) {
        return;
      }

      setNextMusicId();
    }, 1000);

    initiated = true;
  };

  return { init, clean, watchMusicId, setNextMusicId };
};

export default PlaylistService;
