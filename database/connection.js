import mongoose from "mongoose";
const uri="mongodb://localhost:27017/textLift"
 export default async function connectToDb(){
 await mongoose.connect(uri)

}

