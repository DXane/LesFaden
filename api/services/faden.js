const helper = require("../helper.js");
const FadenDao = require("../dao/fadenDao.js");
const BenutzerDao = require("../dao/benutzerDao.js");
const express = require("express");
const verfier = require("./verifier.js");
var serviceRouter = express.Router();

serviceRouter.get("/faden/get/:id",function(request, response) {
    helper.log("Service Faden: Client requested one record, id=" + request.params.id);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadById(request.params.id);
        helper.log("Service Faden: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/get/range/:anzahl",function(request, response) {
    helper.log("Service Faden: Client requested "+request.params.anzahl+" Records");
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByRange(request.params.anzahl,true,0);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/get/range/last/:anzahl",function(request,response){
    helper.log("Service Faden: Client requested "+request.params.anzahl+" Records");
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByRange(request.params.anzahl,false,0);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/get/range/:anzahl/:page",function(request, response) {
    if(!Number.isInteger(parseInt(request.params.page))){
        page=0;
    }
    else{
        page=request.params.page;
    }
    helper.log("Service Faden: Client requested "+request.params.anzahl+" Records at Page "+page);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByRange(request.params.anzahl,true,page);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/get/range/last/:anzahl/:page",function(request, response) {
    if(!Number.isInteger(parseInt(request.params.page))){
        page=0;
    }
    else{
        page=request.params.page;
    }
    helper.log("Service Faden: Client requested "+request.params.anzahl+" Records at Page "+page);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByRange(request.params.anzahl,false,page);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/search/name/:string",function(request,response){
    helper.log("Service Faden: Client requested all Records with name "+request.params.string);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByName(request.params.string);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/search/name/:string/:page",function(request,response){
    helper.log("Service Faden: Client requested all Records with name "+request.params.string);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadByName(request.params.string,false,request.params.page);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/sort/:by/:page",function(request,response){
    helper.log("Service Faden: Client requested all Records with sorted by "+request.params.by);

    if(request.params.by !='top' && request.params.by !='bottom' && request.params.by !='new'){
        helper.logError("Service Faden: Error loading records sorted. No such sort found!");
        response.status(400).json(helper.jsonMsgError("Service Faden: Error loading records sorted. No such sort found!"));
    }

    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.sortedby(request.params.by,request.params.page);
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/faden/all",function(request,response){
    helper.log("Service Faden: Client requested all Records");
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.loadAll();
        helper.log("Service Faden: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/faden/new",function(request,response){
    helper.log("Service Faden: Client creates new Faden");
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        
        var titel=request.body.titel;
        var text=request.body.text;
        var user=request.body.user;
        if(!helper.isUndefined(request.cookies)){
            const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);

            var name=benutzerDao.getNamebyID(request.body.user);
            if(name != ""){
                var decoded = verfier.verifyToken(request.cookies['jwt'],name);
                user = decoded.id;
            }else{
                user=0;   
            }
        }
        else if( request.body.user != 0){
            user=0;
        }
        var datum=request.body.datum;
        var result = fadenDao.createThread(titel,text,user,datum);
        helper.log("Service Faden: Record created");
        response.status(201).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error creating record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.put("/faden/vote",function(request,response){
    helper.log("Service Faden: Client requested update of " +request.body.id);
    const fadenDao = new FadenDao(request.app.locals.dbConnection);
    try {
        var result = fadenDao.vote(request.body.vote,request.body.id);
        helper.log("Service Faden: Records loaded");
        response.status(201).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;