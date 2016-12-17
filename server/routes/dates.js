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
      .then(function (event) {
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
  app.get('/timedate', function (req, res, next) {
    // get all for a specific event
    var eventName = req.query.name;
    var description = req.query.description;
    var location = req.query.where;
    dbModels.Event
      .findOne({
        where: {
          name: eventName,
          description: description, 
          where: location,
        }
      })
      .then(function (event) {
        var id = event.get('id');
        dbModels.TimeDate
          .findAll({
          where: {
            eventId: id
          }
        })
        .then(function (dates) {
          console.log(dates, 'DATES INSIDE DATES.JS');
          res.send(dates);
        })
      }) 
  });

//   // edit the time stamp in order to place new number of votes
//   app.put();


// { name: 'Social Night',
//   description: 'GAMES/HOLIDAY STUFF',
//   where: 'Hack Reactor',
//   when: '' }

};