const express = require('express');
const path = require('path')
const app = express(); 
const session = require('express-session');
const nocache = require('nocache')
const {v4 : uuidv4} = require('uuid');
const router = require('./router')


const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(nocache())

app.set('view engine','ejs');

//Load Static Assets
app.use('/static',express.static(path.join(__dirname,'Public')))

app.use(session({
    secret : uuidv4(),
    resave : false , 
    saveUninitialized : true
}));

app.use('/route',router)
//HOME ROUTE
app.get('/',(req,res)=>{
    res.render('base',{title:"Login Page"})
})
// app.get('/dashboard',(req,res)=>{
//     res.render('dashboard')
// })
app.listen(3000,()=>{
    console.log('Server started\nhttp://127.0.0.1:3000');
})
