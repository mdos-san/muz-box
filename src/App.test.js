import App from "./App";
import AuthFactory from "@sharp-mds/auth";
import SocketCacheFactory from "@sharp-mds/socket-cache";
import jwt from "jsonwebtoken";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

// Mock the youtube iframe API
// TODO: Try to make a cleaner mock interface
let configYT = null;
let loadedVideo = null;
global.YT = {
  Player: class {
    constructor(id, c) {
      configYT = c;
    }

    getIframe() {
      return {};
    }

    loadVideoById(id) {
      loadedVideo = id;
    }
  },
};

// Start modules used by muzbox
const { server: authServer } = AuthFactory(4242, "test-secret", "*");
const { server: socketCacheFactory, redisClient } = SocketCacheFactory(
  4241,
  null,
  "test-secret",
  "*"
);

afterAll(() => {
  authServer.close();
  redisClient.quit();
  socketCacheFactory.close();
  configYT = null;
  loadedVideo = null;
});

const clean = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("cache");
};

test("Title is displayed", async () => {
  render(<App />);

  // Assert: Title is displayed
  await waitFor(() => screen.getByText("MuzBox"));

  clean();
});

test("Should display the uuid of the current room", async () => {
  render(<App />);

  await waitFor(() => {
    const roomId = screen.getByText(/RoomId: .*/i);
    expect(roomId).toBeInTheDocument();
    expect(roomId.textContent.length).toBeGreaterThan(12);
  });

  clean();
});

test("Should store fetched jwt after a fetch", async () => {
  render(<App />);

  await waitFor(() => {
    const roomId = screen.getByText(/RoomId: .*/i);
    expect(roomId).toBeInTheDocument();
    expect(roomId.textContent.length).toBeGreaterThan(12);
    expect(window.localStorage.getItem("token")).toBeTruthy();
  });

  clean();
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

  clean();
});

test("Can add a music", async () => {
  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
  });

  const input = screen.getByRole("textbox", { name: "Lien Youtube" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

  // Assert: Music number should be displayed on screen
  await waitFor(() => screen.getByText("Nombre de musiques: 1"));

  // Assert: Music id should be stored in local storage
  const cache = JSON.parse(window.localStorage.getItem("cache"));
  expect(cache[0]).toBe("dQw4w9WgXcQ");

  // Assert: Input should be cleared
  expect(input.value).toBe("");

  clean();
});

test("Should load music from local storage", async () => {
  window.localStorage.setItem(
    "cache",
    JSON.stringify(["music-id-1", "music-id-2"])
  );

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText("Socket connected")).toBeInTheDocument();
    expect(screen.getByText("Nombre de musiques: 2")).toBeInTheDocument();
  });

  clean();
});

test("Should use token in local storage when available", async () => {
  const token = jwt.sign({ id: "predefined-id" }, "test-secret", {
    expiresIn: "1m",
  });

  window.localStorage.setItem("token", token);

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => screen.getByText("RoomId: predefined-id"));

  clean();
});

test("Should refetch if token in localstorage is expired", async () => {
  const token = jwt.sign({ id: "predefined-id" }, "test-secret", {
    expiresIn: 1,
  });
  window.localStorage.setItem("token", token);

  // Wait 1s to make token expired
  await new Promise((res) => setTimeout(res, 1000));

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(
      screen.queryByText(/RoomId: predefined-id/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/RoomId: .*/i)).toBeInTheDocument();
  });

  clean();
});

test("Should display a youtube player when music is added", async () => {
  const utils = render(<App />);

  // Assert: Message should be displayed when no music is in playlist
  await waitFor(() => screen.getByText("No music in playlist"));

  const input = screen.getByRole("textbox", { name: "Lien Youtube" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

  await waitFor(() => {
    // Assert: youtube player should be loaded with correct id
    const youtubePlayer = utils.container.querySelector("#youtube-player");
    expect(youtubePlayer).toBeInTheDocument();

    // Assert: Message should not be displayed
    expect(
      screen.queryByText("No music in in playlist")
    ).not.toBeInTheDocument();
  });

  clean();
});

test("Should display currently played music", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("No music in playlist"));

  const input = screen.getByRole("textbox", { name: "Lien Youtube" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

  await waitFor(() => screen.getByText("Currently playing dQw4w9WgXcQ"));

  clean();
});

test("Should change music when first is over", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("No music in playlist"));

  // Add first music
  const input = screen.getByRole("textbox", { name: "Lien Youtube" });
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=id-1" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

  // Add second music
  fireEvent.change(input, {
    target: { value: "https://www.youtube.com/watch?v=id-2" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Ajouter" }));

  // Assert: First music should start
  await waitFor(() => screen.getByText("Currently playing id-1"));

  // Act: Wait first music to end
  act(() => {
    configYT.events.onStateChange({ data: 0 });
  });

  // Assert: Second music should start
  await waitFor(() => screen.getByText("Currently playing id-2"));
  expect(loadedVideo).toBe("id-2");

  clean();
});
