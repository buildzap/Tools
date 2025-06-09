// QR Code Generator Functions
function initializeQRGenerator() {
    const contentType = document.getElementById('contentType');
    const qrPreview = document.getElementById('qrPreview');
    const downloadQR = document.getElementById('downloadQR');
    
    // Add event listeners for QR code generation
    contentType.addEventListener('change', updateQRContent);
    document.getElementById('qrSize').addEventListener('input', updateQRSize);
    document.getElementById('errorCorrection').addEventListener('change', generateQR);
    document.getElementById('foregroundColor').addEventListener('input', generateQR);
    document.getElementById('backgroundColor').addEventListener('input', generateQR);
    
    // Initialize QR code generation
    generateQR();
}

function updateQRContent() {
    const contentType = document.getElementById('contentType').value;
    const contentDiv = document.getElementById('qrContent');
    
    let contentHTML = '';
    switch (contentType) {
        case 'text':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">Text</label>
                    <textarea class="form-control" id="textInput" rows="3" placeholder="Enter text"></textarea>
                </div>
            `;
            break;
        case 'url':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">URL</label>
                    <input type="url" class="form-control" id="urlInput" placeholder="https://example.com">
                </div>
            `;
            break;
        case 'email':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="emailInput" placeholder="example@email.com">
                </div>
                <div class="mb-3">
                    <label class="form-label">Subject (Optional)</label>
                    <input type="text" class="form-control" id="emailSubject" placeholder="Email subject">
                </div>
                <div class="mb-3">
                    <label class="form-label">Message (Optional)</label>
                    <textarea class="form-control" id="emailMessage" rows="2" placeholder="Email message"></textarea>
                </div>
            `;
            break;
        case 'phone':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phoneInput" placeholder="+1 234 567 890">
                </div>
            `;
            break;
        case 'sms':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="smsPhone" placeholder="+1 234 567 890">
                </div>
                <div class="mb-3">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" id="smsMessage" rows="2" placeholder="SMS message"></textarea>
                </div>
            `;
            break;
        case 'wifi':
            contentHTML = `
                <div class="mb-3">
                    <label class="form-label">Network Name (SSID)</label>
                    <input type="text" class="form-control" id="wifiSSID" placeholder="WiFi network name">
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="wifiPassword" placeholder="WiFi password">
                </div>
                <div class="mb-3">
                    <label class="form-label">Encryption Type</label>
                    <select class="form-select" id="wifiEncryption">
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                    </select>
                </div>
            `;
            break;
        case 'vcard':
            contentHTML = `
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" id="vcardFirstName" placeholder="First name">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="vcardLastName" placeholder="Last name">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" id="vcardPhone" placeholder="Phone number">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" id="vcardEmail" placeholder="Email address">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Address</label>
                        <input type="text" class="form-control" id="vcardAddress" placeholder="Address">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Website</label>
                        <input type="url" class="form-control" id="vcardWebsite" placeholder="Website URL">
                    </div>
                </div>
            `;
            break;
    }
    
    contentDiv.innerHTML = contentHTML;
    
    // Add event listeners to new inputs
    const inputs = contentDiv.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', generateQR);
    });
}

function updateQRSize() {
    const size = document.getElementById('qrSize').value;
    document.getElementById('sizeValue').textContent = `${size}px`;
    generateQR();
}

function generateQR() {
    const contentType = document.getElementById('contentType').value;
    let qrData = '';
    
    switch (contentType) {
        case 'text':
            qrData = document.getElementById('textInput').value;
            break;
        case 'url':
            qrData = document.getElementById('urlInput').value;
            break;
        case 'email':
            const email = document.getElementById('emailInput').value;
            const subject = document.getElementById('emailSubject').value;
            const message = document.getElementById('emailMessage').value;
            qrData = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}${message ? `&body=${encodeURIComponent(message)}` : ''}`;
            break;
        case 'phone':
            qrData = `tel:${document.getElementById('phoneInput').value}`;
            break;
        case 'sms':
            const phone = document.getElementById('smsPhone').value;
            const smsMessage = document.getElementById('smsMessage').value;
            qrData = `sms:${phone}${smsMessage ? `?body=${encodeURIComponent(smsMessage)}` : ''}`;
            break;
        case 'wifi':
            const ssid = document.getElementById('wifiSSID').value;
            const password = document.getElementById('wifiPassword').value;
            const encryption = document.getElementById('wifiEncryption').value;
            qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
            break;
        case 'vcard':
            const vcard = {
                firstName: document.getElementById('vcardFirstName').value,
                lastName: document.getElementById('vcardLastName').value,
                phone: document.getElementById('vcardPhone').value,
                email: document.getElementById('vcardEmail').value,
                address: document.getElementById('vcardAddress').value,
                website: document.getElementById('vcardWebsite').value
            };
            qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.lastName};${vcard.firstName}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nADR:${vcard.address}\nURL:${vcard.website}\nEND:VCARD`;
            break;
    }
    
    if (!qrData) {
        document.getElementById('qrPreview').innerHTML = '<p class="text-muted">Enter data to generate QR code</p>';
        document.getElementById('downloadQR').disabled = true;
        return;
    }
    
    const options = {
        text: qrData,
        width: parseInt(document.getElementById('qrSize').value),
        height: parseInt(document.getElementById('qrSize').value),
        colorDark: document.getElementById('foregroundColor').value,
        colorLight: document.getElementById('backgroundColor').value,
        correctLevel: QRCode.CorrectLevel[document.getElementById('errorCorrection').value]
    };
    
    const qrPreview = document.getElementById('qrPreview');
    qrPreview.innerHTML = '';
    new QRCode(qrPreview, options);
    document.getElementById('downloadQR').disabled = false;
}

// Barcode Generator Functions
function initializeBarcodeGenerator() {
    const barcodePreview = document.getElementById('barcodePreview');
    const downloadBarcode = document.getElementById('downloadBarcode');
    
    // Add event listeners for barcode generation
    document.getElementById('barcodeType').addEventListener('change', generateBarcode);
    document.getElementById('barcodeData').addEventListener('input', generateBarcode);
    document.getElementById('barcodeWidth').addEventListener('input', generateBarcode);
    document.getElementById('barcodeHeight').addEventListener('input', generateBarcode);
    
    // Initialize barcode generation
    generateBarcode();
}

function generateBarcode() {
    const type = document.getElementById('barcodeType').value;
    const data = document.getElementById('barcodeData').value;
    const width = parseInt(document.getElementById('barcodeWidth').value);
    const height = parseInt(document.getElementById('barcodeHeight').value);
    
    if (!data) {
        document.getElementById('barcodePreview').innerHTML = '<p class="text-muted">Enter data to generate barcode</p>';
        document.getElementById('downloadBarcode').disabled = true;
        return;
    }
    
    try {
        const barcodePreview = document.getElementById('barcodePreview');
        barcodePreview.innerHTML = `<svg id="barcode"></svg>`;
        
        JsBarcode("#barcode", data, {
            format: type,
            width: width,
            height: height,
            displayValue: true,
            fontSize: 20,
            margin: 10
        });
        
        document.getElementById('downloadBarcode').disabled = false;
    } catch (error) {
        document.getElementById('barcodePreview').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        document.getElementById('downloadBarcode').disabled = true;
    }
}

// Meme Generator Functions
function initializeMemeGenerator() {
    const memePreview = document.getElementById('memePreview');
    const downloadMeme = document.getElementById('downloadMeme');
    
    // Add event listeners for meme generation
    document.getElementById('memeTemplate').addEventListener('change', generateMeme);
    document.getElementById('memeTopText').addEventListener('input', generateMeme);
    document.getElementById('memeBottomText').addEventListener('input', generateMeme);
    document.getElementById('memeTextColor').addEventListener('input', generateMeme);
    document.getElementById('memeTextSize').addEventListener('input', generateMeme);
    
    // Initialize meme generation
    generateMeme();
}

function generateMeme() {
    const template = document.getElementById('memeTemplate').value;
    const topText = document.getElementById('memeTopText').value;
    const bottomText = document.getElementById('memeBottomText').value;
    const textColor = document.getElementById('memeTextColor').value;
    const textSize = document.getElementById('memeTextSize').value;
    
    if (!template) {
        document.getElementById('memePreview').innerHTML = '<p class="text-muted">Select a template to generate meme</p>';
        document.getElementById('downloadMeme').disabled = true;
        return;
    }
    
    const memePreview = document.getElementById('memePreview');
    memePreview.innerHTML = `
        <div class="meme-container">
            <img src="/images/memes/${template}.jpg" alt="Meme template" class="meme-preview">
            <div class="meme-text top" style="color: ${textColor}; font-size: ${textSize}px;">${topText}</div>
            <div class="meme-text bottom" style="color: ${textColor}; font-size: ${textSize}px;">${bottomText}</div>
        </div>
    `;
    
    document.getElementById('downloadMeme').disabled = false;
}

// Ebook Creator Functions
function initializeEbookCreator() {
    const ebookPreview = document.getElementById('ebookPreview');
    const downloadEbook = document.getElementById('downloadEbook');
    
    // Add event listeners for ebook generation
    document.getElementById('ebookTitle').addEventListener('input', updateEbookPreview);
    document.getElementById('ebookAuthor').addEventListener('input', updateEbookPreview);
    document.getElementById('ebookContent').addEventListener('input', updateEbookPreview);
    document.getElementById('ebookFormat').addEventListener('change', updateEbookPreview);
    document.getElementById('ebookTheme').addEventListener('change', updateEbookPreview);
    
    // Initialize ebook preview
    updateEbookPreview();
}

function updateEbookPreview() {
    const title = document.getElementById('ebookTitle').value;
    const author = document.getElementById('ebookAuthor').value;
    const content = document.getElementById('ebookContent').value;
    const theme = document.getElementById('ebookTheme').value;
    
    if (!title || !content) {
        document.getElementById('ebookPreview').innerHTML = '<p class="text-muted">Enter title and content to generate ebook</p>';
        document.getElementById('downloadEbook').disabled = true;
        return;
    }
    
    const ebookPreview = document.getElementById('ebookPreview');
    ebookPreview.innerHTML = `
        <div class="ebook-content ${theme}">
            <h1>${title}</h1>
            <h2>by ${author}</h2>
            <div class="content">${content.replace(/\n/g, '<br>')}</div>
        </div>
    `;
    
    document.getElementById('downloadEbook').disabled = false;
}

// Fake Address Generator Functions
function initializeAddressGenerator() {
    const addressPreview = document.getElementById('addressPreview');
    const downloadAddress = document.getElementById('downloadAddress');
    const generateAddress = document.getElementById('generateAddress');
    
    // Add event listeners for address generation
    document.getElementById('addressCountry').addEventListener('change', generateAddress);
    document.getElementById('includePhone').addEventListener('change', generateAddress);
    document.getElementById('includeEmail').addEventListener('change', generateAddress);
    document.getElementById('includeCompany').addEventListener('change', generateAddress);
    
    // Initialize address generation
    generateAddress();
}

function generateAddress() {
    const country = document.getElementById('addressCountry').value;
    const includePhone = document.getElementById('includePhone').checked;
    const includeEmail = document.getElementById('includeEmail').checked;
    const includeCompany = document.getElementById('includeCompany').checked;
    
    // Generate fake data based on country
    const address = generateFakeAddress(country);
    const phone = includePhone ? generateFakePhone(country) : '';
    const email = includeEmail ? generateFakeEmail() : '';
    const company = includeCompany ? generateFakeCompany() : '';
    
    const addressPreview = document.getElementById('addressPreview');
    addressPreview.innerHTML = `
        <div class="address-content">
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Name:</strong> ${address.name}</p>
            <p><strong>Address:</strong> ${address.street}</p>
            <p><strong>City:</strong> ${address.city}</p>
            <p><strong>State/Province:</strong> ${address.state}</p>
            <p><strong>Postal Code:</strong> ${address.postalCode}</p>
            <p><strong>Country:</strong> ${address.country}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        </div>
    `;
    
    document.getElementById('downloadAddress').disabled = false;
}

// Helper Functions
function generateFakeAddress(country) {
    // This is a simplified version. In a real application, you would have more comprehensive data
    const addresses = {
        US: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'United States'
        },
        UK: {
            name: 'Jane Smith',
            street: '45 High Street',
            city: 'London',
            state: 'Greater London',
            postalCode: 'SW1A 1AA',
            country: 'United Kingdom'
        },
        CA: {
            name: 'Robert Johnson',
            street: '789 Maple Ave',
            city: 'Toronto',
            state: 'ON',
            postalCode: 'M5V 2T6',
            country: 'Canada'
        },
        AU: {
            name: 'Sarah Wilson',
            street: '10 Park Road',
            city: 'Sydney',
            state: 'NSW',
            postalCode: '2000',
            country: 'Australia'
        },
        DE: {
            name: 'Hans Mueller',
            street: 'Bahnhofstraße 1',
            city: 'Berlin',
            state: 'Berlin',
            postalCode: '10115',
            country: 'Germany'
        }
    };
    
    return addresses[country] || addresses.US;
}

function generateFakePhone(country) {
    const formats = {
        US: '+1 (###) ###-####',
        UK: '+44 #### ######',
        CA: '+1 (###) ###-####',
        AU: '+61 ### ### ###',
        DE: '+49 ### #######'
    };
    
    const format = formats[country] || formats.US;
    return format.replace(/#/g, () => Math.floor(Math.random() * 10));
}

function generateFakeEmail() {
    const names = ['john', 'jane', 'robert', 'sarah', 'hans', 'maria', 'david', 'lisa'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const number = Math.floor(Math.random() * 1000);
    
    return `${name}${number}@${domain}`;
}

function generateFakeCompany() {
    const prefixes = ['Global', 'Advanced', 'Innovative', 'Dynamic', 'Elite', 'Premium'];
    const types = ['Tech', 'Solutions', 'Systems', 'Services', 'Industries', 'Group'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return `${prefix} ${type}`;
}

// Download Functions
function downloadQRCode() {
    const canvas = document.querySelector('#qrPreview canvas');
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function downloadBarcode() {
    const svg = document.querySelector('#barcodePreview svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'barcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}

function downloadMeme() {
    const memeContainer = document.querySelector('.meme-container');
    if (!memeContainer) return;
    
    html2canvas(memeContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function downloadEbook() {
    const format = document.getElementById('ebookFormat').value;
    const title = document.getElementById('ebookTitle').value;
    const author = document.getElementById('ebookAuthor').value;
    const content = document.getElementById('ebookContent').value;
    
    if (format === 'pdf') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text(title, 20, 20);
        doc.setFontSize(16);
        doc.text(`by ${author}`, 20, 30);
        doc.setFontSize(12);
        
        const splitContent = doc.splitTextToSize(content, 170);
        doc.text(splitContent, 20, 40);
        
        doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } else {
        // For EPUB and MOBI formats, we would need additional libraries
        alert('EPUB and MOBI formats are not supported in this demo. Please use PDF format.');
    }
}

function downloadAddress() {
    const addressContent = document.querySelector('.address-content');
    if (!addressContent) return;
    
    const text = addressContent.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'address.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
}

// Initialize all generators when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Initialize all generators
    initializeQRGenerator();
    initializeBarcodeGenerator();
    initializeMemeGenerator();
    initializeEbookCreator();
    initializeAddressGenerator();
    
    // Add download event listeners
    document.getElementById('downloadQR').addEventListener('click', downloadQRCode);
    document.getElementById('downloadBarcode').addEventListener('click', downloadBarcode);
    document.getElementById('downloadMeme').addEventListener('click', downloadMeme);
    document.getElementById('downloadEbook').addEventListener('click', downloadEbook);
    document.getElementById('downloadAddress').addEventListener('click', downloadAddress);
}); 