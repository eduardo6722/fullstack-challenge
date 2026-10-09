import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect, { SelectProps as MUISelectProps } from "@mui/material/Select";
import { Controller } from "react-hook-form";

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
  return (
    <FormControl sx={{ flex: 1 }}>
      {label ? <InputLabel id={label}>{label}</InputLabel> : undefined}
      {controlled ? (
        <Controller
          control={controlled.control}
          name={controlled.name}
          render={({ field: { onChange } }) => (
            <MUISelect
              {...rest}
              labelId={`${label}-label`}
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
          labelId={`${label}-label`}
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
