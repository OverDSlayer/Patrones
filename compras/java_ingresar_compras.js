// Clase Builder para crear facturas (sin cambios)
const facturas = [];
class FacturaBuilder {
    constructor() {
        this.factura = {
            fecha: "",
            fechaDocumento: "",
            documento: {
                tipo: "Factura Electrónica",
                serie: "",
                numero: "",
            },
            proveedor: {
                ruc: "",
                nombre: "",
                direccion: "",
            },
            productos: [],
            totalSinIgv: 0,
            totalIgv: 0,
            totalPagar: 0,
        };
    }

    setFecha(fecha) {
        this.factura.fecha = fecha;
        return this;
    }

    setFechaDocumento(fechaDocumento) {
        this.factura.fechaDocumento = fechaDocumento;
        return this;
    }

    setDocumento(serie, numero) {
        this.factura.documento.serie = serie;
        this.factura.documento.numero = numero;
        return this;
    }

    setProveedor(ruc, nombre, direccion) {
        this.factura.proveedor.ruc = ruc;
        this.factura.proveedor.nombre = nombre;
        this.factura.proveedor.direccion = direccion;
        return this;
    }

    addProducto(codigo, nombre, cantidad, precio) {
        const total = cantidad * precio;
        this.factura.productos.push({ codigo, nombre, cantidad, precio, total });
        return this;
    }

    setTotales(totalSinIgv, totalIgv, totalPagar) {
        this.factura.totalSinIgv = totalSinIgv;
        this.factura.totalIgv = totalIgv;
        this.factura.totalPagar = totalPagar;
        return this;
    }

    build() {
        return this.factura;
    }
}

// Funciones para gestionar proveedores
function cargarProveedores() {
    const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const selectProveedor = document.getElementById("proveedor-select");

    selectProveedor.innerHTML = `<option value="" disabled selected>Seleccione un proveedor</option>`;
    proveedores.forEach((prov, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${prov.nombre}`;
        selectProveedor.appendChild(option);
    });
}

function actualizarCamposProveedor() {
    const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const selectProveedor = document.getElementById("proveedor-select");
    const proveedorSeleccionado = proveedores[selectProveedor.value];

    if (proveedorSeleccionado) {
        document.getElementById("ruc").value = proveedorSeleccionado.ruc;
        document.getElementById("direccion").value = proveedorSeleccionado.direccion;
    } else {
        document.getElementById("ruc").value = "";
        document.getElementById("direccion").value = "";
    }
}

// Funciones de cálculo
function calculateRowTotal(input) {
    const row = input.closest(".product-row");
    const units = parseFloat(row.querySelector(".product-units").value) || 0;
    const cost = parseFloat(row.querySelector(".product-cost").value) || 0;
    const total = units * cost;

    row.querySelector(".product-total").value = total.toFixed(2);
    updateTotals();
}

function updateTotals() {
    const productRows = document.querySelectorAll(".product-row");
    let totalConIgv = 0;

    productRows.forEach((row) => {
        const rowTotal = parseFloat(row.querySelector(".product-total").value) || 0;
        totalConIgv += rowTotal;
    });

    // El IGV es el 18% del total con IGV
    const totalIgv = totalConIgv * 0.18;

    // El total sin IGV es el total con IGV menos el IGV
    const totalSinIgv = totalConIgv - totalIgv;

    // El total a pagar es el total con IGV, ya que el total ingresado ya incluye el IGV
    const totalPagar = totalConIgv;

    // Actualizar los campos de total
    document.getElementById("total-sin-igv").value = totalSinIgv.toFixed(2);
    document.getElementById("total-igv").value = totalIgv.toFixed(2);
    document.getElementById("total-pagar").value = totalPagar.toFixed(2);
}

// Gestión de filas de productos
function addRow() {
    const container = document.getElementById("products-container");
    const newRow = document.createElement("div");
    newRow.classList.add("product-row");

    newRow.innerHTML = `
        <input type="text" class="input product-id" placeholder="Código" required>
        <input type="text" class="input product-name" placeholder="Producto" required>
        <input type="number" class="input product-units" oninput="calculateRowTotal(this)" required>
        <input type="number" class="input product-cost" oninput="calculateRowTotal(this)" required>
        <input type="number" class="input product-total" readonly>
    `;

    container.appendChild(newRow);
}

// Función para guardar y cargar datos
function guardarEnLocalStorage() {
    const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
    comprasGuardadas.push(facturas[facturas.length - 1]);
    localStorage.setItem("compras", JSON.stringify(comprasGuardadas));
}

function cargarCompras() {
    const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
    if (comprasGuardadas.length > 0) {
        console.log("Compras cargadas desde localStorage:", comprasGuardadas);
    }
}

// Función para limpiar los campos después de guardar la factura
function limpiarCampos() {
    document.getElementById("fecha").value = "";
    document.getElementById("fecha-documento").value = "";
    document.getElementById("serie").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ruc").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("proveedor-select").selectedIndex = 0;

    // Limpiar filas de productos
    const productRows = document.querySelectorAll(".product-row");
    productRows.forEach(row => row.remove());

    // Limpiar totales
    document.getElementById("total-sin-igv").value = "";
    document.getElementById("total-igv").value = "";
    document.getElementById("total-pagar").value = "";
}

// Crear factura
function crearRegistro() {
    const builder = new FacturaBuilder();
    const fecha = document.getElementById("fecha").value;
    const fechaDocumento = document.getElementById("fecha-documento").value;
    const serie = document.getElementById("serie").value;
    const numero = document.getElementById("numero").value;
    const ruc = document.getElementById("ruc").value;
    const nombreProveedor = document.getElementById("proveedor-select").options[document.getElementById("proveedor-select").selectedIndex].text.split(" - ")[0];
    const direccion = document.getElementById("direccion").value;

    const productRows = document.querySelectorAll(".product-row");
    productRows.forEach((row) => {
        const codigo = row.querySelector(".product-id").value;
        const nombre = row.querySelector(".product-name").value;
        const cantidad = parseFloat(row.querySelector(".product-units").value) || 0;
        const precio = parseFloat(row.querySelector(".product-cost").value) || 0;

        builder.addProducto(codigo, nombre, cantidad, precio);
    });

    const totalSinIgv = parseFloat(document.getElementById("total-sin-igv").value) || 0;
    const totalIgv = parseFloat(document.getElementById("total-igv").value) || 0;
    const totalPagar = parseFloat(document.getElementById("total-pagar").value) || 0;

    const factura = builder
        .setFecha(fecha)
        .setFechaDocumento(fechaDocumento)
        .setDocumento(serie, numero)
        .setProveedor(ruc, nombreProveedor, direccion)
        .setTotales(totalSinIgv, totalIgv, totalPagar)
        .build();

    facturas.push(factura);
    guardarEnLocalStorage();
    alert("Factura creada y guardada con éxito.");

    // Limpiar los campos
    limpiarCampos();
}

// Inicialización
window.onload = function () {
    cargarProveedores();
    document
        .getElementById("proveedor-select")
        .addEventListener("change", actualizarCamposProveedor);
    mostrarCompras();
};
