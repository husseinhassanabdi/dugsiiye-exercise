
type MovieCardProps = {
  movie: {
    title: string;
    year: number;
    rating?: number;
    poster?: string;
    description?: string;
    director?: string;
    cast?: string[];
    runtime?: string;
  };
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {movie.poster && movie.poster !== "N/A" && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-48 w-32 rounded-lg object-cover"
        />
      )}

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900">
          {movie.title} ({movie.year})
        </h2>

        {movie.rating && <p>⭐ {movie.rating}/10</p>}

        {movie.description && (
          <p className="text-sm text-gray-600">{movie.description}</p>
        )}

        {movie.director && (
          <p className="text-sm text-gray-500">
            Director: {movie.director}
          </p>
        )}

        {movie.cast && (
          <p className="text-sm text-gray-500">
            Cast: {movie.cast.join(", ")}
          </p>
        )}

        {movie.runtime && (
          <p className="text-sm text-gray-500">
            Runtime: {movie.runtime}
          </p>
        )}
      </div>
    </div>
  );
}
