$(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      console.log(data)
      $(".user-name").text(data.user);
    });
  });