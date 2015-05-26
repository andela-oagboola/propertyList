'use strict';
var property = require('./../controllers/property.server.controller');

module.exports = function(app) {
  app.route('/property/add').post(property.addProperty);
  app.route('/property/:propertyId').get(property.getUniqueProperty);
  app.route('/property/:propertyId/update').put(property.updateProperty);
  app.route('/property/:propertyId/delete').delete(property.deleteProperty);
  app.route('/property/:userId').get(property.getUserProperty);
  app.route('/properties').get(property.getProperty);
};