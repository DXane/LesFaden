var PORT = "8000";

$(document).ready(function(){
    console.log("Document ready, loading data from Service");
    //Request Fadeninhalt
    $.ajax({
        url: "http://localhost:"+PORT+"/api/faden/get/"+$.urlParam("id"),
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
        var meta = '';

        var obj = response.daten;
        $("beitragtitel").html(obj.thread_titel);
        $("beitraginhalt").html(obj.thread_text);
        $('metainhalt > datum').html("Erstellt am "+ dateparse(obj.datum) +" Keine Änderung von "+$.getUser(obj.creator_id)+" erstellt");
        $("count").html(obj.punkte);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
    //Request Kommentare
    $.ajax({
        url: "http://localhost:"+PORT+"/api/kommentare/get/byThread/"+$.urlParam("id"),
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
        var kommentbox = '';
        if(response.daten.length>0){
            for (i = 0; i < response.daten.length; i++) {
                var obj = response.daten[i];
                kommentbox+="<kommentar id='"+obj.id+"'><ktitel><a "+((obj.benutzer_id == 0 || obj.benutzername == null) ? "" : "href=./profil.html?id="+obj.benutzer_id)+"> "+obj.benutzername+((obj.benutzer_id != 0) ? "" : "#"+obj.id) +" </a> "+dateparse(obj.datum)+" </ktitel><br>";
                kommentbox+="<inhalt>"+obj.kommentartext+"</inhalt></kommentar>";
            }
        }
        else{
            kommentbox+="<div id='nokomment' class='box green' style='width:80%;'>Keine Kommentare</div>";
        }
        
        $("kommentare").html(kommentbox);

        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
    
    $('#komment').submit(function( event ){
        event.preventDefault();
        if(!checkText($('#komment_text').val())){
            alert("Kein Kommentar");
        }
        else{
            var userid=(cookieset())? getJWTItem('jwt','id') : 0;
            var obj = {text: $('#komment_text').val(),thread_id:$.urlParam('id'),datum: new Date().toISOString(),user:userid};

            $.ajax({
                url: "http://localhost:"+PORT+"/api/kommentare/new/"+$.urlParam('id'),
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(obj),
                dataType: "json",
                xhrFields: { withCredentials: true}

            }).done(function (response) {
                alert("Submit Sucess full");
                console.log(response.daten.ID);
                window.location.reload();
                
            }).fail(function (jqXHR, statusText, error) {
                console.log("Error occured");
                console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
                alert(jqXHR.responseText);
            });
        }
    });

    $("#hoch").click(function(){
        $.ajax({
            url: "http://localhost:"+PORT+"/api/faden/vote",
            method: "put",
            contentType: "application/json",
            data: JSON.stringify({
                'id': $.urlParam('id'),
                'vote':true
            }),
            dataType: "json",
            xhrFields: { withCredentials: true}
        }).done(function (response) {
            //alert("Submit Sucess full");
            console.log("Voted Hoch");
            console.log(response);
            $("count").html(response.daten.Punkte);
            
        }).fail(function (jqXHR, statusText, error) {
            console.log("Error occured");
            console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
            alert(jqXHR.responseText);
        });
    });

    $("#runter").click(function(){
        $.ajax({
            url: "http://localhost:"+PORT+"/api/faden/vote",
            method: "put",
            contentType: "application/json",
            data: JSON.stringify({
                'id': $.urlParam('id'),
                'vote':false
            }),
            dataType: "json",
            xhrFields: { withCredentials: true}
        }).done(function (response) {
            //alert("Submit Sucess full");
            console.log("Voted Hoch");
            console.log(response);
            $("count").html(response.daten.Punkte);
            
        }).fail(function (jqXHR, statusText, error) {
            console.log("Error occured");
            console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
            alert(jqXHR.responseText);
        });
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
        return name;
    };
});