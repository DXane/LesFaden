$(document).ready(function(){
    $.getScript("./js/profil.js",function(){console.log("Load Profile")});
    if(cookieset()){
        if($.urlParam('id') !== false){
            window.location.replace("./priv_profil.html");
        }
        var nutzerid=getJWTItem('jwt','id');
    }
    else{
        window.location.replace("./profil.html");
    }
    
    $.ajax({
        url: "http://localhost:"+PORT+"/api/benutzer/nachricht/get/"+nutzerid,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);
            
        // hilfsvariable anlegen
        var content ="Mail<hr>";

        var nachrichten = response.daten;
        if(nachrichten.length > 0){
            content+="<ul>";
            for(var i=0;i < nachrichten.length-1; i++){
                content+="<li>"+nachrichten[i].nachrichttitel+"</li>";
            }
            content+="</ul>";
            $('mail').html(content);
        }
    }).fail(function(response){
        console.log("Fehler beim Api request")
        console.log(response);
    });
    $.ajax({
        url: "http://localhost:"+PORT+"/api/benutzer/freunde/get/"+nutzerid,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);
            
        // hilfsvariable anlegen
        var content ="Freunde<hr>";

        var freunde = response.daten;
        if(freunde.length > 0){
            content+="<ul>";
            for(var i=0;i < freunde.length; i++){
                content+="<a href='./profil.html?id="+freunde[i].ID+"'><li>"+freunde[i].Benutzername+"</li>";
            }
            content+="</ul>";
            $('freunde').html(content);
        }

        
        
    }).fail(function(response){
        console.log("Fehler beim Api request")
        console.log(response);
    });
});

$("#edit").click(function(){
    $('#about').prop('disabled', !$('#about').prop('disabled'));
    if($('#edit').text()!='Speichern'){
        $('#edit').text("Speichern");
    }
    else{
        $('#edit').text("Bearbeiten");
    }
});