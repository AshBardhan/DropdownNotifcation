var userFlow = {
  /* Module for using AJAX Request Skeleton */
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
  /* Module for initializing widget and handlers */
  initNotificationPage: function () {
    userFlow.fetchNotification(true);
    // Polling request for Notification update every 10 seconds
    setInterval(function () {
      userFlow.fetchNotification(false);
    }, 10000);
    // Showing Notification updates on clicking inside the Icon
    $('.notify-icon').on('click', function (e) {
      e.stopPropagation();
      $('.notify-box').fadeIn();
      localStorage.setItem('count', 0);
      $('#yes-list .message').removeClass('new');
    });
    // Hiding Error screen on pressing 'Esc' key
    $(document).on('keyup', function (e) {
      if (e.which == 27 && $('.error-box, .error-background').is(':visible')) {
        $('.error-box, .error-background').fadeOut();
      }
    });
    // Hiding Notification updates on clicking outside the Icon
    $(document).on('click', function (e) {
      if ($('.notify-box').is(':visible')) {
        $('.notify-box').fadeOut();
        $('.notify-count, .notify-total-count').addClass('hide').removeClass('display-inline');
      }
    });
  },
  /* Module for fetching Notification results */
  fetchNotification: function (isPageLoad) {
    var count = isPageLoad ? localStorage.count : 1;
    if (count && count != 0) {
      var success = function (data) {
        if (data.messages && data.messages.length > 0) {
          var message = '';
          $.each(data.messages, function (i, j) {
            message += "<div class='message new'>" + j + "</div>";
          });
          if (!isPageLoad) {
            localStorage.setItem('count', parseInt(localStorage.count) + 1);
          }
          $('#yes-list').removeClass('hide').prepend(message);
          $('#no-list').addClass('hide');
          $('.notify-count, .notify-total-count').text(localStorage.count <= 99 ? localStorage.count : '99+').removeClass('hide').addClass('display-inline');
        }
      }
      var failure = function (data) {
        $('.error-box, .error-background').fadeIn();
      }
      userFlow._sendAJAXRequest(urls.fetchNotification, {count: count}, "GET", success, failure, "JSON", "application/x-www-form-urlencoded; charset=UTF-8");
    }
  }
};