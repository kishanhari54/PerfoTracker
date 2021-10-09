const mongoose = require('mongoose');

//Mongo DB Schemas
const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    department: { type: String, default: "" },
    currentYear: { type: String, default: "1" },
    currentSemester: { type: String, default: '1' },
    street: { type: String, default: '' },
    apartment: { type: String, default: '' },
    city: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' },
    phoneNumber: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false }
})

userSchema.virtual('id').get(function() { return this._id.toHexString() })

userSchema.set('toJSON', { virtuals: true })

//Mongo DB Models
const Users = mongoose.model('Users', userSchema);

module.exports = Users;