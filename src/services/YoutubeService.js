const YoutubeService = (YT, PlaylistService) => {
  let player = null;

  const init = () => {
    const onReady = (event) => {
      const musicId = PlaylistService.setNextMusicId();
      player.loadVideoById(musicId);
    };

    const onStateChange = (event) => {
      if (event.data === 0) {
        const musicId = PlaylistService.setNextMusicId();
        player.loadVideoById(musicId);
      }
    };

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

    setTimeout(() => {
      if (player.getIframe() === null) {
        init(); // retry init
      }
    }, 1000);
  };

  return { init };
};

export default YoutubeService;
