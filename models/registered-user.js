var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var ObjectId = mongoose.Schema.Types.ObjectId;

var userModel = new Schema({
    _id: {type: ObjectId},
    email: {type: String},
    role: {type: String, default: 'itern'},
    password: {type: String},
    token: {type: String}
});

var RegisteredUser = module.exports = mongoose.model('RegisteredUser', userModel);

module.exports.createRegisteredUser = function (RegisteredUser, callback) {
    RegisteredUser.save(callback);
};

module.exports.removeUserById = function (id, callback) {
    var query = {_id : id};
    RegisteredUser.remove(query, callback);
};

module.exports.getUserById = function(id, callback) {
    RegisteredUser.findById(id, callback);
};

module.exports.updateToken = function(id, token, callback) {
    var newToken =  {token: token};
    RegisteredUser.update({_id: id}, newToken, callback(null, newToken));
};
