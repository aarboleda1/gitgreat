const dbModels = require('../../db/index.js');
const url = require('url');

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.redirect('/index.html');
  });

  app.get('/create', function(req, res, next) {
    res.redirect('/createEvent.html');
  });

  app.get('/user', function(req, res, next) {
    var accountName = req.query.accountName;
    dbModels.User
    .findOne({
      where: {accountName: accountName}
    })
    .then(function(data) {
      if (data) {
        // user was found
        res.end(JSON.stringify(data));
      } else {
        // user was not found
        res.end(JSON.stringify(
          {notFound: accountName + ' not found'}));
      }
    });
  });

  // New user
  app.post('/user', function(req, res, next) {
    dbModels.User
    .create({
      accountName: req.body.accountName,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
      pw: req.body.pw
    })
    .then(function(user) {
      res.redirect('/');
    })
    .catch(function(error) {
      console.log('Error in posting user to server', error);
      next(error);
    });
  });

  // post an event to table
  app.post('/event', function(req, res, next) {
    dbModels.Event
    .create({
      name: req.body.name,
      description: req.body.description,
      where: req.body.where,
      when: req.body.when
    })
    .then(function(event) {
      res.redirect('/');
    })
    .catch(function(err) {
      console.log('Error: ', err);
      next(error);
    });
  });

  // For a given event, get all attendees
  app.get('/attendee', function(req, res, next) {
    var eventName = '"' + req.query.eventName + '"';

    var queryString ='SELECT \
                        attendee.id,\
                        attendee.accountName, \
                        attendee.displayName, \
                        attendee.pw, \
                        attendee.phoneNumber\
                      FROM events as e \
                        INNER JOIN eventattendees as ea ON (e.id = ea.eventId) \
                        INNER JOIN users as attendee ON (ea.userId = attendee.id) \
                      WHERE e.name = ' ;
    queryString = queryString.concat(eventName);

    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.SELECT })
    .then(function(events) {
      res.end(JSON.stringify(events));
    })
    .catch(function(error) {
      console.log('serverside error in GET /attendee table');
      next(error);
    });
  });

  // For a given user, get all their attending events
  app.get('/attendingEvents', function(req, res, next) {
    var accountName = '"' + req.query.accountName + '"';

    // raw mysql query syntax
    var queryString ='SELECT \
                        e.id, \
                        e.name, \
                        e.description, \
                        e.where, \
                        e.when \
                      FROM users as attendee \
                        INNER JOIN eventattendees as ea ON (attendee.id = ea.userId) \
                        INNER JOIN events as e ON (ea.eventId = e.id) \
                      WHERE attendee.accountName = ';
    queryString = queryString.concat(accountName);

    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.SELECT})
    .then(function(events) {
      res.end(JSON.stringify(events));
    })
    .catch(function(error) {
      console.log('serverside error in GET /eventTable');
      next(error);
    });
  });

  // For a given event, add a user as an 'attendee' to that event
  app.post('/attendingEvents', function(req, res, next) {
    var accountName = '"' + req.body.accountName + '"';
    var eventName = '"' + req.body.eventName + '"';
    var parsedName = JSON.parse(accountName);


    var queryString ='INSERT INTO eventattendees (eventId, userId) \
                      SELECT \
                        event.id, user.id \
                      FROM users AS user \
                      INNER JOIN events AS event \
                        ON user.accountName = ' + accountName +
                      ' AND event.name = ' + eventName;

    // When adding an attendee to an event, check to see if that user is in the database
    // If they are not in there then add them to the database
    dbModels.User.findOrCreate({
      where: { accountName: parsedName }
    }).then(function(success) {
      dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.INSERT })
      .then(function(success) {
        res.end(JSON.stringify(success));
      })
      .catch(function(error) {
        console.log('POST Error', error);
        next(error);
      });
    });

  });

  // For a given event and user, remove user as an attendee
  app.delete('/attendingEvents', function(req, res, next) {
    console.log('REQUESTBODY', req.body);
    var accountName = req.body.accountName;
    console.log('ACCOUNTNAME', accountName);
    var eventName = req.body.eventName;
    var queryString = `DELETE ea FROM eventattendees AS ea
                       INNER JOIN events as event ON (ea.eventId = event.id)
                       INNER JOIN users as user ON (ea.userId = user.id)
                       WHERE event.name = "${eventName}" AND
                             user.accountName = "${accountName}"`;
    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.DESTROY })
    .then(function(success) {
      res.end(JSON.stringify(success));
    })
    .catch(function(error) {
      console.log('DELETE Error', error);
      next(error);
    });
  });

  // For a given user, get all their planning events
  app.get('/planningEvents', function(req, res, next) {
    var accountName = '"' + req.query.accountName + '"';

    // raw mysql query syntax
    var queryString ='SELECT \
                        e.id, \
                        e.name, \
                        e.description, \
                        e.where, \
                        e.when \
                      FROM users as planner \
                        INNER JOIN eventplanners as ea ON (planner.id = ea.userId) \
                        INNER JOIN events as e ON (ea.eventId = e.id) \
                      WHERE planner.accountName = ';
    queryString = queryString.concat(accountName);

    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.SELECT})
    .then(function(events) {
      res.end(JSON.stringify(events));
    })
    .catch(function(error) {
      console.log('serverside error in GET /eventTable');
      next(error);
    });
  });

  // For a given user, add a user as a 'planner' to that event
  app.post('/planningEvents', function(req, res, next) {
    var accountName = '"' + req.body.accountName + '"';
    var eventName = '"' + req.body.eventName + '"';
    var queryString ='INSERT INTO eventplanners (eventId, userId) \
                      SELECT \
                        event.id, user.id \
                      FROM users AS user \
                      INNER JOIN events AS event \
                        ON user.accountName = ' + accountName +
                      ' AND event.name = ' + eventName;
    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.INSERT })
    .then(function(success) {
      res.end(JSON.stringify(success));
    })
    .catch(function(error) {
      console.log('POST Error', error);
      next(error);
    });
  });
};