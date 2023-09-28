const express = require('express')
const router = express.Router();

const credential = {
    email : 'admin@gmail.com',
    password : '123'
}

// LOGIN USER
router.post('/login',(req,res)=>{
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email;
        res.redirect('/dashboard')
        // res.end('Login Successfull')
    }else{
        res.end('Invalid Username')
    }
})

module.exports = router