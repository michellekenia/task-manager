const apiUrl = 'http://localhost:3000/tasks';

async function adicionarTarefa() {
    const tarefaInput = document.getElementById('nova-tarefa');
    const titulo = tarefaInput.value;

    if (!titulo) {
        alert('Por favor, insira um título para a tarefa.');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: titulo }),
    });

    if (response.ok) {
        tarefaInput.value = ''; 
        listarTarefas(); 
    } else {
        alert('Erro ao adicionar tarefa.');
    }
}

async function listarTarefas(status = '') {
    const response = await fetch(`${apiUrl}?status=${status}`);
    const tarefas = await response.json();
    const listaTarefas = document.getElementById('lista-tarefas');


    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = `${tarefa.title} - Status: ${tarefa.status}`;

        const botaoAtualizar = document.createElement('button');
        botaoAtualizar.textContent = tarefa.status === 'PENDING' ? 'Concluir' : 'Reabrir';
        botaoAtualizar.onclick = () => atualizarTarefa(tarefa.id, tarefa.status === 'PENDING' ? 'COMPLETED' : 'PENDING');


        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerTarefa(tarefa.id);

        li.appendChild(botaoAtualizar);
        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
    });
}

async function atualizarTarefa(id, status) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    });

    if (response.ok) {
        listarTarefas(); 
    } else {
        alert('Erro ao atualizar a tarefa.');
    }
}

async function removerTarefa(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        listarTarefas(); 
    } else {
        alert('Erro ao remover a tarefa.');
    }
}

function toggleTarefas() {
    const listaTarefas = document.getElementById('lista-tarefas');
    listaTarefas.style.display = listaTarefas.style.display === 'none' ? 'block' : 'none';
}

async function listarTarefasPendentes() {
    await listarTarefas('PENDING');
}

async function listarTarefasConcluidas() {
    await listarTarefas('COMPLETED');
}

window.onload = listarTarefas;
