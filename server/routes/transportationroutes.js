const dbModels = require('../../db/index.js');

module.exports = function(app) {

  // Route for getting cars with drivers and riders
  // Dependent on event's name
  app.get('/rides', function(req, res) {
    dbModels.Event.findOne({
      attributes: ['id'],
      where: { name: req.query.eventName }
    }).then(function(eventId) {
      var id = eventId.dataValues.id;
      dbModels.Cars.findOne({
        where: { eventId: id }
      }).then(function( eventCars ) {
        if (eventCars) {
          var sentCars = JSON.parse(eventCars.cars);
          res.send(sentCars);
        }
      });
    });
  });

  // Route for updating cars - need to create with one in the database if none are there
  // Dependent on event's name
  app.put('/rides', function(req, res) {
    var eventName = req.body.eventName;
    var carArrayString = req.body.cars;

    dbModels.Event.findOne({
      attributes: ['id'],
      where: { name: eventName }
    }).then(function(eventId) {
      var id = eventId.dataValues.id;
      dbModels.Cars.findOne({where: { eventId: id }}).then(function(car) {
        // If there is no car array, then create a new one
        if (!car) {
          dbModels.Cars.create({
            cars: carArrayString,
            eventId: id
          });
        } else {
          dbModels.Cars.update({ cars: carArrayString }, { where: { eventId: id }});
        }
      });
    });
  });

};