import { Telegraf, Markup } from 'telegraf';
import { getStatistics } from '../../data/statisticsData/index';
import { addTaskNotificationScheduler } from "../../utils/addTaskNotificationScheduler/index";
import { User } from '../../db/user/index';
export const bot = new Telegraf('6497712466:AAGqtXsT9xtnESw_gGjUV0tIAOk6naTeURc');
import {Task} from "../../db/task/index";
let addingTask = true;

bot.start(async (ctx) => {
    const username = ctx.from.username;
    const userId = ctx.from.id;

    if (!userId) {
        ctx.reply('У вас нет идентификатора пользователя в Telegram. Пожалуйста, установите его, чтобы продолжить использование бота.');
        return;
    }
    if (!username) {
        ctx.reply('У вас не установлено имя пользователя в Telegram. Пожалуйста, установите его, чтобы продолжить использование бота.');
        return;
    }
    let user = await User.findOne({ userId });

    if (!user) {
        user = new User({ userId, username }); // Указываем идентификатор пользователя при создании нового пользователя
        await user.save();
    }

    ctx.reply('Добро пожаловать!');
    ctx.reply('Выберите действие:', Markup.keyboard([
        ['Добавить задание'],
        ['Статистика'],
        ['Очистить испорию заданий']
    ]).resize());
});

bot.hears('Добавить задание', async (ctx) => {
    addingTask = true;
    ctx.reply('Введите текст задания:');
});

bot.hears('Статистика', async (ctx) => {
    await ctx.reply(await getStatistics(ctx.message.from.id));
});

bot.on('text', (ctx) => {
    if (addingTask) {
        const taskId = ctx.message.from.id;
        const text = ctx.message.text;

        const task = new Task({ taskId, text, completed: false, startDate: new Date() }); // Используем taskId для связи с пользователем
        task.save().then(() => {
            ctx.reply('Задание добавлено!');
            addingTask = false;
        }).catch((err) => {
            ctx.reply('Произошла ошибка при добавлении задания.');
            console.error(err);
        });
    }
});

bot.action(/notCompleted_(.+)/, async (ctx: any) => {
    const taskId = ctx.callbackQuery.data.split('_')[1];
    const task = await Task.findById(taskId);
    if (task) {
        ctx.reply(`Задание ${task.text} остается в списке.`);
    } else {
        ctx.reply('Задание не найдено.');
    }
});

bot.action(/completed_(.+)/, async (ctx: any) => {
    const taskId = ctx.callbackQuery.data.split('_')[1];
    const task = await Task.findById(taskId);
    if (!task) {
        ctx.reply('Задание не найдено.');
        return;
    }
    try {
        await Task.findByIdAndUpdate(taskId, { completed: true });
        ctx.reply(`Задание ${task.text} успешно завершено.`);
        task.endDate = new Date();
        await task.save();
    } catch (error) {
        ctx.reply('Произошла ошибка при завершении задания.');
        console.error(error);
    }
});

addTaskNotificationScheduler();

export function launchBot() {
    bot.launch();
}
