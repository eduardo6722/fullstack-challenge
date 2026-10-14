import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";

type SearchProps = {
  handleChange: (value: string) => void;
  placeholder?: string;
  variant?: "standard" | "outlined" | "filled";
  debounce?: boolean;
} & TextFieldProps;

export default function Search({
  handleChange,
  variant,
  ...rest
}: SearchProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <FormControl variant={variant} sx={{ flex: "2 1 240px", minWidth: 0 }}>
      <TextField
        variant={variant}
        onChange={onChange}
        sx={{
          background: "#fff",
          ...rest.sx,
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Search">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...rest}
      />
    </FormControl>
  );
}
