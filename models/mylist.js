const mongoose = require("mongoose")
const Items = require("./items.js")
const Schema = mongoose.Schema
const list = new Schema({
    MyItem:{
        type:Schema.Types.ObjectId,
        ref:"Items"
    }
    ,
    Quantity:String
});

const MyList = mongoose.model("lists", list)
module.exports = MyList;