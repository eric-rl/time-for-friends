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
    location: {
        country: String,
        timezone: String,
        city: String
    }
});


class PersonClass {



}


personSchema.loadClass(PersonClass);

module.exports = db.model('Person', personSchema);