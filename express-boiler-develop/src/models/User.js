const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let userSchema = new Schema({

  userName: String,
  password: String


})

class UserClass {

}

userSchema.loadClass(UserClass)

module.exports = db.model('User', userSchema)