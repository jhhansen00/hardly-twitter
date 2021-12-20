const express = require('express');
const router = express.Router();
const repliesCtrl = require('../controllers/replies');

router.post('/posts/:id/replies', repliesCtrl.create);

router.delete('/posts/:id', repliesCtrl.delete);
module.exports = router;