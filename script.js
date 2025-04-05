function logar() {
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;
    var email = document.getElementById('email').value;
    var tel = document.getElementById('tel').value;

    if (login === "" || senha === "" || email === "" || tel === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Insira um e-mail válido. (Precisa possuir o @ e o .)");
        return;
    }

    if (tel.length < 8 || isNaN(tel)) {
        alert("O telefone precisa ter pelo menos 8 dígitos.");
        return;
    }

    alert('Cadastro realizado com sucesso!');
    location.href = "exemplo.html";
}

setInterval(() => {
    document.body.classList.toggle('yellow-theme');
}, 3000);