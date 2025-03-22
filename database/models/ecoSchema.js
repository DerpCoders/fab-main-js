const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   userID: { type: String },
   fcoins: { type: Number },
   items: { type: Array },
   job: { type: String },
   vehicles: { type: Array },
   wife: { type: String },
   nickname: { type: String },
   age: { type: Number },
   gender: { type: String },
});

module.exports = mongoose.model('economy', schema);