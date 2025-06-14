// Função de Login
const logar = () => {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value.trim();

    if (!email || !senha) {
        alert("Preencha os campos de login.");
        return false;
    }

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(() => {
            alert('Login realizado com sucesso!');
            setTimeout(() => location.href = "../index.html", 300);
        })
        .catch((error) => {
            console.error(error);
            const mensagensErro = {
                'auth/user-not-found': 'Usuário não encontrado. Verifique o e-mail.',
                'auth/wrong-password': 'Senha incorreta. Tente novamente.',
                'auth/invalid-email': 'Formato de e-mail inválido.',
                'auth/too-many-requests': 'Muitas tentativas falhas. Tente novamente mais tarde.'
            };
            alert(mensagensErro[error.code] || 'Erro ao fazer login, verifique os dados e tente novamente.');
        });

    return false;
};

// Função de Cadastro
const cadastrar = () => {
    const login = document.getElementById('cad-login').value.trim();
    const email = document.getElementById('cad-email').value.trim();
    const senha = document.getElementById('cad-senha').value.trim();
    const tel = document.getElementById('cad-tel').value.trim();

    if (!login || !email || !senha || !tel) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Insira um e-mail válido.");
        return false;
    }

    if (tel.length < 8 || isNaN(tel)) {
        alert("O telefone precisa ter pelo menos 8 dígitos numéricos.");
        return false;
    }

    if (senha.length < 6) {
        alert("A senha precisa ter pelo menos 6 caracteres.");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
            alert('Cadastro realizado com sucesso! Faça o login no site!');
            setTimeout(() => location.href = "form.html", 300);
        })
        .catch((error) => {
            console.error(error);
            const mensagensErro = {
                'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
                'auth/invalid-email': 'Formato de e-mail inválido.',
                'auth/weak-password': 'Senha muito fraca. Escolha uma senha com pelo menos 6 caracteres.'
            };
            alert(mensagensErro[error.code] || 'Erro no cadastro: ' + error.message);
        });

    return false;
};

// Alternar para tela de Cadastro
const mostrarCadastro = () => {
    document.getElementById('form-login').classList.remove('ativo');
    document.getElementById('form-cadastro').classList.add('ativo');
    document.body.classList.remove('yellow-theme');
    document.body.classList.add('blue-theme');
};

// Alternar para tela de Login
const mostrarLogin = () => {
    document.getElementById('form-cadastro').classList.remove('ativo');
    document.getElementById('form-login').classList.add('ativo');
    document.body.classList.remove('blue-theme');
    document.body.classList.add('yellow-theme');
};

// Ao carregar a página, abrir o formulário de login
window.addEventListener('DOMContentLoaded', mostrarLogin);
