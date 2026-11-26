
import { NextResponse } from "next/server";
import { searchAndCacheMovies } from "../../tools/movie-tool";
import { dbConnect } from "../../lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const year = searchParams.get("year") || undefined;

    if (!title) {
      return NextResponse.json(
        { error: "Movie title is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const movies = await searchAndCacheMovies(title, year);

    return NextResponse.json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Movie API error:", error);

    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
