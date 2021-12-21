const Posts = require('../models/post');
const Reply = require('../models/reply');
const replies = require('./replies');

module.exports = {
    new: newPost,
    create,
    index,
    show,
    update,
    delete: deletePost
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
    Posts.findById(req.params.id).populate('replies').exec(function(err, post) {
        console.log(post);
        res.render('posts/show', { title: 'Replies', user: res.locals.user, post });
    });
};

function update(req, res) {
    Posts.findById(req.params.id, function(err, post) {
        post.content = req.body.editcontent
        post.save();
        res.redirect(`/posts/${post._id}`);
    });
};

function deletePost(req, res, next) {
    Posts.deleteOne({_id: req.params.id}).then(function (err, post) {
        Reply.remove({post:req.params.id}).then(function(err) {
            res.redirect(`/posts/feed`);
        });
    });
};