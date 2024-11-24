// Singleton para la gestión de proveedores
const ProveedorManager = (function () {
  let instance;

  class ProveedorManager {
    constructor() {
      if (!instance) {
        instance = this;
        this.proveedores = [];
      }
      return instance;
    }

    agregarProveedor(proveedor) {
      this.proveedores.push(proveedor);
      this.actualizarUI();
    }

    actualizarUI() {
      const lista = document.getElementById("proveedores-lista");
      lista.innerHTML = ""; // Limpiar lista
      this.proveedores.forEach((prov, index) => {
        const li = document.createElement("li");
        li.textContent = `${prov.nombre} - ${prov.producto} (${prov.cantidad})`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.addEventListener("click", () => this.eliminarProveedor(index));
        li.appendChild(btnEliminar);
        lista.appendChild(li);
      });
    }

    eliminarProveedor(index) {
      this.proveedores.splice(index, 1);
      this.actualizarUI();
    }
  }

  return ProveedorManager;
})();

// Configuración del formulario
document.getElementById("proveedorForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const producto = document.getElementById("producto").value;
  const cantidad = document.getElementById("cantidad").value;

  const gestor = new ProveedorManager();
  gestor.agregarProveedor({ nombre, producto, cantidad });

  document.getElementById("proveedorForm").reset();
});
