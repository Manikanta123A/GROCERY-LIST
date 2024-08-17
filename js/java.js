const mongoose =require("mongoose") 
let mongourl = "mongodb://127.0.0.1:27017/project"
async function main(){
    await mongoose.connect(mongourl)
}
main().
then(()=>{
    console.log("connected to B")
})
.catch((err)=>{
    console.log(err)
})
const calendar = require("../models/calender")