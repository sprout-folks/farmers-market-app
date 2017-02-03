var express = require('express');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var refresh = require('../Database_Data/refreshData');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cron = require('node-cron');
var routes = require('./routes/routes.js');


var app = express();
var port = process.env.PORT || 8080;

/************
 * db setup *
 ************/
var keys = require('../API_KEYS.js');
var mongoURI = process.env.mongoURI || keys.mongoURI;
mongoose.connect(mongoURI);

// app.set('superSecret', keys.secret); // what does this do??
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
// app.use(routes); // may not need this because of passport.js

/*********************
 * setup passport.js *
 *********************/
require('./config/passport')(passport);
app.use(session({
    secret: 'amazingBongoBand'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
routes(app, passport);

<<<<<<< HEAD

refresh()
=======
console.log(new Date())
cron.schedule('* * * * 7', function(){
    refresh();
});
>>>>>>> refresh

app.listen(port);
console.log("server running on port " + port);

module.exports = app;