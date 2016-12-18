const dbModels = require('../../db/index.js');

module.exports = function(app) {
  // Place a new timedate into DB
  app.post('/timedate', function (req, res, next) {
    var date = req.body.date;
    var votes = req.body.votes;
    var eventName = req.body.eventName;
    var description = req.body.description;
    var location = req.body.where
    // Find event - need foreignkeyID
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
      //CreateTimeDate if not yet made
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
  
  //Get all the time stamps for specific event
  app.get('/timedate', function (req, res, next) {
    // Get all for a specific event
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
    var eventName = req.body.name;
    var description = req.body.description;
    var location = req.body.where;
    var dates = req.body.date; 
    var votes = req.body.votes;

    // This increases the vote server side
      // before storing it in the database
    var newVotes = parseInt(votes) + 1;
    // Find event first
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