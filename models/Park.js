const mongoose = require('mongoose');
const slug = require('slug');

const ParkSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  image: String,
  favoritesCount: {type: Number, default: 0},
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
});

//updating the likes on the park
ParkSchema.methods.updateFavoriteCount = function() {
  const park = this;

  return User.count({favorites: {$in: [park._id]}}).then(function(count){
    park.favoritesCount = count;

    return park.save();
  });
};


ParkSchema.methods.toJSONFor = function(user){
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      body: this.body,
      favorited: user ? user.isFavorite(this._id) : false,
      favoritesCount: this.favoritesCount,
    };
  };
  
  mongoose.model('Park', ParkSchema);