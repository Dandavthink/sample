const slot = require('../routes/slot-router');
module.exports = function (app) {
    app.use('/slot', slot.slotRouter);
}