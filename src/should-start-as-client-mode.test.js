import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";

test("Should start as client when token is in url", async () => {
  const token = "todo b64 json token"
  Object.defineProperty(window, "location", {
    value: {
      pathname: "/" + token,
    },
  });

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("RoomId: predefined-id"));
});

