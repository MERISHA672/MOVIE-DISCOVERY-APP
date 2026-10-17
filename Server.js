
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    application: "Movie Discovery API",
  });
});

// Fetch data from TMDB
async function fetchFromTMDB(endpoint, res, isList = true) {
  try {
    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        message: "TMDB token missing. Check your backend .env file.",
      });
    }

    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("TMDB error:", data);

      return res.status(response.status).json({
        message: data.status_message || "TMDB request failed.",
      });
    }

    return res.json(isList ? data.results || [] : data);
  } catch (error) {
    console.error("TMDB error:", error.message);

    return res.status(500).json({
      message: "Unable to load content right now.",
    });
  }
}

// Trending movies
app.get("/api/movies/trending", (req, res) => {
  return fetchFromTMDB("/trending/movie/week", res);
});

// Search movies
app.get("/api/movies/search", (req, res) => {
  const query = req.query.query;

  if (!query || !query.trim()) {
    return res.json([]);
  }

  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query.trim())}`,
    res
  );
});

// Popular movies
app.get("/api/movies/popular", (req, res) => {
  return fetchFromTMDB("/movie/popular", res);
});

// Action movies (existing route)
app.get("/api/movies/action", (req, res) => {
  return fetchFromTMDB("/discover/movie?with_genres=28", res);
});

// Movies by genre
app.get("/api/movies/genre/:genreId", (req, res) => {
  const { genreId } = req.params;

  if (!/^\d+$/.test(genreId)) {
    return res.status(400).json({
      message: "Invalid genre ID.",
    });
  }

  return fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}`,
    res
  );
});

// Popular TV shows
app.get("/api/tv/popular", (req, res) => {
  return fetchFromTMDB("/tv/popular", res);
});

// Movie details — keep after specific movie routes
app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      message: "Invalid movie ID.",
    });
  }

  return fetchFromTMDB(`/movie/${id}`, res, false);
});

// Start server
app.listen(PORT, () => {
  console.log(`Movie Discovery API running at http://localhost:${PORT}`);
});
