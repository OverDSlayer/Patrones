// Muestra productos de ejemplo en la tabla
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Cuaderno', quantity: 100, price: 2.5 },
        { id: 2, name: 'Lápiz', quantity: 200, price: 0.5 },
    ];
    displayProducts(products);
});

function displayProducts(products) {
    const inventoryTable = document.getElementById('inventoryItems');
    inventoryTable.innerHTML = '';

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td style="background-color: #022c58;"><button onclick="editProduct(${product.id})">Editar</button></td>
        `;
        inventoryTable.appendChild(row);
    });
}

function addProduct() {
    // Código para añadir un nuevo producto al inventario
    alert("Función para agregar un nuevo producto");
}

function editProduct(id) {
    // Código para editar un producto en el inventario
    alert("Función para editar el producto con ID: " + id);
}

function redirectToInicio() {
    window.location.href = "principal.html";
}

function redirectToInforme() {
    window.location.href = "informe.html";
}