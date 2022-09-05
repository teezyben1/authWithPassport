const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true

    },
    username:{
        type: String,
        required: true,
        lowercase: true
    

    },
    email:{
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
    

    },
    password:{ 
        type: String,
        required: true,
        
    },

    date:{
        type:Date,
        default:Date.now
    }
});  

//Hash new users password
usersSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

    



const User = mongoose.model('user',usersSchema);

module.exports = User; 