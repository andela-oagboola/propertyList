'use strict';
var Property = require('./../models/property.server.model');

module.exports = {

  //create a new property
  create: function (req, res) {
    Property.create(req.body, function(err, property) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.json(property);
      }
    });
  },

  list: function(req, res) {
    Property.find({}, function(err, properties) {
      if(err) {
        res.status(400).send(err);
      }
      else {
        res.json(properties);
      }
    });
  },

  read: function (req, res) {
    Property.find({_id: req.params.propertyId}, function(err, property) {
      if(err) {
        res.status(400).send(err);
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
        res.status(400).send(err);
      }
      else {
        res.json(userProperties);
      }
    });
  },

  update: function (req, res) {
    Property.findByIdAndUpdate(req.params.propertyId, req.body, function(err, property) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.json(property);
      }
    });
  },

  delete: function (req, res) {
    Property.remove({_id: req.params.propertyId}, function (err, property) {
      if(err) {
        res.status(400).send(err);
      }
      else {
        res.json(property);
      }
    });
  }
};