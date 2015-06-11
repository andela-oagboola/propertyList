 'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  PropertySchema = new Schema({

  title:  String,

  description: String,

  price: Number,

  street: String,

  city: String,

  state: String,

  country: String,

  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  phone_number: Number,

  email: String,

  image: String,

  posted_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema);