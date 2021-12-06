// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        /*username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        
        password: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },*/
        
       user_email: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'
       },
       user_password:
       {
           type: String,
           trim: true,
           required: 'password required'
       },
       user_account_type:
       {
           type: String,
           trim: true,
           required: 'acct type required'
       }
       /*displayName: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       },
       created: 
       {
            type: Date,
            default: Date.now
       },*/
      /* accountType: 
       {
            type: String,
            default: 'trainer'
       }*/
    },
    {
        collection: "users"
    }
);

// configure options for User Model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('user', User);