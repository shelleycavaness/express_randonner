const router = require('express').Router();
const mongoose = require('mongoose');
const Plant = mongoose.model('Plant');


//list all plants
router.get( '/plants', (req,res, next) => {
  console.log(`get plants here =============`, req.params )
 // Yes, it would be nice to validate the ObjectId, for erros.
    Plant.find().then((plants) =>{
      //error if the park doesn exist
      if(!plants){ return res.status(500).json({errors: {plants: "planst not working"}}); }
    //otherwise return the park 
      return res.json({plants: plants});
    })
    .catch(next); 
})

// get a plant by id endpoint
router.get( '/plants/:_id', (req,res, next) => {
  console.log(`get plants by _id =============`, req.params )
 // Yes, it would be nice to validate the ObjectId, for erros.
    Plant.findById(req.params._id).then((plants) =>{
      //error if the park doesn exist
      if(!plants){ return res.status(500).json({errors: {plants: "plant id not valid"}}); }
    //otherwise return the park 
      return res.json({plants: plants});
    })
    .catch(next); 
})

//

// update plant by id endpoint send a plant object
router.put( '/plants/:_id', (req,res, next) => {
  console.log(`modify plants by _id ******************` )
 // Yes, it would be nice to validate the ObjectId, for erros.
    Plant.findById(req.params._id).then((plant) =>{
      //error if the plant doesn exist
      if(!plant){ return res.status(500).json({errors: {plant: "plant id not valid"}}); }

    // only update fields that were actually passed...
    if(typeof req.body.plant.title !== 'undefined'){
      plant.title = req.body.plant.title;
    }
    if(typeof req.body.plant.description !== 'undefined'){
      plant.description = req.body.plant.description;
    }
    if(typeof req.body.plant.slug !== 'undefined'){
      plant.slug = req.body.plant.slug;
    }
    if(typeof req.body.plant.image !== 'undefined'){
      plant.image = req.body.plant.image;
    }
    //return the saved plant 
    return plant.save().then(()=>{
      console.log(`plant updated################`) 
      return res.json({plant: plant});
    })
    
      
    })
    .catch(next); 
})



/**************  Create a new Plant   ******************/ 
// don't forget in postman you are sending a plant object 
router.post('/plants',(req, res, next) => {
  console.log(` ********* calling create plant route`, req.body)
  let plant = new Plant();

  plant.title = req.body.plant.title;
  plant.description = req.body.plant.description;
  plant.image = req.body.plant.image;
  // plant.category = req.body.plant.category
  plant.slug = req.body.plant.slug
  plant.save().then(() => {
    console.log(`object saved`)
    return res.json({ plant: plant});
  })
});

module.exports = router;
