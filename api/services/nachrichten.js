const helper = require("../helper.js");
const NachrichtenDao = require('../dao/nachrichtenDao.js');
const BenutzerDao =require("../dao/benutzerDao.js");
const verfier = require("./verifier.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/nachricht/get/:id", function(request, response) {
    helper.log("Service Benutzer: Client requested one record, id=" + request.params.id);

    try {
        if(!helper.isUndefined(request.cookies['jwt'])){
            const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    
            var name=benutzerDao.getNamebyID(verfier.getpayload(request.cookies['jwt'],'id'));
            if(name != ""){
                var decoded = verfier.verifyToken(request.cookies['jwt'],name);
                if(decoded==false)
                    throw new Error("Cookie not verifierable!");
                var user = decoded.id;
            }else{
                 throw new Error("Cookie not verifierable!");
            }
        }
        else{
            throw new Error("Cookie not send!");
        }
        const nachrichtenDao = new NachrichtenDao(request.app.locals.dbConnection);
        var result = nachrichtenDao.loadById(request.params.id,user);
        helper.log("Service Benutzer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));

    } catch (ex) {
        helper.logError("Service Benutzer: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;