const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require("path")
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const dbConnection = mongoose.connection;

app.use(cors());

app.use(express.json({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

app.use("/api/auth", require('./routes/auth-route'));


dbConnection.on('error', err => console.log(`ERROR! Connection to db: ${err}`));
dbConnection.once('open', () => console.log('Connection to DB!'));

const start = async () => {
    try {
        // uncomment below string for connect to DB and set exist url to mongoDB
        // await mongoose.connect(process.env.MONGODB_URI || 'some_url', { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser:true});

        app.listen(PORT, err => {
            err ? console.log(err) : console.log(`Server started on port ${PORT}!`);
        });
    } catch (e) {
        console.log('Server Error: need actual url to mongoDB', e.message);
        process.exit(1);
    }
}

start();