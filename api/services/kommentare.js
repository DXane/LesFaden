const helper = require("../helper.js");
const KommentareDao = require("../dao/kommentareDao.js");
const BenutzerDao = require("../dao/benutzerDao.js");
const express = require("express");
const verfier = require('./verifier.js');
var serviceRouter = express.Router();


serviceRouter.get("/kommentare/get/:id",function(request, response) {
    helper.log("Service kommentare: Client requested one record, id=" + request.params.id);
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadById(request.params.id);
        helper.log("Service kommentare: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kommentare/get/range/:anzahl",function(request, response) {
    helper.log("Service kommentare: Client requested "+request.params.anzahl+" Records");
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadByRange(request.params.anzahl,true,0);
        helper.log("Service kommentare: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kommentare/get/range/:anzahl/:page",function(request, response) {
    if(!Number.isInteger(parseInt(request.params.page))){
        page=0;
    }
    else{
        page=request.params.page;
    }
    helper.log("Service kommentare: Client requested "+request.params.anzahl+" Records at Page "+page);
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadByRange(request.params.anzahl,true,page);
        helper.log("Service kommentare: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kommentare/get/range/last/:anzahl",function(request,response){
    helper.log("Service kommentare: Client requested "+request.params.anzahl+" Records");
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadByRange(request.params.anzahl,false,0);
        helper.log("Service kommentare: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kommentare/get/byThread/:id",function(request, response) {
    helper.log("Service kommentare: Client requested one record, id=" + request.params.id);
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadByThreadId(request.params.id);
        helper.log("Service kommentare: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kommentare/all",function(request,response){
    helper.log("Service kommentare: Client requested all Records");
    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var result = kommentareDao.loadAll();
        helper.log("Service kommentare: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/kommentare/new/:id",function(request,response){
    helper.log("Service kommentare: Client creates new komment in thread"+request.params.id);

    const kommentareDao = new KommentareDao(request.app.locals.dbConnection);
    try {
        var text=request.body.text;
        var user=request.body.user;
        var thread_id=request.body.thread_id;
        var datum=request.body.datum;

        if(!helper.isUndefined(request.cookies['jwt'])){
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

        var result = kommentareDao.createKomment(text,user,thread_id,datum);

        helper.log("Service kommentare: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service kommentare: Error loading records with range. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;