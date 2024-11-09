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

    // Verificar se o usuário existe no banco de dados SQLite
    var db = window.sqlitePlugin.openDatabase({ name: 'meuBanco.db', location: 'default' });
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], function(tx, results) {
            if (results.rows.length > 0) {
                const user = results.rows.item(0); // Pega o primeiro usuário
                localStorage.setItem('idUser', user.id);
                localStorage.setItem('userData', JSON.stringify(user));
                console.log(localStorage.getItem('idUser'));
                console.log(localStorage.getItem('userData'));

                // Redirecionar para a página principal
                window.location.href = 'main.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        }, function(error) {
            alert('Erro ao fazer login: ' + error.message);
        });
    });
});

$('#register-btn').on('click', function () {
    const confirmation = confirm("Deseja realmente se registrar?");
    if (!confirmation) {
        alert('Registro cancelado!');
        return;
    }

    const username = $('#register-form').find('input[placeholder="Nome de usuario"]').val();
    const firstName = $('#register-form').find('input[placeholder="Primeiro nome"]').val();
    const lastName = $('#register-form').find('input[placeholder="Sobrenome"]').val();
    const email = $('#register-form').find('input[placeholder="Email"]').val();
    const password = $('#register-form').find('input[placeholder="Senha"]').val();
    const confirmPassword = $('#register-form').find('input[placeholder="Confirme a senha"]').val();
    const age = $('#age').val();

    // Validação simples
    if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
    }

    // Inserir usuário no banco de dados SQLite
    var db = window.sqlitePlugin.openDatabase({ name: 'meuBanco.db', location: 'default' });
    
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO usuarios (username, firstName, lastName, email, password, age) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, firstName, lastName, email, password, age]);
    }, function(error) {
        alert('Erro ao registrar: ' + error.message);
    }, function() {
        alert('Registro realizado com sucesso!');
        // Redirecionar para a página de login
        $('#register-form').hide();
        $('#login-form').show();
    });
});


document.addEventListener('deviceready', function() {
    alert("criando banco de dados");
    var db = window.sqlitePlugin.openDatabase({ name: 'meuBanco.db', location: 'default' });
    alert("banco de dados criado");
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, username TEXT, firstName TEXT, lastName TEXT, email TEXT, password TEXT, age INTEGER)');
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        alert('Banco de dados criado com sucesso!');
    });
});
