import mongoose from "mongoose";

//! first create a schema that I turn into a model which is going to
//! define the kind of documents that I´m going to store in my collection called musicians
const musicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
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
    type: Array,
    required: true,
  },
  occasion: {
    type: Array,
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
});
const musicianModel = mongoose.model("musician", musicianSchema);
export default musicianModel;
