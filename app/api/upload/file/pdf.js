const pdf=require("pdf-parse")
const fs=require("fs")
const path=require("path")
const  readFile=async(file)=> {
    try{
        const fileBuffer =fs.readFileSync(file)
        const fileInfo=await pdf(fileBuffer)
        const text= fileInfo.text
        console.log(text)
        return text
    }catch(err){
        console.log(err)
    }

}

readFile('C:\\pdf to text\\pdf-to-text\\public\\upload\\ECONS 102 notes (1).pdf')
module.exports={readFile}