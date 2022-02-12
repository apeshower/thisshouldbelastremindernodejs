"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Todo", todoSchema);
