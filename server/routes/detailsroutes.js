const dbModels = require('../../db/index.js');

module.exports = function(app) {

  // Route for editing an event name, used by Description.jsx
  // Dependent on previous event's name
  app.put('/editeventname', function(req, res) {
    dbModels.Event.update({ name: req.body.new }, { where: { name: req.body.original } });
  });

  // Route for editing an event's description, used by Description.jsx
  // Dependent on previous event's name
  app.put('/editeventdescription', function(req, res) {
    dbModels.Event.update({ description: req.body.new }, { where: { name: req.body.original } });
  });

  // Route for editing an event's location, used by Location.jsx
  // Dependent on previous event's location
  app.put('/editeventlocation', function(req, res) {
    dbModels.Event.update({ where: req.body.new }, { where: { where: req.body.original } });
  });

  // Route for getting forum messages
  // Dependent on event's name
  app.get('/forummessages', function(req, res) {
    dbModels.Event.findOne({
      attributes: ['id'],
      where: { name: req.query.eventName }
    }).then(function(eventId) {
      var id = eventId.dataValues.id; // This is super jank
      dbModels.Messages.findOne({
        where: { eventId: id }
      }).then(function( eventMessages ) {
        if (eventMessages) {
          var sentMessages = JSON.parse(eventMessages.messages);
          res.send(sentMessages);
        }
      });
    });
  });

  // Route for updating messages - need to create with one in the database if none are there
  // Dependent on event's name
  app.put('/forummessages', function(req, res) {
    var eventName = req.body.eventName;
    var newMessagesArrayString = req.body.messages;

    dbModels.Event.findOne({
      attributes: ['id'],
      where: { name: eventName }
    }).then(function(eventId) {
      var id = eventId.dataValues.id;
      dbModels.Messages.findOne({where: { eventId: id }}).then(function(message) {
        // If there is no message array, then create a new one
        if (!message) {
          dbModels.Messages.create({
            messages: newMessagesArrayString,
            eventId: id
          });
        } else {
          dbModels.Messages.update({ messages: newMessagesArrayString }, { where: { eventId: id }});
        }
      });
    });

  });
};