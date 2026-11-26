
import mongoose, { Schema, Model } from "mongoose";

export interface IMovie {
  imdbID: string;
  title: string;
  year: number;
  genre: string[];
  rating?: number;
  director?: string;
  description?: string;
  poster?: string;
  runtime?: string;
  cast?: string[];
}

const MovieSchema = new Schema<IMovie>(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    genre: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    director: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    poster: {
      type: String,
    },

    runtime: {
      type: String,
    },

    cast: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Movie: Model<IMovie> =
  (mongoose.models.Movie as Model<IMovie>) ||
  mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
