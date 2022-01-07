// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import MuzBoxSocketFactory from "@sharp-mds/muzbox-socket";

let muzboxSocket = null;

beforeAll(() => {
  muzboxSocket = MuzBoxSocketFactory(4241, "http://localhost");
});

afterAll(() => {
  muzboxSocket.server.close();
});

