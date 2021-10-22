import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import MainService from "./MainService";

const YoutubeInput = () => {
  const [inputText, setInputText] = useState("");
  const [jwt, setJWT] = useState({});

  useEffect(() => AuthService.watchJWT(setJWT), [])

  return (
    <div className="youtube-input">
      <label className="youtube-input__label">
        Youtube link
        <input
	  className="youtube-input__input"
          value={inputText}
          onChange={(ev) => setInputText(ev.currentTarget.value)}
        />
      </label>
      <button
	className="youtube-input__button"
        onClick={() => {
	  if (inputText.indexOf("=") > -1) {
	    MainService.socket.emit("add-to-cache", jwt.id, inputText.split("=")[1]);
	  } else {
	    MainService.socket.emit("add-to-cache", jwt.id, inputText.split("/")[3]);
	  }
          setInputText("");
        }}
      >
        Add link to the playlist
      </button>
    </div>
  );
};

export default YoutubeInput;
