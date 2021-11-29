let express = require('express');
let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
let router = express.Router();
let UserModel = require('../models/users');
let User = UserModel.User;


let indexController = require('../controllers/indexController');
const trainerController = require("../controllers/trainerController");

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ uname: username}, function(err, user) {
            if(err) {return done(err); }
            if(!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if(!user.validPassword(password)) {
                return done(null, false, {message: 'in'});
            }
            return done(null, user);
        });
    }
  ));

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

//renders the home page
router.get('/', indexController.renderIndex);
//renders the create account page
router.get('/createAccount', indexController.createAccountView);
//handle the post from createAccount
router.post('/createAccount', indexController.handleCreateAccount);
//renders the login page
router.get('/login', indexController.loginView);
//handles the post from the login
router.post('/login', indexController.handleLogin);

// handle forget password
router.get('/forgetPassword',indexController.renderForgetPasswordView)
router.get('/sendRecoverPasswordEmail',indexController.sendRecoverPasswordEmail)
router.get('/recoverPassword',indexController.renderResetPasswordView)
router.post('/resetPassword',indexController.resetPasswordByAccountTypeAndUUID)
// logout user
router.get('/logout',indexController.logout)



module.exports = router;
