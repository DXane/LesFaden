
var PORT = "8000";

//Füge Fädeneinträge in den Container ein
function insertfaden(anzahlfaden){
    
    if (anzahlfaden === undefined) {
        anzahlfaden = 8;
    }

    var list=document.getElementsByTagName("fadencontainer");
    var container=list[0];
    var faeden=generateFaden(anzahlfaden);
    for(i=0; i<faeden.length;i++){
        container.innerHTML+=faeden[i];
    }    
}

function insertBeitrag(anzahlfaden){
    if (anzahlfaden === undefined) {
        anzahlfaden = 3;
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

//Erstelle die Titelbox mit dem übergebenen Titel, Datum und anzahl der Kommentare eingetragen
function generateTitel(titel="none",datum="",kommentare=""){
    return "<div class=\"d-flex fadentitel\"><div class=\"p-2 text-truncate\">"+titel+"</div><div class=\"p-2 text-truncate\" >"+datum+"</div><div class=\"p-2\" style=\"width: 10%;\">"+kommentare+"</div></div>";
}

//Erstelle die Inhaltbox mit den übergebenen Inhalt und Link zum Faden
function generateContent(inhalt="",link=""){
    return "<div class=\"p-2  text-truncate\" style=\"width: 80%;\">"+inhalt+"</div><div class=\"p-2\" style=\"width: 15%;\"><a href=\""+link+"\"><button class=\"btn btn-primary\">Zum Faden</button></a></div>";
}

$(document).ready(function(){
    $('#search').submit(function( event ){
        event.preventDefault();
        if(!checkText($('#search_text').val())){
            alert("Kein Suchbegriff");
        }
        else{
            window.location.replace("./index.html?s="+$("#search_text").val());
        }
    });
});

//Parse all url Parameter for api request and return it
$.getRequestUri = function(){
    var param;
    if((param=$.urlParam('s'))== false){
      return "get/range/last/10/"+$.urlParam('p');
    }
    else{
        return "search/name/"+param;
    }
};
//Get URL Parameter from name (ex. ?test=1; urlParam("test") returns 1)
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return false;
    }
    return decodeURI(results[1]) || 0;
};
//Check if Text ist empty
function checkText(text){
    if($.trim(text).length === 0){
        return false;
    }
    return true;
}

//Hole ein Item aus dem Token
function getJWTItem(tokenname,itemname){
    var payload = getpayloadJWT(getCookie(tokenname));
    return JSON.parse(atob(payload))[itemname];
}

//Trenne den Payload vom Header und Signatur
function getpayloadJWT(token){
    var payload = token.split('.')[1];
    return payload;
}

function cookieset(){
    return (getCookie('jwt').length >0) ? true : false;
}

function getCookie(cname) {
    var name = cname+"=";
    var decodedCookie = document.cookie;
    var ca = decodedCookie.split(';');
    for (var i=0;i<ca.length;i++){
        var c = ca[i]
        while(c.charAt(0)==' '){
            c = c.substring(1);
        }
        if (c.indexOf(name)==0){
            return c.substring(name.length,c.length);
        }

    }
    return '';
}

$(document).ready(function(){
    //Set Name to Username
    if(cookieset()){
        $('nav > div > span').html(getJWTItem('jwt','name'));
        $('nav > div > a > button').html("Logout");
        $('nav > div > a > button').attr('id','logout');
        $('nav > div > a').removeAttr('href');
    }
    $('#logout').click(function(){
        document.cookie = 'jwt=; Max-Age=0';
        document.location.reload();
    });
});