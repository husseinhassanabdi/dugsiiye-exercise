
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  age: {
    type: Number,
    required: true,
    min: 1,
  },

  favorite_genre: {
    type: String,
    required: true,
    trim: true,
  },
});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
