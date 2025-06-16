document.addEventListener('DOMContentLoaded', function () {
    // Gerenciamento do tema 
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    function updateLogo(theme) {
        if (theme === 'blue') {
            logo.src = "../../assets/logoazul.png";
        } else {
            logo.src = "../../assets/logoamarelo.png";
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

    // Controle de quantidade 
    const menosBtn = document.querySelector('.menos');
    const maisBtn = document.querySelector('.mais');
    const quantidadeInput = document.getElementById('quantidade');

    if (menosBtn && maisBtn && quantidadeInput) {
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
    }

    // Carrinho de compras
    const cartCounter = document.querySelector('.carrinho-contador');
    const addToCartBtn = document.querySelector('.btn-comprar');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Atualizar contador do carrinho
    function updateCartCounter() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCounter) {
            cartCounter.textContent = totalItems;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Adicionar ao carrinho
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const product = {
                id: window.location.pathname, //
                name: document.querySelector('h1')?.textContent || 'Termogênico',
                price: parseFloat(document.querySelector('.preco')?.textContent.replace('R$ ', '').replace(',', '.')) || 50.90,
                image: document.querySelector('.imagem-produto img')?.src || '/Produtos/assets/termogenico.png',
                quantity: parseInt(quantidadeInput?.value) || 1
            };

            addToCart(product);
        });
    }

    // Função para adicionar ao carrinho
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        updateCartCounter();
        showAddedToCartMessage(product.name);
    }

    // Mostrar mensagem de produto adicionado
    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.textContent = `${productName} adicionado ao carrinho!`;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 2000);
    }

    // Inicializar contador do carrinho
    updateCartCounter();

    // Estilo para mensagem de produto adicionado
    const style = document.createElement('style');
    style.textContent = `
        .cart-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #FFD700;
            color: #111;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 3000;
        }
        
        .cart-message.show {
            opacity: 1;
        }
        
        .blue-theme .cart-message {
            background-color: #2196F3;
            color: white;
        }
    `;
    document.head.appendChild(style);
});