'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Uti', schema)
