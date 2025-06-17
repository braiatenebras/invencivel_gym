// Funções auxiliares
function redirectToLogin() {
    // Adiciona timestamp para evitar cache
    window.location.href = "pages/Formulário de Cadastro/form.html?t=" + Date.now();
}

function confirmLogout() {
    firebase.auth().signOut().then(() => {
        showToast('Você foi desconectado com sucesso!', 'success');
        // Limpa o histórico de navegação
        window.history.replaceState(null, null, window.location.href);
        setTimeout(() => {
            redirectToLogin();
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
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                    data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// Verificação robusta de autenticação
function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
        const accessDeniedModal = new bootstrap.Modal(document.getElementById('accessDeniedModal'));

        if (!user) {
            // Força recarregamento se detectar navegação via botão voltar
            if (performance.navigation.type === 2 || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
                window.location.reload(true);
            }
            accessDeniedModal.show();
        } else {
            initPage(user);
        }
    });
}

// Configuração da página para usuário logado
function initPage(user) {
    // Transforma o botão Cadastro em Sair
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        authLink.innerHTML = '<span>Sair</span>';
        authLink.href = '#';
        authLink.onclick = (e) => {
            e.preventDefault();
            new bootstrap.Modal(document.getElementById('logoutModal')).show();
        };
    }

    // Configuração do tema (mantido do seu código original)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');
    const footerLogo = document.querySelector('.rodape .coluna img');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
        logo.src = "assets/logoazul.png";
        if (footerLogo) footerLogo.src = "assets/logoazul.png";
    }

    themeToggle.addEventListener('click', () => {
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

// Eventos para lidar com carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();

    // Mostrar modal de boas-vindas se acabou de logar
    if (sessionStorage.getItem('justLoggedIn')) {
        new bootstrap.Modal(document.getElementById('welcomeModal')).show();
        sessionStorage.removeItem('justLoggedIn');
        // Limpa o estado de navegação
        window.history.replaceState(null, null, window.location.href);
    }
});

// Detecta quando a página é carregada do cache (back/forward)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        checkAuthState();
    }
});