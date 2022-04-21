const { Schema, model } = require('mongoose');

const Sc = new Schema({
    Extension: { type: String, required: true, unique: true },
    Url: { type: String, required: true }
})

module.exports = model("redirectmodel", Sc)
