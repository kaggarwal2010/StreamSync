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
        
        streamGrid = document.querySelector('.stream-grid');
    }

    const streams = [
        {
            title: 'Gaming Stream',
            user: 'GameMaster42',
            viewers: 1245,
            color: '#6441a5',
            streamId: 'gaming123'
        },
        {
            title: 'Coding Stream',
            user: 'DevGuru',
            viewers: 856,
            color: '#7289da',
            streamId: 'coding456'
        },
        {
            title: 'Art Stream',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            color: '#43b581',
            streamId: 'art789'
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
        streamCard.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability
        streamCard.innerHTML = `
            <h3>${stream.title}</h3>
            <p>Streamer: ${stream.user}</p>
            <p>Viewers: ${stream.viewers}</p>
        `;

        // Add click event to navigate to stream viewer
        streamCard.addEventListener('click', () => {
            // Prepare stream metadata to pass to stream viewer
            const streamMetadata = {
                title: stream.title,
                user: stream.user,
                viewers: stream.viewers,
                streamId: stream.streamId
            };

            // Encode the metadata and navigate to stream viewer
            const encodedMetadata = encodeURIComponent(JSON.stringify(streamMetadata));
            window.location.href = `stream-viewer.html?stream=${encodedMetadata}`;
        });

        streamGrid.appendChild(streamCard);
    });
}

// Ensure the function runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedStreams();
});