import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import jsonwebtoken from "jsonwebtoken";

test("Should start as client when token is in url", async () => {
  const token = btoa(JSON.stringify({
    jwt: jsonwebtoken.sign({ roomId: 42 }, "secret"),
    secret: "secret"
  }));

  Object.defineProperty(window, "location", {
    value: {
      pathname: "/" + token,
    },
  });

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("Socket connected"));
});

