const passport = require('passport')

require('../config/passport')(passport)

const login = (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/login',
    })(req,res,next)
};


const logout = (req,res,next) => {
    req.logout((err)=>{
        if(err){return next(err)}
    });
    res.redirect('/')
    
}


module.exports = {
    login,
    logout,
    ensureAuthenticated:function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
            res.redirect('/')
        }
        }
   
    