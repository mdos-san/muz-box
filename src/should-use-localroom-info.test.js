import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import jsonwebtoken from "jsonwebtoken";

test("Should use token in local storage when available", async () => {
  const room = {
    secret: "secret",
    data: {
      roomId: "predefined-id",
    },
    jwt: jsonwebtoken.sign({ roomId: "predefined-id" }, "secret"),
  };

  window.localStorage.setItem("room", JSON.stringify(room));

  render(<App />);

  await waitFor(() => screen.getByText("Socket connected"));
  await waitFor(() => screen.getByText("Room Id: predefined-id"));
});
