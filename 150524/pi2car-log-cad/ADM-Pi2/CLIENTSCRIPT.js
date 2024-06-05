document.addEventListener('DOMContentLoaded', function() {
    const clientsTableBody = document.querySelector('#clients-table tbody');
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const currentClient = JSON.parse(localStorage.getItem('currentClient'));

    function renderClients() {
        clientsTableBody.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = client.name;
            row.appendChild(nameCell);
            
            const emailCell = document.createElement('td');
            emailCell.textContent = client.email;
            row.appendChild(emailCell);
            
            clientsTableBody.appendChild(row);
        });
    }

    // Adicionar cliente logado à lista se não estiver presente
    if (currentClient && !clients.some(client => client.email === currentClient.email)) {
        clients.push(currentClient);
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    renderClients();

    // Get modal elements
    const addClientModal = document.getElementById('add-client-modal');
    const addClientBtn = document.getElementById('add-client-btn');
    const closeModalSpan = document.querySelector('.close');
    const logoutBtn = document.getElementById('logout-btn');
    const addClientForm = document.getElementById('add-client-form');

    // Open modal
    addClientBtn.onclick = function() {
        addClientModal.style.display = 'block';
    };

    // Close modal
    closeModalSpan.onclick = function() {
        addClientModal.style.display = 'none';
    };

    // Close modal if clicked outside of the modal content
    window.onclick = function(event) {
        if (event.target === addClientModal) {
            addClientModal.style.display = 'none';
        }
    };

    addClientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('new-client-name').value;
        const email = document.getElementById('new-client-email').value;

        const clientExists = clients.some(client => client.email === email);

        if (clientExists) {
            alert('Email já cadastrado!');
        } else {
            clients.push({ name, email });
            localStorage.setItem('clients', JSON.stringify(clients));
            alert('Cliente adicionado com sucesso!');
            renderClients();
            addClientForm.reset();
            addClientModal.style.display = 'none';
        }
    });

    // Logout
    logoutBtn.onclick = function() {
        localStorage.removeItem('currentClient'); // Se necessário
        window.location.href = 'log-cad.html'; // Redireciona para a página de login
    };
});
