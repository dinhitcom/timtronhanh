var userModel = require("../models/users.model");
var postModel = require("../models/posts.model");
const mongoose = require("mongoose");
var db = mongoose.connection;

module.exports.admin = function(req, res) {
  userModel.findOne({'_id' : req.session.userId}, function(err, data){
    if (err) console.log(err)
    else {
      userModel.find({}, function (err,users) {
        if (err) console.log(err)
        res.render('adminDashboard',{status: 'logged', data, users})
      })
    }
  }) 
};
module.exports.viewUserPosts = function(req, res) {
  postModel.find({'owner': req.params.id}, function(err, data) {
    if (err) console.log(err)
    else {
      if (data.length==0) {
        res.render('viewUserPosts', {
          'status': 'logged',
          'result': 'null',
          data
        })
        console.log('NULL')
      } else 
        res.render('viewUserPosts', {
          'status': 'logged',
          data
        })
    }
  })
}
module.exports.blockUser = function(req, res) {
  postModel.findOneAndUpdate({'_id':req.params.id}, {$set: {'account_status':'blocked'}}, function(err) {
    if (err) console.log(err)
    else {
      res.redirect('/admin')
    }
  } )
}