import { render, screen } from "@testing-library/react";
import Error from "../error";

describe("Error", () => {
  it("Should how the correct error message", () => {
    render(<Error message="A mocked error" />);
    expect(screen.getByText("A mocked error")).toBeInTheDocument();
  });

  it("should not render the component when message is undefined", () => {
    const { container } = render(<Error message={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should not render the component when message is an empty string", () => {
    const { container } = render(<Error message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
