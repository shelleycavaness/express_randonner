const jwt = require('express-jwt');
const secret = require('../config').secret;
///  middleware
/// in case a route is not protected, we still want to get the optional auth user from jwt
function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,   //JWT setting for security?
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
