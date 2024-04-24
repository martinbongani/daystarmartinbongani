document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    const logout = () => {
        window.location.href = '../index.html';
    };

    logoutBtn.addEventListener('click', () => {
        logout();
    });
});
