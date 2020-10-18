const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db')
const account = require('./routes/account')
const User = require('./models/user');

const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', ()=>{
    console.log("Succesfull conection to database");
});
mongoose.connection.on('error', (err)=>{
    console.log("Not succesfull conection to database" + err);
});

app.listen(port, () => {
    console.log("Server was ranning" + port);
})

app.get('/', (req, res) => {
    res.send("Home page")
})
app.get('/users', (req, res) => {
    User.find().then(user => res.json(user))
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => res.json(user))
})

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => res.json(user))
})

app.use('/account', account)