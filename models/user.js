// File: ./models/user.js

var mongoose = require('mongoose');

//define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  location: String,
});

// compile model 
const User = mongoose.model('Users', UserSchema);
 
module.exports = User;