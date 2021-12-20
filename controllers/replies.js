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
        Reply.create(req.body, function(err, reply) {
            post.replies.push(reply);
            post.save(function(err) {
                res.redirect(`/posts/${post._id}`);
            });
        });
    });
};

function deleteReply(req, res, next) {
    Post.findOne({ "replies._id": req.params.id}).then(function (post) {
        const reply = post.replies.id(req.params.id);
        if (!reply.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
        reply.remove();
        post.save()
            .then(function () {
                res.redirect(`/posts/${post._id}`);
        })
        .catch(function (err) {
            return next(err);
        });
    });
};