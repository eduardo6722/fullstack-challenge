import { Container, ContainerProps } from "@mui/material";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
} & ContainerProps;

export default function Layout({ children, sx, ...rest }: LayoutProps) {
  return (
    <Container
      maxWidth="lg"
      {...rest}
      sx={[
        {
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Container>
  );
}
