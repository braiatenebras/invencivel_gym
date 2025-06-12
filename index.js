document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo'); // Corrigido para 'logo' (que é o ID na sua imagem)
    const footerLogo = document.querySelector('.rodape .coluna img'); // Para trocar a logo do footer também

    // Verificar tema salvo ao carregar a página
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

    // Configurar o botão de tema
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('blue-theme');
        
        // Trocar as logos
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