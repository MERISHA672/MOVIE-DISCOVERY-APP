# 🎬 Movie Discovery App

A responsive movie discovery web application built with React, Vite, Material UI, React Router, and The Movie Database (TMDB) API.

## About the Project

Movie Discovery helps users explore movies and television shows, search for films, view detailed movie information, filter movies by genre, and save favourite movies to a personal watchlist.

## Features

- 🏠 Home page displaying trending movies
- 🎥 Browse popular movies
- 📺 Explore popular TV shows
- 🔎 Search for movies
- 🎭 Filter movies by genre
- 📄 View movie details, including posters, ratings, release dates, genres, and descriptions
- ❤️ Add and remove movies from a watchlist
- 💾 Save the watchlist using browser local storage
- 📱 Responsive user interface for different screen sizes
- ⚠️ Loading indicators and error handling

## Technologies Used

- React
- Vite
- JavaScript
- Material UI (MUI)
- React Router
- Node.js
- Express.js
- TMDB API
- CSS
- Browser Local Storage

## Project Structure

```text
movie-discovery/
├── public/
├── src/
│   ├── components/
│   │   └── MovieCard.jsx
│   ├── layout/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── home.jsx
│   │   ├── Movies.jsx
│   │   ├── TvShow.jsx
│   │   ├── Search.jsx
│   │   ├── Favorites.jsx
│   │   └── MovieDetails.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the frontend folder

```bash
cd movie-discovery
npm install
```

### 3. Configure the backend

Open the backend folder and install its dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder containing:

```env
PORT=5000
TMDB_READ_ACCESS_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN
```

Replace the placeholder with your own TMDB read access token. Never upload your `.env` file or token to GitHub.

### 4. Run the backend

```bash
npm start
```

Use the backend start command defined in your backend `package.json` if it differs.

### 5. Run the frontend

In a separate terminal, open the frontend folder and run:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## API Attribution

Movie information and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Author

Developed as a React and API integration learning project.
