import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Logo from "../public/logo.png";
import { AuthContext } from "../context/authContext";
import { useContext, useRef } from "react";
import Link from "next/link";

const drawerWidth = 240;
const navItems = ["Notícias", "Artigos", "Concursos"];

const Navbar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const AppBarWhite = styled(AppBar)({
    backgroundColor: "white",
  });

  const DrawerMobile = () => (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/">
        <div className="logo">
          <img src={Logo} alt="Logo" style={{ maxWidth: 200 }} />
        </div>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }} position="static">
      <AppBarWhite component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            <Link href="/">
              <Image src={Logo} alt="Logo" width={200} />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#262626" }}>
                {item}
              </Button>
            ))}
          </Box>
          <div>
            {currentUser ? (
              <Link
                href="/write"
                style={{ color: "#fff", textDecoration: "none" }}
                className="button-style"
              >
                Criar post
              </Link>
            ) : (
              <Link
                href="/login"
                className="button-style"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Login
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBarWhite>
      <Box component="nav">
        <Drawer
          container={typeof window != "undefined" ? document.body : null}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerMobile />
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
