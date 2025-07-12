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

// Function to load featured streams
function loadFeaturedStreams() {
    const streamGrid = document.querySelector('.stream-grid');
    
    if (!streamGrid) {
        console.error('Stream grid not found');
        return;
    }

    // Clear any existing content
    streamGrid.innerHTML = '';

    // Sample stream data with full image URLs
    const streams = [
        {
            title: 'Gaming Stream',
            user: 'GameMaster42',
            viewers: 1245,
            thumbnail: 'https://placehold.co/300x200/6441a5/ffffff?text=Gaming+Stream',
            link: 'stream-viewer.html'
        },
        {
            title: 'Coding Stream',
            user: 'DevGuru',
            viewers: 856,
            thumbnail: 'https://placehold.co/300x200/7289da/ffffff?text=Coding+Stream',
            link: 'stream-viewer.html'
        },
        {
            title: 'Art Stream',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            thumbnail: 'https://placehold.co/300x200/43b581/ffffff?text=Art+Stream',
            link: 'stream-viewer.html'
        }
    ];

    // Create stream cards
    streams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'stream-card';
        streamCard.innerHTML = `
            <img src="${stream.thumbnail}" alt="${stream.title}" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="stream-info">
                <h3>${stream.title}</h3>
                <p>${stream.user}</p>
                <div class="viewer-count">
                    <span class="live-dot"></span>
                    ${stream.viewers} viewers
                </div>
            </div>
        `;
        
        // Add click event to navigate to stream viewer
        streamCard.addEventListener('click', () => {
            window.location.href = stream.link;
        });

        streamGrid.appendChild(streamCard);
    });

    console.log('Featured streams loaded');
}

// Ensure DOM is fully loaded before running
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    loadFeaturedStreams();
});