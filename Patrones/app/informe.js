function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
}
// Clase abstracta para generación de informes
class Informe {
    // Método Template Method para generar el informe
    generarInforme() {
        const datos = this.obtenerDatos();
        const informeFormateado = this.formatearInforme(datos);
        this.exportarInforme(informeFormateado);
    }

    // Método abstracto: Obtención de datos
    obtenerDatos() {
        throw new Error("Este método debe ser implementado por las subclases.");
    }

    // Método abstracto: Formateo de los datos
    formatearInforme(datos) {
        throw new Error("Este método debe ser implementado por las subclases.");
    }

    // Método abstracto: Exportación del informe
    exportarInforme(informe) {
        throw new Error("Este método debe ser implementado por las subclases.");
    }
}

// Informe de ventas
class InformeVentas extends Informe {
    obtenerDatos() {
        // Simulación de obtención de datos de ventas
        return [
            { producto: "Cuadernos", vendidos: 150 },
            { producto: "Lapiceros", vendidos: 120 },
            { producto: "Mochilas", vendidos: 140},
            { producto: "Reglas", vendidos: 200},
            { producto: "Borradores", vendidos: 100}
        ];
    }

    formatearInforme(datos) {
        return datos.map(d => `Producto: ${d.producto}, Vendidos: ${d.vendidos}`).join('\n');
    }

    exportarInforme(informe) {
        console.log("Exportando Informe de Ventas:");
        console.log(informe);
    }
}

// Informe de inventario
class InformeInventario extends Informe {
    obtenerDatos() {
        // Simulación de obtención de datos de inventario
        return [
            { producto: "Cuadernos", stock: 200 },
            { producto: "Lapiceros", stock: 300 },
            { producto: "Mochilas", vendidos: 140},
            { producto: "Reglas", vendidos: 200},
            { producto: "Borradores", vendidos: 100}
        ];
    }

    formatearInforme(datos) {
        return datos.map(d => `Producto: ${d.producto}, Stock: ${d.stock}`).join('\n');
    }

    exportarInforme(informe) {
        console.log("Exportando Informe de Inventario:");
        console.log(informe);
    }
}

// Función para generar el informe y mostrarlo en el HTML
function generarInforme(tipo) {
    let informe;
    if (tipo === 'ventas') {
        informe = new InformeVentas();
    } else if (tipo === 'inventario') {
        informe = new InformeInventario();
    }

    if (informe) {
        const informeGenerado = informe.generarInforme();
        document.getElementById("reportOutput").textContent = informeGenerado;
    }
}

function redirectToInicio() {
    window.location.href = "principal.html";
}

function redirectToInventario() {
    window.location.href = "inventario.html";
}