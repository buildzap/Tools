// Social Media Tools Shared Functions - 2025 Edition
const socialTools = {
    // Toast Notification System
    showToast: function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Copy to Clipboard
    copyToClipboard: async function(text, button = null) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!', 'success');
            if (button) {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied';
                setTimeout(() => button.innerHTML = originalText, 2000);
            }
            return true;
        } catch (err) {
            this.showToast('Failed to copy text', 'error');
            return false;
        }
    },

    // Download Media
    downloadMedia: async function(url, filename, options = {}) {
        try {
            const response = await fetch(url, {
                headers: options.headers || {},
                ...options
            });
            
            if (!response.ok) throw new Error('Download failed');
            
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            
            this.showToast('Download started!', 'success');
            return true;
        } catch (err) {
            this.showToast('Download failed: ' + err.message, 'error');
            return false;
        }
    },

    // Format Social Media Numbers
    formatNumber: function(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },

    // Emoji Utilities
    emoji: {
        categories: ['Smileys & People', 'Animals & Nature', 'Food & Drink', 'Activities', 
                    'Travel & Places', 'Objects', 'Symbols', 'Flags'],
        
        // Get recently used emojis from localStorage
        getRecentEmojis: function() {
            try {
                return JSON.parse(localStorage.getItem('recentEmojis') || '[]');
            } catch {
                return [];
            }
        },

        // Add emoji to recent list
        addToRecent: function(emoji) {
            const recent = this.getRecentEmojis();
            const newRecent = [emoji, ...recent.filter(e => e !== emoji)].slice(0, 36);
            localStorage.setItem('recentEmojis', JSON.stringify(newRecent));
        }
    },

    // Hashtag Utilities
    hashtags: {
        // Clean and format hashtags
        format: function(text) {
            return text.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(word => word.length > 0)
                .map(word => '#' + word)
                .join(' ');
        },

        // Get trending hashtags (mock data - would need API integration)
        getTrending: function() {
            return [
                '#trending2025', '#techinnovation', '#sustainability',
                '#ai', '#climateaction', '#digitalhealth', '#metaverse',
                '#blockchain', '#quantumcomputing', '#cybersecurity'
            ];
        }
    },

    // Social Media Post Templates
    postTemplates: {
        business: [
            "🚀 Exciting news! {announcement}\n\n#business #innovation",
            "💡 Pro tip: {tip}\n\nWhat are your thoughts? 🤔\n\n#tips #insights",
            "🎯 Goal achieved: {achievement}\n\nThank you to our amazing {audience}! 🙏\n\n#success #goals"
        ],
        personal: [
            "✨ Just shared a new {content_type}: {description}\n\n#create #inspire",
            "🌟 Today's highlight: {event}\n\nFeeling {emotion} 💫\n\n#lifestyle #moments",
            "💭 Thought of the day: {quote}\n\nWhat do you think? 🤔\n\n#motivation #mindset"
        ],
        promotional: [
            "🎉 Special offer! {offer}\n\nLimited time only ⏰\n\n#deal #special",
            "✨ New product alert: {product}\n\nAvailable now! 🛍️\n\n#new #launch",
            "🏷️ Deal of the day: {deal}\n\nDon't miss out! ⚡\n\n#sale #offer"
        ]
    },

    // Video Info Extraction
    videoInfo: {
        // Extract video ID from various platform URLs
        extractVideoId: function(url, platform) {
            try {
                const urlObj = new URL(url);
                switch (platform.toLowerCase()) {
                    case 'youtube':
                        return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
                    case 'facebook':
                        return urlObj.pathname.split('/').pop();
                    case 'twitter':
                        return urlObj.pathname.split('/').pop();
                    case 'tiktok':
                        return urlObj.pathname.split('/').pop();
                    case 'instagram':
                        return urlObj.pathname.split('/')[2];
                    default:
                        return null;
                }
            } catch {
                return null;
            }
        },

        // Validate platform-specific URLs
        validateUrl: function(url, platform) {
            try {
                const urlObj = new URL(url);
                switch (platform.toLowerCase()) {
                    case 'youtube':
                        return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
                    case 'facebook':
                        return urlObj.hostname.includes('facebook.com') || urlObj.hostname.includes('fb.watch');
                    case 'twitter':
                        return urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com');
                    case 'tiktok':
                        return urlObj.hostname.includes('tiktok.com');
                    case 'instagram':
                        return urlObj.hostname.includes('instagram.com');
                    default:
                        return false;
                }
            } catch {
                return false;
            }
        }
    },

    // Character Counter with Platform Limits
    charCounter: {
        limits: {
            twitter: 280,
            instagram: 2200,
            facebook: 63206,
            linkedin: 3000,
            tiktok: 2200
        },

        count: function(text, platform = null) {
            const length = text.length;
            const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
            const urls = (text.match(/https?:\/\/\S+/g) || []).length;
            const hashtags = (text.match(/#\w+/g) || []).length;
            const mentions = (text.match(/@\w+/g) || []).length;

            return {
                chars: length,
                words,
                urls,
                hashtags,
                mentions,
                remaining: platform ? this.limits[platform] - length : null
            };
        }
    },

    // YouTube Utilities
    youtube: {
        // Extract video metadata
        getVideoMetadata: async function(videoId) {
            try {
                // This would need to be replaced with actual YouTube API integration
                const mockData = {
                    title: 'Video Title',
                    description: 'Video Description',
                    tags: ['tag1', 'tag2', 'tag3'],
                    thumbnails: {
                        default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
                        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                        high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                        standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    }
                };
                return mockData;
            } catch (err) {
                throw new Error('Failed to fetch video metadata');
            }
        },

        // Download thumbnail
        downloadThumbnail: async function(videoId, quality = 'high') {
            const qualities = {
                default: 'default.jpg',
                medium: 'mqdefault.jpg',
                high: 'hqdefault.jpg',
                standard: 'sddefault.jpg',
                maxres: 'maxresdefault.jpg'
            };
            
            const url = `https://img.youtube.com/vi/${videoId}/${qualities[quality]}`;
            return this.parent.downloadMedia(url, `youtube-thumbnail-${videoId}-${quality}.jpg`);
        }
    },

    // Instagram Utilities
    instagram: {
        // Extract photo metadata
        getPhotoMetadata: async function(mediaId) {
            try {
                // This would need to be replaced with actual Instagram API integration
                return {
                    id: mediaId,
                    type: 'photo',
                    url: `https://www.instagram.com/p/${mediaId}/`,
                    timestamp: new Date().toISOString()
                };
            } catch (err) {
                throw new Error('Failed to fetch photo metadata');
            }
        }
    },

    // TikTok Utilities
    tiktok: {
        // Extract video metadata
        getVideoMetadata: async function(videoId) {
            try {
                // This would need to be replaced with actual TikTok API integration
                return {
                    id: videoId,
                    type: 'video',
                    url: `https://www.tiktok.com/video/${videoId}`,
                    timestamp: new Date().toISOString()
                };
            } catch (err) {
                throw new Error('Failed to fetch video metadata');
            }
        }
    }
};

// Export the module
window.socialTools = socialTools;
