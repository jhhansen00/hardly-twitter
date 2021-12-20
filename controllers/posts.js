const Posts = require('../models/post');

module.exports = {
    new: newPost,
    create,
    index,
    show,
    update
};

async function index(req, res) {
    const posts = await Posts.find({});
    res.render('posts/feed', { title: "Feed", posts });
}

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

function show(req, res) {
    Posts.findById(req.params.id, function(err, post) {
        res.render('posts/show', { title: 'Replies', user: res.locals.user, post });
    });
};

function update(req, res) {
    console.log("req", req.body);
    Posts.findById(req.params.id, function(err, post) {
        post.content = req.body.editcontent
        post.save();
        res.redirect(`/posts/${post._id}`);
    });
};