$(document).ready(function() {

    var loginForm = $("form.login");
    var userInput = $("input#name-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        username: userInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username ||!userData.email || !userData.password) {
        return;
      }
  
      loginUser(userData    .username, userData.email, userData.password);
      userInput.val("");
      emailInput.val("");
      passwordInput.val("");
    });
  
    function loginUser(username, email, password) {
      $.post("/api/login", {
        username: username,  
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });
