document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('resourceReqBtn');

    const generateResourceRequest = () => {
        window.location.href = '/pages/resourceform.html';
    };

    resourceReqBtn.addEventListener('click', () => {
        generateResourceRequest();
    });
});
