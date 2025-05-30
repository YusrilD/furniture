// Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('cozyHomeCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cozyHomeCart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    // Add item to cart
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                category: product.category,
                dateAdded: new Date().toISOString()
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification("Item removed from cart");
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            // Ensure quantity is within valid range
            newQuantity = Math.max(1, Math.min(10, newQuantity));
            
            if (newQuantity !== item.quantity) {
                item.quantity = newQuantity;
                this.saveCart();
            }
        }
    }

    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart count
    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Update all cart UI elements
    updateCartUI() {
        // Update cart count in header
        const cartCountElements = document.querySelectorAll('.cart-count');
        const cartCount = this.getCartCount();
        
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });

        // Update cart page if it exists
        const cartContainer = document.getElementById('cart-items-container');
        if (cartContainer) {
            this.renderCartPage();
        }
    }

    // Show notification
    showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Render cart page
    renderCartPage() {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items yet.</p>
                    <div class="empty-cart-actions">
                        <a href="index.html" class="cta-button">Continue Shopping</a>
                        <div class="quick-links">
                            <p>Quick Links:</p>
                            <a href="new-arrivals.html">New Arrivals</a>
                            <a href="#furniture">Furniture</a>
                            <a href="#decor">Decor</a>
                            <a href="#lighting">Lighting</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            cartContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" value="${item.quantity}" min="1" max="10" 
                               onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))"
                               onclick="this.select()">
                        <button class="quantity-btn plus" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="cartManager.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        // Update summary
        const subtotalElement = document.querySelector('.cart-subtotal');
        const totalElement = document.querySelector('.cart-total');
        const total = this.getCartTotal();

        if (subtotalElement) {
            subtotalElement.textContent = `$${total.toFixed(2)}`;
        }
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Initialize cart manager
const cartManager = new CartManager(); 