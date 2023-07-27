
import { Box, Typography, Link, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message });
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(0deg, #000066 10%, #4a2c82 100%)`,
        padding: { xs: "4ch", md: "2ch" },
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "white",
          borderRadius: "5px",
          padding: { xs: "4vw", md: "2ch" },
          marginBottom: { xs: "2ch", md: 0 },
          maxWidth: { xs: "99%", md: "50%" },
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "1vh", color: "black" }}>
          Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            maxWidth="100%"
          >
            <TextField
              required
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              sx={{ marginBottom: "1vh", width: { xs: "100%", md: "20vw" } }}
            />
            <TextField
              required
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ marginBottom: "1vh", width: { xs: "100%", md: "20vw" } }}
            />
            <TextField
              required
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              sx={{ marginBottom: "1vh", width: { xs: "100%", md: "20vw" } }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
  
      <Box
        sx={{
          py: { xs: "2ch", md: 2 },
          maxWidth: { xs: "100%", md: "40%" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex">
          <Box mr={2}>
            <Link
              href="https://github.com/RajatMuzumdar"
              color="inherit"
              underline="none"
            >
              Github
            </Link>
          </Box>
          <Box mr={2}>
            <Link
              href="https://www.linkedin.com/in/rajat-muzumdar/"
              color="inherit"
              underline="none"
            >
              LinkedIn
            </Link>
          </Box>
          <Box mr={2}>
            <Link
              href="https://www.instagram.com/rajat_muzumdar/"
              color="inherit"
              underline="none"
            >
              Instagram
            </Link>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">
            © 2023 Rajat M. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
  );
}  