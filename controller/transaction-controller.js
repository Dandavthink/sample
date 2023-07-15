const transactionQuery = require('../query/transaction-query');

module.exports = {
    bookSeat: async (data) => {
        try {
            let bookResult = await transactionQuery.bookingSeat(data);
            if (bookResult.status && bookResult.status == 200) {
                let result = await transactionQuery.createTrasaction(data);
                if (result && result.status && result.status == 200) {
                    return { message: "Update successfully", status: 200 }
                }
            }
            return { message: "Something Went Wrong", status: false }
        } catch (err) {
            return err
        }
    },

    getUserDetails:async(id) => {
        try{
            let userDetails = [];
            let result = await transactionQuery.getUserSlotMappingDetails(id);
            if(result && result.length && result.length > 0){
                result.forEach(ele => {
                    let obj = {
                        name:ele.name,
                        empId:ele.emp_id,
                        location:ele.location
                    }
                    userDetails.push(obj);
                });
            }
            return userDetails;
        }catch(err){
            return err;
        }
    }
}