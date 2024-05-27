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
