import MainService from "./MainService";

const YoutubeService = (YT) => {
  let player = null;

  const init = () => {
    const onReady = (event) => {
      const musicId = MainService.playlist.setNextMusicId();
      player.loadVideoById(musicId);
    };

    const onStateChange = (event) => {
      if (event.data === 0) {
        const musicId = MainService.playlist.setNextMusicId();
        player.loadVideoById(musicId);
      }
    };

    setTimeout(() => {
      player = new YT.Player("youtube-player", {
        height: "390",
        width: "640",
        videoId: "M7lc1UVf-VE",
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady,
          onStateChange,
        },
      });

      if (player.getIframe() === null) {
        init(); // retry init
      }
    }, 3000);
  };

  return { init };
};

export default YoutubeService;
