const userQuery = require('../query/user-query');

module.exports = {

  createUser:async(data) => {
    try{
    let result = await userQuery.createUser(data);
    return result;
    }catch(err){
      return err
    }
  },

  getUserDetails:async() => {
    try{
      let userList = [];
      let result = await userQuery.getUserDetails();
      console.log('get user api called')
      if(result && result.length && result.length > 0){
        result.forEach(ele => {
          let obj = {
            id:ele.id,
            name:ele.name,
            location:ele.location,
            employeeId:ele.emp_id
          }
          userList.push(obj);
        })
      }
      return userList;
    }catch(err){
      return err;
    }
  }
}