'use strict';

console.log('JSON WebToken DEMO');
console.log('------------------\n');
console.log('see info.txt for steps in Project and explanations');

console.log('linking libraries\n\n');
const fs   = require('fs');
const jwt  = require('jsonwebtoken');


console.log('ready to roll');
console.log('setting keys');
var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

console.log('private key loaded, ' + privateKEY.length + ' bytes');
console.log('public key loaded, ' + publicKEY.length + ' bytes\n\n');

console.log('signing options');
var issuer = 'Demofirma';
var subject = 'chef@demofirma.de';
var audience = 'www.demofirma.de';
var validFor = '12h';
var algorithm = 'RS256';
var signOptions = {
    'issuer': issuer,
    'subject': subject,
    'audience': audience,
    'expiresIn': validFor,        // verfallsdatum des Token
    'algorithm': algorithm        // verwendeter algorithmus zum ver/entschlüsseln
};
console.log(signOptions);
console.log('\n\n');

console.log('setting payload');
var payload = {
    'id': 2,
    'loggedIn': true,
    'userName': 'master@demofirma.de'
};
console.log(payload);
console.log('\n\n');

console.log('generating token');
var token = jwt.sign(payload, privateKEY, signOptions);
console.log(token);
console.log('\n\n');

console.log('### NOW THE TOKEN SHOULD BE SENT TO CLIENT AND REMEMBERED THERE ###');
console.log('### WHEN USER WANTS TO ACCESS SECURED RESOURCE SERVERSIDE HE HAS TO SEND THIS TOKEN ###\n\n');

console.log('verifying options');
var verifyOptions = {
    'issuer': issuer,
    'subject': subject,
    'audience': audience,
    'expiresIn': validFor,
    'algorithms': [algorithm]
};
console.log(verifyOptions);
console.log('\n\n');

console.log('verifying/decoding token');
try {
    console.log('decoding token');
    var decodedToken = jwt.verify(token, privateKEY, verifyOptions);
    console.log('token decoded');

    console.log('checking if token still valid')
    if (decodedToken.iat >= decodedToken.exp) {
        console.log('TOKEN IS EXPIRED');
    } else {
        console.log('token is valid');
        console.log(decodedToken);
    }   
} catch (e) {
    console.log('TOKEN NOT VALID');
}

console.log('\n\nEnd of Demo');