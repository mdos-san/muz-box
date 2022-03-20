import YoutubeInput from "../components/YoutubeInput";
import SocketStatus from "../components/SocketStatus";
import {Center, Separator} from "@sharpmds/core";


const ParticipantPage = () => {
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
