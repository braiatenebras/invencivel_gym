document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo'); // para trocar a logo do header
    const footerLogo = document.querySelector('.rodape .coluna img'); // para trocar a logo do footer

    // verificar tema salvo ao carregar a página
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        logo.src = "assets/logoazul.png";
        if (footerLogo) {
            footerLogo.src = "assets/logoazul.png";
        }
    } else {
        body.classList.remove('blue-theme');
        logo.src = "assets/logoamarelo.png";
        if (footerLogo) {
            footerLogo.src = "assets/logoamarelo.png";
        }
    }

    // configurar o botão de tema
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('blue-theme');

        // trocar as logos
        if (body.classList.contains('blue-theme')) {
            logo.src = "assets/logoazul.png";
            if (footerLogo) {
                footerLogo.src = "assets/logoazul.png";
            }
            localStorage.setItem('theme', 'blue');
        } else {
            logo.src = "assets/logoamarelo.png";
            if (footerLogo) {
                footerLogo.src = "assets/logoamarelo.png";
            }
            localStorage.setItem('theme', 'default');
        }
    });
});