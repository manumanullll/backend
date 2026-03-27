import { Tarefa } from './modelo.js';

export async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    await tarefa.inserir();
    console.log(`Tarefa "${nome}" adicionada com sucesso!`);
}

export async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const resultado = await tarefa.buscar();
    return resultado;
}

export async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome);
    const tarefaEncontrada = await tarefa.buscar();
    
    if (tarefaEncontrada) {
        tarefa.concluida = concluida === 'true' || concluida === '1' || concluida === 'sim';
        await tarefa.alterar();
        console.log(`Tarefa "${nome}" atualizada com sucesso!`);
    } else {
        console.log(`Tarefa "${nome}" não encontrada!`);
    }
}

export async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const tarefaEncontrada = await tarefa.buscar();
    
    if (tarefaEncontrada) {
        await tarefa.deletar();
        console.log(`Tarefa "${nome}" removida com sucesso!`);
    } else {
        console.log(`Tarefa "${nome}" não encontrada!`);
    }
}