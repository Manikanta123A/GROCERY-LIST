const MyError = require("./utils/error")
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.url = req.url
        req.flash("sucess","You need to login to acess this")
        res.redirect("/user/login")
    }
    else{
        next()
    }
}
module.exports.saveUrl = (req,res,next)=>{
    if(req.session.url){
        res.locals.Url = req.session.url
        next()
    }
    else{
    next()
    }
}