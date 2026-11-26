
import Movie from "../models/Movie";
import User from "../models/User";
import Review from "../models/Review";
import { openrouter } from "../lib/openrouter";
import { z } from "zod";
import { searchAndCacheMovies } from "./movie-tool";
// import { getRandomJoke } from "./joke-tool";
import { rateJoke } from "./joke-tool";


const querySchema = z.object({
  action: z.enum([
    "movies_by_genre",
    "users_over_age",
    "highly_rated_movies",
    "count_movies_by_genre",
    "search_movies",
    "get_joke",
  ]),
  value: z.union([z.string(), z.number()]).nullable(),
});

export async function understandDatabaseQuestion(question: string) {
  const response = await openrouter.chat.completions.create({
    model: "openrouter/free",

    messages: [
      {
        role: "system",
       content: `
        You are a database query assistant.
        Identify what the user wants from these actions:
        1. movies_by_genre
        2. users_over_age
        3. highly_rated_movies (value must be a number, such as 8)
        4. count_movies_by_genre
        5. search_movies (value must be the movie title the user wants to search for)
        6. get_joke (use this when the user asks for a dad joke or a random joke)

        If the user asks for highly rated movies without specifying a rating,
        use 8 as the default value.

        Return ONLY valid JSON with:
          - action
          - value

          For count_movies_by_genre, value must be null.
        `,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("AI returned an empty response");
  }

  const parsed = querySchema.safeParse(JSON.parse(content));

  if (!parsed.success) {
    throw new Error("AI returned an invalid database action");
  }

  return parsed.data;
}



export async function executeDatabaseQuestion(question: string) {
  const query = await understandDatabaseQuestion(question);

  switch (query.action) {
    case "movies_by_genre":
      if (typeof query.value !== "string") {
        throw new Error("A movie genre is required");
      }
      return await findMoviesByGenre(query.value);

    case "users_over_age":
      if (typeof query.value !== "number") {
        throw new Error("An age is required");
      }
      return await findUsersOverAge(query.value);

      case "get_joke":
  // return await getRandomJoke();
    return await rateJoke();

    case "highly_rated_movies":
      if (typeof query.value !== "number") {
        throw new Error("A rating is required");
      }
      return await findHighlyRatedMovies(query.value);

    case "count_movies_by_genre":
      return await countMoviesByGenre();

      case "search_movies":
  if (typeof query.value !== "string") {
    throw new Error("A movie title is required");
  }
  return await searchAndCacheMovies(query.value);
  }
  
}

// Find movies by genre
export async function findMoviesByGenre(genre: string) {
  return await Movie.find({
    genre: { $in: [genre] },
  });
}

// Find users older than a given age
export async function findUsersOverAge(age: number) {
  return await User.find({
    age: { $gt: age },
  });
}

// Find movies with ratings above a given value
export async function findHighlyRatedMovies(rating: number) {
  return await Movie.find({
    rating: { $gt: rating },
  });
}

// Count movies by genre
export async function countMoviesByGenre() {
  return await Movie.aggregate([
    {
      $unwind: "$genre",
    },
    {
      $group: {
        _id: "$genre",
        total: { $sum: 1 },
      },
    },
  ]);
}
