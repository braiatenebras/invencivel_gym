<?php
require_once 'Usuario.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

$usuario = new Usuario();

if ($usuario->login($email, $senha)) {
    echo "<script>alert('Login feito com sucesso!'); window.location.href='home.html';</script>";
} else {
    echo "<script>alert('Email ou senha inválidos'); window.location.href='index.html';</script>";
}
?>