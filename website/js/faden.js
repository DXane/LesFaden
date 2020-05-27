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
    consol.log(komment);
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
        meta += "Erstellt am "+ obj.datum +" Keine Änderung";
        meta += "<vote><button onclick=\"vote(this)\" id='hoch' class=\"btn btn-primary\">Hoch</button>";
        meta += "<button onclick=\"vote(this)\" id='runter' class=\"btn btn-primary\">Runter</button></vote>";
        meta += "<count>11</count>";
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
                kommentbox+="<kommentar><ktitel><a href=\"profil.html?id="+obj.b_id+"\"> anonymous </a> "+obj.datum+" </ktitel><br>";
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
});