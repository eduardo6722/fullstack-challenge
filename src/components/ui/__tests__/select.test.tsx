import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../select";
import { useForm } from "react-hook-form";

const values = ["Audi", "BMW"];

describe("Select", () => {
  it("Should render all options", async () => {
    const user = userEvent.setup();

    render(<Select label="Make" values={values} value="" />);

    await user.click(screen.getByRole("combobox"));

    for (const value of values) {
      expect(screen.getByRole("option", { name: value })).toBeInTheDocument();
    }
  });

  it("should call onChange when selecting an option", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Select values={values} handleChange={handleChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Audi" }));

    expect(handleChange).toHaveBeenCalledWith("Audi");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should update react hook form when selection an option", async () => {
    const user = userEvent.setup();

    function TestForm() {
      const { control, watch } = useForm({
        defaultValues: {
          make: "",
        },
      });

      return (
        <>
          <Select
            label="Make"
            values={values}
            controlled={{
              control,
              name: "make",
            }}
          />
          <span data-testid="selected-value">{watch("make")}</span>
        </>
      );
    }

    render(<TestForm />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Audi" }));

    expect(screen.getByTestId("selected-value")).toHaveTextContent("Audi");
  });
});
