const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Подключение к базе данных
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iwiwi-2006=pickme',
    database: 'map_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения: ' + err.stack);
        return;
    }
    console.log('Подключено как ID ' + connection.threadId);
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Для обслуживания статических файлов

// API для получения данных
app.get('/locations', (req, res) => {
    connection.query('SELECT * FROM locations', (error, results) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ' + error.stack);
            return res.status(500).send('Ошибка сервера');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
