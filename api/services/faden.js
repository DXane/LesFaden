const helper = require("../helper.js");
const FadenDao = require("../dao/fadenDao.js");
const express = require("express");
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
        var datum=request.body.datum;
        var result = fadenDao.createThread(titel,text,user,datum);
        helper.log("Service Faden: Record created");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Faden: Error creating record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;