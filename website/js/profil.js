var PORT = "8000";

function newerContent(faden,komment){
    if(typeof faden == "undefined"){
        return false;
    }
    if(typeof komment == "undefined"){
        return true;
    }
    var d1 = new Date(faden.datum);
    var d2 = new Date(komment.datum);
    
    return (d2<d1) ? true : false;
};

$(document).ready(function(){
    console.log("Document ready, loading data from Service");
    var nutzerid = $.urlParam('id');
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
        $('html').css('visibility','visible');
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        //alert("Kein Nutzer eingeloggt. Weiterleitung zum Login!");
        window.location.replace("./login.html");
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
        var content ="<h2 style='color: white;'>Letzte Aktivitäten</h2><hr>";
        
        var faden = response.daten.faden;
        var komment = response.daten.komment;
        var f_id=0,k_id=0;
        if(faden.length == 0 && komment.length == 0){
            content+="<div class='box green'> Noch keine Aktivität </div>";
        }
        else{
            while(k_id < komment.length || f_id < faden.length){
                //Return True if Faden newer, else False
                if(newerContent(faden[f_id],komment[k_id])){
                    content+="<div class='box'>";
                    content+="<div class='d-flex fadentitel'>";
                    content+="<div class='p-2 text-truncate'>"+faden[f_id].thread_titel+"</div>";
                    content+="<div class='p-2'> "+faden[f_id].datum+"  </div>";
                    content+="<div class='p-2' style='width: 10%;'> Punkte: "+faden[f_id].punkte+" </div></div>";
                    content+="<div class='boxcontent'>";
                    content+="<p class='description'>Er hat gespunnen:</p>";
                    content+="<div class='fadeninbox'>  "+faden[f_id].thread_text+"  </div>";
                    content+="<div class='col-md-2'>";
                    content+="<a href='faden.html?id='"+faden[f_id].id+"'><button type='button' class='btn btn-lg btn-primary'>Zum Faden</button></a></div></div></div>";
                    f_id++;
                }
                else{
                    content+="<div class='box'>";
                    content+="<div class='boxcontent'>";
                    content+="<p class='description'>Er hat kommentiert:</p>";
                    content+="<div class='fadeninbox'>  "+komment[k_id].kommentartext+"  </div>";
                    content+="<div class='col-md-2'>";
                    content+="<a href='faden.html?id="+komment[k_id].thread_id+"'><button type='button' class='btn btn-lg btn-primary'>Zum Faden</button></a></div></div></div>";
                    k_id++;
                }
            }
        }
        $(".content").html(content);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
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