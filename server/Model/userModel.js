import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
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
    required: true,
  },
  // favoriteMusicians: [
  //   {
  //     musician: { type: mongoose.Schema.Types.String, ref: "musician" },
  //     // comments: [{ text: String, date: { type: Date, default: Date.now } }],
  //     likes: { type: Number, default: 0 },
  //   },
  // ],
});
const userModel = mongoose.model("user", userSchema);

export default userModel;
