'use strict';
var Property = require('./../models/property.server.model');
var multer  = require('multer');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'drl4zlijn', 
  api_key: '128592429854141', 
  api_secret: 'k3K866jrhFt6D0ZzLHlIJOWhRu8' 
});

module.exports = {

  //create a new property
  create: function (req, res) {
    var property = JSON.parse(req.body.data);
    property.image = req.img;
    property.posted_by = req.user;
    Property.create(property, function(err, new_property) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.json(new_property);
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
    if(req.img) {
      req.body.image = req.img;
    }
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
  },

  uploadImage: function (req, res, next) {
    if (req.files.file) {
      var path = req.files.file.path;
      cloudinary.uploader.upload(path, function (response) {
        req.img = response.url;
        next();
      });
    }
    else {
      next();
    }
  }
};