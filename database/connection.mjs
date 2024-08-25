import mongoose from "mongoose";
const uri="mongodb://localhost:27017/textLiftDb"
 export default function connectToDb(){
 return  mongoose.connect(uri)

}

