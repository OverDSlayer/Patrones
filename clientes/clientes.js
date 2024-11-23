document.addEventListener('DOMContentLoaded', loadClients);

const addClientBtn = document.getElementById('addClientBtn');
const clientForm = document.getElementById('clientForm');
const cancelBtn = document.getElementById('cancelBtn');
const clientFormSubmit = document.getElementById('clientFormSubmit');
const messageContainer = document.getElementById('messageContainer');

let clients = JSON.parse(localStorage.getItem('clients')) || [];

addClientBtn.addEventListener('click', () => {
    showClientForm('add');
});

cancelBtn.addEventListener('click', () => {
    hideClientForm();
});

clientFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientId = document.getElementById('clientId').value;
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;

    if (clientId) {
        // Edit client
        updateClient(clientId, clientName, clientEmail);
    } else {
        // Add new client
        addClient(clientName, clientEmail);
    }
});

function loadClients() {
    const clientsList = document.getElementById('clientsList');
    clientsList.innerHTML = '';
    clients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>
                <button class="edit-btn" onclick="showClientForm('edit', ${client.id})">Editar</button>
                <button class="delete-btn" onclick="deleteClient(${client.id})">Eliminar</button>
            </td>
        `;
        clientsList.appendChild(tr);
    });
}

function addClient(name, email) {
    const clientId = Date.now();
    const newClient = { id: clientId, name, email };
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
    showMessage('Cliente agregado con éxito', 'success');
    hideClientForm();
}

function showClientForm(mode, clientId = null) {
    clientForm.style.display = 'block';
    document.getElementById('formTitle').textContent = mode === 'edit' ? 'Editar Cliente' : 'Agregar Cliente';
    if (mode === 'edit') {
        const client = clients.find(c => c.id === clientId);
        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientEmail').value = client.email;
    } else {
        document.getElementById('clientFormSubmit').reset();
    }
}

function hideClientForm() {
    clientForm.style.display = 'none';
}

function updateClient(clientId, name, email) {
    const client = clients.find(c => c.id === clientId);
    client.name = name;
    client.email = email;
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
    showMessage('Cliente actualizado con éxito', 'success');
    hideClientForm();
}

function deleteClient(clientId) {
    clients = clients.filter(client => client.id !== clientId);
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
    showMessage('Cliente eliminado con éxito', 'success');
}

function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.style.color = type === 'success' ? '#28a745' : '#dc3545';
}


