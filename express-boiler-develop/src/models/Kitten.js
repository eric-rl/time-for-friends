const mongoose = require('mongoose');
const {db} = require('../loaders');
const Schema = mongoose.Schema;

// 1. Create a new mongoose schema
// with the properties a kitten should have
// (see https://mongoosejs.com/docs/schematypes.html)
let kittenSchema = new Schema({
  name: String,
  age: Number
});

// 2. Create a class with methods
// (Name it with "class" at the end 
// because we are going to create a mongoose
// model just called Kitten)
class KittenClass {

  sayHi(){
    return `Meow name is ${this.name} and I am ${this.age} months old.`;
  }

  sayBye(){
    return `${this.name} says 'Bye, bye'!`;
  }

}

// 3. Create a Mongoose model combining the schema
// and the methods of the class
// https://mongoosejs.com/docs/4.x/docs/advanced_schemas.html

// add the methods from the class to the schema
kittenSchema.loadClass(KittenClass);
// export the mongoose model as our module
module.exports = db.model('Kitten', kittenSchema);