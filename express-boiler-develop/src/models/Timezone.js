const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema

let timezoneSchema = new Schema({
    timezones: [],
    name: String
})

class TimezoneClass {

}


timezoneSchema.loadClass(TimezoneClass);

module.exports = db.model('Timezone', timezoneSchema);