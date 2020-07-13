/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////

const helper = require("./helper.js");
helper.log("Starting client...");
var express = require('express');
var cookieparser = require('cookie-parser');
var path=require('path');
var router = require('./router');

try {
    // create server
    helper.log("Creating Client Server...");
    const HTTP_PORT = 3500;
    
    var app = express();
    helper.log("Set Path");
    app.use(cookieparser());
    //Redirect to login if not logged in
    app.use("/priv_profile*",function(req,res,next){
        helper.log("Profil angesprochen");
        if(!helper.isUndefined(req.cookies['jwt'])){
            next()
        }
        else{
            res.redirect('../website/login.html');
        }
    });
    app.use("/priv_profile*",function(req,res,next){
        helper.log("Profil angesprochen");
        if(!helper.isUndefined(req.cookies['jwt'])){
            next()
        }
        else{
            res.redirect('../website/login.html');
        }
    });
    app.use(express.static(path.join(__dirname,'../website'),{index:false,extensions:['html']}));
    app.use("/",router);
    helper.log("Router starting");
    
 
    app.listen(HTTP_PORT);
    helper.log("Router started. Running at 3500");

} catch (ex) {
    helper.logError(ex);
}