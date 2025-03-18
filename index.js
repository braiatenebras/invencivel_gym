// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlP9Yw2ez6Xn9MscOi8mHhd7nQwkAN9rI",
  authDomain: "desenvolvimento-de-sist.firebaseapp.com",
  projectId: "desenvolvimento-de-sist",
  storageBucket: "desenvolvimento-de-sist.firebasestorage.app",
  messagingSenderId: "1029706646380",
  appId: "1:1029706646380:web:712cf07b1be0a95a40a949",
  measurementId: "G-BCDJZSRHQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

set (ref(DB,'usuarios/' + login),{
    login: login,
    senha: senha,
    tel: tel,
    email: email
})

then(() =>{
    alert("usuário cadastrado com sucesso!");
    location.href="indexx";
})

.catch((error) =>{
    console.error("erro ao salvar:", error);
    alert("erro ao cadastrar.");

});


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
    location.href = "home.html";
}

setInterval(() => {
    document.body.classList.toggle('yellow-theme');
}, 5000);
