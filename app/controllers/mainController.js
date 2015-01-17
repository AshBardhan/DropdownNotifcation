var notifications = require('../dataSamples/notificationSample');

exports.showHomePage = function (req, res) {
  res.render('home', {title: 'Welcome to Notification'});
};

exports.fetchNotification = function (req, res) {
  var count = req.body.count || 1,
    messages = [];
  for (var i = 0; i < count; i++) {
    var randomNumber = Math.floor(Math.random() * notifications.length);
    messages.push(notifications[randomNumber]);
  }
  res.json({messages: messages});
};