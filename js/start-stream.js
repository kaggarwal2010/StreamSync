document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!window.StreamSyncAuth.isLoggedIn()) {
        alert('Please log in to start streaming');
        window.location.href = 'index.html';
        return;
    }

    const streamPreview = document.getElementById('stream-preview');
    const cameraMessage = document.getElementById('camera-permissions-message');
    const streamSetupForm = document.getElementById('stream-setup-form');

    // Request camera and microphone access
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }, 
        audio: true 
    })
    .then(stream => {
        streamPreview.srcObject = stream;
        cameraMessage.style.display = 'none';
    })
    .catch(error => {
        console.error('Camera access error:', error);
        cameraMessage.textContent = 'Camera access denied. Please check permissions.';
    });

    // Handle stream setup form submission
    streamSetupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect stream details
        const streamTitle = document.getElementById('stream-title').value;
        const streamCategory = document.getElementById('stream-category').value;
        const streamDescription = document.getElementById('stream-description').value;
        const streamPrivacy = document.querySelector('input[name="stream-privacy"]:checked').value;

        // Validate form
        if (!streamTitle || !streamCategory) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare stream metadata
        const streamMetadata = {
            title: streamTitle,
            category: streamCategory,
            description: streamDescription,
            privacy: streamPrivacy,
            streamer: window.StreamSyncAuth.getCurrentUser(),
            startTime: new Date().toISOString()
        };

        // Redirect to stream viewer with metadata
        const encodedMetadata = encodeURIComponent(JSON.stringify(streamMetadata));
        window.location.href = `stream-viewer.html?stream=${encodedMetadata}`;
    });
});