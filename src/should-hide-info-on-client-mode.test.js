import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import jsonwebtoken from "jsonwebtoken";

test("Should hide youtube player/music counter in client mode", async () => {
  const token = btoa(JSON.stringify({
    jwt: jsonwebtoken.sign({ roomId: 42 }, "secret"),
    secret: "secret"
  }));

  Object.defineProperty(window, "location", {
    value: {
      pathname: "/" + token,
    },
  });
  const { container } = render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("Socket connected"));

  expect(screen.queryByText(/Currently playing.*/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Music counter.*/)).not.toBeInTheDocument();
  expect(container.querySelector("canvas")).not.toBeInTheDocument();
  expect(container.querySelector("#youtube-player")).not.toBeInTheDocument();
});
