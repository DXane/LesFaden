const helper = require("../helper.js");
const BenutzerDao = require("../dao/benutzerDao.js");
const FadenDao = require("../dao/fadenDao.js");
const KommentareDao = require("../dao/kommentareDao.js");
const NachrichtenDao = require('../dao/nachrichtenDao.js');
const FreundeDao = require('../dao/freundeDao.js');
const verfier = require("./verifier.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/benutzer/get/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested one record, id=" + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.loadById(request.params.id);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/all/", function(request, response) {
    helper.log("Service Benutzer: Client requested all records");

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.loadAll();
        helper.log("Service Benutzer: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/exists/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested check, if record exists, id=" + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.exists(request.params.id);
        helper.log("Service Benutzer: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Benutzer: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/unique/:name", function(request, response) {
    helper.log("Service Benutzer: Client requested check, if username is unique");

    var errorMsgs=[];
    if (helper.isUndefined(request.params.name)) 
        errorMsgs.push("benutzername fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Benutzer: check not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Check not possible. Missing data: " + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.isunique(request.params.name);
        helper.log("Service Benutzer: Check if unique, result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "benutzername": request.params.name, "eindeutig": result }));
    } catch (ex) {
        helper.logError("Service Benutzer: Error checking if unique. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/benutzer/zugang", function(request, response) {
    helper.log("Service Benutzer: Client requested check, if user has access");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("benutzername fehlt");
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push("passwort fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Benutzer: check not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Check not possible. Missing data: " + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.hasaccess(request.body.name, request.body.passwort);
        helper.log("Service Benutzer: Check if user has access, result=" + result);
        var token = verfier.signToken(result.id,result.benutzername);
        response.cookie("jwt",token,{'path':'/'});
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error checking if user has access. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/getContent/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested one record, id=" + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    
    try {
        var result = benutzerDao.getContentbyUser(request.params.id);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/nachricht/get/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested Nachrichten from id=" + request.params.id);

    const nachrichtenDao = new NachrichtenDao(request.app.locals.dbConnection);
    try {
        var result = nachrichtenDao.getMessage(request.params.id);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/benutzer/freunde/get/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested Freunde from id=" + request.params.id);

    const freundeDao = new FreundeDao(request.app.locals.dbConnection);

    try {
        var result = freundeDao.loadNamesById(request.params.id);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.post("/benutzer/freunde/add", function(request, response) {
    helper.log("Service Benutzer: Client requested adding Freunde");

    const freundeDao = new FreundeDao(request.app.locals.dbConnection);

    try {
        var result = freundeDao.addFriend(request.body.userid,request.body.fid);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/benutzer/nachricht/", function(request, response) {
    helper.log("Service Benutzer: Client requested adding Message, to another User.");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.sender)) 
        errorMsgs.push("sender fehlt");
    if (helper.isUndefined(request.body.receiver)) 
        errorMsgs.push("empfänger fehlt");
    if (helper.isUndefined(request.body.title)) 
        errorMsgs.push("titel fehlt");
    if (helper.isUndefined(request.body.msg)) 
        errorMsgs.push("text fehlt");
    if (helper.isUndefined(request.body.date)) 
        request.body.date = new Date().toISOString();

    if (errorMsgs.length > 0) {
        helper.log("Service Benutzer: check not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Check not possible. Missing data: " + helper.concatArray(errorMsgs)));
        return;
    }

    if(!helper.isUndefined(request.cookies['jwt'])){
        
        const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
        var name = benutzerDao.getNamebyID(request.body.sender);
        
        if(verfier.verifyToken(request.cookies['jwt'],name) == false){
            response.status(403).json(helper.jsonMsgError("Check not possible. Cookie not valid!"));
            return;
        }

    }else{
        response.status(400).json(helper.jsonMsgError("Check not possible. Cookie not found!"));
        return;
    }

    const nachrichtenDao = new NachrichtenDao(request.app.locals.dbConnection);
    try {
        var result = nachrichtenDao.createMessage(request.body.title,request.body.msg,request.body.date,request.body.receiver,request.body.sender);
        response.status(201).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error checking if user has access. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/benutzer/new", function(request, response) {
    helper.log("Service Benutzer: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("benutzername fehlt");
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push("passwort fehlt");
    if (helper.isUndefined(request.body.datum)) {
        request.body.datum = new Date().toISOString();
    }
    
    if (errorMsgs.length > 0) {
        helper.log("Service Benutzer: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    if(!benutzerDao.isunique(request.body.name)){
        helper.log("Service Benutzer: Creation not possible, User not unique");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Nutzer existiert schon: " + request.body.name));
        return;
    }
    try {
        var result = benutzerDao.create(request.body.name, request.body.passwort, request.body.datum);
        helper.log("Service Benutzer: Record inserted");
        var token = verfier.signToken(result.id,result.benutzername);
        response.cookie("jwt",token,{'path':'/'});
        response.status(201).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.put("/benutzer", function(request, response) {
    helper.log("Service Benutzer: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");

    if (helper.isUndefined(request.body.about)) 
        errorMsgs.push("about fehlt");
    
    if (helper.isUndefined(request.body.image)) 
        errorMsgs.push("image fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Benutzer: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    if(!helper.isUndefined(request.cookies['jwt'])){
    
        const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
        var name = benutzerDao.getNamebyID(request.body.id);
        
        if(verfier.verifyToken(request.cookies['jwt'],name) == false){
            response.status(401).json(helper.jsonMsgError("Check not possible. Cookie not valid!"));
            return;
        }

    }else{
        response.status(403).json(helper.jsonMsgError("Check not possible. Cookie not found!"));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.update(request.body.id, request.body.image, request.body.about);
        helper.log("Service Benutzer: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Benutzer: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/benutzer/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested deletion of record, id=" + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var obj = benutzerDao.loadById(request.params.id);
        benutzerDao.delete(request.params.id);
        helper.log("Service Benutzer: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Benutzer: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;