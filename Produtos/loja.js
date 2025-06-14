document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo'); // para trocar a logo do header

    // Função para trocar a logo
    function updateLogo(theme) {
        if (theme === 'blue') {
            logo.src = "../assets/logoazul.png"; // Logo azul
        } else {
            logo.src = "../assets/logoamarelo.png"; // Logo padrão
        }
    }

    // verificar tema salvo ao carregar a página
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        updateLogo('blue');
    } else {
        body.classList.remove('blue-theme');
        updateLogo('default');
    }

    // configurar o botão de tema
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('blue-theme');

        // Trocar a logo com base no tema
        if (body.classList.contains('blue-theme')) {
            updateLogo('blue');
            localStorage.setItem('theme', 'blue');
        } else {
            updateLogo('default');
            localStorage.setItem('theme', 'default');
        }
    });
});
