const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar e usar rotas
const tarefaRouter = require('./routes/tarefaRouter');
app.use('/tarefas', tarefaRouter);

module.exports = app;