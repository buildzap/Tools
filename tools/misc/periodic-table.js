// Complete periodic table data
const elements = [
    {
        number: 1,
        symbol: 'H',
        name: 'Hydrogen',
        category: 'nonmetal',
        atomicMass: 1.008,
        electronConfiguration: '1s¹',
        electronegativity: 2.20,
        atomicRadius: 120,
        ionizationEnergy: 13.598,
        density: 0.00008988,
        meltingPoint: 14.01,
        boilingPoint: 20.28,
        discoveredBy: 'Henry Cavendish',
        year: 1766
    },
    {
        number: 2,
        symbol: 'He',
        name: 'Helium',
        category: 'noble-gas',
        atomicMass: 4.002602,
        electronConfiguration: '1s²',
        electronegativity: null,
        atomicRadius: 140,
        ionizationEnergy: 24.587,
        density: 0.0001785,
        meltingPoint: 0.95,
        boilingPoint: 4.22,
        discoveredBy: 'Pierre Janssen',
        year: 1895
    },
    {
        number: 3,
        symbol: 'Li',
        name: 'Lithium',
        category: 'alkali-metal',
        atomicMass: 6.94,
        electronConfiguration: '[He]2s¹',
        electronegativity: 0.98,
        atomicRadius: 182,
        ionizationEnergy: 5.392,
        density: 0.534,
        meltingPoint: 453.69,
        boilingPoint: 1615,
        discoveredBy: 'Johan August Arfvedson',
        year: 1817
    },
    // Add more elements here...
];

const categoryColors = {
    'alkali-metal': '#ffcdd2',
    'alkaline-earth': '#f8bbd0',
    'transition-metal': '#e1bee7',
    'post-transition': '#d1c4e9',
    'metalloid': '#c5cae9',
    'nonmetal': '#bbdefb',
    'noble-gas': '#b3e5fc',
    'lanthanide': '#b2ebf2',
    'actinide': '#b2dfdb'
};

let selectedElement = null;
let currentCategory = 'all';

// Initialize the periodic table
document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    loadHeaderFooter();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize category filters
    initializeCategoryFilters();
    
    // Render the periodic table
    renderPeriodicTable();
});

// Load header and footer
function loadHeaderFooter() {
    fetch('../../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('../../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterElements(searchTerm);
    });
}

// Initialize category filters
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter elements
            const category = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            filterByCategory(category);
        });
    });
}

// Create element card
function createElementCard(element) {
    const div = document.createElement('div');
    div.className = 'element';
    div.style.backgroundColor = categoryColors[element.category];
    div.innerHTML = `
        <div class="number">${element.number}</div>
        <div class="symbol">${element.symbol}</div>
        <div class="name">${element.name}</div>
    `;
    div.onclick = () => showElementDetails(element);
    return div;
}

// Show element details
function showElementDetails(element) {
    selectedElement = element;
    const detailsDiv = document.getElementById('elementDetails');
    detailsDiv.style.display = 'block';
    detailsDiv.innerHTML = `
        <h3>${element.name} (${element.symbol})</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="element-property">
                    <strong>Atomic Number:</strong> ${element.number}
                </div>
                <div class="element-property">
                    <strong>Atomic Mass:</strong> ${element.atomicMass} u
                </div>
                <div class="element-property">
                    <strong>Category:</strong> ${element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div class="element-property">
                    <strong>Electron Configuration:</strong> ${element.electronConfiguration}
                </div>
                <div class="element-property">
                    <strong>Electronegativity:</strong> ${element.electronegativity || 'N/A'}
                </div>
            </div>
            <div class="col-md-6">
                <div class="element-property">
                    <strong>Atomic Radius:</strong> ${element.atomicRadius} pm
                </div>
                <div class="element-property">
                    <strong>Ionization Energy:</strong> ${element.ionizationEnergy} eV
                </div>
                <div class="element-property">
                    <strong>Density:</strong> ${element.density} g/cm³
                </div>
                <div class="element-property">
                    <strong>Melting Point:</strong> ${element.meltingPoint} K
                </div>
                <div class="element-property">
                    <strong>Boiling Point:</strong> ${element.boilingPoint} K
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="element-property">
                    <strong>Discovered By:</strong> ${element.discoveredBy}
                </div>
                <div class="element-property">
                    <strong>Year:</strong> ${element.year}
                </div>
            </div>
        </div>
    `;
}

// Filter elements by category
function filterByCategory(category) {
    currentCategory = category;
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (category === 'all' || element.dataset.category === category) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Filter elements by search term
function filterElements(searchTerm) {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        const elementData = element.dataset;
        const searchableText = `${elementData.number} ${elementData.symbol} ${elementData.name}`.toLowerCase();
        if (searchableText.includes(searchTerm)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    filterElements('');
}

// Render periodic table
function renderPeriodicTable() {
    const tableDiv = document.getElementById('periodicTable');
    tableDiv.innerHTML = '';
    
    elements.forEach(element => {
        const elementCard = createElementCard(element);
        elementCard.dataset.category = element.category;
        tableDiv.appendChild(elementCard);
    });
} 