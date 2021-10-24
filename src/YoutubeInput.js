import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import MainService from "./MainService";

const YoutubeInput = () => {
  const [inputText, setInputText] = useState("");
  const [jwt, setJWT] = useState({});

  useEffect(() => AuthService.watchJWT(setJWT), []);

  const onClick = () => {
    if (inputText.indexOf("=") > -1) {
      MainService.socket.emit("add-to-cache", jwt.id, inputText.split("=")[1]);
    } else {
      MainService.socket.emit("add-to-cache", jwt.id, inputText.split("/")[3]);
    }
    setInputText("");
  };

  return (
    <div className="youtube-input">
      <label className="youtube-input__label" htmlFor="youtube-input">Share a Youtube link</label>
      <input
	id="youtube-input"
        className="youtube-input__input"
        value={inputText}
        onChange={(ev) => setInputText(ev.currentTarget.value)}
	placeholder="https://youtu.be/..."
      />
      <button className="youtube-input__button" onClick={onClick}>
        Share
      </button>
    </div>
  );
};

export default YoutubeInput;
