const Post = require('../models/post');
const reply = require('../models/reply');
const Reply = require('../models/reply');

module.exports = {
    create,
    delete: deleteReply,
};

function create(req, res) {
    req.body.user = res.locals.user._id;
    req.body.userAvatar = res.locals.user.avatar;
    req.body.userName = res.locals.user.name;
    Post.findById(req.params.id, function(err, post) {
        req.body.post = post;
        Reply.create(req.body, function(err, reply) {
            post.replies.push(reply);
            post.save(function(err) {
                res.redirect(`/posts/${post._id}`);
            });
        });
    });
};

function deleteReply(req, res, next) {
    Reply.findById(req.params.rid).then(function (reply) {
        if (!reply.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
        reply.remove(function(err) {
            res.redirect(`/posts/${req.params.postid}`);
        });
    })
};