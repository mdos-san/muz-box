import App from "../App";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

test("Should display a youtube player when music is added", async () => {
  const utils = render(<App />);

  // Assert: Message should be displayed when no music is in playlist
  await waitFor(() => screen.getByText("No music in playlist"));

  const input = screen.getByRole("textbox", { name: "Share a Youtube link" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Share" }));

  await waitFor(() => {
    // Assert: youtube player should be loaded with correct id
    const youtubePlayer = utils.container.querySelector("#youtube-player");
    expect(youtubePlayer).toBeInTheDocument();

    // Assert: Message should not be displayed
    expect(
      screen.queryByText("No music in in playlist")
    ).not.toBeInTheDocument();
  });
});

