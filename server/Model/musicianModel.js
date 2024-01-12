import mongoose from "mongoose";

const musicianSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: mongoose.Types.ObjectId,
  // },
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
  occasion: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const musicianModel = mongoose.model("musician", musicianSchema);

export default musicianModel;
