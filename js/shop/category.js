// Filter Toggle
const filterToggle = document.querySelector('.filter-toggle');
const filterPanel = document.querySelector('.filter-panel');

filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('active');
});

// Close filter panel when clicking outside
document.addEventListener('click', (e) => {
    if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
        filterPanel.classList.remove('active');
    }
});

// Price Range Slider
const priceSlider = document.querySelector('.price-slider');
const minPriceInput = document.querySelector('.min-price');
const maxPriceInput = document.querySelector('.max-price');

// Update price inputs when slider changes
priceSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    maxPriceInput.value = value;
});

// Update slider when price inputs change
minPriceInput.addEventListener('change', () => {
    if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
        minPriceInput.value = maxPriceInput.value;
    }
});

maxPriceInput.addEventListener('change', () => {
    if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
        maxPriceInput.value = minPriceInput.value;
    }
    priceSlider.value = maxPriceInput.value;
});

// Apply Filters
const applyFiltersBtn = document.querySelector('.apply-filters');
const clearFiltersBtn = document.querySelector('.clear-filters');
const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

applyFiltersBtn.addEventListener('click', () => {
    const selectedFilters = {
        categories: [],
        styles: [],
        materials: [],
        priceRange: {
            min: parseInt(minPriceInput.value),
            max: parseInt(maxPriceInput.value)
        }
    };

    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const filterGroup = checkbox.closest('.filter-group');
            const groupTitle = filterGroup.querySelector('h3').textContent.toLowerCase();
            
            switch(groupTitle) {
                case 'category':
                    selectedFilters.categories.push(checkbox.value);
                    break;
                case 'style':
                    selectedFilters.styles.push(checkbox.value);
                    break;
                case 'material':
                    selectedFilters.materials.push(checkbox.value);
                    break;
            }
        }
    });

    // Apply filters (you would typically make an API call here)
    console.log('Applied filters:', selectedFilters);
    filterPanel.classList.remove('active');
});

// Clear Filters
clearFiltersBtn.addEventListener('click', () => {
    filterCheckboxes.forEach(checkbox => checkbox.checked = false);
    minPriceInput.value = 0;
    maxPriceInput.value = 5000;
    priceSlider.value = 5000;
});

// Sort Products
const sortSelect = document.querySelector('.sort-select');
sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    // Sort products (you would typically make an API call here)
    console.log('Sorting by:', sortBy);
});

// Quick View and Wishlist
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.productId;
        // Show quick view modal (implement modal functionality)
        console.log('Quick view product:', productId);
    });
});

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.productId;
        btn.classList.toggle('active');
        // Add/remove from wishlist (you would typically make an API call here)
        console.log('Toggle wishlist for product:', productId);
    });
});

// Add to Cart
const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.productId;
        // Add to cart (you would typically make an API call here)
        console.log('Add to cart:', productId);
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Added to cart!';
        productCard.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 2000);
    });
});

// Pagination
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const pageButtons = document.querySelectorAll('.page-numbers button');

let currentPage = 1;
const totalPages = 10;

function updatePagination() {
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
}

pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPage = parseInt(btn.textContent);
        updatePagination();
        // Fetch products for new page (you would typically make an API call here)
        console.log('Fetching page:', currentPage);
    });
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
        // Fetch products for new page
        console.log('Fetching page:', currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        // Fetch products for new page
        console.log('Fetching page:', currentPage);
    }
}); 