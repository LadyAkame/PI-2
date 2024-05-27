document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        alert('Email já cadastrado!');
    } else {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Conta criada com sucesso!');
        document.getElementById('chk').checked = false;
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const validUser = users.find(user => user.email === email && user.password === password);
    
    if (validUser) {
        alert('Login realizado com sucesso!');
        // Redirecionar para uma página de dashboard ou similar
        window.location.href = 'painel de funcionarios/CLTS.html';
    } else {
        alert('Email ou senha incorretos!');
    }
});
