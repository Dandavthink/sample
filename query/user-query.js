const db = require('../config/db.config');
const dbName = 'vdrive';
module.exports = {
    createUser:async(data) => {
        try{
            data.userRole = data.userRole.toLowerCase() == 'driver' ? true : false;
            let bind = [data.name,data.employeeId,data.location,data.userRole];
            let query = ' insert into user(name,emp_id,location,is_driver) ';
            query += ' values(?,?,?,?) ';
            let queryName = "createUser";
            let result = await db.executeQuery(query,bind,{},queryName,dbName);
            if(result && result.affectedRows && result.affectedRows > 0){
                return { message:"Create user successfully", status:200}
            }
        }catch(err){
            return err
        }
    },

    getUserDetails:async() => {
        try{
            let query = ' select * from user ';
            let queryName = "getUserDetails";
            let result = await db.executeQuery(query,[],{},queryName,dbName);
            if(result && result.length && result.length > 0){
                return result;
            }
        }catch(err){
            return err
        }
    }
}