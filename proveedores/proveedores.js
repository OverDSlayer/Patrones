// Singleton para la gestión de proveedores
const ProveedorManager = (function () {
  let instance;

  class ProveedorManager {
    constructor() {
      if (!instance) {
        instance = this;
        this.proveedores = JSON.parse(localStorage.getItem("proveedores")) || []; // Cargar proveedores desde localStorage
      }
      return instance;
    }

    agregarProveedor(proveedor) {
      this.proveedores.push(proveedor);
      this.guardarEnLocalStorage(); // Guardar en localStorage
      this.actualizarUI();
    }

    eliminarProveedor(index) {
      this.proveedores.splice(index, 1);
      this.guardarEnLocalStorage(); // Actualizar localStorage tras eliminar
      this.actualizarUI();
    }

    guardarEnLocalStorage() {
      localStorage.setItem("proveedores", JSON.stringify(this.proveedores));
    }

    actualizarUI() {
      const lista = document.getElementById("proveedores-lista");
      lista.innerHTML = ""; // Limpiar lista

      this.proveedores.forEach((prov, index) => {
        const li = document.createElement("li");
        li.textContent = `${prov.nombre} - ${prov.ruc} (${prov.direccion})`;

        // Botón para eliminar proveedor
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          this.eliminarProveedor(index);
        });

        li.appendChild(btnEliminar);
        lista.appendChild(li);
      });
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

// Inicializar la UI al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const gestor = new ProveedorManager();
  gestor.actualizarUI();
});
