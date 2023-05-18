//IMPORTING 
import * as React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Divider } from "rsuite";
//MAIN FUNCTION Nvbar

const Navbar = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppBar
      position="fixed" // set position to fixed
      sx={{
        background: "#000066",
        transition: "top 0.8s",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer", // add cursor pointer to show it's clickable
          }}
          onClick={handleScrollTop} // add onClick event handler to scroll to top
        >
          <img
            src={require("./logo.jpg")}
            alt="Logo"
            height="56.2vw"
            style={{
              borderRadius: "5px",
              margin: "1.1vw",
              marginRight: "3vw",
              marginLeft: "5vw",
            }}
            onClick={handleScrollTop} // add onClick event handler to scroll to top
          />
          <Divider orientation="vertical" />

          <Typography
            variant="h4"
            sx={{
              color: "white",
              display: "inline",
              marginLeft: "2vw",
            }}
            onClick={handleScrollTop} // add onClick event handler to scroll to top
          >
            What's The Price
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
