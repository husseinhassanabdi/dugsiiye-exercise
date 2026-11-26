import { NextResponse } from "next/server";
// import { getRandomJoke } from "../../tools/joke-tool";
// import { rateJoke } from "../../tools/joke-tool";
import Joke from "@/app/models/Joke";

// import { getRandomJoke } from "../../tools/joke-tool";
import { dbConnect } from "../../lib/db";
import { rateJoke } from "../../tools/joke-tool";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    if (keyword) {
      const jokes = await searchJokes(keyword);
      return Response.json({ success: true, jokes });
    }


    const joke = await rateJoke();
    return Response.json({ success: true, joke });
  } catch (error) {
    console.error("Joke API error:", error);

    return Response.json(
      { error: "Failed to get jokes" },
      { status: 500 }
    );
  }
}


// export async function rateJoke(
//   jokeId: string,
//   rating: "like" | "dislike"
// ) {
//   const update =
//     rating === "like"
//       ? { $inc: { likes: 1 } }
//       : { $inc: { dislikes: 1 } };

//   const joke = await Joke.findByIdAndUpdate(jokeId, update, {
//     new: true,
//   });

//   if (!joke) {
//     throw new Error("Joke not found");
//   }

//   return joke;
// }


// POST /api/jokes/rate     
export async function POST(req: Request) {
  try {
    const { jokeId, rating } = await req.json();

    if (!jokeId || !["like", "dislike"].includes(rating)) {
      return Response.json(
        { error: "Invalid joke ID or rating" },
        { status: 400 }
      );
    }
   
    // const joke = await rateJoke(jokeId, rating);

      await dbConnect();
      const joke = await rateJoke(jokeId, rating);

    return Response.json({
      success: true,
      joke,
    });
  } catch (error) {
    console.error("Joke rating error:", error);

    return Response.json(
      { error: "Failed to rate joke" },
      { status: 500 }
    );
  }
}

export async function searchJokes(keyword: string) {
  if (!keyword.trim()) {
    throw new Error("Search keyword is required");
  }

  const jokes = await Joke.find({
    joke: { $regex: keyword, $options: "i" },
  });

  return jokes;
}