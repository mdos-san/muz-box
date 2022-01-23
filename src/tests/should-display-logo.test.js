import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

test("Logo is displayed", async () => {
  render(<App />);

  // Assert: Logo is displayed
  await waitFor(() => screen.getByAltText("MuzBox"));
});

