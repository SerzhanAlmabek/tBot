"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBot = exports.bot = void 0;
var telegraf_1 = require("telegraf");
var index_1 = require("../../data/statisticsData/index");
var index_2 = require("../../utils/addTaskNotificationScheduler/index");
var index_3 = require("../../db/user/index");
exports.bot = new telegraf_1.Telegraf('6497712466:AAGqtXsT9xtnESw_gGjUV0tIAOk6naTeURc');
var index_4 = require("../../db/task/index");
var addingTask = true;
exports.bot.start(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var username, userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = ctx.from.username;
                userId = ctx.from.id;
                if (!userId) {
                    ctx.reply('У вас нет идентификатора пользователя в Telegram. Пожалуйста, установите его, чтобы продолжить использование бота.');
                    return [2 /*return*/];
                }
                if (!username) {
                    ctx.reply('У вас не установлено имя пользователя в Telegram. Пожалуйста, установите его, чтобы продолжить использование бота.');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index_3.User.findOne({ userId: userId })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                user = new index_3.User({ userId: userId, username: username }); // Указываем идентификатор пользователя при создании нового пользователя
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                ctx.reply('Добро пожаловать!');
                ctx.reply('Выберите действие:', telegraf_1.Markup.keyboard([
                    ['Добавить задание'],
                    ['Статистика'],
                    ['Очистить испорию заданий']
                ]).resize());
                return [2 /*return*/];
        }
    });
}); });
exports.bot.hears('Добавить задание', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        addingTask = true;
        ctx.reply('Введите текст задания:');
        return [2 /*return*/];
    });
}); });
exports.bot.hears('Статистика', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = ctx).reply;
                return [4 /*yield*/, (0, index_1.getStatistics)(ctx.message.from.id)];
            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.bot.on('text', function (ctx) {
    if (addingTask) {
        var taskId = ctx.message.from.id;
        var text = ctx.message.text;
        var task = new index_4.Task({ taskId: taskId, text: text, completed: false, startDate: new Date() }); // Используем taskId для связи с пользователем
        task.save().then(function () {
            ctx.reply('Задание добавлено!');
            addingTask = false;
        }).catch(function (err) {
            ctx.reply('Произошла ошибка при добавлении задания.');
            console.error(err);
        });
    }
});
exports.bot.action(/notCompleted_(.+)/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = ctx.callbackQuery.data.split('_')[1];
                return [4 /*yield*/, index_4.Task.findById(taskId)];
            case 1:
                task = _a.sent();
                if (task) {
                    ctx.reply("\u0417\u0430\u0434\u0430\u043D\u0438\u0435 ".concat(task.text, " \u043E\u0441\u0442\u0430\u0435\u0442\u0441\u044F \u0432 \u0441\u043F\u0438\u0441\u043A\u0435."));
                }
                else {
                    ctx.reply('Задание не найдено.');
                }
                return [2 /*return*/];
        }
    });
}); });
exports.bot.action(/completed_(.+)/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = ctx.callbackQuery.data.split('_')[1];
                return [4 /*yield*/, index_4.Task.findById(taskId)];
            case 1:
                task = _a.sent();
                if (!task) {
                    ctx.reply('Задание не найдено.');
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, index_4.Task.findByIdAndUpdate(taskId, { completed: true })];
            case 3:
                _a.sent();
                ctx.reply("\u0417\u0430\u0434\u0430\u043D\u0438\u0435 ".concat(task.text, " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E."));
                task.endDate = new Date();
                return [4 /*yield*/, task.save()];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                ctx.reply('Произошла ошибка при завершении задания.');
                console.error(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
(0, index_2.addTaskNotificationScheduler)();
function launchBot() {
    exports.bot.launch();
}
exports.launchBot = launchBot;
