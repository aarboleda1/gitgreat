const dbModels = require('../../db/index.js');
const utils = require('../utils.js');
const url = require('url');

const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary.js');
cloudinary.config(cloudinaryConfig.info);

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.redirect('/index.html');
  });

  app.get('/create', function(req, res, next) {
    res.redirect('/createEvent.html');
  });

  // post new user
  app.post('/user', function(req, res, next) {
    dbModels.User
    .create({
      accountName: req.body.accountName,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
      pw: req.body.pw
    })
    .then(function(user) {
      res.redirect('/')
    })
    .catch(function(error) {
      console.log('Error in posting user to server', error);
      next(error);
    })
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

  // For a given user, get all their attending events
  app.get('/attendingEvents', function(req, res, next) {
    var accountName = '"' + req.query.accountName + '"';

    // raw mysql query syntax
    var queryString ='SELECT \
                        e.name, \
                        e.description, \
                        e.where, \
                        e.when \
                      FROM users as attendee \
                        INNER JOIN eventattendee as ea ON (attendee.id = ea.userId) \
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
    })
  });

  // add a user as an 'attendee' to an event
  app.post('/attendingEvents', function(req, res, next) {
    var accountName = '"' + req.body.accountName + '"';
    var eventName = '"' + req.body.eventName + '"';
    var queryString ='INSERT INTO eventattendee (eventId, userId) \
                      SELECT \
                        user.id, event.id \
                      FROM users AS user \
                      INNER JOIN events AS event \
                        ON user.accountName = ' + accountName +
                      ' AND event.name = ' + eventName;
    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.INSERT })
    .then(function(success) {
      console.log('POST successful');
      res.end(JSON.stringify(success));
    })
    .catch(function(error) {
      console.log('POST Error', error);
      next(error);
    });
  })

  // For a given user, get all their planning events
  app.get('/planningEvents', function(req, res, next) {
    var accountName = '"' + req.query.accountName + '"';

    // raw mysql query syntax
    var queryString ='SELECT \
                        e.name, \
                        e.description, \
                        e.where, \
                        e.when \
                      FROM users as planner \
                        INNER JOIN EventPlanner as ea ON (planner.id = ea.userId) \
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
    })
  });

  // add a user as a 'planner' for an event
  app.post('/planningEvents', function(req, res, next) {
    var accountName = '"' + req.body.accountName + '"';
    var eventName = '"' + req.body.eventName + '"';
    var queryString ='INSERT INTO eventattendee (eventId, userId) \
                      SELECT \
                        user.id, event.id \
                      FROM users AS user \
                      INNER JOIN events AS event \
                        ON user.accountName = ' + accountName +
                      ' AND event.name = ' + eventName;
    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.INSERT })
    .then(function(success) {
      console.log('POST successful');
      res.end(JSON.stringify(success));
    })
    .catch(function(error) {
      console.log('POST Error', error);
      next(error);
    });
  });

  app.get('/itemList', function(req, res, next) {
    var eventName = url.parse(req.url).query.slice(10).split('_').join(' ');
    dbModels.Event.findOne({where: {name: eventName}})
    .then(function(event) {
      var eventId = event.id;
      dbModels.ItemList.findAll({where: {eventId: eventId}})
      .then(function(items) {
        utils.sendResponse(res, 200, 'application/json', items);
      });
    });
  });

  app.post('/itemList', function(req, res, next) {
    var eventName = url.parse(req.url).query.slice(10).split('_').join(' ');
    dbModels.Event.findOne({where: {name: eventName}})
    .then(function(event) {
      var eventId = event.id;
      dbModels.ItemList
      .create({
        item: req.body.item,
        owner: req.body.owner,
        cost: req.body.cost,
        eventId: eventId
      })
      .then(function(item) {
        utils.sendResponse(res, 201, 'text/html', 'item successfully posted');
      }).catch(function(err) {
        console.log('Error: ', err);
      });
    });
  });

  app.get('/reminders', function(req, res, next) {
    var eventName = url.parse(req.url).query.slice(10).split('_').join(' ');
    dbModels.Event.findOne({where: {name: eventName}})
    .then(function(event) {
      var eventId = event.id;
      dbModels.Reminder.findAll({where: {eventId: eventId}})
      .then(function(reminders) {
        utils.sendResponse(res, 200, 'application/json', reminders);
      });
    });
  });
  
  app.post('/reminders', function(req, res, next) {
    var eventName = url.parse(req.url).query.slice(10).split('_').join(' ');
    dbModels.Event.findOne({where: {name: eventName}})
    .then(function(event) {
      var eventId = event.id;
      dbModels.Reminder
      .create({
        phoneNumber: req.body.phoneNumber,
        msg: req.body.msg,
        when: req.body.when,
        eventId: eventId
      })
      .then(function(item) {
        utils.sendResponse(res, 201, 'text/html', 'reminder successfully posted');
      }).catch(function(err) {
        console.log('Error: ', err);
      });
    });
  });
}