import AuthFactory from "@sharp-mds/auth";
import SocketCacheFactory from "@sharp-mds/socket-cache";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import jwt from "jsonwebtoken";
import App from "./App";

// Start modules used by muzbox
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

test("Should store fetched jwt after a fetch", async () => {
  render(<App />);

  await waitFor(() => {
    const roomId = screen.getByText(/RoomId: .*/i);
    expect(roomId).toBeInTheDocument();
    expect(roomId.textContent.length).toBeGreaterThan(12);
    expect(localStorage.getItem("token")).toBeTruthy();
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

    const cache = JSON.parse(window.localStorage.getItem("cache"));
    expect(cache[0]).toBe("dQw4w9WgXcQ");
  });
});

test("Should use token in local storage when available", async () => {
  const token = jwt.sign({ id: "predefined-id" }, "test-secret", {
    expiresIn: "1m",
  });

  window.localStorage.setItem("token", token);

  render(<App />);

  // Wait for socket to connect
  await waitFor(() => {
    expect(screen.getByText(/RoomId: predefined-id/i)).toBeInTheDocument();
  });

  // Clean
  window.localStorage.removeItem("token");
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

  // Clean
  window.localStorage.removeItem("token");
});
