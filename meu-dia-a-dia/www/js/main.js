window.onload = function() {
    if (localStorage.getItem("idUser") === null) {
        window.location.href = '/www';
    }

    document.querySelector('.btn-logout').addEventListener('click', logout);
};

window.addEventListener('beforeunload', function () {
    localStorage.clear();
});

function logout() {
    navigator.notification.confirm(
        'Você tem certeza que deseja sair?',
        function(buttonIndex) {
            if (buttonIndex === 1) {  
                localStorage.removeItem('user');
                
                window.location.href = "/login";

                if (navigator.app) {
                    navigator.app.exitApp();
                }
            }
        },
        'Confirmar Logout',
        ['Sim', 'Não']
    );
}
