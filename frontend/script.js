const apiUrl = 'http://localhost:3000'; // URL da sua API
let token = '';

function toggleRegister() {
    const registerContainer = document.getElementById('register-container');
    registerContainer.style.display = registerContainer.style.display === 'none' ? 'block' : 'none';
}

async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        toggleRegister();
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        token = data.token;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('task-container').style.display = 'block';
    }
}

async function adicionarTarefa() {
    const novaTarefa = document.getElementById('nova-tarefa').value;

    if (!novaTarefa) {
        alert("A tarefa não pode estar vazia!");
        return;
    }

    const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: novaTarefa, status: 'PENDING' }),
    });

    const data = await response.json();
    alert('Tarefa adicionada: ' + data.title);
    document.getElementById('nova-tarefa').value = ''; // Limpa o campo após adicionar
}

function toggleTarefas() {
    const listaTarefas = document.getElementById('lista-tarefas');
    if (listaTarefas.style.display === 'none') {
        mostrarTarefas();
        listaTarefas.style.display = 'block'; // Exibe a lista
    } else {
        listaTarefas.style.display = 'none'; // Oculta a lista
    }
}

async function mostrarTarefas() {
    const response = await fetch(`${apiUrl}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        alert('Erro ao carregar as tarefas');
        return;
    }

    const tarefas = await response.json();
    const listaTarefas = document.getElementById('lista-tarefas');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de adicionar novas tarefas

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = `${tarefa.title} - ${tarefa.status}`;
        
        // Botão para atualizar o status da tarefa
        const updateButton = document.createElement('button');
        updateButton.textContent = tarefa.status === 'PENDING' ? 'Concluir' : 'Reabrir';
        updateButton.onclick = () => atualizarTarefa(tarefa.id, tarefa.status);
        
        // Botão para deletar a tarefa
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deletarTarefa(tarefa.id);
        
        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        listaTarefas.appendChild(li);
    });
}

async function atualizarTarefa(id, status) {
    const newStatus = status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
        alert('Tarefa atualizada com sucesso!');
        mostrarTarefas(); // Atualiza a lista de tarefas
    } else {
        alert('Erro ao atualizar a tarefa');
    }
}

async function deletarTarefa(id) {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        alert('Tarefa deletada com sucesso!');
        mostrarTarefas(); // Atualiza a lista de tarefas
    } else {
        alert('Erro ao deletar a tarefa');
    }
}

function logout() {
    token = '';
    document.getElementById('task-container').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
}
