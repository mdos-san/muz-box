import App from "../App";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

test("Can add a music", async () => {
  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
  });

  const input = screen.getByRole("textbox", { name: "Share a Youtube link" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Share" }));

  // Assert: Music number should be displayed on screen
  await waitFor(() => screen.getByText("Music counter: 1"));

  // Assert: Music id should be stored in local storage
  const cache = JSON.parse(window.localStorage.getItem("cache"));
  expect(cache[0]).toBe("dQw4w9WgXcQ");

  // Assert: Input should be cleared
  expect(input.value).toBe("");
});

