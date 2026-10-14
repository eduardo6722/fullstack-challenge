import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect, { SelectProps as MUISelectProps } from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useId } from "react";

type SelectProps = {
  values: string[];
  label?: string;
  handleChange?: (value: string) => void;
  controlled?: {
    control: any;
    name: string;
  };
} & MUISelectProps;

export default function Select({
  values,
  label,
  handleChange,
  controlled,
  ...rest
}: SelectProps) {
  const labelId = useId();

  return (
    <FormControl
      size={rest.size ?? "small"}
      error={rest.error}
      sx={{ flex: "1 1 160px", minWidth: 0 }}
    >
      {label ? <InputLabel id={labelId}>{label}</InputLabel> : undefined}
      {controlled ? (
        <Controller
          control={controlled.control}
          name={controlled.name}
          render={({ field: { onChange } }) => (
            <MUISelect
              {...rest}
              labelId={label ? labelId : undefined}
              label={label}
              onChange={(e) => onChange(e.target.value as string)}
            >
              {values.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </MUISelect>
          )}
        />
      ) : (
        <MUISelect
          {...rest}
          labelId={label ? labelId : undefined}
          label={label}
          onChange={(e) =>
            handleChange && handleChange(e.target.value as string)
          }
        >
          {values.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </MUISelect>
      )}
    </FormControl>
  );
}
