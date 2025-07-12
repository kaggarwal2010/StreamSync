// StreamSync Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation highlight
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

function initializeUI() {
    // Load featured streams
    setTimeout(() => {
        loadFeaturedStreams();
    }, 1500);
}

function loadFeaturedStreams() {
    const streamGrid = document.querySelector('.stream-grid');
    if (!streamGrid) return;

    // Clear placeholders
    streamGrid.innerHTML = '';

    // Sample stream data (would normally come from an API)
    const streams = [
        {
            title: 'Playing Minecraft with viewers!',
            user: 'GameMaster42',
            viewers: 1245,
            thumbnail: 'https://placehold.co/600x400/6441a5/ffffff?text=Gaming+Stream'
        },
        {
            title: 'Coding a new web app from scratch',
            user: 'DevGuru',
            viewers: 856,
            thumbnail: 'https://placehold.co/600x400/7289da/ffffff?text=Coding+Stream'
        },
        {
            title: 'Digital art creation - Character design',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            thumbnail: 'https://placehold.co/600x400/43b581/ffffff?text=Art+Stream'
        }
    ];

    // Create stream cards
    streams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'stream-card';
        streamCard.innerHTML = `
            <img src="${stream.thumbnail}" alt="${stream.title}" style="width: 100%; height: 170px; object-fit: cover;">
            <div style="padding: 15px;">
                <h3 style="margin: 0 0 5px 0; font-size: 16px; color: white;">${stream.title}</h3>
                <p style="margin: 0; color: var(--text-muted); font-size: 14px;">${stream.user}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: var(--danger-color);">
                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: var(--danger-color); margin-right: 5px;"></span>
                    ${stream.viewers.toLocaleString()} viewers
                </p>
            </div>
        `;

        streamCard.addEventListener('click', () => {
            console.log(`Stream clicked: ${stream.title}`);
            // You can add navigation logic here
        });

        streamGrid.appendChild(streamCard);
    });
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedStreams();
});