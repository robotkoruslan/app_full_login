const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');


const User = require('../models/user');

//Users list
router.get('/', (req, res) => {
    User.find().then(user => res.json(user))
})

//Delete user
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => res.json(user))
})


// Register
router.get('/register', (req, res) => {
    res.send("Register Page")
})

router.post('/register', (req, res) => {
     let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.createUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: "User has not been added."})
        }
        else {
            res.json({success: true, msg: "User has been added."})
        }
    });
    //  res.redirect('/users/login');   
});


// Login
router.get('/login', function (req, res) {
    res.send('login');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: "This user was not found."})
        };
        
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    }
                })
                res.redirect('/login')
            } else {
                return res.json({success: false, msg: "Password mismatch"})
            }
        })
    })
});
router.get('/logout', function (req, res) {
    req.logout();
    res.send('logout')
	//res.redirect('/users/login');
});
module.exports = router;