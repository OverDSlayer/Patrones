document.addEventListener('DOMContentLoaded', loadSalesData);

const clearReportsBtn = document.getElementById('clearReportsBtn');
const salesChartCanvas = document.getElementById('salesChart').getContext('2d');
const totalIncomeElement = document.getElementById('totalIncome');
const growthPercentageElement = document.getElementById('growthPercentage');
const topProductsList = document.getElementById('topProducts');

let salesData = JSON.parse(localStorage.getItem('ventas')) || [];

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const chart = new Chart(salesChartCanvas, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Ventas ($)',
            data: salesData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            y: { beginAtZero: true },
        },
    },
});

function loadSalesData() {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    if (ventas.length === 0) {
        alert("No hay datos de ventas en el localStorage.");
        return;
    }

    // Extraer solo los montos de las ventas
    salesData = ventas.map((venta) => venta.monto);
    chart.data.datasets[0].data = salesData;
    chart.update();

    showTotalIncome();
    showMonthlySalesChart();
    showGrowthPercentage();
    showTopProducts();
}
let ventasPorMes = new Array(12).fill(0);


// Eliminar todos los reportes
clearReportsBtn.addEventListener('click', function () {
    if (confirm("¿Estás seguro de que deseas eliminar todos los reportes?")) {
        salesData = [];
        localStorage.setItem('ventas', JSON.stringify([])); // Sincronización correcta

        chart.data.datasets[0].data = salesData;
        chart.update();

        showTotalIncome();
        showMonthlySalesChart();
        showGrowthPercentage();
        showTopProducts();
    }
});


// Reporte de Ingresos Totales
function showTotalIncome() {
    const totalIncome = salesData.reduce((acc, sales) => acc + sales, 0);
    totalIncomeElement.textContent = `$${totalIncome}`;
}

// Reporte de Crecimiento de Ventas
function showGrowthPercentage() {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const ventasPorMes = new Array(12).fill(0); // Reiniciar valores mensuales

    // Recorrer las ventas y sumar el monto de cada venta por mes
    ventas.forEach((venta) => {
        const mes = new Date(venta.fecha).getMonth(); // Usar la fecha de la venta
        ventasPorMes[mes] += venta.monto;
    });

    // Obtener las ventas de los últimos dos meses
    const currentMonthSales = ventasPorMes[ventasPorMes.length - 1]; // Ventas del mes actual
    const previousMonthSales = ventasPorMes[ventasPorMes.length - 2]; // Ventas del mes anterior

    // Calcular el porcentaje de crecimiento
    if (previousMonthSales !== 0 && previousMonthSales !== undefined) {
        const growth = ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
        growthPercentageElement.textContent = `${growth.toFixed(2)}%`;
    } else {
        growthPercentageElement.textContent = `N/A (No hay datos suficientes)`;
    }
}

// Reporte de Ventas Mensuales
function showMonthlySalesChart() {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const ventasPorMes = new Array(12).fill(0); // Reiniciar valores mensuales

    // Sumar el monto de las ventas por mes
    ventas.forEach((venta) => {
        const mes = new Date(venta.fecha).getMonth(); // Obtener el mes de la fecha de venta
        ventasPorMes[mes] += venta.monto;
    });

    // Actualizar gráfico
    chart.data.labels = months; // Asegurar que los meses estén correctamente
    chart.data.datasets[0].data = ventasPorMes;
    chart.update();
}

// Función para registrar ventas en la clase `VentasFacade`
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
        
        // Después de registrar, actualizar los reportes
        loadSalesData();
    } catch (error) {
        alert(error.message);
    }
});

// Reporte de Productos Más Vendidos
function showTopProducts() {
    topProductsList.innerHTML = ''; // Limpiar la lista anterior
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];

    // Agrupar ventas por producto y sumar las cantidades
    const productosVendidos = ventas.reduce((acumulador, venta) => {
        const id = venta.id_producto;
        if (!acumulador[id]) {
            acumulador[id] = { id_producto: id, cantidad: 0 };
        }
        acumulador[id].cantidad += venta.cantidad;
        return acumulador;
    }, {});

    // Convertir el objeto en un arreglo y ordenarlo por cantidad
    const ranking = Object.values(productosVendidos).sort((a, b) => b.cantidad - a.cantidad);

    // Mostrar los productos más vendidos
    ranking.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1} Producto ID: ${producto.id_producto} - Vendido: ${producto.cantidad} unidades`;
        topProductsList.appendChild(li);
    });

    if (ranking.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se han registrado ventas aún.';
        topProductsList.appendChild(li);
    }
}

