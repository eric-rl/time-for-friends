const express = require('express');
const router = express.Router();

const dbModels = {
    // Require the mongoose model Kitten
    kitten: require('../models/Kitten'),
    person: require('../models/Person')
}
router.put('/api/test/:id', async (req, res) => {
    let person = await dbModels.person.findOne({ _id: req.params.id });
    let kitten = await dbModels.kitten.findOne({ _id: req.body });

    person.kittens.push(kitten);
    await person.save();
    res.json(person);
});

router.get('/api/:entity', async (req, res) => {
    let result = await dbModels[req.params.entity].find();
    res.json(result);
});

router.get('/api/:entity/:id', async (req, res) => {
    let result = await dbModels[req.params.entity].findOne({ _id: req.params.id }).populate('kittens').exec();
    res.json(result);
})

router.post('/api/:entity', async (req, res) => {
    let newInstance = await new dbModels[req.params.entity](req.body)
    newInstance.save();
    res.json(newInstance);
});

router.put('/api/:entity/:id', async (req, res) => {
    let updatedInstance = await dbModels[req.params.entity].updateOne({ _id: req.params.id }, req.body)
    res.json(updatedInstance);
});

router.delete('/api/:entity/:id', async (req, res) => {
    let deletedInstance = await dbModels[req.params.entity].deleteOne({ _id: req.params.id })
    res.json(deletedInstance);
})


module.exports = { router };