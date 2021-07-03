const mongoose = require('mongoose');
const slug = require('slug');

const PlantSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  // body: String,
  image: String,
  // category: ['herbs','leaf','root','mushrooms','fruits']
  // category: String,
  //favoritesCount: {type: Number, default: 0},
  // park: { type: mongoose.Schema.Types.ObjectId, ref: 'Park' }
});

mongoose.model('Plant', PlantSchema);
