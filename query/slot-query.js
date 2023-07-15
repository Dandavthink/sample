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
    },

    createSlot:async(data) => {
        let queryName = "createSlot";
        let bind = [data.starting_point,data.ending_point,data.starting_time,data.ending_time,data.is_trip_started,data.is_trip_completed,data.total_seats,data.booked_seats];
        let query = " insert into slot(starting_point,ending_point,starting_time,ending_time,is_trip_started,is_trip_completed,total_seats,booked_seats) ";
        query += ' values(?,?,?,?,?,?,?,?) '
        let result = await db.executeQuery(query,bind,{},queryName,dbname);
        if(result.affectedRows) {
            return {status:200,message:"Successfully Created"}
        }
    },

    updateDriveStatus:async(data) => {
        try{
            if(data && data.isStarted && !data.isCompleted){
                let query = ` update slot set  is_trip_started = true where id = ${data.id} `;
                let queryName = "updateDriveStatus";
                let result = await db.executeQuery(query,[],{},queryName,dbname);
                if(result && result.affectedRows > 0){
                    return {status:200,message:"Update successfully"}
                }
            } else if(data && data.isCompleted){
                let query = ` update slot set  is_trip_completed = true where id = ${data.id} `;
                let queryName = "updateDriveStatus";
                let result = await db.executeQuery(query,[],{},queryName,dbname);
                if(result && result.affectedRows > 0){
                    return {status:200,message:"Update successfully"}
                }
            }
        }catch(err){
            return err
        }
    }
}