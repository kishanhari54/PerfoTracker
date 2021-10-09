const mongoose = require('mongoose');

//Mongo DB Schemas
const examSchema = mongoose.Schema({
    year: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true },
    subject: { type: String, required: true },
    dateOfExam: { type: Date, required: true },
    time: { type: String, default: "" }
})

examSchema.virtual('id').get(function() { return this._id.toHexString() })

examSchema.set('toJSON', { virtuals: true })

//Mongo DB Models
const Exams = mongoose.model('Exams', examSchema);

module.exports = Exams;