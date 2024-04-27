import { Task } from "../../db/task/taskModel";

export async function CompletedTask(taskId, ctx) {
    const task = await Task.findById(taskId);
    if (task) {
        task.completed = true;
        task.endDate = new Date();
        await task.save();
        ctx.reply(`Задание ${task.text} выполнено и удалено из списка.`);
    } else {
        ctx.reply('Задание не найдено.');
    }
}