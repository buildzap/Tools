// SEO Tools Shared Functions - 2025 Edition
const seoTools = {
    // Toast Notification System
    showToast: function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    // Export Data to CSV
    exportToCsv: function(data, filename) {
        const csv = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showToast('File exported successfully!', 'success');
    },

    // Copy to Clipboard
    copyToClipboard: async function(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied';
            this.showToast('Copied to clipboard!', 'success');
            setTimeout(() => button.innerHTML = originalText, 2000);
        } catch (err) {
            this.showToast('Failed to copy text', 'error');
        }
    },

    // XML Validation
    validateXml: function(xml) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');
            const errors = xmlDoc.getElementsByTagName('parsererror');
            return {
                valid: errors.length === 0,
                errors: errors.length > 0 ? errors[0].textContent : null
            };
        } catch (e) {
            return { valid: false, errors: e.message };
        }
    },

    // Common Words Filter
    commonWords: new Set([
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have',
        'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you',
        'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they',
        'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
        'all', 'would', 'there', 'their', 'what'
    ]),

    // Text Analysis Functions
    textAnalysis: {
        wordCount: function(text) {
            return text.trim().split(/\s+/).filter(word => word.length > 0).length;
        },

        characterCount: function(text) {
            return text.length;
        },

        getKeywordDensity: function(text, keyword, caseSensitive = false) {
            if (!caseSensitive) {
                text = text.toLowerCase();
                keyword = keyword.toLowerCase();
            }
            const words = text.split(/\s+/).filter(word => word.length > 0);
            const keywordCount = words.filter(word => word === keyword).length;
            return {
                count: keywordCount,
                density: (keywordCount / words.length * 100).toFixed(2)
            };
        },

        getPhraseFrequency: function(text, phraseLength = 1, options = {}) {
            const { caseSensitive = false, excludeCommon = true } = options;
            const words = text.split(/\s+/).filter(word => word.length > 0);
            const phrases = new Map();

            for (let i = 0; i <= words.length - phraseLength; i++) {
                let phrase = words.slice(i, i + phraseLength).join(' ');
                if (!caseSensitive) {
                    phrase = phrase.toLowerCase();
                }
                
                if (excludeCommon && phraseLength === 1 && this.commonWords.has(phrase)) {
                    continue;
                }

                phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
            }

            return Array.from(phrases.entries())
                .map(([phrase, count]) => ({
                    phrase,
                    count,
                    density: (count / (words.length - phraseLength + 1) * 100).toFixed(2)
                }))
                .sort((a, b) => b.count - a.count);
        }
    },

    // Chart Creation Helper
    createChart: function(ctx, data, options = {}) {
        return new Chart(ctx, {
            type: options.type || 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: options.label || '',
                    data: data.values,
                    backgroundColor: options.backgroundColor || 'rgba(114, 137, 218, 0.5)',
                    borderColor: options.borderColor || 'rgba(114, 137, 218, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: options.showLegend || false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                ...options.chartOptions
            }
        });
    },

    // URL Validation
    validateUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // File Size Formatter
    formatFileSize: function(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < sizes.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${sizes[i]}`;
    }
};

// Export the module
window.seoTools = seoTools;
