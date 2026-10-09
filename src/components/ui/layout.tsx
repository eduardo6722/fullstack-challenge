import { Container, ContainerProps } from "@mui/material";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
} & ContainerProps;

export default function Layout({ children, ...rest }: LayoutProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mx: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        ...rest.sx,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
}
