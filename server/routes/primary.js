const dbModels = require('../../db/index.js');
const utils = require('../utils.js');

const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../config/cloudinary.js');
cloudinary.config(cloudinaryConfig.info);

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.redirect('/homepage.html');
  });

  app.get('/create', function(req, res, next) {
    res.redirect('/createEvent.html');
  });

  app.get('/eventTable', function(req, res, next) {
    dbModels.Event.findAll({order: [['when', 'DESC']]})
    .then(function(events) {
      utils.sendResponse(res, 200, 'application/json', events);
    });
  });

  app.post('/eventTable', function(req, res, next) {
    dbModels.Event
    .create({
      name: req.body.name,
      where: req.body.where,
      when: req.body.when
    })
    .then(function(event) {
      res.redirect('/');
    })
    .catch(function(err) {
      console.log('Error: ', err);
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

  // will not be using below
  // app.get('/displayImages', function(req, res) {
  //   console.log('hits displayimages in server');
  //   dbModels.Photos.findAll()
  //   .then(function(data) {
  //     for(var pair in data.entries()) {
  //       console.log(pair);
  //     }
  //     res.send(data);
  //   });
  // });

  // app.post('/uploadImage', function(req, res) {
  //   console.log('hits uploadImage in server');
  //   var form = new multiparty.Form();
  //   form.parse(req, function(err, fields, files) {
  //     console.log('fields: ', fields);
  //     console.log('files: ', files);
  //     console.log('file:', files.imageFile[0].path);

  //     cloudinary.uploader.upload(files.imageFile[0].path, function(result) {
  //       console.log('cloudinary resulttt: ', result);
  //       dbModels.Photos.create({url: result.url})
  //       .then(function(event) {
  //         console.log('successfully added url to db!!!');
  //       })
  //       .catch(function(err) {
  //         console.log('photosTable db entry error: ', err);
  //       });
  //     });

  //   });
  //   res.send();
  // });
}