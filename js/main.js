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
    // Use let instead of const to allow reassignment if needed
    let streamGrid = document.querySelector('.stream-grid');

    // If no stream grid found, create one
    if (!streamGrid) {
        const featuredStreamsSection = document.createElement('section');
        featuredStreamsSection.className = 'featured-streams';
        featuredStreamsSection.innerHTML = `
            <h2>Featured Streams</h2>
            <div class="stream-grid"></div>
        `;
        document.body.appendChild(featuredStreamsSection);
        
        // Re-select the stream grid after creating it
        streamGrid = document.querySelector('.stream-grid');
    }

    const streams = [
        {
            title: 'Gaming Stream',
            user: 'GameMaster42',
            viewers: 1245,
            color: '#6441a5'
        },
        {
            title: 'Coding Stream',
            user: 'DevGuru',
            viewers: 856,
            color: '#7289da'
        },
        {
            title: 'Art Stream',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            color: '#43b581'
        }
    ];

    // Clear existing content
    streamGrid.innerHTML = '';

    streams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'stream-card';
        streamCard.style.backgroundColor = stream.color;
        streamCard.style.color = 'white';
        streamCard.style.padding = '20px';
        streamCard.style.margin = '10px';
        streamCard.innerHTML = `
            <h3>${stream.title}</h3>
            <p>Streamer: ${stream.user}</p>
            <p>Viewers: ${stream.viewers}</p>
        `;
        streamGrid.appendChild(streamCard);
    });
}

// Ensure the function runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedStreams();
});