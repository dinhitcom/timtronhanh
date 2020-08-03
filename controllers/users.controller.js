var bcrypt = require("bcryptjs");
var saltRounds = 10;

var userModel = require("../models/users.model");
var postModel = require("../models/posts.model");
module.exports.create = function(req, res) {
    res.render("create");
};

module.exports.postCreate = function(req, res) {
  var user = new userModel();
  user.username = req.body.username;
  user.password = bcrypt.hashSync(req.body.password, saltRounds);
  user.email = req.body.email;
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.account_type = "user";
  user.account_status = "active";
  user.avatar = '';
  userModel.findOne({ username: req.body.username }, function(err, exists) {
    if (exists) {
      res.render("create", {
        error: "Tên đăng nhập đã tồn tại!",
        values: req.body
      });
      return;
    } else {
      userModel.findOne({ email: req.body.email }, function(err, exists) {
        if (exists) {
          res.render("create", {
            error: "Email đã tồn tại!",
            values: req.body
          });
          return;
        } else {
          user.save(function(err) {
            if (err) return console.log(err);
            // saved!
            res.render('login',{message: 'Đăng ký thành công!'});
          });
        }
      });
    }
  });
  
};
module.exports.login = function(req, res) {
  res.render("login");
};

module.exports.postLogin = function(req, res) {
  userModel.findOne({ username: req.body.username}, function(err, user) {
    if (!user) {
      res.render('login',{
        error: 'Tài khoản không tồn tại!',
        values: req.body 
      });
      return;
    } else {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.render('login',{
          error: 'Mật khẩu không chính xác!',
          values: req.body
        });
        return;
      } else {
        if (user.account_status!='active') {
          res.render('login',{
            error: 'Tài khoản của bạn đã bị khóa!',
            values: req.body
          });
          return;
        } else {
          req.session.userId = user._id;
          res.redirect('/')
        }
        
      }
    }
  });
};
module.exports.logout = function(req,res) {
    req.session.destroy();
    res.redirect('/');
  }; 

module.exports.users = function(req, res) {
  userModel.findOne({'_id' : req.session.userId}, function(err, data){
    if (err) console.log(err)
    else res.render('usersDashboard',{status: 'logged', data})
  }) 
};
module.exports.posts = function(req, res) {
  userModel.findOne({'_id' : req.session.userId}, function(err, data){
    if (err) console.log(err)
    else {
      postModel.find({'owner' : data._id}, function (err,posts) {
        if (err) console.log(err)
        res.render('usersPosts',{status: 'logged', data, posts})
      })
    }
  }) 
};


module.exports.update = function(req, res) {
  var update = {};
  update.fname = req.body.fname;
  update.lname = req.body.lname;
  update.email = req.body.email;
  update.phone = req.body.phone;
  update.dop = req.body.dop;
  update.address = req.body.address;
  update.facebook = req.body.facebook;
  update.sex = req.body.sex;
  update.avatar = req.file.path.replace(`\\`,"/").split('/').slice(1).join('/') 
  userModel.findOneAndUpdate({'_id':req.session.userId},{$set: update},{upsert: true}, {new: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.redirect('/users/dashboard');
});
};
module.exports.find = function(req, res) {};
