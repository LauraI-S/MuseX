import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  favoriteMusicians: [
    {
      musician: {
        type: String,
        required: false,
      },
      // comments: [{ text: String, date: { type: Date, default: Date.now } }],
      likes: { type: Number, default: 0 },
    },
  ],
});
const userModel = mongoose.model("user", userSchema);

export default userModel;
