var postModel = require("../models/posts.model");
var userModel = require("../models/users.model");
module.exports.checkAuth = function(req,res,next) {
    if (!req.session.userId) {
        res.render('auth');
        return;
    } else {
    next();
    }
}
module.exports.checkOwn = function(req,res,next) {
    postModel.findOne({'_id': req.params.id}, 'owner -_id', function (err, data) {
      if (err) console.log(err)
        var s = JSON.stringify(data.owner);
        var x=s.replace("\"", "");
        console.log(req.session.userId);
        console.log(x.slice(0,x.length-1))
        if (x.slice(0,x.length-1)!==req.session.userId) 
            {res.render('auth', {mes: 'not_owner'})
                return;
            }
        else {
            next();
        }
    })
}
module.exports.checkAdmin = function(req,res,next) {
    userModel.findOne({'_id': req.session.userId}, 'isAdmin -_id', function(err,data) {
        if (err) console.log(err)
        if (data.isAdmin == false) {
            res.render('auth', {mes: 'not_admin'})
        } else next();
    })

}