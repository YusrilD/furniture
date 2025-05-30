// Collection Data Structure
const collections = {
    'living-room': {
        title: 'Living Room',
        subcategories: [
            { name: 'Sofas', link: '/pages/collections/living-room/sofas.html' },
            { name: 'Coffee Tables', link: '/pages/collections/living-room/coffee-tables.html' },
            { name: 'TV Stands', link: '/pages/collections/living-room/tv-stands.html' },
            { name: 'Armchairs', link: '/pages/collections/living-room/armchairs.html' }
        ]
    },
    'bedroom': {
        title: 'Bedroom',
        subcategories: [
            { name: 'Beds', link: '/pages/collections/bedroom/beds.html' },
            { name: 'Wardrobes', link: '/pages/collections/bedroom/wardrobes.html' },
            { name: 'Nightstands', link: '/pages/collections/bedroom/nightstands.html' },
            { name: 'Dressers', link: '/pages/collections/bedroom/dressers.html' }
        ]
    },
    'dining-room': {
        title: 'Dining Room',
        subcategories: [
            { name: 'Dining Tables', link: '/pages/collections/dining-room/dining-tables.html' },
            { name: 'Dining Chairs', link: '/pages/collections/dining-room/dining-chairs.html' },
            { name: 'Buffets & Sideboards', link: '/pages/collections/dining-room/buffets.html' },
            { name: 'Bar Furniture', link: '/pages/collections/dining-room/bar-furniture.html' }
        ]
    },
    'home-office': {
        title: 'Home Office',
        subcategories: [
            { name: 'Desks', link: '/pages/collections/home-office/desks.html' },
            { name: 'Office Chairs', link: '/pages/collections/home-office/office-chairs.html' },
            { name: 'Bookcases', link: '/pages/collections/home-office/bookcases.html' },
            { name: 'Filing Cabinets', link: '/pages/collections/home-office/filing-cabinets.html' }
        ]
    },
    'outdoor': {
        title: 'Outdoor',
        subcategories: [
            { name: 'Patio Sets', link: '/pages/collections/outdoor/patio-sets.html' },
            { name: 'Outdoor Dining', link: '/pages/collections/outdoor/outdoor-dining.html' },
            { name: 'Loungers', link: '/pages/collections/outdoor/loungers.html' },
            { name: 'Garden Decor', link: '/pages/collections/outdoor/garden-decor.html' }
        ]
    }
};

// Function to generate collection dropdown menu
function generateCollectionMenu() {
    const collectionDropdown = document.querySelector('.collection-dropdown');
    if (!collectionDropdown) return;

    Object.entries(collections).forEach(([key, collection]) => {
        const collectionItem = document.createElement('div');
        collectionItem.className = 'collection-category';
        
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = collection.title;
        
        const subcategoryList = document.createElement('ul');
        subcategoryList.className = 'subcategory-list';
        
        collection.subcategories.forEach(subcategory => {
            const subcategoryItem = document.createElement('li');
            const subcategoryLink = document.createElement('a');
            subcategoryLink.href = subcategory.link;
            subcategoryLink.textContent = subcategory.name;
            subcategoryItem.appendChild(subcategoryLink);
            subcategoryList.appendChild(subcategoryItem);
        });
        
        collectionItem.appendChild(categoryTitle);
        collectionItem.appendChild(subcategoryList);
        collectionDropdown.appendChild(collectionItem);
    });
}

// Function to handle collection navigation
function handleCollectionNavigation() {
    const collectionLinks = document.querySelectorAll('.collection-link');
    const dropdownMenu = document.querySelector('.collection-dropdown');
    
    collectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const collectionId = link.getAttribute('data-collection');
            
            // Remove active class from all links
            collectionLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show dropdown menu
            if (dropdownMenu) {
                dropdownMenu.classList.add('active');
            }
            
            // Highlight current collection category if it exists
            const categories = document.querySelectorAll('.collection-category');
            categories.forEach(category => {
                category.classList.remove('active');
                if (category.getAttribute('data-collection') === collectionId) {
                    category.classList.add('active');
                }
            });
        });
    });
}

// Initialize collection functionality
document.addEventListener('DOMContentLoaded', () => {
    generateCollectionMenu();
    handleCollectionNavigation();
}); 