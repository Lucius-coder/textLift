import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
 email: String,
  fileName: String,
  fileLink: String,
});
const fileModel = mongoose.models.filesInfo || mongoose.model("filesInfo", fileSchema);
export default fileModel;
