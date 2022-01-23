import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

test("Should load music from local storage", async () => {
  window.localStorage.setItem(
    "cache",
    JSON.stringify(["music-id-1", "music-id-2"])
  );

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
    expect(screen.getByText("Music counter: 2")).toBeInTheDocument();
  });
});

