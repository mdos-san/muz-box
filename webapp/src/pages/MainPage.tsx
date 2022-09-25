import Card from "../ui/Card";
import Layout from "../components/Layout";
import Modal from "../ui/Modal";
import Services from "../services";
import YoutubePlayer from "../components/YoutubePlayer";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    Services.room.initRoom();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="w-full h-full flex items-center flex-col">
          <YoutubePlayer />
          <Card className="w-full h-1/4 mt-4 flex items-center justify-center">
            <WrenchScrewdriverIcon className="h-16 text-neutral-400" />
          </Card>
        </div>

        <Card className="w-full mt-4 flex items-center justify-center lg:mt-0 lg:ml-4 lg:w-1/3">
          <WrenchScrewdriverIcon className="h-16 text-neutral-400" />
        </Card>
      </div>

      <Modal />
    </Layout>
  );
};

export default MainPage;
