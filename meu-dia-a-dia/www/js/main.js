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
    localStorage.clear();
    window.location.href = '/www';
}
