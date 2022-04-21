const { Schema, model } = require('mongoose');

const Sc = new Schema({
    Extension: String,
    Url: String
})

module.exports = model("redirectmodel", Sc)