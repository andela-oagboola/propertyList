'use strict';
var Property = require('./../models/property.server.model');

module.exports = {

  //create a new property
  addProperty: function (req, res) {
    Property.create(req.body, function(err, property) {
      if (err) {
        res.json('error massage: ', err);
      }
      else {
        res.json(property);
      }
    });
  },

  getProperty: function(req, res) {
    Property.find({}, function(err, properties) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(properties);
      }
    });
  },

  getUniqueProperty: function (req, res) {
    Property.find({_id: req.params.propertyId}, function(err, property) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(property);
      }
    });
  },

  //get property created by particular user
  getUserProperty: function (req, res) {
    Property.find({posted_by: req.params.userId}, function(err, userProperties) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(userProperties);
      }
    });
  },

  updateProperty: function (req, res) {
    Property.findByIdAndUpdate(req.params.propertyId, req.body, function(err, property) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(property);
      }
    });
  },

  deleteProperty: function (req, res) {
    Property.remove({_id: req.params.propertyId}, function (err, property) {
      if(err) {
        res.json(err);
      }
      else {
        res.json(property);
      }
    });
  }
};