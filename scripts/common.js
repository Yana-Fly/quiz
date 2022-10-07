function checkUserData() {
    if (!sessionStorage.getItem('userData')) {
        location.href = 'index.html';
    }
}
