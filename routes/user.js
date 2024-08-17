const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")
const {saveUrl} = require("../middleware.js")
//signup form
router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})
//sign up form
router.post("/signup",async (req,res,next)=>{
    try{
        let {Email, username , password} = req.body
        const newUser = new User({Email,username})
        let registeredUser = await User.register(newUser, password)
        req.flash("sucess", "Sucessfully registered")
        res.redirect("/explore")
        // req.login(username, function(err) {
        //     if (err) { return next(err); }
        //     return res.send("you are logged in")
        //   });
        }
        catch(err){
            req.flash("sucess",err.message)
            res.redirect("/user/signup")
        }
})
//login form
router.get("/login",(req,res)=>{
    res.render("login.ejs")
})
//login
router.post("/login",saveUrl,passport.authenticate("local", {
    failureRedirect: "/user.login",
    failureFlash: true
}),(req,res,next)=>{ 
    // res.render("explore.ejs")
    req.flash("sucess","logged in sucessfully")
    if(res.locals.Url){
        res.redirect(res.locals.Url)
    }
    else{
    res.redirect("/explore")}
})
//logout
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        else{
            req.flash("sucess", "successfully logged out")
            res.redirect("/explore")
        }
    })
})









module.exports = router