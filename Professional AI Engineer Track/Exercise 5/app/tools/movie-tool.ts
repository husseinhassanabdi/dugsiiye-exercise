
import Movie from "../models/Movie";
import { searchMovie, getMovieDetails } from "../lib/omdb";

// Search movies and cache their details in MongoDB
export async function searchAndCacheMovies(
  title: string,
  year?: string
) {
  const results = await searchMovie(title, year);

  const savedMovies = [];

  for (const result of results) {
    const details = await getMovieDetails(result.imdbID);

    const movieData = {
      imdbID: details.imdbID,
      title: details.Title,
      year: Number.parseInt(details.Year, 10),
      genre: details.Genre === "N/A"
        ? []
        : details.Genre.split(",").map((genre: string) => genre.trim()),
      rating: details.imdbRating === "N/A"
        ? undefined
        : Number.parseFloat(details.imdbRating),
      director: details.Director === "N/A"
        ? undefined
        : details.Director,
      description: details.Plot === "N/A"
        ? undefined
        : details.Plot,
      poster: details.Poster === "N/A"
        ? undefined
        : details.Poster,
      runtime: details.Runtime === "N/A"
        ? undefined
        : details.Runtime,
      cast: details.Actors === "N/A"
        ? []
        : details.Actors.split(",").map((actor: string) => actor.trim()),
    };

    const savedMovie = await Movie.findOneAndUpdate(
      { imdbID: details.imdbID },
      { $set: movieData },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    savedMovies.push(savedMovie);
  }

  return savedMovies;
}
