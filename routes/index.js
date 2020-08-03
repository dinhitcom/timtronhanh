var express = require('express');
var router = express.Router();
var locationModel = require("../models/locations.model");
var postsModel = require("../models/posts.model");

var getDistricts_query = locationModel.find({},'name_with_type slug -_id'); 
// var getPosts_query = postsModel.find({}).sort({ngay_cap_nhat: -1}).limit( 30);
/* GET home page. */
router.get('/', function(req, res) {
  var page=parseInt(req.query.page) || 1;
  //
  var postsPerPage = 6;
  var query = {};
  query.skip = (page-1) * postsPerPage;
  query.limit = page*postsPerPage;

  getDistricts_query.exec(function(err,data){
    if (err) return console.log(err);
    postsModel.find({}, {}, query, function(err,posts){
      if (err) console.log(err)
      if (!req.session.userId)
        res.render('index', { 
          'pagename': 'index',
          page,
          data,
          posts
        });
        else res.render('index', { 
          'pagename': 'index', 
          'status': 'logged', 
          page,
          data,
          posts
        });
    })
    
  });
  

  //   res.render('index', { pagename: 'index'});
  // else 
});
router.post('/getWards', function(req, res) {
  var getWards_query = locationModel.findOne({name_with_type: req.body.quan_huyen}, 'xa_phuong -_id');
  getWards_query.exec(function(err, data) {
      if (err) return console.log(err);
      res.send(Object.values(data.xa_phuong));
  })
})
module.exports = router;

