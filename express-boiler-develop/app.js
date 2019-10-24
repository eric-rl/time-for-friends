const express = require('express');
const config = require('./src/config');
const app = express();
const { db } = require('./src/loaders');
const { router } = require('./src/api');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const innit = require('./src/api/innit');

const mongoDBstore = new MongoDBStore({
    uri: config.databaseURL,
    collection: "mySessions"
});

app.use(
    session({
        key: 'user_sid',
        secret: 'our dirty little secret',
        resave: false,
        saveUninitialized: true,
        store: mongoDBstore,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: false
        }
    })
)

app.use(express.json());
app.use(express.static('www'));
app.use('/', router);

async function startWebServer() {
    app.listen(config.port, () => console.log('Listening on port ' + config.port));
}

db.once('open', () => {
    startWebServer();
})
