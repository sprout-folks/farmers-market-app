// configure passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../model/userModel');

module.exports = function(passport) {

  //== serialize and deserialize users ==//
  passport.serializeUser(function (user, done) {
    console.log('serializing User');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing User');
    User.findById(id, function(err, user) {
      // console.log(user);
      passport.user = user;
      done(err, user);
    });
  });
  


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      // on signup, check if email is already in db
      User.findOne({ 'local.email': email })
      .catch(err => done(err))
      .then(user => {
        if (user) {  // email already exists in db 
          return done(null, false, req.flash('signupMessage', 'That email is already registered.'));
        
        } else {
          // create a new instance of a User model 
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save()
          .then(newUser => {
            newUser.token = newUser.generateJwt();
            return done(null, newUser);
          })
          .catch(err => done(err));
        }
      });
    });
  }));


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    console.log('passport.js local-login');
    User.findOne({ 'local.email': email })
    .catch(err => done(err))
    .then(user => {
      if (!user) {
        console.log('user not found');
        return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      if (!user.validPassword(password)) {  
        console.log('incorrect password');
        return done(null, false, req.flash('loginMessage', 'Incorrect password.'))
      }
      console.log('passport.js user returned from local-login ', user);
      user.token = user.generateJwt(); 
      return done(null, user);
    });
  }));

}; // closing module.exports
