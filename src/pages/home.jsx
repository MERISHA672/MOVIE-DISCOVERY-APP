
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import MovieCard from "../components/MovieCard.jsx";

const API_URL = "http://localhost:5000/api/movies/trending";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load movies.");
        }

        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b1120",
        color: "white",
        py: 5
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Discover Movies 🎬
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mb: 4 }}>
          Explore trending movies from around the world.
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Trending This Week
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && movies.length === 0 && (
          <Alert severity="info">No movies found.</Alert>
        )}

        {!loading && !error && movies.length > 0 && (
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}

        <Typography
          variant="body2"
          sx={{ color: "#94a3b8", mt: 6, textAlign: "center" }}
        >
          Movie data provided by TMDB.
        </Typography>
      </Container>
    </Box>
  );
}
