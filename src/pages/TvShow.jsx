
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box
} from "@mui/material";
import MovieCard from "../components/MovieCard.jsx";

export default function TVShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/tv/popular");

        if (!response.ok) {
          throw new Error("Could not load TV shows.");
        }

        const data = await response.json();
        setShows(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 5, color: "white" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        Popular TV Shows
      </Typography>

      <Typography sx={{ color: "#cbd5e1", mb: 4 }}>
        Discover your next favourite series.
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && shows.length === 0 && (
        <Typography>No TV shows found.</Typography>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {shows.map((show) => (
            <Grid
              key={show.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <MovieCard movie={show} />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography
        sx={{ color: "#94a3b8", mt: 5, textAlign: "center" }}
        variant="body2"
      >
        TV show data provided by TMDB.
      </Typography>
    </Container>
  );
}
