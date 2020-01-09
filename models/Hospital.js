'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },
}, { timestamps: true });

module.exports = mongoose.model('Hospital', schema)
