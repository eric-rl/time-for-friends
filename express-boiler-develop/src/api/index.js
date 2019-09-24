const express = require('express');
const router = express.Router();
const innit = require('./innit.js')

innit.eraseData();


const dbModels = {
    person: require('../models/Person'),
    timezones: require('../models/Timezone')
}

router.get('/api/:entity', async (req, res) => {
    let result = await dbModels[req.params.entity].find();
    res.json(result);
});

router.get('/api/timezones/:name', async (req, res) => {
    let result = await dbModels["timezones"].findOne({ name: req.params.name })
    res.json(result);
})

router.get('/api/:entity/:id', async (req, res) => {
    let result = await dbModels[req.params.entity].findOne({ _id: req.params.id });
    res.json(result);
})


router.post('/api/:entity', async (req, res) => {
    let newInstance = await new dbModels[req.params.entity](req.body);
    newInstance.save()
    res.json(newInstance)
});

module.exports = { router };