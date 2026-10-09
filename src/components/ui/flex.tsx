import { Box, BoxProps } from "@mui/material";

type FlexProps = BoxProps;

export default function Flex({ children, ...rest }: FlexProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "22px",
        flexWrap: "wrap",
        ...rest.sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
