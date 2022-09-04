import { PlaylistServiceInterface } from "./PlaylistService";

const YoutubeService = (YT: any, playlistService: PlaylistServiceInterface) => {
  let player: any = null;

  const init = () => {
    const onReady = () => {
      loadNextMusic();
    };

    const onStateChange = (event: any) => {
      if (event.data === 0) {
        loadNextMusic();
      }
    };

    const onError = () => {
      loadNextMusic();
    };

    player = new YT.Player("youtube-player", {
      height: "390",
      width: "640",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady,
        onStateChange,
        onError,
      },
    });

    setTimeout(() => {
      if (player.getIframe() === null) {
        init(); // retry init
      }
    }, 1000);
  };

  const loadNextMusic = () => {
    const musicId = playlistService.setNextMusicId();
    player.loadVideoById(musicId);
  };

  return { init, loadNextMusic };
};

export default YoutubeService;
