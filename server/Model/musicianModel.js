import mongoose from "mongoose";

//! first create a schema that I turn into a model which is going to
//! define the kind of documents that I´m going to store in my collection called musicians
const musicianSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: [String],
    required: true,
  },
  genre: {
    type: Array,
    required: true,
  },
  hasEquipment: {
    type: Boolean,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const musicianModel = mongoose.model("musician", musicianSchema);

export default musicianModel;
