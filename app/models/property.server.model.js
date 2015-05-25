 'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  PropertySchema = new Schema({

  title: {
    type: String,
  },

  description: {
    type: String
  },

  price: {
    type: Number
  },

  street: {
    type: String
  },

  city: {
    type: String
  },

  State: {
    type: String
  },

  Country: {
    type: String
  },

  posted_by: {
    type: Schema.objectId
  },

  posted_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema);