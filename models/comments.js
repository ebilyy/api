const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author: { type: String, required: true },
    text: {type: String, required: true },
    time: {type: Date },
    state: { type: String },
    sub_comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }],
    parent_id: Schema.Types.ObjectId
});


// Export the model
module.exports = mongoose.model('Comment', CommentSchema);