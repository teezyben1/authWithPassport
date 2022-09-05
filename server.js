const express = require('express')
const mongoose = require("mongoose")
const session = require('express-session')
const path = require('path')
const passport = require('passport')


const app = express();
require('./config/passport')(passport)

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


const routes = require('./routes/pageRoutes')





const PORT = 7000;

// DB connection
const DBURI = require('./config/keys').MONGO_URI

mongoose.connect(DBURI)
    .then((result) => {
        app.listen(PORT,()=>{
            console.log(`app listening on port ${PORT} with DB @ ${DBURI}`)
        })
    })    
    .catch((err) => { 
        console.log(err)  
    });


// Middlewares
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname, 'public','css')))
app.use(express.static(path.join(__dirname, 'public','image')))



//Routes
app.use(routes)

 