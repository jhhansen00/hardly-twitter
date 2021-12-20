const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');
	

router.get('/new', postsCtrl.new);

router.post('/', postsCtrl.create);

router.get('/feed', postsCtrl.index);

router.get('/:id', postsCtrl.show);

router.post('/:id', postsCtrl.update);
	
module.exports = router;