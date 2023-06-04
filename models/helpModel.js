const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;
