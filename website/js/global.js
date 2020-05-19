
//Füge Fädeneinträge in den Container ein
function insertfaden(anzahlfaden){
    
    if (anzahlfaden === undefined) {
        anzahlfaden = 8;
    }

    var list=document.getElementsByTagName("fadencontainer");
    var container=list[0];
    for(i=0; i<anzahlfaden;i++){
        container.innerHTML+=generateFaden();
    }
}

function insertBeitrag(anzahlfaden){
    if (anzahlfaden === undefined) {
        anzahlfaden = 8;
    }
    var list=document.getElementsByTagName("content");
    var content=list[0];
    for(i=0; i<anzahlfaden;i++){
        content.innerHTML+=generateBeitrag();
    }
}

function generateBeitrag(){
    var datum =new Intl.DateTimeFormat('de', { month: 'short', day: '2-digit' }).format(new Date())
    var content="<div class=\"box\">"+generateTitel("Hallo",datum,"Fäden "+Math.round(Math.random()*100))+generateContentB()+"</div>";
    return content;
}

function generateContentB(){
    var inhalt =" So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächtger Schnelle Vom Himmel durch die Welt zur Hölle! Es irrt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Es irrt der Mensch, wenn er sie beim Kragen hätte. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Ich bin von je der Ordnung Freund gewesen. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle! Es irrt der Mensch, wenn er sie beim Kragen hätte. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle! Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte.";
    var string="<div class=\"boxcontent\"><p class=\"description\">Er hat gespunnen:</p>";
    string+="<div class=\"fadeninbox\">"+inhalt+"</div>";
    string+="<a href=\"./faden.html\"><button class=\"btn-primary btn fadenlink\">Zum Faden</button></a></div></div></div>";
    return string;
}

//Erstelle einen Vorschaueintrag
function generateFaden(){
    var inhalt="Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Ich bin von je der Ordnung Freund gewesen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens Quelle hin. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächtger Schnelle Vom Himmel durch die Welt zur Hölle! Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen."
    var datum =new Intl.DateTimeFormat('de', { month: 'short', day: '2-digit' }).format(new Date())
    var faden="<div class=\"container-fluid faden box\">"+generateTitel("titel",datum,Math.round(Math.random()*1000));
    faden+="<div class=\"d-flex flex-row justify-content-between fadeninhalt\">"+generateContent(inhalt,"faden.html")+"</div>";
    return faden;
}
//Erstelle die Titelbox mit dem übergebenen Titel, Datum und anzahl der Kommentare eingetragen
function generateTitel(titel="none",datum="",kommentare=""){
    return "<div class=\"d-flex fadentitel\"><div class=\"p-2 text-truncate\">"+titel+"</div><div class=\"p-2\" >"+datum+"</div><div class=\"p-2\" style=\"width: 10%;\">"+kommentare+"</div></div>";
}

//Erstelle die Inhaltbox mit den übergebenen Inhalt und Link zum Faden
function generateContent(inhalt="",link=""){
    return "<div class=\"p-2  text-truncate\" style=\"width: 80%;\">"+inhalt+"</div><div class=\"p-2\" style=\"width: 15%;\"><a href=\""+link+"\"><button class=\"btn btn-primary\">Zum Faden</button></a></div>";
}

$(document).ready(function(){
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