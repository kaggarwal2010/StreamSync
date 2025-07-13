class StreamSync {
    constructor() {
        this.localStream = null;
        this.peerConnections = {};
        this.streamKey = null;
        this.isStreaming = false;
        this.initializeChat();
    }

    // Add chat initialization method
    initializeChat() {
        const chatInput = document.getElementById('chat-input');
        const sendChatBtn = document.getElementById('send-chat-btn');
        const chatMessages = document.getElementById('chat-messages');

        if (!chatInput || !sendChatBtn || !chatMessages) {
            console.error('Chat elements not found');
            return;
        }

        // Disable chat input and send button by default
        chatInput.disabled = true;
        sendChatBtn.disabled = true;
        chatInput.placeholder = 'Login to send messages';

        // Check if user is logged in and update chat input
        this.checkLoginStatus();

        // Send message on button click
        sendChatBtn.addEventListener('click', () => {
            this.sendChatMessage();
        });

        // Send message on Enter key press
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    // Check login status and update chat input
    checkLoginStatus() {
        const chatInput = document.getElementById('chat-input');
        const sendChatBtn = document.getElementById('send-chat-btn');

        // Use the authentication method from your auth system
        const isLoggedIn = window.StreamSyncAuth && window.StreamSyncAuth.isLoggedIn();
        const currentUser = isLoggedIn ? window.StreamSyncAuth.getCurrentUser() : null;

        if (isLoggedIn && currentUser) {
            // Enable chat input
            chatInput.disabled = false;
            sendChatBtn.disabled = false;
            chatInput.placeholder = 'Send a message...';

            // Add welcome message
            this.addSystemMessage(`Welcome, ${currentUser.username}!`);
        } else {
            // Disable chat input
            chatInput.disabled = true;
            sendChatBtn.disabled = true;
            chatInput.placeholder = 'Login to send messages';

            // Add login prompt message
            this.addSystemMessage('Please log in to chat');
        }
    }

    // Method to send chat message
    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        if (!chatInput || !chatMessages) return;

        // Re-check login status before sending
        if (!window.StreamSyncAuth || !window.StreamSyncAuth.isLoggedIn()) {
            this.addSystemMessage('Please log in to send messages');
            return;
        }

        const message = chatInput.value.trim();
        const currentUser = window.StreamSyncAuth.getCurrentUser();
        
        if (message) {
            // Create message element
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.innerHTML = `
                <strong>${currentUser.username}:</strong> ${message}
            `;

            // Append message to chat
            chatMessages.appendChild(messageElement);

            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Clear input
            chatInput.value = '';
        }
    }

    // Add system message to chat
    addSystemMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const systemMessageElement = document.createElement('div');
        systemMessageElement.classList.add('system-message');
        systemMessageElement.textContent = message;

        chatMessages.appendChild(systemMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize streaming on page load
document.addEventListener('DOMContentLoaded', () => {
    const streamSync = new StreamSync();
    const streamForm = document.getElementById('stream-setup-form');
    const startStreamBtn = document.getElementById('start-stream-btn');
    const stopStreamBtn = document.getElementById('stop-stream-btn');

    // Add login status check to authentication buttons
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // Assuming there's a method to show login modal
            // You might need to adjust this based on your auth implementation
            document.getElementById('auth-modal').style.display = 'block';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Use your auth system's logout method
            if (window.StreamSyncAuth) {
                window.StreamSyncAuth.logout();
                // Reinitialize chat to update status
                streamSync.checkLoginStatus();
            }
        });
    }

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