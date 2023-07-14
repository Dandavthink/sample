const slotQuery = require('../query/slot-query');

module.exports = {
    getSlotList: async () => {
        try {
            let slotList = [];
            let result = await slotQuery.getSlotList();
            if(result && result.length > 0){
                result.forEach(ele => {
                    let obj = {
                        id:ele.id,
                        startingPoint:ele.starting_point,
                        endingPoint:ele.ending_point,
                        startingTime:ele.starting_time,
                        endingTime:ele.ending_time,
                        isTripStarted:ele.is_trip_started == 1 ? true : false,
                        isTripCompleted: ele.is_trip_completed == 1 ? true : false,
                        totalSeats : ele.total_seats,
                        bookedSeats : ele.booked_seats,
                        isDriver: ele.is_driver == 1 ? true : false
                    }
                    slotList.push(obj)
                })
            }
            return slotList;
        } catch (err) {
            return err;
        }
    },

    createSlot: async (data) => {
        try {
            let queryData = {
                starting_point:data.startingPoint,
                ending_point:data.endingPoint,
                starting_time:data.startingTime,
                ending_time:data.endingTime,
                is_trip_started:false,
                is_trip_completed:false,
                total_seats:7,
                booked_seats:0
            }
            let result = await slotQuery.createSlot(queryData);
            return result;
        } catch (err) {
            return err;
        }
    },

    updateDriveStatus:async(data) => {
        try{
            let result = await slotQuery.updateDriveStatus(data);
            return result;
        }catch(err){
            return err
        }
    }
}