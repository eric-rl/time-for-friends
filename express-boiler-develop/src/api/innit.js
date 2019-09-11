const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const data = require('../config/data.json')

const Person = require('../models/Person');

async function eraseData() {
    await db.collection('people').drop().catch((err) => console.log("cought it"));

    Person.create(data);

}



// let garfield = new Kitten({
//     name: "Tobbe",
//     age: 23
// });

// let eric = new Person({
//     name: {
//         firstName: "Eric",
//         lastName: "Rasmusson"
//     },
//     phoneNumber: "0730771766",
//     mail: "eric.rl@me.com",
//     location: {
//         country: "Sweden",
//         city: "Malmö",
//         timezone: "Central/european"
//     }
// })
// eric.save();
// save to MongoDB
// garfield.save();


module.exports.eraseData = eraseData;