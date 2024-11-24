// login.js

// Credenciales almacenadas en un array de objetos
const users = [
    { username: "admin", password: "admin123" }
];

// Manejo del formulario
const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación de las credenciales
    const userExists = users.some(user => user.username === username && user.password === password);

    if (userExists) {
        // Redirige al usuario a otra página o muestra un mensaje de éxito
        alert("Login successful!");
        window.location.href = "../reportes/reportes.html"; // Cambia a la página deseada
    } else {
        // Muestra el mensaje de error
        errorMessage.style.display = "block";
    }
});
