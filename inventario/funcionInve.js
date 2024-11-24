// Array para almacenar los productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let searchElements = [];

// Funcionamiento de la barra de búsqueda
const searchInput = document.getElementById('#searchInput');
searchInput.addEventListener('keyup', function(event){
    searchElements = [];
    if(searchInput.value !== ''){
        productos.forEach((element) => {
            if(element.nombre.toLowerCase().includes(searchInput.value.toLowerCase())){
                searchElements.push(element);
            }
        });
        updateTable(searchElements);
    }else{
        updateTable(productos);
    }
});
function showSearchElements(){}

// Función para abrir el modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Función para registrar un nuevo producto
function registerProduct(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const marca = document.getElementById("marca").value;
    const colores = document.getElementById("colores").value;
    const disponible = document.getElementById("disponible").value;
    const categoria = document.getElementById("categoria").value; // Obtener la categoría seleccionada

    // Crear un nuevo objeto producto
    const nuevoProducto = {
        codigo,
        nombre,
        marca,
        colores,
        disponible,
        categoria  // Agregar la categoría
    };

    // Agregar el nuevo producto al array
    productos.push(nuevoProducto);

    console.log("Producto registrado:", nuevoProducto);

    // Limpiar el formulario
    document.getElementById("modal-form").reset();

    // Actualizar la tabla de productos
    updateTable();

    // Cerrar el modal
    closeModal();
}

// Función para actualizar la tabla con los productos (filtrados o todos)
function updateTable(filteredProducts = productos) {
    const tableBody = document.querySelector("table tbody");

    // Limpiar la tabla antes de agregar los nuevos productos
    tableBody.innerHTML = '';

    // Iterar sobre el array de productos (filtrados o todos) y agregar cada producto como una fila en la tabla
    filteredProducts.forEach(producto => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.marca}</td>
            <td>${producto.colores}</td>
            <td>${producto.disponible}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Función para filtrar productos por categoría
function filterByCategory(category) {
    const filteredProducts = productos.filter(producto => producto.categoria === category);
    console.log(`Filtrando por categoría: ${category}`, filteredProducts);

    // Llamar a updateTable con los productos filtrados
    updateTable(filteredProducts);
}

// Función para mostrar todos los productos
function showAllProducts() {
    console.log("Mostrando todos los productos");
    updateTable(productos);
}
