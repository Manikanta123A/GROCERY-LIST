const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Item = new Schema({
    Name: String,
    image: {
        url:String,
        filename:String
    },
    category:{
        type:String,
        enum: ["Ingredients","cleaning","snacks","Beauty"]
    },
    measurement:{
        type:String,
        enum:["kg","packet","bottle","bundle"]
    },

})

const Items = mongoose.model("Items", Item)
module.exports = Items