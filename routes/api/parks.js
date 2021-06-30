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

// get a park by it's id in mongo
router.get( '/:_id', (req,res, next) => {
  console.log(`get slash =============`, req.params )
 // Yes, it would be nice to validate the ObjectId, for erros.
    Park.findById(req.params._id).then((park) =>{
      //error if the park doesn exist
      if(!park){ return res.status(500).json({errors: {park_id: "park id can't be blank is incorrect"}}); }
    //otherwise return the park 
      return res.json({park: park});
    })
    .catch(next); 
  
  // else {console.log(`shittttt`, )}
  // return res.json({"cooding": "llllll"})
})

/* http://localhost:3003/api/park/ */

// create a new park
router.post('/parks', (req, res, next )=>{
  // let park = new Park(req.body.park);
  let park = new Park();
  park.title = req.body.park.title
  park.description = req.body.park.description
  park.slug = req.body.park.slug
  park.image = req.body.park.image
  park.save().then( ()=> { 
    console.log(`object saved`)

    return res.json({park : park})
   })

})

//list all parks
// router.get('/parks')
/************    Update Park       ******************/ 

router.put('/:_id', (req, res, next) => {
  console.log(`111111111111111`, )
  Park.findById(req.params._id).then((park) =>{
    console.log(`22222222222222`, park)
    //error if the park doesn exist
    if(!park){ return res.status(500).json({errors: {park_id: "broken"}}); }
  //otherwise return the park 
// only update fields that were actually passed...
    if(typeof req.body.park.title !== 'undefined'){
      park.title = req.body.park.title;
    }
    if(typeof req.body.park.description !== 'undefined'){
      park.description = req.body.park.description;
    }
    if(typeof req.body.park.slug !== 'undefined'){
      park.slug = req.body.park.slug;
    }
    // if(typeof req.body.user.image !== 'undefined'){
    //   park.image = req.body.park.image;
    // }
    ///update the plants in the plants array
    // if(typeof req.body.park.plants !== 'undefined'){
    //   park.plants = req.body.park.plants;
    // }
   //return the saved plant
   return park.save().then(()=>{
    return res.json({park: park});
   }) 
  })
  .catch(next); 

})



module.exports = router;


