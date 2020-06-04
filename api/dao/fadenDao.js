const helper = require("../helper.js");
const md5 = require("md5");

class Fadendao{
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    //Get Faden from ID
    loadById(id) {

        var sql = "SELECT * FROM Threads WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        if (helper.isNull(result.ID)) {
        } else {
        }

        delete result.ID;

        return result;
    }

    //Get a number of Faden
    //when richtung false get last ones, when true get first ones
    //Page is the Offset
    loadByRange(anzahl,richtung,page){
        
        //Hole die ersten Einträge
        if(richtung){
            var sql= "SELECT * FROM Threads LIMIT ? OFFSET "+anzahl*page;
        }
        //Hole die letzten Einträge
        else{
            var sql = "SELECT * FROM Threads ORDER BY ID DESC LIMIT ? OFFSET "+anzahl*page;
        }
        var statement = this._conn.prepare(sql);
        var result = statement.all(anzahl);
        //result.push({'nextpage':page+1});
        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    //Get all Faden
    loadAll() {

        var sql = "SELECT * FROM Threads";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);
        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Benutzer WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    isunique(benutzername) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Benutzer WHERE Benutzername=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);

        if (result.cnt == 0) 
            return true;

        return false;
    }

    hasaccess(benutzername, passwort) {
        const benutzerrolleDao = new BenutzerrolleDao(this._conn);
        const personDao = new PersonDao(this._conn);

        var sql = "SELECT ID FROM Benutzer WHERE Benutzername=? AND Passwort=?";
        var statement = this._conn.prepare(sql);
        var params = [benutzername, md5(passwort)];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            throw new Error("User has no access");
     
        return this.loadById(result.ID);
    }

    createThread(titel = "", text = "", user = 1, datum = "") {
        var sql = "INSERT INTO Threads (Thread_Titel,Thread_Text,Creater_ID,Datum) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [titel, text, user, datum];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        statement = this._conn.prepare("SELECT ID FROM Threads WHERE Thread_Titel=? ORDER BY ID DESC ");
        var newObj = statement.get(titel);
        return newObj;
    }

    update(id, benutzername = "", neuespasswort = null, benutzerrolleid = 1, personid = null) {
        
        if (helper.isNull(neuespasswort)) {
            var sql = "UPDATE Benutzer SET Benutzername=?,BenutzerrolleID=?,PersonID=? WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var params = [benutzername, benutzerrolleid, personid, id];
        } else {
            var sql = "UPDATE Benutzer SET Benutzername=?,Passwort=?,BenutzerrolleID=?,PersonID=? WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var params = [benutzername, md5(neuespasswort), benutzerrolleid, personid, id];
        }
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Benutzer WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("BenutzerDao [_conn=" + this._conn + "]");
    }
}

module.exports = Fadendao;