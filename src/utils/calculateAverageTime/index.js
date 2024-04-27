"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageTime = void 0;
function calculateAverageTime(tasks) {
    if (tasks.length === 0) {
        return 'нет данных';
    }
    var validTasks = tasks.filter(function (task) { return task.startDate && task.endDate !== null && task.endDate !== undefined; });
    var totalDuration = validTasks.reduce(function (acc, task) {
        var start = task.startDate;
        var end = task.endDate;
        var duration = end.getTime() - start.getTime();
        return acc + duration;
    }, 0);
    var averageDuration = totalDuration / validTasks.length;
    var hours = Math.floor(averageDuration / (1000 * 60 * 60));
    var minutes = Math.floor((averageDuration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((averageDuration % (1000 * 60)) / 1000);
    var formattedDuration = "".concat(hours, " \u0447\u0430\u0441\u043E\u0432 ").concat(minutes, " \u043C\u0438\u043D\u0443\u0442 ").concat(seconds, " \u0441\u0435\u043A\u0443\u043D\u0434");
    return formattedDuration;
}
exports.calculateAverageTime = calculateAverageTime;
