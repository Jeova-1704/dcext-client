$('#age').on('input', function() {
    var ageValue = $(this).val();
    $('.age-value').text('Idade: ' + ageValue);
});

// Exibir o formulário de registro
$('#show-register').on('click', function (e) {
    e.preventDefault();
    $('#login-form').hide();
    $('#register-form').show();
});

// Exibir o formulário de login
$('#show-login').on('click', function (e) {
    e.preventDefault();
    $('#register-form').hide();
    $('#login-form').show();
});

$('#login-btn').on('click', function () {
    const email = $('#emailLogin').val();
    const password = $('#senhaLogin').val();
    
    $.ajax({
        //url: "http://192.168.1.107:8080/api/v1/user/login", 
        url: "https://api-dcext-yxco.onrender.com/api/v1/user/login", 
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email: email, password: password }),
        success: function(response) {
            const idUser = response.id;

            localStorage.setItem('idUser', idUser);
            localStorage.setItem('username', response.username);
            localStorage.setItem('firstName', response.firstName);
            localStorage.setItem('lastName', response.lastName);
            localStorage.setItem('email', response.email);
            localStorage.setItem('age', response.age);

            window.location.href = 'main.html';
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});


$('#register-btn').on('click', function () {
    const username = $(this).find('input[placeholder="Nome de usuario"]').val();
    const firstName = $(this).find('input[placeholder="Primeiro nome"]').val();
    const lastName = $(this).find('input[placeholder="Sobrenome"]').val();
    const email = $(this).find('input[placeholder="Email"]').val();
    const password = $(this).find('input[placeholder="Senha"]').val();
    const confirmPassword = $(this).find('input[placeholder="Confirme a senha"]').val();
    const age = $('#age').val();

    // Validação simples
    if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
    }

    $.ajax({
        //url: "http://192.168.1.107:8080/api/v1/user/register",  // Altere para o IP do seu PC
        url: "https://api-dcext-yxco.onrender.com/api/v1/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            age: age
        }),
        success: function(response) {
            alert('Registro realizado com sucesso!');
            console.log(response);
            window.location.href = '';
        },
        error: function() {
            alert("Erro ao registrar.");
        }
    });
});
