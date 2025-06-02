// Sample new arrivals data - In a real application, this would come from a backend API
const newArrivals = [
    {
        id: 1,
        name: "Modern Leather Sofa",
        price: 999.99,
        category: "furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
        description: "Elegant and comfortable leather sofa with modern design",
        dateAdded: new Date("2024-03-15")
    },
    {
        id: 2,
        name: "Minimalist Table Lamp",
        price: 129.99,
        category: "lighting",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80",
        description: "Contemporary table lamp with adjustable brightness",
        dateAdded: new Date("2024-03-14")
    },
    {
        id: 3,
        name: "Decorative Wall Mirror",
        price: 199.99,
        category: "decor",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80",
        description: "Elegant round mirror with golden frame",
        dateAdded: new Date("2024-03-13")
    },
    // Add more sample products as needed
];

// DOM Elements
const productsContainer = document.getElementById('new-arrivals-container');
const sortFilter = document.getElementById('sort-filter');
const categoryFilter = document.getElementById('category-filter');

// Filter and sort state
let currentSort = 'newest';
let currentCategory = 'all';

// Create product card HTML
function createProductCard(product) {
    const daysOld = Math.floor((new Date() - new Date(product.dateAdded)) / (1000 * 60 * 60 * 24));
    const isNew = daysOld <= 7; // Consider items within last 7 days as new

    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-meta">
                    ${isNew ? '<span class="new-label">New</span>' : ''}
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Filter and sort products
function filterAndSortProducts() {
    let filteredProducts = [...newArrivals];

    // Apply category filter
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    // Apply sorting
    switch (currentSort) {
        case 'newest':
            filteredProducts.sort((a, b) => b.dateAdded - a.dateAdded);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }

    return filteredProducts;
}

// Render products
function renderProducts() {
    const filteredProducts = filterAndSortProducts();
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <p>No products found in this category.</p>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Add to cart functionality
function addToCart(productId) {
    const product = newArrivals.find(p => p.id === productId);
    if (!product) return;
    
    // Show feedback to user
    const button = event.target.closest('.add-to-cart-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Event Listeners
sortFilter.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
});

categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderProducts();
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
}); 