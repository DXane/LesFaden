$(document).ready(function(){
    $.getScript("/js/profil.js",function(){console.log("Load Profile")});
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
                content+="<li>"+$.ehtml(nachrichten[i].nachrichttitel)+"</li>";
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
        if(freunde != null && freunde.length > 0){
            content+="<ul>";
            for(var i=0;i < freunde.length; i++){
                content+="<a href='./profil.html?id="+freunde[i].ID+"'><li>"+$.ehtml(freunde[i].Benutzername)+"</li>";
            }
            content+="</ul>";
            $('freunde').html(content);
        }

        
        
    }).fail(function(response){
        console.log("Fehler beim Api request")
        console.log(response);
    });

    $("#edit").click(function(){
        if($('#edit').text()!='Speichern'){
            $('#edit').text("Speichern");
            $('#about').prop('disabled', false);
            $('#picurl').prop('disabled', false);
        }
        else{
            $('#edit').text("Bearbeiten");
            $('#about').prop('disabled', true);
            $('#picurl').prop('disabled', true);
            var userid=(cookieset())? getJWTItem('jwt','id') : 0;
            var daten={"id":userid,"about":$('#about').val(),"image":$('#picurl').val()};
            $.ajax({
                url: "http://localhost:"+PORT+"/api/benutzer/",
                method: "put",
                dataType: "json",
                data: daten,
                xhrFields: { withCredentials: true}
            }).done(function (response) {
                console.log("Data loaded successfully");
                console.log(response);
                alert("Profile geupdatet");
                window.location.reload();
            }).fail(function(response){
                console.log("Fehler beim Api request")
                console.log(response);
                alert("Konnte profil nich updaten");
            });
        }
    });
});

