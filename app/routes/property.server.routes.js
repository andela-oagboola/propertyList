'use strict';
var property = require('./../controllers/property.server.controller');

module.exports = function(app) {

  app.route('/properties')
    .get(property.list)
    .post(property.create);

  app.route('/properties/:propertyId')
    .get(property.read)
    .put(property.update)
    .delete(property.delete);

  app.route('/properties/user/:userId').get(property.getUserProperty);
  
};