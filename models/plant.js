// File: ./models/plant.js

var mongoose = require('mongoose');

//define schema
var Schema = mongoose.Schema;

const PlantSchema = new Schema({
    plantname: String,
    latinname: String,
    category: String,
    plantdetails: String,
    plantimage: String,
    location: String,
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},

});
 
const Plant = mongoose.model('Plants', PlantSchema);
 
module.exports = Plant;