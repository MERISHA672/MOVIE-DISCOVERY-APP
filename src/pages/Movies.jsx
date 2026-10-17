
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MovieCard from "../components/MovieCard.jsx";

const genres = [
  { id: "all", name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

export default function Movies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMovies() {
      setLoading(true);
      setError("");

      try {
        const url =
          selectedGenre === "all"
            ? "http://localhost:5000/api/movies/popular"
            : `http://localhost:5000/api/movies/genre/${selectedGenre}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Could not load movies. Please try again.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The server returned an unexpected response.");
        }

        if (!cancelled) {
          setMovies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
          setMovies([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [selectedGenre]);

  return (
    <Box
      sx={{
        backgroundColor: "#0b1120",
        minHeight: "100vh",
        color: "white",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          Discover Movies 🎬
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mb: 4 }}>
          Explore popular movies and find your next favourite.
        </Typography>

        <FormControl
          sx={{
            minWidth: 220,
            mb: 4,
            "& .MuiInputLabel-root": { color: "#cbd5e1" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#fbbf24" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "#475569" },
              "&:hover fieldset": { borderColor: "#fbbf24" },
            },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
        >
          <InputLabel id="genre-label">Filter by Genre</InputLabel>

          <Select
            labelId="genre-label"
            value={selectedGenre}
            label="Filter by Genre"
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={String(genre.id)}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && movies.length === 0 && (
          <Typography>No movies found in this genre.</Typography>
        )}

        {!loading && !error && movies.length > 0 && (
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <MovieCard
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Typography
          variant="body2"
          sx={{ color: "#94a3b8", mt: 5, textAlign: "center" }}
        >
          Movie data provided by TMDB.
        </Typography>
      </Container>
    </Box>
  );
}
