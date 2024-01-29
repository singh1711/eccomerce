const express =  require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport')

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/register', async (req,res)=>{
    let{username , password , email , gender, role} = req.body;
    let user = new User({username , email , gender , role});
    let newUser = await User.register(user , password);
    //res.send(newUser);
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' , failureMessage:true}),
  function(req, res) {
    req.flash('success', `welcome back ${req.user.username}`)
    res.redirect('/products');
  });

router.get('/logout' , (req,res)=>{
    req.logout(()=>{
        req.flash('success' , 'Logged out successfully')
        res.redirect('/login');
    });
})

module.exports = router;
