
import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";

test("Should use token in local storage when available", async () => {
  const token = "todo b64 token json"

  window.localStorage.setItem("token", token);

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("RoomId: predefined-id"));
});

