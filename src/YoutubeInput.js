import React, { useState } from "react";
import Services from "./services";

const YoutubeInput = () => {
  const [inputText, setInputText] = useState("");

  const onClick = () => {
    if (inputText.indexOf("=") > -1) {
      Services.socket.emit("add-to-cache", inputText.split("=")[1]);
    } else {
      Services.socket.emit("add-to-cache", inputText.split("/")[3]);
    }
    setInputText("");
  };

  return (
    <div className="youtube-input">
      <label className="youtube-input__label" htmlFor="youtube-input">
        Share a Youtube link
      </label>
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
