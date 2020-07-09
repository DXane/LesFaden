const helper = require("../helper.js");

class NachrichtenDao{

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    //Load the Message by ID of the Message
    loadById(id,userid) {

        var sql = "SELECT * FROM Nachrichten WHERE ID=? AND (SenderID=? OR EmpfaengerID=?)";
        var statement = this._conn.prepare(sql);
        var result = statement.get([id,userid,userid]);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        sql = "SELECT Benutzername FROM BENUTZER WHERE ID=?";
        statement = this._conn.prepare(sql);
        var name = statement.get(result.senderid);
        result['sendername']=name.Benutzername;
        if (helper.isNull(result.ID)) {
        } else {
        }
        result = helper.objectKeysToLower(result);
        delete result.ID;

        return result;
    }

    //Create new Message
    createMessage(titel="",text="",datum=new Date().toISOString(),empfaenger=0,sender=0){
        var sql = "INSERT INTO Nachrichten (Nachrichttitel,Nachrichttext,Datum,SenderID,EmpfaengerID) VALUES (?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [titel,text,datum,empfaenger,sender];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    //Get Message from User ID
    getMessage(id,page=0){
        var sql = "Select ID,Nachrichttitel FROM Nachrichten WHERE SenderID=? OR EmpfaengerID=? ORDER BY ID DESC";
        var statement = this._conn.prepare(sql);
        var result = statement.all([id,id]);
        
        if (helper.isArrayEmpty(result)) 
            return [];
       
        sql ="Select COUNT(ID) as count FROM Nachrichten WHERE SenderID=? OR EmpfaengerID=?";
        statement = this._conn.prepare(sql);
        var maxid = statement.all([id,id]);
        if(maxid.count > (10*(page+1))){
            result.push({'next':page+1,'previous':page});
        }
        else{
            result.push({'next':null,'previous':page});
        }
        result = helper.arrayObjectKeysToLower(result);
        return result;
    }

    toString() {
        helper.log("NachrichtenDao [_conn=" + this._conn + "]");
    }
}

module.exports = NachrichtenDao;