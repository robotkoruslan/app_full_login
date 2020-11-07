const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
//const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const socketIO = require('socket.io')(http);
const cors = require('cors');
const users = require('./routes/users');

const config = require('./config/db')
const account = require('./routes/account')
const User = require('./models/user');

const app = express();

const port = 3001;

socketID = "";
socketIO.on("connection", function(socket){
    console.log("User connected", socket.id);
    socketID = socket.id;
})


// Passport init
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
 
app.use(cors())

app.use(bodyParser.json())

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', ()=>{
    console.log("Succesfull conection to database");
});
mongoose.connection.on('error', (err)=>{
    console.log("Not succesfull conection to database" + err);
});

app.listen(port, () => {
    console.log("Server was ranning" + port);
})

app.use('/users', users);
app.get('/', (req, res) => {
    res.send("Home page !")
})

// app.get('/users/:id', (req, res) => {
//     User.findById(req.params.id).then(user => res.json(user))
// })

// app.delete('/users/:id', (req, res) => {
//     User.findByIdAndDelete(req.params.id).then(user => res.json(user))
// })

// app.use('/account', account)

