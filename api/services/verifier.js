const jwt = require("jsonwebtoken");
const issuer = "LesFadenDev";
const audience= "lesfaden.de";
const validtime = '2h';
const algorithms= 'HS256';
const secrect= "NGUzOWNlMjA3MTA4YTM2Zjk0OGM3NjYzNzgyMjE2NDhhNGE1OGMzMjQzMTQxNGFiMjNmYmEzNjZiNjNjMDIzZDJlZGU2NGY3M2EyMmFhY2EzMmE5OTk2YThmY2QwMmIxYmFlNjg2NWRlY2NkNzVlNmEzNTJjMjFlNGMxYzYzMzEgIC0K";


//Sign JWT Token
module.exports.signToken = function(id,name){
    var payload={
        'id':id,
        'name':name,
        'loggedin':true
    };
    var options ={
        'issuer': issuer,
        'subject': name+"@"+issuer,
        'audience': audience,
        'expiresIn': validtime,
        'algorithm': algorithms
    };

    return jwt.sign(payload,secrect,options);
}

module.exports.verifyToken = function(Token,name){
    var options ={
        'issuer': issuer,
        'subject': name+"@"+issuer,
        'audience': audience,
        'expiresIn': validtime,
        'algorithms': [algorithms]
    };
    try{
        return jwt.verify(Token,secrect,options);
    }
    catch(ex){
        console.log(ex.message);
        return false;
    }
}