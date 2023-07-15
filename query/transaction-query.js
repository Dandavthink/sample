const dbName = 'vdrive';
const { query } = require('express');
const db = require('../config/db.config');

module.exports = {
    createTrasaction:async(data) => {
        try{
            let bind = [data.slot_id,data.user_id];
            let query = ' insert into user_slot_mapping (slot_id,emp_id) ';
            query += ' values(?,?) '
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
            let bookedQuery = ` select booked_seats from  slot where id = ${data.slot_id} `;
            let bookedCount = await db.executeQuery(bookedQuery,[],{},'getBookingCount',dbName);
            let bookedSeat = bookedCount[0];
            console.log(bookedSeat);
            let query = ` update slot set booked_seats = ${bookedSeat.booked_seats + 1} where id = ${data.slot_id} `;
            let result = await db.executeQuery(query,[],{},"bookedSeat",dbName);
            if(result && result.affectedRows && result.affectedRows > 0){
                return {message:"Seat booked", status:200}
            }
        }catch(err){
            return err
        }
    },

    getUserSlotMappingDetails:async(id) => {
        try{
            let query = ' select * from user_slot_mapping usm ';
            query += ' inner join  user u on u.emp_id = usm.emp_id ';
            query += ' inner join slot s on s.id = usm.slot_id  ';
            query += ` where slot_id = ${id} `;

            let queryName = 'getUserSlotMappingDetails';

            let result = await db.executeQuery(query,[],{},queryName,dbName);
            if(result && result.length && result.length > 0){
                return result;
            }
        }catch(err){
            return err
        }
    }
}