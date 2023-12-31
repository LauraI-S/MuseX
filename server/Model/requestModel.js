import mongoose from "mongoose";

const Schema = mongoose.Schema;
const requestSchema = new Schema(
  {
    occasion: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
  },
  //automatically creates a property to say when the document was created and can even be updated
  { timestamps: true }
);
const requestModel = mongoose.model("Request", requestSchema);

export default requestModel;
