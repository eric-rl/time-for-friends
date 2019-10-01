const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const innit = require('./innit.js');

const User = require("../models/User")
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

innit.eraseData();


const dbModels = {
    person: require('../models/Person'),
    timezones: require('../models/Timezone'),
    user: require('../models/User')
}

router.post("/api/register", (req, res) => {
    // Form validation
    console.log(req.body)
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ userName: req.body.userName }).then(user => {
        if (user) {
            return res.status(400).json({ userName: "Username already exists" });
        } else {
            const newUser = new User({
                userName: req.body.userName,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.get('/api/loggedinas', (req, res) => {
    res.json(req.session.user);
});

router.post("/api/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const userName = req.body.userName;
    const password = req.body.password;
    // Find user by userName
    User.findOne({ userName }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ userNamenotfound: "Username not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                console.log(user)
                const sessUser = {
                    id: user._id,
                    name: user.userName
                };

                req.session.user = sessUser;
                console.log(user);

                res.json({msg: "logged in succesfully", sessUser, ok: true});
                
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.delete('/api/user/logout', (req, res) => {
    console.log(req.session);
    req.session.destroy((err) => {
        if (err) throw err;
        res.clearCookie()
        res.send("Logged out successfully")
    })
})

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



// router.post('/api/:entity', async (req, res) => {
//     console.log(req.body)

//     let newInstance = await new dbModels[req.params.entity](req.body);
//     newInstance.save()
//     res.json(newInstance)
// });

module.exports = { router };