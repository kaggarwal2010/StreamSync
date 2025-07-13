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
            streamId: 'gaming123',
            isLive: false // Add isLive property
        },
        {
            title: 'Coding Stream',
            user: 'DevGuru',
            viewers: 856,
            color: '#7289da',
            streamId: 'coding456',
            isLive: false
        },
        {
            title: 'Art Stream',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            color: '#43b581',
            streamId: 'art789',
            isLive: false
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
        streamCard.style.cursor = 'pointer';
        streamCard.innerHTML = `
            <h3>${stream.title}</h3>
            <p>Streamer: ${stream.user}</p>
            <p>Viewers: ${stream.viewers}</p>
            <button class="watch-stream-btn">Watch Stream</button>
        `;

        // Add click event to the card and the button
        const watchButton = streamCard.querySelector('.watch-stream-btn');
        
        const navigateToStream = () => {
            // Prepare stream metadata to pass to stream viewer
            const streamMetadata = {
                title: stream.title,
                user: stream.user,
                viewers: stream.viewers,
                streamId: stream.streamId,
                isLive: stream.isLive // Pass live status
            };

            // Encode the metadata and navigate to stream viewer
            const encodedMetadata = encodeURIComponent(JSON.stringify(streamMetadata));
            
            // Navigate to stream viewer
            window.location.href = `stream-viewer.html?stream=${encodedMetadata}`;
        };

        // Add click event to both the card and the button
        streamCard.addEventListener('click', navigateToStream);
        watchButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateToStream();
        });

        streamGrid.appendChild(streamCard);
    });
}

// Ensure the function runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedStreams();
});

