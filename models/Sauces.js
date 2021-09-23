const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    name : { type: String, required: true},
    manufacturer : { type: String, required: true}
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);