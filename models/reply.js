const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    content: String
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Reply', replySchema);