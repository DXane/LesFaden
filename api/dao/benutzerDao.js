const helper = require("../helper.js");
const md5 = require("md5");
const crypto = require("crypto");

class BenutzerDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT ID,Benutzername,Link_Profilbild,About,Datum FROM Benutzer WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        if (helper.isNull(result.personid)) {
            result.person = null;
        } else {
        }
        delete result.personid;

        return result;
    }

    //Get Faden und Kommentare by User ID sorted by date
    //0: Array of Faden
    //1: Array of Kommentare
    getContentbyUser(id){
        
        var sql = "SELECT * FROM Threads WHERE Creator_ID=? ORDER BY ID DESC";
        
        var statement = this._conn.prepare(sql);
        var result = {};
        result['faden']=statement.all(id);
        sql= "SELECT * FROM Kommentare WHERE Benutzer_ID=? ORDER BY ID DESC";
        statement = this._conn.prepare(sql);
        result['komment']=statement.all(id);
        //result.push({'nextpage':page+1});
        if (Object.keys(result).length==0) 
            return [];
        
        result['faden'] = helper.arrayObjectKeysToLower(result['faden']);
        result['komment'] = helper.arrayObjectKeysToLower(result['komment']);
        
        return result;
    }

    loadAll() {

        var sql = "SELECT * FROM Benutzer";
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

    getNamebyID(id){
        var sql = "SELECT Benutzername AS name FROM Benutzer WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result.name))
            return "";

        return result.name;
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
        var sql = "SELECT Datum AS dat FROM Benutzer WHERE Benutzername=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);
        var hmac = crypto.createHmac('sha512',result.dat);
        sql = "SELECT ID FROM Benutzer WHERE Benutzername=? AND Password=?";
        statement = this._conn.prepare(sql);
        hmac.update(passwort);
        var test=hmac.digest('base64')
        helper.log(test+" - "+typeof result.dat+" - "+passwort);
        var params = [benutzername, test];
        result = statement.get(params);

        if (helper.isUndefined(result)) 
            throw new Error("User has no access");
     
        return this.loadById(result.ID);
    }

    create(benutzername = "", passwort = "", datum = new Date().toISOString()) {
        var hmac = crypto.createHmac('sha512',datum);
        var sql = "INSERT INTO Benutzer (Benutzername,Password,Datum) VALUES (?,?,?)";
        var statement = this._conn.prepare(sql);
        hmac.update(passwort);
        var params = [benutzername,  hmac.digest('base64'), datum];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
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

module.exports = BenutzerDao;