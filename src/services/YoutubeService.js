const YoutubeService = (YT, PlaylistService) => {
  let player = null;

  const init = () => {
    const onReady = (event) => {
      loadNextMusic();
    };

    const onStateChange = (event) => {
      if (event.data === 0) {
        loadNextMusic();
      }
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
      },
    });

    setTimeout(() => {
      if (player.getIframe() === null) {
        init(); // retry init
      }
    }, 1000);
  };

  const loadNextMusic = () => {
    const musicId = PlaylistService.setNextMusicId();
    player.loadVideoById(musicId);
  };

  return { init, loadNextMusic };
};

export default YoutubeService;
