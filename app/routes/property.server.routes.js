'use strict';
var property = require('./../controllers/property.server.controller');
var users = require('../../app/controllers/users.server.controller');
var multer = require('multer');
var done=false;

module.exports = function(app) {
  app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
      done = true;
    }
  }));

  app.route('/properties')
    .get(property.list)
    .post(users.requiresLogin, property.uploadImage, property.create);

  app.route('/properties/:propertyId')
    .get(property.read)
    .put(users.requiresLogin, property.uploadImage, property.update)
    .delete(users.requiresLogin, property.delete);

  app.route('/properties/user/:userId').get(users.requiresLogin, property.getUserProperty);

  app.route('/properties/:propertyId/contactAgent').post(users.requiresLogin, property.mailProperyOwner);
  
};