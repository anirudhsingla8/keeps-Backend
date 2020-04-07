const express = require('express');
const app = express();
const items = require('./routes/items');
const home = require('./routes/home');
const users = require('./routes/users');
const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://anirudh:rj13sl1608@cluster0-lcda6.mongodb.net/keeps?retryWrites=true&w=majority';
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/users/items',items);
app.use('/',home);
app.use('/users',users);

mongoose.connect(DB_URL)
    .then(() => console.log('successfully connected to mongo db'))
    .catch(err => console.error("connection failed",err));

const port = process.env.PORT || 8888;
app.listen(8888,()=>console.log(`server created successfully at ${port}`));