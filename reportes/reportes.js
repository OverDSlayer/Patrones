document.addEventListener('DOMContentLoaded', loadSalesData);

const reportForm = document.getElementById('reportForm');
const clearReportsBtn = document.getElementById('clearReportsBtn');
const salesChartCanvas = document.getElementById('salesChart').getContext('2d');
const monthlySalesChartCanvas = document.getElementById('monthlySalesChart').getContext('2d');
const totalIncomeElement = document.getElementById('totalIncome');
const growthPercentageElement = document.getElementById('growthPercentage');
const topProductsList = document.getElementById('topProducts');

let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
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
    if (salesData.length === 0) {
        alert("No hay datos de ventas en el localStorage.");
    } else {
        chart.data.datasets[0].data = salesData;
        chart.update();

        showTotalIncome();
        showMonthlySalesChart();
        showGrowthPercentage();
        showTopProducts();
    }
}

function addSalesData() {
    const monthName = document.getElementById('month').value.trim().toLowerCase();
    const sales = parseInt(document.getElementById('sales').value);

    const monthIndex = months.findIndex(month => month.toLowerCase() === monthName);

    if (monthIndex !== -1) {
        salesData[monthIndex] = sales;
        localStorage.setItem('salesData', JSON.stringify(salesData));

        chart.data.datasets[0].data = salesData;
        chart.update();

        showTotalIncome();
        showMonthlySalesChart();
        showGrowthPercentage();
    } else {
        alert("Mes no válido. Por favor ingrese un mes correcto.");
    }
}

// Agregar datos de ventas
reportForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addSalesData();
});

// Eliminar todos los reportes
clearReportsBtn.addEventListener('click', function() {
    if (confirm("¿Estás seguro de que deseas eliminar todos los reportes?")) {
        salesData = [];
        localStorage.setItem('salesData', JSON.stringify(salesData));

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

// Reporte de Ventas por Mes
function showMonthlySalesChart() {
    new Chart(monthlySalesChartCanvas, {
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
        }
    });
}

// Reporte de Crecimiento de Ventas
function showGrowthPercentage() {
    const currentMonthSales = salesData[salesData.length - 1];
    const previousMonthSales = salesData[salesData.length - 2];
    if (previousMonthSales !== undefined) {
        const growth = ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
        growthPercentageElement.textContent = `${growth.toFixed(2)}%`;
    } else {
        growthPercentageElement.textContent = `N/A (No hay datos suficientes)`;
    }
}

// Reporte de Productos Más Vendidos
function showTopProducts() {
    topProductsList.innerHTML = '';
    const topProducts = ['Producto A', 'Producto B', 'Producto C'];  // Ejemplo de productos
    topProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        topProductsList.appendChild(li);
    });
}







