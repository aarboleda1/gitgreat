const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary.js');
cloudinary.config(cloudinaryConfig.info);

module.exports = function(app) {
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
};