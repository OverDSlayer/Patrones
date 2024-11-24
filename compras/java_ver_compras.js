// Array para almacenar las compras (simulación de almacenamiento)
const compras = JSON.parse(localStorage.getItem("compras")) || [];

// Función para cargar las compras en la lista
function cargarCompras() {
    const comprasList = document.getElementById("compras-list");
    const montoTotalEl = document.getElementById("monto-total");
    comprasList.innerHTML = ""; // Limpiar contenido previo
    let montoTotal = 0;

    compras.forEach((compra, index) => {
        const card = document.createElement("div");
        card.classList.add("compra-card");

        card.innerHTML = `
            <div class="compra-info">
                <p><strong>Fecha:</strong> ${compra.fecha}</p>
                <p><strong>Fecha Documento:</strong> ${compra.fechaDocumento}</p>
                <p><strong>Proveedor:</strong> ${compra.proveedor.nombre}</p>
                <p><strong>RUC:</strong> ${compra.proveedor.ruc}</p>
                <p><strong>Serie:</strong> ${compra.documento.serie}</p>
                <p><strong>Número:</strong> ${compra.documento.numero}</p>
                <p><strong>Total a Pagar:</strong> S/ ${compra.totalPagar.toFixed(2)}</p>
            </div>
            <div class="compra-actions">
                <button class="eliminar-compra" onclick="eliminarCompra(${index})">Eliminar</button>
            </div>
        `;

        comprasList.appendChild(card);
        montoTotal += compra.totalPagar;
    });

    if (compras.length === 0) {
        comprasList.innerHTML = "<p style='text-align: center;'>No hay compras registradas.</p>";
    }

    montoTotalEl.textContent = `S/ ${montoTotal.toFixed(2)}`;
}

// Función para eliminar una compra
function eliminarCompra(index) {
    compras.splice(index, 1); // Eliminar la compra del array
    localStorage.setItem("compras", JSON.stringify(compras)); // Actualizar almacenamiento local
    cargarCompras(); // Recargar la lista
}

// Función para descargar las compras como TXT
function descargarComprasTxt() {
    if (compras.length === 0) {
        alert("No hay compras para descargar.");
        return;
    }

    let contenido = "Compras Registradas\n\n";
    let montoTotal = 0;

    compras.forEach((compra, index) => {
        contenido += `Compra ${index + 1}:\n`;
        contenido += `Fecha: ${compra.fecha}\n`;
        contenido += `Fecha Documento: ${compra.fechaDocumento}\n`;
        contenido += `Proveedor: ${compra.proveedor.nombre}\n`;
        contenido += `RUC: ${compra.proveedor.ruc}\n`;
        contenido += `Serie: ${compra.documento.serie}\n`;
        contenido += `Número: ${compra.documento.numero}\n`;
        contenido += `Total a Pagar: S/ ${compra.totalPagar.toFixed(2)}\n\n`;
        contenido += "---------------------------------------\n\n";
        montoTotal += compra.totalPagar;
    });

    contenido += `Monto Total de las Compras: S/ ${montoTotal.toFixed(2)}\n`;

    // Crear el archivo TXT y descargarlo
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "compras.txt";
    link.click();

    URL.revokeObjectURL(url);
}

// Función para volver a la página anterior
function volverPaginaAnterior() {
    window.history.back();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", cargarCompras);
document.getElementById("download-txt").addEventListener("click", descargarComprasTxt);
document.getElementById("back-button").addEventListener("click", volverPaginaAnterior);
