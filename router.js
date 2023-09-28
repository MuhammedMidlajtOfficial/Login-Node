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
        res.redirect('/route/dashboard')
        // res.end('Login Successfull')
    }else{
        res.end('Invalid Username')
    }
})

// DASHBOARD
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user : req.session.user })
    }else{
        res.send('Unautherize User')
    }
})

// LOGOUT
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.render('base',{title : "Express", logout : "Redirect to base line-8"});
        }
    })
})

module.exports = router