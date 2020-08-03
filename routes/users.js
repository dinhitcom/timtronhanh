require('dotenv').config();
var express = require('express');
var multer = require('multer');
var controller = require('../controllers/users.controller');
var middleware = require('../middleware/users.validation');
var auth = require('../middleware/auth');
var router = express.Router();
var upload = multer({dest: './public/uploads/users/'})
//Register
router.get('/create', controller.create);
router.post('/create',  middleware.postCreate, controller.postCreate);
//Login
router.get('/login', controller.login);
router.post('/login', middleware.postLogin, controller.postLogin);

router.get('/dashboard', auth.checkAuth, controller.users);
router.get('/posts', auth.checkAuth, controller.posts);
router.post('/update',auth.checkAuth, upload.single('avatar'),  controller.update);
//find User
router.post('/find', auth.checkAuth, controller.find);

router.get('/logout', auth.checkAuth, controller.logout);

module.exports = router;
