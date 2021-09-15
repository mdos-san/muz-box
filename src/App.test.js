import { render, screen, wait, waitFor } from "@testing-library/react";
import jwt from "jsonwebtoken";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const token = jwt.sign(
  { id: "235370a8-d0e8-4dbe-9fbc-6e0b81c14a05" },
  "secret"
);

const server = setupServer(
  rest.get(`${process.env.REACT_APP_AUTH_URL}/anonymous`, (req, res, ctx) =>
    res(ctx.json({ token: token }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Title is displayed", () => {
  render(<App />);

  const mainTitle = screen.getByText(/MuzBox/);
  expect(mainTitle).toBeInTheDocument();
});

test("Should display the uuid of the current room", async () => {
  render(<App />);

  await waitFor(() => {
    const roomId = screen.getByText("235370a8-d0e8-4dbe-9fbc-6e0b81c14a05");
    expect(roomId).toBeInTheDocument();
  });
});

function isCanvasBlank(canvas) {
  return !canvas.getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height).data
    .some(channel => channel !== 0);
}

test("Should display a QRCode in canvas", async () => {
  const { container } = render(<App />);

  await waitFor(() => {
    const canvas = container.querySelector('canvas');

    expect(isCanvasBlank(canvas)).toBe(false); 
  });
});
