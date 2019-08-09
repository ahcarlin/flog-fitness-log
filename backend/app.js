const express = require('express');
const http = require('http');
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const schema = require('./schemas/gqlSchema')

//const router = require('./router/routes')

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json())
// router(app)

// const server = http.createServer(app)
const port = 5000

const mongoURL = 'mongodb+srv://Bradmin:4br3l0@cluster0-6jkst.mongodb.net/fLog?retryWrites=true&w=majority'

console.log('Connecting to Remote Database.');
mongoose.connect(mongoURL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log("Connected to remote DB")
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log("Listening on port 5000")
})
// server.listen(port)
// console.log(`NodeJS Server running on port ${port}.`);