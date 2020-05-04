const {Schema, model} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    firstName: {type: String},
    secondName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    personalRecipes: {type: [ObjectId]}
});

module.exports = model('User', userSchema);