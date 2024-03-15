// app.js
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
    };

    // Post the product to the server
    await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    // Clear the form
    e.target.reset();

    // Refresh the products list
    fetchProducts();
});

async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('li');
        item.textContent = `${product.name} - $${product.price}: ${product.description}`;
        productsList.appendChild(item);
    });
}

// Initial fetch of products
fetchProducts();
