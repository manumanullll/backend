// d) Array em memória para simular banco de dados
const tarefas = [];

// e) Listar todas as tarefas
const listar = () => {
  return tarefas;
};

// i) Buscar tarefa por ID
const buscarPeloId = (tarefaId) => {
  return tarefas.find(tarefa => tarefa.id === tarefaId) || null;
};

// l) Criar nova tarefa
const criar = (tarefa) => {
  const novaTarefa = {
    ...tarefa,
    id: Math.random().toString(36).substr(2, 4) // ID aleatório
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

// p) Atualizar tarefa existente
const atualizar = (tarefaAtualizada) => {
  const index = tarefas.findIndex(t => t.id === tarefaAtualizada.id);
  if (index === -1) return null;
  
  tarefas[index] = { ...tarefas[index], ...tarefaAtualizada };
  return tarefas[index];
};

// t) Remover tarefa
const remover = (tarefaId) => {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;
  
  return tarefas.splice(index, 1)[0];
};

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};