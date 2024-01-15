import mongoose from "mongoose";

const musicianSchema = new mongoose.Schema({
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

  img: {
    type: String,
    required: false,
  },

  availability: {
    type: String,
    required: false,
  },
});

const musicianModel = mongoose.model("musician", musicianSchema);

export default musicianModel;
