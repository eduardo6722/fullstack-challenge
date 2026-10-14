import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";
import { apolloClient } from "@/lib/apollo";

const theme = createTheme({
  palette: {
    primary: { main: "#0b5cd5" },
    background: { default: "#f7f7f8" },
    text: { primary: "#1a1d21", secondary: "#626974" },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h4: { fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h6: { fontSize: "1.125rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { size: "small", disableElevation: true },
      styleOverrides: { root: { minHeight: 40, padding: "8px 16px" } },
    },
    MuiTextField: { defaultProps: { size: "small" } },
    MuiFormControl: { defaultProps: { size: "small" } },
    MuiSelect: { defaultProps: { size: "small" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { minHeight: 40, backgroundColor: "#fff", fontSize: "0.875rem" },
      },
    },
    MuiInputLabel: { styleOverrides: { root: { fontSize: "0.875rem" } } },
    MuiMenuItem: { styleOverrides: { root: { fontSize: "0.875rem", minHeight: 36 } } },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: "1px solid #e1e4e8" } },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: { fontSize: "1.125rem", fontWeight: 600 },
        subheader: { fontSize: "0.875rem" },
      },
    },
  },
});

/**
 * Wraps the app in its global providers. Add more here (error boundary,
 * feature flags, i18n) as needed.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ApolloProvider>
);
