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
    expect(screen.getByText("Titres dans la Muz-Box: 2")).toBeInTheDocument();
  });
});

