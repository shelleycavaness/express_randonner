const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

/***********  Get User with token *****************/
// In postman this return the user with the token in plain sight! 
// not exactly ideal for security
router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) =>{
    //if the user token is wrong send a 401 status
    if(!user){ return res.sendStatus(401); }
  //otherwise return the user
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

/************    Update User       ******************/ 
//update a user identified with the token 
// return the modified user with the token
router.put('/user', auth.required,(req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }
// return the saved user
    return user.save().then(() => {
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

/***********    login User   ******************/ 
// User logins in with username and password creating a new token
router.post('/users/login', (req, res, next) => {
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "email can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "password can't be blank"}});
  }
//maybe turn this into an async await function with a promise ?
//I ger a strange warning when i make this an arrow fuction
  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

/**************  Create a new User   ******************/ 
// don't forget in postman you are sending a user object with the 3 fields in json ;-)
router.post('/users',(req, res, next) => {
  console.log(` ********* calling create user route`, req.body)
  let user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(() => {
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});


// it would be good to create a delete users endpoint ('/delete/:id')

module.exports = router;
