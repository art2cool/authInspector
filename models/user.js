var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var userModel = new Schema({
    email: {
        type: String
    },
    role: {
        type: String,
        default: 'itern'
    },
    password: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', userModel);

module.exports.createUser = function(newUser, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;

        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.getUserByEmail = function(email, callback) {
    var query = {
        email: email
    };
    User.findOne(query, callback);
};

module.exports.commparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch);

    });
};

module.exports.getAllUser = function(query, callback) {
    var q = {role: {$not: /admin/} };
    User.find(q, callback);
};


module.exports.removeUser = function(id, callback) {
    User.findOneAndRemove({_id: id}, callback);
};
