import App from "./App";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

test("Should change music when first is over", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("No music in playlist"));

  // Add first music
  const input = screen.getByRole("textbox", { name: "Share a Youtube link" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=id-1" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Share" }));

  // Add second music
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=id-2" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Share" }));

  // Assert: First music should start
  await waitFor(() => screen.getByText("Currently playing id-1"));

  // Act: Wait first music to end
  act(() => {
    configYT.events.onStateChange({ data: 0 });
  });

  // Assert: Second music should start
  await waitFor(() => screen.getByText("Currently playing id-2"));
  expect(loadedVideo).toBe("id-2");
});
