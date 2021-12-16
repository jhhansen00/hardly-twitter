const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');
	
// GET /movies/new
router.get('/new', postsCtrl.new);

router.post('/', postsCtrl.create);

router.get('/feed', postsCtrl.index);
	
module.exports = router;