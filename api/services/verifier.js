const jwt = require("jsonwebtoken");

const issuer = "LesFadenDev";
const audience= "lesfaden.de";
const validtime = '12h';
const algorithms= 'HS256';
const secrect= "Test";


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
    return jwt.verify(Token,secrect,options);
}