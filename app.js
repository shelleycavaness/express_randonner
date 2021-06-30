const http = require('http'),
    // path = require('path'),
    // methods = require('methods'),
    morgan = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    // passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

const dotenv = require('dotenv').config();

/**
* Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
* See https://docs.mongodb.com/ecosystem/drivers/node/ for more details       */
const {MongoClient} = require('mongodb');

//async problem here and dotenv
const uri = process.env.URI
// console.log(`uri`, uri)
//////////////////////////////////////////////

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'))

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
//Create a session middleware.
//Session data is not saved in the cookie itself, just the session ID.
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log("We are connected with Mogodb !   mongodb://localhost/conduit ");
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./config/passport');
require('./models/Park');
require('./models/Plant');
//test the slash root
// app.get('/', (req, res) => {
//   // console.log("yeah baby! ")
//    res.send('An alligator approaches!');
// });
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log("yeah baby stack error! ")

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors for production': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
const server = app.listen( process.env.PORT || 3003, () =>{
  console.log('Listening on port ' + server.address().port);
});


  