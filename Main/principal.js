// Clase Singleton para manejar datos de productos
class ProductDataSingleton {
    constructor() {
        if (!ProductDataSingleton.instance) {
            // Datos iniciales de productos
            this.productData = [
                { name: "Cuaderno", sold: 150, stock: 200, supplier: "Proveedor A", monthlyChange: 20 },
                { name: "Lapicero", sold: 120, stock: 300, supplier: "Proveedor B", monthlyChange: -10 },
                { name: "Mochila Escolar", sold: 80, stock: 50, supplier: "Proveedor C", monthlyChange: 15 },
                { name: "Regla", sold: 60, stock: 100, supplier: "Proveedor D", monthlyChange: 5 },
                { name: "Borrador", sold: 30, stock: 150, supplier: "Proveedor E", monthlyChange: -5 }
            ];
            ProductDataSingleton.instance = this;
        }
        return ProductDataSingleton.instance;
    }

    // Método para obtener los datos de productos
    getProductData() {
        return this.productData;
    }

    // Método para actualizar los datos de productos y actualizar el gráfico
    updateProductData(newData) {
        this.productData = newData;
        updateCharts();
    }
}

// Instancia única del Singleton
const productDataInstance = new ProductDataSingleton();

// Función para el menú desplegable
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
}

// Función para redireccionar a la página de informes
function redirectToInformes() {
    window.location.href = "informe.html";
}

// Configuración inicial para el gráfico de barras de ventas
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productDataInstance.getProductData().map(item => item.name),
        datasets: [{
            label: 'Productos más vendidos',
            data: productDataInstance.getProductData().map(item => item.sold),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        onClick: (evt, item) => {
            if (item.length > 0) {
                const index = item[0].index;
                showProductDetails(index);
            }
        }
    }
});

// Configuración inicial para el gráfico circular de porcentajes de ventas
const ctxPie = document.getElementById('salesPieChart').getContext('2d');
const salesPieChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
        labels: productDataInstance.getProductData().map(item => item.name),
        datasets: [{
            label: 'Porcentaje de ventas',
            data: calculateSalesPercentages(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'right' }
        }
    }
});

// Configuración inicial para el gráfico circular de cambios mensuales
const ctxMonthlyChangePie = document.getElementById('monthlyChangePieChart').getContext('2d');
const monthlyChangePieChart = new Chart(ctxMonthlyChangePie, {
    type: 'doughnut',
    data: {
        labels: productDataInstance.getProductData().map(item => item.name),
        datasets: [{
            label: 'Total Movimientos',
            data: calculateMonthlyChangePercentages(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'right' }
        }
    }
});

// Función para mostrar detalles de un producto al hacer clic
function showProductDetails(index) {
    const product = productDataInstance.getProductData()[index];
    const detailsContainer = document.getElementById("detailsContainer");
    const details = document.getElementById("details");

    // Mostrar detalles en el contenedor
    details.innerHTML = `
        <strong>Producto:</strong> ${product.name} <br>
        <strong>Vendidos:</strong> ${product.sold} <br>
        <strong>Stock:</strong> ${product.stock} <br>
        <strong>Proveedor:</strong> ${product.supplier}
    `;
    detailsContainer.style.display = "block";
}

// Función para calcular porcentajes de ventas
function calculateSalesPercentages() {
    const sales = productDataInstance.getProductData().map(item => item.sold);
    const totalSales = sales.reduce((a, b) => a + b, 0);
    return sales.map(sale => (sale / totalSales * 100).toFixed(2));
}

// Función para calcular el porcentaje de cambio mensual
function calculateMonthlyChangePercentages() {
    const monthlyChanges = productDataInstance.getProductData().map(item => item.monthlyChange);
    const totalMonthlyChange = monthlyChanges.reduce((a, b) => a + Math.abs(b), 0);
    return monthlyChanges.map(change => (Math.abs(change) / totalMonthlyChange * 100).toFixed(2));
}

// Función para actualizar los gráficos al modificar datos
function updateCharts() {
    const productData = productDataInstance.getProductData();
    salesChart.data.labels = productData.map(item => item.name);
    salesChart.data.datasets[0].data = productData.map(item => item.sold);
    salesChart.update();

    salesPieChart.data.labels = productData.map(item => item.name);
    salesPieChart.data.datasets[0].data = calculateSalesPercentages();
    salesPieChart.update();

    monthlyChangePieChart.data.labels = productData.map(item => item.name);
    monthlyChangePieChart.data.datasets[0].data = calculateMonthlyChangePercentages();
    monthlyChangePieChart.update();
}
function redirectToInventario() {
    window.location.href = "inventario.html";
}


