import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a title", () => {
  render(<App />);
  const mainTitle = screen.getByText(/MuzBox/);
  expect(mainTitle).toBeInTheDocument();
});
