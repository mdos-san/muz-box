import { Watcher } from "@sharpmds/core";
import { WatchValue } from "@sharpmds/core/build/esm/utils/Watcher";
import { SocketServiceInterface } from "./SocketService";

export interface PlaylistServiceConstructor {
  (socketService: SocketServiceInterface): PlaylistServiceInterface;
}

export interface PlaylistServiceInterface {
  init: () => void;
  clean: () => void;
  watchMusicId: WatchValue<string | null>;
  setNextMusicId: () => void;
}

export interface Playlist {
  musicList: string[];
  newList: string[];
}

const PlaylistService: PlaylistServiceConstructor = (
  socketService: SocketServiceInterface
) => {
  let initiated = false;
  const [watchMusicId, setMusicId, getMusicId] = Watcher<string | null>(null);
  let playlist: Playlist = {
    musicList: [],
    newList: [],
  };
  let intervalId: NodeJS.Timer | null = null;

  const setNextMusicId = () => {
    let musicId = null;

    if (playlist.newList.length > 0) {
      const shifted: string | undefined = playlist.newList.shift();

      if (shifted) {
        playlist.musicList.push(shifted);
        musicId = shifted;
      }
    } else if (playlist.musicList.length > 0) {
      const randomIndex = parseInt(
        (Math.random() * playlist.musicList.length).toString()
      );
      musicId = playlist.musicList[randomIndex];
    }

    setMusicId(musicId);
    return musicId;
  };

  const clean = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const init = () => {
    playlist.musicList = socketService.getCache();

    socketService.watchCache((cache) => {
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
