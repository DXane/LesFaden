var sav;
function vote(id){
    var richtung = id.innerText === "Hoch" ? 'up' : 'down';
    var count=document.getElementsByTagName('count');
    var change;
    if(richtung==='up'){
        var number = parseInt(count[0].innerHTML);
        id.style.background="green"
        id == document.getElementById('runter') ? 0 : document.getElementById('runter').style.background='none';
        if(sav==1){
            change=2;
            sav=0;

        }
        else if(sav === undefined){
            change=1;
            sav=0;
        }
        else{
            sav=undefined;
            change=-1;
            id.style.background="none";
        }
    }
    else if(richtung==='down'){
        var number = parseInt(count[0].innerHTML);
        id.style.background="red";
        id == document.getElementById('hoch') ? 0 : document.getElementById('hoch').style.background='none';
        if(sav === undefined){
            change=-1;
            sav=1;
        }
        else if(sav==0){
            change=-2;
            sav=1;
        }
        else{
            change=1;
            sav=undefined;
            id.style.background="none";
        }
    }
    number+=change;
    count[0].innerHTML=number;
}

function sendkomment(){
    var text=document.getElementsByTagName('textarea');
    komment=text[0].value;
    console.log(komment.length);
    if(komment.length!=0){
        insertKomment(komment);
    }
    else{
        alert("Bitte schreibe einen Kommentar.")
    }
    consol.log(komment);
}

function insertKomment(komment){
    var kommentbox= document.getElementsByTagName('kommentare');
    kommentbox[0].innerHTML+=generateKomment(komment);
}

function generateKomment(Komment){
    var string="<kommentar><ktitel>anonymous "+new Intl.DateTimeFormat('de', { month: 'short', day: '2-digit' }).format(new Date())+"</ktitel><br><inhalt>"+Komment+"</inhalt></kommentar>";
    return string;
}