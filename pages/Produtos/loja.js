document.addEventListener('DOMContentLoaded', function () {
    // ========== GERENCIAMENTO DO TEMA ==========
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    function updateLogo(theme) {
        if (theme === 'blue') {
            logo.src = "/../assets/logoazul.png";
        } else {
            logo.src = "/../assets/logoamarelo.png";
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        updateLogo('blue');
    } else {
        body.classList.remove('blue-theme');
        updateLogo('default');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('blue-theme');
        if (body.classList.contains('blue-theme')) {
            updateLogo('blue');
            localStorage.setItem('theme', 'blue');
        } else {
            updateLogo('default');
            localStorage.setItem('theme', 'default');
        }
    });

    // ========== CONTADOR DO CARRINHO ==========
    const cartCounter = document.querySelector('.carrinho-contador');

    // Atualiza o contador baseado no localStorage
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCounter) {
            cartCounter.textContent = totalItems;
        }
    }

    // Atualiza ao carregar a página
    updateCartCounter();

    // Atualiza quando o storage muda 
    window.addEventListener('storage', function () {
        updateCartCounter();
    });
});
