const mongoose = require('mongoose');
const { db } = require('../loaders');
const data = require('../config/data2.json')
const Person = require('../models/Person');
const Timezone = require('../models/Timezone')
const timezonedata = require('../config/timezones.json')

async function eraseData() {
    // await db.collection('people').drop().catch((err) => console.log("cought it"));

    // Person.create(data);
    // Timezone.create(timezonedata);


}

module.exports.eraseData = eraseData;