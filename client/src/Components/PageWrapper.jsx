import { Box, Grid } from "@mui/material";
import Header from "./Header";

function ContentWrapper({ children }) {
  return <>{children}</> ;
}

function PageWrapper({ children }) {
  return (
    <Grid display="flex" flexDirection="column" minHeight="100vh">
      <ContentWrapper>
        <Header />
      </ContentWrapper>

      <Box component="main" flexGrow={1} gap={1}>
        {/* QUITAR Cards para evitar futuras  problemas */}
        {children}
      </Box>
    </Grid>
  );
}

export default PageWrapper;
