const express = require('express');
const config = require('./src/config');
// const app = module.exports = express();
const app = express();
const { db } = require('./src/loaders');
const { router } = require('./src/api');
const passport = require("passport");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(express.static('www'));
app.use(bodyParser.json());
app.use('/', router);
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./src/config/passport")(passport);

async function startWebServer() {
    app.listen(config.port, () => console.log('Listening on port ' + config.port));
}

db.once('open', () => {
    startWebServer();
})
