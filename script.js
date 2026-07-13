document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Footer Copyright Execution
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Optimized Click-to-Copy Configuration for Discord Element
    const discordCard = document.getElementById('copy-discord-btn');
    const actionBtnText = document.getElementById('dc-btn-text');

    if (discordCard && actionBtnText) {
        discordCard.addEventListener('click', async () => {
            const username = discordCard.getAttribute('data-username');
            
            try {
                // Clipboard API integration
                await navigator.clipboard.writeText(username);
                
                // Active visual layout modification state
                actionBtnText.textContent = 'copied!';
                discordCard.style.borderColor = varColor('--success-color', '#10b981');
                
                // Return to structural base configs after delay
                setTimeout(() => {
                    actionBtnText.textContent = 'copy username =)';
                    discordCard.style.borderColor = '';
                }, 2500);

            } catch (err) {
                console.error('failed to copy text layout: ', err);
                actionBtnText.textContent = 'error!';
            }
        });
    }

    // Helper fallback method to grab root styles dynamically if needed
    function varColor(variableName, fallback) {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim() || fallback;
    }

    function getCircularSvgFavicon(imageUrl) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <defs>
                    <clipPath id="favicon-circle">
                        <circle cx="50" cy="50" r="50" />
                    </clipPath>
                </defs>
                <rect width="100" height="100" fill="transparent" />
                <image href="${imageUrl}" clip-path="url(#favicon-circle)" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
                <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
            </svg>
        `;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    // 3. Native Smooth In-App Scroll Engine
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                const headerOffset = 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Subtle Intersectional Fade In Layout Actions
    const viewOptions = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, viewOptions);

    document.querySelectorAll('.section').forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(15px)';
        sec.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(sec);
    });

    // 5. Load Discord profile image into favicon if possible
    const faviconLink = document.getElementById('favicon');
    const discordId = discordCard?.getAttribute('data-discord-id');
    const discordAvatarValue = discordCard?.getAttribute('data-discord-avatar-hash');

    if (faviconLink && discordAvatarValue) {
        const discordAvatarUrl = /^https?:\/\//i.test(discordAvatarValue)
            ? discordAvatarValue
            : discordId
                ? `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatarValue}.png?size=128`
                : null;

        if (discordAvatarUrl) {
            fetch(discordAvatarUrl, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Discord avatar not available');
                    }
                    return response.blob();
                })
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }))
                .then(imageDataUrl => {
                    faviconLink.href = getCircularSvgFavicon(imageDataUrl);
                })
                .catch(() => {
                    // Fallback remains the generated SVG icon.
                });
        }
    }
});