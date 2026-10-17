
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import MovieCard from "../components/MovieCard.jsx";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/search?query=${encodeURIComponent(query.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search failed.");
      }

      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to search movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0b1120", color: "white", py: 5 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Search Movies 🔎
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mb: 4 }}>
          Find your next favourite movie.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ display: "flex", gap: 2, mb: 4, maxWidth: 700 }}
        >
          <TextField
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie, e.g. Inception"
            sx={{
              bgcolor: "white",
              borderRadius: 1
            }}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            Search
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {!loading && searched && !error && movies.length === 0 && (
          <Alert severity="info">No movies found. Try another title.</Alert>
        )}

        {!loading && movies.length > 0 && (
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
