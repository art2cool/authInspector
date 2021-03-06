var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user.js');
var RegisteredUser = require('../models/registered-user.js');

var secret = 'superSecret';
/* GET users listing. */
router.get('/', isAuthorised, function(req, res, next) {
    var query = {};
    User.getAllUser(query, function(err, users) {
        res.status(200).send(users);
    });
});

router.post('/register', function(req, res) {

    var user = {};

    user.email = req.body.user.email;
    user.password = req.body.user.password;
    user.password2 = req.body.user.password2;

    User.getUserByEmail(user.email, function(err, userDB) {
        if (err) throw err;

        if (userDB) {
            res.status(409).send('user already exist');
        } else {
            if (user.password === user.password2) {

                var newUser = new User({
                    email: req.body.user.email,
                    password: req.body.user.password
                });

                User.createUser(newUser, function(err, userDB) {
                    if (err) throw err;

                    autoriseUser(userDB, function(err, user) {
                        if (err) throw err;

                        console.log('user logined');
                        res.status(202).send(user);
                    });
                });
            }
        }
    });
});

router.post('/login', function(req, res) {

    var user = {};
    user.email = req.body.user.email;
    user.password = req.body.user.password;

    User.getUserByEmail(user.email, function(err, userDB) {
        if (err) throw err;

        if (!userDB) {
            res.status(401).send('invalid login or password');
        } else {
            User.commparePassword(user.password, userDB.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    autoriseUser(userDB, function(err, user) {
                        if (err) throw err;

                        res.status(202).send(user);
                    });
                } else {
                    res.status(401).send('invalid login or password');
                }

            });
        }
    });

});

router.post('/logout', function(req, res) {
    var decoded = jwt.verify(req.body.token, secret);

    RegisteredUser.removeUserById(decoded.id, function(err, user) {
        if (err) throw err;

        res.status(200).send('logouted');
    });


});

router.delete('/:id', isAdmin, function(req, res) {
    var userId = req.params.id;
    User.removeUser(userId, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {

            res.status(204).send('user removed');
        }
    });
});
// cheking is authenticated token
function isAuthorised(req, res, next) {

    if (req.headers.authorization) {

        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('token is expired');
            } else {
                RegisteredUser.getUserById(decoded.id, function(err, user) {
                    if (user) {
                        var newToken = createToken(user._id);
                        next();

                    } else {
                        res.status(401).send('unauthorised user');
                    }
                });
            }
        });

    } else {
        res.status(401).send('unauthorised user');
    }
}

function autoriseUser(user, callback) {
    var token = createToken({
        id: user._id
    });

    RegisteredUser.getUserById(user._id, function(err, logedUser) {
        if (err) throw err;

        if (!logedUser) {
            var newRegisteredUser = new RegisteredUser(user);
            newRegisteredUser.token = token;

            RegisteredUser.createRegisteredUser(newRegisteredUser, callback);
        } else {
            RegisteredUser.updateToken(logedUser._id, token, callback);
        }
    });

}

function createToken(id) {
    var payload = id;
    return jwt.sign(
        payload,
        secret, {
            expiresIn: "10h"
        });

}

function isAdmin (req, res, next) {

    if (req.headers.authorization) {

        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('token is expired');
            } else {
                RegisteredUser.getUserById(decoded.id, function(err, user) {
                    if (user) {
                        //TODO refresh token

                        var newToken = createToken(user._id);

                        if(user.role === 'admin'){
                            next();
                        } else {
                            res.status(403).send('you have no premision for that');
                        }

                    } else {
                        res.status(401).send('unauthorised user');
                    }
                });
            }
        });

    } else {
        res.status(401).send('unauthorised user');
    }

}

module.exports = router;
