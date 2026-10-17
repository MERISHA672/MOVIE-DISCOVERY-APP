
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem("movie_watchlist") || "[]"
    );

    setFavoriteMovies(savedMovies);
  }, []);

  function removeMovie(movieId) {
    const updatedMovies = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );

    localStorage.setItem(
      "movie_watchlist",
      JSON.stringify(updatedMovies)
    );

    setFavoriteMovies(updatedMovies);
  }

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
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          ❤️ My Watchlist
        </Typography>

        <Typography sx={{ mb: 4, color: "#cbd5e1" }}>
          Your selected movies, all in one place.
        </Typography>

        {favoriteMovies.length === 0 ? (
          <Typography sx={{ color: "#cbd5e1" }}>
            Your watchlist is empty. Visit Movies and add a movie!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favoriteMovies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <Card
                  sx={{
                    backgroundColor: "#1e293b",
                    color: "white",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  {movie.poster_path ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      No poster available
                    </Box>
                  )}

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {movie.title || movie.name}
                    </Typography>

                    <Typography sx={{ color: "#cbd5e1", my: 1 }}>
                      Release date:{" "}
                      {movie.release_date ||
                        movie.first_air_date ||
                        "Not available"}
                    </Typography>

                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => removeMovie(movie.id)}
                    >
                      Remove from Watchlist
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
