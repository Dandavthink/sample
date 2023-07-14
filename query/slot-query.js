const db = require('../config/db.config');
const dbname = "vdrive";

module.exports = {
    getSlotList:async() => {
        let query = "select * from slot";
        let queryName = "getSlotList";
        let result = await db.executeQuery(query,[],{},queryName,dbname);
        if(result && result.length){
            return result;
        }
    }
}