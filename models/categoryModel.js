const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    topic: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Category", categorySchema)
