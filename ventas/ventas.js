 // JS del sistema de ventas
 class VentasFacade {
  constructor() {
      this.ventas = [];
  }

  registrarVenta(fecha, monto, descripcion) {
      this.ventas.push({
          fecha: new Date(fecha),
          monto: parseFloat(monto),
          descripcion
      });
  }

  consultarVentas(tipo, fechaInicio = null, fechaFin = null) {
      const hoy = new Date();
      switch (tipo) {
          case "diaria":
              return this.ventas.filter((venta) =>
                  this._esMismaFecha(venta.fecha, hoy)
              );
          case "mensual":
              return this.ventas.filter(
                  (venta) =>
                      venta.fecha.getFullYear() === hoy.getFullYear() &&
                      venta.fecha.getMonth() === hoy.getMonth()
              );
          case "personalizada":
              return this.ventas.filter(
                  (venta) =>
                      venta.fecha >= new Date(fechaInicio) &&
                      venta.fecha <= new Date(fechaFin)
              );
          default:
              return [];
      }
  }

  _esMismaFecha(fecha1, fecha2) {
      return (
          fecha1.getDate() === fecha2.getDate() &&
          fecha1.getMonth() === fecha2.getMonth() &&
          fecha1.getFullYear() === fecha2.getFullYear()
      );
  }
}

const ventasFacade = new VentasFacade();

// Registro de ventas
document.getElementById("registro-venta").addEventListener("submit", (e) => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const monto = document.getElementById("monto").value;
  const descripcion = document.getElementById("descripcion").value;

  ventasFacade.registrarVenta(fecha, monto, descripcion);
  alert("¡Venta registrada exitosamente!");
  e.target.reset();
});

// Consulta de ventas
document.getElementById("consulta-ventas").addEventListener("submit", (e) => {
  e.preventDefault();
  const tipo = document.getElementById("tipo-consulta").value;
  const fechaInicio = document.getElementById("fecha-inicio").value || null;
  const fechaFin = document.getElementById("fecha-fin").value || null;

  const resultados = ventasFacade.consultarVentas(tipo, fechaInicio, fechaFin);
  const tablaResultados = document.querySelector(".results tbody");
  tablaResultados.innerHTML = "";

  if (resultados.length === 0) {
      tablaResultados.innerHTML = `
          <tr>
              <td colspan="3">No se encontraron ventas.</td>
          </tr>
      `;
  } else {
      resultados.forEach((venta) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
              <td>${venta.fecha.toLocaleDateString()}</td>
              <td>S/${venta.monto.toFixed(2)}</td>
              <td>${venta.descripcion}</td>
          `;
          tablaResultados.appendChild(fila);
      });
  }
});
