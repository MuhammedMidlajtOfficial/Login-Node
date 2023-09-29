const express = require('express');
const auth = require('./auth');
const router = express.Router();

const credential = {
    email : 'admin@gmail.com',
    password : '123'
}

let loggedout = false;
let invalidId = false;

//HOME 

router.get('/',auth.redirectToDashboard,(req,res)=>{
    if(loggedout){
        res.render('./base',{title : "Login Page", logout : true });
        loggedout = false;
        invalidId = false;
        console.log(loggedout);
    }else if(invalidId){
        res.render('./base',{ invalidUser : true })
    }else{
        res.render('./base',{ invalidUser : false })
    }
} )

// LOGIN USER
router.post('/login',(req,res)=>{
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
    }else{
        invalidId = true;
        res.redirect('/');
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
router.get('/logout',auth.isLogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            loggedout= true;
            res.redirect('/')
        }
    })
})

module.exports = router