import readline from 'readline-sync';
import * as controlador from './controlador.js';

function menu() {
    console.log('\n=== MENU DE TAREFAS ===');
    console.log('1. Adicionar tarefa');
    console.log('2. Buscar tarefa');
    console.log('3. Atualizar tarefa');
    console.log('4. Remover tarefa');
    console.log('5. Sair');
}

async function escolherOpcao(opcao) {
    switch (opcao) {
        case '1':
            const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
            await controlador.adicionarTarefa(nomeAdicionar);
            break;
            
        case '2':
            const nomeBuscar = readline.question('Digite o nome da tarefa: ');
            const tarefa = await controlador.buscarTarefa(nomeBuscar);
            if (tarefa) {
                console.log('\n=== TAREFA ENCONTRADA ===');
                console.log(`Nome: ${tarefa.nome}`);
                console.log(`Concluída: ${tarefa.concluida ? 'Sim' : 'Não'}`);
                console.log(`ID: ${tarefa._id}`);
            } else {
                console.log('Tarefa não encontrada!');
            }
            break;
            
        case '3':
            const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
            const concluida = readline.question('Está concluída? (sim/nao): ');
            await controlador.atualizarTarefa(nomeAtualizar, concluida);
            break;
            
        case '4':
            const nomeRemover = readline.question('Digite o nome da tarefa: ');
            await controlador.removerTarefa(nomeRemover);
            break;
            
        case '5':
            console.log('Saindo do sistema...');
            process.exit(0);
            break;
            
        default:
            console.log('Opção inválida!');
    }
}

async function main() {
    console.log('Bem-vindo ao Sistema de Gerenciamento de Tarefas!');
    
    while (true) {
        menu();
        const opcao = readline.question('\nEscolha uma opcao: ');
        await escolherOpcao(opcao);
        
        readline.question('\nPressione ENTER para continuar...');
    }
}

// Executar o programa
main().catch(console.error);