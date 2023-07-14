const slotQuery = require('../query/slot-query');

module.exports = {
    getSlotList:async() => {
        try{
            let result = await slotQuery.getSlotList();
            return {
                data:"ok"
            }

        }catch(err){
            return err;
        }
    }
}