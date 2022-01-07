import App from "./App";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

test("Can add a music with short link", async () => {
  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
  });

  const input = screen.getByRole("textbox", { name: "Share a Youtube link" });
  fireEvent.change(input, {
    target: { value: "https://youtu.be/Gs069dndIYk" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Share" }));

  // Assert: Music number should be displayed on screen
  await waitFor(() => screen.getByText("Music counter: 1"));

  // Assert: Music id should be stored in local storage
  const cache = JSON.parse(window.localStorage.getItem("cache"));
  expect(cache[0]).toBe("Gs069dndIYk");
});

