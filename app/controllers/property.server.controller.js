'use strict';
var Property = require('./../models/property.server.model');
var multer  = require('multer');
var cloudinary = require('cloudinary');
var async = require('async');
var nodemailer = require('nodemailer');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('yyImU4c6tAZasTqA57mvpw');
var config = require('../../config/config');

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
    property.posted_by = req.user._id;
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
    Property.find({}).populate('posted_by').exec(function (err, properties) {
      if(err) {
        res.status(400).send(err);
      }
      else {
        res.json(properties);
      }
    });
  },

  read: function (req, res) {
    Property.findById(req.params.propertyId).populate('posted_by').exec(function (err, property) {
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
    Property.findById(req.params.userId).populate('posted_by').exec(function (err, userProperties) {
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
  },

  mailProperyOwner: function (req, res) {
    async.waterfall([
      function(done) { res.render('templates/contact-agent-email', {
          appName: config.app.title,
          messageBody: req.body.message
        }, function(err, emailHTML) {
          done(err, emailHTML);
        });
      },

      function(emailHTML, done) {
        var message = {
          'html': req.body.message,
          'subject': req.body.subject,
          'from_email': req.body.senderEmail,
          'from_name': req.body.senderName,
          'to': [{
                  'email': req.body.receiverEmail
              }],
          'headers': {
              'Reply-To': req.body.senderEmail
          },
          'important': false
        };
        mandrill_client.messages.send({'message':message}, function (result) {
          res.send(result);
        }, function(e) {
          console.log('error from mail client', e.name, e.message);
        });
      }
    ], function(err) {
      if (err) {
        console.log('error sending mail', err);
      }
    });
  }
};