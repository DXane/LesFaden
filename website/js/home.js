$(document).ready(function(){
    console.log("Document ready, loading data from Service");

    $.ajax({
        url: "http://localhost:"+PORT+"/api/faden/get/range/10/"+$.urlParam('p'),
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

        for (i = 0; i < response.daten.length; i++) {
            var obj = response.daten[i];
            faden+="<div class=\"container-fluid faden box\">"+generateTitel(obj.thread_titel,obj.datum);
            faden+="<div class=\"d-flex flex-row justify-content-between fadeninhalt\">"+generateContent(obj.thread_text,"faden.html?"+obj.id)+"</div></div>";
        }

        // zusammengesetzen Code im Dokument ausgeben
        $('fadencontainer').html(faden);
        
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
        window.location.href="index.html?p="+page;
    });
});