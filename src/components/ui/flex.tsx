import { Box, BoxProps } from "@mui/material";

type FlexProps = BoxProps;

export default function Flex({ children, sx, ...rest }: FlexProps) {
  return (
    <Box
      {...rest}
      sx={[
        {
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
