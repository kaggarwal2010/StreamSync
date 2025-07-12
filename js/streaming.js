class StreamSync {
    constructor() {
        this.localStream = null;
        this.peerConnections = {};
        this.streamKey = null;
        this.isStreaming = false;
    }

    async startStreaming(streamMetadata) {
        try {
            // Request camera and microphone access
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: true
            });

            // Create video element
            const videoElement = document.getElementById('stream-video');
            videoElement.srcObject = this.localStream;
            videoElement.play();

            // Update UI
            this.updateStreamUI(true, streamMetadata);

            // Generate stream key
            this.streamKey = this.generateStreamKey();
            this.isStreaming = true;

            // Optional: Setup WebRTC signaling (placeholder)
            this.setupWebRTCSignaling();

            return this.streamKey;
        } catch (error) {
            console.error('Streaming error:', error);
            alert('Could not start streaming. Check camera/mic permissions.');
            return null;
        }
    }

    stopStreaming() {
        if (this.localStream) {
            // Stop all tracks
            this.localStream.getTracks().forEach(track => track.stop());

            // Reset video element
            const videoElement = document.getElementById('stream-video');
            videoElement.srcObject = null;

            // Update UI
            this.updateStreamUI(false);

            this.isStreaming = false;
            this.localStream = null;
        }
    }

    updateStreamUI(isLive, streamMetadata = {}) {
        const streamControls = document.getElementById('stream-controls');
        const streamInfo = document.getElementById('stream-info');
        const startButton = document.getElementById('start-stream-btn');
        const stopButton = document.getElementById('stop-stream-btn');

        if (isLive) {
            startButton.style.display = 'none';
            stopButton.style.display = 'block';
            
            // Update stream info
            streamInfo.innerHTML = `
                <h3>${streamMetadata.title || 'Untitled Stream'}</h3>
                <p>Category: ${streamMetadata.category || 'General'}</p>
                <p>Started: ${new Date().toLocaleTimeString()}</p>
            `;
        } else {
            startButton.style.display = 'block';
            stopButton.style.display = 'none';
            streamInfo.innerHTML = '<p>Stream is offline</p>';
        }
    }

    generateStreamKey() {
        return `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    setupWebRTCSignaling() {
        // Placeholder for WebRTC signaling logic
        console.log('WebRTC signaling setup');
    }

    setupChat() {
        const chatInput = document.getElementById('chat-input');
        const sendChatBtn = document.getElementById('send-chat-btn');
        const chatMessages = document.getElementById('chat-messages');

        sendChatBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                this.sendChatMessage(message);
                chatInput.value = '';
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    this.sendChatMessage(message);
                    chatInput.value = '';
                }
            }
        });
    }

    sendChatMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `
            <strong>You:</strong> ${message}
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize streaming on page load
document.addEventListener('DOMContentLoaded', () => {
    const streamSync = new StreamSync();
    const streamForm = document.getElementById('stream-setup-form');
    const startStreamBtn = document.getElementById('start-stream-btn');
    const stopStreamBtn = document.getElementById('stop-stream-btn');

    // Stream setup form submission
    streamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('stream-title').value;
        const category = document.getElementById('stream-category').value;
        
        const streamMetadata = {
            title,
            category,
            startTime: new Date().toISOString()
        };

        streamSync.startStreaming(streamMetadata);
        streamSync.setupChat();
        streamForm.style.display = 'none';
    });

    // Start/Stop stream buttons
    startStreamBtn.addEventListener('click', () => {
        streamForm.style.display = 'block';
    });

    stopStreamBtn.addEventListener('click', () => {
        streamSync.stopStreaming();
    });
});