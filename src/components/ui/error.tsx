import { Typography } from "@mui/material";

type ErrorProps = {
  message: string | undefined;
};

export default function Error({ message }: ErrorProps) {
  if (!message) return undefined;

  return (
    <Typography color="#fe0000" fontWeight="bold">
      {message}
    </Typography>
  );
}
