var express = require('express');

var controller = require('../controllers/admin.controller');
var auth = require('../middleware/auth');
var router = express.Router();
router.get('/', auth.checkAuth, auth.checkAdmin, controller.admin);
router.get('/:id/posts', auth.checkAuth, auth.checkAdmin, controller.viewUserPosts)
router.get('/:id/block', auth.checkAuth, auth.checkAdmin, controller.blockUser)
// router.post('/login', , controller.postLogin);
module.exports = router;