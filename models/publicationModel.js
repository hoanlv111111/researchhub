const mongoose = require("mongoose")

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    citation: {
        type: String,
        required: true,
        trim: true,
    },
    conference: {
        type: String,
        trim: true,
    },
    pages: {
        type: String,
        trim: true,
    },
    publisher: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
        trim: true,
    },
    year: {
        type: Date,
        required: true,
        trim: true,
        maxlength: 4
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("publication", publicationSchema)