
import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onClick }) {
  const title = movie.title || movie.name || "Untitled";
  const date = movie.release_date || movie.first_air_date;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem("movie_watchlist") || "[]"
    );

    setIsSaved(
      savedMovies.some((savedMovie) => savedMovie.id === movie.id)
    );
  }, [movie.id]);

  function toggleWatchlist(event) {
    event.stopPropagation();

    const savedMovies = JSON.parse(
      localStorage.getItem("movie_watchlist") || "[]"
    );

    let updatedMovies;

    if (savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
      updatedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id
      );
    } else {
      updatedMovies = [...savedMovies, movie];
    }

    localStorage.setItem(
      "movie_watchlist",
      JSON.stringify(updatedMovies)
    );

    setIsSaved(
      updatedMovies.some((savedMovie) => savedMovie.id === movie.id)
    );
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: "#172033",
        color: "white",
        borderRadius: 3,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      {movie.poster_path ? (
        <CardMedia
          component="img"
          image={`${IMAGE_BASE}${movie.poster_path}`}
          alt={title}
          sx={{ height: 300, objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            height: 300,
            display: "grid",
            placeItems: "center",
            background: "#263449",
            color: "white",
          }}
        >
          No poster available
        </div>
      )}

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#cbd5e1", mt: 1 }}
        >
          Release date: {date || "Not available"}
        </Typography>

        <Typography sx={{ color: "#fbbf24", mt: 1, mb: 2 }}>
          ⭐ {Number(movie.vote_average || 0).toFixed(1)}/10
        </Typography>

        <Button
          variant="contained"
          fullWidth
          color={isSaved ? "error" : "primary"}
          onClick={toggleWatchlist}
        >
          {isSaved ? "♥ Remove from Watchlist" : "＋ Add to Watchlist"}
        </Button>
      </CardContent>
    </Card>
  );
}
