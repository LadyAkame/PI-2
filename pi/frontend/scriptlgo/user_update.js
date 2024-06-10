document.addEventListener("DOMContentLoaded", () => {
    const token = getCookie('token');
    if (!token) {
      alert("Faça o login antes de atualizar seus dados")
      window.location.href = `login.html`;
    }
  
    const form = document.querySelector("#updateForm");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const email = document.querySelector("#email").value;
        const name = document.querySelector("#name").value;
        const password = document.querySelector("#password").value;

        const token = getCookie('token');
        const tokenData = decodeToken(token);
        console.log(tokenData);

        try {
          const apiUrl = `http://127.0.0.1:5000/api/clientes/${tokenData.id}`;

          const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
            })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Usuário atualizado com sucesso!');
        }

        // redireciona se necessário.
        // window.location.href = `http://localhost:3000/`;
      } catch (error) {
        // tratar em caso de erro: mensagens, redireciona, etc.
        console.log(error.message);
      }
    }

    });
});