import mongoose from "mongoose";
import userModel from "./user.mjs";

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  fileName: String,
  fileLink: String,
});
const fileModel = mongoose.model("file", fileSchema);
export default fileModel;
