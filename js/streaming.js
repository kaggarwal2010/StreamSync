class StreamSync {
    constructor() {
        this.localStream = null;
        this.peerConnections = {};
        this.streamKey = null;
    }

    async startStreaming() {
        try {
            // Request camera and microphone access
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true, 
                audio: true
            });

            // Display local stream
            const videoElement = document.getElementById('streamPlayer');
            const offlineMessage = document.querySelector('.stream-offline');
            
            videoElement.srcObject = this.localStream;
            videoElement.style.display = 'block';
            offlineMessage.style.display = 'none';

            // Generate unique stream key
            this.streamKey = this.generateStreamKey();

            // TODO: Implement signaling server connection
            this.initializeSignaling();

        } catch (error) {
            console.error('Streaming error:', error);
            alert('Could not start streaming. Check camera/mic permissions.');
        }
    }

    stopStreaming() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            
            const videoElement = document.getElementById('streamPlayer');
            const offlineMessage = document.querySelector('.stream-offline');
            
            videoElement.srcObject = null;
            videoElement.style.display = 'none';
            offlineMessage.style.display = 'block';
            
            this.localStream = null;
        }
        // TODO: Close peer connections
    }

    generateStreamKey() {
        return `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    initializeSignaling() {
        // Placeholder for WebSocket or WebRTC signaling
        console.log('Stream Key:', this.streamKey);
    }
}

// Initialize streaming
document.addEventListener('DOMContentLoaded', () => {
    const streamSync = new StreamSync();
    
    const startBtn = document.getElementById('startStreamBtn');
    const stopBtn = document.getElementById('stopStreamBtn');

    startBtn.addEventListener('click', () => {
        streamSync.startStreaming();
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
    });

    stopBtn.addEventListener('click', () => {
        streamSync.stopStreaming();
        stopBtn.style.display = 'none';
        startBtn.style.display = 'block';
    });
});