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

  posted_by: Schema.ObjectId,

  posted_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema);