const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const recipeSchema = new Schema({
    title: String,
    description: String,
    dishType: ObjectId,
    ingredients: [{
        ingredientId: ObjectId,
        weight: String
    }],
    timeOfCook: String,
    createdBy: ObjectId,
    msg: String
});

module.exports = mongoose.model('Recipe', recipeSchema);