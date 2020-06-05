const helper = require("../helper.js");
const md5 = require("md5");

class Kommentaredao{
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM Kommentare WHERE ID=?";
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

    loadByThreadId(id) {

        var sql = "SELECT * FROM Kommentare WHERE THREAD_ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        //result.push({'nextpage':page+1});
        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    loadByRange(anzahl,richtung,page){
        
        //Hole die ersten Einträge
        if(richtung){
            var sql= "SELECT * FROM Kommentare LIMIT ? OFFSET "+anzahl*page;
        }
        //Hole die letzten Einträge
        else{
            var sql = "SELECT * FROM Kommentare ORDER BY ID DESC LIMIT ? OFFSET "+anzahl*page;
        }
        var statement = this._conn.prepare(sql);
        var result = statement.all(anzahl);
        //result.push({'nextpage':page+1});
        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    loadAll() {

        var sql = "SELECT * FROM Kommentare";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);
        return result;
    }

    createKomment(text = "",user = "", thread_id = 1, datum = "") {
        var sql = "Select ID FROM Kommentare WHERE THREAD_ID=? ORDER BY ID DESC";
        var statement = this._conn.prepare(sql);
        var result = statement.get(thread_id);
        sql = "INSERT INTO Kommentare (Kommentartext,Datum,Benutzer_ID,Parent_ID,THREAD_ID) VALUES (?,?,?,?,?)";
        statement = this._conn.prepare(sql);
        var params = [text, datum, user,result.ID,thread_id];
        result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Kommentare WHERE ID=?";
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
        helper.log("KommentareDao [_conn=" + this._conn + "]");
    }
}

module.exports = Kommentaredao;