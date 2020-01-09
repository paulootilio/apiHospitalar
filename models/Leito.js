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
        enum: ['deactive', 'occupied', 'empty', 'maintenance'],
        default: 'empty'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    uti: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uti",
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Leito', schema)
