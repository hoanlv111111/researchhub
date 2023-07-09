const mongoose = require("mongoose")

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    citation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    conference: {
        type: String,
        trim: true,
        maxlength: 100
    },
    pages: {
        type: String,
        trim: true,
        maxlength: 100
    },
    publisher: {
        type: String,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    author: {
        type: String,
        trim: true,
        maxlength: 100
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