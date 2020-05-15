
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

function insertBeitrag(){
    var anzahlfaden=2;
    var list=document.getElementsByTagName("content");
    var content=list[0];
    for(i=0; i<anzahlfaden;i++){
        content.innerHTML+=generateBeitrag();
    }
}

function generateBeitrag(){
    var content="<div class=\"box\">"+generateTitel("Hallo","01.01.1952","Fäden 1111")+generateContentB()+"</div>";
    return content;
}

function generateContentB(){
    var inhalt =" So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächtger Schnelle Vom Himmel durch die Welt zur Hölle! Es irrt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Es irrt der Mensch, wenn er sie beim Kragen hätte. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Ich bin von je der Ordnung Freund gewesen. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle! Es irrt der Mensch, wenn er sie beim Kragen hätte. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle! Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte.";
    var string="<div class=\"boxcontent\"><p class=\"description\">Er hat gespunnen:</p>";
    string+="<div class=\"fadeninbox\">"+inhalt+"</div>";
    string+="<a class=\"fadenlink\" href=\"\">Zum Faden</a></div></div>";
    return string;
}

//Erstelle einen Vorschaueintrag
function generateFaden(){
    var inhalt="Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Ich bin von je der Ordnung Freund gewesen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens Quelle hin. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächtger Schnelle Vom Himmel durch die Welt zur Hölle! Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen."

    var faden="<div class=\"container-fluid faden box\">"+"<div class=\"d-flex box fadentitel\">"+generateTitel("titel","01.01.1970","11111")+"</div>";
    faden+="<div class=\"d-flex flex-row justify-content-between fadeninhalt\">"+generateContent(inhalt,"home.html")+"</div>";
    return faden;
}
//Erstelle die Titelbox mit dem übergebenen Titel, Datum und anzahl der Kommentare eingetragen
function generateTitel(titel="none",datum="none",kommentare="none"){
    return "<div class=\"d-flex fadentitel\"><div class=\"p-2 text-truncate\">"+titel+"</div><div class=\"p-2\" >"+datum+"</div><div class=\"p-2\" style=\"width: 10%;\">"+kommentare+"</div></div>";
}

//Erstelle die Inhaltbox mit den übergebenen Inhalt und Link zum Faden
function generateContent(inhalt="none",link="none"){
    return "<div class=\"p-2  text-truncate\" style=\"width: 80%;\">"+inhalt+"</div><div class=\"p-2\" style=\"width: 15%;\"><a href=\""+link+"\" class=\"box fadenbox\">    Zum Faden</a></div>";
}