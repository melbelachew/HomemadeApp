$(document).ready(function(){
    // var loginForm = $("form.login");
$("#join").on('click', function(event){
event.preventDefault()
    var user = {
        username:$("#name").val().trim(),
        password:$("#password").val().trim(),
        email:$("#email").val().trim()
    }
$.post("/api/join",user,function(res){
    // if(err){console.log(err)}
    console.log(res)
    window.location.reload()
})

})

})