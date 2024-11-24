// Clase Builder para crear facturas
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

    addProducto(producto) {
        this.factura.productos.push(producto);
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

// Array para almacenar las facturas
const facturas = [];

// Función para calcular los totales de una fila de productos
function calculateRowTotal(input) {
    const row = input.closest(".product-row");
    const units = parseFloat(row.querySelector(".product-units").value) || 0;
    const cost = parseFloat(row.querySelector(".product-cost").value) || 0;
    const total = units * cost;

    row.querySelector(".product-total").value = total.toFixed(2);

    updateTotals();
}

// Función para actualizar los totales generales
function updateTotals() {
    const productRows = document.querySelectorAll(".product-row");
    let totalSinIgv = 0;

    productRows.forEach((row) => {
        const rowTotal = parseFloat(row.querySelector(".product-total").value) || 0;
        totalSinIgv += rowTotal;
    });

    const totalIgv = totalSinIgv * 0.18;
    const totalPagar = totalSinIgv + totalIgv;

    document.getElementById("total-sin-igv").value = totalSinIgv.toFixed(2);
    document.getElementById("total-igv").value = totalIgv.toFixed(2);
    document.getElementById("total-pagar").value = totalPagar.toFixed(2);
}

// Función para añadir una nueva fila de productos
function addRow() {
    const container = document.getElementById("products-container");
    const newRow = document.createElement("div");
    newRow.classList.add("product-row");

    newRow.innerHTML = `
        <input type="text" class="input product-name" placeholder="Producto" required>
        <input type="number" class="input product-units" oninput="calculateRowTotal(this)" required>
        <input type="number" class="input product-cost" oninput="calculateRowTotal(this)" required>
        <input type="number" class="input product-total" readonly>
    `;

    container.appendChild(newRow);
}

// Función para guardar la compra en localStorage
function guardarEnLocalStorage() {
    const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
    comprasGuardadas.push(facturas[facturas.length - 1]); // Guardar la última factura agregada
    localStorage.setItem("compras", JSON.stringify(comprasGuardadas));
}

// Función para crear un registro de factura
function crearRegistro() {
    const builder = new FacturaBuilder();

    // Recuperar datos del formulario
    const fecha = document.getElementById("fecha").value;
    const fechaDocumento = document.getElementById("fecha-documento").value;
    const serie = document.getElementById("serie").value;
    const numero = document.getElementById("numero").value;
    const ruc = document.getElementById("ruc").value;
    const nombreProveedor = document.getElementById("nombre-proveedor").value;
    const direccion = document.getElementById("direccion").value;

    const productos = [];
    const productRows = document.querySelectorAll(".product-row");
    productRows.forEach((row) => {
        const nombre = row.querySelector(".product-name").value;
        const unidades = parseFloat(row.querySelector(".product-units").value) || 0;
        const costo = parseFloat(row.querySelector(".product-cost").value) || 0;
        const total = parseFloat(row.querySelector(".product-total").value) || 0;

        productos.push({ nombre, unidades, costo, total });
    });

    const totalSinIgv = parseFloat(document.getElementById("total-sin-igv").value) || 0;
    const totalIgv = parseFloat(document.getElementById("total-igv").value) || 0;
    const totalPagar = parseFloat(document.getElementById("total-pagar").value) || 0;

    // Crear la factura usando el patrón Builder
    const factura = builder
        .setFecha(fecha)
        .setFechaDocumento(fechaDocumento)
        .setDocumento(serie, numero)
        .setProveedor(ruc, nombreProveedor, direccion)
        .setTotales(totalSinIgv, totalIgv, totalPagar)
        .build();

    productos.forEach((producto) => builder.addProducto(producto));

    // Guardar la factura en el array
    facturas.push(factura);

    // Guardar en localStorage
    guardarEnLocalStorage();

    // Confirmación y limpieza
    alert("Factura ingresada correctamente");
    limpiarCampos();
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("fecha").value = "";
    document.getElementById("fecha-documento").value = "";
    document.getElementById("serie").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ruc").value = "";
    document.getElementById("nombre-proveedor").value = "";
    document.getElementById("direccion").value = "";

    const productContainer = document.getElementById("products-container");
    productContainer.innerHTML = `
        <div class="product-row">
            <input type="text" class="input product-name" placeholder="Producto" required>
            <input type="number" class="input product-units" oninput="calculateRowTotal(this)" required>
            <input type="number" class="input product-cost" oninput="calculateRowTotal(this)" required>
            <input type="number" class="input product-total" readonly>
        </div>
    `;

    document.getElementById("total-sin-igv").value = "";
    document.getElementById("total-igv").value = "";
    document.getElementById("total-pagar").value = "";
}