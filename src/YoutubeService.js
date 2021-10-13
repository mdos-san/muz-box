const YoutubeService = () => {
  const init = () => {
    const { YT } = window;

    const onReady = (event) => {
      console.log("YOLOOO");
      event.target.playVideo();
    };

    const onStateChange = (event) => {
      if (event.data === YT.PlayerState.ENDED) {
        // Ask for new music
        console.log("ask new music");
      }
    };

    setTimeout(() => {
      const player = new YT.Player("youtube-player", {
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
    }, 3000);
  };

  return { init };
};

export default YoutubeService();
