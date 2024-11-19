document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await loginUser();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await registerUser();
        });
    }

    // Função para login
    async function loginUser() {
        alert('iniciando login');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        alert('email: ' + email + ' password: ' + password);
        try {
            const response = await fetch('https://api-dcext-yxco.onrender.com/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            alert('response: ' + response + ' data: ' + data);
            if (response.ok) {

                localStorage.setItem('userId', data.id);
                alert(localStorage.getItem('userId'));
                window.location.href = '../../src/page/index.html';

            } else {
                alert(data.message || 'Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);
            alert('Ocorreu um erro ao tentar fazer login.');
        }
    }

    // Função para registrar
    async function registerUser() {
        alert('iniciando registro');
        const username = document.getElementById('username').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email_register').value;
        const password = document.getElementById('password_register').value;

        alert('username: ' + username + ' firstName: ' + firstName + ' lastName: ' + lastName + ' age: ' + age + ' email: ' + email + ' password_register: ' + password);
        try {
            const response = await fetch('https://api-dcext-yxco.onrender.com/api/v1/user/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastName,
                    age,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            alert('response: ' + response + ' data: ' + data);
            if (response.ok) {
                alert('Conta criada com sucesso!');
                showLoginForm();
            } else {
                alert(data.message || 'Erro ao criar conta.');
            }
        } catch (error) {
            console.error('Erro na requisição de registro:', error);
            alert('Ocorreu um erro ao tentar criar conta.');
        }
    }

    // Redireciona para o formulário de login
    function showLoginForm() {
        document.getElementById('createAccountSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    }

    // Verificação de autenticação ao carregar a página
    function checkAuthentication() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            window.location.href = 'login.html'; // Redireciona para o login se não estiver autenticado
        }
    }

    // Executa a verificação de autenticação na página restrita
    if (window.location.pathname === '/pagina-restrita.html') {
        checkAuthentication();
    }
});
