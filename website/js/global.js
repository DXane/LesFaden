
function insertfaden(anzahl){
    var titel ="<div class=\"p-2 text-truncate\">Test</div>";
    var datum ="<div class=\"p-2\" >01.01.1970</div>";
    var kommentare="<div class=\"p-2\" style=\"width: 10%;\">Fäden 1111</div>";
    var titelbox="<div class=\"d-flex box fadentitel\">"+titel+datum+kommentare+"</div>";

    var inhalt="<div class=\"p-2  text-truncate\" style=\"width: 80%;\">Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Ich bin von je der Ordnung Freund gewesen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächt'ger Schnelle Vom Himmel durch die Welt zur Hölle. Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens Quelle hin. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt mit bedächtger Schnelle Vom Himmel durch die Welt zur Hölle! Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.</div>";
    var link="<div class=\"p-2\" style=\"width: 15%;\"><a href=\"home.html\" class=\"box fadenbox\">    Zum Faden</a></div>";
    var inhaltbox="<div class=\"d-flex flex-row justify-content-between fadeninhalt\">"+inhalt+link+"</div>";

    var list=document.getElementsByTagName("fadencontainer");
    var container=list[0];
    for(i=0; i<arguments[0];i++){
        container.innerHTML+="<div class=\"container-fluid faden box\">"+titelbox+inhaltbox+"</div>";
    }
}

