import mongoose from "mongoose";

//! first create a schema that I turn into a model which is going to
//! define the kind of documents that I´m going to store in my collection called musicians
const musicianSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: true,
    // ObjectId("xxxxxxxx1")
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
    type: [String],
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
});
const musicianModel = mongoose.model("musician", musicianSchema);

export default musicianModel;
