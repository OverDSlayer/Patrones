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
    const form = document.getElementById("registro-form");
    const resultados = document.getElementById("resultados");
  
    const ventas = [];
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const fecha = document.getElementById("fecha").value;
      const monto = document.getElementById("monto").value;
      const descripcion = document.getElementById("descripcion").value;
  
      if (!fecha || !monto) {
        alert("Por favor, complete los campos obligatorios.");
        return;
      }
  
      ventas.push({ fecha, monto, descripcion });
      alert("Venta registrada con éxito.");
      form.reset();
    });
  
    document.getElementById("diarias").addEventListener("click", () => {
      const hoy = new Date().toISOString().split("T")[0];
      const ventasHoy = ventas.filter((venta) => venta.fecha === hoy);
      mostrarResultados(ventasHoy, "Ventas Diarias");
    });
  
    document.getElementById("mensuales").addEventListener("click", () => {
      const mesActual = new Date().toISOString().slice(0, 7);
      const ventasMensuales = ventas.filter(
        (venta) => venta.fecha.slice(0, 7) === mesActual
      );
      mostrarResultados(ventasMensuales, "Ventas Mensuales");
    });
  
    document.getElementById("personalizadas").addEventListener("click", () => {
      const fechaInicio = prompt("Ingrese la fecha de inicio (YYYY-MM-DD):");
      const fechaFin = prompt("Ingrese la fecha de fin (YYYY-MM-DD):");
      const ventasPersonalizadas = ventas.filter(
        (venta) => venta.fecha >= fechaInicio && venta.fecha <= fechaFin
      );
      mostrarResultados(ventasPersonalizadas, "Ventas Personalizadas");
    });
  
    function mostrarResultados(data, titulo) {
      resultados.innerHTML = `<h3>${titulo}</h3>`;
      if (data.length === 0) {
        resultados.innerHTML += "<p>No se encontraron resultados.</p>";
      } else {
        data.forEach((venta) => {
          resultados.innerHTML += `
            <div class="venta">
              <p><strong>Fecha:</strong> ${venta.fecha}</p>
              <p><strong>Monto:</strong> S/ ${venta.monto}</p>
              <p><strong>Descripción:</strong> ${venta.descripcion || "N/A"}</p>
            </div>
          `;
        });
      }
    }
  });
  
