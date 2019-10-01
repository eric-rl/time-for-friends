const express = require('express');
const router = express();
const innit = require('./innit.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const session = require('express-session');

router.use(session({
    secret: 'our dirty little secret',
    resave: false,
    saveUninitialized: true
  }));

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

innit.eraseData();

const User = require("../models/User")

const dbModels = {
    person: require('../models/Person'),
    timezones: require('../models/Timezone')
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
                // User matched
                // Create JWT Payload
                console.log(user)
                const payload = {
                    id: user._id,
                    name: user.userName
                };

                req.session.user = user;
                console.log(user);

                res.json({ok: true});
                // Sign token
                /*jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            id: user._id,
                            userName: user.userName
                        });
                    }
                );*/
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

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