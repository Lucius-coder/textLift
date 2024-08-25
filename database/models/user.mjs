import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  
});
const userModel = mongoose.models|| mongoose.model("user", userSchema);
export default userModel;
