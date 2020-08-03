var mongoose = require('mongoose');
// var xa_phuongSchema = new mongoose.Schema({
    
//     name: String,
//     type: String,
//     slug: String,
//     name_with_type: String,
//     path: String,
//     path_with_type: String,
//     code: String,
//     parent_code: String 
// });
var locationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: String,
    parent_code: String,
    xa_phuong: Object
   
}); 
module.exports = mongoose.model('locations', locationSchema, 'location');