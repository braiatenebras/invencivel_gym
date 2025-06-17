document.addEventListener('DOMContentLoaded', function () {
    // Gerenciamento do tema (mantido para consistência)
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

    // Gerenciamento do carrinho
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('carrinho-items');
    const totalPriceContainer = document.getElementById('total-preco');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Renderiza os itens do carrinho
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="5">Seu carrinho está vazio</td></tr>';
            totalPriceContainer.textContent = '0.00';
            return;
        }

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="celula-item">
            <img src="${item.image}" alt="${item.name}" style="height: 50px; object-fit: contain; margin-right: 10px;">
                    ${item.name}
                </td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                           class="quantity-input" data-id="${item.id}">
                </td>
                <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item" data-id="${item.id}">Remover</button></td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceContainer.textContent = total.toFixed(2);
    }

    // Remove item do carrinho
    function removeItem(id) {
        cart = cart.filter(item => String(item.id) !== String(id));
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    // Atualiza quantidade do item
    function updateQuantity(id, newQuantity) {
        const item = cart.find(item => String(item.id) === String(id));
        if (item) {
            item.quantity = parseInt(newQuantity) || 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }

    // Event delegation para os botões de remover e inputs de quantidade
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const id = event.target.getAttribute('data-id');
            removeItem(id);
        }
    });

    cartItemsContainer.addEventListener('change', function (event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = event.target.value;
            updateQuantity(id, newQuantity);
        }
    });

    // Finalizar compra
    finalizarCompraBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            alert('Compra finalizada com sucesso! Obrigado por sua compra.');
            cart = [];
            localStorage.removeItem('cart');
            renderCartItems();
        } else {
            alert('Seu carrinho está vazio! Adicione itens antes de finalizar.');
        }
    });

    // Renderiza os itens inicialmente
    renderCartItems();
});