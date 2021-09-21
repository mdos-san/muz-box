import {
  fireEvent,
  render,
  screen,
  wait,
  waitFor,
} from "@testing-library/react";
import App from "./App";

// Start modules used by muzbox
import AuthFactory from "@sharp-mds/auth";
import SocketCacheFactory from "@sharp-mds/socket-cache";

const { server: authServer } = AuthFactory(4242, "test-secret", "*");
const { server: socketCacheFactory, redisClient } = SocketCacheFactory(
  4241,
  null,
  "test-secret"
);

afterAll(() => {
  authServer.close();
  redisClient.quit();
  socketCacheFactory.close();
});

test("Title is displayed", () => {
  render(<App />);

  const mainTitle = screen.getByText(/MuzBox/);
  expect(mainTitle).toBeInTheDocument();
});

test("Should display the uuid of the current room", async () => {
  render(<App />);

  await waitFor(() => {
    const roomId = screen.getByText(/RoomId: .*/i);
    expect(roomId).toBeInTheDocument();
    expect(roomId.textContent.length).toBeGreaterThan(12);
  });
});

test("Should display a QRCode in canvas", async () => {
  const { container } = render(<App />);

  const isCanvasBlank = (canvas) =>
    !canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel) => channel !== 0);

  await waitFor(() => {
    const canvas = container.querySelector("canvas");

    expect(isCanvasBlank(canvas)).toBe(false);
  });
});

test("Should be able to add a music to the cache", async () => {
  render(<App />);

  const input = screen.getByRole("textbox", { name: "Lien Youtube" });
  const addButton = screen.getByRole("button", { name: "Ajouter" });

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
  });

  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(input.value).toBe("");
    expect(screen.getByText(/Nombre de musiques: 1/i)).toBeInTheDocument();
  });
});
