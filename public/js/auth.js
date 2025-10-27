// auth.js
window.onload = function() {
    fetch('/check-auth')
        .then(response => response.json())
        .then(data => {
            const menu = document.getElementById('menu');
            if (data.authenticated) {
                menu.style.display = 'block'; // Se autenticado, exibe o menu
            } else {
                menu.style.display = 'none'; // Se não autenticado, oculta o menu
            }
        })
        .catch(error => console.error('Erro ao verificar autenticação:', error));
};