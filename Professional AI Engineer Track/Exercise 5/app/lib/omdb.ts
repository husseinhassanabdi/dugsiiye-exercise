
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const OMDB_BASE_URL = "https://www.omdbapi.com/";

if (!OMDB_API_KEY) {
  throw new Error("Missing OMDB_API_KEY in .env.local");
}

export async function searchMovie(title: string, year?: string) {
  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    s: title,
    type: "movie",
  });

  if (year) {
    params.append("y", year);
  }

  const response = await fetch(`${OMDB_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to connect to OMDb API");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data.Search;
}

export async function getMovieDetails(imdbID: string) {
  const params = new URLSearchParams({
    apikey: OMDB_API_KEY!,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${OMDB_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to retrieve movie details");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found");
  }

  return data;
}
