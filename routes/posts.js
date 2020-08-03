var express = require('express');
var multer = require('multer');
var controller = require('../controllers/posts.controller');
var middleware = require('../middleware/posts.validation');
var auth = require('../middleware/auth')
var upload = multer({dest: './public/uploads/posts/'})

var router = express.Router();

router.get('/', controller.posts);
router.post('/', function(req,res) {
    
});
router.post('/search', controller.search)
//.auth.checkAuth,
router.get('/create', auth.checkAuth, controller.create);
// router.post('/create/getWards', auth.checkAuth, controller.getWards);
router.post('/create',auth.checkAuth, middleware.postCreate, upload.array('room_images', 10), controller.postCreate)

router.get('/:id',controller.postDetails);
router.get('/:id/edit',auth.checkAuth, auth.checkOwn, controller.edit);
router.get('/:id/delete',auth.checkAuth, auth.checkOwn, controller.delete);
router.post('/edit',auth.checkAuth, controller.postEdit);

module.exports = router; 