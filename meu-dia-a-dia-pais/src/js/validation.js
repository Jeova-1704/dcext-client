if (localStorage.getItem('userId') === null) {
    window.location.href = '../../src/page/index.html';
} else {
    alert('userId: ' + localStorage.getItem('userId'));
}