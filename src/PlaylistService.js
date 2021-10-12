import Watcher from "@mdos-san/watcher";

const PlaylistService = (SocketService) => {
  const [watchMusicId, setMusicId, getMusicId] = Watcher(null);
  let cache = [];
  let intervalId = null;

  const init = () => {
    SocketService.watchCache((c) => (cache = c));

    intervalId = setInterval(() => {
      if (getMusicId() === null && cache.length > 0) {
        setMusicId(cache[0]);
      }
    }, 1000);
  };

  const clean = () => {
    clearInterval(intervalId);
  };

  return { init, clean, watchMusicId };
};

export default PlaylistService;
