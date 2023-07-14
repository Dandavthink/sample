const transactionQuery = require('../query/transaction-query');

module.exports = {
    bookSeat:async() => {
        try{
            let bookResult = await transactionQuery.bookingSeat(data);
            let result = await transactionQuery.createTrasaction(data);
        }catch(err){
            return err
        }
    }
}