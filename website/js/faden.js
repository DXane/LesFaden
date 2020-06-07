var sav;
function vote(id){
    var richtung = id.innerText === "Hoch" ? 'up' : 'down';
    var count=document.getElementsByTagName('count');
    var change;
    if(richtung==='up'){
        var number = parseInt(count[0].innerHTML);
        id.style.background="green"
        id == document.getElementById('runter') ? 0 : document.getElementById('runter').style.background='none';
        if(sav==1){
            change=2;
            sav=0;

        }
        else if(sav === undefined){
            change=1;
            sav=0;
        }
        else{
            sav=undefined;
            change=-1;
            id.style.background="none";
        }
    }
    else if(richtung==='down'){
        var number = parseInt(count[0].innerHTML);
        id.style.background="red";
        id == document.getElementById('hoch') ? 0 : document.getElementById('hoch').style.background='none';
        if(sav === undefined){
            change=-1;
            sav=1;
        }
        else if(sav==0){
            change=-2;
            sav=1;
        }
        else{
            change=1;
            sav=undefined;
            id.style.background="none";
        }
    }
    number+=change;
    count[0].innerHTML=number;
}

function sendkomment(){
    var text=document.getElementsByTagName('textarea');
    komment=text[0].value;
    console.log(komment.length);
    if(komment.length!=0){
        insertKomment(komment);
        document.getElementById('nokomment').remove();
    }
    else{
        alert("Bitte schreibe einen Kommentar.")
    }
    console.log(komment);
}

function insertKomment(komment){
    var kommentbox= document.getElementsByTagName('kommentare');
    kommentbox[0].innerHTML+=generateKomment(komment);
}

function generateKomment(Komment){
    var string="<kommentar><ktitel>anonymous "+new Intl.DateTimeFormat('de', { month: 'short', day: '2-digit' }).format(new Date())+"</ktitel><br><inhalt>"+Komment+"</inhalt></kommentar>";
    return string;
}

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
        meta += "Erstellt am "+ obj.datum +" Keine Änderung von "+$.getUser(obj.creator_id)+" erstellt";
        meta += "<vote><button onclick=\"vote(this)\" id='hoch' class=\"btn btn-primary\">Hoch</button>";
        meta += "<button onclick=\"vote(this)\" id='runter' class=\"btn btn-primary\">Runter</button></vote>";
        meta += "<count>"+obj.punkte+"</count>";
        $("metainhalt").html(meta);
        
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
                kommentbox+="<kommentar id='"+obj.id+"'><ktitel><a "+((obj.benutzer_id == 0) ? "" : "href=profil.html?id="+obj.benutzer_id)+"> "+obj.benutzername+((obj.benutzer_id != 0) ? "" : "#"+obj.id) +" </a> "+obj.datum+" </ktitel><br>";
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
    $("#edit").click(function(){
        $('#about').prop('disabled', !$('#about').prop('disabled'));
        if($('#edit').text()!='Speichern'){
            $('#edit').text("Speichern");
        }
        else{
            $('#edit').text("Bearbeiten");
        }
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