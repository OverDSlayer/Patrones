// Clase Singleton para manejar datos de productos
class ProductDataSingleton {
    constructor() {
        if (!ProductDataSingleton.instance) {
            // Datos iniciales de productos
            this.productData = [
                { name: "Cuadernos", sold: 150, stock: 200, supplier: "Proveedor A" },
                { name: "Lapiceros", sold: 120, stock: 300, supplier: "Proveedor B" },
                { name: "Mochilas", sold: 80, stock: 50, supplier: "Proveedor C" },
                { name: "Reglas", sold: 60, stock: 100, supplier: "Proveedor D" },
                { name: "Borradores", sold: 30, stock: 150, supplier: "Proveedor E" }
            ];
            // Guardar esta instancia como la única instancia (Singleton)
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
        updateChart();
    }
}

// Instancia única del Singleton
const productDataInstance = new ProductDataSingleton();

// Función para actualizar el gráfico con datos actuales
function updateChart() {
    const labels = productDataInstance.getProductData().map(item => item.name);
    const sales = productDataInstance.getProductData().map(item => item.sold);

    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = sales;
    salesChart.update();
}

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

// Crear el gráfico de barras al cargar la página
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

// Función para el menú desplegable
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
}
