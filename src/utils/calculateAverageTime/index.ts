export function calculateAverageTime(tasks) {
    if (tasks.length === 0) {
        return 'нет данных';
    }
    const validTasks = tasks.filter(task => task.startDate && task.endDate !== null && task.endDate !== undefined);
    const totalDuration = validTasks.reduce((acc, task) => {
        const start = task.startDate;
        const end = task.endDate;
        const duration = end.getTime() - start.getTime();
        return acc + duration;
    }, 0);
    const averageDuration = totalDuration / validTasks.length;
    const hours = Math.floor(averageDuration / (1000 * 60 * 60));
    const minutes = Math.floor((averageDuration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((averageDuration % (1000 * 60)) / 1000);
    const formattedDuration = `${hours} часов ${minutes} минут ${seconds} секунд`;
    return formattedDuration;
}