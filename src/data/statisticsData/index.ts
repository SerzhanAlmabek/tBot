import { Task } from "../../db/task";
import { calculateAverageTime } from "../../utils/calculateAverageTime";

export async function getStatistics(taskId) {
    const tasks = await Task.find({ taskId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const averageTime = calculateAverageTime(tasks);
    return `Total tasks: ${totalTasks}\nCompleted tasks: ${completedTasks}\nAverage time: ${averageTime}`;
};