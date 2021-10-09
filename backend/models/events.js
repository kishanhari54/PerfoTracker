const mongoose = require('mongoose');

//Mongo DB Schemas
const eventsSchema = mongoose.Schema({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    info: { type: String, default: "" },
    subject: { type: String, default: '' },
    time: { type: String, default: '' }
})

eventsSchema.virtual('id').get(function() { return this._id.toHexString() })

eventsSchema.set('toJSON', { virtuals: true })

//Mongo DB Models
const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;