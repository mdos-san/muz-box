import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import MainService from "./MainService";

const YoutubeInput = () => {
  const [inputText, setInputText] = useState("");
  const [jwt, setJWT] = useState({});

  useEffect(() => AuthService.watchJWT(setJWT), [])

  return (
    <div>
      <label>
        Lien Youtube
        <input
          value={inputText}
          onChange={(ev) => setInputText(ev.currentTarget.value)}
        />
      </label>
      <button
        onClick={() => {
	  if (inputText.indexOf("=") > -1) {
	    MainService.socket.emit("add-to-cache", jwt.id, inputText.split("=")[1]);
	  } else {
	    MainService.socket.emit("add-to-cache", jwt.id, inputText.split("/")[3]);
	  }
          setInputText("");
        }}
      >
        Ajouter
      </button>
    </div>
  );
};

export default YoutubeInput;
