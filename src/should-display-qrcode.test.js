import App from "./App";
import { render, waitFor } from "@testing-library/react";

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

