// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

// Tool data structure
const tools = {
    'image-tools': [
        {
            id: 'image-to-png',
            name: 'Image to PNG Converter',
            description: 'Convert images to PNG format with transparency support.',
            icon: 'fa-image',
            url: '/tools/image-tools/image-to-png.html'
        },
        {
            id: 'image-to-jpg',
            name: 'Image to JPG Converter',
            description: 'Convert images to JPG format with quality control.',
            icon: 'fa-file-image',
            url: '/tools/image-tools/image-to-jpg.html'
        },
        // Add more image tools...
    ],
    'seo-tools': [
        {
            id: 'meta-tag-generator',
            name: 'Meta Tag Generator',
            description: 'Generate SEO-friendly meta tags for your website.',
            icon: 'fa-tags',
            url: '/tools/seo-tools/meta-tag-generator.html'
        },
        // Add more SEO tools...
    ],
    // Add more categories...
};

// Initialize tool cards
function initializeToolCards() {
    Object.keys(tools).forEach(category => {
        const container = document.querySelector(`#${category} .row`);
        if (container) {
            tools[category].forEach(tool => {
                const card = createToolCard(tool);
                container.appendChild(card);
            });
        }
    });
}

// Create tool card element
function createToolCard(tool) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3 mb-4';
    
    col.innerHTML = `
        <div class="card tool-card h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas ${tool.icon}"></i> ${tool.name}
                </h5>
                <p class="card-text">${tool.description}</p>
            </div>
            <div class="card-footer bg-transparent">
                <a href="${tool.url}" class="btn btn-primary btn-sm w-100">Use Tool</a>
            </div>
        </div>
    `;
    
    return col;
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            Object.keys(tools).forEach(category => {
                const container = document.querySelector(`#${category} .row`);
                if (container) {
                    const cards = container.querySelectorAll('.col-md-4');
                    cards.forEach(card => {
                        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
                        const toolDesc = card.querySelector('.card-text').textContent.toLowerCase();
                        
                        if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Handle mobile navigation
function handleMobileNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeToolCards();
    initializeSearch();
    initializeTooltips();
    handleMobileNav();
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element) {
    element.innerHTML = '';
}

// Handle form submissions
function handleFormSubmit(form, callback) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        showLoading(submitButton);
        
        // Simulate async operation
        setTimeout(() => {
            callback();
            hideLoading(submitButton);
            submitButton.innerHTML = originalText;
        }, 1000);
    });
}

// Export functions for use in individual tool pages
window.toolUtils = {
    showLoading,
    hideLoading,
    handleFormSubmit
};

// Main JavaScript file for common functionality

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

// Tool initialization
function initializeTool() {
    // Add tool-specific initialization code here
    console.log('Tool initialized');
}

// Common utility functions
const utils = {
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Copy text to clipboard
    copyToClipboard: function(text) {
        return navigator.clipboard.writeText(text).then(() => {
            return true;
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            return false;
        });
    },

    // Show notification
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Generate random string
    generateRandomString: function(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export utilities
window.utils = utils; 