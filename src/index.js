"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var index_1 = require("../src/bot/botSetup/index");
mongoose_1.default.connect('mongodb://127.0.0.1:27017/auth');
mongoose_1.default.connection.on('error', function (err) {
    console.error('Ошибка подключения к базе данных:', err);
});
mongoose_1.default.connection.on('open', function () {
    console.log('Подключение к базе данных установлено');
    (0, index_1.launchBot)();
});
