const dbName = 'vdrive';
const db = require('../config/db.config');

module.exports = {
    createTrasaction:async(data) => {
        try{
            let query = ' insert into user_slot_maping (slot_id,user_id) ';
            query = ' values(?,?) '
            let queryName = "createTrasaction";
            let result = await db.executeQuery(query,bind,{},queryName,dbName);
            if(result && result.affectedRows && result.affectedRows > 0){
                return { message:"Created successfully", status:200 }
            }
        }catch(err){
            return err;
        }
    },

    bookingSeat:async(data) => {
        try{
            let query = update slot set booked_seats = 
        }catch(err){
            return err
        }
    }
}