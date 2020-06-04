/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////

const helper = require("./helper.js");
helper.log("Starting client...");
var express = require('express');
var path=require('path');
var router = require('./router');

try {
    // create server
    helper.log("Creating Client Server...");
    const HTTP_PORT = 3500;
    
    var app = express();
    helper.log("Set Path");
    app.use(express.static(path.join(__dirname,'../website')));

    helper.log("Router starting");
    app.use('/',router);

    app.listen(HTTP_PORT);
    helper.log("Router started");

} catch (ex) {
    helper.logError(ex);
}