// Función para mostrar la foto seleccionada con información en el cuadro central
function showInCenter(imageSrc, name, role) {
    const centerImage = document.getElementById("center-image");
    const centerName = document.getElementById("center-name");
    const centerRole = document.getElementById("center-role");

    // Actualizar contenido del cuadro central
    centerImage.src = imageSrc;
    centerName.textContent = name;
    centerRole.textContent = role;
}
