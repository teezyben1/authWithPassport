const passport = require("../config/passport");
const User = require("../models/usersModel");
// const { application } = require("express");



const getSite = (req,res) => {
   res.render('index')
};


 const getHome = (req,res) => {
    res.render('home',{name:req.user.name})
 };


 const getSignUp = (req,res ) => {
    res.render('signup')
 };

 const getLogIn = (req,res) => {
    res.render('login')
 };



const signUp = async(req,res) => {
    let errors = []
   
      const {name,username,email,password,password2} = req.body
      
      
         // validations
         if(!name || !username || !email || !password || !password2){
            errors.push({message: 'please fill all form'})
         }
      
         if(password !== password2){
            errors.push({message: 'unmatched password'})
         }
      
         if (password.length < 6){
            errors.push({message: 'mininum password length is 6 characters'})

         }
         if (errors.length > 0){
            res.render('signup',{
               errors,
               name,
               username,
               email,
               password,
               password2
            
            })

         }
         else{
            // check if user exist
            const user = await User.findOne({email})
            if(user){
               errors.push({message: 'email already exist'})
               res.render('signup',{
                  errors,
                  name,
                  username,
                  email,
                  password,
                  password2
               
               })

            }
            else{
               const newUser = new User({...req.body})
               await newUser.save()
               res.redirect('/login')
            }
         }
   }
   

 module.exports = {
    getHome,
    getSignUp,
    getLogIn,
    signUp,
    getSite
   
 }      