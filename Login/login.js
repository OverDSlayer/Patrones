
function validateLogin(event) {
    event.preventDefault(); // Evita el envío del formulario y el recargo de la página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación de ejemplo (puedes ajustar estos valores)
    if (username === "admin" && password === "1234") {
        // Guarda el usuario en localStorage
        localStorage.setItem('loggedUser', username);
        // Redirige a la página principal
        window.location.href = "../Main/principal.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}