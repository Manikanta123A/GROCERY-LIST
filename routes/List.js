const express = require("express")
const router = express.Router()
const items = require("../models/items")
const MyList = require("../models/mylist")

//delete route
router.delete("/:id",async(req,res)=>{
    let {id} = req.params
    let result = await MyList.findByIdAndDelete(id)
    req.flash("sucess", "Deleted sucessfully")
    res.redirect("/list")
 })
//list route 
router.get("/",async(req,res)=>{
    let MyItems = await MyList.find({}).populate("MyItem")
    res.render("list.ejs",{MyItems})
})
//new route
router.post("/new",async (req,res)=>{
    let {Name,Quantity} = req.body
    let item = await items.findOne({Name:Name})
    let result = await MyList.insertMany({MyItem:item.id,Quantity:Quantity})
})

















module.exports = router