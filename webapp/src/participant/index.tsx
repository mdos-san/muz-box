import YoutubeInput from "../components/YoutubeInput";
import SocketStatus from "../components/SocketStatus";
import { Center, Separator, Services } from "@sharpmds/core";
import { useEffect } from "react";

import MuzBoxServices from "../services";

const ParticipantPage = () => {
  useEffect(() => {
    const params = Services.router.getParams();
    MuzBoxServices.room.loadRoomWithJWT(params.clientToken);
  }, []);

  return (
    <Center>
      <Separator margin="10vh 0 0 0">
        <img className="logo" src="logo-muzbox.svg" alt="MuzBox" />
        <YoutubeInput />
        <SocketStatus />
      </Separator>
    </Center>
  );
};

export default ParticipantPage;
