const mongoose = require('mongoose');
const { db } = require('../loaders');
const data = require('../config/data.json')
const Person = require('../models/Person');

async function eraseData() {
    await db.collection('people').drop().catch((err) => console.log("cought it"));

    Person.create(data);

}
module.exports.eraseData = eraseData;