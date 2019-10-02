const mongoose = require('mongoose');
const { db } = require('../loaders');
const data = require('../config/data.json')
const Person = require('../models/Person');
const User = require('../models/User');
const Timezone = require('../models/Timezone')
const timezonedata = require('../config/timezones.json')
const bcrypt = require("bcryptjs");

async function eraseData() {
    await db.collection('people').drop().catch((err) => console.log("cought it"));
    await db.collection('users').drop().catch((err) => console.log("cought it"));
    await createNewAdmin()
    setTimeout(async function () {
        let admin = await db.collection('users').findOne().catch((err) => console.log("cought it"));
        data.forEach(async friend => {
            let person = new Person({...friend, createdBy: admin._id})
            await person.save() 
        });
    }, 1000);
    Timezone.create(timezonedata);
}
async function createNewAdmin() {
    let newUser = new User({
        userName: "admin",
        password: "password"
    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .catch(err => console.log(err));
        });
    });
}

module.exports.eraseData = eraseData;