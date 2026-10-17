
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "TV Shows", path: "/tv-shows" },
    { label: "Search", path: "/search" },
    { label: "My Watchlist", path: "/favorites" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#101827", boxShadow: 3 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          py: 1,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#fbbf24", whiteSpace: "nowrap" }}
        >
          🍿 Movie Discovery
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: active ? "#fbbf24" : "white",
                  textDecoration: "none",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  backgroundColor: active ? "#263449" : "transparent",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
