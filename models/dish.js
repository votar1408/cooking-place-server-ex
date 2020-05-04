const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Dish', dishSchema);