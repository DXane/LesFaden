const helper = require("../helper.js");

class FreundeDao{

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT Benutzer_ID AS bid FROM Freunde WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            return null;

        result = helper.objectKeysToLower(result);

        if (helper.isNull(result.bid)) {
            return [];
        } else {
        }

        result.bid = JSON.parse(result.bid);

        return result;
    }

    loadNamesById(id) {

        var sql = "SELECT Benutzer_ID AS bid FROM Freunde WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            return null;

        result = helper.objectKeysToLower(result);

        if (helper.isNull(result.bid)) {
            return [];
        }

        result.bid = JSON.parse(result.bid);
        var freunde = [];
        sql = "SELECT ID,Benutzername FROM Benutzer WHERE ID=?";
        statement = this._conn.prepare(sql);
        for(var i =0;i < result.bid.length; i++){
            
            var name = statement.get(result.bid[i]);
            if(!helper.isUndefined(name))
                freunde.push(name);
        }

        return freunde;
    }

    addFriend(id,fid){
        var result= this.loadById(id);
        if(helper.isNull(result)){
            var sql = "INSERT INTO Freunde (Benutzer_ID,ID) VALUES (?,?)";
            var statement = this._conn.prepare(sql);
            var fidold = [];
        }
        else{
            var sql = "UPDATE Freunde SET Benutzer_ID=? WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var fidold = result.bid;
        }
        
        fidold.push(fid);
        fidold = JSON.stringify(fidold);
        result = statement.run([fidold,id]);
        
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