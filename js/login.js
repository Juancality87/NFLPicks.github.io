var api_url="https://juancality87.github.io/NFLcito_WEBAPI.github.io/api";
jQuery(document).ready(function ($) {
    
    user = document.cookie.split('=')[1];
    Application.init();

    $('#btnlogin').click(function () {

        loginnow();        
    });

});


var Application = function () {
    return {
        init: function () {            
            
        }
    };
}();
function loginnow(){    
    
    var login = document.getElementById('login').value
    var pass = document.getElementById('password').value
    document.cookie = 'login='+ login;

    $.ajax({
        type: "GET",
        url: api_url + "/Schedule/Login?user=" + login + "&pass="+pass,        
        crossDomain: true,
        withCredentials: true,
        async: false,
        dataType: "json",
        success: function (response) {
             console.log(response);
            if(response == 1){
                document.cookie = 'login='+ login;
                document.cookie = 'token='+ response;
                window.location.href ="games.html";
            }
            else{
                Swal.fire(
                    'Error',
                    'Usuario o password son incorrectos',
                    'error'
                  )
            }
            

        },
        failure: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        },
        error: function (response) {
            Notification("Algo salio mal", response.responseJSON.Message, "error");
        }
    });

 
    return false;
}
