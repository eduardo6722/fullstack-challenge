import { render, screen } from "@testing-library/react";
import Error from "../error";

describe("Error", () => {
  it("Should how the correct error message", () => {
    render(<Error message="A mocked error" />);

    expect(screen.getByText("A mocked error")).toBeInTheDocument();
  });
});
