# Multi-Tools Website

A comprehensive collection of free online tools for everyday tasks. Built with HTML, CSS (Bootstrap), and vanilla JavaScript.

## Features

- Free online tools across various categories
- No registration required
- Mobile-first responsive design
- Dark mode support
- Fast and efficient performance
- Secure and private (all processing done in browser)
- Clean and intuitive user interface

## Tool Categories

1. **Image Tools**
   - Image Resizer
   - Image to PNG
   - Image to JPG
   - Image Compressor
   - And more...

2. **Text Tools**
   - Word Counter
   - Case Converter
   - Text to Speech
   - Text Diff
   - And more...

3. **Calculators**
   - Percentage Calculator
   - Age Calculator
   - BMI Calculator
   - Loan Calculator
   - And more...

4. **Developer Tools**
   - JSON Formatter
   - HTML to Markdown
   - CSS Minifier
   - JS Minifier
   - And more...

5. **SEO Tools**
   - Meta Tag Generator
   - Robots.txt Generator
   - Sitemap Generator
   - Keyword Density
   - And more...

6. **Miscellaneous Tools**
   - QR Code Generator
   - Barcode Generator
   - Color Picker
   - Unit Converter
   - And more...

## Project Structure

```
multi-tools/
├── components/
│   ├── header.html
│   └── footer.html
├── js/
│   └── main.js
├── styles/
│   └── main.css
├── tools/
│   ├── image-tools/
│   ├── text-tools/
│   ├── calculators/
│   ├── developer-tools/
│   ├── seo-tools/
│   └── misc/
├── images/
├── index.html
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/multi-tools.git
   ```

2. Navigate to the project directory:
   ```bash
   cd multi-tools
   ```

3. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

4. Visit `http://localhost:8000` in your web browser.

## Development

- Each tool is in a separate HTML file for modular development
- Common components (header, footer) are in the `components` directory
- Shared styles are in `styles/main.css`
- Common JavaScript utilities are in `js/main.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [Font Awesome](https://fontawesome.com/) for the icons
- All the open-source libraries used in individual tools 
