import { useState, useEffect } from "react";
import { Button } from "@sharpmds/core";

import Services from "../services";
import MusicCounter from "../components/MusicCounter";
import MusicDisplayer from "../components/MusicDisplayer";
import QRCode from "../components/QRCode";
import SocketStatus from "../components/SocketStatus";
import YoutubeInput from "../components/YoutubeInput";
import YoutubePlayer from "../components/YoutubePlayer";
import RoomDisplayer from "../components/RoomDisplayer";

const MainPage = () => {
  useEffect(() => {
    Services.room.initRoom();
  }, []);

  return (
    <div className="app">
      <img className="logo" src="logo-muzbox.svg" alt="MuzBox" />
      <YoutubeInput />
      <div className="main-part">
        <QRCode />
        <YoutubePlayer />
      </div>
      <Button onClick={() => Services.youtube.loadNextMusic()}>
        Musique suivante
      </Button>
      <div className="info">
        <MusicCounter />
        <MusicDisplayer />
      </div>
      <SocketStatus />
      <RoomDisplayer />
    </div>
  );
};

export default MainPage;
