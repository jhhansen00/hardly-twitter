const Posts = require('../models/post');

module.exports = {
    new: newPost,
    create
};

function newPost(req, res) {
    res.render('posts/new', { title: 'New Post'});
};

function create(req, res) {
    req.body.user = res.locals.user._id;
    req.body.userAvatar = res.locals.user.avatar;
    req.body.userName = res.locals.user.name;
    const post = new Posts(req.body);
    post.save(function(err) {
        if (err) return res.render('posts/new');
        res.redirect('/posts/new');
    });
}

