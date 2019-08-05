// File: ./models/comment.js

var mongoose = require('mongoose');

//define schema
var Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
});
 
const Comment = mongoose.model('Comments', CommentSchema);
 
module.exports = Comment;