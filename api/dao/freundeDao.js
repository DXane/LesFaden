const helper = require("../helper.js");

class FreundeDao{

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM Nachrichten WHERE ID=?";
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

    createMessage(titel,text,datum,empfaenger,sender){
        var sql = "INSERT INTO Nachrichten (Nachrichttitel,Nachrichttext,Datum,SenderID,EmpfaengerID) VALUES (?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [titel,text,datum,empfaenger,sender];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    getMessage(id){
        var sql = "Select * FROM Nachrichten WHERE SenderID=? OR EmpfaengerID=? ORDER BY ID DESC";
        var statement = this._conn.prepare(sql);
        var result = statement.all([id,id]);
        
        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    toString() {
        helper.log("NachrichtenDao [_conn=" + this._conn + "]");
    }
}

module.exports = FreundeDao;