// Funções auxiliares
function redirectToLogin() {
    window.location.href = "Formulário de Cadastro/form.html";
}

function confirmLogout() {
    firebase.auth().signOut().then(() => {
        showToast('Você foi desconectado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = "Formulário de Cadastro/form.html";
        }, 1500);
    });
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    // Remove o toast após desaparecer
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// Verificação de autenticação
document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        const accessDeniedModal = new bootstrap.Modal(document.getElementById('accessDeniedModal'));
        const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));

        if (!user) {
            // Mostra modal de acesso negado
            accessDeniedModal.show();
        } else {
            // Mostra mensagem de boas-vindas apenas se acabou de logar
            if (sessionStorage.getItem('justLoggedIn')) {
                welcomeModal.show();
                sessionStorage.removeItem('justLoggedIn');
            }
            initPage(user);
        }
    });
});

function initPage(user) {
    // Configura o botão de login/logout
    const authLink = document.getElementById('auth-link');

    if (authLink) {
        authLink.innerHTML = '<span>Sair</span>';
        authLink.href = '#';
        authLink.onclick = function(e) {
            e.preventDefault();
            const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
            logoutModal.show();
        };
    }

    // Configuração do tema
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');
    const footerLogo = document.querySelector('.rodape .coluna img');

    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        logo.src = "assets/logoazul.png";
        if (footerLogo) footerLogo.src = "assets/logoazul.png";
    }

    // Configurar botão de tema
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('blue-theme');
        if (body.classList.contains('blue-theme')) {
            logo.src = "assets/logoazul.png";
            if (footerLogo) footerLogo.src = "assets/logoazul.png";
            localStorage.setItem('theme', 'blue');
        } else {
            logo.src = "assets/logoamarelo.png";
            if (footerLogo) footerLogo.src = "assets/logoamarelo.png";
            localStorage.setItem('theme', 'default');
        }
    });
}