// var serverRoutes = require('express').Router();
var marketController = require('../controllers/marketController');
var adminController = require('../controllers/adminController');
var util = require('../util/util_functions');
var bcrypt = require('bcrypt-nodejs');

var User = require('../controllers/userController');


module.exports = function(app, passport) {
  // this single, one-time admin setup should only be invoked once. As long as the database has 1 instance of the admin, this route should never ever be visited a second time.

  // serverRoutes.route('/setup')
  app.get('/setup', (req, res) => {
    adminController.setup(req, res);
  });


  // serverRoutes.route('/api/search')
  app.get('/api/search', /* [,some middleware] */ (req, res) => {
    // invoke marketController.getRadiusMarkets to make query to DB
    marketController.getLocationMarkets(req, res);
  });


  // serverRoutes.route('/api/login')
  app.post('/api/login', (req, res) => {
    adminController.login(req, res);
  });


  // serverRoutes.route('/api/create')
  app.post('/api/create', /* [,some middleware] */ (req, res) => {
    // invoke marketController.createMarket to add a new market to DB
    marketController.createMarket(req, res);
  });


  // serverRoutes.route('/api/getOne')
  app.post('/api/getOne', (req,res) => {

    marketController.fetchOne(req, res);

  });


  // serverRoutes.route('/api/update')
  app.put('/api/update', (req,res)=>{

    marketController.updateOne(req, res);
  });


  // serverRoutes.route('/api/delete')
  app.put('/api/delete', (req,res)=>{
    // console.log("in serverRoutes at delete");
    console.log(req.body, "obj in routes");
    marketController.delete(req,res);
  });



  // serverRoutes.route('/api/add')
  app.put('/api/add', (req,res)=>{
    marketController.addMarket(req,res);
  });


  /************************************
  * new routes for passport and auth *
  ************************************/

  // serverRoutes.route('/signup')
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'http://www.zombo.com', // temporary
    failureRedirect: '/signup',
    failureFlash: true,
  }));


  // serverRoutes.route('/login');
  app.post('/login', (req, res) => {
  });

  // serverRoutes.route('/logout');
  app.post('/logout', (req, res) => {
  });



}


// module.exports = serverRoutes; // relic from pre-refactor
