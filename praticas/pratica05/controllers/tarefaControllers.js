const tarefaModel = require('../models/tarefaModel');

const listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

const buscarPeloId = (req, res) => {
  const resultado = tarefaModel.buscarPeloId(req.params.tarefaId);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

const criar = (req, res) => {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
};

const atualizar = (req, res) => {
  const tarefaAtualizada = {
    id: req.params.tarefaId,
    ...req.body
  };
  const resultado = tarefaModel.atualizar(tarefaAtualizada);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

const remover = (req, res) => {
  const resultado = tarefaModel.remover(req.params.tarefaId);
  if (resultado) {
    res.status(204).send();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};