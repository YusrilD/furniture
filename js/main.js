// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navIcons = document.querySelector('.nav-icons');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navIcons.style.display = navIcons.style.display === 'flex' ? 'none' : 'flex';
});

// Cart Counter and Functionality
const cartCountElement = document.querySelector('.cart-count');
let cartCount = parseInt(cartCountElement?.textContent || '0');

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading Images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Search Functionality
const searchInput = document.querySelector('.search-container input');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
            searchInput.value = '';
        }
    }
});

// Profile Page Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Add to Cart Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
        // Show notification
        alert('Item added to cart!');
    });
});

// Cart Item Quantity Controls
const quantityBtns = document.querySelectorAll('.quantity-btn');
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        let value = parseInt(input.value);
        
        if (btn.classList.contains('plus') && value < 10) {
            input.value = value + 1;
        } else if (btn.classList.contains('minus') && value > 1) {
            input.value = value - 1;
        }
        
        // Update cart total here
        updateCartTotal();
    });
});

// Update Cart Total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('input').value);
        total += price * quantity;
    });
    
    const totalElement = document.querySelector('.summary-total span:last-child');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Remove Cart Item
const removeItemBtns = document.querySelectorAll('.remove-item');
removeItemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this item?')) {
            btn.closest('.cart-item').remove();
            updateCartTotal();
        }
    });
});

// Profile Form Submission
const profileForm = document.querySelector('.profile-form');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        alert('Profile updated successfully!');
    });
}

// Settings Form Toggle Switches
const toggleSwitches = document.querySelectorAll('.toggle-switch input');
toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', () => {
        const setting = toggle.id;
        const isEnabled = toggle.checked;
        console.log(`${setting} is now ${isEnabled ? 'enabled' : 'disabled'}`);
    });
}); 