import Watcher from "@mdos-san/watcher";

const RoomService = () => {
  const [watchRoom, setRoom, getRoom] = Watcher({
    roomId: "toto"
  }); // TODO: uuidv4

  const init = () => {};

  return { init, watchRoom, setRoom, getRoom };
}

export default RoomService;
