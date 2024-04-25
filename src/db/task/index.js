"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var mongoose_1 = require("mongoose");
var COLLECTION_NAME = "Task";
var TaskSchema = new mongoose_1.Schema({
    taskId: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    }
}, {
    collection: COLLECTION_NAME
});
exports.Task = (0, mongoose_1.model)(COLLECTION_NAME, TaskSchema);
