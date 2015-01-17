var userFlow = {
  _sendAJAXRequest: function (rqUrl, rqData, methodType, success, failure, dataType, contentType) {
    $.ajax({
      url: rqUrl,
      type: methodType,
      data: rqData,
      dataType: dataType,
      contentType: contentType,
      cache: false,
      async: true,
      success: function (data) {
        success(data);
      },
      error: function (err) {
        failure(err);
      }
    });
  },
  initNotificationPage: function () {
    userFlow.fetchNotification(true);
    setInterval(function () {
      userFlow.fetchNotification(false);
    }, 10000);
  },
  fetchNotification: function (isPageLoad) {
    var count = isPageLoad ? localStorage.count : 1;
    if (count || count != 0) {
      var success = function (data) {
        console.log(data);
        if(!isPageLoad) {
          localStorage.setItem('count', parseInt(localStorage.count) + 1);
        }
      }
      var failure = function (data) {
        console.log(data);
      }
      console.log(count);
      userFlow._sendAJAXRequest(urls.fetchNotification, {count: count}, "GET", success, failure, "JSON", "application/x-www-form-urlencoded; charset=UTF-8");
    }
  }
};