
module.exports.isLogin = (req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        return res.redirect('/')
    }
}

module.exports.redirectToDashboard =(req,res,next)=>{
    if(req.session.user){
        return res.redirect('/dashboard')
    }else{
        next()
    }
}
