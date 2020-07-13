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
        sql = "SELECT Benutzername FROM Benutzer WHERE ID=?";
        statement = this._conn.prepare(sql);
        var name = statement.get(result.creator_id);
        result['benutzername']=name.Benutzername;
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
    loadByRange(anzahl=10,richtung=false,page=0){
        
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
        if (helper.isArrayEmpty(result)) 
            return [];

        statement = this._conn.prepare("SELECT COUNT(ID) AS count FROM Threads");
        var maxid = statement.get();
        //Prüft ob aktuelle Seite alle vorhandenen Einträge anzeigt
        if(maxid.count > 10*(parseInt(page)+1)){
            result.push({'next':parseInt(page)+1,'previous':page});
        }
        else{
            result.push({'next':null,'previous':page});
        }

        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    //Füge einen Punkt zum Faden hinzu
    vote(punkte,id){
        var sql = "SELECT Punkte FROM Threads WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if(helper.isUndefined(result.Punkte)){
            throw new Error("Could not update ThreadPunkte. Data: " + id); 
        }

        sql = "UPDATE Threads SET Punkte=? WHERE ID=?";
        statement  = this._conn.prepare(sql);
        result = statement.run([(punkte)?result.Punkte+1:result.Punkte-1,id]);

        if(result.changes != 1){
            throw new Error("Could not update ThreadPunkte. Data: " + id);
        }

        sql = "SELECT Punkte FROM Threads WHERE ID=?";
        statement = this._conn.prepare(sql);
        result = statement.get(id);

        return result;

    }

    //Sotiert by kategorie
    sortedby(sort,page=0){
        if(!Number.isInteger(parseInt(page))){
            page=0;
        }
        //Sotiere nach Punkte Top/Bottom
        if(sort=="bottom"){//Bottom
            var sql= "SELECT * FROM Threads ORDER BY Punkte LIMIT 10 OFFSET "+10*page;
        }
        //Top
        else if(sort=="top"){
            var sql = "SELECT * FROM Threads ORDER BY Punkte DESC LIMIT 10 OFFSET "+10*page;
        }//New standart
        else if(sort=="new"){
            return this.loadByRange(10,false,page);
        }
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        //result.push({'nextpage':page+1});
        if (helper.isArrayEmpty(result)) 
            return [];

        statement = this._conn.prepare("SELECT COUNT(ID) AS count FROM Threads");
        var maxid = statement.get();
        //Prüft ob aktuelle Seite alle vorhandenen Einträge anzeigt
        if(maxid.count > (10*(parseInt(page)+1))){
            result.push({'next':parseInt(page)+1,'previous':page});
        }
        else{
            result.push({'next':null,'previous':page});
        }
        result = helper.arrayObjectKeysToLower(result);

        return result;

    }
    //Get Message from Message
    loadByName(string="",richtung=false,page=0){
        
        //Hole die ersten Einträge
        if(richtung){
            var sql= "SELECT * FROM Threads WHERE Thread_Titel LIKE ? LIMIT 10 OFFSET "+10*page;
        }
        //Hole die letzten Einträge
        else{
            var sql = "SELECT * FROM Threads WHERE Thread_Titel LIKE ? ORDER BY ID DESC LIMIT 10 OFFSET "+10*page;
        }
        var statement = this._conn.prepare(sql);
        var result = statement.all("%"+string+"%");
        //result.push({'nextpage':page+1});
        if (helper.isArrayEmpty(result)) 
            return [];

        statement = this._conn.prepare("SELECT COUNT(ID) AS count FROM Threads WHERE Thread_Titel LIKE ?");
        var maxid = statement.get("%"+string+"%");
        //Prüft ob aktuelle Seite alle vorhandenen Einträge anzeigt
        if(maxid.count > (10*(parseInt(page)+1))){
            result.push({'next':parseInt(page)+1,'previous':page});
        }
        else{
            result.push({'next':null,'previous':page});
        }
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

    //Create new Thread
    createThread(titel = "", text = "", user = 0, datum = new Date().toISOString()) {
        var sql = "INSERT INTO Threads (Thread_Titel,Thread_Text,Creator_ID,Datum) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [titel, text, user, datum];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        statement = this._conn.prepare("SELECT ID FROM Threads WHERE Thread_Titel=? ORDER BY ID DESC ");
        var newObj = statement.get(titel);
        return newObj;
    }
    
    //Delete a Thread by ID
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