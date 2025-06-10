// Ad management script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AdSense
    (adsbygoogle = window.adsbygoogle || []).push({});

    // Handle ad loading states
    const adContainers = document.querySelectorAll('.ad-container');
    adContainers.forEach(container => {
        container.classList.add('loading');
        
        // Remove loading state after ad loads
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    container.classList.remove('loading');
                    observer.disconnect();
                }
            });
        });

        observer.observe(container, { childList: true });
    });

    // Handle responsive ad behavior
    function handleResponsiveAds() {
        const sidebarAds = document.querySelectorAll('.ad-container.sidebar');
        if (window.innerWidth <= 768) {
            sidebarAds.forEach(ad => {
                ad.style.position = 'static';
            });
        } else {
            sidebarAds.forEach(ad => {
                ad.style.position = 'sticky';
            });
        }
    }

    // Initial check
    handleResponsiveAds();

    // Listen for window resize
    window.addEventListener('resize', handleResponsiveAds);

    // Handle ad errors
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'INS' && e.target.classList.contains('adsbygoogle')) {
            const container = e.target.closest('.ad-container');
            if (container) {
                container.innerHTML = '<div class="text-muted">Advertisement not available</div>';
            }
        }
    }, true);
}); 