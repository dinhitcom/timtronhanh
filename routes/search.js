var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('search', { pagename: 'search'});
});
router.get('/:district/:ward', function(req,res) {
  
})
router.post('/', function(req,res) {
    
});

module.exports = router;
