const mongoose = require('mongoose');

//Mongo DB Schemas
const examresultsSchema = mongoose.Schema({
    year: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true },
    subject: { type: String, required: true },
    dateOfExam: { type: Date, required: true },
    //studentID:  { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    studentRegNo: { type: String, required: true }
})

examresultsSchema.virtual('id').get(function() { return this._id.toHexString() })

examresultsSchema.set('toJSON', { virtuals: true })

//Mongo DB Models
const examresult = mongoose.model('examresult', examresultsSchema);

module.exports = examresult;