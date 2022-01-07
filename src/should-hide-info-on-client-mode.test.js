import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";

test("Should hide youtube player/music counter in client mode", async () => {
  // Start app in client mode
  const token = "TODO-tocken";
  Object.defineProperty(window, "location", {
    value: {
      pathname: "/" + token,
    },
  });
  const { container } = render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("RoomId: predefined-id"));

  expect(screen.queryByText(/Currently playing.*/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Music counter.*/)).not.toBeInTheDocument();
  expect(container.querySelector("canvas")).not.toBeInTheDocument();
  expect(container.querySelector("#youtube-player")).not.toBeInTheDocument();
});
