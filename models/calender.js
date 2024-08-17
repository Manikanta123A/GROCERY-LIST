const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const events = new Schema ({
    month:String,
    date:String,
    number:String,
    submit:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("Events",events) 