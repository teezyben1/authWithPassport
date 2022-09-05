const express = require('express');
const {login, logout, ensureAuthenticated} = require('../auth/auth')
const {
    getHome, getSignUp,
    getLogIn,
    signUp, 
    getSite
} = require('../controllers/pageControllers');


   
const router = express.Router();

router.get('/', getSite);
router.get('/home', ensureAuthenticated, getHome);
router.get('/signup', getSignUp);
router.post('/signup', signUp);
router.get('/login', getLogIn);
router.post('/login',login);
router.get('/logout', logout)



module.exports = router;