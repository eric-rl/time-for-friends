const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;


let personSchema = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    phoneNumber: String,
    email: String,
    workStart: String,
    workEnd: String,
    sleepStart: String,
    sleepEnd: String,
    location: {
        country: String,
        timezone: String,
        city: String,
        lng: Number,
        lat: Number
    },
    createdBy: String
});


class PersonClass {



}


personSchema.loadClass(PersonClass);

module.exports = db.model('Person', personSchema);