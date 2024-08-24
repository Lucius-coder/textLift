import mongoose from "mongoose";
const uri="mongodb://localhost:27017/textLiftDb"
 export const connectToDb=()=>{
    mongoose.connect(uri)

}
const connection=mongoose.connection
connection.on("connected",()=>{
    console.log("connected")
})