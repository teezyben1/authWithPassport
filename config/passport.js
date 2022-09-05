const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/usersModel')

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'},async (email,password,done) => {
            //Match user
         const user = await User.findOne({email})
         if (!user){
            return done(null,false, {message:'that email is not registered'})
         }     
            // Match password
            if(user){
            const auth = await bcrypt.compare(password,user.password)
            if(auth){
                return done(null,user);
            } 
            else{
                return done(null, false, {message:'incorrect password'})
            }
            }

        })
    )
    passport.serializeUser((user,done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id,done) => {
        const user = await User.findById(id)
        return done(null,user)
    })
}