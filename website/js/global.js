var PORT = "8000";
function pad(n){return n<10 ? '0'+n : n}

//Erstelle die Titelbox mit dem übergebenen Titel, Datum und anzahl der Kommentare eingetragen
function generateTitel(titel="none",datum="",kommentare=""){
    return "<div class=\"d-flex fadentitel\"><div class=\"p-2 col-9 text-truncate\">"+titel+"</div><div class=\"p-2 text-nowrap\">"+dateparse(datum)+"</div></div>";
}

//Erstelle die Inhaltbox mit den übergebenen Inhalt und Link zum Faden
function generateContent(inhalt="",link=""){
    return "<div class=\"p-2  text-truncate\" style=\"width: 80%;\">"+inhalt+"</div><div class=\"p-2\" style=\"width: 15%;\"><a href=\"./"+link+"\"><button class=\"btn btn-primary\">Zum Faden</button></a></div>";
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
        if((param=$.urlParam('sort'))==false){
            return "get/range/last/10/"+$.urlParam('p');
        }
        else{
            return "sort/"+param+"/"+$.urlParam('p');
        }
    }
    else{
        var retstring = "search/name/"+param;
        if($.urlParam('p')!=false){
            retstring+="/"+$.urlParam('p');
        }
        return retstring;
    }
};

//Parse all url Parameter for button link and return it
$.buttonURI = function(){
    var param;
    var page=parseInt($.urlParam('p'));
    if(Number.isNaN(page)){
        page=0;
    }
    if((param=$.urlParam('s'))== false){
        if((param=$.urlParam('sort'))==false){
            return "p="+(page+1);
        }
        else{
            return "sort="+param+"&p="+(1+page);
        }
    }
    else{
        return "s="+param+"&p="+(1+page);
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
    if(JSON.parse(atob(payload))[itemname]!== undefined){
        return JSON.parse(atob(payload))[itemname];
    }
    else{
        return false;
    }
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

function dateparse(date){
    var datum = new Date(date);
    return datum.getFullYear()+"/"+(datum.getMonth()+1)+"/"+(1+datum.getDay())+" "+pad(datum.getHours())+":"+pad(datum.getMinutes());
}

$.ehtml = function escapeHtml(unsafe) {
    if(unsafe != null) {
        return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
    }else{
        return null;
    }
    
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

