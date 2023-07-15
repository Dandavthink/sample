const slot = require('../routes/slot-router');
const transaction = require('../routes/transaction-router');
const user = require('../routes/user-router');
module.exports = function (app) {
    app.use('/slot', slot.slotRouter);
    app.use('/booking-seat', transaction.transactionRouter);
    app.use('/user', user.userRoutes);
}