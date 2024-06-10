document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login').value;
        const senha1 = document.getElementById('senha').value;
        const apiUrl = 'http://127.0.0.1:5000/api/clientes/login';
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: senha1
            })
        });
        const data = await response.json();
        if (response.ok) {
            setCookie('token', data.accessToken);
            console.log(decodeToken(data.accessToken));
            // Redireciona se necessário
            window.location.href = 'ingressos.html';
        } else {
            console.log(data.error);
        }
    });
});
