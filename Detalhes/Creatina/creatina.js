document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    // Função para trocar a logo
    function updateLogo(theme) {
        if (theme === 'blue') {
            logo.src = "../../assets/logoazul.png"; // Logo azul
        } else {
            logo.src = "../../assets/logoamarelo.png"; // Logo padrão
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

    // Controle de quantidade
    const menosBtn = document.querySelector('.menos');
    const maisBtn = document.querySelector('.mais');
    const quantidadeInput = document.getElementById('quantidade');

    menosBtn.addEventListener('click', function () {
        let value = parseInt(quantidadeInput.value);
        if (value > 1) {
            quantidadeInput.value = value - 1;
        }
    });

    maisBtn.addEventListener('click', function () {
        let value = parseInt(quantidadeInput.value);
        if (value < 10) {
            quantidadeInput.value = value + 1;
        }
    });
}); 
