$(document).ready(function(){
    console.log("Document ready, loading data from Service");
    buttonremove();
    $.ajax({
        url: "http://localhost:"+PORT+"/api/faden/"+$.getRequestUri(),
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
        var faden = '';
        
        if(response.daten.length==0){
            faden='<div class="alert alert-danger" style="width: 90%;margin-left: 5%;" role="alert">Keine Fäden mit so einem Titel - <a href="./index.html">zum Start zurück?</a></div>';   
            $('#weiterbutton').attr('hidden',true);
        }
        else{
            for (i = 0; i < response.daten.length-1; i++) {
                var obj = response.daten[i];
                faden+="<div class=\"container-fluid faden box\">"+generateTitel(obj.thread_titel,obj.datum);
                faden+="<div class=\"d-flex flex-row justify-content-between fadeninhalt\">"+generateContent(obj.thread_text,"faden.html?id="+obj.id)+"</div></div>";
            }
        }
        // zusammengesetzen Code im Dokument ausgeben
        $('fadencontainer').html(faden);
        if(response.daten[response.daten.length-1].next==null){
            $('#weiterbutton').attr('hidden',true);
        }
        if(response.daten[response.daten.length-1].next==0){
            $('#zurueckbutton').attr('hidden',true);
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Error occured");
        console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
    $('#weiterbutton').click(function(){
        page=parseInt($.urlParam('p'));
        if(Number.isNaN(page)){
            page=0;
        }
        console.log(page);
        page+=1;
        page=page.toString()
        window.location.href="./index.html?p="+page;
    });
    $('#zurueckbutton').click(function(){
        page=parseInt($.urlParam('p'));
        if(Number.isNaN(page)){
            page=0;
        }
        console.log(page);
        page-=1;
        page=page.toString()
        window.location.href="./index.html?p="+page;
    });
    $('#faden_create').submit(function( event ){
        event.preventDefault();
        if(!checkText($('#title').val())){
            alert("Kein Titel");
        }
        else if(!checkText($('#thread').val())){
            alert("Kein Text");
        }
        else{
            var userid=(cookieset())? getJWTItem('jwt','id') : 0;
            var obj = {titel: $('#title').val(),text:$('#thread').val(),datum: new Date().toISOString(),user:userid};

            $.ajax({
                url: "http://localhost:"+PORT+"/api/faden/new",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(obj),
                dataType: "json",
                xhrFields: { withCredentials: true}
            }).done(function (response) {
                alert("Submit Sucess full");
                console.log(response.daten.ID);
                window.location.replace("./faden.html?id='"+response.daten.ID+"'");
                
            }).fail(function (jqXHR, statusText, error) {
                console.log("Error occured");
                console.log("Response Code: " + jqXHR.status + " - Message: " + jqXHR.responseText);
                alert(jqXHR.responseText);
            });
        }
    });
    
});
function buttonremove(){
    page=parseInt($.urlParam('p'));
    if(Number.isNaN(page)){
        page=0;
    }
    if(page>0){
        $("#zurueckbutton").attr('hidden',false);
    }
}
