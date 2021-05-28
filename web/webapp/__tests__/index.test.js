// https://github.com/ericadamski/wachstum-youtube/blob/master/__tests__/api/authenticate.test.js
import { render, screen } from "@testing-library/react";
import App from "../pages/index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
