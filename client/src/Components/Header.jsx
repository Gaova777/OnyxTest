import { AppBar, Avatar, Box, Grid, Link, Toolbar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { Android } from "@mui/icons-material";


function Header() {
 console.log('render')
  return (
    <Grid display="flex" flexDirection="column">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Grid
            display="flex"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Box>
              <Link
                fontSize={24}
                fontWeight={500}
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none", color: "text.light" }}
              >
                BookStore
              </Link>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Android />
              <Android />
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
     
    </Grid>
  );
}

export default Header;
