
"use client";

type JokeCardProps = {
  joke: string;
  jokeId: string;
};

export default function JokeCard({ joke, jokeId }: JokeCardProps) {
  async function handleRating(rating: "like" | "dislike") {
    try {
      const response = await fetch("/api/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jokeId, rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate joke");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-gray-800">{joke}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => handleRating("like")}
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          👍 Like
        </button>

        <button
          onClick={() => handleRating("dislike")}
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          👎 Dislike
        </button>
      </div>
    </div>
  );
}
