// Tool Categories
const toolCategories = {
    passwordTools: ['password-generator', 'random-string-generator'],
    hashTools: ['md5-hash-generator', 'sha256-hash-generator'],
    webSecurity: ['ssl-certificate-checker', 'http-headers-checker'],
    ipTools: ['ip-geolocation-finder', 'whois-lookup'],
    urlTools: ['url-shortener'],
    privacyTools: ['privacy-policy-generator']
};

// Tool Descriptions
const toolDescriptions = {
    'password-generator': {
        title: 'Password Generator',
        description: 'Generate secure, customizable passwords with various character types and options.',
        icon: 'fa-key',
        tags: ['Security', 'Password']
    },
    'random-string-generator': {
        title: 'Random String Generator',
        description: 'Generate random strings for various security purposes.',
        icon: 'fa-random',
        tags: ['Security', 'Random']
    },
    'md5-hash-generator': {
        title: 'MD5 Hash Generator',
        description: 'Generate MD5 hashes for text and files.',
        icon: 'fa-hashtag',
        tags: ['Security', 'Hash']
    },
    'sha256-hash-generator': {
        title: 'SHA256 Hash Generator',
        description: 'Generate SHA256 hashes for text and files.',
        icon: 'fa-hashtag',
        tags: ['Security', 'Hash']
    },
    'ssl-certificate-checker': {
        title: 'SSL Certificate Checker',
        description: 'Check SSL certificates for websites and verify their validity.',
        icon: 'fa-certificate',
        tags: ['Security', 'SSL']
    },
    'http-headers-checker': {
        title: 'HTTP Headers Checker',
        description: 'Analyze HTTP headers for security configurations.',
        icon: 'fa-code',
        tags: ['Security', 'HTTP']
    },
    'ip-geolocation-finder': {
        title: 'IP Geolocation Finder',
        description: 'Find the geographical location of IP addresses.',
        icon: 'fa-map-marker-alt',
        tags: ['Security', 'IP']
    },
    'whois-lookup': {
        title: 'WHOIS Lookup',
        description: 'Look up domain registration and ownership information.',
        icon: 'fa-search',
        tags: ['Security', 'Domain']
    },
    'url-shortener': {
        title: 'URL Shortener',
        description: 'Create short, secure URLs for sharing.',
        icon: 'fa-link',
        tags: ['Security', 'URL']
    },
    'privacy-policy-generator': {
        title: 'Privacy Policy Generator',
        description: 'Generate comprehensive privacy policies for websites and applications.',
        icon: 'fa-file-contract',
        tags: ['Security', 'Privacy']
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    loadHeader();
    loadFooter();

    // Initialize search functionality
    initializeSearch();

    // Add click handlers to tool cards
    initializeToolCards();

    // Initialize theme
    initializeTheme();
});

// Load header
function loadHeader() {
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });
}

// Load footer
function loadFooter() {
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const toolsGrid = document.getElementById('toolsGrid');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = toolsGrid.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const toolId = card.dataset.tool;
            const toolInfo = toolDescriptions[toolId];
            const searchableText = `${toolInfo.title} ${toolInfo.description} ${toolInfo.tags.join(' ')}`.toLowerCase();

            if (searchableText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize tool cards
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            window.location.href = `${toolId}.html`;
        });

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = 'var(--card-shadow)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Initialize theme
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        updateTheme(savedTheme === 'dark');
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateTheme(prefersDark);
    }
}

// Update theme
function updateTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
    updateTheme(e.detail.isDark);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        updateTheme(e.matches);
    }
}); 