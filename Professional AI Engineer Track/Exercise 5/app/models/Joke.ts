
import mongoose, { Schema } from "mongoose";

const JokeSchema = new Schema({
  joke: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    enum: ["dad", "programming", "general"],
    default: "dad",
  },

  source: {
    type: String,
    default: "icanhazdadjoke",
  },

  likes: {
    type: Number,
    default: 0,
    min: 0,
  },

  dislikes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const Joke =
  mongoose.models.Joke || mongoose.model("Joke", JokeSchema);

export default Joke;
