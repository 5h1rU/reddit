import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../app";

test("renders learn react link", async () => {
  render(<App />);
  const root = await screen.findByTestId("app-root");
  expect(root).toBeInTheDocument();
});
