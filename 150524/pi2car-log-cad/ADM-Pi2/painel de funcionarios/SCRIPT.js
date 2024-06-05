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

            const salaryCell = document.createElement('td');
            salaryCell.textContent = user.salary;
            row.appendChild(salaryCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = user.role;
            row.appendChild(roleCell);
            
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            `;
            row.appendChild(actionsCell);

            usersTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach((button, index) => {
            button.addEventListener('click', () => {
                editUser(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach((button, index) => {
            button.addEventListener('click', () => {
                deleteUser(index);
            });
        });
    }

    renderUsers();

    // Get modal elements
    const addEmployeeModal = document.getElementById('add-employee-modal');
    const editEmployeeModal = document.getElementById('edit-employee-modal');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const closeModals = document.querySelectorAll('.close');
    const logoutBtn = document.getElementById('logout-btn');
    const addEmployeeForm = document.getElementById('add-employee-form');
    const editEmployeeForm = document.getElementById('edit-employee-form');

    // Open modal
    addEmployeeBtn.onclick = function() {
        addEmployeeModal.style.display = 'block';
    };

    // Close modal
    closeModals.forEach(span => {
        span.onclick = function() {
            addEmployeeModal.style.display = 'none';
            editEmployeeModal.style.display = 'none';
        };
    });

    // Close modal if clicked outside of the modal content
    window.onclick = function(event) {
        if (event.target === addEmployeeModal || event.target === editEmployeeModal) {
            addEmployeeModal.style.display = 'none';
            editEmployeeModal.style.display = 'none';
        }
    };

    addEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('new-username').value;
        const email = document.getElementById('new-email').value;
        const password = document.getElementById('new-password').value;
        const salary = document.getElementById('new-salary').value;
        const role = document.getElementById('new-role').value;

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Email já cadastrado!');
        } else {
            users.push({ username, email, password, salary });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Funcionário adicionado com sucesso!');
            renderUsers();
            addEmployeeForm.reset();
            addEmployeeModal.style.display = 'none';
        }
    });

    function deleteUser(index) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
    }

    function editUser(index) {
        const user = users[index];
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-password').value = user.password;
        document.getElementById('edit-salary').value = user.salary;
        document.getElementById('edit-role').value = user.role;
        editEmployeeModal.style.display = 'block';
    }

    editEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const index = document.getElementById('edit-index').value;
        const username = document.getElementById('edit-username').value;
        const email = document.getElementById('edit-email').value;
        const password = document.getElementById('edit-password').value;
        const salary = document.getElementById('edit-salary').value;
        const role = document.getElementById('edit-role').value;

        users[index] = { username, email, password, salary, role };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Funcionário editado com sucesso!');
        renderUsers();
        editEmployeeModal.style.display = 'none';
    });

    // Logout
    logoutBtn.onclick = function() {
        localStorage.removeItem('currentUser'); // Se necessário
        window.location.href = '../ADM-LOG.html'; // Redireciona para a página de login
    };
});
