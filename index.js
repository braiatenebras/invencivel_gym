document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        body.classList.add('blue-theme');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('blue-theme');

        // Salvar a preferência do tema
        if (body.classList.contains('blue-theme')) {
            localStorage.setItem('theme', 'blue');
        } else {
            localStorage.setItem('theme', 'default');
        }
    });
});