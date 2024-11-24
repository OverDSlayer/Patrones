// JS del sistema de ventas
class VentasFacade {
    constructor() {
        this.ventas = [];
    }

    registrarVenta(fecha, id_producto, monto) {
        if (!fecha || isNaN(id_producto) || isNaN(monto)) {
            throw new Error("Datos inválidos para registrar la venta.");
        }
        this.ventas.push({
            fecha: new Date(fecha),
            id_producto: parseInt(id_producto),
            monto: parseFloat(monto),
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
                if (!fechaInicio || !fechaFin) {
                    throw new Error("Fechas de inicio y fin requeridas para consulta personalizada.");
                }
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
    const id_producto = document.getElementById("id_producto").value;
    const monto = document.getElementById("monto").value;

    try {
        ventasFacade.registrarVenta(fecha, id_producto, monto);
        alert("¡Venta registrada exitosamente!");
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Consulta de ventas
document.getElementById("consulta-ventas").addEventListener("submit", (e) => {
    e.preventDefault();
    const tipo = document.getElementById("tipo-consulta").value;
    const fechaInicio = document.getElementById("fecha-inicio").value || null;
    const fechaFin = document.getElementById("fecha-fin").value || null;

    try {
        const resultados = ventasFacade.consultarVentas(tipo, fechaInicio, fechaFin);
        const tablaResultados = document.querySelector(".results tbody");
        tablaResultados.innerHTML = "";

        if (resultados.length === 0) {
            tablaResultados.innerHTML = `
              <tr>
                  <td colspan="4">No se encontraron ventas.</td>
              </tr>
          `;
        } else {
            resultados.forEach((venta) => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${venta.fecha.toLocaleDateString()}</td>
                    <td>${venta.id_producto}</td>
                    <td>S/${venta.monto.toFixed(2)}</td>
                `;
                tablaResultados.appendChild(fila);
            });
        }
    } catch (error) {
        alert(error.message);
    }
});
