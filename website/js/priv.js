$(document).ready(function(){
    if(cookieset()){
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
        content+="<ul>";
        for(var i=0;i < nachrichten.length; i++){
            content+="<li>"+nachrichten[i].nachrichttitel+"</li>";
        }
        content+="</ul>";
        $('mail').html(content);
        
    }).fail(function(response){
        console.log("Fehler beim Api request")
        console.log(response);
    });
});