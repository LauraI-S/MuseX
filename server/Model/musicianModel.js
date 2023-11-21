import mongoose from "mongoose";

const musicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const musicianModel = mongoose.model("musician", musicianSchema);
export default musicianModel;
