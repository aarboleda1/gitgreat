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
    dbModels.Event.update({ where: req.body.new }, { where: { where: req.body.original } });
  });

  // Route for getting forum messages
  app.get('/forummessages', function(req, res) {
    dbModels.Event.findAll({
      attributes: ['id'],
      where: { name: req.query.eventName }
    }).then(function(eventId) {
      dbModels.Messages.findAll({
        where: { eventId: eventId }
      }).then(function( eventMessages ) {
        res.send(JSON.parse(eventMessages));
      });
    });
  });

  // Route for updating messages
  app.put('/forummessages', function(req, res) {
    var eventName = req.body.eventName;
    var newMessagesArrayString = JSON.stringify(req.body.messages);

    dbModels.Event.findAll({
      attributes: ['id'],
      where: { name: eventName }
    }).then(function(eventId) {
      dbModels.Messages.update({ messages: newMessagesArrayString }, { where: { eventId: eventId }});
    });
  });
};