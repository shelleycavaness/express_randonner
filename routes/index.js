const router = require('express').Router();
// var swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// var swaggerDocument = require('swagger.json');


router.use('/api', require('./api'));
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;
