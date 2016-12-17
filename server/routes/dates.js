const dbModels = require('../../db/index.js');

module.exports = function(app) {
  // Find the ID of the event then 
    // then set the foreign key of the vent
  // New time stamp to the database
  app.post('/timedate', function (req, res, next) {
    var date = req.body.date;
    var votes = req.body.votes;
    var eventName = req.body.eventName;
    var description = req.body.description;
    var location = req.body.location
    
    // find the event the create a new TimeDate
    dbModels.Event
      .findOne({
        where: {
          name: eventName,
          description: description, 
          where: location,
        }
      })
      .then(function (event, other) {
        var id = event.get('id')
      dbModels.TimeDate
        .findOrCreate({where: {
          dates: date,
          votes: votes,
          eventId: id
        }})
        .then(function (timedate) {
          res.sendStatus(200);
        })
      })
  });
//   //get all the time stamps for that specific event
  // app.get();

//   // edit the time stamp in order to place new number of votes
//   app.put();




};