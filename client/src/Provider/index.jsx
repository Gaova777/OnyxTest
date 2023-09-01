import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Theme from "../Theme";

function MasterProvider({ children }) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MasterProvider;
