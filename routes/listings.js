const express = require("express")
const router = express.Router()
const items =require("../models/items")
const multer = require("multer")
const {storage} = require("../cloudinary.js")
const uploads = multer({storage})
//show route
router.get("/",async (req,res)=>{
    let allItems = await items.find({})
    res.render("show.ejs",{allItems})
})
//new form
router.get("/new",(req,res)=>{
    res.render("new.ejs")
})
//new form submit
router.post("/new",uploads.single("items[image]"),async (req,res)=>{
    let url = req.file.path
    let filename= req.file.filename
    let data=req.body.items
    data.Name = data.Name.trim().toUpperCase()
    data.image={url,filename}
    let result = await items.insertMany(data)
    res.redirect("/listings")
})
//search route
router.get("/show",async(req,res)=>{
    let {Name} = req.query
    let nam = Name.toUpperCase()
    let allItems = await items.find({Name:nam})
    res.render("show.ejs",{allItems})
})



























module.exports = router