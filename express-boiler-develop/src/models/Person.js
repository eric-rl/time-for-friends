const mongoose = require('mongoose');
const {db} = require('../loaders');
const Schema = mongoose.Schema;


let personSchema = new Schema({
    name: String,
    age: Number,
    town: String,
    kittens: [{type: mongoose.Types.ObjectId, ref: 'Kitten'}]
});


class PersonClass{

    hello(){
        return `Iam ${this.name}`
    }

}


personSchema.loadClass(PersonClass);

module.exports = db.model('Person', personSchema);