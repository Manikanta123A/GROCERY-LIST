const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")
const user = new Schema ({
    Email: {
        type:String,
        required:true,
        unique:true
    },
    list:[
       {type :String,
       }
    ]
})
user.plugin(passportLocalMongoose)
module.exports = mongoose.model("Users",user)