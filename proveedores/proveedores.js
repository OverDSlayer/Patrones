function navigateToFile(id) {
    const files = {
        inventario: "../animaciones/inventario.html",
        ventas: "../ventas/ventas.html",
        compras: "../compras/compras.html",
        proveedores: "../proveedores/proveedores.html",
        clientes: "../clientes/clientes.html",
        reportes: "../reportes/reportes.html",
        equipo: "../equipo/equipo.html",
    };

    const file = files[id];
    if (file) {
        window.location.href = file; // Redirige al archivo correspondiente
    } else {
        console.error(`No se encontró un archivo para el ID "${id}".`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const formProveedor = document.getElementById("registro-proveedor-form");
    const resultadosProveedores = document.getElementById("resultados-proveedores");
  
    const proveedores = [];
  
    formProveedor.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que el formulario recargue la página
  
      const nombre = document.getElementById("nombre").value;
      const producto = document.getElementById("producto").value;
      const cantidad = document.getElementById("cantidad").value;
      const precio = document.getElementById("precio").value;
  
      if (!nombre || !producto || !cantidad || !precio) {
        alert("Por favor, complete todos los campos.");
        return;
      }
  
      // Agregar proveedor al array temporal
      proveedores.push({ nombre, producto, cantidad, precio });
      alert("Proveedor registrado con éxito.");
      formProveedor.reset(); // Limpiar el formulario
  
      // Mostrar todos los proveedores registrados
      mostrarProveedores();
    });
  
    // Función para mostrar los proveedores registrados
    function mostrarProveedores() {
      resultadosProveedores.innerHTML = "<h3>Lista de Proveedores</h3>";
  
      if (proveedores.length === 0) {
        resultadosProveedores.innerHTML += "<p>No se han registrado proveedores.</p>";
      } else {
        proveedores.forEach((proveedor) => {
          resultadosProveedores.innerHTML += `
            <div class="proveedor">
              <p><strong>Proveedor:</strong> ${proveedor.nombre}</p>
              <p><strong>Producto/Insumo:</strong> ${proveedor.producto}</p>
              <p><strong>Cantidad:</strong> ${proveedor.cantidad}</p>
              <p><strong>Precio por unidad:</strong> S/ ${proveedor.precio}</p>
            </div>
          `;
        });
      }
    }
  });
  