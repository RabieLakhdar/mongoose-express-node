const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000
const { MONGO_USER, MONGO_PASSWORD, DB_NAME } = process.env;

const server = http.createServer(app)
const options = { useUnifiedTopology: true, useNewUrlParser: true };
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-lmzcv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(uri, options)
    .then(() => {
        server.listen(port);
        console.log(`🌐 running at port: ${port}`)
    })
    .catch(err => {
        console.warn(err)
    });
