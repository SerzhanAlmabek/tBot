"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    userId: {
        type: Number, required: true
    },
    username: {
        type: String, required: true
    },
});
exports.User = mongoose_1.default.model('User', UserSchema);
