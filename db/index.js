var Sequelize = require('sequelize');
var mysql = require('mysql');

mysql.createConnection({
  user: root,
  password: null,
  database: 'gitgreat'
});

var sequelize = new Sequelize('gitgreat', 'root', '', {
  host: 'localhost', dialect: 'mysql'
});

var User = sequelize.define('users', {
  accountName: {
    type: Sequelize.STRING,
    unique: true
  },
  displayName: {
    type: Sequelize.STRING
  },
  pw: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  }
});

var Event = sequelize.define('events', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  where: {
    type: Sequelize.STRING
  },
  when: {
    type: Sequelize.DATE
  }
});

var ItemList = sequelize.define('itemlists', {
  item: {
    type: Sequelize.STRING
  },
  owner: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.STRING
  },
});

var Reminder = sequelize.define('reminders', {
  phoneNumber: {
    type: Sequelize.STRING
  },
  msg: {
    type: Sequelize.STRING
  },
  when: {
    type: Sequelize.DATE
  },
});

var Photos = sequelize.define('photos', {
  url: {
    type: Sequelize.STRING
  }
});

var Messages = sequelize.define('messages', {
  messages: {
    type: Sequelize.STRING
  }
});

var Cars = sequelize.define('cars', {
  cars: {
    type: Sequelize.STRING
  }
});

var TimeDate = sequelize.define('timedate', {
  dates: {
    type: Sequelize.STRING
  },
  votes: {
    type: Sequelize.INTEGER
  }
});

// //one timeDate belongs to one event;
TimeDate.belongsTo(Event);

// one itemlist : one event
ItemList.belongsTo(Event);

// one reminder : one event
Reminder.belongsTo(Event);

// one array of messages : one event
Event.hasMany(Messages);
Messages.belongsTo(Event);

// one array of cars : one event
Event.hasMany(Cars);
Cars.belongsTo(Event);

// initial setup to remove timestamps join tables (sequelize on-default adds)
var EventAttendee = sequelize.define('eventattendee', {
}, {
  timestamps: false
});

var EventPlanner = sequelize.define('eventplanner', {
}, {
  timestamps: false
});

// many events : many attendees join table
Event.belongsToMany(User, {through: EventAttendee});
User.belongsToMany(Event, {through: EventAttendee});

// many events : many planners join table
Event.belongsToMany(User, {through: EventPlanner});
User.belongsToMany(Event, {through: EventPlanner});

sequelize
.authenticate()
.then(function(err) {
  console.log('Connection has been established successfully.');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

sequelize.sync({
  // Drop tables on server restart 
  // (change to false after development)
  force: false
});

module.exports.User = User;
module.exports.Event = Event;
module.exports.ItemList = ItemList;    
module.exports.Reminder = Reminder;
module.exports.Photos = Photos;
module.exports.Messages = Messages;
module.exports.Cars = Cars;
module.exports.TimeDate = TimeDate;
module.exports.sequelize = sequelize;