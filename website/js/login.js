$(document).ready(function(){
    $('#create').click(function(){
        window.location.href ="./nutzer_erstellung.html";
    });
    $('#nutzer_erstellung').submit(function(event){
        event.preventDefault();
        if(!checkText($('#name').val())){
            alert("Kein Name");
        }
        else{
            if(!checkText($('#password').val())){
                alert("Bitte ein Passwort eingeben!");
            }
            else if(!checkText($('#password_check').val())){
                alert("Bitte das Passwort erneut eingeben!");
            }
            else if(($("#password").val() !== $('#password_check').val())){
                alert("Die Passwörter stimmen nicht übereinander!");
            }
            else{
                var data = {'name':$('#name').val(),'passwort':CryptoJS.MD5($('#password').val()).toString(),'datum':new Date().toISOString()}
                $.ajax({
                    url: "http://localhost:"+PORT+"/api/benutzer/new",
                    method: "post",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    dataType: "json",
                    xhrFields: { withCredentials: true}
                }).done(function (response) {
                    console.log(response.daten);
                    window.location.replace("./priv_profil.html?id="+response.daten.id);
                }).fail(function (jqXHR, statusText, error) {
                    console.log("Error occured");
                    console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
                    alert("Nutzer existier schon!");
                });
            }
        }
    });
    $('#login').submit(function(event){
        event.preventDefault();
        if(!checkText($('#name').val())){
            alert("Kein Name");
        }
        else{
            if(!checkText($('#passwort').val())){
                alert("Bitte ein Passwort eingeben!");
            }
            else{
                var data = {'name':$('#name').val(),'passwort':CryptoJS.MD5($('#passwort').val()).toString()}
                $.ajax({
                    url: "http://localhost:"+PORT+"/api/benutzer/zugang",
                    method: "post",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    dataType: "json",
                    xhrFields: { withCredentials: true}
                }).done(function (response) {
                    console.log(response.daten.ID);
                    window.location.replace("./priv_profil.html");
                }).fail(function (jqXHR, statusText, error) {
                    console.log("Error occured");
                    console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
                    alert("Error!");
                });
            }
        }
    });
});

