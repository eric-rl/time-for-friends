const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;


let personSchema = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    phoneNumber: String,
    mail: String,
    location: {
        country: String,
        city: String,
        timezone: String    
    }
});


class PersonClass {



}


personSchema.loadClass(PersonClass);

module.exports = db.model('Person', personSchema);