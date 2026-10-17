
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from "@mui/material";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const response = await fetch(
  `http://localhost:5000/api/movies/${id}`
);

        if (!response.ok) {
          throw new Error("Could not load movie details.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center", color: "white" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading movie details...</Typography>
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">
          {error || "Movie not found."}
        </Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0b1120", minHeight: "100vh", color: "white", py: 5 }}>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white", mb: 4 }}
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </Button>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          {movie.poster_path && (
            <Box
              component="img"
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              sx={{
                width: { xs: "100%", md: 320 },
                maxWidth: 320,
                borderRadius: 3,
              }}
            />
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {movie.title}
            </Typography>

            <Typography sx={{ color: "#cbd5e1", mb: 2 }}>
              Release date: {movie.release_date || "Not available"}
            </Typography>

            <Typography sx={{ color: "#fbbf24", mb: 3 }}>
              ⭐ {Number(movie.vote_average || 0).toFixed(1)} / 10
            </Typography>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Overview
            </Typography>

            <Typography sx={{ color: "#cbd5e1", lineHeight: 1.8, mb: 4 }}>
              {movie.overview || "No overview available."}
            </Typography>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Genres
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {movie.genres?.length ? (
                movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ backgroundColor: "#263449", color: "white" }}
                  />
                ))
              ) : (
                <Typography sx={{ color: "#cbd5e1" }}>
                  No genres available.
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
