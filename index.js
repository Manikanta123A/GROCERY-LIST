require("dotenv").config()
const express = require("express")
const app = express()
const mongoose= require("mongoose")
const ejsMate = require("ejs-mate")
const path=require("path")
const session = require("express-session")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const listingsrouter = require("./routes/listings.js")
const listrouter = require("./routes/List.js")
const userrouter = require("./routes/user.js")
const User = require("./models/user.js")
const passport = require("passport")
const localstrategy = require("passport-local")
const {isLoggedIn} = require("./middleware.js")
let port = 8080
const calendar = require("./models/calender.js")
let mongourl = process.env.Mongo_url
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

app.listen(port, ()=>{
    console.log("listening to server...")
})
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
const secret = {
    secret :"This is small secret",
    resave: false,
    saveuninstallized : true,
    cookie:{
        expires : Date.now()+7*24*60*60*100,
        maxage : 7*24*60*60*100,
        httpOnly:true
    }
}

app.use(session(secret))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req,res,next)=>{
    res.locals.message = req.flash("sucess")
    res.locals.currUser = req.user
    if(req.user){
        res.locals.username = req.user.username
    }
    next()
})

app.get("/", (req,res)=>{res.render("index.ejs")})
app.use("/listings",listingsrouter)
app.use("/list", listrouter)
app.use("/user", userrouter)
//explore route
app.get("/explore",(req,res)=>{
    res.render("explore.ejs")
})
app.post("/todo/tasks", isLoggedIn,async (req,res)=>{
    let result = await User.findOne({username:req.user.username})
    result.list = req.body.Tasks
    await result.save()
})
//todo route
app.get("/todo", isLoggedIn,(req,res)=>{
    let arrr = req.user.list
    res.render("todo.ejs",{arrr})
})
//simon route
app.get("/simon",(req,res)=>{
    res.render("simon.ejs")
})
//error handling
app.use((err,req,res,next)=>{
    let {status=500 , message="error"} = err;
    res.status(status).render("error.ejs",{message})
})
//diary
app.get("/diary",(req,res)=>{
    res.render("diary.ejs")
})
//submits
app.post("/diary/submit",(req,res)=>{
    let {number} = req.body
    let date = new Date()
  let Month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  let result = new calendar({
    Month: Month[date.getMonth()],
    date : date.getDate(),
    number : number,
    submit:true
  })
})
