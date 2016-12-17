const dbModels = require('../../db/index.js');

module.exports = function(app) {
  
  // New time stamp to the database
  app.post('/timedate', function (req, res, next) {
    console.log(req.body, 'req.body');
    var date = req.body.date;
    var votes = req.body.votes;
    dbModels.TimeDate
      .findOrCreate({where: {
        dates: date,
        votes: votes
      }})
      .then(function (timedate) {
        res.send(timedate);
      })
  });

//   // edit the time stamp in order to place new number of votes
//   app.put();

//   //get all the time stamps for that specific event
//   app.get();


};