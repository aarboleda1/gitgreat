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
    var location = req.body.where
    console.log(req.body, 'REQ*********')
    console.log(date, 'DATE');
    console.log(votes, 'VOTes');
    console.log(eventName, 'EVENT');    

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
          res.send(dates);
        })
      }) 
  });

  // edit the time stamp in order to place new number of votes
  app.put('/timedate', function (req, res, next) {
    console.log(req.body, 'REQ BODY, FOR PUT REQUEST');

    var eventName = req.body.name;
    var description = req.body.description;
    var location = req.body.where;
    var dates = req.body.date; 
    var votes = req.body.votes;
    var newVotes = parseInt(votes) + 1;
    console.log(dates, 'DATES');
    console.log(votes, 'VOTES');
    console.log(id, 'ID');

    dbModels.Event
      .findOne({
        where: {
          name: eventName,
          description: description, 
          where: location
        }
      })
      .then(function (event) {  
        // find the specific comment for that event
        var id = event.get('id');
        dbModels.TimeDate
          .findOne({
          where: {
            dates: dates,
            votes: votes, 
            eventId: id
          }
        })
        .then(function (timedate) {
          //update the current votes with new votes
          timedate.updateAttributes({
            votes: newVotes
          })  
          .then(function (updated, err) {
            if (err) throw err 
            res.send(updated);          
          })
        })
      }) 
  });




};