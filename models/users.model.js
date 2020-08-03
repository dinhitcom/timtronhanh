
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        required: true
    },
    
    fname: {
                type: String,
                required: true
            },
    lname: {
                type: String,
                required: true
            },
        
    phone: {
            type: String,
            match: /^[0]{1}([0-9]{9})$/
        },
     dop: Date,
    sex: Boolean,
    facebook: String,
    address: String,
    
    
    account_type: String,
    account_status: String,
    
    avatar: String
});

module.exports = mongoose.model('users', userSchema, 'users');