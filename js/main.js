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
    console.log('Loading featured streams...');
    const streamGrid = document.querySelector('.stream-grid');

    if (!streamGrid) {
        console.error('Stream grid not found');
        return;
    }

    // Clear any existing content
    streamGrid.innerHTML = '';

    // Sample stream data with colors instead of images
    const streams = [
        {
            title: 'Gaming Stream',
            user: 'GameMaster42',
            viewers: 1245,
            color: '#6441a5', // Twitch purple
            streamId: 'gaming123'
        },
        {
            title: 'Coding Stream',
            user: 'DevGuru',
            viewers: 856,
            color: '#7289da', // Discord blue
            streamId: 'coding456'
        },
        {
            title: 'Art Stream',
            user: 'ArtistExtraordinaire',
            viewers: 723,
            color: '#43b581', // Green
            streamId: 'art789'
        }
    ];

    // Create stream cards
    streams.forEach(stream => {
        const streamCard = document.createElement('div');
        streamCard.className = 'stream-card';
        
        // Create a colored div with text instead of an image
        streamCard.innerHTML = `
            <div class="stream-thumbnail" style="
                background-color: ${stream.color}; 
                height: 200px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                font-weight: bold;
                font-size: 20px;
            ">
                ${stream.title}
            </div>
            <div class="stream-info">
                <h3>${stream.title}</h3>
                <p>${stream.user}</p>
                <div class="viewer-count">
                    <span class="live-dot"></span>
                    ${stream.viewers} viewers
                </div>
                <button class="primary-btn watch-stream-btn">Watch Stream</button>
            </div>
        `;

        // Add click event to the button
        streamCard.querySelector('.watch-stream-btn').addEventListener('click', () => {
            console.log('Watch button clicked for:', stream.title);
            
            // Create stream metadata
            const streamMetadata = {
                title: stream.title,
                user: stream.user,
                description: `This is the ${stream.title.toLowerCase()} by ${stream.user}`,
                category: stream.title.split(' ')[0], // Use first word as category
                viewers: stream.viewers,
                streamId: stream.streamId
            };
            
            // Encode and pass the metadata in the URL
            const encodedMetadata = encodeURIComponent(JSON.stringify(streamMetadata));
            window.location.href = `stream-viewer.html?stream=${encodedMetadata}`;
        });

        streamGrid.appendChild(streamCard);
    });

    console.log('Featured streams loaded successfully');
}