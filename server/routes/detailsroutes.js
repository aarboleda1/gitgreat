const dbModels = require('../../db/index.js');

module.exports = function(app) {

  // Route for editing an event name, used by Description.jsx
  app.put('/editeventname', function(req, res) {
    dbModels.Event.update({ name: req.body.new }, { where: { name: req.body.original } });
  });

  // Route for editing an event's description, used by Description.jsx
  app.put('/editeventdescription', function(req, res) {
    dbModels.Event.update({ description: req.body.new }, { where: { name: req.body.original } });
  });

  // Route for editing an event's location, used by Location.jsx
  app.put('/editeventlocation', function(req, res) {

  });
};