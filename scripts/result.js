(function () {
    const Result = {
        init() {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            if (userData) {
                document.getElementById('result-score').innerText = userData.score + '/' + userData.total;
            } else {
                location.href = 'index.html';
            }
        }
    };

    Result.init();
})();
