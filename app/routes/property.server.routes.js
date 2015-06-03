'use strict';
var property = require('./../controllers/property.server.controller');
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
    .post(property.uploadImage, property.create);

  app.route('/properties/:propertyId')
    .get(property.read)
    .put(property.update)
    .delete(property.delete);

  app.route('/properties/user/:userId').get(property.getUserProperty);
  
};