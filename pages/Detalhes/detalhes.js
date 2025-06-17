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

    // Carregar detalhes do produto e produtos relacionados
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const produto = data.produtos.find(p => p.id == produtoId);
            if (produto) {
                // Carrega informações do produto principal
                document.getElementById('produto-nome').textContent = produto.nome;
                document.getElementById('produto-imagem').src = produto.imagem;
                document.getElementById('produto-descricao').textContent = produto.descricao;
                document.getElementById('produto-preco').textContent = produto.preco;

                if (produto.vendidos) {
                    document.getElementById('produto-vendidos').textContent = `${produto.vendidos} Vendidos`;
                } else {
                    document.getElementById('produto-vendidos').textContent = '';
                }

                if (produto.avaliacoes) {
                    document.getElementById('produto-avaliacoes').textContent = `(${produto.avaliacoes} avaliações)`;
                } else {
                    document.getElementById('produto-avaliacoes').textContent = '';
                }

                // Adiciona estrelas de avaliação
                const estrelasContainer = document.getElementById('produto-avaliacao');
                estrelasContainer.innerHTML = ''; // Limpa estrelas existentes

                if (produto.avaliacao) {
                    for (let i = 0; i < Math.floor(produto.avaliacao); i++) {
                        estrelasContainer.innerHTML += '<i class="fas fa-star"></i>';
                    }
                    if (produto.avaliacao % 1 !== 0) {
                        estrelasContainer.innerHTML += '<i class="fas fa-star-half-alt"></i>';
                    }
                }

                // Adiciona benefícios
                const beneficiosContainer = document.getElementById('produto-beneficios');
                beneficiosContainer.innerHTML = '';

                if (produto.beneficios && produto.beneficios.length > 0) {
                    produto.beneficios.forEach(beneficio => {
                        const li = document.createElement('li');
                        li.textContent = beneficio;
                        beneficiosContainer.appendChild(li);
                    });
                }

                // Carrega produtos relacionados
                if (produto.relacionados && produto.relacionados.length > 0) {
                    loadRelatedProducts(produto.relacionados, data.produtos);
                    document.querySelector('.produtos-relacionados').style.display = 'block'; // garante visibilidade
                } else {
                    document.querySelector('.produtos-relacionados').style.display = 'none';
                }
            } else {
                document.getElementById('produto-nome').textContent = 'Produto não encontrado';
                document.querySelector('.produtos-relacionados').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os detalhes do produto:', error);
            document.querySelector('.produtos-relacionados').style.display = 'none';
        });

    function loadRelatedProducts(relatedProducts, allProducts) {
        const container = document.getElementById('produtos-relacionados');
        container.innerHTML = '';

        if (!relatedProducts || relatedProducts.length === 0) {
            document.querySelector('.produtos-relacionados').style.display = 'none';
            return;
        } else {
            document.querySelector('.produtos-relacionados').style.display = 'block';
        }

        const relacionadosContainer = document.createElement('div');
        relacionadosContainer.className = 'relacionados-container';

        relatedProducts.forEach(related => {
            const fullProduct = allProducts.find(p => p.nome === related.nome);

            if (fullProduct) {
                const href = `detalhes.html?id=${fullProduct.id}`;
                const productCard = document.createElement('div');
                productCard.className = 'produto-card';
                productCard.innerHTML = `
                        <a href="${href}">
                            <img src="${fullProduct.imagem}" alt="${fullProduct.nome}">
                            <h3>${fullProduct.nome}</h3>
                            <p class="preco">${fullProduct.preco}</p>
                        </a>
                    `;
                relacionadosContainer.appendChild(productCard);
            }
        });

        container.appendChild(relacionadosContainer);
    }


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
            const productName = document.getElementById('produto-nome').textContent;
            const precoText = document.getElementById('produto-preco').textContent.replace('R$ ', '').replace('.', '').replace(',', '.').trim();
            const productPrice = parseFloat(precoText);
            const productImage = document.getElementById('produto-imagem').src;

            const product = {
                id: produtoId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: parseInt(quantidadeInput.value)
            };

            addToCart(product);
        });
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        // limite de 10 no carrinho
        if (totalItems + product.quantity > 10) {
            alert('O máximo de itens no carrinho é 10, remova ou finalize sua compra!');
            return;
        }

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        updateCartCounter();
        showAddedToCartMessage(product.name);
    }

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

    updateCartCounter();
});

