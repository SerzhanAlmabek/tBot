import mongoose from 'mongoose';
import { bot, launchBot } from '../src/bot/botSetup/index';
mongoose.connect('mongodb://127.0.0.1:27017/auth');

mongoose.connection.on('error', err => {
    console.error('Ошибка подключения к базе данных:', err);
});

mongoose.connection.on('open', () => {
    console.log('Подключение к базе данных установлено');
    launchBot();
});