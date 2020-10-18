const User = require('../models/user.js');
const AddFriends = require('../models/addFriends.js');
const Friends = require('../models/friends.js');
const mongoose = require ('mongoose');


exports.create = (req, res) => {

    if (!req.body.age || !req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "First or second name can not be empty"
        });
    }


    var user;
    user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
        date: req.body.date,
        friends: req.body.friends,
        addFriends: []
    });


    user.save()
        .then(data => {
            res.send(data);
        })
        .then(() => {
            console.log("Save Data");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// exports.findAll = (req, res) => {
//     User.find()
//         .then(users => {
//             res.send(users);
//         }).then(() => {
//         console.log("User find");
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving users."
//         });
//     });
// };
exports.findAll = (req, res) => {
    User.find().then(user => res.json(user))
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).then(() => {
        console.log("User find by ID");

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};


exports.update = (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "User second_name can not be empty"
        });
    }


    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled User"
    }, {new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};


exports.createadd = (req, res) => {
    var id = req.body.id;
    if (typeof id != "string") {
        return res.status(400).send({
            message: "User id can not be empty"
        });
    }
    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            var ids = req.body._ids;
            ids.forEach(function(e) {
                User.findById(e)
                    .then(user_ => {
                        if (!user_) {
                            return res.status(404).send({
                                message: "User not found with id " + e
                            });
                        }
                        user_.addFriends.push(user);
                        user_.save();
                    }).then(() => {
                    console.log("User find by ID");

                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + e
                        });
                    }
                    return res.status(500).send({
                        message: "Error retrieving user with id " + e
                    });
                });
            });
            res.send(user);
        }).then(() => {
        console.log("User find by ID");

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + id
        });
    });

};

////////////////////////////////////////

exports.addFriends = (req, res) => {
    var id = req.params.userId;
    console.log(id);
    if (typeof id != "string") {
        return res.status(400).send({
            message: "User id can not be empty"
        });
    }
    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            var ids = req.body._ids;
            ids.forEach(function(e) {
                User.findById(e)
                    .then(user_ => {
                        if (!user_) {
                            return res.status(404).send({
                                message: "**** User not found with id " + e
                            });
                        }
                        user.addFriends.forEach(function(x) {
                            if (x._id.equals(user_._id)) {
                                user.addFriends.remove(user_);
                                user_.friends.push(user);
                                user.friends.push(user_);
                                user.save();
                                user_.save();
                                return;
                            }
                        });

                    }).then(() => {
                    return;

                }).catch(err => {
                    console.log(err);
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + e
                        });
                    }
                    return res.status(500).send({
                        message: "*** Error retrieving user with id " + e
                    });
                });
            });
            res.send(user);
        }).then(() => {
            return;

    }).catch(err => {
        console.log(err);s
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + id
        });
    });

};

