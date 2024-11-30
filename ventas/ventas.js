class VentasFacade {
    constructor() {
        // Recuperar ventas almacenadas en localStorage
        this.ventas = JSON.parse(localStorage.getItem("ventas"))?.map((venta) => ({
            ...venta,
            fecha: new Date(venta.fecha),
        })) || [];
    }

    registrarVenta(fecha, id_producto, monto, cantidad) {
        if (!fecha || isNaN(id_producto) || isNaN(monto) || isNaN(cantidad) || monto <= 0 || cantidad <= 0) {
            throw new Error("Por favor, ingresa datos válidos (valores positivos y no vacíos).");
        }

        // Normalizar la fecha para evitar problemas de zona horaria
        const [year, month, day] = fecha.split("-").map(Number);
        const fechaVenta = new Date(year, month - 1, day); // Ajustar el mes (0-indexado)

        // Buscar el producto en el inventario
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = productos.find((p) => p.codigo == id_producto);
        if (!producto) {
            throw new Error("Producto no encontrado en el inventario.");
        }

        // Verificar stock disponible
        if (producto.disponible < cantidad) {
            throw new Error(`Stock insuficiente. Solo hay ${producto.disponible} unidades disponibles.`);
        }

        // Reducir el stock y actualizar localStorage
        producto.disponible -= cantidad;
        localStorage.setItem("productos", JSON.stringify(productos));

        // Registrar la venta
        this.ventas.push({
            fecha: fechaVenta,
            id_producto: parseInt(id_producto),
            monto: parseFloat(monto),
            cantidad: parseInt(cantidad),
        });

        // Guardar ventas en localStorage
        localStorage.setItem("ventas", JSON.stringify(this.ventas));
    }

    consultarVentas(tipo, fechaInicio = null, fechaFin = null) {
        const hoy = new Date();
        switch (tipo) {
            case "diaria":
                return this.ventas.filter((venta) => this._esMismaFecha(venta.fecha, hoy));
            case "mensual":
                return this.ventas.filter(
                    (venta) =>
                        venta.fecha.getFullYear() === hoy.getFullYear() &&
                        venta.fecha.getMonth() === hoy.getMonth()
                );
            case "personalizada":
                if (!fechaInicio || !fechaFin) {
                    throw new Error("Debes proporcionar las fechas de inicio y fin para la consulta personalizada.");
                }
                // Normalizar fechas de inicio y fin
                const [inicioYear, inicioMonth, inicioDay] = fechaInicio.split("-").map(Number);
                const [finYear, finMonth, finDay] = fechaFin.split("-").map(Number);
                const inicio = new Date(inicioYear, inicioMonth - 1, inicioDay);
                const fin = new Date(finYear, finMonth - 1, finDay);

                return this.ventas.filter((venta) => venta.fecha >= inicio && venta.fecha <= fin);
            default:
                throw new Error("Tipo de consulta no válida.");
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

document.getElementById("registro-venta").addEventListener("submit", (e) => {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const id_producto = document.getElementById("id_producto").value;
    const monto = document.getElementById("monto").value;
    const cantidad = document.getElementById("cantidad").value;

    try {
        ventasFacade.registrarVenta(fecha, id_producto, monto, cantidad);
        alert("¡Venta registrada exitosamente!");
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

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
                    <td>${venta.cantidad}</td>
                `;
                tablaResultados.appendChild(fila);
            });
        }
    } catch (error) {
        alert(error.message);
    }
});

function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const selectProducto = document.getElementById("producto");

    productos.forEach((producto) => {
        const option = document.createElement("option");
        option.value = producto.codigo; // Código como valor
        option.textContent = producto.nombre; // Nombre como texto
        selectProducto.appendChild(option);
    });
}
document.getElementById("producto").addEventListener("change", () => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const codigoSeleccionado = document.getElementById("producto").value;

    const producto = productos.find((p) => p.codigo == codigoSeleccionado);
    if (producto) {
        document.getElementById("id_producto").value = producto.codigo;
        document.getElementById("precio_unitario").value = producto.precio.toFixed(2);
    }
});
document.getElementById("cantidad").addEventListener("input", () => {
    const precio = parseFloat(document.getElementById("precio_unitario").value) || 0;
    const cantidad = parseFloat(document.getElementById("cantidad").value) || 0;

    const monto = precio * cantidad;
    document.getElementById("monto").value = monto.toFixed(2);
});
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});
const tipoConsulta = document.getElementById('tipo-consulta');
const fechaInicio = document.getElementById('fecha-inicio');
const fechaFin = document.getElementById('fecha-fin');

tipoConsulta.addEventListener('change', () => {
    if (tipoConsulta.value === 'personalizada') {
        fechaInicio.disabled = false;
        fechaFin.disabled = false;
    } else {
        fechaInicio.disabled = true;
        fechaFin.disabled = true;
        fechaInicio.value = '';
        fechaFin.value = '';
    }
});

document.getElementById("cantidad").addEventListener("input", () => {
    const precio = parseFloat(document.getElementById("precio_unitario").value) || 0;
    const cantidad = parseFloat(document.getElementById("cantidad").value) || 0;

    const monto = precio * cantidad;
    document.getElementById("monto").value = monto.toFixed(2);
});

