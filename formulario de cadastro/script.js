function logar() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (!email || !senha) {
        alert("Preencha os campos de login.");
        return false;
    }

    alert('Login realizado!');
    setTimeout(() => {
        location.href = "../index.html";
    }, 300);

    return false;
}

function cadastrar() {
    const login = document.getElementById('cad-login').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    const tel = document.getElementById('cad-tel').value;

    if (!login || !senha || !email || !tel) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Insira um e-mail válido.");
        return false;
    }

    if (tel.length < 8 || isNaN(tel)) {
        alert("O telefone precisa ter pelo menos 8 dígitos.");
        return false;
    }

    alert('Cadastro realizado com sucesso! Faça o login no site!');
    setTimeout(() => {
        location.href = "form.html";
    }, 300);

    return false;
}

function mostrarCadastro() {
    document.getElementById('form-login').classList.remove('ativo');
    document.getElementById('form-cadastro').classList.add('ativo');

    document.body.classList.remove('yellow-theme');
    document.body.classList.add('blue-theme');
}

function mostrarLogin() {
    document.getElementById('form-cadastro').classList.remove('ativo');
    document.getElementById('form-login').classList.add('ativo');

    document.body.classList.remove('blue-theme');
    document.body.classList.add('yellow-theme');
}

window.addEventListener('DOMContentLoaded', () => {
    mostrarLogin(); // Inicia com o tema amarelo e formulário de cadastro
});
