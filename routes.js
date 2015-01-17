var urls = require('./app/enums/urlConstants').urls;
module.exports = function (app) {
  var mainController = require('./app/controllers/mainController');
  app.get(urls.WEB.HOME_PAGE, mainController.showHomePage);
  app.get(urls.API.FETCH_NOTIFICATION, mainController.fetchNotification);
};