var sav;
function vote(richtung){
    if(richtung==='up' || richtung==1){
        var count=document.getElementsByTagName('count');
        var number = parseInt(count[0].innerHTML);
        if(sav==1){
            number=number+2;
            sav=0;
        }
        else if(sav === undefined){
            number+=1;
            sav=0;
        }
        count[0].innerHTML=number;
    }
    else if(richtung==='down' || richtung==0){
        var count=document.getElementsByTagName('count');
        var number = parseInt(count[0].innerHTML);
        if(sav === undefined){
            number=number-1;
            sav=1;
        }
        else if(sav==0){
            number=number-2;
            sav=1;
        }
        count[0].innerHTML=number;
    }
}

function sendkomment(){
    var text=document.getElementsByTagName('textarea');
    komment=text[0].value;
    insertKomment(komment)
    return komment;
}

function insertKomment(komment){
    var kommentbox= document.getElementsByTagName('kommentare');
    kommentbox[0].innerHTML+=generateKomment(komment);
}

function generateKomment(Komment){
    var string="<kommentar><ktitel>anonymous 01.01.1970</ktitel><br><inhalt>"+Komment+"</inhalt></kommentar>";
    return string;
}   