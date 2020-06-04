var PORT = "8000";
var nutzerid=11//Math.round(Math.random()*100);

function newerContent(faden,komment){
    return true;
};

$(document).ready(function(){
    console.log("Document ready, loading data from Service");
    //Get User Info
    $.ajax({
        url: "http://localhost:"+PORT+"/api/benutzer/get/"+nutzerid,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);

        /* die Idee bei diesem Prinzip ist, dass HTML Code als Text angesehen wird. 
            Diesen können wir häppchen-weise in einer Variable zusammen setzen 
            und dann auch ausgeben 
            Hinweis: Damit man Quotes/doppelte Anführungsstriche NICHT escapen muss, 
            kann man bei jQuery einfache Anführungszeichen verwenden    
        */
            
        // hilfsvariable anlegen
        var profil = '';

        var obj = response.daten;
        $("#picture").attr("src",obj.link_profilbild);
        $("#about").html(obj.password);
        $("name").html(obj.benutzername);
        $("date").html(obj.datum);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
    //Get User Content
    $.ajax({
        url: "http://localhost:"+PORT+"/api/benutzer/getContent/"+nutzerid,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log("Data loaded successfully");
        console.log(response);
            
        // hilfsvariable anlegen
        var content = '';
        
        var faden = response.daten.faden;
        var komment = response.daten.komment;
        var f_id=0,k_id=0;
        //while(k_id < komment.length && f_id < faden.length){
            //Return True if Faden newer, else False
            //if(newerContent(faden[f_id],komment[k_id])){
                f_id++;
            //}
        //}
        $(".content").html(content);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        alert(jqXHR.responseText);
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
});