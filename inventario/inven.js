// Función para cargar códigos únicos en el <select>
function cargarCodigos() {
    const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
    const selectCodigo = document.getElementById("codigo");

    // Limpiar opciones previas
    selectCodigo.innerHTML = `<option value="" disabled selected>Seleccione un código</option>`;

    const productosUnicos = {};

    // Extraer productos únicos de las facturas
    comprasGuardadas.forEach(factura => {
        factura.productos.forEach(producto => {
            if (!productosUnicos[producto.codigo]) {
                productosUnicos[producto.codigo] = {
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    cantidad: producto.cantidad,
                };
            } else {
                // Sumar cantidades si el producto ya existe
                productosUnicos[producto.codigo].cantidad += producto.cantidad;
            }
        });
    });

    // Agregar códigos únicos al <select>
    Object.values(productosUnicos).forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.codigo; // El valor será el código del producto
        option.textContent = producto.codigo; // Texto visible
        selectCodigo.appendChild(option);
    });
}

// Función para rellenar los detalles del producto seleccionado
function fillProductDetails(codigo) {
    const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
    let productoEncontrado = null;

    // Buscar el producto por su código en todas las facturas
    comprasGuardadas.some(factura => {
        productoEncontrado = factura.productos.find(producto => producto.codigo === codigo);
        return productoEncontrado; // Detener búsqueda si se encuentra el producto
    });

    // Completar los campos del formulario si el producto es encontrado
    if (productoEncontrado) {
        document.getElementById("nombre").value = productoEncontrado.nombre;
        document.getElementById("disponible").value = productoEncontrado.cantidad;
    } else {
        // Limpiar campos si no se encuentra
        document.getElementById("nombre").value = "";
        document.getElementById("disponible").value = "";
    }
}
window.onload = function () {
    cargarCodigos(); // Cargar códigos únicos en el select al inicio

    // Evento para actualizar los detalles del producto al seleccionar un código
    document.getElementById("codigo").addEventListener("change", (e) => {
        fillProductDetails(e.target.value);
    });
};
