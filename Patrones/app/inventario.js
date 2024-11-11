// Array temporal para almacenar los productos
const tempProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Cuaderno', quantity: 100, price: 2.5 },
        { id: 2, name: 'Lápiz', quantity: 200, price: 0.5 },
    ];
    
    // Añadir productos iniciales al array temporal y mostrar en tabla
    products.forEach(product => tempProducts.push(product));
    displayProducts(tempProducts);
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
            <td><button onclick="editProduct(${product.id})">Editar</button></td>
        `;
        inventoryTable.appendChild(row);
    });
}

function showProductForm() {
    const formContainer = document.getElementById('productFormContainer');
    // Verifica que la propiedad display esté cambiando a 'block' para mostrar el formulario
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function addProduct() {
    // Obtener los valores del formulario
    const productName = document.getElementById('productName').value;
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    if (productName && productQuantity && productPrice) {
        // Crear nuevo producto usando el patrón Factory y añadirlo al array temporal
        const newProduct = ProductFactory.createProduct(productName, productQuantity, productPrice);
        tempProducts.push(newProduct);

        // Actualizar la tabla con el nuevo producto
        displayProducts(tempProducts);

        // Ocultar y resetear el formulario
        document.getElementById('productFormContainer').style.display = 'none';
        document.getElementById('productForm').reset();
    }
}

// Factory para crear productos
const ProductFactory = (() => {
    let productId = 3;

    return {
        createProduct: (name, quantity, price) => {
            return {
                id: productId++,
                name: name,
                quantity: quantity,
                price: price,
            };
        }
    };
})();

function editProduct(id) {
    alert("Función para editar el producto con ID: " + id);
}

function redirectToInicio() {
    window.location.href = "principal.html";
}

function redirectToInforme() {
    window.location.href = "informe.html";
}
