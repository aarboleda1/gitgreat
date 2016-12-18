const dbModels = require('../../db/index.js');
const url = require('url');

module.exports = function(app) {
  // for an event, get all items
  app.get('/itemList', function(req, res, next) {
    var eventName = req.query.eventName.split('_').join(' ');
    var queryString = `SELECT
                        i.id,
                        i.item,
                        i.owner,
                        i.cost
                      FROM events AS event
                        INNER JOIN itemlists AS i ON (event.id = i.eventId)
                      WHERE event.name = "${eventName}"`;

    dbModels.sequelize.query(queryString, { type: dbModels.sequelize.QueryTypes.SELECT})
    .then(function(itemList) {
      res.end(JSON.stringify(itemList));
    })
    .catch(function(error) {
      console.log('serverside error in GET /itemList');
      next(error);
    });
  });

  // for a user + event, post item to what to bring table
  app.post('/itemList', function(req, res, next) {
    var eventName = req.query.eventName.split('_').join(' ');
    var addItem = req.body.item;
    var queryString = `INSERT INTO itemlists (item, owner, cost, eventId) 
                      SELECT 
                      "${addItem.item}", "${addItem.owner}", "${addItem.cost}",
                        event.id 
                      FROM events AS event WHERE event.name = "${eventName}"`;
    dbModels.sequelize.query(queryString, {type: dbModels.sequelize.QueryTypes.INSERT})
    .then(function(success) {
      res.statusCode = 201;
      res.set('Content-Type', 'text/html');
      res.send(JSON.stringify({success: 'item successfully posted to itemsList'}));
    })
    .catch(function(error) {
      console.log('serverside error in POST /itemList');
      next(error);
    });
  });

  // for a user + event, remove the specific item
  app.delete('/itemList', function(req, res, next) {
    var eventName = req.query.eventName.split('_').join(' ');
    var removeItem = req.body.item;
    var queryString = `DELETE i FROM itemlists AS i
                       INNER JOIN events AS event ON (i.eventId = event.id)
                       WHERE i.id="${removeItem.id}" AND
                             i.item="${removeItem.item}" AND
                             i.owner="${removeItem.owner}" AND
                             event.name = "${eventName}"`;
    dbModels.sequelize.query(queryString, {type: dbModels.sequelize.QueryTypes.DESTROY})
    .then(function(success) {
      res.statusCode = 200;
      res.set('Content-Type', 'text/html');
      res.send(JSON.stringify({success: 'item successfully removed from itemsList'}));
    })
    .catch(function(error) {
      console.log('serverside error in DESTROY /itemList');
      next(error);
    });
  });

  // for user + event, update an item
  app.put('/itemList', function(req, res, next) {
    var eventName = req.query.eventName.split('_').join(' ');
    var updateItem = req.body.item;
    var queryString = `UPDATE itemlists AS i
                       INNER JOIN events AS event
                       ON i.eventId = event.id
                       SET
                         i.item = "${updateItem.item}",
                         i.owner = "${updateItem.owner}", 
                         i.cost = "${updateItem.cost}"
                       WHERE
                         i.id = ${updateItem.id} AND
                         event.name = ${eventname}`;
    dbModels.sequelize.query(queryString, {type: dbModels.sequelize.QueryTypes.UPDATE})
    .then(function(success) {
      res.statusCode = 200;
      res.set('Content-Type', 'text/html');
      res.send(JSON.stringify({success: 'item successfully removed from itemsList'}));
    })
    .catch(function(error) {
      console.log('serverside error in UPDATE /itemList');
      next(error);
    });
  });
};