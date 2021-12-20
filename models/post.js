const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const replySchema = new Schema({
//         user: {type: Schema.Types.ObjectId, ref: 'User'},
//         userName: String,
//         userAvatar: String,
//         content: String
//     }, {
//         timestamps: true,
//     }
// );

const postSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        userName: String,
        userAvatar: String,
        content: String,
        replies: [{type: Schema.Types.ObjectId, ref: 'Reply'}],
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', postSchema);