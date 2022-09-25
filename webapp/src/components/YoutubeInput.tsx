import Services from "../services";
import { useState } from "react";

const YoutubeInput = () => {
  const [inputText, setInputText] = useState("");

  const onClick = () => {
    if (inputText.indexOf("=") > -1) {
      Services.socket.emit(
        "add-to-cache",
        Services.room.getRoom().data.roomId,
        inputText.split("=")[1]
      );
    } else {
      Services.socket.emit(
        "add-to-cache",
        Services.room.getRoom().data.roomId,
        inputText.split("/")[3]
      );
    }
    setInputText("");
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Ajouter une vidéo
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>
          Copiez collez un lien Youtube ci-dessous pour l'ajouter à la playlist.
        </p>
      </div>
      <form className="mt-5 sm:flex sm:items-center">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={inputText}
            onChange={(ev) => setInputText(ev.currentTarget.value)}
            placeholder="https://youtu.be/..."
          />
        </div>
        <button
          type="submit"
          onClick={onClick}
          className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Partager
        </button>
      </form>
    </div>
  );
};

export default YoutubeInput;
