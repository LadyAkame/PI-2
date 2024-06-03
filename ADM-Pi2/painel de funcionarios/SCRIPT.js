document.addEventListener('DOMContentLoaded', function() {
    const usersTableBody = document.querySelector('#users-table tbody');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    function renderUsers() {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            
            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            row.appendChild(usernameCell);
            
            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            row.appendChild(emailCell);
            
            usersTableBody.appendChild(row);
        });
    }

    renderUsers();

    // Get modal elements
    const modal = document.getElementById('add-employee-modal');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const closeModalSpan = document.querySelector('.close');
    const logoutBtn = document.getElementById('logout-btn');

    // Open modal
    addEmployeeBtn.onclick = function() {
        modal.style.display = 'block';
    };

    // Close modal
    closeModalSpan.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal if clicked outside of the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById('add-employee-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('new-username').value;
        const email = document.getElementById('new-email').value;
        const password = document.getElementById('new-password').value;

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Email já cadastrado!');
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Funcionário adicionado com sucesso!');
            renderUsers();
            document.getElementById('add-employee-form').reset();
            modal.style.display = 'none';
        }
    });

    // Logout
    logoutBtn.onclick = function() {
        localStorage.removeItem('currentUser'); // Se necessário
        window.location.href = '../ADM-LOG.html'; // Redireciona para a página de login
    };
});


// excluir e editar


document.addEventListener('DOMContentLoaded', function() {
    const usersTableBody = document.querySelector('#users-table tbody');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const addEmployeeModal = document.getElementById('add-employee-modal');
    const editEmployeeModal = document.getElementById('edit-employee-modal');
    const closeModals = document.querySelectorAll('.close');
    const addEmployeeForm = document.getElementById('add-employee-form');
    const editEmployeeForm = document.getElementById('edit-employee-form');

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        usersTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="delete-btn" data-index="${index}">Excluir</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editUser(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteUser(index);
            });
        });
    }

    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    function editUser(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users[index];
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-password').value = user.password;
        editEmployeeModal.style.display = 'block';
    }

    addEmployeeBtn.addEventListener('click', () => {
        addEmployeeModal.style.display = 'block';
    });

    closeModals.forEach(close => {
        close.addEventListener('click', () => {
            addEmployeeModal.style.display = 'none';
            editEmployeeModal.style.display = 'none';
        });
    });

    addEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('new-username').value;
        const email = document.getElementById('new-email').value;
        const password = document.getElementById('new-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        loadUsers();
        addEmployeeModal.style.display = 'none';
    });

    editEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const index = document.getElementById('edit-index').value;
        const username = document.getElementById('edit-username').value;
        const email = document.getElementById('edit-email').value;
        const password = document.getElementById('edit-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users[index] = { username, email, password };
        localStorage.setItem('users', JSON.stringify(users));

        loadUsers();
        editEmployeeModal.style.display = 'none';
    });

    loadUsers();
});
