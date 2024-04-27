const cron = require('node-cron');
import { Task } from "../../db/task/index";
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('6497712466:AAGqtXsT9xtnESw_gGjUV0tIAOk6naTeURc');

export async function addTaskNotificationScheduler() {
    cron.schedule('* * * * *', async () => {
        console.log('Проверка невыполненных заданий и отправка уведомлений');
        const tasks = await Task.find({ completed: false});
        if (tasks.length > 0) {
            for (const task of tasks) {
                const userId = task.taskId;
                const text = task.text;

                await bot.telegram.sendMessage(userId, `Вы выполнили задание? : ${text}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Да', callback_data: `completed_${task._id}` }],
                            [{ text: 'Нет', callback_data: `notCompleted_${task._id}` }]
                        ]
                    }
                });
                await task.save();
            }
        } else {
            console.log('Нет новых невыполненных заданий для отправки уведомлений');
        }
    });
}
