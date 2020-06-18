$(document).ready(() =>{
    console.log("Document ready, loading data from Service Nachrichten");
    //Request Fadeninhalt
    if(!cookieset()){
        window.location.replace("./index.html");
    }
    
    $.ajax({
        url: "http://localhost:"+PORT+"/api/nachricht/get/"+$.urlParam('id'),
        method: "get",
        dataType: "json",
        xhrFields: { withCredentials: true}
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);
            
        // hilfsvariable anlegen
        var content ="";

        var nachrichten = response.daten;

        $('beitragtitel').html($.ehtml(nachrichten.nachrichttitel))
        $('beitraginhalt').html($.ehtml(nachrichten.nachrichttext));
        content+="Am "+dateparse(nachrichten.datum)+" von "+$.getUser(nachrichten.senderid);
        $('metainhalt').html($.ehtml(content));
    }).fail(function(response){
        console.log("Fehler beim Api request")
        console.log(response);
    });

    $.getUser = function(id){
        var name;
        $.ajax({
            url: "http://localhost:"+PORT+"/api/benutzer/get/"+id,
            method: "get",
            dataType: "json",
            async: false
        }).done(function (response) {
            console.log("Data loaded successfully");
            console.log(response);
            name= response.daten.benutzername;
        }).fail(function (jqXHR, statusText, error) {
            console.log("Error occured");
            console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        });
        return $.ehtml(name);
    };
});