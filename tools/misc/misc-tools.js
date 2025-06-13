// Tool Categories
const toolCategories = {
    calculators: ['calculator', 'unit-converter', 'unit-price-calculator'],
    timeTools: ['countdown-timer', 'stopwatch', 'pomodoro-timer'],
    generators: ['password-strength-checker', 'random-number-generator', 'name-generator'],
    converters: ['currency-exchange-rates', 'file-size-converter', 'recipe-converter'],
    productivity: ['todo-list', 'note-pad', 'resume-builder'],
    funTools: ['dice-roller', 'flip-coin', 'decision-maker'],
    utilityTools: ['weather-forecast', 'ip-address-tracker', 'speed-test']
};

// Tool Descriptions
const toolDescriptions = {
    calculator: {
        title: 'Calculator',
        description: 'Basic calculator for everyday calculations',
        icon: 'fa-calculator',
        tags: ['Math', 'Basic']
    },
    'unit-converter': {
        title: 'Unit Converter',
        description: 'Convert between different units of measurement',
        icon: 'fa-exchange-alt',
        tags: ['Conversion', 'Units']
    },
    'unit-price-calculator': {
        title: 'Unit Price Calculator',
        description: 'Calculate and compare unit prices',
        icon: 'fa-tags',
        tags: ['Shopping', 'Price']
    },
    'countdown-timer': {
        title: 'Countdown Timer',
        description: 'Set and track countdown timers',
        icon: 'fa-hourglass-half',
        tags: ['Time', 'Timer']
    },
    stopwatch: {
        title: 'Stopwatch',
        description: 'Track time with a digital stopwatch',
        icon: 'fa-stopwatch',
        tags: ['Time', 'Timer']
    },
    'pomodoro-timer': {
        title: 'Pomodoro Timer',
        description: 'Boost productivity with the Pomodoro technique',
        icon: 'fa-clock',
        tags: ['Productivity', 'Timer']
    },
    'password-strength-checker': {
        title: 'Password Strength Checker',
        description: 'Check the strength of your passwords',
        icon: 'fa-key',
        tags: ['Security', 'Password']
    },
    'random-number-generator': {
        title: 'Random Number Generator',
        description: 'Generate random numbers within a range',
        icon: 'fa-dice',
        tags: ['Random', 'Numbers']
    },
    'name-generator': {
        title: 'Name Generator',
        description: 'Generate random names for various purposes',
        icon: 'fa-user',
        tags: ['Names', 'Random']
    },
    'currency-exchange-rates': {
        title: 'Currency Exchange Rates',
        description: 'Convert between different currencies',
        icon: 'fa-money-bill-wave',
        tags: ['Currency', 'Finance']
    },
    'file-size-converter': {
        title: 'File Size Converter',
        description: 'Convert between different file size units',
        icon: 'fa-file',
        tags: ['File', 'Size']
    },
    'recipe-converter': {
        title: 'Recipe Converter',
        description: 'Convert recipe measurements',
        icon: 'fa-utensils',
        tags: ['Cooking', 'Conversion']
    },
    'todo-list': {
        title: 'Todo List',
        description: 'Manage your tasks and to-dos',
        icon: 'fa-tasks',
        tags: ['Productivity', 'Tasks']
    },
    'note-pad': {
        title: 'Note Pad',
        description: 'Quick and simple note-taking',
        icon: 'fa-sticky-note',
        tags: ['Notes', 'Text']
    },
    'resume-builder': {
        title: 'Resume Builder',
        description: 'Create professional resumes',
        icon: 'fa-file-alt',
        tags: ['Career', 'Document']
    },
    'dice-roller': {
        title: 'Dice Roller',
        description: 'Roll virtual dice for games',
        icon: 'fa-dice-d20',
        tags: ['Games', 'Random']
    },
    'flip-coin': {
        title: 'Flip Coin',
        description: 'Flip a virtual coin',
        icon: 'fa-coins',
        tags: ['Games', 'Random']
    },
    'decision-maker': {
        title: 'Decision Maker',
        description: 'Make random decisions',
        icon: 'fa-random',
        tags: ['Random', 'Fun']
    },
    'weather-forecast': {
        title: 'Weather Forecast',
        description: 'Check weather forecasts',
        icon: 'fa-cloud-sun',
        tags: ['Weather', 'Forecast']
    },
    'ip-address-tracker': {
        title: 'IP Address Tracker',
        description: 'Track and locate IP addresses',
        icon: 'fa-network-wired',
        tags: ['Network', 'Security']
    },
    'speed-test': {
        title: 'Speed Test',
        description: 'Test your internet speed',
        icon: 'fa-tachometer-alt',
        tags: ['Network', 'Speed']
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

// Theme handling
function updateTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
    updateTheme(e.detail.isDark);
}); 