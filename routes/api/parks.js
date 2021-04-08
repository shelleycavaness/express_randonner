const router = require('express').Router();
const mongoose = require('mongoose');
// const { route } = require('./users');
const Plant = mongoose.model('Plant');
const Park = mongoose.model('Park');

// Preload park objects on routes with ':park'
// router.param('park', function(req, res, next, slug) {
//         console.log(`55555555555555555555555555555` )

//   Park.findOne({ slug: slug})
//     .then(function (park) {
//       console.log(`7777777777777777` )
//       if (!park) { return res.sendStatus(404); }
//       req.park = park;

//       return next();
//     }).catch(next);
// });


/* http://localhost:3003/api/park/ */

// create a new park
router.post('/parks', (req, res, next )=>{
  // let park = new Park(req.body.park);
  let park = new Park();
  park.title = req.body.park.title
  park.description = req.body.park.description

  park.save().then( ()=> { 
    console.log(`object saved`)

    return res.json({park : park})
   })

})

//list all parks
// router.get('/parks')

//update a park ?
// router.put('/:park')



module.exports = router;


