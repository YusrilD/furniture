// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const navMobile = document.querySelector('.nav-mobile');
    const navIcons = document.querySelector('.nav-icons');
    const mobileNavItems = document.querySelectorAll('.nav-mobile .nav-item');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : ''; // Toggle scroll lock
        });
    }

    // Close mobile menu
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function() {
            navMobile.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Handle dropdown toggles in mobile menu
    mobileNavItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');

        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                mobileNavItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.querySelector('.dropdown-menu')) {
                        otherItem.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
                
                // Rotate chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : '';
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMobile && navMobile.classList.contains('active') && 
            !navMobile.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navMobile.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            mobileNavItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
                const icon = item.querySelector('.nav-link i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        }
    });
});

// Handle collection links
const collectionLinks = document.querySelectorAll('.collection-link');
collectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all collection links
        collectionLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Cart Counter and Functionality
const cartCountElement = document.querySelector('.cart-count');
let cartCount = parseInt(cartCountElement?.textContent || '0');

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

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

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        contactForm.appendChild(successMessage);
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    });
} 