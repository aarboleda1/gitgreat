const dbModels = require('../../db/index.js');

module.exports = function(app) {
  // Find the ID of the event then 
    // then set the foreign key of the vent
  // New time stamp to the database
  app.post('/timedate', function (req, res, next) {

    console.log(req.body, 'req.body');
    var date = req.body.date;
    var votes = req.body.votes;
    var eventName = req.body.eventName;
    var description = req.body.description;
    var where = req.body.where;
    console.log(eventName, 'EVENTNAME')
    dbModels.Event
      .findOne({
        where: {
          name: 'xmas',
          description: 'great pary', 
          where: 'hr'
        }
      })
      .then(function (event) {
        var id = event.get('id')
        console.log(id, 'IDDDD');
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

//   // edit the time stamp in order to place new number of votes
//   app.put();


//   //get all the time stamps for that specific event
//   app.get();


};