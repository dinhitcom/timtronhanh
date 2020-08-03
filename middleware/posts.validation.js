const mongoose = require('mongoose'); 
var db = mongoose.connection;
module.exports.postCreate = function(req,res,next) {
    next();
}
