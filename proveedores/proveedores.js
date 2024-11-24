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
        li.textContent = `${prov.nombre} - ${prov.ruc} (${prov.direccion})`;
        const btnEliminar = document.createElement("button");
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
  const ruc = document.getElementById("ruc").value;
  const direccion = document.getElementById("direccion").value;

  const gestor = new ProveedorManager();
  gestor.agregarProveedor({ nombre, ruc, direccion });

  document.getElementById("proveedorForm").reset();
});
